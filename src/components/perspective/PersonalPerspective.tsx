"use client";

import React from "react";
import { brandDossier } from "@/content/dossier";
import { Compass, Lightbulb, Target, ArrowUpRight, Cpu, Code2, Layers, CheckCircle2 } from "lucide-react";

export function PersonalPerspective() {
  const { principles, problemDomains, introManifesto, longTermAmbition, philosophy } = brandDossier;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full hairline-b bg-canvas py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-12 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                PERSONAL PERSPECTIVE // IDENTITY &amp; PRINCIPLES
              </span>
            </div>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink-primary"
            >
              Perspective, Principles &amp; Ambition
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-ink-meta">
            <span className="px-3 py-1 bg-surface hairline-border text-cobalt font-semibold">
              STAGE: STUDENT TECHNOLOGIST
            </span>
            <span className="hidden sm:inline text-hairline">|</span>
            <span className="hidden sm:inline">AI PRODUCT BUILDER</span>
          </div>
        </div>

        {/* Master Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Manifesto & Narrative Essay (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Authentic Manifesto Callout */}
            <div className="p-6 sm:p-8 bg-surface/50 hairline-border border-l-4 border-l-cobalt">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold mb-3">
                STATEMENT OF INTENT
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl text-ink-primary leading-relaxed font-normal italic">
                &ldquo;{introManifesto}&rdquo;
              </blockquote>
            </div>

            {/* Narrative Body */}
            <div className="space-y-6 text-ink-secondary font-sans text-base sm:text-lg leading-relaxed">
              <p>
                My relationship with software engineering began with simple curiosity: how do abstract lines of code turn into systems that people rely on daily? Over time, that curiosity shifted from merely learning syntax to understanding <strong className="text-ink-primary font-semibold">why certain technologies matter and how they create genuine utility</strong>.
              </p>
              <p>
                As a student and emerging technologist, I approach engineering without legacy corporate assumptions. When exploring Artificial Intelligence, my focus is not on chasing ephemeral benchmark hype, but on dissecting how large language models and intelligent interfaces can eliminate practical friction—whether by structuring unstructured clinical notes in dental practices or streamlining business workflows.
              </p>
              <p>
                Delivering a commercial website for Sri Balaji Interiors was a pivotal realization: <strong className="text-ink-primary font-semibold">code only produces value when it solves a verified human problem</strong>. Translating a business owner&apos;s real-world requirements into a dependable, fast digital presence taught me that product architecture and commercial empathy are inseparable disciplines.
              </p>
            </div>

            {/* Long-Term Ambition Card */}
            <div className="p-6 sm:p-8 bg-canvas hairline-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt font-semibold mb-3">
                <Target className="w-4 h-4" />
                <span>LONG-TERM PRODUCT AMBITION</span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-ink-primary font-normal leading-relaxed">
                {longTermAmbition}
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Identity Frame & Operating Ledger (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Reserved Architectural Portrait Container */}
            <div className="hairline-border bg-surface p-6 sm:p-8 relative">
              <div className="flex items-center justify-between pb-4 mb-6 hairline-b font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                <div className="flex items-center gap-1.5 text-cobalt font-semibold">
                  <span className="w-1.5 h-1.5 bg-cobalt" />
                  <span>VISUAL PROVENANCE</span>
                </div>
                <span>ASPECT 1:1 // SQUARE</span>
              </div>

              {/* Crosshair Architectural Frame */}
              <div className="aspect-square w-full bg-canvas hairline-border relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden group">
                {/* Architectural Grid Lines & Corner Crosshairs */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]" />
                <span className="absolute top-2 left-2 font-mono text-[9px] text-ink-meta">+00.00</span>
                <span className="absolute top-2 right-2 font-mono text-[9px] text-ink-meta">+01.00</span>
                <span className="absolute bottom-2 left-2 font-mono text-[9px] text-ink-meta">-00.00</span>
                <span className="absolute bottom-2 right-2 font-mono text-[9px] text-ink-meta">-01.00</span>

                {/* Central Identity Icon / Placeholder Silhouette */}
                <div className="w-20 h-20 hairline-border bg-surface flex items-center justify-center text-cobalt mb-4 shadow-sm">
                  <span className="font-serif text-3xl font-normal text-ink-primary">N</span>
                </div>

                <div className="font-serif text-xl text-ink-primary font-normal mb-1">
                  Nishanth Adepu
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-cobalt font-semibold mb-3">
                  AI Product Builder &amp; Developer
                </div>
                <p className="font-sans text-xs text-ink-secondary max-w-[260px] leading-relaxed mb-4">
                  Reserved frame for authentic photographic capture. Preserves strict visual balance in accordance with publication standards.
                </p>

                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface hairline-border font-mono text-[10px] uppercase text-ink-meta">
                  <span>Bengaluru, India</span>
                  <span>•</span>
                  <span>Student Builder</span>
                </div>
              </div>

              {/* Operating Philosophy Footer */}
              <div className="mt-6 pt-4 hairline-t">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold mb-1">
                  CORE PHILOSOPHY
                </div>
                <div className="font-serif text-base italic text-ink-primary">
                  &ldquo;{philosophy}&rdquo;
                </div>
              </div>
            </div>

            {/* Problem Domains We Care About */}
            <div className="p-6 bg-surface/40 hairline-border space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-b">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold">
                  PROBLEM DOMAINS OF INTEREST
                </div>
                <span className="font-mono text-[10px] text-ink-meta">05 DOMAINS</span>
              </div>
              <ul className="space-y-2.5">
                {problemDomains.map((domain, i) => (
                  <li
                    key={domain}
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-ink-primary"
                  >
                    <span className="font-mono text-[10px] text-cobalt mt-0.5 font-semibold">
                      0{i + 1}
                    </span>
                    <span className="leading-snug">{domain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Operating Principles Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 hairline-b gap-2">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                ENGINEERING DISCIPLINE
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary">
                Four Operating Principles
              </h3>
            </div>
            <div className="font-mono text-xs text-ink-meta uppercase tracking-wider">
              GROUNDED IN PRACTICAL EXECUTION
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.index}
                className="p-6 bg-surface/30 hairline-border flex flex-col justify-between group hover:border-cobalt transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 hairline-b">
                    <span className="font-mono text-xs text-cobalt font-semibold">
                      PRINCIPLE {principle.index}
                    </span>
                    <span className="w-1.5 h-1.5 bg-hairline group-hover:bg-cobalt transition-colors" />
                  </div>
                  <h4 className="font-serif text-lg font-normal text-ink-primary mb-2">
                    {principle.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm font-medium text-ink-primary mb-3 leading-relaxed">
                    &ldquo;{principle.statement}&rdquo;
                  </p>
                </div>
                <div className="font-sans text-xs text-ink-secondary leading-relaxed pt-3 hairline-t">
                  {principle.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
