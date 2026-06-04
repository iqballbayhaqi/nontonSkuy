"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Trash2, Play } from "lucide-react";
import { getWatchlist, removeFromWatchlist, type WatchlistItem } from "@/lib/storage";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(getWatchlist());
  }, []);

  function remove(slug: string) {
    removeFromWatchlist(slug);
    setItems((prev) => prev.filter((m) => m.slug !== slug));
  }

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark size={22} className="text-blue-400" />
        <h1 className="text-xl sm:text-2xl font-bold text-white">Watchlist</h1>
        <span className="text-slate-500 text-sm ml-1">({items.length} film)</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
          <Bookmark size={48} className="opacity-30" />
          <p className="text-lg">Belum ada film yang disimpan</p>
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            Jelajahi film
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
          {items.map((item) => (
            <div key={item.slug} className="group relative">
              <Link href={`/movie/${item.slug}`} className="block w-full">
                <div
                  className="relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105"
                  style={{ aspectRatio: "2/3", background: "#0d1b2a" }}
                >
                  {item.poster ? (
                    <Image src={item.poster} alt={item.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Play size={28} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.rating && (
                    <span className="absolute top-2 left-2 text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(6,13,23,0.85)", color: "#fbbf24" }}>
                      ★ {item.rating}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 group-hover:text-white transition-colors">
                  {item.title}
                </p>
                {item.meta && <p className="text-xs text-slate-500 line-clamp-1">{item.meta}</p>}
              </Link>

              {/* Tombol hapus */}
              <button
                onClick={() => remove(item.slug)}
                title="Hapus dari watchlist"
                className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(220,38,38,0.85)" }}
              >
                <Trash2 size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
