"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCategory, ProjectDossier } from "@/types";
import { brandDossier } from "@/content/dossier";
import { Station, useExhibition } from "@/components/exhibition/Exhibition";
import { ShopWalk } from "@/components/dukaan/ShopWalk";
import { SceneNavigator } from "@/components/spatial/SceneNavigator";
import { ProjectDetailModal } from "./ProjectDetailModal";
import {
  DentalAIGraphic,
  FixMyBharatGraphic,
  SyncMatesGraphic,
  ProjectUnknownGraphic,
  SriBalajiInteriorsGraphic,
} from "./ProjectGraphics";

const filters: { category: ProjectCategory; label: string }[] = [
  { category: "All", label: "All projects" },
  { category: "Artificial Intelligence", label: "AI" },
  { category: "Civic Technology", label: "Civic tech" },
  { category: "Digital Solutions", label: "Digital solutions" },
  { category: "Product Development", label: "Product development" },
];

const projectGraphics: Partial<Record<string, React.ComponentType>> = {
  "dentalai-os": DentalAIGraphic,
  fixmybharat: FixMyBharatGraphic,
  syncmates: SyncMatesGraphic,
  "project-unknown": ProjectUnknownGraphic,
  "sri-balaji-interiors": SriBalajiInteriorsGraphic,
};

export function BentoDocket({ experience = "street" }: { experience?: "atelier" | "street" }) {
  const exhibition = useExhibition();
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [preview, setPreview] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDossier | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const projects = category === "All"
    ? brandDossier.projects
    : brandDossier.projects.filter((project) => project.category === category);

  return (
    <section id="work" aria-labelledby="work-heading" className="hairline-b py-12 sm:py-16 lg:py-20">
      {experience === "street" && <ShopWalk />}
      <div className="folio-shell">
        <div className="spatial-work-layout">
          <div className="work-heading">
            <h2 id="work-heading">Selected work</h2>
            <p>Projects across AI, software, and digital products.</p>
            <a className="hero-contact" href="#project-index">Browse all projects <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          {experience === "atelier" && <Station room="work" onOpen={i=>setSelectedProject(brandDossier.projects[i])} />}
          {experience === "street" && projects.length > 0 && <SceneNavigator
            kind="work"
            label="Project gallery"
            items={projects.map((project) => ({ title: project.name, detail: project.category }))}
            active={preview}
            onSelect={setPreview}
            action={{ label: "Case study", run: () => setSelectedProject(projects[preview]) }}
          />}
        </div>
        <div id="project-index" className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button key={filter.category} aria-pressed={category === filter.category} type="button" onClick={() => { setCategory(filter.category); setPreview(0); }}>
              {filter.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{projects.length} projects shown</p>
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {projects.map((project) => {
            const Graphic = projectGraphics[project.id];

            return (
              <article className="work-card" key={project.id}
                onFocus={experience === "atelier" ? () => exhibition.select(brandDossier.projects.indexOf(project), "work") : undefined}
                onPointerEnter={experience === "atelier" ? event => {
                  if (event.pointerType === "mouse") exhibition.select(brandDossier.projects.indexOf(project), "work");
                } : undefined}>
                {experience === "atelier" && <span className="work-catalog-index" aria-hidden="true">{project.index}</span>}
                {Graphic && <div className="work-graphic"><Graphic /></div>}
                <div className="work-card-content">
                  <p className="folio-label">{project.category}<span className="work-status">{project.statusLabel}</span></p>
                  <h3>{project.name}</h3>
                  <p className="work-card-summary">{project.tagline}</p>
                  <div className="work-card-actions">
                    <button aria-haspopup="dialog" aria-label={`Read case study for ${project.name}`} type="button" onClick={() => setSelectedProject(project)}>
                      Case study <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live site in a new tab`}>
                        {project.isCommercialDelivery ? "Live site" : "Live demo"} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <ProjectDetailModal project={selectedProject} isOpen={selectedProject !== null} onClose={closeProject} />
    </section>
  );
}
