"use client"

import Canvas from "@/components/Canvas.tsx";
import useDeviceStore from '../store/deviceStore.ts'
import TempTable from "@/components/TempTable.tsx";
import { useEffect, useState } from 'react';
import kdtree, { Point } from "./utils/work/kdtreeinTs.js";


export default function HomePage() {

  const devices = useDeviceStore((state) => state.deviceMap);
  const viewport = useDeviceStore((state) => state.viewport);
  const handleFileUpload = useDeviceStore((state) => state.handleFileUpload);


  const styleSection: {
    main: React.CSSProperties,
    canvas: React.CSSProperties,
    table: React.CSSProperties
  } = {
    main: {
      display: 'flex',
      flexDirection: "row",
      width: '100%',
      height: '100%',
    },
    canvas: {
      width: '100%',
      height: '100%',
      border: 'solid red 1pt'
    },
    table: {
      height: '100%',
      border: 'solid blue 1pt',
      width: '30%'
    }
  }


  const [hide, setHide] = useState<boolean>(false)

  const hideStyle: React.CSSProperties = {
    width: 0,
    display: 'none'
  }






  const scenario1 = {
    name: "1. Basic Grid Case",
    points: [
      [1, 1], [4, 4], [7, 7],
      [1, 7], [7, 1]
    ],
    target: [5, 5],
    expectedNearest: [4, 4]
  };


  const scenario2 = {
    name: "2. Single Point Tree",
    points: [[10, 20]],
    target: [1, 1],
    expectedNearest: [10, 20]
  };



  const scenario3 = {
    name: "3. Coincident Target",
    points: [
      [0, 0], [5, 5], [10, 10]
    ],
    target: [5, 5],
    expectedNearest: [5, 5]
  };

  const scenario4 = {
    name: "4. Collinear Points (Vertical)",
    points: [
      [5, 1], [5, 10], [5, 2], [5, 8]
    ],
    target: [5, 4],
    expectedNearest: [5, 2]
  };
  const scenario5 = {
    name: "5. Near a Splitting Plane",
    points: [
      [2, 3], // Point on the left
      [8, 7]  // Point on the right, further distance
    ],
    target: [6, 4],
    // The algorithm must check [2, 3] even though it's in the other subtree.
    expectedNearest: [2, 3]
  };

  const scenario6 = {
    name: "6. Duplicate Points",
    points: [
      [1, 1], [5, 5], [5, 5], [10, 10]
    ],
    target: [4, 4],
    expectedNearest: [5, 5]
  };
  const scenario7 = {
    name: "7. Large Coordinates",
    points: [
      [100, 500], [200, 100], [50, 700], [800, 800]
    ],
    target: [150, 150],
    expectedNearest: [200, 100]
  };

  const scenario8 = {
    name: "8. Different Quadrants",
    points: [
      [-1, -1], [1, 1], [-1, 1], [1, -1]
    ],
    target: [0.5, 0.5],
    expectedNearest: [1, 1]
  };

  const scenario9 = {
    name: "9. Deeply Nested Nearest",
    points: [
      [50, 50], [10, 90], [90, 90], [10, 10], [90, 10],
      [52, 51] // The actual nearest point
    ],
    target: [51, 51],
    expectedNearest: [52, 51]
  };
  const scenario10 = {
    name: "10. Horizontal Split Edge Case",
    points: [
      [1, 5], [10, 5], [5, 1], [5, 10]
    ],
    target: [3, 5],
    expectedNearest: [1, 5]
  };




















  useEffect(() => {
    // let tree2D = new kdtree(2);
    // const points: Point[] = scenario1.points;
    // const target: Point = scenario1.target;
    // points.forEach((p)=>{
    //   tree2D.insert(p);
    // })

    // const nn = tree2D.nearestNeighbor(target)?.Point
    // console.log(nn);
    // console.log(scenario1.expectedNearest)

    // console.log(scenario1.expectedNearest == nn )
    // scenario1.expectedNearest

    const kdmethod = new kdtree(2);
    kdmethod.testData(scenario1.points,scenario1.target , scenario1.expectedNearest)
    kdmethod.testData(scenario2.points,scenario2.target , scenario2.expectedNearest)
    kdmethod.testData(scenario3.points,scenario3.target , scenario3.expectedNearest)
    kdmethod.testData(scenario4.points,scenario4.target , scenario4.expectedNearest)
    kdmethod.testData(scenario5.points,scenario5.target , scenario5.expectedNearest)
    kdmethod.testData(scenario6.points,scenario6.target , scenario6.expectedNearest)
    kdmethod.testData(scenario7.points,scenario7.target , scenario7.expectedNearest)
    kdmethod.testData(scenario8.points,scenario8.target , scenario8.expectedNearest)
    kdmethod.testData(scenario9.points,scenario9.target , scenario9.expectedNearest)
    kdmethod.testData(scenario4.points,scenario4.target , scenario4.expectedNearest)

  }, [])


  return (
    <main style={styleSection.main}>
      <section style={styleSection.canvas}>


        <button onClick={() => { setHide(!hide) }}>HIDE</button>
        {/* <img src="./notPublic/DSC00999.png" alt="ho" style={{width:"100%"}}  /> */}
        <Canvas />
      </section>
      <section style={hide ? hideStyle : styleSection.table}>
        <TempTable />
        <button onClick={() => { setHide(!hide) }}>HIDE</button>

      </section>

    </main>
  );
}

