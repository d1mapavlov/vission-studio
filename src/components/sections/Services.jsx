import React from "react";
import { services } from "../../data/siteData";
import ArrowRight from "../ui/ArrowRight";
import Reveal from "../ui/Reveal";

const serviceNeedMap = {
  Сайт: "Сайт / лендинг",
  "Mini App": "Telegram Mini App",
  "Telegram-бот": "Telegram-бот",
  Дизайн: "UI/UX-дизайн",
  Трафик: "SEO / реклама",
  "Под ключ": "Под ключ",
};

function ServiceRow({ service, index }) {
  const [num, title, text] = service;
  const selectedNeed = serviceNeedMap[title] || title;

  const selectService = (event) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("vission:select-need", {
        detail: { need: selectedNeed },
      }),
    );
  };

  return (
    <Reveal
      as="a"
      href="#request-needs"
      className="service-row"
      delay={index * 60}
      onClick={selectService}
    >
      <span className="service-main">
        <span className="mono">{num}</span>
        <strong>{title}</strong>
      </span>
      <span className="service-meta">
        <span>{text}</span>
        <ArrowRight up />
      </span>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container services-head">
        <Reveal>
          <h2 className="mega-title">Услуги</h2>
        </Reveal>
        <p>Всё, что нужно для присутствия в интернете - от идеи до запуска.</p>
      </div>
      <div className="container services-list">
        {services.map((service, index) => (
          <ServiceRow service={service} index={index} key={service[1]} />
        ))}
      </div>
    </section>
  );
}
