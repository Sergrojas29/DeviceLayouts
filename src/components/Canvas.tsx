import { useRef, useEffect, useState } from "react";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // State: canvas size and pan offset
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Track dragging
    const isDragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // Resize handler
    useEffect(() => {
        function handleResize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        handleResize(); // set initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Mouse events for panning
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        window.addEventListener("keydown", (e:KeyboardEvent)=>{
            if(e.key === 'f') setOffset({ x: 0, y: 0 });
        })

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    // Drawing logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = size.width;
        canvas.height = size.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply pan offset
        ctx.save();
        ctx.translate(offset.x, offset.y);

        // Draw grid
        ctx.strokeStyle = "#ddd";
        for (let x = -1000; x < canvas.width + 1000; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, -1000);
            ctx.lineTo(x, canvas.height + 1000);
            ctx.stroke();
        }
        for (let y = -1000; y < canvas.height + 1000; y += 50) {
            ctx.beginPath();
            ctx.moveTo(-1000, y);
            ctx.lineTo(canvas.width + 1000, y);
            ctx.stroke();
        }

        // Draw main rectangle
        ctx.fillStyle = "skyblue";
        ctx.fillRect(100, 100, 200, 100);

        // Label
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Drag to Pan!", 120, 150);

        ctx.restore();
    }, [size, offset]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: "block", border: "0px solid red", cursor: isDragging ? "grab" : "pointer" }}
        />
    );
}
