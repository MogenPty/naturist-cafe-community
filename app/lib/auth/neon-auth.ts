import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../db/schema";

// Simple session wrapper
export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Server action: Sign in with email and password
export async function signIn(
  email: string,
  password: string,
): Promise<Session> {
  "use server";
  const { cookies } = await import("next/headers");

  // Find user by email
  const user = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1)
    .then((rows) => rows[0]);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // In production, verify password hash. For now, plain text comparison.
  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  // Create session cookie (simple implementation)
  const session: Session = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };

  // Store session in cookie (base64 encoded for demo)
  const cookieStore = await cookies();
  cookieStore.set(
    "session",
    Buffer.from(JSON.stringify(session)).toString("base64"),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    },
  );

  return session;
}

// Server action: Sign out
export async function signOut(): Promise<void> {
  "use server";
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Server action: Get current session
export async function getSession(): Promise<Session | null> {
  "use server";
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value, "base64").toString(),
    );
    return session as Session;
  } catch {
    return null;
  }
}

// Server action: Get current user
export async function getUser(): Promise<Session["user"] | null> {
  "use server";
  const session = await getSession();
  return session?.user ?? null;
}

// Expose as neonAuth object for backward compatibility
export const neonAuth = {
  signIn,
  signOut,
  getSession,
  getUser,
};

// Server action: Require admin access
export async function requireAdmin() {
  "use server";
  const session = await neonAuth.getSession();

  if (!session?.user) {
    throw new Error("Unauthorized: Please log in");
  }

  // Check if user is admin
  const admin = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.userId, session.user.id))
    .limit(1)
    .then((rows) => rows[0] ?? null);

  if (!admin) {
    throw new Error("Forbidden: Admin access required");
  }

  return { user: session.user, role: admin.role };
}

// Server action: Promote user to admin
export async function promoteToAdmin(
  userId: string,
  role: "admin" | "editor" = "editor",
) {
  "use server";
  const { user, role: currentRole } = await requireAdmin();

  // Only superadmin can promote others
  if (currentRole !== "superadmin") {
    throw new Error("Forbidden: Only superadmin can promote users");
  }

  // Check if already admin
  const existingAdmin = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.userId, userId))
    .limit(1);

  if (existingAdmin.length > 0) {
    // Update role
    return db
      .update(schema.admins)
      .set({ role })
      .where(eq(schema.admins.userId, userId));
  }

  // Create new admin record
  return db.insert(schema.admins).values({
    userId,
    role,
  });
}

// Server action: Demote admin (remove from admins table)
export async function demoteAdmin(userId: string) {
  "use server";
  const { role: currentRole } = await requireAdmin();

  // Only superadmin can demote
  if (currentRole !== "superadmin") {
    throw new Error("Forbidden: Only superadmin can demote");
  }

  // Cannot demote self if superadmin
  const currentUser = await neonAuth.getSession();
  if (currentUser?.user.id === userId && currentRole === "superadmin") {
    throw new Error("Cannot demote yourself as superadmin");
  }

  return db.delete(schema.admins).where(eq(schema.admins.userId, userId));
}
