"use client";
import { useEffect, useRef, useState } from "react";
import { X, GripHorizontal, Maximize2 } from "lucide-react";
import { usePip } from "@/context/PipContext";
import { useRouter } from "next/navigation";

export default function MiniPlayer() {
  const { pip, clearPip } = usePip();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Reset posisi ke kanan bawah saat pip muncul
  useEffect(() => {
    if (pip) {
      setPos({
        x: window.innerWidth  - 340 - 16,
        y: window.innerHeight - 210 - 16,
      });
    }
  }, [pip?.embedUrl]);

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.current) return;
    setPos({
      x: Math.max(0, Math.min(e.clientX - offset.current.x, window.innerWidth  - 340)),
      y: Math.max(0, Math.min(e.clientY - offset.current.y, window.innerHeight - 210)),
    });
  }

  function onMouseUp() {
    dragging.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  if (!pip) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[9999] shadow-2xl rounded-xl overflow-hidden"
      style={{
        width: 340,
        height: 210,
        left: pos.x,
        top: pos.y,
        border: "1px solid rgba(29,111,232,0.4)",
        background: "#000",
      }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1 z-10 cursor-grab active:cursor-grabbing"
        style={{ background: "rgba(6,13,23,0.85)" }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <GripHorizontal size={14} className="text-slate-500 shrink-0" />
          <span className="text-xs text-slate-300 truncate">{pip.title ?? "Mini Player"}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {pip.title && (
            <button
              onClick={() => { clearPip(); router.push(`/movie/${pip.embedUrl}`); }}
              title="Buka halaman film"
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <Maximize2 size={13} />
            </button>
          )}
          <button
            onClick={clearPip}
            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Iframe */}
      <iframe
        src={pip.embedUrl}
        className="w-full h-full"
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
        style={{ border: "none" }}
      />
    </div>
  );
}
