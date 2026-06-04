"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { History } from "lucide-react";
import { getHistory, type HistoryItem } from "@/lib/storage";
import MovieCard from "./MovieCard";

export default function ContinueWatchingRow() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory().slice(0, 12));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="px-4 md:px-8 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <History size={16} className="text-blue-400" />
        <h2 className="text-base font-bold text-white">Lanjut Nonton</h2>
        <Link href="/history" className="ml-auto text-xs text-slate-500 hover:text-blue-400 transition-colors">
          Lihat semua
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <div key={item.slug} className="shrink-0" style={{ width: 140 }}>
            <MovieCard
              movie={{
                slug: item.slug,
                title: item.title,
                poster: item.poster,
                rating: item.rating,
                meta: item.meta,
                link: `/movie/${item.slug}`,
                trailer: null,
              }}
              width={140}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
