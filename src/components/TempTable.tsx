
import { useState } from 'react';
import useDeviceStore from '../store/deviceStore.ts'


export default function TempTable() {
    const devices = useDeviceStore((state) => state.deviceMap);
    const tempDevice = useDeviceStore((state)=> state.tempDeviceMap)


    const [hide, setHide] = useState<boolean>(true)
    

    const [temp, setTemp] = useState<string[]>([])

    function handleAddClick(e: React.MouseEvent<HTMLDivElement>) {
        const HANDLE = e.currentTarget.getAttribute('data-handle');
        if (HANDLE) {
            setTemp(prev => [...prev, HANDLE]);
        }


    }



    return (
        <div >
            {tempDevice.size !== 0 && Array.from(tempDevice, ([key, value]) => (
                <div onClick={handleAddClick} key={key} data-handle={value.HANDLE}> {value.HANDLE}</div>
            ))}
            
            <div>TempTable</div>
            <button onClick={() => { console.log(tempDevice) }}>TEST PRINT</button>

        </div>
    )
}