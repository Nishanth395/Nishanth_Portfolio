import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { ModuleId } from "./module-catalog";

interface Part {
  object: THREE.Object3D;
  origin: THREE.Vector3;
  offset: THREE.Vector3;
}

function makeAssembly(id: ModuleId) {
  const root = new THREE.Group();
  const parts: Part[] = [];
  const accent = { relay: "#8c9aff", lattice: "#49d8ca", lens: "#ffa763" }[id];
  const alloy = new THREE.MeshPhysicalMaterial({ color: "#373a56", metalness: 0.84, roughness: 0.24 });
  const colored = new THREE.MeshPhysicalMaterial({
    color: accent, metalness: 0.67, roughness: 0.22, clearcoat: 0.8,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: accent, metalness: 0.24, roughness: 0.17, transparent: true, opacity: 0.5,
    side: THREE.DoubleSide, depthWrite: false, clearcoat: 1,
  });
  const signal = new THREE.MeshStandardMaterial({
    color: accent, emissive: accent, emissiveIntensity: 1.2, metalness: 0.26, roughness: 0.26,
  });
  const materials = [alloy, colored, glass, signal];

  function mount(object: THREE.Object3D, offset: THREE.Vector3) {
    parts.push({ object, origin: object.position.clone(), offset });
    root.add(object);
  }

  function box(x: number, y: number, z: number, material: THREE.Material, radius = 0.04) {
    return new THREE.Mesh(new RoundedBoxGeometry(x, y, z, 3, radius), material);
  }

  if (id === "relay") {
    for (let layer = -2; layer <= 2; layer++) {
      const tray = new THREE.Group();
      const width = 2.8 - 0.24 * Math.abs(layer);
      tray.add(box(width, 0.13, width, Math.abs(layer) === 2 ? glass : alloy, 0.055));
      const line = box(width - 0.36, 0.025, 0.035, signal, 0.01);
      line.position.set(0, 0.085, width / 2 - 0.18);
      tray.add(line);
      for (const x of [-1, 1]) {
        for (const z of [-1, 1]) {
          const pin = box(0.13, 0.095, 0.13, colored, 0.025);
          pin.position.set(x * (width / 2 - 0.18), 0.09, z * (width / 2 - 0.18));
          tray.add(pin);
        }
      }
      if (layer === 1 || layer === -1) {
        for (let i = -3; i <= 3; i++) {
          const trace = box(0.032, 0.025, 1.27 - Math.abs(i) * 0.18, colored, 0.009);
          trace.position.set(i * 0.23, 0.078, 0);
          tray.add(trace);
        }
      }
      if (layer === 0) tray.add(box(0.91, 0.31, 0.91, signal, 0.11));
      tray.position.y = layer * 0.41;
      tray.rotation.y = layer * 0.075;
      mount(tray, new THREE.Vector3(0, layer * 0.32, 0));
    }
    root.rotation.set(0.53, -0.57, -0.2);
  }

  if (id === "lattice") {
    const phi = (1 + Math.sqrt(5)) / 2;
    const points: THREE.Vector3[] = [];
    for (const a of [-1, 1]) for (const b of [-1, 1]) {
      points.push(new THREE.Vector3(0, a, b * phi), new THREE.Vector3(a, b * phi, 0), new THREE.Vector3(b * phi, 0, a));
    }
    points.forEach((point) => point.multiplyScalar(0.77));
    const origin = new THREE.Vector3();
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.54, 0), colored);
    mount(core, origin);
    const vertical = new THREE.Vector3(0, 1, 0);
    for (const point of points) {
      const node = new THREE.Group();
      node.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.27, 0), signal));
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.065, 0.93, 8), alloy);
      strut.position.copy(point).normalize().multiplyScalar(-0.53);
      strut.quaternion.setFromUnitVectors(vertical, point.clone().normalize());
      node.add(strut);
      node.position.copy(point);
      mount(node, point.clone().multiplyScalar(0.56));
    }
    root.rotation.set(-0.2, 0.33, 0.12);
  }

  if (id === "lens") {
    for (let ring = 0; ring < 3; ring++) {
      const gimbal = new THREE.Group();
      const radius = 0.82 + ring * 0.34;
      for (let segment = 0; segment < 4; segment++) {
        const arc = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.075 + ring * 0.018, 16, 35, 1.31), segment % 2 ? alloy : colored);
        arc.rotation.z = segment * Math.PI / 2 + 0.12;
        gimbal.add(arc);
        const bolt = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 8), signal);
        bolt.position.set(radius * Math.cos(segment * Math.PI / 2), radius * Math.sin(segment * Math.PI / 2), 0);
        gimbal.add(bolt);
      }
      gimbal.rotation.set(0.31 + ring * 0.64, ring * 0.66, 0.12);
      mount(gimbal, new THREE.Vector3((ring - 1) * 0.7, (1 - ring) * 0.42, (ring - 1) * -0.35));
    }
    const prism = new THREE.Mesh(new THREE.OctahedronGeometry(0.64), glass);
    prism.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.34), signal));
    prism.rotation.z = Math.PI / 4;
    mount(prism, new THREE.Vector3(0, 0, 0.8));
    root.rotation.set(0.16, -0.28, -0.2);
  }

  return {
    root,
    separate(amount: number) {
      for (const { object, origin, offset } of parts) object.position.copy(origin).addScaledVector(offset, amount);
    },
    dispose() {
      root.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      materials.forEach((material) => material.dispose());
    },
  };
}

export function createSculpture(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.055);
  room.dispose();
  pmrem.dispose();
  scene.environment = environment.texture;
  const light = new THREE.DirectionalLight("#e0e7ff", 3.4);
  light.position.set(-3, 4, 4);
  const rim = new THREE.DirectionalLight("#827cff", 3.7);
  rim.position.set(3, -2, -3);
  scene.add(light, rim);
  const orbit = new THREE.Group();
  scene.add(orbit);
  let assembly: ReturnType<typeof makeAssembly> | undefined;
  let currentId: ModuleId | undefined;

  return {
    resize(width: number, height: number) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = Math.max(7.9, 7.7 / camera.aspect);
      camera.updateProjectionMatrix();
    },
    render(id: ModuleId, pitch: number, yaw: number, separation: number) {
      if (id !== currentId) {
        assembly?.dispose();
        orbit.clear();
        assembly = makeAssembly(id);
        orbit.add(assembly.root);
        currentId = id;
      }
      assembly?.separate(separation);
      orbit.rotation.set(pitch, yaw, 0);
      renderer.render(scene, camera);
    },
    dispose() {
      assembly?.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
