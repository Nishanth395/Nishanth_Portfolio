import { StudioExhibit } from "@/components/spatial/StudioExhibit";
import { ArrowDownRight } from "lucide-react";
import { brandDossier } from "@/content/dossier";

export function Studio() {
  return (
    <section id="about" className="studio-section hairline-b" aria-labelledby="studio-title">
      <div className="folio-shell studio-grid">
        <div>
          <p className="folio-label text-cobalt">About the studio</p>
          <h2 id="studio-title" className="folio-section-title">How I build.</h2>
          <p className="studio-intro">{brandDossier.bioShort}</p>
          <a className="hero-contact" href="#contact">Talk about a project <ArrowDownRight size={16} aria-hidden="true" /></a>
          <StudioExhibit />
        </div>
        <div>
          <dl className="studio-capabilities">
            {brandDossier.capabilities.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
          <div className="studio-more">
            <details id="ventures">
              <summary>Commercial work</summary>
              <p>{brandDossier.commercialMilestone.narrative}</p>
              <a href={brandDossier.commercialMilestone.websiteUrl}>Visit {brandDossier.commercialMilestone.clientName}</a>
            </details>
            <details id="leadership">
              <summary>Leadership and community</summary>
              {brandDossier.leadership.map((entry) => <div key={entry.id}><h3>{entry.title}</h3><p>{entry.description}</p></div>)}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
