const Constitution = () => {
  return (
    <section id="constitution" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Constitution
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our foundational document outlines our community values, guidelines,
            and commitment to creating a respectful naturist environment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* PDF Viewer Placeholder */}
          <div className="relative bg-gray-50 rounded-lg border-2 border-gray-200 min-h-[500px] flex items-center justify-center">
            <div className="text-center">
              <svg
                className="icon-xl mx-auto mb-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                PDF Viewer Placeholder
              </h3>
              <p className="text-gray-500 mb-6">
                Interactive PDF viewer will be integrated here
                <br />
                (React-PDF or similar component)
              </p>

              {/* Mock PDF preview */}
              <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md mx-auto text-left shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">
                  Constitution Preview
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mt-8">
            <button className="btn-primary inline-flex items-center gap-2">
              <svg
                className="icon-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Constitution PDF
            </button>
          </div>

          {/* Constitution Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-nature-50 p-6 rounded-lg">
              <h4 className="font-semibold text-nature-800 mb-2">Our Values</h4>
              <p className="text-sm text-nature-700">
                Respect, acceptance, and authentic living in harmony with nature
                and community.
              </p>
            </div>
            <div className="bg-earth-50 p-6 rounded-lg">
              <h4 className="font-semibold text-earth-800 mb-2">
                Community Guidelines
              </h4>
              <p className="text-sm text-earth-700">
                Clear principles for creating a safe, welcoming environment for
                all members.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Governance</h4>
              <p className="text-sm text-gray-700">
                Transparent structure for community decisions and member
                participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Constitution;
