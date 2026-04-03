"use client";

import { useState, useEffect, use } from "react";
import { createEvent, updateEvent } from "@/lib/db/actions";
import { useRouter } from "next/navigation";
import { Event } from "@/lib/db/schema";

interface EventFormProps {
  event?: Event | null;
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!event;

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (isEditing) {
        await updateEvent(event.id, formData);
      } else {
        await createEvent(formData);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/events");
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

  // Helper to format datetime-local input
  function formatDateTimeForInput(date: Date | null | undefined): string {
    if (!date) return "";
    // Convert to local timezone and format for datetime-local
    const d = new Date(date);
    // Adjust for timezone offset to get local time
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
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
            Event {isEditing ? "updated" : "created"} successfully! Redirecting...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={event?.title || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
            placeholder="Weekend Nature Walk"
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Event Type *
          </label>
          <select
            name="type"
            id="type"
            required
            defaultValue={event?.type || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
          >
            <option value="">Select type</option>
            <option value="walk">Walk</option>
            <option value="market">Market</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            defaultValue={event?.location || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
            placeholder="Botanical Gardens"
          />
        </div>

        {/* Start Date & Time */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            required
            defaultValue={formatDateTimeForInput(event?.startDate)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
          />
        </div>

        {/* End Date & Time */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date & Time *
          </label>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            required
            defaultValue={formatDateTimeForInput(event?.endDate)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
          />
        </div>

        {/* Recurring */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="recurring"
            id="recurring"
            defaultChecked={event?.recurring || false}
            className="h-4 w-4 text-nature-600 focus:ring-nature-500 border-gray-300 rounded"
          />
          <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">
            Recurring Event
          </label>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            defaultValue={event?.description || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
            placeholder="Event description..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <a
          href="/admin/events"
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={loading || success}
          className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium disabled:opacity-50"
        >
          {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
}
