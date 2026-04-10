"use client";
import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";

interface SettingsFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function SettingsForm({
  className = "",
  onSuccess,
}: SettingsFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load current display name
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await authClient.getSession();
      if (data?.user?.name) {
        setName(data.user.name);
        setEmail(data.user.email);
      }
      setIsLoadingUser(false);
    };
    loadUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    let hasUpdate = false;
    let nameUpdated = false;
    let passwordUpdated = false;

    // 1. Update Display Name (only if it changed)
    if (name.trim() !== "") {
      const currentName =
        (await authClient.getSession()).data?.user?.name || "";
      if (name.trim() !== currentName) {
        const { error: nameError } = await authClient.updateUser({
          name: name.trim(),
        });
        if (nameError) {
          setMessage({
            type: "error",
            text: `Name update failed: ${nameError.message}`,
          });
          setIsSaving(false);
          return;
        }
        nameUpdated = true;
        hasUpdate = true;
      }
    }

    // 2. Change Password (only if fields are filled)
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setMessage({ type: "error", text: "New passwords don't match" });
        setIsSaving(false);
        return;
      }

      const { error: passError } = await authClient.changePassword({
        currentPassword,
        newPassword,
      });

      if (passError) {
        setMessage({
          type: "error",
          text: `Password change failed: ${passError.message}`,
        });
        setIsSaving(false);
        return;
      }

      passwordUpdated = true;
      hasUpdate = true;

      // Clear password fields after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (hasUpdate) {
      const successMsg = [
        nameUpdated && "Display name updated",
        passwordUpdated && "Password changed",
      ]
        .filter(Boolean)
        .join(" and ");

      setMessage({ type: "success", text: `${successMsg} successfully!` });
      onSuccess?.();
    } else {
      setMessage({ type: "success", text: "No changes detected." });
    }

    setIsSaving(false);
  };

  if (isLoadingUser) {
    return <div className="p-8 text-center">Loading settings...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
      <div className={`rounded-2xl bg-white p-8 shadow ${className}`}>
        <form onSubmit={handleSave} className="space-y-10">
          {/* Display Name Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Profile Information</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Your display name"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Leave unchanged if you don’t want to update it.
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="text"
                disabled
                value={email}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="[email address]"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Email Address cannot be changed as it is your username.
              </p>
            </div>
          </div>

          {/* Password Change Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Change Password</h2>
            <div className="space-y-4">
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
                  placeholder="Enter current password"
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
                  placeholder="New password"
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
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Password will only be updated if all fields are filled correctly.
            </p>
          </div>

          {/* Single Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition"
          >
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </>
  );
}
