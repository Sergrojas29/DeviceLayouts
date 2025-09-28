import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import tempData from "../utils/testdata.json" with { type: "json" };
import DeviceData from "../../utils/readData.ts";
import Image from 'next/image';

import Strobe from "../../components/Devices/Strobe.tsx";
import SpeakerStrobe from "../../components/Devices/SpeakerStrobe.tsx";


export default function Example() {
  return (
    <div className="relative border-4 border-dashed border-gray-400 w-full h-[500px] overflow-hidden">
      <TransformWrapper
        limitToBounds={false} // This is the key change!
        minScale={0.1}
        maxScale={100}
        
      >
        <TransformComponent>
          <div className="w-[1500px] h-[1000px] bg-gray-200" style={{border: '1px solid red'}}>
            {/* The content, which is larger than the container */}
            <h2 className="text-3xl font-bold p-8">Large Content</h2>
            <p className="p-8">
              This content is much bigger than its parent container, allowing you to pan and zoom freely in any direction.
            </p>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

