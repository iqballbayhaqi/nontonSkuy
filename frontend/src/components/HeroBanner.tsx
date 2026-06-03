import Link from "next/link";
import Image from "next/image";
import { Play, Info, Star } from "lucide-react";
import type { Movie } from "@/lib/api";

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m?.[1] ?? null;
}

export default function HeroBanner({ movie }: { movie: Movie }) {
  const slug = movie.slug || movie.link?.split("/").filter(Boolean).pop();
  const videoId = movie.trailer ? getYouTubeId(movie.trailer) : null;

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1`
    : null;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "70vh", minHeight: 400 }}>
      {/* Trailer video background */}
      {embedUrl ? (
        <div className="absolute inset-0">
          <iframe
            src={embedUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            frameBorder="0"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "177.78vh",
              minWidth: "100%",
              height: "56.25vw",
              minHeight: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      ) : movie.poster ? (
        /* Fallback: poster image if no trailer */
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover object-top scale-110 blur-[1px]"
          priority
          unoptimized
        />
      ) : null}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d17] via-[#060d17]/40 to-transparent" />
      <div className="hero-gradient absolute inset-0" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16 md:pb-20">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg leading-tight">
            {movie.title}
          </h1>

          {movie.meta && (
            <p className="text-sm text-slate-300 mb-4 flex items-center gap-2 flex-wrap">
              {movie.rating && (
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Star size={13} fill="currentColor" /> {movie.rating}
                </span>
              )}
              <span>{movie.meta}</span>
            </p>
          )}

          <div className="flex gap-3 flex-wrap">
            <Link
              href={slug ? `/movie/${slug}` : "#"}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "#1d6fe8" }}
            >
              <Play size={16} fill="white" />
              Tonton
            </Link>
            <Link
              href={slug ? `/movie/${slug}` : "#"}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Info size={16} />
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
