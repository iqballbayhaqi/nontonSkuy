import { api } from "@/lib/api";
import MovieRow from "@/components/MovieRow";
import AgeGate from "@/components/AgeGate";

export const metadata = { title: "Konten 18+ – nontonSkuy" };
export const dynamic = "force-dynamic";

export default async function DewasaPage() {
  const [catBarat, catIndo, catJav, catSemi, genreJav, genreIndo] =
    await Promise.all([
      api.category("barat", 1),
      api.category("indo", 1),
      api.category("jav", 1),
      api.category("film-semi", 1),
      api.genre("jav", 1),
      api.genre("indo", 1),
    ]);

  return (
    <AgeGate>
      <div className="pt-20 min-h-screen">
        {/* Header 18+ */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-extrabold px-2.5 py-1 rounded"
              style={{ background: "#dc2626", color: "#fff", letterSpacing: "0.05em" }}
            >
              18+
            </span>
            <h1 className="text-2xl font-extrabold text-white">Konten Dewasa</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Konten ini hanya untuk penonton berusia 18 tahun ke atas.
          </p>
        </div>

        <MovieRow title="Film Barat"     movies={catBarat.movies}  seeAllHref="/category/barat" />
        <MovieRow title="Film Indonesia" movies={catIndo.movies}   seeAllHref="/category/indo" />
        <MovieRow title="Film Jepang"    movies={catJav.movies}    seeAllHref="/category/jav" />
        <MovieRow title="Film Semi"      movies={catSemi.movies}   seeAllHref="/category/film-semi" />
        <MovieRow title="JAV"            movies={genreJav.movies}  seeAllHref="/genre/jav" />
        <MovieRow title="Indo"           movies={genreIndo.movies} seeAllHref="/genre/indo" />
      </div>
    </AgeGate>
  );
}
