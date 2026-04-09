import { revalidatePath } from "next/cache";
import DeleteButton from "../../components/admin/DeleteButton";
import { getAllContent } from "../../lib/db/queries";

export default async function AdminContentPage() {
  const contents = await getAllContent();

  async function deleteContentItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) throw new Error("Content ID required");

    const { deleteContent } = await import("../../lib/db/actions");
    await deleteContent(id);
    revalidatePath("/admin/content");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="mt-1 text-gray-600">
            Manage text and images displayed on the website
          </p>
        </div>
        <a
          href="/admin/content/new"
          className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
        >
          Add Content
        </a>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {contents.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No content items yet.</p>
            <a
              href="/admin/content/new"
              className="text-nature-600 hover:text-nature-700 font-medium"
            >
              Create your first content item →
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sort
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
                {contents.map((content) => (
                  <tr key={content.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm font-mono text-nature-700 bg-nature-50 px-2 py-1 rounded">
                        {content.section}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          content.contentType === "image"
                            ? "bg-purple-100 text-purple-800"
                            : content.contentType === "html"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {content.contentType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {content.contentType === "image" ? (
                          <span className="text-gray-500">
                            Image: {content.imagePublicId || "No ID"}
                          </span>
                        ) : (
                          content.textValue || "(empty)"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {content.sortOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          content.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {content.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 justify-end">
                      <a
                        href={`/admin/content/${content.id}/edit`}
                        className="text-nature-600 hover:text-nature-900"
                      >
                        Edit
                      </a>
                      <DeleteButton
                        id={content.id}
                        title={content.section}
                        deleteAction={deleteContentItem}
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
