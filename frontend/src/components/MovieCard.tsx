import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import type { Movie } from "@/lib/api";

interface Props {
  movie: Movie;
  width?: number;
}

export default function MovieCard({ movie, width }: Props) {
  const slug = movie.slug || movie.link?.split("/").filter(Boolean).pop();
  const href = slug ? `/movie/${slug}` : "#";

  return (
    <Link
      href={href}
      className={`group block${width ? "" : " w-full"}`}
      style={width ? { width } : undefined}
    >
      <div
        className="relative overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105 group-hover:z-10"
        style={{
          background: "#0d1b2a",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          aspectRatio: "2/3",
        }}
      >
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            sizes={width ? `${width}px` : "(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 14vw"}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600">
            <Play size={32} />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="card-bottom-gradient absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Rating badge */}
        {movie.rating && (
          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold"
            style={{ background: "rgba(6,13,23,0.85)", color: "#fbbf24" }}
          >
            <Star size={10} fill="currentColor" />
            {movie.rating}
          </div>
        )}

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(29,111,232,0.9)" }}
          >
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Title */}
      <p className="mt-2 text-xs text-slate-300 line-clamp-2 group-hover:text-white transition-colors">
        {movie.title}
      </p>
      {movie.meta && (
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{movie.meta}</p>
      )}
    </Link>
  );
}
