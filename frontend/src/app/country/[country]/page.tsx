import { api } from "@/lib/api";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { Globe } from "lucide-react";
import { COUNTRY_OPTIONS } from "@/lib/filterOptions";

interface Props { params: Promise<{ country: string }> }

export async function generateMetadata({ params }: Props) {
  const { country } = await params;
  const label = COUNTRY_OPTIONS.find((c) => c.value === country)?.label ?? country;
  return { title: `Film ${label} – nontonSkuy` };
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const data = await api.country(country, 1);
  const label = COUNTRY_OPTIONS.find((c) => c.value === country)?.label ?? country;

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-3 sm:px-4 md:px-8 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Globe size={22} className="text-blue-400" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Film {label}</h1>
          <p className="text-slate-500 text-sm">{data.movies.length}+ film tersedia</p>
        </div>
      </div>

      <InfiniteMovieGrid
        key={country}
        initialMovies={data.movies}
        initialHasNext={!!data.pagination.next}
        apiPath={`/api/movies/country/${country}`}
      />
    </div>
  );
}
