const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container-custom">
        <div className="grid grid-2">
          {/* Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to the{" "}
              <span className="nature-highlight">Naturist Cafe</span> Community
            </h1>

            <p className="hero-subtitle">
              A peaceful association in South Africa dedicated to promoting
              naturist culture, wellness, and community connection through our
              shared values of living authentically in harmony with nature.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() =>
                  document
                    .getElementById("join")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                Join Our Community
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("constitution")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-secondary"
              >
                Learn About Us
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="hero-image">
              {/* Placeholder for hero image */}
              <div className="text-center hero-image-text">
                <svg
                  className="icon-2xl mx-auto mb-4 nature-svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="hero-image-title">
                  Serene Nature Community Image
                </p>
                <p className="hero-image-caption">
                  Tasteful outdoor setting conveying tranquility
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator animate-bounce">
          <svg
            className="icon-md nature-color"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
