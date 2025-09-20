import { useState } from "react";
import Hero from "./components/Hero";
import Constitution from "./components/Constitution";
import MarketsWalks from "./components/MarketsWalks";
import Board from "./components/Board";
import Join from "./components/Join";
import Login from "./components/Login";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "constitution", label: "Constitution" },
    { id: "markets-walks", label: "Markets & Walks" },
    { id: "board", label: "Board" },
    { id: "join", label: "Join" },
    { id: "login", label: "Login" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-nature-700">
                Naturist Cafe Community
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-nature-700 border-b-2 border-nature-500"
                        : "text-gray-600 hover:text-nature-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                title="Open menu"
                className="text-gray-600 hover:text-nature-600 p-2"
              >
                <svg
                  className="icon-md"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <Constitution />
        <MarketsWalks />
        <Board />
        <Join />
        <Login />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2025 Naturist Cafe Community. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Based in South Africa • Promoting naturist culture and community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
