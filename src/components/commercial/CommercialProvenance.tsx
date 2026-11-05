"use client";

import React from "react";
import Image from "next/image";
import { brandDossier } from "@/content/dossier";
import { ArrowUpRight, ShieldCheck, CheckCircle2, Layers, Briefcase, Lightbulb, Compass, Lock, Globe } from "lucide-react";

export function CommercialProvenance() {
  const milestone = brandDossier.commercialMilestone;

  return (
    <section
      id="ventures"
      aria-labelledby="ventures-heading"
      className="w-full hairline-b bg-canvas py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-10 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                COMMERCIAL PROVENANCE // CLIENT DELIVERY
              </span>
            </div>
            <h2
              id="ventures-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-primary"
            >
              Real-World Commercial Delivery
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-ink-meta">
            <span className="px-3 py-1 bg-surface hairline-border text-cobalt font-semibold">
              COMMERCIAL VALIDATION #01
            </span>
            <span className="hidden sm:inline text-hairline">|</span>
            <span className="hidden sm:inline">PAID BUSINESS ENGAGEMENT</span>
          </div>
        </div>

        {/* Master Case Study Container */}
        <div className="hairline-border bg-surface/30 p-6 sm:p-8 lg:p-12">
          {/* Top Heading & Positioning */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 mb-8 hairline-b">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cobalt/10 text-cobalt font-mono text-[10px] uppercase tracking-wider font-semibold hairline-border mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>FIRST COMMERCIAL WEBSITE DELIVERY</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-primary tracking-tight mb-4 leading-tight">
                {milestone.headline}
              </h3>
              <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
                {milestone.subheadline}
              </p>
            </div>

            <div className="lg:col-span-5 bg-canvas p-6 hairline-border flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-2">
                  CLIENT &amp; DOMAIN
                </div>
                <div className="font-serif text-2xl text-ink-primary font-normal mb-1">
                  {milestone.clientName}
                </div>
                <div className="font-mono text-xs text-cobalt uppercase tracking-wider mb-4">
                  {milestone.projectDomain}
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {milestone.clientContext}
                </p>
              </div>

              <div className="mt-6 pt-4 hairline-t flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                  Status: Deployed &amp; Live
                </span>
                <a
                  href={milestone.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-cobalt text-white font-mono text-xs uppercase tracking-wider hover:bg-cobalt-hover transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-cobalt"
                >
                  <span>Visit Live Website</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Elegant Browser Mockup Showcase */}
          <div className="mb-10 hairline-border bg-gradient-to-b from-surface/80 via-surface/40 to-surface/20 p-3 sm:p-5 lg:p-6">
            {/* Browser Window Frame */}
            <div className="rounded-lg hairline-border bg-canvas shadow-xl overflow-hidden">
              {/* Browser Header / Navigation Bar */}
              <div className="hairline-b bg-surface-raised px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                {/* Left: Window Control Dots & Tab */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]/90 border border-black/10 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90 border border-black/10 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#10B981]/90 border border-black/10 inline-block" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-hairline font-mono text-[11px] text-ink-secondary">
                    <Globe className="w-3.5 h-3.5 text-cobalt" />
                    <span className="truncate max-w-[200px] md:max-w-xs">Sri Balaji Interiors — Live Delivery</span>
                  </div>
                </div>

                {/* Center: Interactive URL Pill */}
                <a
                  href={milestone.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-canvas hairline-border rounded-md font-mono text-xs text-ink-primary hover:border-cobalt transition-colors group mx-auto sm:mx-0 shadow-xs"
                  title="Open live website in new tab"
                >
                  <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium text-ink-primary group-hover:text-cobalt transition-colors">
                    https://sribalajiinterior.com
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-ink-meta group-hover:text-cobalt transition-colors" />
                </a>

                {/* Right: Verified Live Status */}
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold hidden md:inline">
                    LIVE PRODUCTION DEPLOYMENT
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold md:hidden">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Viewport: Full 16:10 Presentation with Subtle Depth */}
              <div className="relative w-full aspect-[16/10] bg-surface-recessed overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src="/images/sri_balaji_live.png"
                  alt="Sri Balaji Interiors verified live website deployment"
                  width={1280}
                  height={800}
                  priority
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle bottom shadow overlay to anchor the frame */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Browser Status & Provenance Footer */}
              <div className="hairline-t bg-surface px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono text-ink-meta gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
                  <span>AUTHENTIC CLIENT ASSET // CAPTURED FROM PRODUCTION DOMAIN (SRIBALAJIINTERIOR.COM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>LOCATION: HYDERABAD, INDIA</span>
                  <span className="hidden md:inline text-hairline">|</span>
                  <span className="hidden md:inline">SECTORS: RESIDENTIAL INTERIORS • CORIAN SOLID SURFACES</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Detailed Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Column 1: Objectives & Scope */}
            <div className="p-6 bg-canvas hairline-border flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Business Objectives</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ink-secondary">
                  {milestone.businessObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] text-cobalt shrink-0 mt-0.5">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 hairline-t">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-1">
                  Verified Stack:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {milestone.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-surface hairline-border font-mono text-[10px] uppercase text-ink-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Delivery Process & Role */}
            <div className="p-6 bg-canvas hairline-border flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Delivery Process</span>
                </div>
                <div className="space-y-2 font-sans text-xs sm:text-sm text-ink-secondary">
                  {milestone.deliveryProcess.map((step, i) => (
                    <div key={i} className="p-2 bg-surface/60 hairline-border text-xs">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 hairline-t">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-1">
                  My Contribution:
                </div>
                <div className="font-sans text-xs text-ink-primary font-medium">
                  {milestone.role}
                </div>
              </div>
            </div>

            {/* Column 3: Commercial Lessons Learned */}
            <div className="p-6 bg-canvas hairline-border flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Commercial Learnings</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ink-secondary">
                  {milestone.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] text-cobalt shrink-0 mt-0.5">0{i + 1}</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 hairline-t">
                <div className="font-mono text-[10px] uppercase tracking-wider text-cobalt flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Factual Commercial Ledger</span>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Narrative Callout */}
          <div className="p-6 sm:p-8 bg-surface hairline-border">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold mb-2">
              BUILDER REFLECTION
            </div>
            <p className="font-serif text-lg sm:text-xl text-ink-primary italic leading-relaxed mb-4">
              &ldquo;{milestone.narrative}&rdquo;
            </p>
            <div className="font-mono text-xs text-ink-meta uppercase tracking-wider">
              Nishanth Adepu • Software Engineering &amp; Commercial Discovery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
