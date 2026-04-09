import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import * as schema from "../lib/db/schema";
import { changePassword, updateDisplayName } from "./actions";
import { toast } from "sonner";

// Force dynamic rendering since page uses cookies via auth
export const dynamic = "force-dynamic";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get current user session (redirects if not authenticated)
  const session = await auth.getSession();
  if (!session?.data?.user) {
    redirect("/auth/sign-in");
  }

  const user = session.data.user;

  // Check if user is admin
  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, user.id),
  });

  const isAdmin = !!admin;
  const userRole = isAdmin ? (admin.role as string) : "Member";

  // Get success/error messages from URL
  const message = searchParams.message;
  const error = searchParams.error;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await auth.updateUser({
      name: e.currentTarget.value,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    // Refresh session to get updated data
    const { data: sessionData } = await auth.getSession();
    toast.success("Display name updated successfully!");
    console.log("Updated user:", sessionData?.user);
  };

  return (
    <div className="min-h-screen bg-charcoal-700 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl text-nature-700">
              {user.name?.[0] || user.email[0].toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.name || "Your Profile"}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isAdmin ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
            >
              {isAdmin ? `Admin (${userRole})` : "Member"}
            </span>
          </div>
        </div>

        {/* Messages */}
        {(message || error) && (
          <div
            className={`mb-6 p-4 rounded-md ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
          >
            {error ? decodeURIComponent(error) : message}
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Information */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
              Profile Information
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor={"name"}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id={"name"}
                  name={"name"}
                  defaultValue={user.name || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                  placeholder="Your name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Update your display name
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id={"email"}
                  name="email"
                  defaultValue={user.email || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                  placeholder="your.email@example.com"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email changes require verification (coming soon)
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
              >
                Update Profile
              </button>
            </form>
          </section>

          {/* Change Password */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
              Change Password
            </h2>
            <form onSubmit={changePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id={"currentPassword"}
                  name="currentPassword"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id={"newPassword"}
                  name="newPassword"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id={"confirmPassword"}
                  name="confirmPassword"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
              >
                Change Password
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Note: Password update requires your current password for security.
            </p>
          </section>

          {/* Sign Out */}
          <section className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Session</h2>
            <form
              action={async () => {
                "use server";
                await auth.signOut();
                redirect("/auth/login");
              }}
            >
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
              >
                Sign Out
              </button>
            </form>
          </section>

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
