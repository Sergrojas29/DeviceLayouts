interface SpeakerStrobeProps {
    color: string;
    width: number;
    x: number;
    y: number;
    rotate: number;
}

export function SpeakerStrobe({ color, width, x, y, rotate }: SpeakerStrobeProps) {

    const Strobestyle = {
        st0: {
            stroke: "#ed2020",
            fill: "none",
            strokeWidth: 1,
        },
        st1: {
            fill: "#FFFFFF",
            stroke: "#20ED3C",
            strokeWidth: 1,
        },
        container: {
            height: "100px", //! Controls the Size 
            backgroundColor: "rgba(255, 255, 255, 0)",
            position: 'absolute',
            
        }


    }

    return (
        <svg
            className="Speakerstrobe"
            style={Strobestyle.container}
            transform={`translate(${x},${y}), rotate(${rotate})`}
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
    )
}

export default SpeakerStrobe