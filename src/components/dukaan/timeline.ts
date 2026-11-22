import type { Vector3Tuple } from "three";

interface Act {
  id: string;
  position: Vector3Tuple;
  target: Vector3Tuple;
  sky: string;
  fog: string;
  sun: string;
  ambient: string;
  bloom: number;
}

export const timeline: Act[] = [
  { id: "home", position: [0, 3.1, 15], target: [0, 2.2, -9], sky: "#FFD9B0", fog: "#F9B27E", sun: "#FFE2AF", ambient: "#9093DA", bloom: .25 },
  { id: "work", position: [0, 2.8, 2], target: [0, 2, -22], sky: "#F0A76F", fog: "#D98678", sun: "#FFD293", ambient: "#797AC2", bloom: .35 },
  { id: "shop-syncmates", position: [0, 2.8, -3], target: [-3.5, 1.8, -14], sky: "#E7A173", fog: "#D08075", sun: "#FFC887", ambient: "#7E80C9", bloom: .45 },
  { id: "shop-fixmybharat", position: [0, 2.6, -12], target: [3.5, 1.8, -23], sky: "#D38A76", fog: "#AA6980", sun: "#F8A773", ambient: "#7A79C5", bloom: .55 },
  { id: "shop-dentalai-os", position: [0, 2.7, -21], target: [-3.5, 1.8, -32], sky: "#AB6981", fog: "#815B86", sun: "#F9976B", ambient: "#777BC8", bloom: .65 },
  { id: "shop-sri-balaji-interiors", position: [0, 2.7, -30], target: [3.5, 1.8, -41], sky: "#775482", fog: "#5E4F80", sun: "#EF926F", ambient: "#789BF0", bloom: .8 },
  { id: "about", position: [0, 2.5, -43], target: [-2, 1.7, -53], sky: "#38447A", fog: "#383662", sun: "#F69E77", ambient: "#8098FE", bloom: .95 },
  { id: "journal", position: [0, 2.4, -51], target: [0, 1.8, -70], sky: "#242A5D", fog: "#292852", sun: "#F3946B", ambient: "#7287E9", bloom: 1.13 },
  { id: "contact", position: [0, 2.4, -61], target: [0, 1.8, -74], sky: "#141736", fog: "#181C42", sun: "#E78565", ambient: "#596ED0", bloom: 1.4 },
];
