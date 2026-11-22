import { Plinth, Slab, Frame, brass, ivory, slate } from "./Materials";
export default function Personal() {
  return <group><Plinth/>{[-1.5,-.8,-.1,.6,1.3].map((x,i)=><group key={x} position={[x,0,-.52]} rotation-y={-.32}><Frame width={.61} height={1.8+.25*Math.cos(i)} depth={.18} color={brass}/></group>)}
    <Slab size={[2.6,.16,.85]} position={[0,.75,.34]} color={ivory}/>
    {[-.95,.95].map(x=><Slab key={x} size={[.18,.74,.6]} position={[x,.37,.34]} color={slate}/>)}
    {[-1,1].map(s=><Slab key={s} size={[.43,.05,.53]} position={[s*.2,.88,.35]} rotation={[0,0,s*.13]} color={ivory}/>)}
  </group>;
}
