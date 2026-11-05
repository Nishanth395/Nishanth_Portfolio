"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brandDossier } from "@/content/dossier";
import { BrainCircuit, Cpu, Layers, TrendingUp, ArrowUpRight } from "lucide-react";

export function CapabilityGrid() {
  const shouldReduceMotion = useReducedMotion();

  const iconMap: Record<string, React.ReactNode> = {
    "01": <BrainCircuit className="w-5 h-5 text-cobalt" aria-hidden="true" />,
    "02": <Cpu className="w-5 h-5 text-cobalt" aria-hidden="true" />,
    "03": <Layers className="w-5 h-5 text-cobalt" aria-hidden="true" />,
    "04": <TrendingUp className="w-5 h-5 text-cobalt" aria-hidden="true" />,
  };

  const domainSubtitles: Record<string, string> = {
    "01": "Cognitive Architecture & LLMs",
    "02": "Distributed Web & Scalable Systems",
    "03": "0-to-1 Prototyping & UX Systems",
    "04": "Commercial Value & Customer Discovery",
  };

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="w-full hairline-b bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 pb-6 hairline-b">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cobalt font-semibold">
                WHAT I DO // 04 PILLARS
              </span>
            </div>
            <h2
              id="capabilities-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-primary"
            >
              Core Capabilities &amp; Disciplines
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Four interrelated disciplines defining my approach to building intelligent software and bringing technology-driven initiatives into reality.
          </p>
        </div>

        {/* 4-Quadrant Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 hairline-border bg-hairline gap-px">
          {brandDossier.capabilities.map((cap) => (
            <motion.article
              key={cap.index}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="bg-canvas hover:bg-surface/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors duration-200 group relative"
            >
              {/* Top Accent & Index Indicator */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 hairline-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface hairline-border group-hover:border-cobalt transition-colors">
                      {iconMap[cap.index]}
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold block">
                        AXIS {cap.index}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                        {domainSubtitles[cap.index]}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-normal text-ink-meta/50 group-hover:text-cobalt transition-colors">
                    #{cap.index}
                  </span>
                </div>

                {/* Capability Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary mb-3 tracking-tight group-hover:text-cobalt transition-colors">
                  {cap.title}
                </h3>

                {/* Authentic Description */}
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                  {cap.description}
                </p>
              </div>

              {/* Bottom Tags Strip */}
              <div className="pt-4 hairline-t">
                <div className="text-[9px] font-mono uppercase tracking-widest text-ink-meta mb-2">
                  Specialized Focus:
                </div>
                <div className="flex flex-wrap gap-2">
                  {cap.focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-surface hairline-border font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-secondary group-hover:text-ink-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Marker Accent on Hover */}
              <div
                className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cobalt transition-colors pointer-events-none"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>

        {/* Section Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-ink-meta uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
            <span>AUTHENTIC EXPERTISE: ZERO FABRICATED CREDENTIALS</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="hover:text-cobalt inline-flex items-center gap-1 transition-colors"
            >
              <span>View Applied Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
