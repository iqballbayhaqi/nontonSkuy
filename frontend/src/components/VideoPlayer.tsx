"use client";
import { useState } from "react";
import { PictureInPicture2 } from "lucide-react";
import type { Server } from "@/lib/api";
import { usePip } from "@/context/PipContext";

interface Props {
  servers: Server[];
  poster?: string | null;
  title?: string;
}

export default function VideoPlayer({ servers, poster, title }: Props) {
  const [active, setActive] = useState(0);
  const { setPip } = usePip();
  const current = servers[active];

  function activatePip() {
    if (!current?.embedUrl) return;
    setPip({ embedUrl: current.embedUrl, title, poster });
  }

  return (
    <div>
      {/* Player dengan ambient glow */}
      <div className="relative">
        {/* Ambient layer — poster diblur ekstrem sebagai glow di sekeliling player */}
        {poster && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl scale-105 opacity-60"
            style={{
              backgroundImage: `url(${poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(32px) saturate(2.5) brightness(0.8)",
              zIndex: 0,
              transform: "scale(1.08)",
              transition: "opacity 0.6s ease",
            }}
          />
        )}

        {/* Player frame di atas ambient */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ aspectRatio: "16/9", background: "#000", zIndex: 1 }}
        >
          {current?.embedUrl ? (
            <iframe
              key={current.embedUrl}
              src={current.embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-fullscreen allow-presentation"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <p>Server tidak tersedia</p>
            </div>
          )}
        </div>
      </div>

      {/* Server tabs + PiP button */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {current?.embedUrl && (
          <button
            onClick={activatePip}
            title="Mini Player"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors ml-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <PictureInPicture2 size={14} /> Mini Player
          </button>
        )}
      </div>
      {servers.length > 1 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {servers.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              style={
                active === i
                  ? { background: "#1d6fe8", color: "white" }
                  : {
                      background: "rgba(255,255,255,0.07)",
                      color: "#94a3b8",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {s.server}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
