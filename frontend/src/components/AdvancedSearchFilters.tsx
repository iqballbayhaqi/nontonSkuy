"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  GENRE_OPTIONS, YEAR_OPTIONS, COUNTRY_OPTIONS,
  QUALITY_OPTIONS, ORDERBY_OPTIONS, TYPE_OPTIONS,
} from "@/lib/filterOptions";

interface Filters {
  q: string;
  post_type: string;
  orderby: string;
  genre: string;
  year: string;
  country: string;
  quality: string;
}

interface Props {
  initial: Partial<Filters>;
}

const selectStyle: React.CSSProperties = {
  background: "#0d1b2a",
  border: "1px solid rgba(59,130,246,0.25)",
  color: "#cbd5e1",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 13,
  width: "100%",
  outline: "none",
  appearance: "auto",
};

export default function AdvancedSearchFilters({ initial }: Props) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    q:         initial.q         ?? "",
    post_type: initial.post_type ?? "",
    orderby:   initial.orderby   ?? "",
    genre:     initial.genre     ?? "",
    year:      initial.year      ?? "",
    country:   initial.country   ?? "",
    quality:   initial.quality   ?? "",
  });
  const [open, setOpen] = useState(true);

  function set(key: keyof Filters, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function reset() {
    const empty: Filters = { q: "", post_type: "", orderby: "", genre: "", year: "", country: "", quality: "" };
    setFilters(empty);
    router.push("/advanced-search");
  }

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const qs = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) qs.set(k, v); });
    router.push(`/advanced-search?${qs.toString()}`);
  }

  const activeCount = Object.values(filters).filter((v) => v).length;

  return (
    <div
      className="rounded-xl mb-6 overflow-hidden"
      style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.2)" }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-white hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-sm">
          <SlidersHorizontal size={16} className="text-blue-400" />
          Filter Pencarian
          {activeCount > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "#1d6fe8" }}
            >
              {activeCount}
            </span>
          )}
        </span>
        <span className="text-slate-500 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <form onSubmit={apply} className="px-5 pb-5">
          {/* Search input */}
          <div className="mb-4">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={filters.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Cari judul film..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none text-white placeholder-slate-500"
                style={{ background: "#060d17", border: "1px solid rgba(59,130,246,0.25)" }}
              />
            </div>
          </div>

          {/* Filter grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Tipe</label>
              <select style={selectStyle} value={filters.post_type} onChange={(e) => set("post_type", e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Genre</label>
              <select style={selectStyle} value={filters.genre} onChange={(e) => set("genre", e.target.value)}>
                {GENRE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Tahun</label>
              <select style={selectStyle} value={filters.year} onChange={(e) => set("year", e.target.value)}>
                {YEAR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Negara</label>
              <select style={selectStyle} value={filters.country} onChange={(e) => set("country", e.target.value)}>
                {COUNTRY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Kualitas</label>
              <select style={selectStyle} value={filters.quality} onChange={(e) => set("quality", e.target.value)}>
                {QUALITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Urutkan</label>
              <select style={selectStyle} value={filters.orderby} onChange={(e) => set("orderby", e.target.value)}>
                {ORDERBY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#1d6fe8" }}
            >
              <Search size={14} /> Cari
            </button>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <X size={14} /> Reset
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
