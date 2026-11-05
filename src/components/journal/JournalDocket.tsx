"use client";

import React, { useState } from "react";
import { brandDossier } from "@/content/dossier";
import { JournalEntry, JournalEntryStatus } from "@/types";
import { JournalEntryModal } from "./JournalEntryModal";
import { BookOpen, ArrowUpRight, Compass, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export function JournalDocket() {
  const { journalEntries, currentlyExploring } = brandDossier;
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  const filterOptions = [
    { label: "All Inquiries", value: "All", count: journalEntries.length },
    {
      label: "Drafts",
      value: "Draft / In Progress",
      count: journalEntries.filter((e) => e.status === "Draft / In Progress").length,
    },
    {
      label: "Research Notes",
      value: "Research Note",
      count: journalEntries.filter((e) => e.status === "Research Note").length,
    },
    {
      label: "Future Writing Ideas",
      value: "Future Writing Idea",
      count: journalEntries.filter((e) => e.status === "Future Writing Idea").length,
    },
  ];

  const filteredEntries =
    selectedStatus === "All"
      ? journalEntries
      : journalEntries.filter((e) => e.status === selectedStatus);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="w-full hairline-b bg-surface/30 py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-10 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                JOURNAL &amp; RESEARCH DOCKET // 05 ACTIVE ESSAYS
              </span>
            </div>
            <h2
              id="journal-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-primary"
            >
              Journal &amp; Research Docket
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Working papers, product teardowns, and essays in progress. Transparently categorized by research state without manufactured publication claims.
          </p>
        </div>

        {/* Status Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono no-scrollbar">
          <div className="inline-flex items-center gap-1.5 text-ink-meta pr-2 font-mono uppercase text-[10px] tracking-wider">
            <Filter className="w-3.5 h-3.5 text-cobalt" />
            <span>FILTER DOCKET:</span>
          </div>
          {filterOptions.map((tab) => {
            const isActive = selectedStatus === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedStatus(tab.value)}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap hairline-border focus-visible:outline-2 focus-visible:outline-cobalt uppercase text-[11px] tracking-wider font-semibold ${
                  isActive
                    ? "bg-cobalt text-white border-cobalt shadow-sm"
                    : "bg-canvas text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-70">({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Journal Entries Bento List */}
        <div className="space-y-4 mb-16">
          {filteredEntries.map((entry) => {
            return (
              <article
                key={entry.id}
                tabIndex={0}
                role="button"
                aria-label={`Open research docket for: ${entry.title}`}
                onClick={() => setActiveEntry(entry)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveEntry(entry);
                  }
                }}
                className="w-full p-6 sm:p-8 bg-canvas hairline-border hover:border-cobalt transition-colors group cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-cobalt relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Metadata & Status Pill (4 Cols) */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-cobalt">
                        ENTRY {entry.index}
                      </span>
                      <span className="text-hairline">|</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                        {entry.category}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface hairline-border font-mono text-[10px] uppercase tracking-wider text-ink-primary font-semibold">
                      <span className="w-1.5 h-1.5 bg-cobalt" />
                      <span>{entry.statusBadge}</span>
                    </div>

                    {entry.readingTime && (
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                        Estimated Outline: {entry.readingTime}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Title, Subtitle, Excerpt & Action (8 Cols) */}
                  <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ink-primary font-normal leading-snug group-hover:text-cobalt transition-colors mb-2">
                        {entry.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-ink-meta italic mb-3">
                        {entry.subtitle}
                      </p>
                      <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                        {entry.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 hairline-t">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                        Transparent Research State: Zero Fabricated Dates
                      </span>
                      <div className="inline-flex items-center gap-1 font-mono text-xs text-cobalt group-hover:underline">
                        <span>Inspect Research Docket</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Curated "Currently Exploring" Horizon Panel */}
        <div className="p-6 sm:p-8 lg:p-10 bg-canvas hairline-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 hairline-b gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                  ACTIVE INQUIRY HORIZONS // 2026
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary">
                Currently Exploring &amp; Experimenting
              </h3>
            </div>
            <div className="font-mono text-xs text-ink-meta uppercase tracking-wider">
              ONGOING SYSTEM INVESTIGATIONS
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyExploring.map((topic, i) => (
              <div
                key={topic}
                className="p-4 sm:p-5 bg-surface hairline-border flex items-center justify-between hover:border-cobalt transition-colors group"
              >
                <div>
                  <span className="font-mono text-[10px] text-cobalt block mb-1 font-semibold">
                    TOPIC 0{i + 1}
                  </span>
                  <span className="font-sans text-sm font-medium text-ink-primary group-hover:text-cobalt transition-colors">
                    {topic}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-meta group-hover:text-cobalt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      <JournalEntryModal entry={activeEntry} onClose={() => setActiveEntry(null)} />
    </section>
  );
}
