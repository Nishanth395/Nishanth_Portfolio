export const rooms = [
  { id: "home", name: "Identity", title: "A world of ideas", image: "/images/exhibition/home.webp", angle: .15 },
  { id: "work", name: "Selected work", title: "Project gallery", image: "/images/exhibition/work.webp", angle: .35 },
  { id: "ventures", name: "Commercial", title: "The materials room", image: "/images/exhibition/ventures.webp", angle: -.28 },
  { id: "leadership", name: "Leadership", title: "The listening room", image: "/images/exhibition/leadership.webp", angle: .22 },
  { id: "about", name: "Perspective", title: "The reading room", image: "/images/exhibition/about.webp", angle: -.3 },
  { id: "journal", name: "Journal", title: "The archive", image: "/images/exhibition/journal.webp", angle: .18 },
  { id: "contact", name: "Contact", title: "The open door", image: "/images/exhibition/contact.webp", angle: -.24 },
] as const;

export type RoomId = typeof rooms[number]["id"];
export type ExhibitProps = { selected: number; onSelect: (index: number) => void };
