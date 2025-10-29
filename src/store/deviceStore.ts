
import { create } from 'zustand';
import { ChangeEvent } from 'react';



export type DeviceMap = Map<string, Device>;
export type Viewport = Record<string, number>;
export interface Device {
    HANDLE: string;
    PID: string;
    CD: number;
    WP: string;
    NACTAG: string;
    DESCRIPTION: string;
    X_COORDINATE: number;
    Y_COORDINATE: number;
    CEIL: string;
    SPEAKTAG: string;
    WATT: string;
    //! FOR MANIPLULATION
    NacGroup: number;
    NacNumber: number;
}

interface DeviceState {
    deviceMap: DeviceMap;
    viewport: Viewport;

    //!Temp for testing 
    tempDeviceMap: DeviceMap;
    addTempDeviceMap(HANDLE: string): void;
    //!Temp for testing 


    setDeviceMap(DeviceMap: DeviceMap): void;
    setViewport(newViewport: Viewport): void;
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    parseData: (fileContent: string) => void;
    setGroupAndNumber_NAC_ONLY_FOR_NOW(Dev: Device): Device;
    compare(device: Device, viewport: Viewport): void;
}

const useDeviceStore = create<DeviceState>((set, get) => ({
    deviceMap: new Map<string, Device>(),
    viewport: {},
    tempDeviceMap: new Map<string, Device>(),

    setDeviceMap: (newDeviceMap) => set({ deviceMap: newDeviceMap }),
    setViewport: (newViewport) => {
        const YMAX = newViewport.yMax;
        const YMIN = newViewport.yMin;

        const XMAX = newViewport.xMax;
        const XMIN = newViewport.xMin;

        newViewport.height = YMAX - YMIN;
        newViewport.width = XMAX - XMIN;

        set({ viewport: newViewport }
        )
    },

    //! TEMP FOR TESTING
    addTempDeviceMap: (HANDLE) => set((state) => {
        const device = state.deviceMap.get(HANDLE);
        if (!device) {
            // error no change
            return { tempDeviceMap: new Map(state.tempDeviceMap) };
        }
        return { tempDeviceMap: new Map(state.tempDeviceMap).set(HANDLE, device) };
    }),


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
        const newDeviceMap: DeviceMap = new Map<string, Device>();
        const newViewport: Viewport = {
            width: 0,
            height: 0,
            xMax: Number.MIN_SAFE_INTEGER,
            xMin: Number.MAX_SAFE_INTEGER,
            yMax: Number.MIN_SAFE_INTEGER,
            yMin: Number.MAX_SAFE_INTEGER,
        }


        const data = stringData.split(/\r?\n/).filter(line => line.trim() !== '');

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

        const DYNAMIC_HEADER_OBJ: Record<number, string> = {}


        const firstLine = data.shift();
        if (!firstLine) return;
        const HEADERS: string[] = firstLine.split(/\r?\t/);

        HEADERS.forEach((headerValue: string, i: number) => {
            const INCLUDED_HEADERS: boolean = header.includes(headerValue)
            if (INCLUDED_HEADERS) {

                DYNAMIC_HEADER_OBJ[i] = headerValue
            }
        })


        data.forEach((line, index) => {
            const PARSED_LINE = line.trim().split(/\r?\t/)


            //@ts-ignore
            let tempDevice: Device = {};
            const DYANMIC_HEADER_INDEX_ARRAY = Object.keys(DYNAMIC_HEADER_OBJ)

            PARSED_LINE.forEach((data, index) => {
                const INDEX = String(index)
                const INCLUDED: boolean = DYANMIC_HEADER_INDEX_ARRAY.includes(INDEX)

                if (INCLUDED) {
                    const key = DYNAMIC_HEADER_OBJ[index];
                    const TO_NUMBER = HEADERS_TO_FORMAT_TO_NUMBER.includes(key)

                    if (TO_NUMBER) {
                        (tempDevice as any)[key] = Number(data);
                    } else {
                        (tempDevice as any)[key] = data;
                    }
                }
            })
            newDeviceMap.set((tempDevice.HANDLE as string), tempDevice);
            get().compare(tempDevice, newViewport)




        })



        get().setDeviceMap(newDeviceMap);
        get().setViewport(newViewport);
        return;
    },
    compare(device, viewport) {
        const xValue = device.X_COORDINATE
        const yValue = device.Y_COORDINATE
        viewport.xMax = Math.max(xValue, viewport.xMax)
        viewport.xMin = Math.min(xValue, viewport.xMin)
        viewport.yMax = Math.max(yValue, viewport.yMax)
        viewport.yMin = Math.min(yValue, viewport.yMin)
    },



    setGroupAndNumber_NAC_ONLY_FOR_NOW(device: Device): Device {
        const regex = /:([A-Z])(\d+)-(\d+)/;
        const NACTAG = device.NACTAG;
        const SPEAKTAG = device.SPEAKTAG


        const NAC_REGEX = NACTAG.match(regex);

        if (NACTAG === "<>" && SPEAKTAG === "<>") return device;

        if (NAC_REGEX) {
            device.NacGroup = Number(NAC_REGEX[2])
            device.NacNumber = Number(NAC_REGEX[3])
        }
        //!ADD SPEAKER AND IDNET LATER
        return device;

    }

}))


export default useDeviceStore;