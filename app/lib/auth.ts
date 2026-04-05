import { createNeonAuth } from "@neondatabase/auth/next/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_CLIENT_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_CLIENT_SECRET!,
  },
});

export const { getSession, signIn, signOut, verifyEmail, emailOtp } = auth;

export function getIsSystemHost(hostname: string) {
  const [hostWithoutPort] = hostname.split(":");
  return (
    hostWithoutPort === "localhost" ||
    hostWithoutPort === process.env.NEXT_PUBLIC_APP_URL
  );
}

/**
 * Retrieves the current user session and matches it with the database record.
 */
export async function getCurrentUser() {
  const { data: sessionData } = await getSession();

  if (!sessionData?.user) {
    return null;
  }

  const sessionUser = sessionData.user;

  if (!sessionUser.id) {
    return null;
  }

  // Fetch the user from the neon_auth.user table to get their global role
  const dbUser = await db.query.userInNeonAuth.findFirst({
    where: eq(schema.userInNeonAuth.id, sessionUser.id),
  });

  if (!dbUser) {
    return null;
  }

  return dbUser;
}

// Server action: Require admin access
export async function requireAdmin() {
  // "use server";
  const session = await getSession();

  const sessionUser = session?.data?.user;

  if (!sessionUser) {
    throw new Error("Unauthorized: Please log in");
  }

  // Check if user is admin
  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, sessionUser.id),
  });

  if (!admin) {
    throw new Error("Forbidden: Admin access required");
  }

  return { user: sessionUser, role: admin.role };
}
