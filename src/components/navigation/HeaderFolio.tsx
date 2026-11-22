"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  ["Work", "#work"],
  ["Studio", "#about"],
  ["Notes", "#journal"],
];

export function HeaderFolio() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] folio-button folio-button-primary">Skip to content</a>
      <header className="folio-header" onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}>
        <div className="folio-shell folio-nav">
          <a className="folio-brand" href="#home" onClick={() => setOpen(false)}>
            <span className="folio-monogram" aria-hidden="true">N<span>.</span></span>
            Nishanth Adepu
          </a>
          <nav className={`folio-links ${open ? "folio-links-open" : ""}`} id="portfolio-navigation" aria-label="Primary navigation">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="folio-mobile-contact" href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </nav>
          <div className="folio-nav-actions">
            <ThemeToggle />
            <a href="#contact" className="folio-button folio-button-outline nav-contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={16} aria-hidden="true" /></a>
            <button className="folio-menu" type="button" ref={trigger} onClick={() => setOpen(!open)} aria-controls="portfolio-navigation" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
