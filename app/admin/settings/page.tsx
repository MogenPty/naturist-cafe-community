"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SettingsForm from "../../components/auth/SettingsForm";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin");
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12">
        <div className="mx-auto max-w-lg px-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
            <p className="text-sm text-green-800">
              Settings updated successfully! Redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6">
      <SettingsForm onSuccess={handleSuccess} />
    </div>
  );
}
