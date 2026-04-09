"use client";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
}
