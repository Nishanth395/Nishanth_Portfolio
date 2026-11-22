import { HeaderFolio } from "@/components/navigation/HeaderFolio";
import { AtelierHero } from "@/components/atelier/AtelierHero";
import { BentoDocket } from "@/components/projects/BentoDocket";
import { CommercialProvenance } from "@/components/commercial/CommercialProvenance";
import { LeadershipInitiatives } from "@/components/initiatives/LeadershipInitiatives";
import { PersonalPerspective } from "@/components/perspective/PersonalPerspective";
import { JournalDocket } from "@/components/journal/JournalDocket";
import { CollaborationGateway } from "@/components/contact/CollaborationGateway";
import { GlobalFooter } from "@/components/footer/GlobalFooter";
import { Exhibition } from "@/components/exhibition/Exhibition";
import "./atelier.css";

export default function HomePage() {
  return (
    <div className="atelier">
      <Exhibition>
      <HeaderFolio atelier />
      <main id="main-content" tabIndex={-1}>
        <AtelierHero />
        <BentoDocket experience="atelier" />
        <CommercialProvenance />
        <LeadershipInitiatives />
        <PersonalPerspective />
        <JournalDocket exhibition />
        <CollaborationGateway exhibition />
      </main>
      <GlobalFooter />
      </Exhibition>
    </div>
  );
}
