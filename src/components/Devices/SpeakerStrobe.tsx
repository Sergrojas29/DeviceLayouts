interface SpeakerStrobeProps {
    color: string;
    x: number;
    y: number;
    rotate: number;
    scale: number;
}

export function SpeakerStrobe({ color, x, y, rotate, scale = 1 }: SpeakerStrobeProps) {

    const width = 76 * scale;
    const height = 100 * scale;

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
        ContainerSvg: {
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            transformOrigin: "bottom center",
            transform: `translate(${x - (width / 2)}px, ${y}px) rotate(${rotate}deg)`,

        },


    }

    return (
        <div style={Strobestyle.ContainerSvg}>

            <svg
                className="Speakerstrobe"
                viewBox="0 0 76 100"
            >
                <g id="Speakerstrobe">
                    <line style={Strobestyle.st0} x1="3.8" y1="96.4" x2="72.9" y2="27.3" />
                    <line style={Strobestyle.st0} x1="72.9" y1="96.4" x2="3.8" y2="27.3" />
                    <circle style={Strobestyle.st1} cx="38.3" cy="61.8" r="24" />
                    <rect x="0.4" y="23.9" style={Strobestyle.st0} width="75.6" height="75.6" />
                    <polygon style={Strobestyle.st0} points="38.3,24 66.6,1 9.9,1 	" />
                </g>

            </svg>
        </div>
    )
}

export default SpeakerStrobe