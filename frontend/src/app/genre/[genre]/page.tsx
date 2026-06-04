import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

interface Props {
  params: Promise<{ genre: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { genre } = await params;
  return { title: `${genre.replace(/-/g, " ")} – nontonSkuy` };
}

export default async function GenrePage({ params }: Props) {
  const { genre } = await params;
  const data = await api.genre(genre, 1);
  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8">
      <h1 className="text-2xl font-bold text-white mb-1 capitalize">
        {genre.replace(/-/g, " ")}
      </h1>
      <p className="text-slate-500 text-sm mb-6">Genre</p>
      <InfiniteMovieGrid
        key={genre}
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath={`/api/movies/genre/${genre}`}
      />
    </div>
  );
}
