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
    offSetX: number;
    offSetY: number;
}

/**
 * Class Method to handle device data input from a txt file
 * to object
 * @method parseData
 * @method compare
 * @method getCanvasSize 
 * @method setOffset
 */


export default class DeviceData {
    deviceCount: number = 0;
    devices: Device[] = [];

    canvasSize = {
        width: 0,
        height: 0,
        offset: 0,
        xMax: Number.MIN_SAFE_INTEGER,
        xMin: Number.MAX_SAFE_INTEGER,
        yMax: Number.MIN_SAFE_INTEGER,
        yMin: Number.MAX_SAFE_INTEGER,
    }

    viewport ={
        x:0,
        y:0,
        height: 0,
        width:0,
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
            'offSetX',
            'offSetY',
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
                        if (headerNumbers.includes(key)){
                            (dev as any)[key] = Number(data);
                        }else{
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
        this.getCanvasSize();
        this.setOffset();
        return;
    }

    compare(xValue: number, yValue: number): void {
        /**
        *@description Compare all values SET value to class;
        */

        // get Max / Min     |   conditional statement         | update |    keep
        this.canvasSize.xMax = (xValue > this.canvasSize.xMax) ? xValue : this.canvasSize.xMax
        this.canvasSize.xMin = (xValue < this.canvasSize.xMin) ? xValue : this.canvasSize.xMin
        this.canvasSize.yMax = (yValue > this.canvasSize.yMax) ? yValue : this.canvasSize.yMax
        this.canvasSize.yMin = (yValue < this.canvasSize.yMin) ? yValue : this.canvasSize.yMin
    }

    getCanvasSize(): void {
        this.canvasSize.width = this.canvasSize.xMax + Math.abs(this.canvasSize.xMin)
        this.canvasSize.height = this.canvasSize.yMax + Math.abs(this.canvasSize.yMin)
    }

    setOffset(): void {
        const xOffset = Math.abs(this.canvasSize.xMin);
        const yOffset = Math.abs(this.canvasSize.yMin);
        this.devices.forEach((device) => {
            device.offSetX = device.X_COORDINATE + xOffset;
            device.offSetY = device.Y_COORDINATE + yOffset;
            


        });

    }

    setViewport():void{
        this.viewport.x = 0;
        this.viewport.y = 0;
        this.viewport.x = 0;
        this.viewport.x = 0;
    }

}
