"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Box, Orbit, ScanLine, Pause, Play, RotateCcw } from "lucide-react";
import { modules, type ModuleId } from "./module-catalog";
import type { createSculpture } from "./sculpture-scene";

const icons = [Box, Orbit, ScanLine];
const initialView = { pitch: 0, yaw: 0, separation: 0 };
const keys: Record<string, [number, number]> = {
  ArrowLeft: [0, -0.18], ArrowRight: [0, 0.18], ArrowUp: [-0.18, 0], ArrowDown: [0.18, 0],
};

export function Sculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<ModuleId>("relay");
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [separation, setSeparation] = useState(0);
  const view = useRef({ ...initialView, id: selected, playing: false });
  const invalidate = useRef<() => void>(() => {});
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const module = modules.find((entry) => entry.id === selected) ?? modules[0];

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let active = true;
    let visible = true;
    let frame = 0;
    let lastTime = 0;
    let scene: ReturnType<typeof createSculpture> | undefined;
    let resize: ResizeObserver | undefined;
    let intersection: IntersectionObserver | undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const requestDraw = () => {
      if (active && visible && scene && !frame) frame = requestAnimationFrame(draw);
    };
    function draw(time: number) {
      frame = 0;
      if (!scene || !active || !visible) return;
      const state = view.current;
      const animate = state.playing && !drag.current;
      if (animate && lastTime) state.yaw = (state.yaw + Math.min(time - lastTime, 50) * 0.00028) % (Math.PI * 2);
      lastTime = animate ? time : 0;
      scene.render(state.id, state.pitch, state.yaw, state.separation);
      if (animate) requestDraw();
    }
    invalidate.current = requestDraw;

    const reduceMotion = () => {
      if (!preference.matches) return;
      view.current.playing = false;
      setPlaying(false);
      requestDraw();
    };
    const loseContext = () => {
      active = false;
      cancelAnimationFrame(frame);
      setReady(false);
    };
    preference.addEventListener("change", reduceMotion);
    element.addEventListener("webglcontextlost", loseContext);

    import("./sculpture-scene").then(({ createSculpture }) => {
      if (!active) return;
      scene = createSculpture(element);
      const measure = () => {
        scene?.resize(element.clientWidth, element.clientHeight);
        requestDraw();
      };
      resize = new ResizeObserver(measure);
      resize.observe(element);
      intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) lastTime = 0;
        requestDraw();
      });
      intersection.observe(element);
      measure();
      setReady(true);
    }).catch(() => { if (active) setReady(false); });

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      intersection?.disconnect();
      scene?.dispose();
      preference.removeEventListener("change", reduceMotion);
      element.removeEventListener("webglcontextlost", loseContext);
    };
  }, []);

  function reset(id = selected) {
    Object.assign(view.current, initialView, { id, playing: false });
    setPlaying(false);
    setSeparation(0);
    invalidate.current();
  }

  function rotate(pitch: number, yaw: number) {
    view.current.pitch = Math.max(-1.25, Math.min(1.25, view.current.pitch + pitch));
    view.current.yaw = (view.current.yaw + yaw) % (Math.PI * 2);
    invalidate.current();
  }

  return (
    <div className="module-lab" style={{ "--module-color": module.color } as CSSProperties}>
      <figure className="module-stage">
        <figcaption className="module-caption"><span /> 3D module <span aria-hidden="true">/</span> {module.title}</figcaption>
        {!ready && <div className="module-still" role="img" aria-label={module.description} style={{ backgroundImage: `url(/images/modules/${selected}.webp)` }} />}
        <canvas
          className="module-canvas"
          ref={canvas}
          aria-label={`${module.title} model. Use arrow keys to orbit.`}
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
          onLostPointerCapture={() => {
            drag.current = null;
            invalidate.current();
          }}
          onKeyDown={(event) => {
            const direction = keys[event.key];
            if (!direction) return;
            event.preventDefault();
            rotate(...direction);
          }}
        />
        {ready && <div className="module-tools">
          <p>Drag or use arrow keys</p>
          <button type="button" aria-label={playing ? "Pause automatic rotation" : "Start automatic rotation"} onClick={() => {
            view.current.playing = !playing;
            setPlaying(!playing);
            invalidate.current();
          }}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>
          <button type="button" aria-label="Reset model view" onClick={() => reset()}><RotateCcw size={16} aria-hidden="true" /></button>
        </div>}
      </figure>
      <div className="module-picker" role="group" aria-label="Choose a 3D module">
        {modules.map(({ id, title, discipline }, index) => {
          const Icon = icons[index];
          return (
            <button key={id} type="button" aria-pressed={selected === id} onClick={() => {
              if (id === selected) return;
              setSelected(id);
              reset(id);
            }}>
              <Icon size={18} aria-hidden="true" />
              <span>{title}<small>{discipline}</small></span>
            </button>
          );
        })}
      </div>
      <div className="module-details">
        <p aria-live="polite">{module.description}</p>
        {ready && <label className="module-slider">
          <span>Exploded view <output>{separation}%</output></span>
          <input type="range" min="0" max="100" value={separation} onChange={(event) => {
            const amount = event.currentTarget.valueAsNumber;
            view.current.separation = amount / 100;
            setSeparation(amount);
            invalidate.current();
          }} />
        </label>}
      </div>
    </div>
  );
}
