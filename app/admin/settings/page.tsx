import SettingsForm from "../../components/auth/SettingsForm";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="mx-auto max-w-lg px-6">
        <SettingsForm />
      </div>
    </div>
  );
}
