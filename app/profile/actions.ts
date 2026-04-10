"use server";

import { z } from "zod";
import { auth, neonAuth } from "../lib/auth";

const profileUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
});

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(1), // Must match newPassword
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function updateProfile(formData: FormData) {
  try {
    const data = profileUpdateSchema.parse(Object.fromEntries(formData));

    // Get current session to verify user
    const session = await auth.getSession();
    if (!session?.data?.user) {
      return { error: "Not authenticated" };
    }

    // Update name if provided using NeonAuth updateUser
    if (data.name && auth.updateUser) {
      await auth.updateUser({ name: data.name });
    }

    // Note: Email updates would require verification - future enhancement
    if (data.email && data.email !== session.data.user.email) {
      // Would need to call auth.updateEmail with verification
      // For now, we don't allow email changes via this form
      return { error: "Email changes not supported yet" };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: "Invalid form data" };
    }
    return { error: "Failed to update profile" };
  }
}

export async function changePassword(formData: FormData) {
  try {
    const data = passwordChangeSchema.parse(Object.fromEntries(formData));

    // Use NeonAuth to update password if method available
    if (!neonAuth.changePassword) {
      return { error: "Password update not available" };
    }

    const result = await neonAuth.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (result?.error) {
      return { error: result.error.message || "Failed to update password" };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: "Please check your input" };
    }
    return { error: "An error occurred" };
  }
}

export async function updateProfilePicture(formData: FormData) {
  try {
    const session = await auth.getSession();
    if (!session?.data?.user) {
      return { error: "Not authenticated" };
    }

    const file = formData.get("profilePicture") as File;
    if (!file) {
      return { error: "No file selected" };
    }

    const result = await auth.updateUser({
      image: await file.arrayBuffer().toString(),
    });

    if (result?.error) {
      return {
        error: result.error.message || "Failed to update profile picture",
      };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: "Invalid form data" };
    }
    return { error: "Failed to update profile picture" };
  }
}

export async function updateDisplayName(displayName: string) {
  try {
    const session = await auth.getSession();
    if (!session?.data?.user) {
      return { error: "Not authenticated" };
    }
    const result = await auth.updateUser({
      name: displayName,
    });
    if (result?.error) {
      return {
        error: result.error.message || "Failed to   update display name",
      };
    }
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: "Invalid form data" };
    }
    return { error: "Failed to update display name" };
  }
}
