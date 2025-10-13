import { useState } from "react";
import ConstitutionModal from "./ConstitutionModal";

const Constitution = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewConstitution = () => {
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    // Create a link to download the PDF
    const link = document.createElement("a");
    link.href = "/ncc_constitution.pdf"; // You'll need to place the PDF in the public folder
    link.download = "NCC_Constitution.pdf";
    link.click();
  };

  return (
    <>
      <section id="constitution" className="section-padding bg-white">
        <div className="container-custom">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Constitution
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our foundational document outlines our community values,
              guidelines, and commitment to creating a respectful naturist
              environment.
            </p>
          </div> */}

          <div className="max-w-4xl mx-auto">
            {/* Constitution Preview Card */}
            <div className="relative bg-gradient-to-br from-nature-50 to-earth-50 rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
                  <svg
                    className="w-10 h-10 text-nature-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Constitution & Guidelines
                </h3>

                {/* <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Read our complete constitution including community values,
                  membership guidelines, governance structure, and code of
                  conduct. Available for viewing and download.
                </p> */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleViewConstitution}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-nature-600 text-white rounded-xl font-semibold hover:bg-nature-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Constitution
                  </button>

                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-earth-600 text-white rounded-xl font-semibold hover:bg-earth-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-5 h-5"
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
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Constitution Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-nature-100 p-8 rounded-xl border border-nature-200 shadow-sm">
                <div className="w-12 h-12 bg-nature-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-nature-800 mb-3">
                  Our Values
                </h4>
                <ul className="list-disc list-inside text-nature-700 leading-relaxed">
                  <li>Respect for others</li>
                  <li>Respect for ourselves</li>
                  <li>Non-judgmentalism</li>
                  <li>Non-discrimination</li>
                  <li>Non-racialism</li>
                  <li>Non-sexualism</li>
                  <li>Family-friendliness</li>
                  <li>Peace</li>
                  <li>Safety</li>
                  <li>Respect for nature</li>
                </ul>
              </div>

              <div className="bg-earth-100 p-8 rounded-xl border border-earth-200 shadow-sm">
                <div className="w-12 h-12 bg-earth-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-earth-800 mb-3">
                  Community Guidelines
                </h4>
                <p className="text-earth-700 leading-relaxed">
                  Clear principles for creating a safe, welcoming environment
                  with guidelines for conduct, privacy, and mutual respect.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Governance
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Transparent structure for community decisions, member
                  participation, and democratic governance by elected board
                  members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constitution Modal */}
      <ConstitutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Constitution;
