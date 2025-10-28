
import { create } from 'zustand';
import { Device } from '../app/utils/readData.ts';
import { ChangeEvent } from 'react';



export interface DeviceMap {
    [key: string]: Partial<Device>;
}

interface DeviceState {
    deviceMap: DeviceMap;
    setDeviceMap(DeviceMap: DeviceMap): void;
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    parseData: (fileContent: string) => void;
    setGroupAndNumber_NAC_ONLY_FOR_NOW(device: Partial<Device>): Device;

}

const useDeviceStore = create<DeviceState>((set, get) => ({
    deviceMap: {},

    setDeviceMap: (newDeviceMap) => set({ deviceMap: newDeviceMap }), // Shouldn't add devices after being set


    handleFileUpload(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type == "text/plain") {
            const reader = new FileReader();

            reader.onloadend = () => {
                const FILE_CONTENT = reader.result as string;
                get().parseData(FILE_CONTENT);
            }
            reader.readAsText(selectedFile)
        }
    },
    parseData(stringData) {
        const data = stringData.split(/\r?\n/).filter(line => line.trim() !== '');
        const newDeviceMap: DeviceMap = {};

        //!HEADER EDIT LATER AS EDIT THE INTERFACE
        const header: string[] = [
            "HANDLE",
            "CEIL",
            "DESCRIPTION",
            "NACTAG",
            "WP",
            'CD',
            'X_COORDINATE',
            'Y_COORDINATE',
            "PID",
            "SPEAKTAG",
            "WATT",

        ]
        const HEADERS_TO_FORMAT_TO_NUMBER: string[] = [
            'CD',
            'X_COORDINATE',
            'Y_COORDINATE',
        ];

        const DYNAMIC_HEADER_OBJ: { [key: number]: string } = {}


        data.forEach((line, index) => {
            const PARSED_LINE = line.trim().split(/\r?\t/)


            //!GET HEADER INDEX
            if (index == 0) {
                const LENGTH = PARSED_LINE.length

                for (let i = 0; i < LENGTH; i++) {

                    const HEADER_VALUE = PARSED_LINE[i]
                    const INCLUDED_HEADERS: boolean = header.includes(HEADER_VALUE)

                    if (INCLUDED_HEADERS) {
                        DYNAMIC_HEADER_OBJ[i] = HEADER_VALUE
                    }
                }
            } else {

                let tempDevice: Partial<Device & any> = {};
                const DYNAMIC_HEADER_INDEX_ARRAY = Object.keys(DYNAMIC_HEADER_OBJ)

                PARSED_LINE.forEach((value, index) => {
                    const INDEX = String(index)
                    const INCLUDED: boolean = DYNAMIC_HEADER_INDEX_ARRAY.includes(INDEX)

                    if (INCLUDED) {
                        const HEADER_KEY = DYNAMIC_HEADER_OBJ[index];
                        const TO_NUMBER = HEADERS_TO_FORMAT_TO_NUMBER.includes(HEADER_KEY)

                        if (TO_NUMBER) {
                            tempDevice[HEADER_KEY] = Number(value);
                        } else {
                            tempDevice[HEADER_KEY] = value;
                        }
                    }
                })


                // const updateDevice: Device = get().setGroupAndNumber_NAC_ONLY_FOR_NOW(tempDevice);
                // newDeviceMap[updateDevice.HANDLE] = updateDevice;
                
                
                newDeviceMap[tempDevice.HANDLE] = tempDevice;


            }
        })


        // update the store with the parsed devices
        set({ deviceMap: newDeviceMap });

        return;
    },
    compare(xValue: number, yValue: number): void {


    },

    setViewport(): void {


    },

    setGroupAndNumber_NAC_ONLY_FOR_NOW(device: Partial<Device>): Device {
        const regex = /:([A-Z])(\d+)-(\d+)/;
        const NACTAG = device.NACTAG ?? "";
        const SPEAKTAG = device.SPEAKTAG ?? "";

        const NAC_REGEX = NACTAG.match(regex);

        if (NACTAG === "<>" && SPEAKTAG === "<>") return device as Device;

        if (NAC_REGEX) {
            (device as any).NacGroup = Number(NAC_REGEX[2])
            (device as any).NacNumber = Number(NAC_REGEX[3])
        }
        //!ADD SPEAKER AND IDNET LATER
        return device as Device;
    }

}))


export default useDeviceStore;