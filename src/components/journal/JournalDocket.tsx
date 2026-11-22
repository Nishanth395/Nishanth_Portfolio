"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { brandDossier } from "@/content/dossier";
import type { JournalEntry } from "@/types";
import { Station, useExhibition } from "@/components/exhibition/Exhibition";
import { SceneNavigator } from "@/components/spatial/SceneNavigator";
import { JournalEntryModal } from "./JournalEntryModal";

export function JournalDocket({exhibition=false}:{exhibition?:boolean}) {
  const gallery = useExhibition();
  const [preview, setPreview] = useState(0);
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const close = useCallback(() => setEntry(null), []);

  return (
    <section className="notes-section hairline-b" id="journal" aria-labelledby="notes-title">
      <div className="folio-shell studio-grid">
        <div>
          <p className="folio-label text-cobalt">Journal</p>
          <h2 id="notes-title" className="folio-section-title">Field notes.</h2>
          <p className="studio-intro">Research, reflections, and ideas from work in progress.</p>
          {exhibition ? <Station room="journal" onOpen={i=>setEntry(brandDossier.journalEntries[i])} /> : <SceneNavigator
            kind="notes"
            label="Notes archive"
            items={brandDossier.journalEntries.map((note) => ({ title: note.title, detail: note.status }))}
            active={preview}
            onSelect={setPreview}
            action={{ label: "Read note", run: () => setEntry(brandDossier.journalEntries[preview]) }}
          />}
        </div>
        <ul className="notes-list">
          {brandDossier.journalEntries.map((note, index) => (
            <li key={note.id}>
              <button onFocus={exhibition ? () => gallery.select(index, "journal") : undefined} aria-haspopup="dialog" type="button" onClick={() => setEntry(note)}>
                <span><small>{note.category} · {note.status}</small>{note.title}</span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <JournalEntryModal entry={entry} onClose={close} />
    </section>
  );
}
