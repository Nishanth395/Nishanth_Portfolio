"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Image as ImageIcon } from "lucide-react";

const PortalScene = dynamic(() => import("./PortalScene"), { ssr: false });

export function PortalViewer({ portraitSrc }: { portraitSrc?: string }) {
  const viewer = useRef<HTMLElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = viewer.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setAllowed(!preference.matches);
      if (preference.matches) {
        setLive(false);
        setReady(false);
      }
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!allowed || !viewer.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLive(true);
      observer.disconnect();
    }, { rootMargin: "100px" });
    observer.observe(viewer.current);
    return () => observer.disconnect();
  }, [allowed]);

  return (
    <figure ref={viewer} className="atelier-portal" data-ready={ready}>
      <div className="atelier-portal-poster" aria-hidden="true">
        {portraitSrc && <div className="atelier-portrait-still" style={{ backgroundImage: `url(${portraitSrc})` }} />}
      </div>
      {live && !failed && <PortalScene
        portraitSrc={portraitSrc}
        onReady={() => setReady(true)}
        onUnavailable={() => { setReady(false); setFailed(true); }}
      />}
      <div className="atelier-portal-frame" aria-hidden="true"><span /><span /><span /><span /></div>
      <figcaption>
        <span>The Digital Architecture of Ideas{portraitSrc && <span className="sr-only"> featuring a portrait of Nishanth Adepu</span>}</span>
        {!failed && (live || allowed) && <button
          type="button"
          aria-pressed={live}
          aria-label={live ? "Show still installation" : "Enable interactive installation"}
          onClick={() => { setReady(false); setLive(!live); }}
        >
          {live ? <ImageIcon size={15} aria-hidden="true" /> : <Box size={15} aria-hidden="true" />}
          {live ? "Still view" : "3D view"}
        </button>}
      </figcaption>
    </figure>
  );
}
