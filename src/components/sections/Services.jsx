import React from "react";
import ArrowRight from "../ui/ArrowRight";
import Reveal from "../ui/Reveal";

function ServiceRow({ service, index }) {
  const [num, title, text, selectedNeed] = service;

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

export default function Services({ data }) {
  const { services, servicesCopy } = data;

  return (
    <section id="services" className="services">
      <div className="container services-head">
        <Reveal>
          <h2 className="mega-title">{servicesCopy.title}</h2>
        </Reveal>
        <p>{servicesCopy.text}</p>
      </div>
      <div className="container services-list">
        {services.map((service, index) => (
          <ServiceRow service={service} index={index} key={service[1]} />
        ))}
      </div>
    </section>
  );
}
