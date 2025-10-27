"use client"

import { ChangeEvent, useEffect, useState } from 'react';

import useDeviceStore from '../store/deviceStore.ts'
import SpeakerStrobe from './Devices/SpeakerStrobe.tsx';
import Strobe from './Devices/Strobe.tsx';

import DeviceData, { Device } from '../app/utils/readData.ts';
import SimpleTable from './notPublic/SimpleTable.tsx'


export default function Canvas() {

    const devices = useDeviceStore((state) => state.deviceMap);  
    const setDevices = useDeviceStore((state)=> state.setDevices);
    const handleFileUpload = useDeviceStore((state)=> state.handleFileUpload);
    const [viewport, setViewport] = useState({ height: 100, width: 100, xMin: 0, yMin: 0 })



    function manipluteData(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];

        if (selectedFile && selectedFile.type == "text/plain") {
            const reader = new FileReader();
            reader.onloadend = () => {
                const proccessor = new DeviceData;
                proccessor.parseData(reader.result as string);
                setDevices(proccessor.devices)
                setViewport(prev => ({ ...prev, height: proccessor.viewport.height, width: proccessor.viewport.width, xMin: proccessor.viewport.xMin, yMin: proccessor.viewport.yMin, }))
                console.log(proccessor)
            }
            reader.readAsText(selectedFile)
        }
    };




    return (<>
        {devices.length == 0 &&
            <input onChange={handleFileUpload} type="file" name="textFile" id="input" placeholder='.txt files only' />
        }

        {devices.length != 0 && (
            <svg
                className='svgContainer'
                width="100%"
                height="100%"
                viewBox={`${viewport.xMin} ${viewport.yMin} ${viewport.width} ${viewport.height}`}
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >

                {devices.map((e, i) => {
                    const PID = e.PID
                    const X_COORDINATE = e.X_COORDINATE
                    const Y_COORDINATE = e.Y_COORDINATE
                    const NACTAG = e.NACTAG
                    const SPEAKTAG = e.SPEAKTAG
                    if (PID == '49SV-APPLC' || PID == '49SV-APPLW') {
                        return (<SpeakerStrobe key={e.HANDLE} handle={e.HANDLE} color='green' X={X_COORDINATE} Y={Y_COORDINATE} scale={1} />)
                    } else if (PID == '4906-9101') {
                        return (<Strobe key={i} color='green' X={X_COORDINATE} Y={Y_COORDINATE} scale={1} />)
                    } else {
                        return (<circle onClick={() => console.log(e.X_COORDINATE, e.Y_COORDINATE)} key={i} cx={e.X_COORDINATE} cy={e.Y_COORDINATE} r="10" fill="red" />)
                    }
                })}
            </svg>
        )}

    </>
    );
}
