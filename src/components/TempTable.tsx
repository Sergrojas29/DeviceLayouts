
import { useEffect, useState } from 'react';
import useDeviceStore from '../store/deviceStore.ts'
import DeviceCard from '../components/DeviceCard.tsx';



export default function TempTable() {
    const devices = useDeviceStore((state) => state.deviceMap);
    const tempDevice = useDeviceStore((state)=> state.tempDeviceMap)




    return (
        <div >
            {tempDevice.size !== 0 && Array.from(tempDevice, ([key, value]) => (
                <DeviceCard key={key} device={value} />
            ))}
            
            <div>TempTable</div>
            <button onClick={() => { console.log('here'); }}>TEST PRINT</button>

        </div>
    )
}