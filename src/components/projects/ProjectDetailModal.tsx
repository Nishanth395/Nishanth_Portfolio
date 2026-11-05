"use client";

import React, { useEffect, useRef } from "react";
import { ProjectDossier } from "@/types";
import { X, ArrowUpRight, ShieldCheck, CheckCircle2, AlertCircle, Layers, Cpu, Compass } from "lucide-react";
import { StatusBeacon } from "@/components/ui/StatusBeacon";

interface ProjectDetailModalProps {
  project: ProjectDossier | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop click dismiss */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-canvas text-ink-primary hairline-border shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Top Header Bar */}
        <div className="hairline-b bg-surface px-4 sm:px-6 py-3.5 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cobalt font-semibold">
              DOSSIER #{project.index}
            </span>
            <span className="text-hairline">|</span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-ink-meta truncate">
              {project.domain}
            </span>
            {project.isCommercialDelivery && (
              <span className="hidden sm:inline-block px-2 py-0.5 bg-cobalt/10 text-cobalt hairline-border font-mono text-[9px] uppercase tracking-wider font-semibold">
                COMMERCIAL CLIENT DELIVERY
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-raised hairline-border font-mono text-xs uppercase tracking-wider text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
              aria-label="Close project dossier"
            >
              <span>[ESC / CLOSE]</span>
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Title and Tagline */}
          <div className="pb-6 hairline-b">
            {project.isCommercialDelivery && (
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold block">
                  {project.commercialHeadline || "MY FIRST COMMERCIAL WEBSITE."}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2
                  id="project-modal-title"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink-primary tracking-tight"
                >
                  {project.name}
                </h2>
                <p className="font-sans text-base sm:text-lg text-ink-secondary mt-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface hairline-border">
                  <StatusBeacon
                    label={project.statusLabel}
                    status={
                      project.status === "active" || project.status === "production"
                        ? "active"
                        : project.status === "prototype" || project.status === "concept"
                        ? "exploration"
                        : "idle"
                    }
                  />
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-cobalt text-white font-mono text-xs uppercase tracking-wider hover:bg-cobalt-hover transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-cobalt"
                  >
                    <span>{project.isCommercialDelivery ? "Visit Live Client Site" : "Launch Live Demo"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface hairline-border text-ink-primary font-mono text-xs uppercase tracking-wider hover:text-cobalt transition-colors"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Deployment Status & Provenance Note */}
          {project.deploymentStatusNote && (
            <div className="p-4 bg-surface hairline-border flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-cobalt font-semibold">
                  {project.isCommercialDelivery
                    ? "COMMERCIAL CLIENT DELIVERY // VERIFIED"
                    : "PUBLIC DEPLOYMENT // PROTOTYPE DEMO"}
                </div>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {project.deploymentStatusNote}
                </p>
              </div>
            </div>
          )}

          {/* Section: Overview */}
          {project.overview && (
            <div className="bg-surface/50 p-5 hairline-border">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold mb-2">
                EXECUTIVE OVERVIEW
              </div>
              <p className="font-sans text-sm sm:text-base text-ink-primary leading-relaxed">
                {project.overview}
              </p>
            </div>
          )}

          {/* Section: Problem & Solution (Dual Bento Split) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-surface hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-meta mb-2">
                  <AlertCircle className="w-4 h-4 text-cobalt" />
                  <span>Problem Statement</span>
                </div>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="mt-4 pt-3 hairline-t font-mono text-[10px] text-ink-meta uppercase">
                Target: {project.targetAudience}
              </div>
            </div>

            <div className="p-5 bg-surface hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-meta mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cobalt" />
                  <span>Implemented / Proposed Solution</span>
                </div>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="mt-4 pt-3 hairline-t font-mono text-[10px] text-ink-meta uppercase">
                Scope: Architecture &amp; Delivery
              </div>
            </div>
          </div>

          {/* Section: Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-meta mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cobalt" />
                <span>Documented Features &amp; Capabilities</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface/70 hairline-border flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-cobalt font-semibold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-ink-primary">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Commercial Details (If Commercial Delivery) */}
          {project.isCommercialDelivery && (
            <div className="p-6 bg-surface hairline-border space-y-6">
              <div className="flex items-center justify-between pb-3 hairline-b">
                <div className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                  COMMERCIAL CLIENT SPECIFICATION: SRI BALAJI INTERIORS
                </div>
                <div className="font-mono text-[10px] text-ink-meta uppercase">
                  DELIVERY VERIFIED
                </div>
              </div>

              {project.businessObjectives && (
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-2">
                    Business Requirements &amp; Objectives:
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside font-sans text-xs sm:text-sm text-ink-secondary">
                    {project.businessObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.deliveryProcess && (
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-2">
                    Client Delivery &amp; Development Process:
                  </div>
                  <div className="space-y-2">
                    {project.deliveryProcess.map((step, i) => (
                      <div key={i} className="p-2.5 bg-canvas hairline-border font-sans text-xs text-ink-primary">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-ink-meta">Verified Commercial Handoff: Production Deployment Active</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Live Client Site (sribalajiinterior.com)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Section: Technical Architecture & Stack */}
          <div className="p-5 bg-surface hairline-border">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-meta mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cobalt" />
              <span>Technical Architecture &amp; Technology Stack</span>
            </div>
            {project.architectureNotes && (
              <p className="font-sans text-xs sm:text-sm text-ink-secondary mb-4 leading-relaxed">
                {project.architectureNotes}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-canvas hairline-border font-mono text-xs uppercase tracking-wider text-ink-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Personal Role, Challenges & Verified Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-surface hairline-border">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-2">
                My Responsibilities &amp; Role
              </div>
              <p className="font-sans text-xs sm:text-sm text-ink-primary leading-relaxed">
                {project.role}
              </p>
            </div>

            <div className="p-4 bg-surface hairline-border">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-meta mb-2">
                Engineering Challenges
              </div>
              <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div className="p-4 bg-surface hairline-border">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt mb-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Outcomes</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-ink-primary font-medium leading-relaxed">
                {project.verifiedOutcomes}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="hairline-t bg-surface px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono text-ink-meta shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cobalt" />
            <span>NISHANTH PORTFOLIO // VERIFIED PROJECT DOSSIER</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-cobalt uppercase tracking-wider text-ink-primary"
          >
            Close View [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
