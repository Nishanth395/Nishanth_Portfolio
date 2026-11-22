"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { Map, RotateCcw } from "lucide-react";
import { streetLinks } from "./content";

const StreetCanvas = dynamic(() => import("./StreetCanvas"), { ssr: false });

export function StreetShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"pending" | "street" | "flat">("pending");
  const [loading, setLoading] = useState(0);
  const [current, setCurrent] = useState("home");
  const [progress, setProgress] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let preferred = "";
      try { preferred = localStorage.getItem("dukaan-view") ?? ""; } catch {}
      setMode(motion.matches || preferred === "flat" ? "flat" : "street");
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const threshold = window.innerHeight * .49;
      const visible = [...streetLinks].reverse().find(({ id }) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= threshold);
      setCurrent(visible?.id ?? "home");
      setProgress(Math.min(100, Math.round(window.scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1) * 100)));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (mode !== "street" || loading === 100) return;
    const timeout = setTimeout(() => setMode("flat"), 10000);
    return () => clearTimeout(timeout);
  }, [mode, loading]);

  function toggle() {
    const next = mode === "street" ? "flat" : "street";
    try { localStorage.setItem("dukaan-view", next); } catch {}
    setLoading(0);
    setMode(next);
  }

  return (
    <div className="dukaan" data-view={mode}>
      {mode === "street" && <StreetCanvas onPrepared={() => setLoading(60)} onReady={() => setLoading(100)} onUnavailable={() => setMode("flat")} />}
      {mode === "street" && loading < 100 && <div className="street-loader" role="status"><span /><span>Opening the street… {loading}%</span></div>}
      <div className="street-content">{children}</div>
      <aside className="street-tools" aria-label="Street controls">
        {mapOpen && <nav className="street-map" aria-label="Street map">
          <div className="street-map-meter" aria-hidden="true"><span style={{ width: progress + "%" }} /></div>
          {streetLinks.map(({ id, label }) => <a href={`#${id}`} aria-current={current === id ? "location" : undefined} key={id} onClick={() => setMapOpen(false)}>{label}</a>)}
        </nav>}
        <div className="street-tools-row">
          <button type="button" aria-expanded={mapOpen} onClick={() => setMapOpen(!mapOpen)}><Map size={16} aria-hidden="true" /> <span>Street map</span></button>
          <button type="button" onClick={toggle}><RotateCcw size={15} aria-hidden="true" /> {mode === "street" ? "Skip 3D" : "Enable 3D"}</button>
        </div>
      </aside>
    </div>
  );
}
