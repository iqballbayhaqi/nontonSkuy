"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Film, Bookmark, History, Clock, Tv, Home, TrendingUp, Globe, Heart } from "lucide-react";
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlagComp = React.ComponentType<any>;
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
  const [menuClosing, setMenuClosing] = useState(false);
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

  function openMenu() {
    setMenuOpen(true);
    setMenuClosing(false);
  }

  function closeMenu() {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 220);
  }

  function toggleMenu() {
    if (menuOpen && !menuClosing) closeMenu();
    else openMenu();
  }

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

        {/* Desktop nav — navigasi konten */}
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

          {/* Genre dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
              Genre ▾
            </button>
            <div
              className="absolute top-full left-0 mt-1 w-44 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50"
              style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.3)" }}
            >
              {GENRES.map((g) => (
                <Link
                  key={g}
                  href={`/genre/${g}`}
                  className="block px-4 py-2 text-sm capitalize text-slate-300 hover:text-white hover:bg-blue-600/20 focus-visible:bg-blue-600/30 focus-visible:text-white focus:outline-none transition-colors"
                >
                  {g.replace("-", " ")}
                </Link>
              ))}
            </div>
          </div>

          {/* Negara dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
              Negara ▾
            </button>
            <div
              className="absolute top-full left-0 mt-1 w-44 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50"
              style={{ background: "#0d1b2a", border: "1px solid rgba(29,111,232,0.3)" }}
            >
              {NAV_COUNTRIES.map(({ label, slug, Flag }) => (
                <Link key={slug} href={`/country/${slug}`}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 focus-visible:bg-blue-600/30 focus-visible:text-white focus:outline-none transition-colors">
                  <Flag style={{ width: 20, height: 13, borderRadius: 2 }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Desktop action buttons — kanan */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/watchlist" className="p-2 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/5" title="Watchlist">
            <Bookmark size={18} />
          </Link>
          <Link href="/history" className="p-2 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/5" title="Riwayat">
            <History size={18} />
          </Link>
          <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
          <a
            href="/nontonSkuy-tv.apk"
            download="nontonSkuy-tv.apk"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff" }}
            title="Download App untuk Android TV / Google TV"
          >
            <Tv size={13} />
            TV App
          </a>
          <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
          <Link
            href={NAV_18.href}
            className="px-2.5 py-1 text-xs font-extrabold rounded transition-opacity hover:opacity-80"
            style={{ background: "#dc2626", color: "#fff" }}
          >
            {NAV_18.label}
          </Link>
        </div>

        {/* Search */}
        <div ref={searchBoxRef} className="flex items-center gap-2 relative">
          <form onSubmit={handleSearch} className="flex items-center gap-1">
            {/* Input — selalu ada, animasi width */}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowHistory(true); }}
              onFocus={() => setShowHistory(true)}
              placeholder="Cari film..."
              className="text-sm rounded-lg outline-none py-1.5 px-3 transition-all duration-300 ease-in-out"
              style={{
                width: searchOpen ? 220 : 0,
                paddingLeft: searchOpen ? 12 : 0,
                paddingRight: searchOpen ? 12 : 0,
                opacity: searchOpen ? 1 : 0,
                pointerEvents: searchOpen ? "auto" : "none",
                background: "rgba(255,255,255,0.08)",
                border: searchOpen ? "1px solid rgba(59,130,246,0.5)" : "1px solid transparent",
                color: "white",
                overflow: "hidden",
              }}
            />
            {/* X saat terbuka, Search icon saat tertutup */}
            <button
              type="button"
              onClick={() => {
                if (searchOpen) {
                  setSearchOpen(false);
                  setShowHistory(false);
                  setQuery("");
                } else {
                  setSearchOpen(true);
                }
              }}
              className="p-2 text-slate-300 hover:text-white transition-colors rounded hover:bg-white/5"
            >
              {searchOpen ? <X size={18} /> : <Search size={20} />}
            </button>
          </form>

          {/* Dropdown riwayat pencarian */}
          {showHistory && searchHistory.length > 0 && !query && searchOpen && (
            <div
              className="absolute top-full right-0 mt-1 w-64 rounded-lg py-1 z-50"
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

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: "1px solid rgba(29,111,232,0.18)",
            background: "rgba(6,13,23,0.99)",
            animation: menuClosing
              ? "navMenuOut 0.22s cubic-bezier(0.4,0,1,1) forwards"
              : "navMenuIn 0.25s cubic-bezier(0,0,0.2,1) forwards",
          }}
        >
          {/* ── Navigasi Utama ── */}
          <div className="px-3 pt-3 pb-1 flex flex-col gap-0.5">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 active:bg-white/10 transition-colors"
            >
              <Home size={18} className="text-blue-400 shrink-0" /> Beranda
            </Link>
            <Link
              href="/best-rating"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 active:bg-white/10 transition-colors"
            >
              <TrendingUp size={18} className="text-yellow-400 shrink-0" /> Terbaik
            </Link>
            <Link
              href="/watchlist"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 active:bg-white/10 transition-colors"
            >
              <Bookmark size={18} className="text-blue-400 shrink-0" /> Watchlist
            </Link>
            <Link
              href="/history"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 active:bg-white/10 transition-colors"
            >
              <History size={18} className="text-slate-400 shrink-0" /> Riwayat Tontonan
            </Link>
          </div>

          {/* ── Aksi Khusus ── */}
          <div className="px-3 py-3 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Download TV App */}
            <a
              href="/nontonSkuy-tv.apk"
              download="nontonSkuy-tv.apk"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 active:opacity-75"
              style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.25), rgba(15,118,110,0.25))", color: "#4ade80", border: "1px solid rgba(22,163,74,0.4)" }}
            >
              <Tv size={18} className="shrink-0" />
              <div>
                <div className="leading-tight">Download Android TV App</div>
                <div className="text-xs font-normal opacity-70 mt-0.5">Untuk Android TV &amp; Google TV</div>
              </div>
            </a>

            {/* 18+ dan Donasi berdampingan */}
            <div className="flex gap-2">
              <Link
                href={NAV_18.href}
                onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: "rgba(220,38,38,0.2)", color: "#f87171", border: "1px solid rgba(220,38,38,0.4)" }}
              >
                🔞 18+
              </Link>
              <Link
                href="/donasi"
                onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}
              >
                <Heart size={15} /> Donasi
              </Link>
            </div>
          </div>

          {/* ── Genre ── */}
          <div className="px-3 pb-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="px-1 pt-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Film size={11} /> Genre
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {GENRES.map((g) => (
                <Link
                  key={g}
                  href={`/genre/${g}`}
                  onClick={closeMenu}
                  className="px-2 py-2.5 rounded-lg text-xs capitalize text-center text-slate-400 hover:text-white hover:bg-white/8 active:bg-white/12 transition-colors font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {g.replace("-", " ")}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Negara ── */}
          <div className="px-3 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="px-1 pt-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Globe size={11} /> Negara
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {NAV_COUNTRIES.map(({ label, slug, Flag }) => (
                <Link
                  key={slug}
                  href={`/country/${slug}`}
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/8 active:bg-white/12 transition-colors font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Flag style={{ width: 18, height: 12, borderRadius: 2, flexShrink: 0 }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
