import kdsort from "./kdsorttree";
type Point = number[];

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




function test(array: Point[]){
    const orginalLength = array.length;
    
    const finalArray : Point[] = kdsort(arrayToSort);
    console.log('orginalLength == Final Array: ', (orginalLength == finalArray.length));
    

}

test(arrayToSort)