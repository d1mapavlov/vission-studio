import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const stateRef = useRef({ x: -100, y: -100, active: false, down: false, hover: false, frame: 0 });

  useEffect(() => {
    const render = () => {
      const state = stateRef.current;
      state.frame = 0;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      const ringSize = state.hover ? 56 : state.down ? 28 : 36;
      const dotSize = state.hover ? 4 : state.down ? 12 : 8;

      ring.style.opacity = state.active ? "1" : "0";
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.transform = `translate3d(${state.x - ringSize / 2}px, ${state.y - ringSize / 2}px, 0)`;
      ring.style.borderColor = state.hover ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.75)";
      ring.style.backgroundColor = state.hover ? "rgba(255,255,255,.08)" : "transparent";

      dot.style.opacity = state.active ? "1" : "0";
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.transform = `translate3d(${state.x - dotSize / 2}px, ${state.y - dotSize / 2}px, 0)`;
    };

    const schedule = () => {
      if (stateRef.current.frame) return;
      stateRef.current.frame = window.requestAnimationFrame(render);
    };

    const move = (event) => {
      const target = event.target.closest("a, button, input, textarea, .project-card, .review-card");
      Object.assign(stateRef.current, {
        x: event.clientX,
        y: event.clientY,
        active: true,
        hover: Boolean(target),
      });
      schedule();
    };
    const leave = () => {
      stateRef.current.active = false;
      schedule();
    };
    const down = () => {
      stateRef.current.down = true;
      schedule();
    };
    const up = () => {
      stateRef.current.down = false;
      schedule();
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });

    return () => {
      if (stateRef.current.frame) {
        window.cancelAnimationFrame(stateRef.current.frame);
      }
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </>
  );
}
