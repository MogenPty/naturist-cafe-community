"use server";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import * as schema from "../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  if (!email) {
    return { error: "Email address must be provided." };
  }

  const { data, error } = await auth.signIn.email({
    email,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message || "Failed to sign in" };
  }

  // After successful sign-in, check if user is admin to redirect appropriately
  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, data.user.id),
  });

  if (admin) {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}
