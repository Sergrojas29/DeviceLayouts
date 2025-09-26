interface StrobeProps {
    color: string;
    x: number;
    y: number;
    rotate: number;
    scale: number
}

export function Strobe({ color, x, y, rotate, scale = 1 }: StrobeProps) {

    const width = 70 * scale;
    const height = 100 * scale

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
            position: 'absolute', //Allows overlap
            width: `${width}px`,
            height: `${height}px`,
            transformOrigin: "bottom center",
            transform: `translate(${x - (width/2)}px, ${y}px) rotate(${rotate}deg)`,
        },
    }

    return (
        <div className="ContainerSvg" style={Strobestyle.ContainerSvg}>
            <svg
                className="Strobe"
                viewBox="0 0 70 100"
            >
                <g>
                    <line style={Strobestyle.st0} x1="0.1" y1="69.5" x2="69.6" y2="0" />
                    <line style={Strobestyle.st0} x1="69.6" y1="69.5" x2="0.1" y2="0" />
                    <line style={Strobestyle.st0} x1="34.9" y1="99.9" x2="34.9" y2="34.7" />
                    <line style={Strobestyle.st0} x1="4.3" y1="99.7" x2="65.5" y2="99.7" />
                    <circle style={Strobestyle.st1} cx="34.9" cy="34.7" r="24.1" />
                </g>
            </svg>
        </div>
    )
}

export default Strobe