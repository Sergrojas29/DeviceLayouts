/**
 * @interface Device
 * @description Come back and edit the description
 */

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



/**
 * Class Method to handle device data input from a txt file
 * to object
 * @method parseData
 * @method compare
 * @method setViewport
 * @method setOffset
 */


export default class DeviceData {
    deviceCount: number = 0;
    devices: Device[] = [];

    viewport = {
        width: 0,
        height: 0,

        xMax: Number.MIN_SAFE_INTEGER,
        xMin: Number.MAX_SAFE_INTEGER,
        yMax: Number.MIN_SAFE_INTEGER,
        yMin: Number.MAX_SAFE_INTEGER,
    }


    constructor() { }

    parseData(str: string): void {
        const data = str.split(/\r?\n/)

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
                    const INCLUDED :boolean = DYANMIC_HEADER_INDEX_ARRAY.includes(INDEX)

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


                //! Final Update
                this.compare(Number(dev.X_COORDINATE), Number(dev.Y_COORDINATE));

                //!Might Need to be refactored
                const updateDevice : Device = this.setGroupAndNumber_NAC_ONLY_FOR_NOW(dev.NACTAG , dev.SPEAKTAG, dev);

                this.devices.push(updateDevice)
                this.deviceCount += 1;
            }

        })


        this.setViewport()
        return;
    }

    compare(xValue: number, yValue: number): void {
        /**
        *@description Compare all values SET value to class;
        */
        this.viewport.xMax = Math.max(xValue, this.viewport.xMax)
        this.viewport.xMin = Math.min(xValue, this.viewport.xMin)
        this.viewport.yMax = Math.max(yValue, this.viewport.yMax)
        this.viewport.yMin = Math.min(yValue, this.viewport.yMin)
    }

    setViewport(): void {
        const YMAX = this.viewport.yMax;
        const YMIN = this.viewport.yMin;

        const XMAX = this.viewport.xMax;
        const XMIN = this.viewport.xMin;

        this.viewport.height = YMAX - YMIN;
        this.viewport.width = XMAX - XMIN;

    }

    setGroupAndNumber_NAC_ONLY_FOR_NOW(NACTAG : string , SPEAKTAG : string , Dev: Device): Device {
        const regex = /:([A-Z])(\d+)-(\d+)/;
        const NAC_REGEX = NACTAG.match(regex);

        if( NACTAG === "<>" && SPEAKTAG === "<>") return Dev;
        
        if(NAC_REGEX){
            Dev.NacGroup = Number(NAC_REGEX[2])
            Dev.NacNumber = Number(NAC_REGEX[3])
        }
        //!ADD SPEAKER AND IDNET LATER
        return Dev;

    }



}
