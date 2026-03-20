import { ImageLoader } from "./ImageLoader";

const Constitution = () => {
  const handleDownload = () => {
    // Create a link to download the PDF
    const link = document.createElement("a");
    link.href = "/community_constitution.pdf"; // You'll need to place the PDF in the public folder
    link.download = "Naturist_Cafe_Community_Constitution.pdf";
    link.click();
  };

  return (
    <section id={`constitution`} className="section-padding bg-white">
      <div className="container-custom">
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
                  <title>Constitution and Guidelines Icon</title>
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
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-earth-600 text-white rounded-xl font-semibold hover:bg-earth-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Download PDF Icon</title>
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
          <div className="grid md:grid-cols-3 gap-8 mt-12 items-stretch">
            <div className="bg-nature-100 p-8 rounded-xl border border-nature-200 shadow-sm md:col-span-1">
              <div className="w-12 h-12 bg-nature-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Constitution Icon</title>
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

            <div className="bg-earth-100 p-0 rounded-xl border border-earth-200 shadow-sm md:col-span-2 overflow-hidden">
              <ImageLoader
                className="w-full h-full md:h-full object-cover rounded-xl"
                alt="Three Naturists"
                publicId="ncc_002"
                width={800}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Constitution;
