import React, { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 950;
const MAX_WAIT_MS = 3000;

const loadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });

const waitForWindowLoad = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    window.addEventListener("load", resolve, { once: true });
  });

export default function SitePreloader({ media = [] }) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let leaveTimer;
    let removeTimer;
    let cancelled = false;
    const startedAt = performance.now();

    const finish = async () => {
      const mediaReady = Promise.all(media.map(loadImage));
      const pageReady = waitForWindowLoad();
      const timeout = new Promise((resolve) => {
        leaveTimer = window.setTimeout(resolve, MAX_WAIT_MS);
      });

      await Promise.race([Promise.all([mediaReady, pageReady]), timeout]);

      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      leaveTimer = window.setTimeout(() => {
        setLeaving(true);
        removeTimer = window.setTimeout(() => setVisible(false), 780);
      }, wait);
    };

    finish();

    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, [media]);

  if (!visible) return null;

  return (
    <div className={`site-preloader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="preloader-mark">
        <img src="/vission-studio-icon-black.png" alt="" />
      </div>
      <span className="preloader-line" />
    </div>
  );
}
