import React from "react";
import { brand, telegramLink } from "../../data/siteData";
import ArrowRight from "../ui/ArrowRight";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-label="Главный экран">
      <div className="hero-shade" />
      <div className="hero-gradient-y" />
      <div className="hero-gradient-x" />
      <div className="hero-top-line" />
      <div className="container hero-content">
        <div className="hero-title-wrap first">
          <h1 className="hero-title hero-fill">
            <img
              src={brand.heroTitle}
              alt={brand.name}
              className="hero-logo"
              width="686"
              height="160"
              fetchPriority="high"
              decoding="async"
            />
            <span className="sr-only">
              Vission Studio - разработка сайтов, Telegram Mini Apps, Telegram-ботов и UI/UX-дизайна
            </span>
          </h1>
        </div>
        <div className="hero-title-wrap second">
          <div className="hero-title hero-stroke" aria-hidden="true">
            {brand.heroSubtitle}
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            Сайты, Telegram Mini Apps
            <br />и боты под ключ.
          </p>
          <div className="hero-actions">
            <a className="button light" href={telegramLink} target="_blank" rel="noreferrer">
              Обсудить проект <ArrowRight />
            </a>
            <a className="button ghost" href="#portfolio">
              Портфолио
            </a>
          </div>
        </div>
      </div>
      <div className="hero-side-line" />
    </section>
  );
}
