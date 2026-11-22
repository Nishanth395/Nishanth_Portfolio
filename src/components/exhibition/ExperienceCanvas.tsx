"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { ACESFilmicToneMapping, MathUtils, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { rooms, type ExhibitProps, type RoomId } from "./rooms";

const models = {
  home: lazy(() => import("../atelier/PortalScene")),
  work: lazy(() => import("./worlds/Projects")), ventures: lazy(() => import("./worlds/Commercial")),
  leadership: lazy(() => import("./worlds/Leadership")), about: lazy(() => import("./worlds/Personal")),
  journal: lazy(() => import("./worlds/Journal")), contact: lazy(() => import("./worlds/Contact")),
};
type SceneProps = ExhibitProps & { room: RoomId; onReady: () => void; onFailure: () => void };

function Gallery({ room, selected, onSelect, onReady, onFailure }: SceneProps) {
  const { gl, scene, invalidate, camera, size } = useThree();
  const pointer = useRef(0);
  const scroll = useRef(0);
  const moving = useRef(false);
  const angle = rooms.find(r=>r.id===room)!.angle;
  const Model = models[room];
  useEffect(() => {
    const studio = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const reflection = generator.fromScene(studio,.06);
    scene.environment = reflection.texture;
    scene.environmentIntensity = .8;
    studio.dispose(); generator.dispose();
    const element = gl.domElement;
    const move = (e:PointerEvent) => {
      if(e.pointerType==="touch") return;
      const rect=element.getBoundingClientRect();
      pointer.current = MathUtils.clamp((e.clientX-rect.left)/rect.width-.5,-.5,.5);
      invalidate();
    };
    const reset = () => { pointer.current=0; invalidate(); };
    element.addEventListener("pointermove",move);
    element.addEventListener("pointerleave",reset);
    element.addEventListener("webglcontextlost",onFailure);
    return () => {
      element.removeEventListener("pointermove",move); element.removeEventListener("pointerleave",reset);
      element.removeEventListener("webglcontextlost",onFailure);
      scene.environment=null; reflection.dispose();
    };
  },[gl,invalidate,scene,onFailure]);
  useEffect(()=>{
    const section=document.getElementById(room);
    const update=()=>{
      if(!section || !moving.current || document.hidden) return;
      const rect=section.getBoundingClientRect();
      scroll.current=MathUtils.clamp(-rect.top/Math.max(rect.height,1),0,1);
      invalidate();
    };
    const visibility=new IntersectionObserver(([entry])=>{moving.current=entry.isIntersecting; if(entry.isIntersecting)update();});
    visibility.observe(gl.domElement);
    addEventListener("scroll",update,{passive:true});
    return ()=>{visibility.disconnect();removeEventListener("scroll",update);};
  },[room,gl,invalidate]);
  useFrame((_,dt)=>{
    const a=angle+pointer.current*.12+scroll.current*.09;
    const distance=Math.max(5.9,5.85*size.height/size.width)+.12*Math.cos(selected);
    const x=Math.sin(a)*distance, z=Math.cos(a)*distance, y=room==="home"?1.86:2.55;
    const t=1-Math.exp(-Math.min(dt,.08)*6);
    camera.position.x=MathUtils.lerp(camera.position.x,x,t);
    camera.position.y=MathUtils.lerp(camera.position.y,y,t);
    camera.position.z=MathUtils.lerp(camera.position.z,z,t);
    camera.lookAt(0,1.04,0);
    if(moving.current&&!document.hidden&&Math.abs(camera.position.x-x)+Math.abs(camera.position.y-y)+Math.abs(camera.position.z-z)>.004) invalidate();
  });
  return <>
    <hemisphereLight args={["#e2e9fb","#202a42",1.05]}/>
    <directionalLight position={[-3,5,4]} intensity={3.1} color="#fff0db"/>
    <directionalLight position={[3,2,-3]} intensity={3.3} color="#86a7ff"/>
    <Suspense fallback={null}><Model selected={selected} onSelect={onSelect}/><Ready key={room} report={onReady}/></Suspense>
    <gridHelper args={[13,44,"#526783","#354359"]} position-y={-.26} material-transparent material-opacity={.48}/>
  </>;
}
function Ready({report}:{report:()=>void}) {
  const invalidate=useThree(s=>s.invalidate);
  useLayoutEffect(()=>{invalidate();report();},[report,invalidate]); return null;
}
class Boundary extends Component<{ children:ReactNode; fail:()=>void },{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.fail();}
  render(){return this.state.failed?null:this.props.children;}
}
export default function ExperienceCanvas(props:SceneProps) {
  return <Boundary fail={props.onFailure}><Canvas dpr={window.innerWidth<800?1:[1,1.5]} frameloop="demand" camera={{fov:36,position:[1.3,2.3,7],near:.1,far:50}}
    gl={{alpha:true,antialias:true,powerPreference:"low-power",toneMapping:ACESFilmicToneMapping}}>
    <Gallery {...props}/></Canvas></Boundary>;
}
