import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

export default async function LatestPage() {
  const data = await api.latest(1);
  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Film Terbaru</h1>
      <InfiniteMovieGrid
        key="latest"
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath="/api/movies"
      />
    </div>
  );
}
