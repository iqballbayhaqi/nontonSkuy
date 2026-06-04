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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasNext);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  // Pakai ref agar loadMore tidak recreate tiap page berubah
  const pageRef = useRef(2);
  const hasNextRef = useRef(initialHasNext);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasNextRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const sep = apiPath.includes("?") ? "&" : "?";
      const res = await fetch(`${API}${apiPath}${sep}page=${pageRef.current}`);
      const json = await res.json();
      const incoming: Movie[] = json.data.movies ?? [];
      const next = !!json.data.pagination.next;

      setMovies((prev) => {
        const seen = new Set(prev.map((m) => m.slug ?? m.title));
        const unique = incoming.filter((m) => !seen.has(m.slug ?? m.title));
        return [...prev, ...unique];
      });

      hasNextRef.current = next;
      setHasMore(next);
      pageRef.current += 1;
    } catch (err) {
      console.error("infinite scroll fetch failed:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [apiPath]); // apiPath stabil → loadMore stabil → observer hanya dibuat sekali

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
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
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
        {!hasMore && movies.length > 0 && !loading && (
          <p className="text-slate-600 text-xs">Semua film sudah ditampilkan</p>
        )}
      </div>
    </>
  );
}
