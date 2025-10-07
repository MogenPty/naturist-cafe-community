import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookie-utils";
import { calculateAge } from "../utils/age-utils";

function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already verified their age
    const storedDOB = getCookie("dateOfBirth");
    if (storedDOB) {
      const birthDate = new Date(storedDOB);
      const age = calculateAge(birthDate);

      if (age >= 18) {
        // Extend cookie expiry on each visit
        setCookie("dateOfBirth", storedDOB, 24);
        setVerified(true);
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dateOfBirth) {
      setError("Please enter your date of birth");
      return;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Check if date is valid and not in the future
    if (isNaN(birthDate.getTime()) || birthDate > today) {
      setError("Please enter a valid date of birth");
      return;
    }

    const age = calculateAge(birthDate);

    if (age < 18) {
      // Redirect minors away
      window.location.href = "https://web.mogen.co.za";
      return;
    }

    // Store date of birth in cookie (expires in 24 hours)
    setCookie("dateOfBirth", dateOfBirth, 24);
    setVerified(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-nature-50 to-earth-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-50 to-earth-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-nature-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Age Verification Required
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Welcome to the Naturist Cafe Community website. This site contains
              content related to naturism and may include artistic nudity.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-amber-800 mb-1">
                  Content Advisory
                </h3>
                <p className="text-sm text-amber-700">
                  This website is dedicated to naturist philosophy and
                  lifestyle. You must be 18 years or older to access this
                  content.
                </p>
              </div>
            </div>
          </div>

          {/* Age Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Please enter your date of birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]} // Prevent future dates
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button type="submit" className="flex-1 btn-primary">
                Verify Age
              </button>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "https://web.mogen.co.za")
                }
                className="flex-1 btn-secondary"
              >
                Exit
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Your date of birth is stored locally for 24 hours for age
              verification purposes only. We respect your privacy and do not
              share this information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AgeGate;
