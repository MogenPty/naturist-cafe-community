import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Event</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <EventForm event={null} />
      </div>
    </div>
  );
}
