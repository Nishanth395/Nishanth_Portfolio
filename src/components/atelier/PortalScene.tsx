"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  ACESFilmicToneMapping, BufferAttribute, BufferGeometry, Color, ExtrudeGeometry, MathUtils, Path,
  PMREMGenerator, Shape, SRGBColorSpace, type Texture, TextureLoader, Vector3,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const axis = 1.12;
const baseline = -.02;

function archPath(path: Shape | Path, width: number, height: number, outer: boolean) {
  if (outer) {
    path.moveTo(width, baseline);
    path.lineTo(width, height);
    path.absarc(0, height, width, 0, Math.PI, false);
    path.lineTo(-width, baseline);
  } else {
    path.moveTo(-width, baseline + .005);
    path.lineTo(-width, height);
    path.absarc(0, height, width, Math.PI, 0, true);
    path.lineTo(width, baseline + .005);
  }
  path.closePath();
}

function archGeometry(width: number, thickness: number, depth: number, bevel: boolean) {
  const arch = new Shape();
  archPath(arch, width, axis, true);
  const opening = new Path();
  archPath(opening, width - thickness, axis, false);
  arch.holes.push(opening);
  const geometry = new ExtrudeGeometry(arch, {
    depth, steps: 1, curveSegments: 30,
    bevelEnabled: bevel, bevelSegments: 2, bevelSize: .035, bevelThickness: .03,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

const levels = [
  { width: 1.39, thickness: .22, depth: .21, z: 1.07, metal: "#aeb9cc", roughness: .24 },
  { width: 1.29, thickness: .135, depth: .18, z: .62, metal: "#7488a3", roughness: .33 },
  { width: 1.19, thickness: .128, depth: .18, z: .17, metal: "#bcc9d7", roughness: .19 },
  { width: 1.09, thickness: .118, depth: .16, z: -.28, metal: "#435571", roughness: .38 },
  { width: .99, thickness: .108, depth: .15, z: -.72, metal: "#96acd0", roughness: .26 },
];

function PortalRib({ level, index }: { level: (typeof levels)[number]; index: number }) {
  const { width, thickness, depth, z, metal, roughness } = level;
  const rib = useMemo(() => archGeometry(width, thickness, depth, true), [width, thickness, depth]);
  const light = useMemo(() => archGeometry(width - thickness * .35, .016, .016, false), [width, thickness]);
  useEffect(() => () => { rib.dispose(); light.dispose(); }, [rib, light]);

  return (
    <group position={[0, 0, z]}>
      <mesh geometry={rib}>
        <meshPhysicalMaterial color={metal} metalness={.88} roughness={roughness} clearcoat={.48} />
      </mesh>
      <mesh geometry={light} position-z={depth * .5 + .025}>
        <meshStandardMaterial color="#bfcfff" emissive="#648cff" emissiveIntensity={index === 0 ? .9 : .36} roughness={.36} />
      </mesh>
    </group>
  );
}

function Portrait({ texture }: { texture: Texture<HTMLImageElement> }) {
  const ratio = texture.image.width / texture.image.height;
  const height = Math.min(1.83, 1.35 / ratio);

  return <mesh position={[0, 1.04, -.86]}>
    <planeGeometry args={[height * ratio, height]} />
    <meshBasicMaterial map={texture} toneMapped={false} />
  </mesh>;
}

function Dust() {
  const geometry = useMemo(() => {
    const vertices = new Float32Array(108);
    for (let i = 0; i < vertices.length / 3; i++) {
      vertices[i * 3] = Math.sin(i * 14.77) * 3.08;
      vertices[i * 3 + 1] = .15 + (Math.cos(i * 18.12) + 1) * 1.66;
      vertices[i * 3 + 2] = Math.sin(i * 8.53) * 2.1;
    }
    return new BufferGeometry().setAttribute("position", new BufferAttribute(vertices, 3));
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return <points geometry={geometry}>
    <pointsMaterial color="#a8bce8" size={.014} transparent opacity={.29} depthWrite={false} />
  </points>;
}

function Architecture({ portraitTexture, onReady }: { portraitTexture?: Texture<HTMLImageElement>; onReady: () => void }) {
  const { camera, invalidate, scene, gl } = useThree();
  const desired = useRef({ x: 0, y: 0, scroll: 0, entrance: 1 });
  const current = useRef({ x: 0, y: 0, scroll: 0, entrance: 1 });
  const ready = useRef(false);
  const visible = useRef(true);
  const target = useMemo(() => new Vector3(0, 1.16, .12), []);

  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const environment = generator.fromScene(room, .06);
    scene.environment = environment.texture;
    scene.environmentIntensity = .69;
    invalidate();
    room.dispose();
    generator.dispose();

    const element = gl.domElement;
    function onPointer(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      desired.current.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      desired.current.y = (event.clientY - rect.top) / rect.height * 2 - 1;
      invalidate();
    }
    function recenter() {
      Object.assign(desired.current, { x: 0, y: 0 });
      invalidate();
    }
    function onScroll() {
      if (!visible.current) return;
      const rect = element.getBoundingClientRect();
      desired.current.scroll = MathUtils.clamp((-rect.top + 60) / Math.max(rect.height, 1), 0, 1);
      invalidate();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) onScroll();
    });
    observer.observe(element);
    element.addEventListener("pointermove", onPointer);
    element.addEventListener("pointerleave", recenter);
    addEventListener("scroll", onScroll, { passive: true });
    desired.current.entrance = 0;
    return () => {
      observer.disconnect();
      element.removeEventListener("pointermove", onPointer);
      element.removeEventListener("pointerleave", recenter);
      removeEventListener("scroll", onScroll);
      scene.environment = null;
      environment.dispose();
    };
  }, [gl, invalidate, scene]);

  useFrame((_, elapsed) => {
    const view = current.current;
    const dt = Math.min(elapsed, .05);
    const goal = desired.current;
    view.x = MathUtils.damp(view.x, goal.x, 4, dt);
    view.y = MathUtils.damp(view.y, goal.y, 4, dt);
    view.scroll = MathUtils.damp(view.scroll, goal.scroll, 4, dt);
    view.entrance = MathUtils.damp(view.entrance, goal.entrance, 2.8, dt);
    camera.position.set(1.92 + view.x * .32 - view.scroll * .25, 2.12 - view.y * .20 + view.scroll * .11, 7.81 + view.entrance * .44 - view.scroll * .29);
    camera.lookAt(target);
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    const changed = Math.abs(view.x - goal.x) + Math.abs(view.y - goal.y) + Math.abs(view.scroll - goal.scroll) + view.entrance;
    if (visible.current && changed > .004) invalidate();
  });

  return <>
    <hemisphereLight color="#dce5fa" groundColor="#141d31" intensity={.52} />
    <directionalLight position={[-3, 4, 5]} color="#f7eee1" intensity={2.65} />
    <directionalLight position={[4, 2, -3]} color="#648cff" intensity={3.2} />
    <pointLight position={[0, .3, -.22]} color="#648cff" intensity={8} distance={5} />
    <group position-y={-.09}>
      <mesh position={[0, -.105, .12]}>
        <boxGeometry args={[3.66, .21, 3.67]} />
        <meshPhysicalMaterial color="#263658" metalness={.83} roughness={.26} clearcoat={.65} />
      </mesh>
      <mesh position={[0, -.204, .12]}>
        <boxGeometry args={[4.01, .095, 4]} />
        <meshStandardMaterial color="#445b86" metalness={.85} roughness={.37} />
      </mesh>
      {levels.map((level, index) => <PortalRib key={level.z} level={level} index={index} />)}
      {[.38, -.35, -.93].map((z, index) => (
        <mesh key={z} position={[0, .033 + index * .031, z]}>
          <boxGeometry args={[1.9 - index * .27, .066 + index * .062, .54]} />
          <meshStandardMaterial color="#7088b4" metalness={.86} roughness={.25} emissive="#385fc0" emissiveIntensity={.12} />
        </mesh>
      ))}
      {[-1.5, 1.5].map((x, index) => (
        <mesh key={x} position={[x, 1.18, -.51]} rotation-y={index === 0 ? .12 : -.12}>
          <boxGeometry args={[.044, 2.33, .83]} />
          <meshPhysicalMaterial color="#6c98df" transparent opacity={.38} metalness={.35} roughness={.17} clearcoat={1} />
        </mesh>
      ))}
      {portraitTexture && <Portrait texture={portraitTexture} />}
    </group>
    <gridHelper args={[12, 36, new Color("#4c6a9e"), new Color("#30415e")]} position-y={-.35} material-transparent material-opacity={.56} />
    <Dust />
  </>;
}

class PortalBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function PortraitInstallation({ source, onReady }: { source: string; onReady: () => void }) {
  const texture = useLoader(TextureLoader, source);
  texture.colorSpace = SRGBColorSpace;
  return <Architecture portraitTexture={texture} onReady={onReady} />;
}

function ContextGuard({ onUnavailable }: { onUnavailable: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onUnavailable);
    return () => canvas.removeEventListener("webglcontextlost", onUnavailable);
  }, [canvas, onUnavailable]);
  return null;
}

export default function PortalScene({ portraitSrc, onReady, onUnavailable }: { portraitSrc?: string; onReady: () => void; onUnavailable: () => void }) {
  return (
    <div className="atelier-portal-canvas" aria-hidden="true">
      <PortalBoundary onUnavailable={onUnavailable}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="demand"
          camera={{ fov: 33, position: [1.92, 2.12, 8.25], near: .1, far: 60 }}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power", toneMapping: ACESFilmicToneMapping }}
        >
          <ContextGuard onUnavailable={onUnavailable} />
          <Suspense fallback={null}>
            {portraitSrc
              ? <PortraitInstallation source={portraitSrc} onReady={onReady} />
              : <Architecture onReady={onReady} />}
          </Suspense>
        </Canvas>
      </PortalBoundary>
    </div>
  );
}
