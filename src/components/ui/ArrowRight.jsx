import React from "react";

export default function ArrowRight({ up = false }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {up ? (
        <>
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}
