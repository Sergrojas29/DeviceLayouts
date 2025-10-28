"use client"

import Canvas from "@/components/Canvas.tsx";
import useDeviceStore from '../store/deviceStore.ts'
import { ReactEventHandler } from "react";

export default function HomePage() {

  const devices = useDeviceStore((state) => state.deviceMap);
  const setDevices = useDeviceStore((state) => state.setDevices);
  const handleFileUpload = useDeviceStore((state) => state.handleFileUpload);


  const styleSection: {
    main: React.CSSProperties,
    canvas: React.CSSProperties,
    table: React.CSSProperties
  } = {
    main: {
      display: 'flex',
      flexDirection: "row",
      width: '100%',
      height: '100%',
    },
    canvas: {
      width: '70%',
      height: '100%', 
      border: 'solid red 1pt'
    },
    table: {
      height: '100%',
      border: 'solid blue 1pt',
      width: '30%'
    }
  }


  return (
    <main style={styleSection.main}>
      <section style={styleSection.canvas}>
        
        <input onChange={handleFileUpload} type="file" name="textFile" id="input" placeholder='.:txt files only' />
        
        
        
        
        
        
        
        
        
        
        
        <button onClick={()=>{

          console.log(devices)
          

        }}>A Button</button>
        {/* <Canvas /> */}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      </section>
      <section style={styleSection.table}>

      </section>

    </main>
  );
}

