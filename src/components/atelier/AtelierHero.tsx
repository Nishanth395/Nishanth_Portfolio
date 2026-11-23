import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Station } from "../exhibition/Exhibition";

export function AtelierHero() {
  return (
    <section id="home" className="cover" aria-labelledby="cover-name">
      <div className="cover-layout folio-shell">
        <div className="cover-intro">
          <p className="cover-byline">Student founder <span> / </span> NIAT Kolhapur</p>
          <h1 id="cover-name">Nishanth<br /><em>Adepu.</em></h1>
          <p className="cover-note">I build software, run a student entrepreneurship club, and talk to founders about how they got started.</p>
          <div className="cover-actions">
            <a href="#work">Explore my work <ArrowDown size={16} /></a>
            <a href="#contact">Get in touch <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <Station room="home" />
      </div>
    </section>
  );
}
