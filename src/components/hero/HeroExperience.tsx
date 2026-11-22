import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Sculpture } from "./Sculpture";

export function HeroExperience() {
  return (
    <section id="home" className="portfolio-hero folio-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="folio-label">Nishanth Adepu · Hyderabad, India</p>
        <h1 id="hero-title">From idea<br />to <em>system.</em></h1>
        <p className="hero-description">
          I’m a developer and product builder working across applied AI, software architecture, and digital products.
        </p>
        <div className="hero-actions">
          <a className="folio-button folio-button-primary" href="#work">View selected work <ArrowDownRight size={18} aria-hidden="true" /></a>
          <a className="hero-contact" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <Sculpture />
    </section>
  );
}
