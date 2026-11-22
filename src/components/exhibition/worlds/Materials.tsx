import type { ThreeElements } from "@react-three/fiber";

type Piece = Pick<ThreeElements["mesh"], "position" | "rotation" | "onClick"> & {
  size: [number, number, number]; color?: string; metal?: number
};
export const ivory = "#ddd8cb", steel = "#929bad", slate = "#36445c", blue = "#648cff", brass = "#ad8f68";

export function Slab({ size, color = steel, metal = .72, ...props }: Piece) {
  return <mesh {...props}><boxGeometry args={size} /><meshStandardMaterial color={color} metalness={metal} roughness={.33} /></mesh>;
}

export function Plinth() {
  return <group>
    <Slab position={[0,-.17,0]} size={[4.25,.12,3.05]} color={slate}/>
    <Slab position={[0,-.06,0]} size={[4,.1,2.85]} color="#788298"/>
  </group>;
}

export function Frame({ width, height, depth, color = steel }: { width: number; height: number; depth: number; color?: string }) {
  return <group>
    {[-1,1].map(sign => <Slab key={sign} size={[.095,height,depth]} position={[sign*width/2,height/2,0]} color={color}/>)}
    <Slab size={[width+.1,.095,depth]} position={[0,height,0]} color={color}/>
  </group>;
}
