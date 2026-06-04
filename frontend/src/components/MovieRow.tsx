import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import ScrollableRow from "./ScrollableRow";
import type { Movie } from "@/lib/api";

interface Props {
  title: string;
  movies: Movie[];
  seeAllHref?: string;
}

export default function MovieRow({ title, movies, seeAllHref }: Props) {
  if (!movies.length) return null;
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3 px-4 md:px-8">
        <h2 className="text-base md:text-lg font-bold text-white">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: "#3b82f6" }}
          >
            Lihat Semua <ChevronRight size={14} />
          </Link>
        )}
      </div>
      <div className="px-4 md:px-8">
        <ScrollableRow>
          {movies.map((m, i) => (
            <div key={m.slug ?? i} className="shrink-0">
              <MovieCard movie={m} width={140} />
            </div>
          ))}
        </ScrollableRow>
      </div>
    </section>
  );
}
