export const modules = [
  {
    id: "relay",
    title: "Relay",
    discipline: "Applied AI",
    description: "A stack of translucent compute plates suspended around a signal core. Separate the layers to see how information moves through the stack.",
    color: "#a5afff",
  },
  {
    id: "lattice",
    title: "Lattice",
    discipline: "Software architecture",
    description: "Twelve connected nodes form a distributed system around a shared center. Isolate the nodes by separating the structure.",
    color: "#5be7db",
  },
  {
    id: "lens",
    title: "Lens",
    discipline: "Product design",
    description: "Three nested gimbals frame a faceted optical core. Separate the rings to reveal the layers around a single point of focus.",
    color: "#ffb37c",
  },
] as const;

export type ModuleId = (typeof modules)[number]["id"];
