import React from "react";
import ArrowRight from "../ui/ArrowRight";
import Reveal from "../ui/Reveal";

export default function Footer({ data }) {
  const { brand, footer, telegramLink } = data;

  return (
    <footer id="cta" className="footer">
      <div className="container">
        <Reveal>
          <h2>
            {footer.title[0]}
            <br />
            {footer.title[1]}
          </h2>
        </Reveal>
        <Reveal className="footer-action">
          <a className="button light" href={telegramLink} target="_blank" rel="noreferrer">
            {footer.cta} <ArrowRight />
          </a>
        </Reveal>
        <div className="footer-bottom">
          <strong>{brand.name}</strong>
          <span>© 2026 {brand.name}</span>
        </div>
      </div>
    </footer>
  );
}
