interface StrobeProps {
    color: string;
    width: number;
    x: number;
    y: number;
    rotate: number;
    scale:number
}

export function Strobe({ color, width, x, y, rotate, scale }: StrobeProps) {



    const Strobestyle = {
        st0: {
            stroke: "#20ED3C",
            fill: "none",
            strokeWidth: 1,
        },
        st1: {
            fill: "#FFFFFF",
            stroke: "#20ED3C",
            strokeWidth: 1,
        },
        container: {
            height: "100",
            position: "aboslute",
            transformOrigin: "bottom center",
            border: 'solid 1pt red',
        }

    }

    return (
        <svg
            className="Strobe"
            style={Strobestyle.container}
            viewBox="0 0 70 100"
            transform={`translate(${x},${y}), rotate(${rotate})`}
        >
            <g >
                <line style={Strobestyle.st0} x1="0.1" y1="69.5" x2="69.6" y2="0" />
                <line style={Strobestyle.st0} x1="69.6" y1="69.5" x2="0.1" y2="0" />
                <line style={Strobestyle.st0} x1="34.9" y1="99.9" x2="34.9" y2="34.7" />
                <line style={Strobestyle.st0} x1="4.3" y1="99.7" x2="65.5" y2="99.7" />
                <circle style={Strobestyle.st1} cx="34.9" cy="34.7" r="24.1" />
            </g>
        </svg>
    )
}

export default Strobe