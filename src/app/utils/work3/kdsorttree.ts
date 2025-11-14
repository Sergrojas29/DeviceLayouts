export type Point = number[] ;

export interface Node {
    axis: number | null;
    point: Point | null;
    left: Node | null;
    right: Node | null;
}



export default class KDTreeSorted {
    public root: Node = {
        axis: null,
        point: null,
        left: null,
        right: null
    }
    private totalDepth: number = 0;
    private dimension: number;


    constructor(dimension_: number) {
        this.dimension = dimension_
    }

    createNode(): Node {
        return {
            axis: null,
            point: null,
            left: null,
            right: null
        }
    }
    
    insert(arrPoint: Point[]): void {
        this.insertHelper(arrPoint, this.root, 0)
    }


    private insertHelper(arrPoint: Point[], Current: Node, depth: number) {
        //*BASE CASE        
        const LENGTH = arrPoint.length
        if(LENGTH === 1){
            Current.point = arrPoint[0]
            return;
        };

        const AXIS = depth % this.dimension
        arrPoint.sort((a: Point, b: Point) => a[AXIS] - b[AXIS]);
        
        const MEDIAN_INDEX = Math.floor(LENGTH / 2);
        
        
        Current.axis = arrPoint[MEDIAN_INDEX][AXIS]



        const left_Array: Point[] = arrPoint.splice(0, MEDIAN_INDEX);
        const right_Array: Point[] = arrPoint;

        this.insertHelper(left_Array, Current.left = this.createNode(), depth+1) 
        this.insertHelper(right_Array, Current.right = this.createNode(), depth+1) 
    }

}//kdtreesort class


export function kdsort(array: Point[]): Point[] {
    return kdsortHelper(array, 0);
}

function kdsortHelper(arrayToSort: Point[], depth: number): Point[] {
    arrayToSort.sort((a, b) => a[depth % 2] - b[depth % 2]);

    const arrayLength = arrayToSort.length
    if (arrayLength < 2) return arrayToSort;

    const left_Array: Point[] = arrayToSort.splice(0, Math.floor(arrayToSort.length / 2));

    const Median_Array: Point = arrayToSort[0];
    arrayToSort.shift()

    const right_Array: Point[] = arrayToSort;

    const fullArray: Point[] = kdsortHelper(left_Array, depth + 1).concat([Median_Array], kdsortHelper(right_Array, depth + 1));

    return fullArray;
}

const arrayToSort: Point[] = [
    [12, 63],
    [88, 80],
    [40, 60],
    [60, 36],
    [51, 45],
    [53, 91],
    [72, 15],
    [43, 75],
    [41, 11],
    [12, 36],
    [23, 36],
    [83, 65],
    [61, 45],
    [41, 53],
    [93, 28],
];

kdsort(arrayToSort)




