interface StrobeProps {
    color: string;
    X: number;
    Y: number;
    scale: number
}

export function Strobe({ color, X, Y, scale = 1 }: StrobeProps) {

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

        <g className="Strobe">
            {/* <line style={Strobestyle.st0} x1="0.1" y1="69.5" x2="69.6" y2="0" />
            <line style={Strobestyle.st0} x1="69.6" y1="69.5" x2="0.1" y2="0" />
            <line style={Strobestyle.st0} x1="34.9" y1="99.9" x2="34.9" y2="34.7" />
            <line style={Strobestyle.st0} x1="4.3" y1="99.7" x2="65.5" y2="99.7" /> */}
            <line x1={X - HALF} y1={Y - HALF} x2={X + HALF} y2={Y + HALF} style={Strobestyle.st0} />
            <line x1={X + HALF} y1={Y - HALF} x2={X - HALF} y2={Y + HALF} style={Strobestyle.st0} />
            <line style={Strobestyle.st0} x1={X} y1={Y} x2={X} y2={Y + SIZE} />

            <line style={Strobestyle.st0} x1={X-HALF} y1={Y+SIZE} x2={X + HALF} y2={Y + SIZE} />

            <circle style={Strobestyle.st1} cx={X} cy={Y} r={UNIT} />
        </g>
    )
}

export default Strobe