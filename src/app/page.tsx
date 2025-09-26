

import DeviceData from "./utils/readData.js";
import tempData from "./utils/test1data.json";
import Strobe from "../components/Strobe.tsx";
import SpeakerStrobe from "../components/SpeakerStrobe.tsx";


export default function HomePage() {

  console.log(tempData);




  return (
    <div className="Main">
      {tempData.map((device, idx) => {
        if (device.deviceType == "SpeakerStrobe") {
          return (<SpeakerStrobe key={idx} color="#20ED3C" x={device.xValue} y={device.yValue} rotate={0} scale={.5} />)
        } else if (device.deviceType == "Strobe") {
          return (<Strobe key={idx} color="#20ED3C" x={device.xValue} y={device.yValue} rotate={0} scale={.25} />)
        }
      })}

      {/* <SpeakerStrobe color="#20ED3C" x={0} y={0} rotate={0} scale={1} />
      <Strobe color="#20ED3C" x={0} y={0} rotate={0} scale={1} /> */}
    </div>
  );
}