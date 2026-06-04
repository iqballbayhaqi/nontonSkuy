"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Film, Bookmark, History, Clock } from "lucide-react";
import {
  getSearchHistory,
  addToSearchHistory,
  removeFromSearchHistory,
} from "@/lib/storage";
import US from "country-flag-icons/react/3x2/US";
import KR from "country-flag-icons/react/3x2/KR";
import JP from "country-flag-icons/react/3x2/JP";
import ID from "country-flag-icons/react/3x2/ID";
import CN from "country-flag-icons/react/3x2/CN";
import IN from "country-flag-icons/react/3x2/IN";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";
import TH from "country-flag-icons/react/3x2/TH";
import type { ComponentType, SVGProps } from "react";

type FlagComp = ComponentType<SVGProps<SVGSVGElement>>;
const NAV_COUNTRIES: { label: string; slug: string; Flag: FlagComp }[] = [
  { label: "USA",       slug: "usa",            Flag: US },
  { label: "Korea",     slug: "korea",          Flag: KR },
  { label: "Jepang",    slug: "japan",          Flag: JP },
  { label: "Indonesia", slug: "indonesia",      Flag: ID },
  { label: "China",     slug: "china",          Flag: CN },
  { label: "India",     slug: "india",          Flag: IN },
  { label: "UK",        slug: "united-kingdom", Flag: GB },
  { label: "Prancis",   slug: "france",         Flag: FR },
  { label: "Thailand",  slug: "thailand",       Flag: TH },
];

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Terbaik", href: "/best-rating" },
];

const NAV_18 = { label: "18+", href: "/dewasa" };

const GENRES = ["action", "adventure", "comedy", "crime", "drama", "fantasy", "horror", "mystery", "romance", "science-fiction", "thriller"];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      setSearchHistory(getSearchHistory());
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  }, [searchOpen]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    addToSearchHistory(q);
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setShowHistory(false);
    setQuery("");
  }

  function pickHistory(q: string) {
    addToSearchHistory(q);
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setShowHistory(false);
    setQuery("");
  }

  function deleteHistory(q: string, e: React.MouseEvent) {
    e.stopPropagation();
    removeFromSearchHistory(q);
    setSearchHistory(getSearchHistory());
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "linear-gradient(to bottom, rgba(6,13,23,0.98) 0%, rgba(6,13,23,0.95) 100%)"
          : "linear-gradient(to bottom, rgba(6,13,23,0.9) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,111,232,0.15)" : "none",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Film size={26} className="text-blue-400" />
          <span className="text-xl font-extrabold tracking-tight" style={{ color: "#3b82f6" }}>
            nonton<span className="text-white">Skuy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded transition-colors hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/watchlist" className="p-2 text-slate-300 hover:text-white transition-colors" title="Watchlist">
            <Bookmark size={18} />
          </Link>
          <Link href="/history" className="p-2 text-slate-300 hover:text-white transition-colors" title="Riwayat">
            <History size={18} />
          </Link>
          <Link
            href={NAV_18.href}
            className="px-2.5 py-1 text-xs font-extrabold rounded transition-opacity hover:opacity-80"
            style={{ background: "#dc2626", color: "#fff" }}
          >
            {NAV_18.label}
          </Link>
          {/* Genre dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded transition-colors hover:bg-white/5">
              Genre ▾
            </button>
            <div
              className="absolute top-full left-0 mt-1 w-44 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.3)" }}
            >
              {GENRES.map((g) => (
                <Link
                  key={g}
                  href={`/genre/${g}`}
                  className="block px-4 py-2 text-sm capitalize text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors"
                >
                  {g.replace("-", " ")}
                </Link>
              ))}
            </div>
          </div>

          {/* Negara dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded transition-colors hover:bg-white/5">
              Negara ▾
            </button>
            <div
              className="absolute top-full left-0 mt-1 w-44 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.3)" }}
            >
              {NAV_COUNTRIES.map(({ label, slug, Flag }) => (
                <Link key={slug} href={`/country/${slug}`}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors">
                  <Flag style={{ width: 20, height: 13, borderRadius: 2 }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div ref={searchBoxRef} className="relative flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowHistory(true); }}
                  onFocus={() => setShowHistory(true)}
                  placeholder="Cari film..."
                  className="px-3 py-1.5 text-sm rounded-lg outline-none w-48 md:w-64"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(59,130,246,0.5)",
                    color: "white",
                  }}
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setShowHistory(false); }}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </form>

              {/* Dropdown riwayat pencarian */}
              {showHistory && searchHistory.length > 0 && !query && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 rounded-lg py-1 z-50"
                  style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.3)" }}
                >
                  <p className="px-3 py-1.5 text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock size={11} /> Pencarian terbaru
                  </p>
                  {searchHistory.map((q) => (
                    <div
                      key={q}
                      onClick={() => pickHistory(q)}
                      className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-blue-600/20 transition-colors"
                    >
                      <span className="text-sm text-slate-300 flex items-center gap-2">
                        <Search size={12} className="text-slate-500" /> {q}
                      </span>
                      <button
                        onClick={(e) => deleteHistory(q, e)}
                        className="text-slate-600 hover:text-slate-300"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-1 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(29,111,232,0.15)", background: "rgba(6,13,23,0.98)" }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/watchlist"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Bookmark size={15} /> Watchlist
          </Link>
          <Link
            href="/history"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <History size={15} /> Riwayat Tontonan
          </Link>
          <Link
            href={NAV_18.href}
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm font-extrabold rounded transition-opacity hover:opacity-80 w-fit"
            style={{ background: "#dc2626", color: "#fff" }}
          >
            {NAV_18.label}
          </Link>
          <div className="mt-1 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="px-3 text-xs text-slate-500 mb-1 uppercase tracking-wider">Genre</p>
            <div className="grid grid-cols-2 gap-1">
              {GENRES.map((g) => (
                <Link
                  key={g}
                  href={`/genre/${g}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 text-sm capitalize text-slate-400 hover:text-white rounded hover:bg-white/5"
                >
                  {g.replace("-", " ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
