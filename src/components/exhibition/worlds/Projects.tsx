import { Shape } from "three";
import { Frame, Plinth, Slab, blue, brass, ivory, slate, steel } from "./Materials";
import type { ExhibitProps } from "../rooms";

// The enamel silhouette is traced in profile, including the saddle and two roots.
const molar = new Shape();
molar.moveTo(0, 1.28);
molar.bezierCurveTo(-.32, 1.53, -.76, 1.48, -.68, 1.04);
molar.bezierCurveTo(-.61, .78, -.49, .12, -.34, .06);
molar.bezierCurveTo(-.20, -.01, -.23, .68, -.02, .72);
molar.bezierCurveTo(.22, .78, .20, .09, .36, .1);
molar.bezierCurveTo(.54, .13, .59, .78, .68, 1.05);
molar.bezierCurveTo(.78, 1.52, .40, 1.57, 0, 1.28);

function DentalCast() {
  return <mesh rotation-y={-.32} position={[0,.1,-.22]}>
    <extrudeGeometry args={[molar, {depth:.36, bevelThickness:.095, bevelSize:.085, bevelSegments:4, curveSegments:16}]} />
    <meshPhysicalMaterial color="#e7ded0" roughness={.27} clearcoat={.45} />
  </mesh>;
}

function CivicMap() {
  return <group rotation-y={-.22}>
    <Slab size={[2,.08,1.4]} color={ivory}/>
    {[.32,.65,.44,.72,.28,.38].map((h,i)=>
      <Slab key={i} size={[.35,h,.38]} position={[(i%3-1)*.59,h/2,(Math.floor(i/3)-.5)*.67]} color={i===1?brass:steel}/>)}
    <group position={[.61,1.1,.32]}>
      <mesh><torusGeometry args={[.19,.075,10,28]}/><meshStandardMaterial color="#bd573e"/></mesh>
      <mesh position-y={-.26} rotation-z={Math.PI}><coneGeometry args={[.11,.27,3]}/><meshStandardMaterial color="#bd573e"/></mesh>
    </group>
  </group>;
}

function Shopfront() {
  return <group>
    <Frame width={1.6} height={1.45} depth={.28}/>
    {Array.from({length:9},(_,i)=><Slab key={i} size={[.19,.075,.83]} position={[(i-4)*.19,1.28,.28]} rotation={[.25,0,0]} color={i%2?ivory:"#9d5644"}/>)}
    <Slab size={[1.55,.56,.48]} position={[0,.29,.2]} color={brass}/>
    <Slab size={[1.68,.08,.63]} position={[0,.59,.2]} color={ivory}/>
  </group>;
}

function StudyInstrument() {
  return <group position-y={.86}>
    {[0,1,2].map(i=><mesh key={i} rotation={[i*.73,i*.89,.32]}>
      <torusGeometry args={[.81-i*.095,.025,8,48]}/><meshStandardMaterial color={i===1?brass:steel} metalness={.85} roughness={.3}/>
    </mesh>)}
    <mesh><octahedronGeometry args={[.37]}/><meshStandardMaterial color={blue} flatShading/></mesh>
  </group>;
}

function MaterialStudy() {
  return <group rotation-y={-.30}>
    {Array.from({length:8},(_,i)=><Slab key={i} size={[.10,1.55,.42]} position={[(i-3.5)*.19,.78,-.27]} color={i%2?brass:"#91775b"}/>)}
    <Slab size={[1.62,.12,.68]} position={[0,.70,.27]} color={ivory}/>
    <Slab size={[.15,.68,.63]} position={[-.5,.34,.27]} color={ivory}/>
  </group>;
}

const pieces = [DentalCast, CivicMap, Shopfront, StudyInstrument, MaterialStudy];

export default function Projects({selected,onSelect}:ExhibitProps) {
  const Piece = pieces[selected] ?? DentalCast;
  return <group><Plinth/>
    <group position={[0,.1,-.22]} scale={1.52}><Piece/></group>
    {pieces.map((Miniature,i)=><group key={i} position={[(i-2)*.71,0,1]} onClick={event=>{event.stopPropagation();onSelect(i);}}>
      <Slab size={[.66,.11,.51]} color={i===selected?brass:slate}/>
      <group scale={.26} position-y={.07}><Miniature/></group>
    </group>)}
  </group>;
}
