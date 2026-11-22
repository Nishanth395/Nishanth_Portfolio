import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { brandDossier } from "@/content/dossier";
import { Sculpture } from "./Sculpture";

export function HeroExperience() {
  return (
    <section id="home" className="portfolio-hero folio-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="folio-label hero-eyebrow"><span aria-hidden="true" /> Hi, I’m Nishanth Adepu</p>
        <h1 id="hero-title">Building<br />what’s <em>next.</em></h1>
        <p className="hero-description">
          I design and build AI products, software, and digital experiences for real-world problems.
        </p>
        <div className="hero-actions">
          <a className="folio-button folio-button-primary" href="#work">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
          <a className="folio-button folio-button-outline" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="hero-location"><MapPin size={15} aria-hidden="true" /> {brandDossier.location}</div>
      </div>
      <Sculpture />
      <div className="hero-footer">
        <a href="#work"><ArrowDown size={15} aria-hidden="true" /> Scroll to projects</a>
        <p>Applied AI <span /> Software engineering <span /> Product design</p>
      </div>
    </section>
  );
}
