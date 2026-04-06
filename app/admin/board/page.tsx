import { getAllBoardMembers } from "@/lib/db/queries";
import DeleteButton from "../events/components/DeleteButton";
import { revalidatePath } from "next/cache";

export default async function AdminBoardPage() {
  const boardMembers = await getAllBoardMembers();

  async function deleteBoardMember(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) throw new Error("Board member ID required");

    const { deleteBoardMember } = await import("@/lib/db/actions");
    await deleteBoardMember(id);
    revalidatePath("/admin/board");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board Members</h1>
          <p className="mt-1 text-gray-600">Manage board and council members</p>
        </div>
        <a
          href="/admin/board/new"
          className="px-4 py-2 bg-earth-600 text-white rounded-md hover:bg-earth-700 font-medium"
        >
          Add Board Member
        </a>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {boardMembers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No board members yet.</p>
            <a
              href="/admin/board/new"
              className="text-earth-600 hover:text-earth-700 font-medium"
            >
              Add your first board member →
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sort Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Years in Naturism
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Council
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {boardMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      {member.nickname && (
                        <div className="text-sm text-gray-500">
                          &ldquo;{member.nickname}&rdquo;
                        </div>
                      )}
                      {member.otherOrganizations && member.otherOrganizations.length > 0 && (
                        <div className="text-xs text-gray-500">
                          {member.otherOrganizations.join(", ")}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        member.role === "Director"
                          ? "bg-nature-100 text-nature-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.sortId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.yearsInNaturism}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.communityCouncil ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.active ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 justify-end">
                      <a
                        href={`/admin/board/${member.id}/edit`}
                        className="text-nature-600 hover:text-nature-900"
                      >
                        Edit
                      </a>
                      <DeleteButton
                        id={member.id}
                        title={member.name}
                        deleteAction={deleteBoardMember}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
