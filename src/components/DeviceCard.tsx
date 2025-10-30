import React from 'react'
import { Device } from '@/store/deviceStore.ts'

interface DeviceCardProps {
  device: Device;
}


export default function DeviceCard({ device }: DeviceCardProps) {



  return (<>
    <div>{device.HANDLE}</div>
    <div>{device.NACTAG}</div>
    <div>{device.SPEAKTAG}</div>
    <div>{device.CD}</div>
    <div>{device.WATT}</div>
  </>
  )
}