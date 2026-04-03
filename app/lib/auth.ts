import { createNeonAuth } from "@neondatabase/auth/next/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { neonAuth, userInNeonAuth } from "./db/schema";

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
  const { user: sessionUser } = await neonAuth();

  if (!sessionUser?.id) {
    return null;
  }

  // Fetch the user from the neon_auth.user table to get their global role
  const dbUser = await db.query.userInNeonAuth.findFirst({
    where: eq(userInNeonAuth.id, sessionUser.id),
  });

  if (!dbUser) {
    return null;
  }

  return dbUser;
}
