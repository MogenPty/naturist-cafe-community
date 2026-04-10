import Board from "./components/Board";
import Constitution from "./components/Constitution";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JoinUs from "./components/JoinUs";
import Login from "./components/Login";
import MarketsWalks from "./components/MarketsWalks";

import { getContentBySection } from "./lib/db/queries";

import "./public.css";

export default async function App() {
  // Fetch content from database
  const [
    heroTitleContent,
    heroSubtitleContent,
    heroCtaText,
    heroImageContent,
    constitutionValuesContent,
    constitutionImageContent,
    marketsWalksTitleContent,
    marketsWalksQuoteContent,
  ] = await Promise.all([
    getContentBySection("hero_title"),
    getContentBySection("hero_subtitle"),
    getContentBySection("hero_cta"),
    getContentBySection("hero_image"),
    getContentBySection("constitution_values"),
    getContentBySection("constitution_image"),
    getContentBySection("markets_walks_title"),
    getContentBySection("markets_walks_quote"),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero
          title={heroTitleContent?.textValue || "The Naturist Café Community"}
          subtitle={
            heroSubtitleContent?.textValue ||
            "A cultural association of naturists and nudists in terms of sections 30 and 31 of the Constitution of the Republic of South Africa."
          }
          imagePublicId={heroImageContent?.imagePublicId || "ncc_001"}
          imageAlt={heroImageContent?.imageAlt || "Community Directors"}
          ctaText={heroCtaText?.textValue || "Learn About Us"}
        />
        <Constitution
          values={
            constitutionValuesContent?.textValue ||
            `<ul>
          <li>Respect for others</li>
          <li>Respect for ourselves</li>
          <li>Non-judgmentalism</li>
          <li>Non-discrimination</li>
          <li>Non-racialism</li>
          <li>Non-sexual</li>
          <li>Family-friendly</li>
          <li>Peace</li>
          <li>Safety</li>
          <li>Respect for nature</li>
        </ul>`
          }
          imagePublicId={constitutionImageContent?.imagePublicId || "ncc_002"}
          imageAlt={constitutionImageContent?.imageAlt || "Three Naturists"}
        />
        <MarketsWalks
          title={marketsWalksTitleContent?.textValue || "Markets & Walks"}
          quote={
            marketsWalksQuoteContent?.textValue ||
            "our culture is based on going naked in order to delight in the wellness that comes with being in one's natural state, socially or individually, outdoors or indoors, without shame or fear;"
          }
        />
        <Board />
        <JoinUs />
        <Login />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2025 Naturist Café Community. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Based in South Africa • Preserving, promoting, and developing the
              culture and community of naturism.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Fast Refresh test Sun, Apr  5, 2026 10:58:19 PM
