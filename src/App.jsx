import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import CustomCursor from "./components/ui/CustomCursor";
import SitePreloader from "./components/ui/SitePreloader";
import About from "./components/sections/About";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Portfolio from "./components/sections/Portfolio";
import ProcessAndRequest from "./components/sections/ProcessAndRequest";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import { criticalMedia } from "./data/siteData";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";

const contentSections = [
  Portfolio,
  Services,
  About,
  ProcessAndRequest,
  Testimonials,
  Footer,
];

export default function App() {
  useRevealOnScroll();

  useEffect(() => {
    let frame = 0;

    const updateHeroProgress = () => {
      frame = 0;
      const viewport = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / (viewport * 0.85)));
      document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.removeProperty("--hero-progress");
    };
  }, []);

  return (
    <>
      <SitePreloader media={criticalMedia} />
      <CustomCursor />
      <Header />
      <main className="site-main">
        <Hero />
        <div className="site-content">
          {contentSections.map((Section) => (
            <Section key={Section.name} />
          ))}
        </div>
      </main>
    </>
  );
}
