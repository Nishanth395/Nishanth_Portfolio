"use client";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { rooms, type RoomId } from "./rooms";
import { brandDossier as data } from "@/content/dossier";

const Canvas = dynamic(()=>import("./ExperienceCanvas"),{ssr:false});
const ExhibitionContext=createContext({
  active:"home" as RoomId, ready:false, live:false, available:false, selected:0,
  toggle:()=>{}, select:(_index:number,_room?:RoomId)=>{}, setActive:(_room:RoomId)=>{},
});
export const useExhibition=()=>useContext(ExhibitionContext);

export function Exhibition({children}:{children:ReactNode}) {
  const [active,setActive]=useState<RoomId>("home");
  const [indices,setIndices]=useState<Partial<Record<RoomId,number>>>({});
  const [available,setAvailable]=useState(false), [live,setLive]=useState(false);
  const [painted,setPainted]=useState<RoomId|null>(null);
  const [host,setHost]=useState<HTMLDivElement|null>(null);
  useEffect(()=>{
    const node=document.createElement("div");
    node.className="exhibition-canvas"; node.setAttribute("aria-hidden","true"); setHost(node);
    const pref=matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{let still=false;try{still=sessionStorage.getItem("exhibition-mode")==="still";}catch{}
      setAvailable(!pref.matches);setLive(!pref.matches&&!still);setPainted(null);};
    sync();pref.addEventListener("change",sync);
    return ()=>{pref.removeEventListener("change",sync);node.remove();};
  },[]);
  useLayoutEffect(()=>{
    if(host) document.getElementById("mount-"+active)?.appendChild(host);
  },[host,active]);
  useEffect(()=>{
    let frame=0;
    function update(){
      frame=0;
      const target=Math.min(innerHeight*.4,340);
      let chosen:RoomId="home";
      for(const room of rooms){
        if((document.getElementById(room.id)?.getBoundingClientRect().top??Infinity)<=target)chosen=room.id;
      }
      setActive(chosen);
    }
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);
    return ()=>{cancelAnimationFrame(frame);removeEventListener("scroll",schedule);removeEventListener("resize",schedule);};
  },[]);
  const select=useCallback((i:number,room:RoomId=active)=>setIndices(v=>({...v,[room]:i})),[active]);
  const onReady=useCallback(()=>setPainted(active),[active]);
  const onFailure=useCallback(()=>{setPainted(null);setAvailable(false);setLive(false);},[]);
  const toggle=()=>{setPainted(null);setLive(!live);try{sessionStorage.setItem("exhibition-mode",live?"still":"live");}catch{}};
  const selected=indices[active]??0;
  return <ExhibitionContext.Provider value={{active,live,available,ready:live&&painted===active,selected,select,toggle,setActive}}>
    {children}
    {host&&live&&createPortal(<Canvas room={active} selected={selected} onSelect={select} onReady={onReady} onFailure={onFailure}/>,host)}
  </ExhibitionContext.Provider>;
}

export function Station({room,onOpen}:{room:RoomId;onOpen?:(index:number)=>void}){
  const {active,available,live,ready,toggle,selected,select,setActive}=useExhibition();
  const index=rooms.findIndex(r=>r.id===room), config=rooms[index];
  const current=active===room;
  const items=room==="work"?data.projects.map(p=>p.name):room==="journal"?data.journalEntries.map(n=>n.title):room==="leadership"?data.leadership.map(l=>l.title):[];
  const pick=current?selected:0;

  const activate=(i:number)=>{setActive(room);select(i,room);};
  function openItem(){
    if(onOpen){onOpen(pick);return;}
    const target=document.getElementById(room+"-item-"+pick);
    if(target){target.scrollIntoView({block:"center"});target.focus({preventScroll:true});}
  }
  return <figure className="world-station" aria-label={config.title} data-room={room} data-ready={current&&ready}>
    <div className="world-image">
      <img className={room==="home"?"world-still world-portrait":"world-still"}
        src={pick ? config.image.replace(".webp", "-"+pick+".webp") : config.image}
        alt={room==="home"?"Nishanth Adepu in the metallic portrait portal":config.title}
        loading={room==="home"?"eager":"lazy"} decoding="async" />
      <div className="world-mount" id={"mount-"+room}/>
      <div className="world-label"><span>A world of ideas</span><span>{String(index+1).padStart(2,"0")} / 07</span></div>
    </div>
    <figcaption><div><small>{config.name}</small><strong>{items[pick]??config.title}</strong></div>
      {current&&available&&<button type="button" onClick={toggle} aria-pressed={live}>{live?"Still view":"3D view"}</button>}
    </figcaption>
    {items.length>0&&<div className="exhibit-controls">
      <div role="group" aria-label={"Select "+config.name}>{items.map((label,i)=><button key={label} aria-label={label} title={label} aria-pressed={pick===i} onClick={()=>activate(i)}>{String(i+1).padStart(2,"0")}</button>)}</div>
      <button onClick={openItem}>{room==="work"?"Case study":room==="journal"?"Read note":"View initiative"} ↗</button>
    </div>}
  </figure>;
}
