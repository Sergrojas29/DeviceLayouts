type Point = number[];

interface Node {
    axis: number | null;
    data: Point | null;
    left: Node | null;
    right: Node | null;
}



class KDTreeSorted {
    public root: Node | null = null;
    public totalDepth: number = 0;
    public dimension: number;


    constructor(dimension_: number) {
        this.dimension = dimension_
    }

    insert(arrPoint: Point[]): void {
        const newNode: Node = {
            axis: null,
            data: null,
            left: null,
            right: null
        }
        this.insertHelper(arrPoint, this.root , newNode, 0)
    }

    insertHelper(arrPoint: Point[], Current: Node | null, newNode: Node, depth: number) {
        arrPoint.sort((a: Point, b: Point) => a[depth % 2] - b[depth % 2]);
        const MEDIAN_INDEX = Math.floor(arrPoint.length / 2);

        



        if (arrPoint.length < 2) return;


        if (this.root == null) {
            this.root = {
                axis: arrPoint[MEDIAN_INDEX][this.dimension],
                data: null,
                left: null,
                right: null,
            }


            const left_Array: Point[] = arrPoint.splice(0, MEDIAN_INDEX);
            const right_Array: Point[] = arrPoint;



        }

    }

}//kdtreesort class


export default function kdsort(array: Point[]): Point[] {
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





