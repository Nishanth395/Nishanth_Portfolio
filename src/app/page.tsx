import { StreetShell } from "@/components/dukaan/StreetShell";
import { HeaderFolio } from "@/components/navigation/HeaderFolio";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { BentoDocket } from "@/components/projects/BentoDocket";
import { Studio } from "@/components/studio/Studio";
import { JournalDocket } from "@/components/journal/JournalDocket";
import { CollaborationGateway } from "@/components/contact/CollaborationGateway";
import { GlobalFooter } from "@/components/footer/GlobalFooter";

export default function HomePage() {
  return (
    <StreetShell>
      <HeaderFolio />
      <main id="main-content" tabIndex={-1}>
        <HeroExperience />
        <BentoDocket />
        <Studio />
        <JournalDocket />
        <CollaborationGateway />
      </main>
      <GlobalFooter />
    </StreetShell>
  );
}
