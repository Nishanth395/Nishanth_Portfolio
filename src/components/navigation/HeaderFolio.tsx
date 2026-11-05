"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { brandDossier } from "@/content/dossier";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "work", label: "Work", href: "#work" },
  { id: "ventures", label: "Ventures", href: "#ventures" },
  { id: "about", label: "About", href: "#about" },
  { id: "journal", label: "Journal", href: "#journal" },
];

export function HeaderFolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Track scroll position to update active section indication
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sectionIds = ["home", "work", "ventures", "about", "journal", "contact"];
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          // Map "contact" to "journal" or closest item, or keep active
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] px-4 py-2 bg-cobalt text-white font-mono text-xs uppercase tracking-wider focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full bg-canvas/95 backdrop-blur-sm hairline-b transition-colors">
        {/* Top Broadsheet Ticker Bar */}
        <div className="w-full hairline-b bg-surface/80 py-1.5 px-3 sm:px-6 md:px-8 lg:px-12 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink-meta flex justify-between items-center select-none overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="font-semibold text-ink-secondary hidden sm:inline">FOLIO 2026 // NO. 01</span>
            <span className="font-semibold text-ink-secondary sm:hidden">FOLIO &apos;26</span>
            <span className="text-hairline hidden sm:inline">|</span>
            <span className="hidden sm:inline">{brandDossier.location.toUpperCase()}</span>
            <span className="text-hairline hidden md:inline">|</span>
            <span className="hidden md:inline">DISPATCH SPEC: EDITORIAL</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden sm:inline text-ink-meta text-[10px]">UTC+05:30</span>
            <StatusBeacon label="ACTIVE" status="active" />
          </div>
        </div>

        {/* Main Masthead Container */}
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Wordmark */}
          <Link
            href="#home"
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4 min-w-0 shrink"
            aria-label="Nishanth - AI Product Builder & Software Developer Home"
          >
            <span className="font-serif text-lg sm:text-2xl font-normal tracking-tight text-ink-primary group-hover:text-cobalt transition-colors leading-none truncate">
              NISHANTH
            </span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-ink-meta mt-1 truncate">
              AI Product Builder &amp; Software Dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                    isActive
                      ? "text-cobalt font-semibold bg-surface hairline-border"
                      : "text-ink-secondary hover:text-ink-primary hover:bg-surface/50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
                    )}
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Actions & Theme Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Contact Action */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-ink-primary text-canvas font-mono text-xs uppercase tracking-wider hover:bg-cobalt hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hairline-border bg-surface text-ink-primary hover:text-cobalt focus-visible:outline-2 focus-visible:outline-cobalt"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden w-full bg-canvas hairline-b py-4 px-4 sm:px-6 transition-all border-t border-hairline/60 shadow-lg"
            role="region"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink-meta pb-2 hairline-b mb-2">
                Table of Contents
              </div>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between py-2.5 px-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-surface text-cobalt font-semibold hairline-border"
                        : "text-ink-secondary hover:text-ink-primary hover:bg-surface/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="text-[10px] text-cobalt">[ACTIVE]</span>
                    ) : (
                      <span className="text-[10px] text-ink-meta">↗</span>
                    )}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 hairline-t flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-ink-primary text-canvas font-mono text-xs uppercase tracking-wider hover:bg-cobalt transition-colors"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <div className="text-[10px] font-mono text-ink-meta text-center pt-1">
                  Nishanth • AI Product Builder &amp; Developer
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
