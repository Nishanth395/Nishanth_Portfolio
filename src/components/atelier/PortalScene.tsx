"use client";

import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { ExtrudeGeometry, Path, Shape, SRGBColorSpace, type Texture, TextureLoader } from "three";

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

export default function IdentityInstallation() {
  const texture = useLoader(TextureLoader, "/images/atelier/nishanth.webp");
  texture.colorSpace = SRGBColorSpace;
  return (<group position-y={-.09}>
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
      <Portrait texture={texture} />
    </group>);
}
