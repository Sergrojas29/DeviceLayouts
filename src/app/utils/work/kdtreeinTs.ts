export type Point = number[];
export interface Node {
    Point: Point;
    left: Node | null;
    right: Node | null
}
interface Best {
    distanceSqrd: number;
    node: Node | null;
}


export default class kdtree {
    private root: Node | null = null;
    private dimensions: number;

    constructor(dimensions: number) {
        this.dimensions = dimensions;
    }

    insert(newPoint: Point): void {
        const CORRECT_LENGHT = this.typeCheck(newPoint)
        if (!CORRECT_LENGHT) {
            throw new Error("Incorrect Point Dimensions")
        }


        const newNode: Node = {
            Point: newPoint,
            left: null,
            right: null
        }

        this.root = this.insertHelper(this.root, newNode, 0)
    }

    private insertHelper(current: Node | null, newNode: Node, depth: number): Node {
        if (current === null) {
            return newNode;

        };

        const axis = depth % this.dimensions;
        if (newNode.Point[axis] < current.Point[axis]) {
            current.left = this.insertHelper(current.left, newNode, depth + 1);
        } else {
            current.right = this.insertHelper(current.right, newNode, depth + 1);
        }
        return current;

    }

    private typeCheck(newPoint: Point): boolean {
        return newPoint.length === this.dimensions
    }

    public nearestNeighbor(targetPoint: Point) {
        if (this.root === null) { return null; }
        let depth = 0;
        const best: Best = {
            distanceSqrd: Number.MAX_SAFE_INTEGER,
            node: null
        }

        this.nearestNeighborHelper(this.root, targetPoint, best, depth);


        return best.node;

    }

    private nearestNeighborHelper(current: Node | null, targetPoint: Point, best: Best, depth: number) {
        if (current === null) return;


        const axis = depth % this.dimensions;

        const newDistance = this.squaredEuclideanDistance(targetPoint, current.Point);
        if (newDistance < best.distanceSqrd) {
            best.distanceSqrd = newDistance;
            best.node = current;
        }


        let firstNode: Node | null;
        let otherNode: Node | null;

        if (targetPoint[axis] < current.Point[axis]) {
            firstNode = current.left;
            otherNode = current.right;
        } else {
            firstNode = current.right;
            otherNode = current.left;
        }

        this.nearestNeighborHelper(firstNode, targetPoint, best, depth + 1)
        
        const primeRadiusSqrd = (targetPoint[axis] - current.Point[axis]) ** 2;
        if (primeRadiusSqrd < best.distanceSqrd) {
            this.nearestNeighborHelper(otherNode, targetPoint, best, depth + 1);
        }

    }

    private squaredEuclideanDistance(target: Point, currentPoint: Point): number {
        let ret = 0;
        for (let i = 0; i < this.dimensions; i++) {
            const diff = target[i] - currentPoint[i];
            ret = diff * diff;

        }
        return ret;
    }

    public testData(list : Point[], target: Point , correct : Point ): boolean{

        const tempTree  = new kdtree(target.length)
        list.forEach(e=>{
            tempTree.insert(e)
        })
        const nearestNode = tempTree.nearestNeighbor(target)
        if (nearestNode)
        {
            if(JSON.stringify(nearestNode.Point) === JSON.stringify(correct) ){
                console.log("correct");
                return true;
            }else{
                console.log("incorrect");
                return false;
            }
        }else{
            throw new Error("an error occurred");
    }

    }





}