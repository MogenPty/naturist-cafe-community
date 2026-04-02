"use client";

import { useEffect, useState } from "react";
import { Lock, AlertTriangle } from "lucide-react";
import { getRequiredAdultAge } from "../utils/age-restrictions";
import { calculateAge } from "../utils/age-utils";

const REDIRECT_URL = "https://web.mogen.co.za";
const SESSION_KEY = "ageVerified";

function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [requiredAge, setRequiredAge] = useState<number>(18);

  useEffect(() => {
    // Detect user's location and get required age automatically
    const age = getRequiredAdultAge();
    setRequiredAge(age);

    // Check if user has already verified their age in this session
    const sessionVerified = sessionStorage.getItem(SESSION_KEY);
    if (sessionVerified === "true") {
      setVerified(true);
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
    if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
      setError("Please enter a valid date of birth");
      return;
    }

    const age = calculateAge(birthDate);

    if (age < requiredAge) {
      // Redirect minors away
      window.location.href = REDIRECT_URL;
      return;
    }

    // Store date of birth in cookie (expires in 24 hours)
    sessionStorage.setItem(SESSION_KEY, "true");
    setVerified(true);
  };

  const handleRedirect = () => {
    window.location.href = REDIRECT_URL;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-100 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-nature-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Age Verification Required
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Welcome to the official website of the Naturist Café Community.
              This site is dedicated to the culture of naturism and contains
              nonsexual nudity in accordance with our cultural code of conduct.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-700">
                  To access this website, you must be over the age of 18 and of
                  adult age within the country or state from which you're
                  accessing our website.
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
                title="dateOfBirth"
                id={"dateOfBirth"}
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
                onClick={handleRedirect}
                className="flex-1 btn-secondary"
              >
                Exit
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Your date of birth is stored on your device for age verification
              purposes only. We respect your privacy and do not share this
              information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AgeGate;
