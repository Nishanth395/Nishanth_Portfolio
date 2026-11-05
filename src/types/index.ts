export type DevelopmentStatus =
  | "concept"
  | "prototype"
  | "active"
  | "client_services"
  | "production"
  | "maintained";

export type ProjectCategory =
  | "All"
  | "Artificial Intelligence"
  | "Civic Technology"
  | "Digital Solutions"
  | "Product Development";

export interface ProjectDossier {
  id: string;
  index: string; // e.g. "01", "02"
  name: string;
  tagline: string;
  category: ProjectCategory;
  domain: string;
  isCommercialDelivery?: boolean; // Special marker for commercial client work
  commercialBadgeLabel?: string; // e.g. "CLIENT WORK / COMMERCIAL DELIVERY"
  commercialHeadline?: string; // e.g. "MY FIRST COMMERCIAL WEBSITE."
  overview?: string;
  problem: string;
  solution: string;
  keyFeatures?: string[];
  targetAudience: string;
  role: string;
  implementation: string;
  architectureNotes?: string;
  stack: string[];
  status: DevelopmentStatus;
  statusLabel: string; // e.g. "Prototype / Exploration", "Commercial Production"
  businessObjectives?: string[];
  deliveryProcess?: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string; // e.g. "Live Prototype Demo", "Live Platform Demo", "Live Client Site"
  deploymentStatusNote?: string; // Distinction between public deployment demo vs verified production
  challenges: string;
  verifiedOutcomes: string;
}

export interface CapabilityArea {
  index: string; // e.g. "01"
  title: string;
  description: string;
  focusTags: string[];
}

export interface CommercialMilestone {
  clientName: string;
  projectDomain: string;
  websiteUrl: string;
  headline: string;
  subheadline: string;
  clientContext: string;
  businessObjectives: string[];
  responsibilities: string[];
  verifiedFeatures: string[];
  deliveryProcess: string[];
  stack: string[];
  role: string;
  narrative: string;
  lessonsLearned: string[];
  takeaways: string[];
  screenshotPath: string;
}

export interface LeadershipInitiative {
  id: string;
  title: string;
  institution?: string; // e.g. "NIAT Kolhapur"
  role: string;
  scope: string;
  tagline: string;
  description: string;
  motivation?: string;
  audience?: string;
  initiatives: string[];
  format?: string;
}

export interface ProfessionalLinks {
  email: string;
  github: string;
  linkedin: string;
}

export type JournalEntryStatus =
  | "Published"
  | "Draft / In Progress"
  | "Research Note"
  | "Future Writing Idea";

export type JournalCategory =
  | "All"
  | "Commercial Engineering"
  | "Product Thinking"
  | "Applied AI"
  | "Software Philosophy"
  | "Builder Reflection";

export interface JournalEntry {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: JournalCategory;
  status: JournalEntryStatus;
  statusBadge: string;
  summary: string;
  readingTime?: string;
  abstract: string[];
  keyInquiries: string[];
  plannedDiscussion: string[];
}

export interface OperatingPrinciple {
  index: string;
  title: string;
  statement: string;
  rationale: string;
}

export interface PersonalProfile {
  name: string;
  legalName: string;
  title: string;
  subTitle: string;
  location: string;
  timezone: string;
  heroHeadline: string;
  heroSubtitle: string;
  bioShort: string;
  bioFull: string;
  introManifesto: string;
  principles: OperatingPrinciple[];
  problemDomains: string[];
  longTermAmbition: string;
  philosophy: string;
  links: ProfessionalLinks;
  capabilities: CapabilityArea[];
  projects: ProjectDossier[];
  commercialMilestone: CommercialMilestone;
  leadership: LeadershipInitiative[];
  journalEntries: JournalEntry[];
  currentlyExploring: string[];
}
