import { api } from "@/lib/api";
import AdvancedSearchFilters from "@/components/AdvancedSearchFilters";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export const metadata = { title: "Pencarian Lanjutan – nontonSkuy" };

export default async function AdvancedSearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { q, post_type, orderby, genre, year, country, quality } = sp;

  const params = { q, postType: post_type, orderBy: orderby, genre, year, country, quality };
  const data = await api.advancedSearch(params, 1);

  // apiPath untuk infinite scroll (tanpa page, akan di-append oleh InfiniteMovieGrid)
  const qs = new URLSearchParams();
  if (q)         qs.set("q", q);
  if (post_type) qs.set("post_type", post_type);
  if (orderby)   qs.set("orderby", orderby);
  if (genre)     qs.set("genre", genre);
  if (year)      qs.set("year", year);
  if (country)   qs.set("country", country);
  if (quality)   qs.set("quality", quality);
  const qsStr = qs.toString();
  const apiPath = `/api/movies/search/advanced${qsStr ? `?${qsStr}` : ""}`;

  const hasActiveFilter = !!(q || post_type || orderby || genre || year || country || quality);

  return (
    <div className="pt-24 pb-12 max-w-screen-xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold text-white mb-6">Pencarian Lanjutan</h1>

      <AdvancedSearchFilters
        initial={{ q, post_type, orderby, genre, year, country, quality }}
      />

      {hasActiveFilter ? (
        <>
          <p className="text-slate-500 text-sm mb-5">
            {data.movies.length} film ditemukan
            {genre && <span> · Genre: <span className="text-blue-400">{genre}</span></span>}
            {year && <span> · Tahun: <span className="text-blue-400">{year}</span></span>}
            {country && <span> · Negara: <span className="text-blue-400">{country}</span></span>}
            {quality && <span> · Kualitas: <span className="text-blue-400 uppercase">{quality}</span></span>}
          </p>
          <InfiniteMovieGrid
            key={apiPath}
            initialMovies={data.movies}
            initialHasNext={!!data.pagination.next}
            apiPath={apiPath}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500">
          <p className="text-lg mb-2">Gunakan filter di atas untuk mencari film</p>
          <p className="text-sm">Pilih genre, tahun, negara, kualitas, atau ketik judul</p>
        </div>
      )}
    </div>
  );
}
