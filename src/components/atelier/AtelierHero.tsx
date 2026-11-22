import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { brandDossier } from "@/content/dossier";
import { PortalViewer } from "./PortalViewer";

const portrait = "/images/atelier/nishanth.webp";

export function AtelierHero() {
  const portraitSrc = existsSync(join(process.cwd(), "public", portrait)) ? portrait : undefined;

  return (
    <section id="home" className="atelier-hero" aria-labelledby="atelier-heading">
      <div className="folio-shell atelier-hero-grid">
        <div className="atelier-hero-copy">
          <p className="atelier-kicker"><span aria-hidden="true" /> <strong>Nishanth Adepu</strong></p>
          <p className="atelier-identity">{brandDossier.title}</p>
          <h1 id="atelier-heading">I build ideas<br className="atelier-linebreak" /> into digital <em>reality.</em></h1>
          <p className="atelier-intro">
            I explore artificial intelligence, build software products and turn real-world problems into practical solutions.
          </p>
          <div className="atelier-hero-actions">
            <a className="atelier-primary" href="#work">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="atelier-secondary" href="#contact">Let&apos;s connect <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <PortalViewer portraitSrc={portraitSrc} />
        <div className="atelier-index">
          <span>AI &amp; Software Engineering</span>
          <span>Product Development</span>
          <span>Entrepreneurship</span>
          <span className="atelier-availability"><i /> Open to meaningful collaborations</span>
        </div>
      </div>
    </section>
  );
}
