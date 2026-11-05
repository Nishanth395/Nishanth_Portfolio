"use client";

import React from "react";
import { brandDossier } from "@/content/dossier";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Ventures", href: "#ventures" },
    { label: "About", href: "#about" },
    { label: "Journal", href: "#journal" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      aria-label="Publication Colophon and Global Footer"
      className="w-full bg-surface hairline-t py-16 sm:py-20 lg:py-24 text-ink-secondary transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Top Colophon Masthead Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 hairline-b">
          {/* Identity & Wordmark (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cobalt inline-block" />
              <span className="font-serif text-3xl sm:text-4xl font-normal text-ink-primary tracking-tight">
                NISHANTH
              </span>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
              AI PRODUCT BUILDER &amp; SOFTWARE DEVELOPER
            </div>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed max-w-md pt-2">
              Building digital products, exploring emerging intelligence, and translating ambitious ideas into practical, reliable software.
            </p>

            {/* Direct Verified Inquiries Strip */}
            <div className="pt-4 flex flex-col space-y-2 font-mono text-xs">
              <a
                href={`mailto:${brandDossier.links.email}`}
                className="inline-flex items-center gap-2 text-ink-primary hover:text-cobalt transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-cobalt" />
                <span>{brandDossier.links.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="text-[11px] text-ink-meta">
                Verified Direct Inbox • {brandDossier.location} • UTC+05:30
              </div>
            </div>
          </div>

          {/* Publication Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold pb-2 hairline-b">
              PUBLICATION SECTIONS
            </div>
            <nav aria-label="Footer Navigation" className="flex flex-col space-y-2 font-mono text-xs uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-cobalt transition-colors flex items-center justify-between py-1 hover:translate-x-1 transition-transform"
                >
                  <span>{link.label}</span>
                  <span className="text-ink-meta text-[10px]">↗</span>
                </a>
              ))}
            </nav>
          </div>

          {/* External Verified Ledgers & Social (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold pb-2 hairline-b">
              VERIFIED LEDGERS &amp; NETWORKS
            </div>
            <div className="space-y-2.5">
              <a
                href={brandDossier.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-canvas hairline-border text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors group focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-cobalt" />
                  <span className="font-mono text-xs uppercase tracking-wider">GitHub / Nishanth395</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-meta group-hover:text-cobalt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={brandDossier.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-canvas hairline-border text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors group focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-cobalt" />
                  <span className="font-mono text-xs uppercase tracking-wider">LinkedIn / Nishanth Adepu</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-meta group-hover:text-cobalt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Back to Top */}
            <div className="pt-4">
              <button
                onClick={scrollToTop}
                aria-label="Return to top of folio"
                className="inline-flex items-center gap-2 px-3 py-2 bg-canvas hairline-border hover:bg-surface-raised text-ink-primary font-mono text-[11px] uppercase tracking-wider hover:text-cobalt transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <ArrowUp className="w-3.5 h-3.5 text-cobalt" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon System & Specification Strip */}
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px] text-ink-meta uppercase tracking-wider">
            <div>
              <span className="text-ink-secondary block font-semibold mb-0.5">ARCHITECTURE &amp; STACK</span>
              Next.js 15 App Router • React 19 • TypeScript Strict • Tailwind CSS
            </div>
            <div>
              <span className="text-ink-secondary block font-semibold mb-0.5">DESIGN SYSTEM SPECIFICATION</span>
              Euclidean 0px Geometry • Newsreader • Inter • JetBrains Mono
            </div>
            <div>
              <span className="text-ink-secondary block font-semibold mb-0.5">DUAL SUBSTRATE</span>
              Alabaster Broadsheet (#FAF8F5) • Carbon Darkroom (#08080A)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 hairline-t font-mono text-[11px] text-ink-meta uppercase tracking-wider">
            <div>
              &copy; {currentYear} Nishanth Adepu. All rights reserved. Zero fabricated claims.
            </div>
            <div>
              Crafted as an authentic personal publication • {brandDossier.location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
