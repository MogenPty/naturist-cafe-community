import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getCurrentUserSession } from "@/lib/session/actions";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Force dynamic rendering since page uses cookies via getCurrentUserSession()
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // This will redirect to sign-in if not authenticated
  const user = await getCurrentUserSession();

  // Check if user is admin - if so, redirect to admin
  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, user.id),
  });

  if (admin) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-charcoal-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-nature-700">
              {user.name?.[0] || user.email[0].toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.name || "User"}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-2">Regular Member</p>
        </div>

        <div className="space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Account Information
            </h2>
            <p className="text-sm text-gray-600">
              You are logged in as a regular user. Admin privileges are required
              to access the admin panel.
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await auth.signOut();
              redirect("/auth/login");
            }}
          >
            <button
              type="submit"
              className="w-full px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
            >
              Sign Out
            </button>
          </form>

          <Link
            href="/"
            className="block text-center text-nature-600 hover:text-nature-700 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
