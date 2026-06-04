// Server-side (SSR/build): pakai API_URL agar tidak lewat internet saat build
// Client-side (browser): pakai NEXT_PUBLIC_API_URL (domain publik)
const API =
  typeof window === "undefined"
    ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export interface Movie {
  title: string;
  slug: string | null;
  link: string | null;
  poster: string | null;
  rating: string | null;
  meta: string | null;
  trailer: string | null;
}

export interface Pagination {
  next: string | null;
  prev: string | null;
}

export interface MovieList {
  movies: Movie[];
  pagination: Pagination;
}

export interface Server {
  server: string;
  embedUrl: string | null;
}

export interface CastMember {
  name: string;
  url: string;
}

export interface RelatedMovie {
  title: string;
  poster: string | null;
  link: string;
  rating: string | null;
}

export interface MovieDetail {
  title: string;
  slug: string;
  poster: string | null;
  description: string;
  rating: { score: number; maxScore: number; votes: number | null } | null;
  trailer: string | null;
  streamUrl: string | null;
  servers: Server[];
  genres: string[];
  countries: string[];
  meta: Record<string, string>;
  cast: CastMember[];
  directors: CastMember[];
  related: RelatedMovie[];
}

export interface AdvancedSearchParams {
  q?: string;
  postType?: string;
  orderBy?: string;
  genre?: string;
  year?: string;
  country?: string;
  quality?: string;
}

function buildAdvancedPath(params: AdvancedSearchParams, page = 1): string {
  const qs = new URLSearchParams();
  if (params.q)        qs.set("q", params.q);
  if (params.postType) qs.set("post_type", params.postType);
  if (params.orderBy)  qs.set("orderby", params.orderBy);
  if (params.genre)    qs.set("genre", params.genre);
  if (params.year)     qs.set("year", params.year);
  if (params.country)  qs.set("country", params.country);
  if (params.quality)  qs.set("quality", params.quality);
  qs.set("page", String(page));
  return `/api/movies/search/advanced?${qs.toString()}`;
}

export const api = {
  latest: (page = 1) => get<MovieList>(`/api/movies?page=${page}`),
  bestRating: (page = 1) => get<MovieList>(`/api/movies/best-rating?page=${page}`),
  search: (q: string, page = 1) => get<MovieList>(`/api/movies/search?q=${encodeURIComponent(q)}&page=${page}`),
  advancedSearch: (params: AdvancedSearchParams, page = 1) => get<MovieList>(buildAdvancedPath(params, page)),
  buildAdvancedPath,
  category: (cat: string, page = 1) => get<MovieList & { category: string }>(`/api/movies/category/${cat}?page=${page}`),
  genre: (genre: string, page = 1) => get<MovieList & { genre: string }>(`/api/movies/genre/${genre}?page=${page}`),
  country: (country: string, page = 1) => get<MovieList & { country: string }>(`/api/movies/country/${country}?page=${page}`),
  year: (year: string, page = 1) => get<MovieList & { year: string }>(`/api/movies/year/${year}?page=${page}`),
  detail: (slug: string) => get<MovieDetail>(`/api/movies/${slug}`),
  cast: (slug: string, page = 1) => get<MovieList & { name: string }>(`/api/cast/${slug}?page=${page}`),
  director: (slug: string, page = 1) => get<MovieList & { name: string }>(`/api/director/${slug}?page=${page}`),
};
