"use client";

import { useState } from "react";
import { createBoardMember, updateBoardMember } from "@/lib/db/actions";
import { useRouter } from "next/navigation";
import { BoardMember } from "@/lib/db/schema";

interface BoardMemberFormProps {
  member?: BoardMember | null;
}

export default function BoardMemberForm({ member }: BoardMemberFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!member;

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (isEditing) {
        await updateBoardMember(member.id, formData);
      } else {
        await createBoardMember(formData);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/board");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">
            Board member {isEditing ? "updated" : "created"} successfully! Redirecting...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={member?.name || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="Vongani Nkuna"
          />
        </div>

        {/* Nickname */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            Nickname / Preferred Name
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            defaultValue={member?.nickname || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="Vonks"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role *
          </label>
          <select
            name="role"
            id="role"
            required
            defaultValue={member?.role || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
          >
            <option value="">Select role</option>
            <option value="Director">Director</option>
            <option value="Councillor">Councillor</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sortId" className="block text-sm font-medium text-gray-700">
            Sort Order *
          </label>
          <input
            type="number"
            name="sortId"
            id="sortId"
            required
            min={1}
            defaultValue={member?.sortId || 1}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower numbers appear first
          </p>
        </div>

        {/* Years in Naturism */}
        <div>
          <label
            htmlFor="yearsInNaturism"
            className="block text-sm font-medium text-gray-700"
          >
            Years in Naturism *
          </label>
          <input
            type="number"
            name="yearsInNaturism"
            id="yearsInNaturism"
            required
            min={0}
            defaultValue={member?.yearsInNaturism || 0}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="8"
          />
        </div>

        {/* Other Organizations */}
        <div className="md:col-span-2">
          <label
            htmlFor="otherOrganizations"
            className="block text-sm font-medium text-gray-700"
          >
            Other Organizations
          </label>
          <input
            type="text"
            name="otherOrganizations"
            id="otherOrganizations"
            defaultValue={member?.otherOrganizations?.join(", ") || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="Naturist Café Arthouse Films, Bare Bliss Naturists Group"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple organizations with commas
          </p>
        </div>

        {/* Community Council */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="communityCouncil"
            id="communityCouncil"
            defaultChecked={member?.communityCouncil || false}
            className="h-4 w-4 text-earth-600 focus:ring-earth-500 border-gray-300 rounded"
          />
          <label htmlFor="communityCouncil" className="ml-2 block text-sm text-gray-900">
            Member of Community Council
          </label>
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={member?.active !== false}
            className="h-4 w-4 text-earth-600 focus:ring-earth-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Active (visible on website)
          </label>
        </div>

        {/* Profile Image URL */}
        <div className="md:col-span-2">
          <label
            htmlFor="profileImageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image URL
          </label>
          <input
            type="text"
            name="profileImageUrl"
            id="profileImageUrl"
            defaultValue={member?.profileImageUrl || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-earth-500 focus:border-earth-500 focus:outline-none"
            placeholder="/images/profile.jpg or Cloudinary URL"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <a
          href="/admin/board"
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={loading || success}
          className="px-4 py-2 bg-earth-600 text-white rounded-md hover:bg-earth-700 font-medium disabled:opacity-50"
        >
          {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Member" : "Create Member"}
        </button>
      </div>
    </form>
  );
}
