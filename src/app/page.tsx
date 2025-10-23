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

  useEffect(() => tempSetRows(), [devices])


  return (<>

    <input onChange={manipluteData} type="file" title="Select a file" />


    <SimpleTable headers={tableHeaders} rows={rows} />
    <SimpleTable headers={['viewport Height', "viewport Width"]} rows={[[viewport.height, viewport.width]]} />

    <TransformWrapper initialScale={5} initialPositionX={14391} initialPositionY={13382}>
      <TransformComponent >
        {devices.length != 0 && (
          <svg width={25300 + 50} height={14391 + 50} xmlns="http://www.w3.org/2000/svg">

            {devices.map((e, i) => {
              return (<circle onClick={() => console.log(e.X_COORDINATE, e.Y_COORDINATE)} key={i} cx={e.X_COORDINATE} cy={e.Y_COORDINATE} r="5" fill="red" />)
            })}
            <line x1="0" y1="0" x2={viewport.xMin} y2={viewport.yMin} stroke='red' strokeWidth={3} />
            <rect width={viewport.width} height={viewport.height} x={viewport.xMin} y={viewport.yMin} stroke="blue" fill='none' />


          </svg>
        )}
      </TransformComponent>
    </TransformWrapper>





  </>
  );
}

