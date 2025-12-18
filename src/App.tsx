import { useEffect, useState } from "react";
import Board from "./components/Board";
import Constitution from "./components/Constitution";
import ContactForm from "./components/contactForm";
import Hero from "./components/Hero";
import { ImageLoader } from "./components/ImageLoader";
import JoinUs from "./components/JoinUs";
import Login from "./components/Login";
import MarketsWalks from "./components/MarketsWalks";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "constitution", label: "Constitution" },
  { id: "markets-walks", label: "Markets & Walks" },
  { id: "board", label: "Board" },
  { id: "login", label: "Login" },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Scroll-based navigation detection for larger screens
  useEffect(() => {
    const handleScroll = () => {
      // Only apply on lg screens and above
      if (window.innerWidth < 1024) return;

      const sections = navigationItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleResize = () => {
      // Trigger scroll handler on resize to check screen size
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 !bg-[#343f56]/95 backdrop-blur-md shadow-sm z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between w-full h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ImageLoader
                className="logo"
                alt="NCC Logo"
                publicId="ncc-logo-trans-h156"
                height={36}
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navigationItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-sm font-medium transition-all duration-200 rounded-md ${
                      activeSection === item.id
                        ? "!text-white !bg-blue-600 hover:!bg-blue-700"
                        : "text-white hover:text-nature-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                title="Toggle menu"
                className="!text-white hover:text-nature-600 p-2"
              >
                <svg
                  className="icon-md"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Toggle menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Menu panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-lg border-t">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-3 text-sm font-medium transition-colors duration-200 rounded-md ${
                    activeSection === item.id
                      ? "text-nature-700 bg-nature-50"
                      : "text-gray-600 hover:text-nature-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <Constitution />
        <MarketsWalks />
        <Board />
        <JoinUs />
        <Login />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2025 Naturist Café Community. All rights reserved.
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
