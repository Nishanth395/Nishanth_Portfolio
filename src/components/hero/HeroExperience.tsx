"use client";

import React from "react";
import { brandDossier } from "@/content/dossier";
import { ArrowDownRight, ArrowUpRight, Sparkles, Compass, ShieldCheck, Briefcase } from "lucide-react";
import { HeroInteractiveDashboard } from "./HeroInteractiveDashboard";

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
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-ink-primary leading-[1.08] text-balance">
                Building intelligent systems &amp;{" "}
                <span className="bg-gradient-to-r from-cobalt via-blue-500 to-indigo-600 bg-clip-text text-transparent italic font-normal">
                  digital products that scale.
                </span>
              </h1>
            </div>

            {/* 4. Supporting Description */}
            <div className="mb-6 sm:mb-8 max-w-2xl">
              <p className="font-sans text-base sm:text-lg md:text-xl text-ink-secondary leading-relaxed">
                I explore artificial intelligence, engineer scalable software products, and transform complex real-world challenges into high-performance digital reality.
              </p>
            </div>

            {/* 5. Dual Action Triggers (CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
              {/* Primary CTA */}
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-cobalt text-white font-mono text-xs sm:text-sm uppercase tracking-widest hover:bg-cobalt-hover transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 group text-center"
              >
                <span>Explore Featured Work</span>
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

            {/* 5.5 High-Impact Live Verification Proof Strip */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-[11px] font-mono text-ink-meta">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface hairline-border text-ink-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>5+ Projects Shipped</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface hairline-border text-cobalt font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>1st Commercial Client Sold</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface hairline-border text-ink-primary font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cobalt" />
                <span>100% Verified Production</span>
              </span>
            </div>

            {/* 6. Authentic Personal Metadata Strip */}
            <div className="w-full hairline-border bg-surface/60 p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
                <div className="sm:pr-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink-meta mb-1">
                    Location &amp; Time
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-ink-primary">
                    {brandDossier.location}
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
          {/* RIGHT COLUMN: Interactive AI Telemetry Dashboard          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col w-full">
            <HeroInteractiveDashboard />
            {/* Quick Context Footnote */}
            <div className="mt-3 px-1 flex items-center justify-between text-[10px] font-mono text-ink-meta uppercase tracking-wider">
              <span>LIVE TELEMETRY &amp; AI CONSOLE</span>
              <span className="text-cobalt font-medium">CLICK TABS TO EXPLORE</span>
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
