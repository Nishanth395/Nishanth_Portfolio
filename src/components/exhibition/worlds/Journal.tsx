import { Frame, Plinth, Slab, blue, brass, ivory, slate, steel } from "./Materials";
import type { ExhibitProps } from "../rooms";
export default function Journal({selected,onSelect}:ExhibitProps) {
  return <group><Plinth/><Frame width={3.5} height={2.16} depth={.65} color={brass}/>
    <Slab size={[3.5,.1,1]} position={[0,.34,0]} color={slate}/>
    {[1.32,1.07,1.52,1.18,1.43].map((h,i)=><group key={i} position={[(i-2)*.6,.4,i===selected?.42:0]} rotation-z={(i-2)*.055} onClick={e=>{e.stopPropagation();onSelect(i);}}>
      <Slab size={[.43,h,.68]} position={[0,h/2,0]} color={i===selected?blue:steel}/><Slab size={[.32,.04,.6]} position={[0,h+.015,0]} color={ivory}/>
      <Slab size={[.24,.07,.018]} position={[0,h*.63,.35]} color={brass}/>
    </group>)}</group>;
}
