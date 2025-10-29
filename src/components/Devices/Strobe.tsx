import useDeviceStore from '../../store/deviceStore.ts'

interface StrobeProps {
    color: string;
    X: number;
    Y: number;
    scale: number;
    handle: string;
}

export function Strobe({ handle, color, X, Y, scale = 1 }: StrobeProps) {
    const addTempDevice = useDeviceStore((state) => state.addTempDeviceMap)

    const UNIT = 10 * scale;
    const SIZE = UNIT * 2.5;
    const HALF = SIZE / 2;

    const Strobestyle = {
        st0: {
            stroke: color,
            fill: "none",
            strokeWidth: 1,
        },
        st1: {
            fill: "#FFFFFF",
            stroke: color,
            strokeWidth: 1,
        },
    }

    return (

        <g className='device' onClick={() => { addTempDevice(handle) }}>
            <line x1={X - HALF} y1={Y - HALF} x2={X + HALF} y2={Y + HALF} style={Strobestyle.st0} />
            <line x1={X + HALF} y1={Y - HALF} x2={X - HALF} y2={Y + HALF} style={Strobestyle.st0} />
            <line style={Strobestyle.st0} x1={X} y1={Y} x2={X} y2={Y + SIZE} />

            <line style={Strobestyle.st0} x1={X - HALF} y1={Y + SIZE} x2={X + HALF} y2={Y + SIZE} />

            <circle style={Strobestyle.st1} cx={X} cy={Y} r={UNIT} />
        </g>
    )
}

export default Strobe