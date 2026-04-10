"use server";

import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { isAdmin } from "../../lib/db";

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
  const admin = await isAdmin(data.user.id);

  if (admin) {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}
