"use client";

import { ChevronDown } from "lucide-react";
import { ImageLoader } from "./ImageLoader";

const Hero = () => {
  return (
    <section id={"home"} className="hero-section mt-4 lg:mt-12">
      <div className="container-custom">
        <div className="grid grid-2">
          {/* Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              The <span className="nature-highlight">Naturist Café</span>{" "}
              Community
            </h1>

            <p className="hero-subtitle">
              A cultural association of naturists and nudists in terms of
              sections 30 and 31 of the Constitution of the Republic of South
              Africa.
            </p>

            <div className="hero-buttons">
              {/* <button
                onClick={() =>
                  document
                    .getElementById("join")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                Join Our Community
              </button> */}
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("constitution")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                Learn About Us
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div>
              <ImageLoader
                className="hero-image"
                alt="Community Directors"
                publicId="ncc_001"
                aspectRatio="4:3"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 md:mt-12 pb-8">
          <div className="animate-bounce">
            <ChevronDown className="icon-md nature-color" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
