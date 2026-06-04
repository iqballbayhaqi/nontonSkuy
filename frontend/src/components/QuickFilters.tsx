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
  { label: "Action",      href: "/genre/action",          icon: <Swords   size={28} />, from: "#7f1d1d", to: "#dc2626", bg: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop" },
  { label: "Comedy",      href: "/genre/comedy",          icon: <Laugh    size={28} />, from: "#78350f", to: "#f59e0b", bg: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=400&auto=format&fit=crop" },
  { label: "Horror",      href: "/genre/horror",          icon: <Skull    size={28} />, from: "#2e1065", to: "#7c3aed", bg: "https://images.unsplash.com/photo-1567263361507-83f755d9fa97?q=80&w=400&auto=format&fit=crop" },
  { label: "Romance",     href: "/genre/romance",         icon: <Heart    size={28} />, from: "#831843", to: "#ec4899", bg: "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?q=80&w=400&auto=format&fit=crop" },
  { label: "Sci-Fi",      href: "/genre/science-fiction", icon: <Rocket   size={28} />, from: "#1e3a8a", to: "#3b82f6", bg: "https://images.unsplash.com/photo-1693495430456-25c0a37ec5dc?q=80&w=400&auto=format&fit=crop" },
  { label: "Thriller",    href: "/genre/thriller",        icon: <Eye      size={28} />, from: "#0f172a", to: "#475569", bg: "https://images.unsplash.com/photo-1761972494954-79b100e02ebd?q=80&w=400&auto=format&fit=crop" },
  { label: "Drama",       href: "/genre/drama",           icon: <Sunset   size={28} />, from: "#134e4a", to: "#0d9488", bg: "https://images.unsplash.com/photo-1559781732-eed3e087c660?q=80&w=400&auto=format&fit=crop" },
  { label: "Fantasy",     href: "/genre/fantasy",         icon: <Sparkles size={28} />, from: "#4c1d95", to: "#8b5cf6", bg: "https://images.unsplash.com/photo-1524373050940-8f19e9b858a9?q=80&w=400&auto=format&fit=crop" },
  { label: "Crime",       href: "/genre/crime",           icon: <Search   size={28} />, from: "#7c2d12", to: "#f97316", bg: "https://images.unsplash.com/photo-1712436144241-63d52ac193b7?q=80&w=400&auto=format&fit=crop" },
  { label: "Adventure",   href: "/genre/adventure",       icon: <Compass  size={28} />, from: "#14532d", to: "#22c55e", bg: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=400&auto=format&fit=crop" },
  { label: "Documentary", href: "/genre/documentary",     icon: <BookOpen size={28} />, from: "#1c1917", to: "#78716c", bg: "https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?q=80&w=400&auto=format&fit=crop" },
  { label: "Music",       href: "/genre/music",           icon: <Music    size={28} />, from: "#701a75", to: "#d946ef", bg: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
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
              {/* Background image */}
              <img
                src={f.bg}
                alt={f.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Gradient color overlay sesuai genre */}
              <div
                className="absolute inset-0 opacity-70"
                style={{ background: `linear-gradient(135deg, ${f.from}cc 0%, ${f.to}88 100%)` }}
              />
              {/* Bottom gradient untuk teks */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
              {/* Icon + Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
                <span className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 text-center">
                <span className="text-white text-xs font-bold drop-shadow">{f.label}</span>
              </div>
              {/* Shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-200"
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
