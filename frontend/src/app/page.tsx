import { Suspense } from "react";
import { api } from "@/lib/api";
import HeroSlider from "@/components/HeroSlider";
import MovieRow from "@/components/MovieRow";
import MovieRowSkeleton from "@/components/MovieRowSkeleton";
import ContinueWatchingRow from "@/components/ContinueWatchingRow";
import QuickFilters from "@/components/QuickFilters";
import TvDownloadBanner from "@/components/TvDownloadBanner";

export const dynamic = "force-dynamic";

const GENRES = [
  { slug: "action",          label: "Action" },
  { slug: "adventure",       label: "Adventure" },
  { slug: "comedy",          label: "Comedy" },
  { slug: "crime",           label: "Crime" },
  { slug: "drama",           label: "Drama" },
  { slug: "fantasy",         label: "Fantasy" },
  { slug: "horror",          label: "Horror" },
  { slug: "mystery",         label: "Mystery" },
  { slug: "romance",         label: "Romance" },
  { slug: "science-fiction", label: "Science Fiction" },
  { slug: "thriller",        label: "Thriller" },
];

export default async function HomePage() {
  const sliderPage = Math.floor(Math.random() * 6) + 1;

  const [sliderData, latest, trending, ...genreResults] =
    await Promise.all([
      api.latest(sliderPage),
      api.latest(1),
      api.bestRating(1),
      ...GENRES.map((g) => api.genre(g.slug, 1)),
    ]);

  const sliderMovies = sliderData.movies
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <div>
      <HeroSlider movies={sliderMovies} />
      <TvDownloadBanner />
      <div className="mt-6">
        <ContinueWatchingRow />
        <MovieRow title="Film Terbaru"  movies={latest.movies}   seeAllHref="/latest" />
        <MovieRow title="🔥 Trending"  movies={trending.movies} seeAllHref="/best-rating" />

        <QuickFilters />

        {GENRES.map((g, i) => (
          <Suspense key={g.slug} fallback={<MovieRowSkeleton title={g.label} />}>
            <MovieRow
              title={g.label}
              movies={genreResults[i].movies}
              seeAllHref={`/genre/${g.slug}`}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
