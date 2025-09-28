import * as fs from 'fs';
import { resolve } from 'path';
import * as readline from 'readline';


const args: string[] = process.argv;

interface Device {
    xValue: number;
    yValue: number;
    deviceType: string;
    candela: number;
    watts: number;

}

/*\
Class `Methods;
Instance Variables:
 Static: 
    Xmax & Ymax
    Device Count

Methods:

Asynce Process Text( File Location): Object [];

GetMaxMIn( Device , Min , Max) : [Max , Min];



Process Text -> to Array Of Objects

Gets the second arg: File Path
Process txt file -> json file


*/

export default class DeviceData {
    static deviceCount: number = 0;

    xMax: number = Number.MIN_SAFE_INTEGER
    xMin: number = Number.MAX_SAFE_INTEGER

    yMax: number = Number.MIN_SAFE_INTEGER
    yMin: number = Number.MAX_SAFE_INTEGER


    // [ Xmax ,Xmin Ymax , Ymin]
    sizeCanvas: number[] = []


    constructor() {

    }

    async processFile(filePath: string): Promise<Device[]> {

        /* 
        Return Array of Device Object

        Process File from Text Document
        Compare Static Max , Min (x,y)
        Count Devices
        
        */
        const fsteam = fs.createReadStream(filePath);
        let data: Device[] = [];

        const rl = readline.createInterface({
            input: fsteam,
            crlfDelay: Infinity,

        })

        let lineNumber: number = 0;




        for await (const line of rl) {
            lineNumber++
            if (lineNumber != 1) {
                let words: string[] = line.split("\t");
                let dev: Device = {
                    xValue: Number(words[0]),
                    yValue: Number(words[1]),
                    deviceType: words[2] || "",
                    candela: Number(words[3]),
                    watts: Number(words[4])
                };

                this.compare(dev.xValue, dev.yValue);

                data.push(dev);
                DeviceData.deviceCount += 1;
            }
        }

        this.getCanvasSize();

        return data;

    }



    compare(xValue: number, yValue: number): void {
        // Compare all values SET value to class; 

        this.xMax = xValue > this.xMax ? xValue : this.xMax
        this.xMin = xValue < this.xMin ? xValue : this.xMin
        this.yMax = yValue > this.yMax ? yValue : this.yMax
        this.yMin = yValue < this.yMin ? yValue : this.yMin
    }

    getCanvasSize(): void {
        // [ Xmax ,Xmin Ymax , Ymin]
        this.sizeCanvas = [
            (this.xMax + 100),
            (this.xMin - 100),
            (this.yMax + 100),
            (this.yMin - 100)
        ]
    }

}




// console.log(args[2])
// processFile(args[2]).catch( err => console.error("Error Reading file"));

const tp = new DeviceData();

try {
    const data = await tp.processFile("../../TestData/Test.txt");
    console.log(data);
    console.log(tp)
    console.log(DeviceData)
} catch (error) {
    console.log(error);
}


