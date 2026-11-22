import { ArrowUp, ArrowUpRight } from "lucide-react";
import { brandDossier } from "@/content/dossier";

export function GlobalFooter() {
  return (
    <footer className="folio-shell site-footer">
      <strong>Nishanth Adepu</strong>
      <nav aria-label="Social links">
        <a href={brandDossier.links.github}>GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={brandDossier.links.linkedin}>LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <a href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
    </footer>
  );
}
