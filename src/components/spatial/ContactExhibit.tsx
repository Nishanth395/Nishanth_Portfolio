"use client";

import { useState } from "react";
import { brandDossier } from "@/content/dossier";
import { SceneNavigator } from "./SceneNavigator";

const channels = [
  { title: "Contact form", detail: "Share the details of your project.", label: "Write a message", href: "#contact-message-panel" },
  { title: "Email", detail: brandDossier.links.email, label: "Open email", href: `mailto:${brandDossier.links.email}` },
  { title: "LinkedIn", detail: "Connect with Nishanth.", label: "Open profile", href: brandDossier.links.linkedin },
];

export function ContactExhibit() {
  const [active, setActive] = useState(0);
  return <SceneNavigator kind="contact" label="Contact beacon" items={channels} active={active} onSelect={setActive} action={channels[active]} />;
}
