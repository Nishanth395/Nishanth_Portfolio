"use client";

import React, { useEffect, useRef } from "react";
import { JournalEntry } from "@/types";
import { X, BookOpen, AlertCircle, FileText, Compass, Sparkles } from "lucide-react";

interface JournalEntryModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export function JournalEntryModal({ entry, onClose }: JournalEntryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard trap & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (entry) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-canvas hairline-border shadow-2xl flex flex-col transition-colors selection:bg-cobalt selection:text-white"
      >
        {/* Modal Masthead */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-surface hairline-b">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
              RESEARCH ENTRY // {entry.index}
            </span>
            <span className="text-hairline">|</span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-meta">
              {entry.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close research entry"
            className="p-1.5 hover:bg-canvas text-ink-secondary hover:text-ink-primary hairline-border transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Status Integrity Banner */}
          <div className="p-4 bg-surface/50 hairline-border flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-cobalt/10 text-cobalt hairline-border">
                  STATUS: {entry.status.toUpperCase()}
                </span>
                {entry.readingTime && (
                  <span className="font-mono text-[10px] uppercase text-ink-meta">
                    EST. {entry.readingTime}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                This document represents an active research docket and working draft. In accordance with publication standards, zero artificial publication dates or fictitious citations are asserted.
              </p>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3
              id="journal-modal-title"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink-primary font-normal leading-tight mb-3"
            >
              {entry.title}
            </h3>
            <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
              {entry.subtitle}
            </p>
          </div>

          {/* Abstract / Working Synthesis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt font-semibold pb-2 hairline-b">
              <FileText className="w-4 h-4" />
              <span>WORKING ABSTRACT &amp; SYNOPSIS</span>
            </div>
            <div className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
              {entry.abstract.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Key Inquiries Under Investigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt font-semibold pb-2 hairline-b">
              <Compass className="w-4 h-4" />
              <span>CORE INQUIRIES &amp; RESEARCH QUESTIONS</span>
            </div>
            <div className="space-y-2.5">
              {entry.keyInquiries.map((inquiry, i) => (
                <div
                  key={i}
                  className="p-3 bg-surface hairline-border flex items-start gap-3"
                >
                  <span className="font-mono text-xs text-cobalt font-semibold shrink-0">
                    Q0{i + 1}
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-ink-primary leading-relaxed">
                    {inquiry}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Planned Discussion Arcs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt font-semibold pb-2 hairline-b">
              <Sparkles className="w-4 h-4" />
              <span>PLANNED ESSAY STRUCTURE</span>
            </div>
            <ol className="space-y-2">
              {entry.plannedDiscussion.map((arc, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 font-sans text-xs sm:text-sm text-ink-secondary"
                >
                  <span className="w-1.5 h-1.5 bg-cobalt shrink-0" />
                  <span>{arc}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-between px-6 py-4 bg-surface hairline-t font-mono text-xs text-ink-meta">
          <span>Author: Nishanth Adepu</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-canvas hairline-border hover:bg-surface-raised text-ink-primary font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
          >
            Close Docket
          </button>
        </div>
      </div>
    </div>
  );
}
