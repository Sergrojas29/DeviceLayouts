"use client"

import { ChangeEvent, useEffect, useState } from 'react';

import SpeakerStrobe from '../components/Devices/SpeakerStrobe.tsx';
import Strobe from '../components/Devices/Strobe.tsx';

import DeviceData, { Device } from './utils/readData.ts';
import Example from './notPublic/Example.tsx';
import SimpleTable from './notPublic/SimpleTable.tsx'





export default function HomePage() {
  const [devices, setDeivces] = useState<Device[]>([]);
  const [rows, SetRows] = useState<any[][]>([])

  //! for temprender
  const [canvas, setCanvas] = useState({ height: 100, width: 100 })

  function tempSetRows() {
    devices.forEach((device, i) => {
      SetRows(prev => [...prev, [device.xValue, device.yValue, device.deviceType, device.candela, device.watts , device.offSetX , device.offSetY]]);
    });

  }


  function manipluteData(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type == "text/plain") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const proccessor = new DeviceData;
        proccessor.parseData(reader.result as string);
        setDeivces(proccessor.devices)
        setCanvas(prev => ({ ...prev, height: proccessor.canvasSize.height, width: proccessor.canvasSize.width }))
        console.log(proccessor)
      }
      reader.readAsText(selectedFile)
    }
  };


  // Sample data for a product inventory table
  const tableHeaders = ['xValue', 'yValue', 'deviceType', 'candela', 'watts', "OffSet X", "OffSet Y"];

  useEffect(() => tempSetRows(), [devices])


  return (<>

    <input onChange={manipluteData} type="file" title="Select a file" />


    <SimpleTable headers={tableHeaders} rows={rows} />
    <SimpleTable headers={['Canvas Height', "Canvas Width"]} rows={[[canvas.height, canvas.width]]} />

    {devices.length != 0 && (
      <svg width={canvas.width} height={canvas.height} xmlns="http://www.w3.org/2000/svg">

        {devices.map((e, i)=>{
          return (<circle onClick={()=>console.log(e.xValue, e.yValue)} key={i} cx={e.offSetX} cy={e.offSetY} r="5" fill="red" />)
        })}
    
      </svg>
    )}




  </>
  );
}

