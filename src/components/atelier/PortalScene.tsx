"use client";

import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { ExtrudeGeometry, Path, Shape, SRGBColorSpace, TextureLoader } from "three";

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

export default function IdentityInstallation() {
  const portrait = useLoader(TextureLoader, "/images/atelier/nishanth.webp");
  portrait.colorSpace = SRGBColorSpace;
  const height = 3.26;
  const width = height * portrait.image.width / portrait.image.height;

  return <group position={[0, 1.12, .12]} rotation={[0, -.10, -.032]}>
    <group position={[-.35, -1.52, -.48]} scale={[1.24, 1.18, 1]}>
      {levels.slice(0, 2).map((level, i) =>
        <PortalRib key={level.z} level={{...level, thickness: .055, z: -i * .26}} index={i} />
      )}
    </group>
    <mesh position-z={-.026}>
      <boxGeometry args={[width + .085, height + .085, .048]} />
      <meshStandardMaterial color="#e2dbcd" roughness={.83} />
    </mesh>
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={portrait} toneMapped={false} />
    </mesh>
  </group>;
}
