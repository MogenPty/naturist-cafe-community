import Link from "next/link";
import { getAllAdmins } from "../../lib/db/queries";
import { requireAdmin } from "../../lib/session/actions";
import AdminList from "../components/AdminList";

export default async function AdminAdminsPage() {
  // Require superadmin access
  await requireAdmin();

  const admins = await getAllAdmins();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Admins</h1>
          <p className="mt-1 text-gray-600">
            View and manage administrator accounts
          </p>
        </div>
        <Link
          href="/admin/admins/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Invite Admin
        </Link>
      </div>

      <AdminList admins={admins} />
    </div>
  );
}
