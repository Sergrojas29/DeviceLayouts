"use client"

import Canvas from "@/components/Canvas.tsx";
import useDeviceStore from '../store/deviceStore.ts'
import TempTable from "@/components/TempTable.tsx";
import { useState } from 'react';


export default function HomePage() {

  const devices = useDeviceStore((state) => state.deviceMap);
  const viewport = useDeviceStore((state) => state.viewport);
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
      width: '100%',
      height: '100%',
      border: 'solid red 1pt'
    },
    table: {
      height: '100%',
      border: 'solid blue 1pt',
      width: '30%'
    }
  }


  const [hide, setHide] = useState<boolean>(false)

  const hideStyle: React.CSSProperties = {
    width: 0,
    display: 'none'
  }

  return (
    <main style={styleSection.main}>
      <section style={styleSection.canvas}>


        <button onClick={()=>{setHide(!hide)}}>HIDE</button>
        <Canvas />
      </section>
      <section style={hide ? hideStyle : styleSection.table}>
        <TempTable />
        <button onClick={()=>{setHide(!hide)}}>HIDE</button>

      </section>

    </main>
  );
}

