import React from "react";
import { ProjectDossier } from "@/types";
import { StatusBadge } from "./StatusBeacon";
import { ArrowUpRight } from "lucide-react";

export function ProjectCardPreview({
  project,
  className = "",
}: {
  project: ProjectDossier;
  className?: string;
}) {
  return (
    <article
      className={`group hairline-border bg-surface p-6 sm:p-8 flex flex-col justify-between hover:border-cobalt transition-colors duration-150 relative ${className}`}
    >
      <div>
        {/* Top bar: Index + Domain + Status */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 hairline-b">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-semibold text-cobalt">
              [{project.index}]
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-ink-meta">
              {project.domain}
            </span>
          </div>
          <StatusBadge status={project.statusLabel} />
        </div>

        {/* Project Name */}
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary group-hover:text-cobalt transition-colors mb-2">
          {project.name}
        </h3>

        {/* Tagline */}
        <p className="font-sans text-sm text-ink-secondary mb-4 leading-relaxed">
          {project.tagline}
        </p>

        {/* Problem & Solution Mini-Summary */}
        <div className="space-y-2 mb-6 text-xs text-ink-meta">
          <p>
            <strong className="text-ink-primary font-mono uppercase tracking-wide">
              Problem:
            </strong>{" "}
            {project.problem}
          </p>
          <p>
            <strong className="text-ink-primary font-mono uppercase tracking-wide">
              Focus:
            </strong>{" "}
            {project.role}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack Chips + Action */}
      <div className="pt-4 hairline-t">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 font-mono text-[10px] tracking-wide bg-canvas hairline-border text-ink-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-primary group-hover:text-cobalt transition-colors">
          <span>Inspect Architecture</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
}
