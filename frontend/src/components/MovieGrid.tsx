import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/api";

interface Props {
  movies: Movie[];
}

export default function MovieGrid({ movies }: Props) {
  if (!movies.length)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <p className="text-lg">Tidak ada film ditemukan</p>
      </div>
    );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
      {movies.map((m, i) => (
        <MovieCard key={m.slug ?? i} movie={m} />
      ))}
    </div>
  );
}
