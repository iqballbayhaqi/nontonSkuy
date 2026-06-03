"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/api";

interface Props {
  initialMovies: Movie[];
  initialHasNext: boolean;
  apiPath: string;
}

export default function InfiniteMovieGrid({ initialMovies, initialHasNext, apiPath }: Props) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasNext) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const sep = apiPath.includes("?") ? "&" : "?";
      const res = await fetch(`${API}${apiPath}${sep}page=${page}`);
      const json = await res.json();
      setMovies((prev) => [...prev, ...json.data.movies]);
      setHasNext(!!json.data.pagination.next);
      setPage((p) => p + 1);
    } catch (err) {
      console.error("infinite scroll fetch failed:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasNext, page, apiPath]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "300px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
        {movies.map((m, i) => (
          <MovieCard key={`${m.slug ?? m.title}-${i}`} movie={m} />
        ))}
      </div>

      <div ref={sentinelRef} className="flex items-center justify-center h-20 mt-4">
        {loading && (
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <div
              className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#1d6fe8", borderTopColor: "transparent" }}
            />
            Memuat film...
          </div>
        )}
        {!hasNext && movies.length > 0 && !loading && (
          <p className="text-slate-600 text-xs">Semua film sudah ditampilkan</p>
        )}
      </div>
    </>
  );
}
