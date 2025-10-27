"use client"

import { ChangeEvent, useEffect, useState } from 'react';

import DeviceData, { Device } from './utils/readData.ts';
import SimpleTable from './notPublic/SimpleTable.tsx'

import useDeviceStore from '../store/deviceStore.ts';
import { stat } from 'fs';
import { match } from 'assert';




export default function TableView() {

  const devices = useDeviceStore((state) => state.devices);
  const setDevices = useDeviceStore((state) => (state.setDevices))

  const [rows, SetRows] = useState<any[][]>([])


  function tempSetRows() {
    devices.forEach((device, i) => {
      SetRows(prev => [...prev, [device.NACTAG, device.NacGroup, device.NacNumber, device.SPEAKTAG, device.PID, device.CD, device.WATT]]);
    });
  }


  function manipluteData(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type == "text/plain") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const proccessor = new DeviceData;
        proccessor.parseData(reader.result as string);
        setDevices(proccessor.devices)
        console.log(proccessor)
      }
      reader.readAsText(selectedFile)
    }
  };


  // Sample data for a product inventory table
  const tableHeaders = ['NACTAG','NACTAG_GROUP', 'NAC_NUMBER', 'SPEAKTAG', 'PID', 'CD', 'WATT'];

  useEffect(() => {
    tempSetRows()
  }, [devices])



  return (<>

    <input onChange={manipluteData} type="file" title="Select a file" />
    <SimpleTable headers={tableHeaders} rows={rows} />





  </>
  );
}

