import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { getUpcomingEvents } from "../lib/db/queries";
import Calendar from "./Calendar";

// import MarketIcon from "../assets/market.svg";
// import WalkIcon from "../assets/walk.svg";
// import WorkshopIcon from "../assets/workshop.svg";
// import type { Event } from "../lib/db/schema";

interface MarketsWalksProps {
  title?: string;
  quote?: string;
}

const MarketsWalks = async ({
  title = "Markets & Walks",
  quote = "our culture is based on going naked in order to delight in the wellness that comes with being in one's natural state, socially or individually, outdoors or indoors, without shame or fear;",
}: MarketsWalksProps) => {
  const upcomingEvents = await getUpcomingEvents();

  // Function to get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "walk":
        return "bg-nature-500 text-white";
      case "market":
        return "bg-earth-500 text-white";
      case "workshop":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Function to get urgency styling based on proximity to current date
  const getUrgencyStyle = (startDate: Date) => {
    const today = new Date();
    const eventDate = new Date(startDate);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return "border-red-300 bg-red-50";
    } else if (diffDays <= 14) {
      return "border-yellow-300 bg-yellow-50";
    } else {
      return "border-green-300 bg-green-50";
    }
  };

  // Function to format date range
  const formatDateRange = (
    startDate: Date,
    endDate: Date,
    startTime: Date | null | undefined,
    endTime: Date | null | undefined,
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      weekday: "short",
    };

    const startDateText = start.toLocaleDateString("en-US", formatOptions);
    const endDateText = end.toLocaleDateString("en-US", formatOptions);

    // Format times if available
    const formatTime = (time: Date | null | undefined) => {
      if (!time) return "";
      return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const startTimeStr = formatTime(startTime);
    const endTimeStr = formatTime(endTime);

    if (start.toDateString() === end.toDateString()) {
      // Single day event
      return {
        dateText: startDateText,
        timeText:
          startTimeStr && endTimeStr ? `${startTimeStr} - ${endTimeStr}` : "",
      };
    } else {
      // Multi-day event
      return {
        dateText:
          `${startDateText} ${startTimeStr} - ${endDateText} ${endTimeStr}`.trim(),
        timeText: "",
      };
    }
  };

  return (
    <section
      id={"markets-walks"}
      className="section-padding bg-gradient-to-br from-nature-50 to-earth-50 relative overflow-hidden z-content"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 z-background">
        <div className="absolute top-10 left-10 w-32 h-32 bg-nature-300 rounded-full"></div>
        <div className="absolute bottom-10 right-0 w-48 h-48 bg-earth-300 rounded-full"></div>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {title}
          </h2>

          {/* Preamble Quote */}
          <blockquote className="text-lg md:text-xl italic text-nature-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            {quote}
          </blockquote>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Events List (Calendar Placeholder) */}
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="text-center p-8">
              <CalendarIcon className="icon-xl mx-auto mb-4 text-nature-400" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Upcoming Events
              </h3>

              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500">No upcoming events scheduled.</p>
              ) : (
                <div className="bg-white/80 border-2 border-dashed border-nature-300 rounded-lg p-4 max-w-2xl mx-auto backdrop-blur-sm">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <Calendar events={upcomingEvents} />
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>This week</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Next 2 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Later</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Categories */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Nature Walks */}
            <div className="bg-nature-100 p-8 rounded-xl text-center shadow-sm border border-nature-200">
              <div className="w-16 h-16 bg-nature-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/assets/walk.svg"
                  alt="Walking people"
                  className="w-8 h-8 filter brightness-0 invert"
                  width={32}
                  height={32}
                />
              </div>
              <h4 className="text-xl font-semibold text-nature-800 mb-3">
                Culture Walks
              </h4>
              <p className="text-nature-700 text-base leading-relaxed">
                Naturism group walks
              </p>
            </div>

            {/* Community Markets */}
            <div className="bg-earth-100 p-8 rounded-xl text-center shadow-sm border border-earth-200">
              <div className="w-16 h-16 bg-earth-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/assets/market.svg"
                  alt="Market basket"
                  className="w-8 h-8 filter brightness-0 invert"
                  width={32}
                  height={32}
                />
              </div>
              <h4 className="text-xl font-semibold text-earth-800 mb-3">
                Naturism Markets
              </h4>
              <p className="text-earth-700 text-base leading-relaxed">
                Naturist-friendly marketplaces
              </p>
            </div>

            {/* Wellness Workshops */}
            <div className="bg-gray-100 p-8 rounded-xl text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/assets/workshop.svg"
                  alt="Workshop tools"
                  className="w-8 h-8 filter brightness-0 invert"
                  width={32}
                  height={32}
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Gymnology
              </h4>
              <p className="text-gray-700 text-base leading-relaxed">
                Research on naturism
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsWalks;
