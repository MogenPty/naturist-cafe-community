"use client";

import { ChevronDown } from "lucide-react";
import { ImageLoader } from "./ImageLoader";

interface HeroProps {
  title?: string;
  subtitle?: string;
  imagePublicId?: string;
  imageAlt?: string;
  ctaText?: string;
}

const Hero = ({
  title = "The Naturist Café Community",
  subtitle = "A cultural association of naturists and nudists in terms of sections 30 and 31 of the Constitution of the Republic of South Africa.",
  imagePublicId = "ncc_001",
  imageAlt = "Community Directors",
  ctaText = "Learn About Us",
}: HeroProps) => {
  return (
    <section id={"home"} className="hero-section mt-4 lg:mt-12">
      <div className="container-custom">
        <div className="grid grid-2">
          {/* Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="nature-highlight">{title}</span>
            </h1>

            <p className="hero-subtitle">{subtitle}</p>

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
                {ctaText}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div>
              <ImageLoader
                className="hero-image"
                alt={imageAlt}
                publicId={imagePublicId}
                width={800}
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
