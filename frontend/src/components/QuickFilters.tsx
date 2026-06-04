import Link from "next/link";
import {
  Swords, Laugh, Skull, Heart, Rocket, Eye,
  Sparkles, Search, BookOpen, Compass,
  Music, Sunset,
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
import type { ComponentType, SVGProps } from "react";

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

const GENRE_FILTERS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: "Action",      href: "/genre/action",          icon: <Swords size={14} /> },
  { label: "Comedy",      href: "/genre/comedy",          icon: <Laugh size={14} /> },
  { label: "Horror",      href: "/genre/horror",          icon: <Skull size={14} /> },
  { label: "Romance",     href: "/genre/romance",         icon: <Heart size={14} /> },
  { label: "Sci-Fi",      href: "/genre/science-fiction", icon: <Rocket size={14} /> },
  { label: "Thriller",    href: "/genre/thriller",        icon: <Eye size={14} /> },
  { label: "Drama",       href: "/genre/drama",           icon: <Sunset size={14} /> },
  { label: "Fantasy",     href: "/genre/fantasy",         icon: <Sparkles size={14} /> },
  { label: "Crime",       href: "/genre/crime",           icon: <Search size={14} /> },
  { label: "Adventure",   href: "/genre/adventure",       icon: <Compass size={14} /> },
  { label: "Documentary", href: "/genre/documentary",     icon: <BookOpen size={14} /> },
  { label: "Music",       href: "/genre/music",           icon: <Music size={14} /> },
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
    <div className="px-4 md:px-8 mb-2 space-y-4">
      {/* Genre */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Genre</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {GENRE_FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-600/30 hover:text-blue-300"
              style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {f.icon}
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Negara */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Negara</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {COUNTRY_FILTERS.map(({ label, href, Flag }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-600/30 hover:text-blue-300"
              style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Flag style={{ width: 18, height: 12, borderRadius: 2 }} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
