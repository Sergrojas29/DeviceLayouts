import KDTreeSorted, { kdsort } from "./kdsorttree";

type Point = number[];


const arrayToSort1: Point[] = [
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

const testtree = kdsort(arrayToSort1);
const tree = new KDTreeSorted(2);
tree.insert(arrayToSort)
console.log(tree.root)

console.log("_____________________________")
console.log(testtree)

