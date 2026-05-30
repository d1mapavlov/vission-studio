import React from "react";
import ArrowRight from "../ui/ArrowRight";

export default function Hero({ data }) {
  const { brand, hero, telegramLink } = data;

  return (
    <section id="top" className="hero" aria-label={hero.ariaLabel}>
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
            <span className="sr-only">{hero.srTitle}</span>
          </h1>
        </div>
        <div className="hero-title-wrap second">
          <div className="hero-title hero-stroke" aria-hidden="true">
            {brand.heroSubtitle}
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            {hero.text[0]}
            <br />
            {hero.text[1]}
          </p>
          <div className="hero-actions">
            <a className="button light" href={telegramLink} target="_blank" rel="noreferrer">
              {hero.primaryCta} <ArrowRight />
            </a>
            <a className="button ghost" href="#portfolio">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      <div className="hero-side-line" />
    </section>
  );
}
