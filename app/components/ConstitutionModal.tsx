"use client";

import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Set up the worker for PDF.js using local dependency
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface ConstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConstitutionModal = ({ isOpen, onClose }: ConstitutionModalProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(null);
    },
    [],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please try downloading the document.");
    setLoading(false);
  }, []);

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/community_constitution.pdf";
    link.download = "Naturist_Cafe_Community_Constitution.pdf";
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Community Constitution
            </h2>
            {numPages && (
              <p className="text-sm text-gray-600 mt-1">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex flex-col">
          {error ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  PDF Load Error
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                >
                  Download PDF Instead
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* PDF Display Area */}
              <div className="flex-1 overflow-auto flex items-center justify-center py-4 md:pt-80 md:pb-[10px]">
                {loading && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600"></div>
                    <span className="ml-3 text-gray-600">Loading PDF...</span>
                  </div>
                )}

                <Document
                  file="./community_constitution.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  className="flex justify-center px-1.5"
                  loading={null}
                >
                  <Page
                    pageNumber={pageNumber}
                    className="shadow-lg"
                    width={Math.min(800, window.innerWidth - 100)}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </div>

              {/* Navigation Controls */}
              {numPages && (
                <div className="flex-shrink-0 flex items-center justify-between p-4 bg-white border-t border-gray-200">
                  {pageNumber > 1 ? (
                    <button
                      type="button"
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden md:inline">Previous</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 w-12 md:w-30"></div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="pageInput"
                        className="text-sm text-gray-600"
                      >
                        Page
                      </label>
                      <input
                        id={`pageInput`}
                        type="number"
                        min={1}
                        placeholder="-"
                        max={numPages}
                        value={pageNumber}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (page >= 1 && page <= numPages) {
                            setPageNumber(page);
                          }
                        }}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                      />
                      <span className="text-sm text-gray-600">
                        of {numPages}
                      </span>
                    </div>
                  </div>

                  {pageNumber < numPages ? (
                    <button
                      type="button"
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="hidden md:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 w-12 md:w-30"></div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstitutionModal;
