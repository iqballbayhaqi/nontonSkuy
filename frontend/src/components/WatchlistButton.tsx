"use client";
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isInWatchlist, toggleWatchlist, type StoredMovie } from "@/lib/storage";

interface Props {
  movie: StoredMovie;
  className?: string;
}

export default function WatchlistButton({ movie, className = "" }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWatchlist(movie.slug));
  }, [movie.slug]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    const next = toggleWatchlist(movie);
    setSaved(next);
  }

  return (
    <button
      onClick={handleClick}
      title={saved ? "Hapus dari Watchlist" : "Simpan ke Watchlist"}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${className}`}
      style={
        saved
          ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.4)" }
          : { background: "rgba(255,255,255,0.07)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }
      }
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Tersimpan" : "Simpan"}
    </button>
  );
}
