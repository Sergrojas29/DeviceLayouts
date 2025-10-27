
import { create } from 'zustand';
import { Device } from '../app/utils/readData.ts';
import { ChangeEvent } from 'react';



export type DeviceMap = Record<string, Device>;

interface DeviceState {
    deviceMap: DeviceMap;
    setDeviceMap(DeviceMap: DeviceMap): void;
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    parseData: (fileContent: string) => void;
    setGroupAndNumber_NAC_ONLY_FOR_NOW(NACTAG : string , SPEAKTAG : string , Dev: Device): Device;

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
            const PARSED_LINE = line.trim().split(/r?\t/)


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

                //@ts-ignore
                let dev: Device = {};
                const DYANMIC_HEADER_INDEX_ARRAY = Object.keys(DYNAMIC_HEADER_OBJ)

                PARSED_LINE.forEach((data, index) => {
                    const INDEX = String(index)
                    const INCLUDED: boolean = DYANMIC_HEADER_INDEX_ARRAY.includes(INDEX)

                    if (INCLUDED) {
                        const key = DYNAMIC_HEADER_OBJ[index];
                        const TO_NUMBER = HEADERS_TO_FORMAT_TO_NUMBER.includes(key)

                        if (TO_NUMBER) {
                            (dev as any)[key] = Number(data);
                        } else {
                            (dev as any)[key] = data;
                        }
                    }
                })



                //!Might Need to be refactored
                const updateDevice: Device = get().setGroupAndNumber_NAC_ONLY_FOR_NOW(dev.NACTAG, dev.SPEAKTAG, dev);

                //add object to Device map by the handle here
            }

        })


        return;
    },
    compare(xValue: number, yValue: number): void {


    },

    setViewport(): void {


    },

    setGroupAndNumber_NAC_ONLY_FOR_NOW(NACTAG: string, SPEAKTAG: string, Dev: Device): Device {
        const regex = /:([A-Z])(\d+)-(\d+)/;
        const NAC_REGEX = NACTAG.match(regex);

        if (NACTAG === "<>" && SPEAKTAG === "<>") return Dev;

        if (NAC_REGEX) {
            Dev.NacGroup = Number(NAC_REGEX[2])
            Dev.NacNumber = Number(NAC_REGEX[3])
        }
        //!ADD SPEAKER AND IDNET LATER
        return Dev;

    }

}))


export default useDeviceStore;