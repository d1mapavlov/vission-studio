import React from "react";
import { brand, telegramLink } from "../../data/siteData";
import ArrowRight from "../ui/ArrowRight";
import Reveal from "../ui/Reveal";

export default function Footer() {
  return (
    <footer id="cta" className="footer">
      <div className="container">
        <Reveal>
          <h2>
            Запустим ваш
            <br />
            проект вместе
          </h2>
        </Reveal>
        <Reveal className="footer-action">
          <a className="button light" href={telegramLink} target="_blank" rel="noreferrer">
            Написать в Telegram <ArrowRight />
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
