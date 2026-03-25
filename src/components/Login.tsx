import { LockIcon, LogIn, Mail, User } from "lucide-react";
import { useState } from "react";
import { ImageLoader } from "./ImageLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log("Login attempt:", { email, password });
  };

  return (
    <section
      id={"login"}
      className="section-padding bg-gray-900 text-white relative overflow-hidden z-content"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 z-background">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-nature-900 to-earth-900"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-nature-700 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-earth-700 rounded-full"></div>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Member Content
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Coming Soon, Under Construction
            {/* Access exclusive content, discussions, and participate in online
            community discussions */}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4 items-stretch">
            {/* Login Form */}
            <div className="modern-form-container col-span-1 lg:col-span-1 md:col-span-2 max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">
                  Welcome Back
                </h3>
                <p className="text-sm text-gray-600">
                  Coming Soon, Under Construction
                  {/* Sign in to access exclusive member content */}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-gray-800 uppercase tracking-wide"
                  >
                    Email Address
                  </label>
                  <div className="modern-input-group">
                    <Mail className="modern-input-icon" />
                    <input
                      type="email"
                      id={`email`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="modern-input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-gray-800 uppercase tracking-wide"
                  >
                    Password
                  </label>
                  <div className="modern-input-group">
                    <LockIcon className="modern-input-icon" />
                    <input
                      type="password"
                      id={`password`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="modern-input"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center cursor-pointer">
                    <div className="modern-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </div>
                    <span className="ml-2 text-xs text-gray-700 font-medium">
                      Keep me signed in
                    </span>
                  </label>
                  <a
                    href="/#"
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors relative group"
                  >
                    Reset password
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

                <button
                  type="submit"
                  disabled
                  className="modern-button cursor-not-allowed"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Sign In to Community
                  </span>
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 md:col-span-3 overflow-hidden">
              <ImageLoader
                className="w-full h-full object-cover rounded-2xl"
                alt="Community Directors"
                publicId="ncc_005"
                aspectRatio="4:3"
                width={800}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
