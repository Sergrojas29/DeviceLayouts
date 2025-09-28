"use client"

import { ChangeEvent, useState } from 'react';

import SpeakerStrobe from '../components/Devices/SpeakerStrobe.tsx';
import Strobe from '../components/Devices/Strobe.tsx';

import DeviceData, { Device } from './utils/readData.ts';




export default function HomePage() {
  const [devices, setDeivces] = useState<Device[]>([]);

  //! for temprender
  const [canvas, setCanvas] = useState({ height: 100, width: 100 })


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



  return (<>
    <input onChange={manipluteData} type="file" title="Select a file" />


    <div style={{ height: `${canvas.height}px`, width: `${canvas.width}px`, border: 'red 1pt solid', position: 'absolute' }}>

      <div className='whore'>

        {devices && devices.map((e, i) => {
          if (e.deviceType === 'SpeakerStrobe') {
            return <SpeakerStrobe key={i} color='green' x={e.xValue} y={e.yValue} />
          } else if (e.deviceType === 'Strobe') {
            return <Strobe key={i} color='green' x={e.xValue} y={e.yValue} />
          }
        })}

      </div>

    </div>

  </>);
}