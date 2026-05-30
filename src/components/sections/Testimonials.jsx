import React, { useMemo, useState } from "react";
import Reveal from "../ui/Reveal";

export default function Testimonials({ data }) {
  const { reviews, testimonials } = data;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  const positions = useMemo(() => {
    return reviews.map((_, index) => {
      const raw = index - active;
      const half = reviews.length / 2;
      let offset = raw;
      if (raw > half) offset = raw - reviews.length;
      if (raw < -half) offset = raw + reviews.length;
      const abs = Math.abs(offset);
      return {
        offset,
        opacity: abs > 2 ? 0 : abs === 0 ? 1 : abs === 1 ? 0.62 : 0.24,
        z: 10 - abs,
        transform: `translate(-50%, -50%) translateX(${offset * 300}px) translateZ(${-abs * 110}px) rotateY(${offset * 20}deg) scale(${1 - abs * 0.14})`,
      };
    });
  }, [active]);

  const next = () => setActive((value) => (value + 1) % reviews.length);
  const prev = () => setActive((value) => (value - 1 + reviews.length) % reviews.length);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <Reveal className="reviews-heading">
          <p className="mono eyebrow">{testimonials.eyebrow}</p>
          <h2>{testimonials.title}</h2>
        </Reveal>
        <div className="reviews-stage">
          <button className="review-arrow left" aria-label={testimonials.prevLabel} onClick={prev}>
            ‹
          </button>
          <button className="review-arrow right" aria-label={testimonials.nextLabel} onClick={next}>
            ›
          </button>
          <div className="review-space">
            {reviews.map((src, index) => (
              <button
                className="review-card"
                style={{
                  transform: positions[index].transform,
                  opacity: positions[index].opacity,
                  zIndex: positions[index].z,
                }}
                key={src}
                onClick={() => (index === active ? setZoom(src) : setActive(index))}
                aria-label={`${testimonials.reviewLabel} ${index + 1}`}
              >
                <img
                  className="review-blur"
                  src={src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <span className="review-overlay" />
                <img
                  className="review-main"
                  src={src}
                  alt={`${testimonials.reviewLabel} ${index + 1}`}
                  draggable="false"
                  loading={index === active ? "eager" : "lazy"}
                  fetchPriority={index === active ? "high" : "low"}
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="review-dots" aria-label={testimonials.dotsLabel}>
          {reviews.map((_, index) => (
            <button
              key={index}
              className={index === active ? "is-active" : ""}
              aria-label={`${testimonials.dotLabel} ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        {/* <div className="all-reviews">
          <a href="https://t.me/nyxUSDT" target="_blank" rel="noreferrer">
            Все отзывы
          </a>
        </div> */}
      </div>
      {zoom && (
        <button className="review-modal" onClick={() => setZoom(null)} aria-label={testimonials.closeLabel}>
          <img src={zoom} alt={testimonials.zoomAlt} loading="eager" decoding="async" />
        </button>
      )}
    </section>
  );
}
