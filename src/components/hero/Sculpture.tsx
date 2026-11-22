"use client";

import { useEffect, useRef, useState } from "react";
import { Move, Pause, Play, RotateCcw } from "lucide-react";
import type { createSculpture } from "./sculpture-scene";

export function Sculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = useRef(true);
  const angles = useRef({ pitch: 0, yaw: 0 });
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      playing.current = !preference.matches;
      setPaused(preference.matches);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);

    let active = true;
    let visible = true;
    let frame = 0;
    let lastTime = 0;
    let scene: ReturnType<typeof createSculpture> | undefined;
    let resize: ResizeObserver | undefined;
    let intersection: IntersectionObserver | undefined;
    const loseContext = (event: Event) => {
      event.preventDefault();
      active = false;
      cancelAnimationFrame(frame);
      setReady(false);
    };
    element.addEventListener("webglcontextlost", loseContext);

    async function initialize(target: HTMLCanvasElement) {
      const { createSculpture } = await import("./sculpture-scene");
      if (!active) return;
      scene = createSculpture(target);
      const draw = () => scene?.render(angles.current.pitch, angles.current.yaw);
      const measure = () => {
        scene?.resize(target.clientWidth, target.clientHeight);
        draw();
      };
      resize = new ResizeObserver(measure);
      resize.observe(target);
      intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      intersection.observe(target);
      measure();
      setReady(true);

      let previousPitch = angles.current.pitch;
      let previousYaw = angles.current.yaw;
      const tick = (time: number) => {
        const delta = lastTime ? Math.min(time - lastTime, 40) : 0;
        lastTime = time;
        const view = angles.current;
        if (visible && playing.current && !drag.current) view.yaw += delta * 0.00025;
        if (visible && (view.pitch !== previousPitch || view.yaw !== previousYaw)) {
          draw();
          previousPitch = view.pitch;
          previousYaw = view.yaw;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    initialize(element).catch(() => { if (active) setReady(false); });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      intersection?.disconnect();
      scene?.dispose();
      preference.removeEventListener("change", updatePreference);
      element.removeEventListener("webglcontextlost", loseContext);
    };
  }, []);

  function rotate(pitch: number, yaw: number) {
    const current = angles.current;
    current.pitch = Math.max(-1.2, Math.min(1.2, current.pitch + pitch));
    current.yaw += yaw;
  }

  return (
    <figure className="sculpture">
      <div className="sculpture-grid" aria-hidden="true" />
      <div className={`sculpture-fallback ${ready ? "sculpture-fallback-hidden" : ""}`} aria-hidden="true" />
      <canvas
        className="sculpture-canvas"
        ref={canvas}
        aria-label="Continuum, a lime-green ribbed ribbon folded into a three-dimensional knot. Use the arrow keys to rotate."
        role={ready ? "img" : undefined}
        aria-hidden={!ready}
        tabIndex={ready ? 0 : -1}
        onPointerDown={(event) => {
          if (!ready || !event.isPrimary || event.button !== 0) return;
          drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || start.id !== event.pointerId) return;
          rotate((event.clientY - start.y) * 0.012, (event.clientX - start.x) * 0.012);
          drag.current = { id: start.id, x: event.clientX, y: event.clientY };
        }}
        onLostPointerCapture={() => { drag.current = null; }}
        onKeyDown={(event) => {
          const directions: Record<string, [number, number]> = {
            ArrowLeft: [0, -0.18], ArrowRight: [0, 0.18], ArrowUp: [-0.18, 0], ArrowDown: [0.18, 0]
          };
          const direction = directions[event.key];
          if (!direction) return;
          event.preventDefault();
          rotate(...direction);
        }}
      />
      <figcaption className="sculpture-caption">
        <span className="sculpture-dot" />
        <span>Continuum <small>Generative sculpture</small></span>
      </figcaption>
      {ready && (
        <>
          <span className="sculpture-hint" aria-hidden="true"><Move size={14} /> Drag to rotate</span>
          <div className="sculpture-controls">
            <button type="button" aria-label={paused ? "Start automatic rotation" : "Pause automatic rotation"} onClick={() => {
              playing.current = paused;
              setPaused(!paused);
            }}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
            <button type="button" aria-label="Reset sculpture angle" onClick={() => {
              angles.current = { pitch: 0, yaw: 0 };
            }}><RotateCcw size={16} /></button>
          </div>
        </>
      )}
    </figure>
  );
}
