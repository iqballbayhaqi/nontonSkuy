"use client";
import { useState } from "react";
import type { Server } from "@/lib/api";

interface Props {
  servers: Server[];
  poster?: string | null;
}

export default function VideoPlayer({ servers, poster }: Props) {
  const [active, setActive] = useState(0);
  const current = servers[active];

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
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <p>Server tidak tersedia</p>
            </div>
          )}
        </div>
      </div>

      {/* Server tabs */}
      {servers.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {servers.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
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
  );
}
