import React, { useEffect, useRef, useState } from "react";

export default function Header({ data }) {
  const { brand, header, navLinks, telegramLink } = data;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 60;
      if (nextScrolled === scrolledRef.current) return;

      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label={header.homeLabel}>
          {brand.name}
        </a>
        <nav className="desktop-nav" aria-label={header.navLabel}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={telegramLink} target="_blank" rel="noreferrer">
          {header.cta}
        </a>
        <button
          className="menu-button"
          aria-label={header.menuLabel}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`mobile-panel ${open ? "is-open" : ""}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href={telegramLink} target="_blank" rel="noreferrer">
          {header.cta}
        </a>
      </div>
    </header>
  );
}
