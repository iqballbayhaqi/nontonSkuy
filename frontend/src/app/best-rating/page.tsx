import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

export default async function BestRatingPage() {
  const data = await api.bestRating(1);
  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Rating Terbaik</h1>
      <InfiniteMovieGrid
        key="best-rating"
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath="/api/movies/best-rating"
      />
    </div>
  );
}
