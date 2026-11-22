"use client";

import { useEffect, useRef, useState } from "react";
import { Move } from "lucide-react";
import type { SceneKind } from "./spatial-scenes";

const directions: Record<string, readonly [number, number]> = {
  ArrowUp: [-0.16, 0], ArrowDown: [0.16, 0], ArrowLeft: [0, -0.16], ArrowRight: [0, 0.16],
};

export function SpatialStage({ kind, active, label }: { kind: SceneKind; active: number; label: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const position = useRef({ pitch: 0, yaw: 0 });
  const selection = useRef(active);
  const redraw = useRef<() => void>(() => {});
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    selection.current = active;
    redraw.current();
  }, [active]);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    let alive = true;
    let visible = false;
    let frame = 0;
    let draw: typeof import("./spatial-scenes").drawSpatialScene | undefined;
    let loading = false;

    function requestDraw() {
      if (!alive || !visible || !draw || frame || !element || !context) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!visible) return;
        const scale = Math.min(window.devicePixelRatio, 1.5);
        const width = Math.round(element.clientWidth * scale);
        const height = Math.round(element.clientHeight * scale);
        if (!width || !height) return;
        if (element.width !== width) element.width = width;
        if (element.height !== height) element.height = height;
        const { pitch, yaw } = position.current;
        try {
          draw?.(context, kind, selection.current, pitch, yaw);
          setReady(true);
        } catch {
          setReady(false);
        }
      });
    }
    redraw.current = requestDraw;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !loading) {
        loading = true;
        import("./spatial-scenes").then((module) => {
          if (!alive) return;
          draw = module.drawSpatialScene;
          requestDraw();
        }).catch(() => {});
      }
      requestDraw();
    });
    const resize = new ResizeObserver(requestDraw);
    intersection.observe(element);
    resize.observe(element);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
    };
  }, [kind]);

  function orbit(pitch: number, yaw: number) {
    position.current.pitch = Math.max(-1.05, Math.min(1.05, position.current.pitch + pitch));
    position.current.yaw = (position.current.yaw + yaw) % (Math.PI * 2);
    redraw.current();
  }

  return (
    <div className="spatial-stage" data-scene={kind}>
      <div className="spatial-grid" aria-hidden="true" />
      {!ready && <div className="spatial-still" style={{ backgroundImage: `url(/images/spatial/${kind}.webp)` }} aria-hidden="true" />}
      <canvas
        className="spatial-canvas"
        ref={canvas}
        data-ready={ready}
        tabIndex={ready ? 0 : -1}
        aria-hidden={!ready}
        aria-label={`${label}. Use arrow keys to orbit and Home to reset the view.`}
        onPointerDown={(event) => {
          if (!ready || !event.isPrimary || event.button !== 0) return;
          pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const previous = pointer.current;
          if (!previous || previous.id !== event.pointerId) return;
          orbit((event.clientY - previous.y) * 0.013, (event.clientX - previous.x) * 0.013);
          pointer.current = { id: previous.id, x: event.clientX, y: event.clientY };
        }}
        onLostPointerCapture={() => { pointer.current = null; }}
        onKeyDown={(event) => {
          if (event.key === "Home") {
            event.preventDefault();
            position.current = { pitch: 0, yaw: 0 };
            redraw.current();
            return;
          }
          const direction = directions[event.key];
          if (!direction) return;
          event.preventDefault();
          orbit(...direction);
        }}
      />
      {ready && <span className="spatial-hint" aria-hidden="true"><Move size={13} /> Drag to orbit</span>}
    </div>
  );
}
