import WalkIcon from "../assets/walk.svg";
import MarketIcon from "../assets/market.svg";
import WorkshopIcon from "../assets/workshop.svg";

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
                <img
                  src={WalkIcon}
                  alt="Walking people"
                  className="w-8 h-8 filter brightness-0 invert"
                />
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
                <img
                  src={MarketIcon}
                  alt="Market basket"
                  className="w-8 h-8 filter brightness-0 invert"
                />
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
                <img
                  src={WorkshopIcon}
                  alt="Workshop tools"
                  className="w-8 h-8 filter brightness-0 invert"
                />
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
