import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { User } from "lucide-react";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await api.cast(slug, 1).catch(() => null);
  return { title: `${data?.name ?? slug} – nontonSkuy` };
}

export default async function CastPage({ params }: Props) {
  const { slug } = await params;
  const data = await api.cast(slug, 1);

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(29,111,232,0.15)", border: "1px solid rgba(29,111,232,0.3)" }}>
          <User size={18} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white capitalize">{data.name}</h1>
          <p className="text-slate-500 text-sm">{data.movies.length}+ film</p>
        </div>
      </div>

      <InfiniteMovieGrid
        key={slug}
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath={`/api/cast/${slug}`}
      />
    </div>
  );
}
