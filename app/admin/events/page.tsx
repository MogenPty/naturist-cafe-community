import { getAllEvents } from "@/lib/db/queries";
import DeleteButton from "./components/DeleteButton";
import { revalidatePath } from "next/cache";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  async function deleteEvent(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) throw new Error("Event ID required");

    const { deleteEvent } = await import("@/lib/db/actions");
    await deleteEvent(id);
    revalidatePath("/admin/events");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="mt-1 text-gray-600">Create and manage community events</p>
        </div>
        <a
          href="/admin/events/new"
          className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
        >
          Add Event
        </a>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {events.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No events created yet.</p>
            <a
              href="/admin/events/new"
              className="text-nature-600 hover:text-nature-700 font-medium"
            >
              Create your first event →
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recurring
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {event.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        event.type === "walk"
                          ? "bg-nature-100 text-nature-800"
                          : event.type === "market"
                          ? "bg-earth-100 text-earth-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.startTime && (
                        <div className="text-xs text-gray-500">
                          {new Date(event.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.endDate).toLocaleDateString()}
                      {event.endTime && (
                        <div className="text-xs text-gray-500">
                          {new Date(event.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.recurring ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 justify-end">
                      <a
                        href={`/admin/events/${event.id}/edit`}
                        className="text-nature-600 hover:text-nature-900"
                      >
                        Edit
                      </a>
                      <DeleteButton
                        id={event.id}
                        title={event.title}
                        deleteAction={deleteEvent}
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
