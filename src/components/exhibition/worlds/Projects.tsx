import { Frame, Plinth, Slab, blue, brass, ivory, slate, steel } from "./Materials";
import type { ExhibitProps } from "../rooms";

function Model({ index }: { index: number }) {
  switch(index) {
    case 0: return <group rotation-y={-.28}>{[0,1,2].map(i=><Slab key={i} size={[1.4,.08,.95]} position={[0,.35+i*.43,0]} color={[steel,ivory,blue][i]}/>)}<Slab size={[.13,1.4,.15]} position={[-.52,.7,-.28]}/></group>;
    case 1: return <group>{[.65,1.2,.8,1.6,.55,.95].map((h,i)=><Slab key={i} size={[.31,h,.35]} position={[(i%3-1)*.44,h/2,(Math.floor(i/3)-.5)*.53]} color={i===3?blue:ivory}/>)}</group>;
    case 2: return <group><Frame width={1.45} height={1.28} depth={.38}/><Slab size={[1.66,.14,.84]} position={[0,1.26,.15]} rotation={[.16,0,0]} color={brass}/><Slab size={[1.32,.42,.4]} position={[0,.25,.14]} color={ivory}/></group>;
    case 3: return <mesh position-y={.94} rotation={[.35,.6,.15]}><icosahedronGeometry args={[.94,0]}/><meshStandardMaterial color={steel} wireframe/></mesh>;
    default: return <group>{[0,1,2].map(i=><group key={i} position={[i*.27-.27,0,-i*.35+.35]}><Frame width={1.35-i*.15} height={1.5-i*.2} depth={.12} color={i===0?brass:ivory}/></group>)}</group>;
  }
}
export default function Projects({ selected, onSelect }: ExhibitProps) {
  return <group><Plinth/>
    <group position={[0,.15,-.22]} scale={1.38}><Model index={selected}/></group>
    {[0,1,2,3,4].map(i=><group key={i} position={[(i-2)*.71,0,1]} onClick={event=>{event.stopPropagation();onSelect(i);}}>
      <Slab size={[.66,.15,.51]} color={i===selected?blue:slate}/>
      <group scale={.26} position-y={.08}><Model index={i}/></group>
    </group>)}
  </group>;
}
