"use client";

import React, { useState } from "react";
import { ProjectDossier, ProjectCategory } from "@/types";
import { brandDossier } from "@/content/dossier";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { ProjectDetailModal } from "./ProjectDetailModal";
import {
  DentalAIGraphic,
  FixMyBharatGraphic,
  SyncMatesGraphic,
  ProjectUnknownGraphic,
  SriBalajiInteriorsGraphic,
} from "./ProjectGraphics";
import { ArrowUpRight, Filter, ShieldCheck, Sparkles, Lock, ExternalLink } from "lucide-react";

export function BentoDocket() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectDossier | null>(null);

  const categories: ProjectCategory[] = [
    "All",
    "Artificial Intelligence",
    "Civic Technology",
    "Digital Solutions",
    "Product Development",
  ];

  // Filter projects dynamically
  const filteredProjects =
    activeCategory === "All"
      ? brandDossier.projects
      : brandDossier.projects.filter((p) => p.category === activeCategory);

  // Render appropriate graphic for each project
  const renderGraphic = (projectId: string) => {
    switch (projectId) {
      case "dentalai-os":
        return <DentalAIGraphic />;
      case "fixmybharat":
        return <FixMyBharatGraphic />;
      case "syncmates":
        return <SyncMatesGraphic />;
      case "project-unknown":
        return <ProjectUnknownGraphic />;
      case "sri-balaji-interiors":
        return <SriBalajiInteriorsGraphic />;
      default:
        return null;
    }
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="w-full hairline-b bg-canvas py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header with Dynamic Counter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-8 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                SELECTED PROJECTS DOCKET // 0{brandDossier.projects.length} RECORDS
              </span>
            </div>
            <h2
              id="work-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink-primary"
            >
              Architectural &amp; Applied Work
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 bg-surface hairline-border text-ink-secondary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cobalt" />
              <span>
                SHOWING {filteredProjects.length} OF {brandDossier.projects.length} VERIFIED ENTRIES
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none select-none" role="tablist" aria-label="Project category filters">
          <div className="flex items-center gap-1.5 mr-2 text-ink-meta font-mono text-xs uppercase tracking-wider hidden sm:flex">
            <Filter className="w-3.5 h-3.5 text-cobalt" />
            <span>FILTER:</span>
          </div>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === "All"
                ? brandDossier.projects.length
                : brandDossier.projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cobalt ${
                  isActive
                    ? "bg-surface text-cobalt font-semibold hairline-border shadow-sm"
                    : "bg-canvas text-ink-secondary hover:text-ink-primary hover:bg-surface/50 hairline-border"
                }`}
              >
                <span>{category}</span>
                <span className={`ml-2 text-[10px] ${isActive ? "text-cobalt" : "text-ink-meta"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Bento Docket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {filteredProjects.map((project) => {
            // Determine column span for asymmetric broadsheet layout
            const isDentalAI = project.id === "dentalai-os";
            const isSriBalaji = project.id === "sri-balaji-interiors";
            const isFixMyBharat = project.id === "fixmybharat";
            const colSpan =
              isDentalAI
                ? "lg:col-span-7"
                : isSriBalaji
                ? "lg:col-span-5"
                : isFixMyBharat
                ? "lg:col-span-6"
                : "lg:col-span-6";

            return (
              <article
                key={project.id}
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className={`${colSpan} group cursor-pointer bg-surface/40 hover:bg-surface/80 hairline-border p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cobalt relative`}
                aria-label={`Project dossier for ${project.name}`}
              >
                {/* Top Telemetry & Index Bar */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 hairline-b text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-semibold text-cobalt">#{project.index}</span>
                      <span className="text-hairline">|</span>
                      <span className="text-ink-meta uppercase truncate">{project.domain}</span>
                    </div>

                    <div className="shrink-0">
                      {project.isCommercialDelivery ? (
                        <span className="px-2 py-0.5 bg-cobalt text-white font-mono text-[9px] uppercase tracking-wider font-semibold">
                          COMMERCIAL DELIVERY
                        </span>
                      ) : (
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
                      )}
                    </div>
                  </div>

                  {/* Commercial Headline Override if Sri Balaji Interiors */}
                  {project.isCommercialDelivery && (
                    <div className="mb-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold block">
                        {project.commercialHeadline || "MY FIRST COMMERCIAL WEBSITE."}
                      </span>
                    </div>
                  )}

                  {/* Project Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary tracking-tight group-hover:text-cobalt transition-colors">
                      {project.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Architectural Graphic Preview */}
                  <div className="my-5 hairline-border">
                    {renderGraphic(project.id)}
                  </div>

                  {/* Key Highlights / Problem Summary */}
                  <div className="mb-6 space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta">
                      Problem Context:
                    </div>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed line-clamp-2">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* Bottom Technology Stack & Actions Bar */}
                <div className="pt-4 hairline-t flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-canvas hairline-border font-mono text-[10px] uppercase tracking-wider text-ink-meta"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1 text-ink-meta group-hover:text-ink-primary transition-colors">
                    <span className="inline-flex items-center gap-1 text-cobalt font-medium">
                      <span>Inspect Full Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface hairline-border hover:bg-surface-raised hover:border-cobalt hover:text-cobalt text-ink-primary font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
                        aria-label={`Open live demonstration for ${project.name} in a new tab`}
                      >
                        <span>{project.isCommercialDelivery ? "Live Client Site" : "Live Demo"}</span>
                        <ArrowUpRight className="w-3 h-3 text-cobalt" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner Hover Accent */}
                <div
                  className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cobalt transition-colors pointer-events-none"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Section Footnote */}
        <div className="mt-10 p-4 bg-surface/60 hairline-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-meta uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
            <span>VERIFIED FACTUAL DOSSIER: ZERO FABRICATED METRICS OR CLIENT CLAIMS</span>
          </div>
          <div className="flex items-center gap-4 text-ink-secondary">
            <span>ALL {brandDossier.projects.length} RECORDS INDEXED</span>
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
