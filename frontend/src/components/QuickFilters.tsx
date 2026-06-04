import Link from "next/link";

const GENRE_FILTERS = [
  { label: "🎬 Action",      href: "/genre/action" },
  { label: "😂 Comedy",      href: "/genre/comedy" },
  { label: "😱 Horror",      href: "/genre/horror" },
  { label: "💘 Romance",     href: "/genre/romance" },
  { label: "🚀 Sci-Fi",      href: "/genre/science-fiction" },
  { label: "🔍 Thriller",    href: "/genre/thriller" },
  { label: "🎭 Drama",       href: "/genre/drama" },
  { label: "🧙 Fantasy",     href: "/genre/fantasy" },
  { label: "🔫 Crime",       href: "/genre/crime" },
  { label: "🌍 Documentary", href: "/genre/documentary" },
];

const COUNTRY_FILTERS = [
  { label: "🇺🇸 USA",     href: "/country/usa" },
  { label: "🇰🇷 Korea",   href: "/country/korea" },
  { label: "🇯🇵 Jepang",  href: "/country/japan" },
  { label: "🇮🇩 Indo",    href: "/country/indonesia" },
  { label: "🇨🇳 China",   href: "/country/china" },
  { label: "🇮🇳 India",   href: "/country/india" },
  { label: "🇬🇧 UK",      href: "/country/united-kingdom" },
  { label: "🇫🇷 Prancis", href: "/country/france" },
];

export default function QuickFilters() {
  return (
    <div className="px-4 md:px-8 mb-2 space-y-3">
      {/* Genre */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Genre</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {GENRE_FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-600/30 hover:text-blue-300"
              style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Negara */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Negara</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {COUNTRY_FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-600/30 hover:text-blue-300"
              style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
