"use server";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  if (!email) {
    return { error: "Email address must be provided." };
  }
  const session = await auth.signIn.email({
    email,
    password: formData.get("password") as string,
  });
  if (session.error) {
    return { error: session.error.message || "Failed to sign in" };
  }

  redirect("/admin");
}
