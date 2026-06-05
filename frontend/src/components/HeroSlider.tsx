"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "@/lib/api";

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m?.[1] ?? null;
}

const INTERVAL = 10000;

export default function HeroSlider({ movies }: { movies: Movie[] }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 450);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo((current + 1) % movies.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [current, paused, movies.length, goTo]);

  const prev = () => goTo((current - 1 + movies.length) % movies.length);
  const next = () => goTo((current + 1) % movies.length);

  const movie = movies[current];
  const slug = movie.slug || movie.link?.split("/").filter(Boolean).pop();
  const videoId = movie.trailer ? getYouTubeId(movie.trailer) : null;
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1`
    : null;

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: "70vh", minHeight: 420 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background layer */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {embedUrl ? (
          <>
            {/* Poster shows while iframe loads */}
            {movie.poster && (
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover object-top scale-110"
                priority
                unoptimized
              />
            )}
            <iframe
              key={current}
              src={embedUrl}
              allow="autoplay; encrypted-media"
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
          </>
        ) : movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover object-top scale-110 blur-sm"
            priority
            unoptimized
          />
        ) : null}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d17] via-[#060d17]/40 to-transparent" />
      <div className="hero-gradient absolute inset-0" />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16 md:pb-20 transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white"
              style={{ background: "#1d6fe8" }}
            >
              <Play size={16} fill="white" /> Tonton
            </Link>
            <Link
              href={slug ? `/movie/${slug}` : "#"}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Info size={16} /> Detail
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 right-6 md:right-16 flex gap-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? "#3b82f6" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            key={current}
            className="h-full"
            style={{
              background: "#3b82f6",
              animation: `slideProgress ${INTERVAL}ms linear`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
