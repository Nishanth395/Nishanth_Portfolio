"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ACESFilmicToneMapping, CanvasTexture, Color, Fog, MathUtils, SRGBColorSpace, Vector2, Vector3, type Group, type HemisphereLight, type DirectionalLight, type PointLight } from "three";
import { gsap } from "gsap";
import Lenis from "lenis";
import { brandDossier } from "@/content/dossier";
import { shops } from "./content";
import { timeline } from "./timeline";

const aberrationOffset = new Vector2(.00065, .00045);
const cream = "#FFF4E0";
const ink = "#1B1F4B";
type Vector = [number, number, number];

function Block({ at, size, color, glow = false }: { at: Vector; size: Vector; color: string; glow?: boolean }) {
  return <mesh position={at}><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={.85} emissive={glow ? color : undefined} emissiveIntensity={glow ? 2.2 : 0} /></mesh>;
}

function Sign({ label, color, at, width = 3.8 }: { label: string; color: string; at: Vector; width?: number }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 160;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#22223F";
    context.fillRect(0, 0, 768, 160);
    context.strokeStyle = color;
    context.lineWidth = 6;
    context.strokeRect(12, 12, 744, 136);
    context.fillStyle = "#FFF4E0";
    context.font = label.length > 15 ? "bold 49px sans-serif" : "bold 66px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label, 384, 83, 710);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return map;
  }, [label, color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={at}><planeGeometry args={[width, width * .21]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>;
}

function Shop({ shop, simple }: { shop: (typeof shops)[number]; simple: boolean }) {
  const [hover, setHover] = useState(false);
  const shutter = useRef<Group>(null);
  const awning = useRef<Group>(null);
  const label = brandDossier.projects.find((project) => project.id === shop.project)?.name ?? "";
  useFrame(({ camera, clock }, delta) => {
    if (shutter.current) {
      const open = 1 - MathUtils.smoothstep(Math.abs(camera.position.z - shop.distance) - 2, 6, 15);
      shutter.current.scale.y = MathUtils.damp(shutter.current.scale.y, Math.max(.08, 1 - open), 5, delta);
    }
    if (awning.current) awning.current.rotation.x = MathUtils.damp(awning.current.rotation.x, hover ? Math.sin(clock.elapsedTime * 8) * .075 : 0, 8, delta);
  });

  return (
    <group position={[shop.side * 5.5, 0, shop.distance]} rotation-y={-shop.side * .43}>
      <Block at={[0, 2.1, -.78]} size={[5.15, 4.2, 2.9]} color={shop.paint} />
      <Block at={[0, 4.25, -.56]} size={[5.48, .26, 3.1]} color={cream} />
      <Block at={[-1.6, 4.72, -1.3]} size={[1.2, .97, 1.37]} color={shop.paint} />
      <Block at={[0, 1.25, .72]} size={[3.9, 2.45, .12]} color={ink} />
      <Block at={[0, .49, .97]} size={[3.9, .23, .66]} color={shop.canopy} />
      <Block at={[-1.13, 1.16, .88]} size={[.83, .82, .22]} color="#D58C5F" />
      <Block at={[.96, 1.04, .88]} size={[1.05, .57, .21]} color={shop.canopy} />
      <group ref={shutter} position={[0, 2.4, .96]}>
        <Block at={[0, -1.02, 0]} size={[3.8, 2.04, .12]} color={shop.canopy} />
        {Array.from({ length: simple ? 6 : 10 }, (_, row) => <Block key={row} at={[0, -(row + .5) * (simple ? .34 : .2), .075]} size={[3.8, .035, .025]} color={shop.paint} />)}
      </group>
      <group ref={awning} position={[0, 2.88, .98]}>
        {Array.from({ length: 9 }, (_, stripe) => (
          <group key={stripe}>
            <mesh position={[(stripe - 4) * .49, -.11, .55]} rotation-x={.27}>
              <boxGeometry args={[.49, .10, 1.24]} /><meshStandardMaterial color={stripe % 2 ? cream : shop.canopy} />
            </mesh>
            <Block at={[(stripe - 4) * .49, -.3, 1.11]} size={[.49, .25, .10]} color={stripe % 2 ? cream : shop.canopy} />
          </group>
        ))}
      </group>
      <group onPointerOver={(event) => { event.stopPropagation(); setHover(true); }} onPointerOut={() => setHover(false)} onClick={(event) => {
        event.stopPropagation();
        dispatchEvent(new CustomEvent("dukaan-enter", { detail: shop.project }));
      }}>
        <Block at={[0, 3.53, .81]} size={[4.38, .92, .32]} color={shop.canopy} glow={hover} />
        <Sign at={[0, 3.53, 1]} width={4.25} label={label} color={shop.canopy} />
      </group>
      {[-1, 1].map((side) => <Block key={side} at={[side * 2.28, 1.45, .86]} size={[.19, 2.86, .31]} color={cream} />)}
    </group>
  );
}

function Lantern({ at, color }: { at: Vector; color: string }) {
  return <group position={at}>
    <Block at={[0, .27, 0]} size={[.12, .22, .12]} color={ink} />
    <mesh><dodecahedronGeometry args={[.24, 0]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.65} roughness={.7} /></mesh>
    <Block at={[0, -.25, 0]} size={[.12, .06, .12]} color={ink} />
  </group>;
}

function StreetGeometry({ simple }: { simple: boolean }) {
  const paints = ["#CC745B", "#A35E58", "#F1A276", "#795A73", "#BD774B"];
  return <>
    <Block at={[0, -.21, -36]} size={[11.4, .31, 112]} color="#A76455" />
    {[-1, 1].map((side) => <group key={side}>
      <Block at={[side * 4.08, -.06, -35]} size={[1.42, .21, 108]} color="#CA8F74" />
      {Array.from({ length: 15 }, (_, i) => {
        const z = 8 - 6 * i;
        const height = 3.3 + (i % 4) * .64;
        return <group key={i}>
          <Block at={[side * 8.24, height / 2, z]} size={[3.61, height, 5.32]} color={paints[(i + (side > 0 ? 2 : 0)) % paints.length]} />
          <Block at={[side * 8.1, height + .06, z]} size={[3.89, .23, 5.45]} color="#E4A780" />
          <Block at={[side * 6.39, height - .84, z + .6]} size={[.10, .71, .66]} color={ink} />
          {!simple && i % 2 === 0 && <Lantern at={[side * 3.53, 3.65, z + 1.7]} color={i > 7 ? "#2EE6C5" : "#FFB627"} />}
        </group>;
      })}
    </group>)}
    {Array.from({ length: simple ? 30 : 60 }, (_, i) => (
      <Block key={i} at={[(i % 3 - 1) * 2.14 + Math.sin(i * 4) * .23, -.038, 13 - i * (simple ? 3.05 : 1.52)]} size={[1.15, .025, .58]} color={i % 3 === 0 ? "#C48A70" : "#B57664"} />
    ))}
    {[6, -12, -30, -50, -69].map((z, row) => (
      <group key={z}>
        <Block at={[0, 4.73, z]} size={[10.4, .025, .025]} color={ink} />
        {Array.from({ length: simple ? 4 : 8 }, (_, i) => (
          <Lantern key={i} at={[(i - (simple ? 1.5 : 3.5)) * (simple ? 1.8 : 1.1), 4.48 - Math.sin(i / (simple ? 3 : 7) * Math.PI) * .22, z]} color={row > 2 && i % 2 ? "#2EE6C5" : "#FFB627"} />
        ))}
      </group>
    ))}
    <group position={[0, 0, -4]}>
      <Block at={[-3.54, 2.6, 0]} size={[.31, 5.2, .35]} color="#784743" />
      <Block at={[3.54, 2.6, 0]} size={[.31, 5.2, .35]} color="#784743" />
      <Block at={[0, 5.15, 0]} size={[7.42, .33, .4]} color="#784743" />
      <Block at={[0, 4.52, .02]} size={[4.98, 1.02, .18]} color="#E8452C" />
      <Sign at={[0, 4.52, .14]} width={4.7} label="NISHANTH — BUILDER" color="#FFB627" />
    </group>
    {shops.map((shop) => <Shop key={shop.project} shop={shop} simple={simple} />)}
    <group position={[-3.55, 0, -53]} rotation-y={.58}>
      <Block at={[0, .56, .18]} size={[3.47, 1.12, 1.34]} color="#B46B48" />
      <Block at={[0, 1.18, .17]} size={[3.66, .13, 1.61]} color="#F9C981" />
      {[-1.52, 1.52].map((x) => <Block key={x} at={[x, 1.72, -.37]} size={[.10, 3.24, .12]} color="#B46B48" />)}
      <Block at={[0, 3.18, -.07]} size={[3.78, .16, 1.67]} color="#E8452C" />
      <Sign at={[0, 2.84, .63]} width={2.65} label="CHAI / चाय" color="#FFB627" />
      {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[(i - 3) * .34, 1.34, .32 + (i % 2) * .26]}><cylinderGeometry args={[.083, .058, .18, 6]} /><meshStandardMaterial color={i % 2 ? "#D7895A" : cream} /></mesh>)}
    </group>
    <group position={[0, 0, -75]}>
      <Block at={[0, 2.57, -.72]} size={[7.4, 5.14, 2.13]} color={ink} />
      <Block at={[0, 1.48, .47]} size={[4.26, 2.96, .24]} color="#353466" />
      <Block at={[0, 3.22, .71]} size={[4.86, .10, .17]} color="#2EE6C5" glow />
      <Sign at={[0, 3.88, .6]} width={4.51} label="OPEN 24×7" color="#2EE6C5" />
      {[-1, 1].map((side) => <Lantern key={side} at={[side * 2.79, 2.1, .72]} color="#2EE6C5" />)}
    </group>
  </>;
}

const grades = timeline.map((act) => ({
  ...act, skyColor: new Color(act.sky), fogColor: new Color(act.fog), sunColor: new Color(act.sun), ambientColor: new Color(act.ambient),
  cameraPosition: new Vector3(...act.position), cameraTarget: new Vector3(...act.target),
}));

function Journey({ onReady, simple }: { onReady: () => void; simple: boolean }) {
  const { camera, scene, pointer, performance } = useThree();
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const marks = useRef<number[]>([]);
  const sun = useRef<DirectionalLight>(null);
  const ambient = useRef<HemisphereLight>(null);
  const lantern = useRef<PointLight>(null);
  const blend = useRef(0);
  const push = useRef({ amount: 0 });
  const pulse = useRef(0);
  const bloom = useRef<BloomImpl>(null);
  const position = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  const sky = useMemo(() => new Color(grades[0].sky), []);
  const fog = useMemo(() => new Fog(grades[0].fog, 18, 63), []);

  useEffect(() => {
    scene.background = sky;
    scene.fog = fog;
    camera.position.copy(grades[0].cameraPosition);
    function measure() {
      marks.current = timeline.map(({ id }, i) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top + scrollY : i * innerHeight;
      });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    const lenis = matchMedia("(prefers-reduced-motion: reduce)").matches ? undefined : new Lenis({ autoRaf: true, duration: .95, anchors: false });
    const shopPush = () => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(push.current, { amount: 1.3 }, { amount: 0, duration: .85, ease: "power2.out", overwrite: true });
      }
    };
    addEventListener("dukaan-shop", shopPush);
    lenis?.on("scroll", performance.regress);
    return () => {
      observer.disconnect();
      lenis?.destroy();
      removeEventListener("dukaan-shop", shopPush);
      gsap.killTweensOf(push.current);
    };
  }, [camera, fog, performance, scene, sky]);

  useFrame(({ clock }, delta) => {
    const scroll = scrollY + innerHeight * .1;
    const stops = marks.current;
    let index = 0;
    while (index < stops.length - 2 && scroll >= stops[index + 1]) index++;
    const amount = stops.length > 1 ? MathUtils.clamp((scroll - stops[index]) / Math.max(stops[index + 1] - stops[index], 1), 0, 1) : 0;
    blend.current = reduced ? index + amount : MathUtils.damp(blend.current, index + amount, 6.8, delta);
    const start = Math.min(Math.floor(blend.current), grades.length - 2);
    const fraction = MathUtils.smoothstep(blend.current - start, 0, 1);
    const from = grades[start];
    const to = grades[start + 1];
    position.lerpVectors(from.cameraPosition, to.cameraPosition, fraction);
    target.lerpVectors(from.cameraTarget, to.cameraTarget, fraction);
    position.z -= push.current.amount;
    camera.position.copy(position);
    camera.lookAt(target);
    sky.copy(from.skyColor).lerp(to.skyColor, fraction);
    fog.color.copy(from.fogColor).lerp(to.fogColor, fraction);
    sun.current?.color.copy(from.sunColor).lerp(to.sunColor, fraction);
    ambient.current?.color.copy(from.ambientColor).lerp(to.ambientColor, fraction);
    if (lantern.current) lantern.current.position.set(pointer.x * 4, 2.4 + pointer.y, position.z - 4);
    if (bloom.current) bloom.current.intensity = MathUtils.lerp(from.bloom, to.bloom, fraction);
    if (!pulse.current && clock.elapsedTime > .05) {
      pulse.current = 1;
      onReady();
    }
  });

  return <>
    <hemisphereLight ref={ambient} args={["#A7A7E0", "#54345E", 2.1]} />
    <directionalLight ref={sun} position={[-7, 12, 4]} intensity={3.3} />
    <pointLight ref={lantern} color="#FFB627" intensity={13} distance={8} decay={2} />
    <StreetGeometry simple={simple} />
    {!simple && <EffectComposer multisampling={0}>
      <Bloom ref={bloom} intensity={.3} luminanceThreshold={1.15} luminanceSmoothing={.1} mipmapBlur />
      <Noise opacity={.10} premultiply />
      <Vignette darkness={.35} offset={.24} />
      <ChromaticAberration offset={aberrationOffset} radialModulation modulationOffset={.5} />
    </EffectComposer>}
  </>;
}

type BloomImpl = import("postprocessing").BloomEffect;

class StreetErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function StreetCanvas({ onPrepared, onReady, onUnavailable }: { onPrepared: () => void; onReady: () => void; onUnavailable: () => void }) {
  const [simple] = useState(() => matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  return <div className="street-world" aria-hidden="true">
    <StreetErrorBoundary onError={onUnavailable}>
      <Canvas dpr={[1, 1.5]} camera={{ fov: simple ? 63 : 53, near: .1, far: 120, position: [0, 3.1, 15] }}
        gl={{ antialias: !simple, powerPreference: "low-power", toneMapping: ACESFilmicToneMapping }}
        fallback={<span />}
        onCreated={({ gl }) => {
          onPrepared();
          gl.domElement.addEventListener("webglcontextlost", onUnavailable, { once: true });
        }}>
        <AdaptiveDpr />
        <Journey onReady={onReady} simple={simple} />
      </Canvas>
    </StreetErrorBoundary>
  </div>;
}
