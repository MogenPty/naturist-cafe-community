import WalkIcon from "../assets/walk.svg";
import MarketIcon from "../assets/market.svg";
import WorkshopIcon from "../assets/workshop.svg";

const MarketsWalks = () => {
  // Sample events data with dates and types
  const upcomingEvents = [
    {
      id: 1,
      title: "Weekend Nature Walk",
      type: "walk",
      startDate: "2025-09-28",
      endDate: "2025-09-28",
      startTime: "09:00",
      endTime: "12:00",
      location: "Botanical Gardens",
    },
    {
      id: 2,
      title: "Community Market Day",
      type: "market",
      startDate: "2025-10-05",
      endDate: "2025-10-05",
      startTime: "08:00",
      endTime: "16:00",
      location: "Community Center",
    },
    {
      id: 3,
      title: "Wellness Workshop",
      type: "workshop",
      startDate: "2025-10-12",
      endDate: "2025-10-12",
      startTime: "14:00",
      endTime: "17:00",
      location: "NCC Hall",
    },
    {
      id: 4,
      title: "Weekend Nature Camp",
      type: "walk",
      startDate: "2025-10-20",
      endDate: "2025-10-22",
      startTime: "17:00",
      endTime: "14:00",
      location: "Mountain Resort",
    },
    {
      id: 5,
      title: "Mindfulness Session",
      type: "workshop",
      startDate: "2025-11-15",
      endDate: "2025-11-15",
      startTime: "10:00",
      endTime: "12:00",
      location: "NCC Hall",
    },
  ];

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
  const getUrgencyStyle = (startDate: string) => {
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
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      weekday: "short",
    };

    if (startDate === endDate) {
      // Single day event
      return {
        dateText: start.toLocaleDateString("en-US", formatOptions),
        timeText: `${startTime} - ${endTime}`,
      };
    } else {
      // Multi-day event - show full start date/time to end date/time
      const startDateText = start.toLocaleDateString("en-US", formatOptions);
      const endDateText = end.toLocaleDateString("en-US", formatOptions);

      return {
        dateText: `${startDateText} ${startTime} - ${endDateText} ${endTime}`,
        timeText: "", // Empty since time is included in dateText for multi-day events
      };
    }
  };

  return (
    <section
      id="markets-walks"
      className="section-padding bg-gradient-to-br from-nature-50 to-earth-50 relative overflow-hidden z-content"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 z-background">
        <div className="absolute top-10 left-10 w-32 h-32 bg-nature-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-earth-300 rounded-full"></div>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Markets & Walks
          </h2>

          {/* Preamble Quote */}
          <blockquote className="text-lg md:text-xl italic text-nature-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            "our culture is based on going naked in order to delight in the
            wellness that comes with being in one's natural state, socially or
            individually, outdoors or indoors, without shame or fear;"
          </blockquote>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Calendar Container */}
          <div className="relative bg-white rounded-xl shadow-lg min-h-[600px] border border-gray-200 overflow-hidden">
            {/* Coming Soon Overlay */}
            <div className="coming-soon-overlay">
              <div className="text-center p-8">
                <svg
                  className="icon-xl mx-auto mb-4 text-nature-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Events Calendar Coming Soon
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Interactive calendar with markets, nature walks, and community
                  events will be available here
                </p>

                {/* Upcoming Events List */}
                <div className="bg-white/80 border-2 border-dashed border-nature-300 rounded-lg p-4 max-w-lg mx-auto backdrop-blur-sm">
                  <h4 className="font-semibold text-nature-800 mb-4 text-center">
                    Upcoming Events
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {upcomingEvents.map((event) => {
                      const { dateText, timeText } = formatDateRange(
                        event.startDate,
                        event.endDate,
                        event.startTime,
                        event.endTime
                      );

                      return (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border-2 ${getUrgencyStyle(
                            event.startDate
                          )} transition-all hover:shadow-sm`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeStyle(
                                    event.type
                                  )}`}
                                >
                                  {event.type === "walk"
                                    ? "Walk"
                                    : event.type === "market"
                                    ? "Market"
                                    : "Workshop"}
                                </span>
                              </div>
                              <h5 className="font-medium text-gray-900 text-sm truncate">
                                {event.title}
                              </h5>
                              <p className="text-xs text-gray-600 mt-1">
                                {dateText}
                              </p>
                              {timeText && (
                                <p className="text-xs text-gray-500">
                                  {timeText} • {event.location}
                                </p>
                              )}
                              {!timeText && (
                                <p className="text-xs text-gray-500">
                                  {event.location}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
              </div>
            </div>

            {/* Placeholder calendar content (hidden behind overlay) */}
            <div className="p-8">
              <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="text-center font-semibold p-2 text-gray-600">
                  Sun
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Mon
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Tue
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Wed
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Thu
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Fri
                </div>
                <div className="text-center font-semibold p-2 text-gray-600">
                  Sat
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-50 rounded border p-2 text-sm"
                  >
                    {i > 5 && i < 32 ? i - 5 : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Categories */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Nature Walks */}
            <div className="bg-nature-100 p-8 rounded-xl text-center shadow-sm border border-nature-200">
              <div className="w-16 h-16 bg-nature-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={WalkIcon}
                  alt="Walking people"
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <h4 className="text-xl font-semibold text-nature-800 mb-3">
                Culture Walks
              </h4>
              <p className="text-nature-700 text-base leading-relaxed">
                Fun, wellness naturism group walks
              </p>
            </div>

            {/* Community Markets */}
            <div className="bg-earth-100 p-8 rounded-xl text-center shadow-sm border border-earth-200">
              <div className="w-16 h-16 bg-earth-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={MarketIcon}
                  alt="Market basket"
                  className="w-8 h-8 filter brightness-0 invert"
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
                <img
                  src={WorkshopIcon}
                  alt="Workshop tools"
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Gymnology
              </h4>
              <p className="text-gray-700 text-base leading-relaxed">
                Studies and research of naturism and nudity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsWalks;
