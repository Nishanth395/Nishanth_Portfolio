import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function createRibbon() {
  const path = new class extends THREE.Curve<THREE.Vector3> {
    constructor() {
      super();
    }

    getPoint(t: number) {
      const angle = t * Math.PI * 2;
      const radius = 1.26 + 0.49 * Math.cos(3 * angle);
      return new THREE.Vector3(radius * Math.cos(2 * angle), radius * Math.sin(2 * angle), 0.64 * Math.sin(3 * angle));
    }
  }();
  const length = 384;
  const sides = 96;
  const frames = path.computeFrenetFrames(length, true);
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const chartreuse = new THREE.Color("#baff35");
  const moss = new THREE.Color("#4b6313");

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const center = path.getPointAt(t);
    const twist = t * Math.PI * 6;
    for (let j = 0; j < sides; j++) {
      const angle = j / sides * Math.PI * 2;
      const groove = Math.cos(angle * 12);
      const width = 0.32 + 0.045 * Math.cos(t * Math.PI * 6);
      const x = Math.cos(angle) * width * (1 + 0.045 * groove);
      const y = Math.sin(angle) * 0.195 * (1 + 0.09 * groove);
      const point = center.clone()
        .addScaledVector(frames.normals[i], x * Math.cos(twist) - y * Math.sin(twist))
        .addScaledVector(frames.binormals[i], x * Math.sin(twist) + y * Math.cos(twist));
      positions.push(point.x, point.y, point.z);
      const tint = moss.clone().lerp(chartreuse, 0.61 + 0.27 * groove + 0.1 * Math.cos(angle - twist));
      colors.push(tint.r, tint.g, tint.b);

      const a = i * sides + j;
      const b = i * sides + (j + 1) % sides;
      const c = ((i + 1) % length) * sides + j;
      const d = ((i + 1) % length) * sides + (j + 1) % sides;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createSculpture(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.z = 8.1;
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.05);
  room.dispose();
  pmrem.dispose();
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.25;

  const light = new THREE.DirectionalLight("#f5ffd1", 3.0);
  light.position.set(-3, 4, 4);
  scene.add(light);
  const rim = new THREE.DirectionalLight("#b7ff16", 4.0);
  rim.position.set(3, -2, -3);
  scene.add(rim);

  const geometry = createRibbon();
  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.28,
    metalness: 0.64,
    clearcoat: 0.65,
    clearcoatRoughness: 0.22,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return {
    resize(width: number, height: number) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = Math.max(8.1, 7.65 / camera.aspect);
      camera.updateProjectionMatrix();
    },
    render(pitch: number, yaw: number) {
      mesh.rotation.set(0.30 + pitch, -0.24 + yaw, -0.24);
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
