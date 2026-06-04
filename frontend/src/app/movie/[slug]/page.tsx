import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Globe, Calendar, Play } from "lucide-react";
import { api } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";
import MovieCard from "@/components/MovieCard";
import WatchlistButton from "@/components/WatchlistButton";
import HistoryRecorder from "@/components/HistoryRecorder";

function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const movie = await api.detail(slug).catch(() => null);
  return { title: movie ? `${movie.title} – nontonSkuy` : "nontonSkuy" };
}

export default async function MoviePage({ params }: Props) {
  const { slug } = await params;
  const movie = await api.detail(slug);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero backdrop */}
      <div className="relative w-full overflow-hidden" style={{ height: "50vh", minHeight: 300 }}>
        {getYouTubeId(movie.trailer) ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(movie.trailer)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(movie.trailer)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full scale-110"
            style={{ border: "none", opacity: 0.6 }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover object-top blur-sm scale-110 opacity-40"
            unoptimized
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d17] via-[#060d17]/70 to-[#060d17]/40" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="flex gap-6 md:gap-10 flex-col md:flex-row">
          {/* Poster */}
          <div className="shrink-0">
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{
                width: 180,
                aspectRatio: "2/3",
                background: "#0d1b2a",
                boxShadow: "0 0 40px rgba(29,111,232,0.2)",
              }}
            >
              {movie.poster ? (
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={180}
                  height={270}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <Play size={40} />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              {movie.title}
            </h1>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.rating && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}
                >
                  <Star size={11} fill="currentColor" />
                  {movie.rating.score} / {movie.rating.maxScore}
                  {movie.rating.votes && <span className="text-yellow-600">({movie.rating.votes} votes)</span>}
                </span>
              )}
              {movie.meta.durasi && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8" }}
                >
                  <Clock size={11} /> {movie.meta.durasi}
                </span>
              )}
              {movie.meta.tahun && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8" }}
                >
                  <Calendar size={11} /> {movie.meta.tahun}
                </span>
              )}
              {movie.meta.rating && (
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(29,111,232,0.2)", color: "#60a5fa" }}
                >
                  {movie.meta.rating}
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((g) => (
                  <Link
                    key={g}
                    href={`/genre/${g.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                    style={{ background: "rgba(29,111,232,0.15)", color: "#60a5fa", border: "1px solid rgba(29,111,232,0.3)" }}
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}

            {/* Description */}
            {movie.description && (
              <p className="text-slate-300 text-sm leading-relaxed mb-5 max-w-2xl">
                {movie.description}
              </p>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {movie.directors.length > 0 && (
                <div>
                  <p className="text-slate-500 text-xs mb-1">Sutradara</p>
                  <div className="flex flex-wrap gap-1">
                    {movie.directors.map((d) => (
                      <span key={d.url} className="text-slate-200">{d.name}</span>
                    ))}
                  </div>
                </div>
              )}
              {movie.countries.length > 0 && (
                <div>
                  <p className="text-slate-500 text-xs mb-1">Negara</p>
                  <p className="text-slate-200 flex items-center gap-1">
                    <Globe size={12} className="text-slate-500" />
                    {movie.countries.join(", ")}
                  </p>
                </div>
              )}
              {movie.meta.bahasa && (
                <div>
                  <p className="text-slate-500 text-xs mb-1">Bahasa</p>
                  <p className="text-slate-200">{movie.meta.bahasa}</p>
                </div>
              )}
              {movie.meta.rilis && (
                <div>
                  <p className="text-slate-500 text-xs mb-1">Rilis</p>
                  <p className="text-slate-200">{movie.meta.rilis}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Watchlist button + history recorder */}
        <div className="mt-5 flex gap-3 flex-wrap">
          <WatchlistButton
            movie={{
              slug,
              title: movie.title,
              poster: movie.poster,
              rating: movie.rating ? String(movie.rating.score) : null,
              meta: Object.entries(movie.meta).map(([, v]) => v).slice(0, 2).join(" · ") || null,
            }}
          />
        </div>
        <HistoryRecorder
          movie={{
            slug,
            title: movie.title,
            poster: movie.poster,
            rating: movie.rating ? String(movie.rating.score) : null,
            meta: Object.entries(movie.meta).map(([, v]) => v).slice(0, 2).join(" · ") || null,
          }}
        />


        {/* Video Player */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-white mb-4">Tonton Film</h2>
          <VideoPlayer servers={movie.servers} poster={movie.poster} />
        </div>

        {/* Cast */}
        {movie.cast.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-bold text-white mb-3">Pemeran</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((c) => {
                const castSlug = c.url.split("/cast/")[1]?.replace(/\/$/, "");
                return (
                  <Link
                    key={c.url}
                    href={castSlug ? `/cast/${castSlug}` : c.url}
                    className="px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-blue-600/20 hover:text-blue-400"
                    style={{ background: "#0d1b2a", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related */}
        {movie.related.length > 0 && (
          <div className="mt-12 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Film Terkait</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {movie.related.map((r) => {
                const relSlug = r.link.split("/").filter(Boolean).pop() || "";
                return (
                  <Link key={r.link} href={`/movie/${relSlug}`} className="group block">
                    <div
                      className="relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105"
                      style={{ aspectRatio: "2/3", background: "#0d1b2a" }}
                    >
                      {r.poster && (
                        <Image
                          src={r.poster}
                          alt={r.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      <div className="card-bottom-gradient absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 group-hover:text-white transition-colors">
                      {r.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
