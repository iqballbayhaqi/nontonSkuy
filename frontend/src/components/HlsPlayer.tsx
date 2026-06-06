"use client";
import { useEffect, useRef } from "react";

interface Props {
  src: string;
  poster?: string | null;
  autoPlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function HlsPlayer({ src, poster, autoPlay = true, className, style }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Native HLS (Safari/iOS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    let hls: import("hls.js").default | null = null;

    import("hls.js").then(({ default: Hls }) => {
      if (!Hls.isSupported()) return;
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    });

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster ?? undefined}
      controls
      autoPlay={autoPlay}
      playsInline
      className={className}
      style={{ width: "100%", height: "100%", background: "#000", ...style }}
    />
  );
}
