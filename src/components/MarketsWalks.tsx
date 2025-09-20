const MarketsWalks = () => {
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

                {/* Sample Event Preview */}
                <div className="bg-white/80 border-2 border-dashed border-nature-300 rounded-lg p-4 max-w-sm mx-auto backdrop-blur-sm">
                  <h4 className="font-semibold text-nature-800 mb-3">
                    Upcoming Event Types
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2 h-2 bg-nature-400 rounded-full"></div>
                      <span>Weekend Nature Walks</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2 h-2 bg-earth-400 rounded-full"></div>
                      <span>Community Market Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Wellness Workshops</span>
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
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-nature-800 mb-3">
                Nature Walks
              </h4>
              <p className="text-nature-700 text-base leading-relaxed">
                Peaceful group walks through scenic natural settings
              </p>
            </div>

            {/* Community Markets */}
            <div className="bg-earth-100 p-8 rounded-xl text-center shadow-sm border border-earth-200">
              <div className="w-16 h-16 bg-earth-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-earth-800 mb-3">
                Community Markets
              </h4>
              <p className="text-earth-700 text-base leading-relaxed">
                Local markets supporting community members and values
              </p>
            </div>

            {/* Wellness Workshops */}
            <div className="bg-gray-100 p-8 rounded-xl text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Wellness Workshops
              </h4>
              <p className="text-gray-700 text-base leading-relaxed">
                Educational sessions on wellness and naturist philosophy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsWalks;
