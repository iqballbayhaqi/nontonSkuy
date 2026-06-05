"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { History, Trash2, Play, X } from "lucide-react";
import { getHistory, removeFromHistory, clearHistory, type HistoryItem } from "@/lib/storage";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  function remove(slug: string) {
    removeFromHistory(slug);
    setItems((prev) => prev.filter((m) => m.slug !== slug));
  }

  function clear() {
    clearHistory();
    setItems([]);
  }

  function formatTime(ts: number) {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - ts;
    if (diff < 60_000) return "Baru saja";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} menit lalu`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} jam lalu`;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <History size={22} className="text-blue-400" />
        <h1 className="text-xl sm:text-2xl font-bold text-white">Riwayat Tontonan</h1>
        <span className="text-slate-500 text-sm ml-1">({items.length} film)</span>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} /> Hapus semua
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
          <History size={48} className="opacity-30" />
          <p className="text-lg">Belum ada riwayat tontonan</p>
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            Mulai menonton
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
          {items.map((item) => (
            <div key={item.slug} className="group relative">
              <Link href={`/movie/${item.slug}`} className="block w-full focus:outline-none">
                <div
                  className="relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105"
                  style={{ aspectRatio: "2/3", background: "#0d1b2a" }}
                >
                  {item.poster ? (
                    <Image src={item.poster} alt={item.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Play size={28} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity" />
                  {item.rating && (
                    <span className="absolute top-2 left-2 text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(6,13,23,0.85)", color: "#fbbf24" }}>
                      ★ {item.rating}
                    </span>
                  )}
                  {/* Focus ring */}
                  <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity"
                    style={{ boxShadow: "inset 0 0 0 3px #3b82f6" }} />
                </div>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 group-hover:text-white group-focus-within:text-white transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{formatTime(item.watchedAt)}</p>
              </Link>

              {/* Tombol hapus — muncul saat hover atau group focus */}
              <button
                onClick={() => remove(item.slug)}
                title="Hapus dari riwayat"
                className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus-visible:opacity-100"
                style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X size={12} className="text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
