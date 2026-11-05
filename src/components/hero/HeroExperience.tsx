"use client";

import React from "react";
import { brandDossier } from "@/content/dossier";
import { ArrowDownRight, ArrowUpRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

export function HeroExperience() {
  return (
    <section
      id="home"
      aria-label="Hero and Overview"
      className="relative w-full hairline-b overflow-hidden bg-canvas transition-colors"
    >
      {/* Background Subtle Drafting Grid Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Display & Narrative (Cols 1-7/8)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
            {/* 1. Header Kicker */}
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-surface hairline-border max-w-full">
                <span className="w-1.5 h-1.5 bg-cobalt inline-block shrink-0" aria-hidden="true" />
                <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-ink-primary font-semibold">
                  DISPATCH // ARCHITECTURE
                </span>
                <span className="text-hairline">|</span>
                <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-ink-meta">
                  NISHANTH
                </span>
              </div>
            </div>

            {/* 2. Professional Title Badge */}
            <div className="mb-3">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest text-cobalt font-semibold block">
                {brandDossier.title}
              </span>
            </div>

            {/* 3. Monumental Display Headline */}
            <div className="mb-6 sm:mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-ink-primary leading-[1.08] text-balance">
                I build ideas into{" "}
                <span className="italic font-normal text-cobalt selection:bg-cobalt selection:text-white">
                  digital reality.
                </span>
              </h1>
            </div>

            {/* 4. Supporting Description */}
            <div className="mb-8 sm:mb-10 max-w-2xl">
              <p className="font-sans text-base sm:text-lg md:text-xl text-ink-secondary leading-relaxed">
                {brandDossier.heroSubtitle}
              </p>
            </div>

            {/* 5. Dual Action Triggers (CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              {/* Primary CTA */}
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-cobalt text-white font-mono text-xs sm:text-sm uppercase tracking-widest hover:bg-cobalt-hover transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 group text-center"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface hairline-border text-ink-primary font-mono text-xs sm:text-sm uppercase tracking-widest hover:bg-surface-raised hover:text-cobalt transition-colors focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 text-center"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* 6. Authentic Personal Metadata Strip */}
            <div className="w-full hairline-border bg-surface/60 p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
                <div className="sm:pr-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink-meta mb-1">
                    Location &amp; Time
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-ink-primary">
                    Bengaluru, India
                  </div>
                  <div className="font-mono text-[10px] text-ink-meta">UTC+05:30 (IST)</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:px-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink-meta mb-1">
                    Core Specialization
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-ink-primary">
                    AI Systems &amp; Web Eng
                  </div>
                  <div className="font-mono text-[10px] text-ink-meta">Full-Stack Architect</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:pl-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink-meta mb-1">
                    Current Focus
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-ink-primary">
                    Building Products
                  </div>
                  <div className="font-mono text-[10px] text-ink-meta">Open for Collaborations</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Architectural Aperture & Visualization      */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col w-full">
            {/* The Architectural Aperture Container */}
            <div className="w-full hairline-border bg-surface flex flex-col relative group transition-colors">
              {/* Header Telemetry Bar */}
              <div className="hairline-b bg-surface-raised px-4 py-2.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-ink-meta">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-cobalt inline-block" />
                  <span className="font-semibold text-ink-primary">PORTRAIT APERTURE</span>
                </div>
                <div className="flex items-center gap-1.5 text-cobalt font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED PROFILE</span>
                </div>
              </div>

              {/* Viewport Frame with Drafting Crosshairs */}
              <div className="relative aspect-[4/5] w-full bg-surface-recessed p-6 flex flex-col items-center justify-between overflow-hidden select-none">
                {/* Corner crosshairs */}
                <span className="absolute top-2 left-2 font-mono text-[11px] text-ink-meta leading-none select-none">
                  +
                </span>
                <span className="absolute top-2 right-2 font-mono text-[11px] text-ink-meta leading-none select-none">
                  +
                </span>
                <span className="absolute bottom-2 left-2 font-mono text-[11px] text-ink-meta leading-none select-none">
                  +
                </span>
                <span className="absolute bottom-2 right-2 font-mono text-[11px] text-ink-meta leading-none select-none">
                  +
                </span>

                {/* Top Aperture Coordinates */}
                <div className="w-full flex justify-between items-center text-[9px] font-mono text-ink-meta uppercase tracking-widest z-10">
                  <span>SCALE: 1:1</span>
                  <span>APERTURE // 01</span>
                </div>

                {/* Authentic Architectural Vector Visualization */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-auto flex items-center justify-center">
                  {/* Subtle Vector Geometry (State Lattice & Coordinate Ring) */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full text-ink-meta/40 dark:text-ink-meta/30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Outer Coordinate Ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="65"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />

                    {/* Axial Hairlines */}
                    <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.75" />

                    {/* Diagonal Architectural Projection */}
                    <line
                      x1="36"
                      y1="36"
                      x2="164"
                      y2="164"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="164"
                      y1="36"
                      x2="36"
                      y2="164"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />

                    {/* Nodes representing system architecture */}
                    <rect x="96" y="6" width="8" height="8" fill="currentColor" />
                    <rect x="96" y="186" width="8" height="8" fill="currentColor" />
                    <rect x="6" y="96" width="8" height="8" fill="currentColor" />
                    <rect x="186" y="96" width="8" height="8" fill="currentColor" />

                    <rect x="96" y="96" width="8" height="8" className="fill-cobalt" />
                  </svg>

                  {/* Centered Monogram & Identity Token */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-serif text-3xl sm:text-4xl font-normal text-ink-primary tracking-tight">
                      N
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cobalt font-semibold mt-1">
                      NISHANTH
                    </span>
                  </div>
                </div>

                {/* Aperture Reservation Notice */}
                <div className="w-full text-center z-10 bg-surface/95 py-2 px-3 hairline-border">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-secondary font-medium">
                    [ RESERVED: GENUINE PORTRAIT ]
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-ink-meta mt-0.5">
                    Awaiting authentic high-res asset
                  </div>
                </div>
              </div>

              {/* Bottom Framing Ledger */}
              <div className="hairline-t bg-surface-raised px-4 py-3 flex flex-col gap-1 text-[10px] font-mono">
                <div className="flex justify-between items-center text-ink-secondary">
                  <span>SUBJECT: NISHANTH ADEPU</span>
                  <span className="text-cobalt">VERIFIED DOSSIER</span>
                </div>
                <div className="text-[9px] text-ink-meta uppercase tracking-wider">
                  Discipline: AI Product Builder • Developer
                </div>
              </div>
            </div>

            {/* Quick Context Footnote */}
            <div className="mt-3 px-1 flex items-center justify-between text-[10px] font-mono text-ink-meta uppercase tracking-wider">
              <span>FOLIO IDENTITY DECK</span>
              <span className="hover:text-cobalt cursor-default">AUTHENTIC DATA ONLY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Continuous Operating Principles Manifesto Strip */}
      <div className="w-full hairline-t hairline-b bg-surface/50 py-2.5 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden select-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-ink-meta whitespace-nowrap gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-ink-secondary font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cobalt" />
            <span>OPERATING PHILOSOPHY:</span>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 overflow-hidden">
            <span className="hover:text-cobalt transition-colors">01. LEARN DEEPLY</span>
            <span className="text-hairline">•</span>
            <span className="hover:text-cobalt transition-colors">02. BUILD THOUGHTFULLY</span>
            <span className="text-hairline">•</span>
            <span className="hover:text-cobalt transition-colors">03. EXPERIMENT BOLDLY</span>
            <span className="text-hairline">•</span>
            <span className="hover:text-cobalt transition-colors">04. CREATE MEANINGFUL IMPACT</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-ink-meta">
            <Compass className="w-3 h-3 text-cobalt" />
            <span>2026 ROADMAP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
