import Board from "./components/Board";
import Constitution from "./components/Constitution";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JoinUs from "./components/JoinUs";
import Login from "./components/Login";
import MarketsWalks from "./components/MarketsWalks";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <Constitution />
        <MarketsWalks />
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

