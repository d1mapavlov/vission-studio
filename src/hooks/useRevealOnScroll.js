import { useEffect } from "react";

export function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      isMobile
        ? { threshold: 0.08, rootMargin: "0px 0px 4% 0px" }
        : { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
