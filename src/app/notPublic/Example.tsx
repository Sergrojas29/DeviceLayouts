import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import tempData from "../utils/testdata.json" with { type: "json" };
import DeviceData from "../../utils/readData.ts";
import Image from 'next/image';

import Strobe from "../../components/Devices/Strobe.tsx";
import SpeakerStrobe from "../../components/Devices/SpeakerStrobe.tsx";


export default function Example() {
  return (
    <div className="full">
      <TransformWrapper>
        <TransformComponent>
          <canvas className="myCanvas" width="400000" height="400000"></canvas>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

