"use client";
import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load current name
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user?.name) {
        setName(data.user.name);
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await authClient.updateUser({ name });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Display name updated successfully!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      {" "}
      {/* Your clean background */}
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
            >
              {loading ? "Saving..." : "Update Display Name"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
