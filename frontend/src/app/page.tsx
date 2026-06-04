import { api } from "@/lib/api";
import HeroSlider from "@/components/HeroSlider";
import MovieRow from "@/components/MovieRow";
import ContinueWatchingRow from "@/components/ContinueWatchingRow";

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

  const [sliderData, latest, bestRating, ...genreResults] =
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
      <div className="mt-6">
        <ContinueWatchingRow />
        <MovieRow title="Film Terbaru"   movies={latest.movies}    seeAllHref="/latest" />
        <MovieRow title="Rating Terbaik" movies={bestRating.movies} seeAllHref="/best-rating" />

        {GENRES.map((g, i) => (
          <MovieRow
            key={g.slug}
            title={g.label}
            movies={genreResults[i].movies}
            seeAllHref={`/genre/${g.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
