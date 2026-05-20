"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Trash2, Pencil, Eraser } from "lucide-react";

const COLORS = ["#000000", "#1e90ff", "#f43f5e", "#22c55e", "#f59e0b", "#a855f7", "#ffffff"];
const SIZES = [2, 4, 8, 14];

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);

  const getPos = (clientX: number, clientY: number, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const draw = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !lastPos.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = tool === "eraser" ? size * 4 : size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      lastPos.current = { x, y };
    },
    [tool, color, size]
  );

  const startDraw = useCallback((x: number, y: number) => {
    isDrawing.current = true;
    lastPos.current = { x, y };
  }, []);

  const endDraw = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onDown = (e: MouseEvent) => {
      e.preventDefault();
      const p = getPos(e.clientX, e.clientY, canvas);
      startDraw(p.x, p.y);
    };
    const onMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      const p = getPos(e.clientX, e.clientY, canvas);
      draw(p.x, p.y);
    };
    const onUp = () => endDraw();
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onUp);
    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onUp);
    };
  }, [draw, startDraw, endDraw]);

  // Touch events (iPad / Apple Pencil)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const p = getPos(t.clientX, t.clientY, canvas);
      startDraw(p.x, p.y);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const t = e.touches[0];
      const p = getPos(t.clientX, t.clientY, canvas);
      draw(p.x, p.y);
    };
    const onTouchEnd = () => endDraw();
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [draw, startDraw, endDraw]);

  return (
    <div className="absolute inset-0 flex flex-col bg-white dark:bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex-wrap shrink-0">
        {/* Tools */}
        <div className="flex gap-1">
          <button
            onClick={() => setTool("pen")}
            className={`p-1.5 rounded-lg transition-all ${tool === "pen" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
            title="ปากกา"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`p-1.5 rounded-lg transition-all ${tool === "eraser" ? "bg-red-100 dark:bg-red-900/50 text-red-500" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
            title="ยางลบ"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-zinc-700 shrink-0" />

        {/* Colors */}
        <div className="flex gap-1 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool("pen"); }}
              className={`w-5 h-5 rounded-full border-2 transition-all ${color === c && tool === "pen" ? "border-blue-500 scale-125" : "border-transparent hover:scale-110"}`}
              style={{ backgroundColor: c, boxShadow: c === "#ffffff" ? "inset 0 0 0 1px #d1d5db" : undefined }}
            />
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-zinc-700 shrink-0" />

        {/* Sizes */}
        <div className="flex items-center gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${size === s ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
            >
              <div className="rounded-full bg-gray-700 dark:bg-gray-300" style={{ width: s + 2, height: s + 2 }} />
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-zinc-700 shrink-0" />

        {/* Clear */}
        <button
          onClick={clearCanvas}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
          title="ล้างกระดาน"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas area */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none"
          style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
        />
      </div>
    </div>
  );
}
