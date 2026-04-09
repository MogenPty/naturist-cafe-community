"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { auth, getSession } from "../auth";
import { db } from "../db";
import * as schema from "../db/schema";

/**
 * Server Action to get current user session
 * This can be called from Server Components
 * Redirects to sign-in if not authenticated
 */
export async function getCurrentUserSession() {
  const session = await auth.getSession();

  if (!session?.data?.user) {
    redirect("/auth/sign-in");
  }

  return session.data.user;
}

/**
 * Server Action to require admin access
 * Redirects to login if not authenticated
 * Redirects to homepage with error toast if not admin
 */
export async function requireAdmin() {
  try {
    const session = await getSession();
    const sessionUser = session?.data?.user;

    if (!sessionUser) {
      redirect("/auth/sign-in?callbackUrl=/admin");
    }

    // Check if user is admin
    const admin = await db.query.admins.findFirst({
      where: eq(schema.admins.userId, sessionUser.id),
    });

    if (!admin) {
      // Redirect to profile page with error toast
      redirect("/profile?error=forbidden");
    }

    return { user: sessionUser, role: admin.role };
  } catch (e) {
    console.log("Error", e);
    redirect("/auth/sign-in?callbackUrl=/admin");
  }
}
