import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen text-slate-500">
        <p>Masukkan kata kunci pencarian</p>
      </div>
    );
  }

  const data = await api.search(q, 1);

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8">
      <h1 className="text-2xl font-bold text-white mb-1">
        Hasil: <span style={{ color: "#3b82f6" }}>{q}</span>
      </h1>
      <p className="text-slate-500 text-sm mb-6">{data.movies.length} film ditemukan</p>
      <InfiniteMovieGrid
        key={q}
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath={`/api/movies/search?q=${encodeURIComponent(q)}`}
      />
    </div>
  );
}
