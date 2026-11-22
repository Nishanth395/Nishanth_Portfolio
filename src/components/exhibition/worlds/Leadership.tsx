import { Slab, Plinth, brass, slate, steel, ivory } from "./Materials";
import type { ExhibitProps } from "../rooms";

export default function Leadership({selected,onSelect}:ExhibitProps) {
  return <group><Plinth/>{[-1,1].map((side,i)=><group key={side} position={[side*.95,0,0]} onClick={e=>{e.stopPropagation();onSelect(i);}}>
    {Array.from({length:11},(_,j)=>{const a=j*Math.PI/10; return <Slab key={j} size={[.12,1.38+.48*Math.sin(a),.15]} position={[Math.cos(a)*.9,.69+.24*Math.sin(a),-Math.sin(a)*.85]} rotation={[0,a,0]} color={selected===i?brass:steel}/>;})}
    {i===0?<group>{[0,1,2].map(j=><Slab key={j} position={[0,.08+j*.13,.5-j*.25]} size={[1.4,.16+j*.26,.23]} color={ivory}/>)}</group>:<group><Slab position={[0,.43,.23]} size={[.06,.86,.06]} color={brass}/><mesh position={[0,1.05,.23]}><capsuleGeometry args={[.2,.38,4,12]}/><meshStandardMaterial color={slate} roughness={.26} metalness={.75}/></mesh></group>}
  </group>)}</group>;
}
