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
import { criticalMedia, getLocaleFromPath, getSiteData } from "./data/siteData";
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
  const locale = getLocaleFromPath();
  const data = getSiteData(locale);

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

  useEffect(() => {
    const baseUrl = "https://vission-studio.vercel.app";
    const canonical = `${baseUrl}${data.path}`;
    const ruUrl = `${baseUrl}/`;
    const enUrl = `${baseUrl}/en`;

    document.documentElement.lang = data.locale;
    document.title = data.seo.title;

    const setMeta = (selector, value) => {
      const node = document.head.querySelector(selector);
      if (node) node.setAttribute("content", value);
    };

    const setLink = (selector, href) => {
      const node = document.head.querySelector(selector);
      if (node) node.setAttribute("href", href);
    };

    setMeta('meta[name="description"]', data.seo.description);
    setMeta('meta[name="keywords"]', data.seo.keywords);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:title"]', data.seo.title);
    setMeta('meta[property="og:description"]', data.seo.description);
    setMeta('meta[name="twitter:title"]', data.seo.title);
    setMeta('meta[name="twitter:description"]', data.seo.description);
    setLink('link[rel="canonical"]', canonical);
    setLink('link[rel="alternate"][hreflang="ru"]', ruUrl);
    setLink('link[rel="alternate"][hreflang="en"]', enUrl);
    setLink('link[rel="alternate"][hreflang="x-default"]', ruUrl);
  }, [data]);

  return (
    <>
      <SitePreloader media={criticalMedia} />
      <CustomCursor />
      <Header data={data} />
      <main className="site-main">
        <Hero data={data} />
        <div className="site-content">
          {contentSections.map((Section) => (
            <Section key={Section.name} data={data} />
          ))}
        </div>
      </main>
    </>
  );
}
