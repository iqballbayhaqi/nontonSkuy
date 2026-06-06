"use client";
import { useState, useEffect, useRef } from "react";
import { PictureInPicture2, Loader2 } from "lucide-react";
import type { Server, StreamResolved } from "@/lib/api";
import { api } from "@/lib/api";
import { usePip } from "@/context/PipContext";
import HlsPlayer from "./HlsPlayer";

interface Props {
  servers: Server[];
  poster?: string | null;
  title?: string;
}

function isPlayerp2p(url: string | null): boolean {
  if (!url) return false;
  try { return new URL(url).hostname.includes("playerp2p"); } catch { return false; }
}

export default function VideoPlayer({ servers, poster, title }: Props) {
  const [active, setActive] = useState(0);
  const [resolved, setResolved] = useState<StreamResolved | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setPip } = usePip();
  const current = servers[active];
  const resolveCache = useRef<Record<string, StreamResolved>>({});

  useEffect(() => {
    if (!isPlayerp2p(current?.embedUrl)) {
      setResolved(null);
      setError(false);
      return;
    }
    const url = current.embedUrl!;
    if (resolveCache.current[url]) {
      setResolved(resolveCache.current[url]);
      return;
    }
    setResolved(null);
    setError(false);
    setLoading(true);
    api
      .stream(url)
      .then((data) => {
        resolveCache.current[url] = data;
        setResolved(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [active, current?.embedUrl]);

  function activatePip() {
    if (!current?.embedUrl) return;
    setPip({
      embedUrl: current.embedUrl,
      streamUrl: resolved?.streamUrl ?? null,
      title,
      poster: resolved?.poster ?? poster,
    });
  }

  const streamSrc = resolved?.streamUrl ?? null;
  const playerPoster = resolved?.poster ?? poster;

  return (
    <div>
      <div className="relative">
        {playerPoster && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl scale-105 opacity-60"
            style={{
              backgroundImage: `url(${playerPoster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(32px) saturate(2.5) brightness(0.8)",
              zIndex: 0,
              transform: "scale(1.08)",
              transition: "opacity 0.6s ease",
            }}
          />
        )}

        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ aspectRatio: "16/9", background: "#000", zIndex: 1 }}
        >
          {loading && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 size={32} className="animate-spin" />
              <span className="text-sm">Memuat stream…</span>
            </div>
          )}

          {!loading && error && (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
              Gagal memuat stream
            </div>
          )}

          {!loading && !error && isPlayerp2p(current?.embedUrl) && streamSrc && (
            <HlsPlayer src={streamSrc} poster={playerPoster} />
          )}

          {!loading && !error && !isPlayerp2p(current?.embedUrl) && current?.embedUrl && (
            <iframe
              key={current.embedUrl}
              src={current.embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
              frameBorder="0"
            />
          )}

          {!loading && !current?.embedUrl && (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <p>Server tidak tersedia</p>
            </div>
          )}
        </div>
      </div>

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
  );
}
