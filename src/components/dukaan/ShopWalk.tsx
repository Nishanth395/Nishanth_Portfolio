"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { brandDossier } from "@/content/dossier";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import type { ProjectDossier } from "@/types";
import { shops } from "./content";

const projects = shops.flatMap(({ project }) => brandDossier.projects.filter(({ id }) => id === project));

export function ShopWalk() {
  const [selected, setSelected] = useState<ProjectDossier | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    function enter(event: Event) {
      const project = projects.find(({ id }) => id === (event as CustomEvent<string>).detail);
      if (project) {
        setSelected(project);
        dispatchEvent(new CustomEvent("dukaan-shop", { detail: project.id }));
      }
    }
    addEventListener("dukaan-enter", enter);
    return () => removeEventListener("dukaan-enter", enter);
  }, []);

  function visit(project: ProjectDossier) {
    dispatchEvent(new CustomEvent("dukaan-shop", { detail: project.id }));
    setSelected(project);
  }

  return (
    <>
      <div className="shop-walk folio-shell" aria-label="Shopfront case studies">
        {projects.map((project, index) => (
          <article className="shop-stop" id={`shop-${project.id}`} key={project.id} style={{ "--shop-accent": shops[index].canopy } as React.CSSProperties}>
            <div className="shop-ticket">
              <p className="street-label">Shop 0{index + 1} / Open</p>
              <h3>{project.name}</h3>
              <p>{project.tagline}</p>
              <button className="folio-button folio-button-primary" aria-haspopup="dialog" type="button" onClick={() => visit(project)}>Case study <ArrowUpRight size={16} aria-hidden="true" /></button>
            </div>
          </article>
        ))}
      </div>
      <ProjectDetailModal project={selected} isOpen={selected !== null} onClose={close} street />
    </>
  );
}
