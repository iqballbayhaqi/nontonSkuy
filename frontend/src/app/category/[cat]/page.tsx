import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";

interface Props {
  params: Promise<{ cat: string }>;
}

const LABELS: Record<string, string> = {
  barat: "Film Barat",
  indo: "Film Indonesia",
  jav: "Film Jepang (JAV)",
  "film-semi": "Film Semi",
};

export async function generateMetadata({ params }: Props) {
  const { cat } = await params;
  return { title: `${LABELS[cat] ?? cat} – nontonSkuy` };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const data = await api.category(cat, 1);
  return (
    <div className="pt-24 pb-12 max-w-screen-xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold text-white mb-6">{LABELS[cat] ?? cat}</h1>
      <InfiniteMovieGrid
        key={cat}
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath={`/api/movies/category/${cat}`}
      />
    </div>
  );
}
