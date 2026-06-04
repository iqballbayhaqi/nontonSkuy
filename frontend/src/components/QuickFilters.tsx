import React from "react";
import Link from "next/link";
import ScrollableRow from "./ScrollableRow";
import {
  Swords, Laugh, Skull, Heart, Rocket, Eye,
  Sparkles, Search, BookOpen, Compass, Music, Sunset,
} from "lucide-react";
import US from "country-flag-icons/react/3x2/US";
import KR from "country-flag-icons/react/3x2/KR";
import JP from "country-flag-icons/react/3x2/JP";
import ID from "country-flag-icons/react/3x2/ID";
import CN from "country-flag-icons/react/3x2/CN";
import IN from "country-flag-icons/react/3x2/IN";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";
import TH from "country-flag-icons/react/3x2/TH";
import MY from "country-flag-icons/react/3x2/MY";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlagComponent = React.ComponentType<any>;

const GENRE_FILTERS = [
  { label: "Action",      href: "/genre/action",          icon: <Swords   size={32} />, from: "#7f1d1d", to: "#dc2626" },
  { label: "Comedy",      href: "/genre/comedy",          icon: <Laugh    size={32} />, from: "#78350f", to: "#f59e0b" },
  { label: "Horror",      href: "/genre/horror",          icon: <Skull    size={32} />, from: "#2e1065", to: "#7c3aed" },
  { label: "Romance",     href: "/genre/romance",         icon: <Heart    size={32} />, from: "#831843", to: "#ec4899" },
  { label: "Sci-Fi",      href: "/genre/science-fiction", icon: <Rocket   size={32} />, from: "#1e3a8a", to: "#3b82f6" },
  { label: "Thriller",    href: "/genre/thriller",        icon: <Eye      size={32} />, from: "#0f172a", to: "#475569" },
  { label: "Drama",       href: "/genre/drama",           icon: <Sunset   size={32} />, from: "#134e4a", to: "#0d9488" },
  { label: "Fantasy",     href: "/genre/fantasy",         icon: <Sparkles size={32} />, from: "#4c1d95", to: "#8b5cf6" },
  { label: "Crime",       href: "/genre/crime",           icon: <Search   size={32} />, from: "#7c2d12", to: "#f97316" },
  { label: "Adventure",   href: "/genre/adventure",       icon: <Compass  size={32} />, from: "#14532d", to: "#22c55e" },
  { label: "Documentary", href: "/genre/documentary",     icon: <BookOpen size={32} />, from: "#1c1917", to: "#78716c" },
  { label: "Music",       href: "/genre/music",           icon: <Music    size={32} />, from: "#701a75", to: "#d946ef" },
];

const COUNTRY_FILTERS: { label: string; href: string; Flag: FlagComponent; bg?: string }[] = [
  { label: "USA",       href: "/country/usa",            Flag: US, bg: "https://images.unsplash.com/photo-1576606970009-7ddc4229ced7?q=80&w=400&auto=format&fit=crop" },
  { label: "Korea",     href: "/country/korea",          Flag: KR, bg: "https://images.unsplash.com/photo-1448523183439-d2ac62aca997?q=80&w=400&auto=format&fit=crop" },
  { label: "Jepang",    href: "/country/japan",          Flag: JP, bg: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d?q=80&w=400&auto=format&fit=crop" },
  { label: "Indonesia", href: "/country/indonesia",      Flag: ID, bg: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=400&auto=format&fit=crop" },
  { label: "China",     href: "/country/china",          Flag: CN, bg: "https://images.unsplash.com/photo-1569165755139-296fac054979?q=80&w=400&auto=format&fit=crop" },
  { label: "India",     href: "/country/india",          Flag: IN, bg: "https://images.unsplash.com/photo-1532664189809-02133fee698d?q=80&w=400&auto=format&fit=crop" },
  { label: "UK",        href: "/country/united-kingdom", Flag: GB, bg: "https://images.unsplash.com/photo-1569865867048-34cfce8d58fe?q=80&w=400&auto=format&fit=crop" },
  { label: "Prancis",   href: "/country/france",         Flag: FR, bg: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=400&auto=format&fit=crop" },
  { label: "Thailand",  href: "/country/thailand",       Flag: TH, bg: "https://images.unsplash.com/photo-1582468546235-9bf31e5bc4a1?q=80&w=400&auto=format&fit=crop" },
  { label: "Malaysia",  href: "/country/malaysia",       Flag: MY, bg: "https://images.unsplash.com/photo-1597148543182-830ef7bbb904?q=80&w=400&auto=format&fit=crop" },
];

export default function QuickFilters() {
  return (
    <div className="px-4 md:px-8 mb-4 space-y-5">

      {/* Genre Cards */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Genre</p>
        <ScrollableRow>
          {GENRE_FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group shrink-0 relative rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10 w-[110px] md:w-[179px]"
              style={{ aspectRatio: "2/3" }}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${f.from} 0%, ${f.to} 100%)` }}
              />
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              {/* Icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
                <span className="text-white opacity-90 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </span>
                <span className="text-white text-xs font-semibold text-center leading-tight drop-shadow">
                  {f.label}
                </span>
              </div>
              {/* Shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }}
              />
            </Link>
          ))}
        </ScrollableRow>
      </div>

      {/* Country Cards */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Negara</p>
        <ScrollableRow>
          {COUNTRY_FILTERS.map(({ label, href, Flag, bg }) => (
            <Link
              key={href}
              href={href}
              className="group shrink-0 relative rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10 w-[110px] md:w-[179px]"
              style={{ aspectRatio: "2/3", background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {bg ? (
                /* Background image mode */
                <>
                  <img
                    src={bg}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,23,0.85) 0%, rgba(6,13,23,0.2) 50%, transparent 100%)" }} />
                  {/* Flag badge kecil di kiri atas */}
                  <div className="absolute top-2 left-2">
                    <Flag style={{ width: 24, height: 16, borderRadius: 3 }} className="shadow-md" />
                  </div>
                  {/* Label di bawah */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-2 text-center">
                    <span className="text-white text-xs font-bold drop-shadow">{label}</span>
                  </div>
                </>
              ) : (
                /* Flag fallback mode */
                <>
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 flex items-center justify-center px-3 pt-3">
                      <Flag className="w-full rounded-sm shadow-lg" />
                    </div>
                    <div className="px-2 py-2 text-center" style={{ background: "rgba(6,13,23,0.75)", backdropFilter: "blur(4px)" }}>
                      <span className="text-white text-xs font-semibold">{label}</span>
                    </div>
                  </div>
                </>
              )}
            </Link>
          ))}
        </ScrollableRow>
      </div>

    </div>
  );
}
