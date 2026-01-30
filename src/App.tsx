import { useState } from "react";
import { Scene } from "./components/3d/Scene";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { ReviewsSection } from "./components/sections/ReviewsSection";
import { RiccsSection } from "./components/sections/RiccsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { LoadingScreen } from "./components/ui/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 3D Background - Always mounted to load in background */}
      <Scene />

      {/* Main Content */}
      <div
        className="content-wrapper"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 1s ease-in-out",
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <Header />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <PortfolioSection />
          <RiccsSection />
          <ReviewsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
