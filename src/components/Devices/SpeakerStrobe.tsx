interface SpeakerStrobeProps {
    color: string;
    X: number;
    Y: number;
    scale: number;

}

export function SpeakerStrobe({ color, X, Y, scale = 1 }: SpeakerStrobeProps) {

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
    };

    return (

        <g>
            <line x1={X - UNIT} y1={Y - UNIT} x2={X + UNIT} y2={Y + UNIT} style={Strobestyle.st0} />
            <line x1={X + UNIT} y1={Y - UNIT} x2={X - UNIT} y2={Y + UNIT} style={Strobestyle.st0}/>
            <rect x={X - HALF} y={Y - HALF} width={SIZE} height={SIZE}    style={Strobestyle.st0}/>
            <circle cx={X} cy={Y} r={UNIT} style={Strobestyle.st1} />
            <polygon fill="green" stroke="green" strokeWidth="1" points={`${X},${Y - HALF} ${X - HALF},${Y - HALF - UNIT} ${X + HALF},${Y - HALF - UNIT}`} />
        </g>
    )
}

export default SpeakerStrobe