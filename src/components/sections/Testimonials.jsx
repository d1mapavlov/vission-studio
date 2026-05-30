import React, { useMemo, useState } from "react";
import { reviews } from "../../data/siteData";
import Reveal from "../ui/Reveal";

export default function Testimonials() {
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
          <p className="mono eyebrow">Отзывы</p>
          <h2>Что говорят клиенты</h2>
        </Reveal>
        <div className="reviews-stage">
          <button className="review-arrow left" aria-label="Предыдущий отзыв" onClick={prev}>
            ‹
          </button>
          <button className="review-arrow right" aria-label="Следующий отзыв" onClick={next}>
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
                aria-label={`Отзыв клиента ${index + 1}`}
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
                  alt={`Отзыв клиента ${index + 1}`}
                  draggable="false"
                  loading={index === active ? "eager" : "lazy"}
                  fetchPriority={index === active ? "high" : "low"}
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="review-dots" aria-label="Выбор отзыва">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={index === active ? "is-active" : ""}
              aria-label={`Перейти к отзыву ${index + 1}`}
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
        <button className="review-modal" onClick={() => setZoom(null)} aria-label="Закрыть отзыв">
          <img src={zoom} alt="Увеличенный отзыв" loading="eager" decoding="async" />
        </button>
      )}
    </section>
  );
}
