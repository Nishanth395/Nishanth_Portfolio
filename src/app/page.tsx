import { ClientStory, CampusStory, PersonalStory } from "@/components/atelier/Stories";
import { HeaderFolio } from "@/components/navigation/HeaderFolio";
import { AtelierHero } from "@/components/atelier/AtelierHero";
import { BentoDocket } from "@/components/projects/BentoDocket";
import { JournalDocket } from "@/components/journal/JournalDocket";
import { CollaborationGateway } from "@/components/contact/CollaborationGateway";
import { GlobalFooter } from "@/components/footer/GlobalFooter";
import { Exhibition } from "@/components/exhibition/Exhibition";
import "./atelier.css";

export default function HomePage() {
  return (
    <div className="atelier edition">
      <Exhibition>
      <HeaderFolio atelier />
      <main id="main-content" tabIndex={-1}>
        <AtelierHero />
        <BentoDocket experience="atelier" />
        <ClientStory />
        <CampusStory />
        <PersonalStory />
        <JournalDocket exhibition />
        <CollaborationGateway exhibition />
      </main>
      <GlobalFooter />
      </Exhibition>
    </div>
  );
}
