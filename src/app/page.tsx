import DeviceData from "./utils/readData.js";
import Strobe from "../components/Strobe.tsx";
import SpeakerStrobe  from "../components/SpeakerStrobe.tsx";

export default function HomePage() {



  return (
    <div className="Main">
      {/* <SpeakerStrobe color="#20ED3C" width={1} x={60} y={12} rotate={90}/> */}
      <Strobe color="#20ED3C" width={1} x={0} y={0} rotate={90} scale={1}/>
    </div>
  );
}