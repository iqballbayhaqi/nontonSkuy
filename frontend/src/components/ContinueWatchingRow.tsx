"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { History } from "lucide-react";
import { getHistory, type HistoryItem } from "@/lib/storage";

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
          <Link
            key={item.slug}
            href={`/movie/${item.slug}`}
            className="group shrink-0"
            style={{ width: 120 }}
          >
            <div
              className="relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105"
              style={{ aspectRatio: "2/3", background: "#0d1b2a" }}
            >
              {item.poster && (
                <Image src={item.poster} alt={item.title} fill className="object-cover" unoptimized />
              )}
              {/* Gradient + play overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 group-hover:text-white transition-colors">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
