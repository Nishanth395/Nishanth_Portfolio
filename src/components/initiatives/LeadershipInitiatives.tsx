"use client";

import React from "react";
import { brandDossier } from "@/content/dossier";
import { Users, Mic, Sparkles, Compass, CheckCircle2, Award, Calendar, ArrowUpRight } from "lucide-react";

export function LeadershipInitiatives() {
  const edc = brandDossier.leadership.find((l) => l.id === "edc-niat") || brandDossier.leadership[0];
  const podcast = brandDossier.leadership.find((l) => l.id === "inside-founders-mind") || brandDossier.leadership[1];

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="w-full hairline-b bg-surface/30 py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-10 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                LEADERSHIP &amp; COMMUNITY // 02 INITIATIVES
              </span>
            </div>
            <h2
              id="leadership-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-primary"
            >
              Initiatives Beyond Code
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Cultivating builder culture, student entrepreneurship, and candid founder dialogues to bridge academic theory with real-world product execution.
          </p>
        </div>

        {/* 2-Column Broad Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card A: EDC at NIAT Kolhapur */}
          <article className="p-6 sm:p-8 lg:p-10 bg-canvas hairline-border flex flex-col justify-between group relative">
            <div>
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-4 mb-6 hairline-b text-xs font-mono">
                <div className="flex items-center gap-2 text-cobalt font-semibold">
                  <Users className="w-4 h-4" />
                  <span>CAMPUS LEADERSHIP</span>
                </div>
                <span className="text-ink-meta uppercase">
                  {edc.institution || "NIAT KOLHAPUR"}
                </span>
              </div>

              {/* Title & Role */}
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold block mb-1">
                  {edc.role}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary tracking-tight">
                  {edc.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-ink-secondary mt-2 leading-relaxed">
                  {edc.tagline}
                </p>
              </div>

              {/* Verified Scope & Description */}
              <div className="p-4 bg-surface hairline-border mb-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-1.5">
                  Core Purpose &amp; Motivation:
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink-primary leading-relaxed">
                  {edc.description} {edc.motivation && <span>{edc.motivation}</span>}
                </p>
              </div>

              {/* Documented Responsibilities & Initiatives */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-3">
                  Documented Responsibilities &amp; Execution:
                </div>
                <div className="space-y-2.5">
                  {edc.initiatives.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-surface/50 hairline-border flex items-start gap-3 text-xs sm:text-sm font-sans text-ink-secondary"
                    >
                      <span className="font-mono text-xs text-cobalt font-semibold shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Ledger */}
            <div className="mt-8 pt-4 hairline-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-ink-meta">
              <span>INSTITUTION: NIAT KOLHAPUR</span>
              <span className="text-cobalt">STUDENT FOUNDER CULTURE</span>
            </div>

            {/* Corner Marker */}
            <div
              className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cobalt transition-colors pointer-events-none"
              aria-hidden="true"
            />
          </article>

          {/* Card B: Inside Founder's Mind Podcast */}
          <article className="p-6 sm:p-8 lg:p-10 bg-canvas hairline-border flex flex-col justify-between group relative">
            <div>
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-4 mb-6 hairline-b text-xs font-mono">
                <div className="flex items-center gap-2 text-cobalt font-semibold">
                  <Mic className="w-4 h-4" />
                  <span>PODCAST &amp; DIALOGUE INITIATIVE</span>
                </div>
                <span className="text-ink-meta uppercase">
                  {podcast.format || "IN-DEPTH SERIES"}
                </span>
              </div>

              {/* Title & Role */}
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold block mb-1">
                  {podcast.role}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary tracking-tight">
                  {podcast.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-ink-secondary mt-2 leading-relaxed">
                  {podcast.tagline}
                </p>
              </div>

              {/* Verified Motivation & Audience */}
              <div className="p-4 bg-surface hairline-border mb-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-1.5">
                  Mission &amp; Intended Audience:
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink-primary leading-relaxed">
                  {podcast.description} {podcast.motivation && <span>{podcast.motivation}</span>}
                </p>
              </div>

              {/* Dialogue Focus Areas */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-3">
                  Discussion Themes &amp; Research Focus:
                </div>
                <div className="space-y-2.5">
                  {podcast.initiatives.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-surface/50 hairline-border flex items-start gap-3 text-xs sm:text-sm font-sans text-ink-secondary"
                    >
                      <span className="font-mono text-xs text-cobalt font-semibold shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Ledger */}
            <div className="mt-8 pt-4 hairline-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-ink-meta">
              <span>TARGET: 0-TO-1 VENTURE TRADEOFFS</span>
              <span className="text-cobalt">FOUNDER INSIGHTS</span>
            </div>

            {/* Corner Marker */}
            <div
              className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cobalt transition-colors pointer-events-none"
              aria-hidden="true"
            />
          </article>
        </div>

        {/* Section Footnote */}
        <div className="mt-8 p-4 bg-surface/60 hairline-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-meta uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
            <span>COMMUNITY INITIATIVES: ZERO FABRICATED GUEST CREDENTIALS OR INFLATED METRICS</span>
          </div>
          <div className="text-ink-secondary">
            COMMUNITY &amp; FOUNDER INTERACTION
          </div>
        </div>
      </div>
    </section>
  );
}
