import { useLoader } from "@react-three/fiber";
import { SRGBColorSpace, TextureLoader } from "three";
import { Frame, Plinth, Slab, brass, ivory, slate } from "./Materials";

export default function Commercial() {
  const preview = useLoader(TextureLoader, "/images/sri_balaji_live.png");
  preview.colorSpace = SRGBColorSpace;
  const height = 2.42 * preview.image.height / preview.image.width;
  return <group><Plinth/><group position={[.34,0,-.34]}><Frame width={2.7} height={2.04} depth={.2} color={brass}/>
    <Slab size={[2.55,1.82,.12]} position={[0,1.04,0]} color={slate}/>
    <mesh position={[0,1.04,.07]}><planeGeometry args={[2.42,height]}/><meshBasicMaterial map={preview} toneMapped={false}/></mesh>
  </group>{[ivory,brass,slate].map((color,i)=><Slab key={color} position={[-1.42+i*.22,.68-i*.08,.36+i*.18]} rotation={[0,-.24,.12]} size={[.39,1.4-i*.16,.1]} color={color}/>)}</group>;
}
