import { Frame, Slab, Plinth, brass, steel, ivory } from "./Materials";
export default function Contact() {
  return <group><Plinth/>{[0,1,2,3].map(i=><group key={i} position={[0,0,.65-i*.58]}><Frame width={2.4-i*.2} height={2.42-i*.18} depth={.15} color={i%2?brass:steel}/></group>)}
    <group position={[-.9,0,-.7]} rotation-y={-.86}><Slab size={[1.46,1.87,.09]} position={[.73,.94,0]} color={ivory}/><Slab size={[.05,.33,.09]} position={[1.2,.92,.09]} color={brass}/></group>
    {[0,1,2].map(i=><Slab key={i} size={[1.55-i*.14,.06+i*.05,.36]} position={[0,.03+i*.025,.85-i*.41]} color={steel}/>)}
  </group>;
}
