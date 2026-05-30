import React from "react";

export default function ChipGroup({ items, value, onChange, highlightValue }) {
  return (
    <div className="chip-group">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          className={[
            item === value ? "is-active" : "",
            item === highlightValue ? "is-highlighted" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
