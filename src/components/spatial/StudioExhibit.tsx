"use client";

import { useState } from "react";
import { brandDossier } from "@/content/dossier";
import { SceneNavigator } from "./SceneNavigator";

const capabilities = brandDossier.capabilities.map(({ title, description }) => ({ title, detail: description }));

export function StudioExhibit() {
  const [active, setActive] = useState(0);
  return <SceneNavigator kind="studio" label="Studio assembly" items={capabilities} active={active} onSelect={setActive} />;
}
