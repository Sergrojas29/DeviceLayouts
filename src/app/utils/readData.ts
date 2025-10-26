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
        const headerNumbers: string[] = [
            'CD',
            'X_COORDINATE',
            'Y_COORDINATE',
        ];

        const dynamicHeaders: { [key: number]: string } = {}


        data.forEach((line, index) => {
            const parse = line.trim().split(/r?\t/)


            //!GET HEADER INDEX
            if (index == 0) {
                for (let i = 0; i < parse.length; i++) {
                    if (header.includes(parse[i])) {
                        dynamicHeaders[i] = parse[i]
                    }
                }
            } else {
                //! PARSE DATA
                //@ts-ignore
                let dev: Device = {};
                parse.forEach((data, index) => {
                    //* looks for the column number if included from header it will be added based on index
                    if (Object.keys(dynamicHeaders).includes(String(index))) {
                        const key = dynamicHeaders[index];
                        if (headerNumbers.includes(key)) {
                            //!SET TO AN ABSOLUTE VALUE FOR RENDERING ON SVG*****
                            (dev as any)[key] = Number(data);
                        } else {
                            (dev as any)[key] = data;
                        }
                    }
                })


                //! Final Update
                this.compare(Number(dev.X_COORDINATE), Number(dev.Y_COORDINATE));
                this.devices.push(dev)
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
        this.viewport.xMax = Math.max(xValue , this.viewport.xMax )
        this.viewport.xMin = Math.min(xValue , this.viewport.xMin )
        this.viewport.yMax = Math.max(yValue , this.viewport.yMax )
        this.viewport.yMin = Math.min(yValue , this.viewport.yMin )
    }

    setViewport(): void {
        const YMAX = this.viewport.yMax;
        const YMIN = this.viewport.yMin;

        const XMAX = this.viewport.xMax;
        const XMIN = this.viewport.xMin;

        this.viewport.height = YMAX - YMIN;
        this.viewport.width = XMAX - XMIN;

    }



}
