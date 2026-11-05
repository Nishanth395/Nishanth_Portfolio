import React from "react";
import { HeaderFolio } from "@/components/navigation/HeaderFolio";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { CapabilityGrid } from "@/components/capabilities/CapabilityGrid";
import { BentoDocket } from "@/components/projects/BentoDocket";
import { CommercialProvenance } from "@/components/commercial/CommercialProvenance";
import { LeadershipInitiatives } from "@/components/initiatives/LeadershipInitiatives";
import { PersonalPerspective } from "@/components/perspective/PersonalPerspective";
import { JournalDocket } from "@/components/journal/JournalDocket";
import { CollaborationGateway } from "@/components/contact/CollaborationGateway";
import { GlobalFooter } from "@/components/footer/GlobalFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-canvas text-ink-primary flex flex-col transition-colors selection:bg-cobalt selection:text-white">
      {/* 1. Folio Masthead & Global Navigation */}
      <HeaderFolio />

      {/* 2. Main Landmark */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <HeroExperience />

        {/* Capabilities Grid */}
        <CapabilityGrid />

        {/* Selected Projects Bento Docket (Milestone 3) */}
        <BentoDocket />

        {/* Commercial Provenance Case Study (Milestone 4 - #ventures) */}
        <CommercialProvenance />

        {/* Leadership & Initiatives (Milestone 4 - #leadership) */}
        <LeadershipInitiatives />

        {/* Personal Perspective (Milestone 5 - #about) */}
        <PersonalPerspective />

        {/* Journal & Research Docket (Milestone 5 - #journal) */}
        <JournalDocket />

        {/* Collaboration Gateway (Milestone 4 - #contact) */}
        <CollaborationGateway />
      </main>

      {/* 3. Colophon & Global Footer (Milestone 5) */}
      <GlobalFooter />
    </div>
  );
}
