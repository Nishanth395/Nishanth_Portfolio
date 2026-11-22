"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SpatialStage } from "./SpatialStage";
import type { SceneKind } from "./spatial-scenes";

interface SceneNavigatorProps {
  kind: SceneKind;
  label: string;
  items: readonly { title: string; detail?: string }[];
  active: number;
  onSelect: (index: number) => void;
  action?: { label: string; run: () => void } | { label: string; href: string };
}

export function SceneNavigator({ kind, label, items, active, onSelect, action }: SceneNavigatorProps) {
  const item = items[active];
  const actionContent = action && <>{action.label} <ArrowUpRight size={15} aria-hidden="true" /></>;

  function step(offset: number) {
    onSelect((active + offset + items.length) % items.length);
  }

  return (
    <div className="spatial-exhibit">
      <SpatialStage kind={kind} active={active} label={label} />
      <div className="spatial-console">
        <div aria-live="polite" className="spatial-selection">
          <strong>{item.title}</strong>
          {item.detail && <span>{item.detail}</span>}
        </div>
        <div className="spatial-actions">
          {action && ("href" in action
            ? <a className="spatial-action" href={action.href}>{actionContent}</a>
            : <button className="spatial-action" type="button" aria-haspopup="dialog" onClick={action.run}>{actionContent}</button>)}
          <div className="spatial-step" role="group" aria-label={label}>
            <button type="button" disabled={items.length < 2} aria-label={`Previous ${label.toLowerCase()} item`} onClick={() => step(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
            <button type="button" disabled={items.length < 2} aria-label={`Next ${label.toLowerCase()} item`} onClick={() => step(1)}><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
