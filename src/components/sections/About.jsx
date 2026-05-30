import React from "react";
import Reveal from "../ui/Reveal";

export default function About({ data }) {
  const { aboutCards, aboutTitle, stats } = data;

  return (
    <section id="about" className="about">
      <div className="container section-block">
        <Reveal>
          <h2 className="mega-title">{aboutTitle}</h2>
        </Reveal>
        <Reveal className="stats-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="about-grid">
          {aboutCards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
