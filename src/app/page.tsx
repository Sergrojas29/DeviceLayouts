"use client"

import { ChangeEvent, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import SpeakerStrobe from '../components/Devices/SpeakerStrobe.tsx';
import Strobe from '../components/Devices/Strobe.tsx';

import DeviceData, { Device } from './utils/readData.ts';
import Example from './notPublic/Example.tsx';
import SimpleTable from './notPublic/SimpleTable.tsx'





export default function HomePage() {
  const [devices, setDeivces] = useState<Device[]>([]);
  const [rows, SetRows] = useState<any[][]>([])

  //! for temprender
  const [viewport, setViewport] = useState({ height: 100, width: 100, xMin: 0, yMin: 0 })

  function tempSetRows() {
    devices.forEach((device, i) => {
      SetRows(prev => [...prev, [device.X_COORDINATE, device.Y_COORDINATE, device.PID, device.CD, device.WATT]]);
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
        setViewport(prev => ({ ...prev, height: proccessor.viewport.height, width: proccessor.viewport.width, xMin: proccessor.viewport.xMin, yMin: proccessor.viewport.yMin, }))
        console.log(proccessor)
      }
      reader.readAsText(selectedFile)
    }
  };


  // Sample data for a product inventory table
  const tableHeaders = ['X_COORDINATE', 'Y_COORDINATE', 'PID', 'CD', 'WATT'];




  return (<>

    <input onChange={manipluteData} type="file" title="Select a file" />


    <SimpleTable headers={tableHeaders} rows={rows} />





  </>
  );
}

