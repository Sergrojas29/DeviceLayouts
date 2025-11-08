type Point = number[];
interface Node{
    Point: Point;
    left: Node | null;
    rigth: Node | null
}


class kdtree {
    private root: Node | null = null;
    private dimensions: number;

    constructor(dimensions: number) {
        this.dimensions = dimensions;
    }

    insert(newPoint: Point):void{
        const CORRECT_LENGHT =  this.typeCheck(newPoint)
        if(CORRECT_LENGHT){
            this.insertHelper(this.root, newPoint, 0)
        }else{
            throw new Error("Incorrect Point Dimensions")
        }
    }
    
    private insertHelper(current: Node | null, newPoint: Point, depth: number):void {
        if(current === null) return;

        const axis = depth % this.dimensions;
        if(newPoint[axis] < current.Point[axis]){
            
        }

    }

    private typeCheck(newPoint: Point): boolean{
        return newPoint.length === this.dimensions
    }

}