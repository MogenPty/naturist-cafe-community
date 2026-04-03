import { notFound } from "next/navigation";
import { getEventById } from "@/lib/db/queries";
import EventForm from "@/components/admin/EventForm";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Event</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <EventForm event={event} />
      </div>
    </div>
  );
}
