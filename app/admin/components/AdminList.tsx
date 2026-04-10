"use client";

import { useState } from "react";
import { removeAdmin, updateAdminRole } from "../../lib/db/actions";
import type { Admin, NeonUser } from "../../lib/db/schema";

interface AdminListProps {
  admins: (Admin & NeonUser)[];
}

export default function AdminList({ admins }: AdminListProps) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  const handleEdit = (adminId: string) => {
    setEditingId(adminId);
    // Find the admin to get current role
    const admin = admins.find((a) => a.id === adminId);
    if (admin) {
      setNewRole(admin.role);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewRole("");
  };

  const handleSaveEdit = async (adminId: string) => {
    if (!newRole) return;
    setLoading(true);
    try {
      await updateAdminRole(
        adminId,
        newRole as "superadmin" | "admin" | "editor" | undefined,
      );
      setEditingId(null);
      setNewRole("");
      // In a real app, you might want to refetch or update optimistically
    } catch {
      alert("Failed to update admin role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (adminId: string) => {
    setRemovingId(adminId);
  };

  const handleCancelRemove = () => {
    setRemovingId(null);
  };

  const handleConfirmRemove = async (adminId: string) => {
    setLoading(true);
    try {
      await removeAdmin(adminId);
      setRemovingId(null);
      // In a real app, you might want to refetch or update optimistically
    } catch {
      alert("Failed to remove admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (admins.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center py-8">
          No administrators found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => {
              const isEditing = editingId === admin.id;
              const isRemoving = removingId === admin.id;

              return (
                <tr
                  key={admin.id}
                  className={isEditing || isRemoving ? "bg-gray-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {admin.name}
                    {admin.image && (
                      <img
                        src={admin.image}
                        alt={`${admin.name}'s profile`}
                        className="h-6 w-6 rounded-full ml-2"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isEditing ? (
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="none">None</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          admin.role === "superadmin"
                            ? "bg-blue-100 text-blue-800"
                            : admin.role === "admin"
                              ? "bg-earth-100 text-earth-800"
                              : admin.role === "editor"
                                ? "bg-nature-100 text-nature-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {admin.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLogin ? (
                      new Date(admin.lastLogin).toLocaleString()
                    ) : (
                      <span className="italic">Never</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                    {!isEditing && !isRemoving ? (
                      <>
                        <button
                          onClick={() => handleEdit(admin.id)}
                          className="text-nature-600 hover:text-nature-900"
                        >
                          Edit Role
                        </button>
                        <button
                          onClick={() => handleRemove(admin.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </>
                    ) : isEditing ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(admin.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-nature-600 text-white rounded hover:bg-nature-700 disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleConfirmRemove(admin.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {loading ? "Removing..." : "Remove"}
                        </button>
                        <button
                          onClick={handleCancelRemove}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
