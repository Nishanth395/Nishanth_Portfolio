import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type SceneKind = "work" | "studio" | "notes" | "contact";

const palettes = {
  work: ["#9c88ff", "#4ee8cd", "#82adff", "#ff9dc3", "#ffb574"],
  studio: ["#bba2ff", "#74d3ff", "#fca3a8", "#f6bc80"],
  notes: ["#9486ff", "#79bedf", "#ffd0aa", "#f197bf"],
  contact: ["#a58aff", "#70dfdc", "#ffb293"],
};

function buildModel(kind: SceneKind) {
  const model = new THREE.Group();
  const palette = palettes[kind];
  const metal = new THREE.MeshStandardMaterial({ color: "#3e416c", metalness: 0.78, roughness: 0.29 });
  const light = new THREE.MeshStandardMaterial({ color: "#c5baff", emissive: "#8263ff", emissiveIntensity: 0.52 });
  function glass(color: string) {
    return new THREE.MeshPhysicalMaterial({
      color, metalness: 0.33, roughness: 0.19, transparent: true, opacity: 0.72, clearcoat: 0.9,
    });
  }
  function panel(width: number, height: number, depth: number, material: THREE.Material, radius = 0.09) {
    return new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 3, radius), material);
  }
  function halo(radius: number, thickness: number, material: THREE.Material, arc = Math.PI * 2) {
    return new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 12, 72, arc), material);
  }
  let update: (active: number) => void;

  if (kind === "work") {
    const cardColors = palette.map(glass);
    const cards = palette.map((_, index) => {
      const card = new THREE.Group();
      card.add(panel(2.12, 1.42, 0.16, metal));
      const face = panel(1.98, 1.29, 0.06, cardColors[index]);
      face.position.z = 0.1;
      card.add(face);
      const header = panel(1.68, 0.05, 0.025, light, 0.012);
      header.position.set(0, 0.45, 0.15);
      card.add(header);
      for (let i = 0; i < 3; i++) {
        const tile = panel(0.37, 0.28 + ((i + index) % 3) * 0.13, 0.06, i === index % 3 ? light : metal, 0.025);
        tile.position.set((i - 1) * 0.48, -0.12, 0.15);
        card.add(tile);
      }
      model.add(card);
      return card;
    });
    const base = halo(1.71, 0.024, metal);
    base.rotation.x = Math.PI / 2;
    base.position.y = -0.89;
    model.add(base);
    update = (active) => {
      const center = active % cards.length;
      cards.forEach((card, index) => {
        const slot = (index - center + cards.length + 2) % cards.length - 2;
        card.position.set(slot * 0.74, Math.abs(slot) * -0.19, 0.63 - Math.abs(slot) * 0.63);
        card.rotation.y = slot * -0.27;
        card.scale.setScalar(slot === 0 ? 1 : 0.77);
      });
    };
  } else if (kind === "studio") {
    const spine = new THREE.Mesh(new THREE.OctahedronGeometry(0.66), light);
    model.add(spine);
    const fins = palette.map((color, index) => {
      const arm = new THREE.Group();
      const bearing = index * Math.PI / 2 + Math.PI / 4;
      arm.rotation.y = bearing;
      const connector = panel(0.1, 0.1, 1.46, metal, 0.04);
      connector.position.z = 0.58;
      arm.add(connector);
      const fin = panel(0.85, 1.37, 0.18, glass(color), 0.12);
      fin.position.z = 1.29;
      fin.rotation.z = 0.24;
      arm.add(fin);
      const strip = panel(0.48, 0.068, 0.035, light, 0.015);
      strip.position.set(0, 0.32, 1.4);
      arm.add(strip);
      model.add(arm);
      return { arm, bearing };
    });
    const guide = halo(1.52, 0.022, metal);
    guide.rotation.x = Math.PI / 2;
    guide.position.y = -0.64;
    model.add(guide);
    update = (active) => {
      fins.forEach(({ arm, bearing }, index) => {
        const distance = index === active ? 0.48 : 0;
        arm.position.set(Math.sin(bearing) * distance, index === active ? 0.28 : 0, Math.cos(bearing) * distance);
      });
      spine.rotation.y = active * Math.PI / 4;
    };
  } else if (kind === "notes") {
    const covers = palette.map(glass);
    const volumes = Array.from({ length: 5 }, (_, index) => {
      const book = new THREE.Group();
      book.add(panel(0.65, 1.57, 0.25, metal, 0.06));
      const cover = panel(0.67, 1.6, 0.07, covers[index % covers.length], 0.03);
      cover.position.z = 0.14;
      book.add(cover);
      for (let line = 0; line < 3; line++) {
        const rule = panel(0.38 - line * 0.056, 0.033, 0.03, light, 0.009);
        rule.position.set(-0.035, 0.31 - line * 0.12, 0.183);
        book.add(rule);
      }
      book.position.x = (index - 2) * 0.62;
      book.rotation.y = (index - 2) * -0.16;
      model.add(book);
      return book;
    });
    const shelf = panel(3.37, 0.12, 0.88, metal, 0.055);
    shelf.position.y = -0.83;
    model.add(shelf);
    update = (active) => {
      volumes.forEach((book, index) => {
        const selected = index === active % volumes.length;
        book.position.set((index - 2) * 0.62, selected ? 0.24 : 0, selected ? 0.47 : -0.06);
        book.rotation.z = selected ? -0.12 : 0;
      });
    };
  } else {
    const signalColors = palette.map(glass);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 1), signalColors[0]);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.41), light);
    model.add(core, inner);
    const rings = [0.96, 1.29, 1.58].map((radius, index) => {
      const ring = halo(radius, 0.045, metal, Math.PI * 1.76);
      ring.rotation.set(0.34 + index * 0.49, -index * 0.45, index * 0.91);
      model.add(ring);
      return ring;
    });
    update = (active) => {
      const selected = active % signalColors.length;
      core.material = signalColors[selected];
      core.rotation.set(0.25 + selected * 0.31, selected * 0.6, -0.19);
      rings.forEach((ring, index) => {
        ring.material = index === selected ? light : metal;
        ring.position.z = index === selected ? 0.24 : 0;
      });
    };
  }

  return { model, update };
}

// One offscreen WebGL context serves the visible section previews.
let renderer: THREE.WebGLRenderer | undefined;
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
const scenes = new Map<SceneKind, { scene: THREE.Scene; model: ReturnType<typeof buildModel> }>();
let environment: THREE.WebGLRenderTarget | undefined;

function getRenderer() {
  if (renderer) return renderer;
  const next = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  next.toneMapping = THREE.ACESFilmicToneMapping;
  const pmrem = new THREE.PMREMGenerator(next);
  const room = new RoomEnvironment();
  environment = pmrem.fromScene(room, 0.055);
  room.dispose();
  pmrem.dispose();
  renderer = next;
  return next;
}

export function drawSpatialScene(
  context: CanvasRenderingContext2D,
  kind: SceneKind,
  active: number,
  pitch: number,
  yaw: number,
) {
  const engine = getRenderer();
  if (engine.getContext().isContextLost()) throw new Error("The spatial renderer lost its WebGL context.");
  const { width, height } = context.canvas;
  if (!width || !height) return;
  let layer = scenes.get(kind);
  if (!layer) {
    const scene = new THREE.Scene();
    const model = buildModel(kind);
    scene.environment = environment?.texture ?? null;
    const key = new THREE.DirectionalLight("#e1d8ff", 3.1);
    key.position.set(3, 5, 4);
    const rim = new THREE.DirectionalLight("#976aff", 3.9);
    rim.position.set(-5, 1, -4);
    scene.add(model.model, key, rim);
    layer = { scene, model };
    scenes.set(kind, layer);
  }
  layer.model.update(active);
  layer.model.model.rotation.set(0.16 + pitch, -0.34 + yaw, -0.055);
  camera.aspect = width / height;
  camera.position.z = Math.max(6.9, 6.1 / camera.aspect);
  camera.updateProjectionMatrix();
  if (engine.domElement.width !== width || engine.domElement.height !== height) engine.setSize(width, height, false);
  engine.render(layer.scene, camera);
  context.clearRect(0, 0, width, height);
  context.drawImage(engine.domElement, 0, 0);
}
