import React from "react";
import Link from "next/link";
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
  { label: "Action",      href: "/genre/action",          icon: <Swords   size={22} />, from: "#7f1d1d", to: "#dc2626" },
  { label: "Comedy",      href: "/genre/comedy",          icon: <Laugh    size={22} />, from: "#78350f", to: "#f59e0b" },
  { label: "Horror",      href: "/genre/horror",          icon: <Skull    size={22} />, from: "#2e1065", to: "#7c3aed" },
  { label: "Romance",     href: "/genre/romance",         icon: <Heart    size={22} />, from: "#831843", to: "#ec4899" },
  { label: "Sci-Fi",      href: "/genre/science-fiction", icon: <Rocket   size={22} />, from: "#1e3a8a", to: "#3b82f6" },
  { label: "Thriller",    href: "/genre/thriller",        icon: <Eye      size={22} />, from: "#0f172a", to: "#475569" },
  { label: "Drama",       href: "/genre/drama",           icon: <Sunset   size={22} />, from: "#134e4a", to: "#0d9488" },
  { label: "Fantasy",     href: "/genre/fantasy",         icon: <Sparkles size={22} />, from: "#4c1d95", to: "#8b5cf6" },
  { label: "Crime",       href: "/genre/crime",           icon: <Search   size={22} />, from: "#7c2d12", to: "#f97316" },
  { label: "Adventure",   href: "/genre/adventure",       icon: <Compass  size={22} />, from: "#14532d", to: "#22c55e" },
  { label: "Documentary", href: "/genre/documentary",     icon: <BookOpen size={22} />, from: "#1c1917", to: "#78716c" },
  { label: "Music",       href: "/genre/music",           icon: <Music    size={22} />, from: "#701a75", to: "#d946ef" },
];

const COUNTRY_FILTERS: { label: string; href: string; Flag: FlagComponent }[] = [
  { label: "USA",       href: "/country/usa",            Flag: US },
  { label: "Korea",     href: "/country/korea",          Flag: KR },
  { label: "Jepang",    href: "/country/japan",          Flag: JP },
  { label: "Indonesia", href: "/country/indonesia",      Flag: ID },
  { label: "China",     href: "/country/china",          Flag: CN },
  { label: "India",     href: "/country/india",          Flag: IN },
  { label: "UK",        href: "/country/united-kingdom", Flag: GB },
  { label: "Prancis",   href: "/country/france",         Flag: FR },
  { label: "Thailand",  href: "/country/thailand",       Flag: TH },
  { label: "Malaysia",  href: "/country/malaysia",       Flag: MY },
];

export default function QuickFilters() {
  return (
    <div className="px-4 md:px-8 mb-4 space-y-5">

      {/* Genre Cards */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Genre</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {GENRE_FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group shrink-0 relative rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10"
              style={{ width: 100, aspectRatio: "3/4" }}
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
        </div>
      </div>

      {/* Country Cards */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Negara</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {COUNTRY_FILTERS.map(({ label, href, Flag }) => (
            <Link
              key={href}
              href={href}
              className="group shrink-0 relative rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10"
              style={{ width: 100, aspectRatio: "3/4", background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Flag full bleed */}
              <div className="absolute inset-0 flex items-center justify-center p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                <Flag className="w-full rounded-sm shadow-lg" style={{ maxHeight: 54 }} />
              </div>
              {/* Bottom label */}
              <div
                className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-center"
                style={{ background: "rgba(6,13,23,0.75)", backdropFilter: "blur(4px)" }}
              >
                <span className="text-white text-xs font-semibold">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
