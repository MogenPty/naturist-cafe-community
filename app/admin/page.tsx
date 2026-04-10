import Link from "next/link";
import {
  getActiveBoardMembers,
  getAllAdmins,
  getAllEvents,
} from "../lib/db/queries";
import { getUserWithRole } from "../lib/session/actions";

export default async function AdminDashboard() {
  const { user, role } = await getUserWithRole();
  const [boardMembers, admins, events] = await Promise.all([
    getActiveBoardMembers(),
    getAllAdmins(),
    getAllEvents(),
  ]);

  const stats = [
    {
      name: "Total Events",
      value: events.length,
      href: "/admin/events",
      color: "bg-nature-500",
    },
    {
      name: "Upcoming Events",
      value: events.filter((e) => new Date(e.startDate) >= new Date()).length,
      href: "/admin/events",
      color: "bg-earth-500",
    },
    {
      name: "Board Members",
      value: boardMembers.length,
      href: "/admin/board",
      color: "bg-gray-500",
    },
    {
      name: "Active Admins",
      value: admins.length,
      href: "/admin/admins",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back, {user.name || user.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/events/new"
            className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
          >
            Add Event
          </Link>
          {role === "admin" && (
            <Link
              href="/admin/board/new"
              className="px-4 py-2 bg-earth-600 text-white rounded-md hover:bg-earth-700 font-medium"
            >
              Add Board Member
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <div className="w-8 h-8" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Events</h2>
          <Link
            href="/admin/events"
            className="text-nature-600 hover:text-nature-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        {events.length === 0 ? (
          <p className="text-gray-500">
            No events yet. Create your first event!
          </p>
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.slice(0, 5).map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="text-nature-600 hover:text-nature-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/events/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-nature-500 hover:bg-nature-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">Create Event</span>
          </Link>
          <Link
            href="/admin/board/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-earth-500 hover:bg-earth-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">Add Board Member</span>
          </Link>
          <Link
            href="/"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">View Website</span>
          </Link>
          <Link
            href="/admin/board"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">Manage Board</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
