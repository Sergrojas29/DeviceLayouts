/**
 * @interface Device
 * @description Come back and edit the description
 */


export interface Device {
    xValue: number;
    yValue: number;
    deviceType: string;
    candela: number;
    watts: number;
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

    xMax: number = Number.MIN_SAFE_INTEGER
    xMin: number = Number.MAX_SAFE_INTEGER

    yMax: number = Number.MIN_SAFE_INTEGER
    yMin: number = Number.MAX_SAFE_INTEGER

    canvasSize = {
        width: 0,
        height:0,
        offset:0,
    }



    constructor() { }

    parseData(str: string): void {
        const data = str.split(/\r?\n/)
        let deviceData: Device[] = []

        //!HEADER EDIT LATER AS EDIT THE INTERFACE
        const header: string[] = [

            "xValue",
            "yValue",
            "deviceType",
            "candela",
            "watts",
        ]

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
                    if (Object.keys(dynamicHeaders).includes(String(index))) {
                        const key = dynamicHeaders[index];
                        (dev as any)[key] = data;
                    }
                })


                //! Final Update
                this.compare(Number(dev.xValue), Number( dev.yValue));
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


        this.xMax = xValue > this.xMax ? xValue : this.xMax
        this.xMin = xValue < this.xMin ? xValue : this.xMin
        this.yMax = yValue > this.yMax ? yValue : this.yMax
        this.yMin = yValue < this.yMin ? yValue : this.yMin
    }

    getCanvasSize(): void {
        this.canvasSize.width = this.xMax + Math.abs(this.xMin)
        this.canvasSize.height = this.yMax + Math.abs(this.yMin)
    }

    setOffset():void {
        const xOffset = Math.abs(this.xMin);
        const yOffset = Math.abs(this.yMin);
        this.devices.forEach((device) => {
            device.offSetX = Number(device.xValue) + xOffset;
            device.offSetY = Number(device.yValue) + yOffset;
        });
    }

}
