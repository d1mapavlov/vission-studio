import React from "react";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", style, ...props }) {
  return (
    <Tag {...props} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
