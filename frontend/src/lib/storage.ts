"use client";

const WATCHLIST_KEY = "ns_watchlist";
const HISTORY_KEY  = "ns_history";
const SEARCH_KEY   = "ns_searches";
const MAX_HISTORY  = 50;
const MAX_SEARCHES = 10;

export interface StoredMovie {
  slug: string;
  title: string;
  poster: string | null;
  rating: string | null;
  meta: string | null;
  link?: string | null;
}

export interface WatchlistItem extends StoredMovie { addedAt: number; }
export interface HistoryItem   extends StoredMovie { watchedAt: number; }

function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback; }
  catch { return fallback; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Watchlist ────────────────────────────────────────────────
export function getWatchlist(): WatchlistItem[] {
  return read<WatchlistItem[]>(WATCHLIST_KEY, []);
}
export function isInWatchlist(slug: string): boolean {
  return getWatchlist().some((m) => m.slug === slug);
}
export function toggleWatchlist(movie: StoredMovie): boolean {
  const list = getWatchlist();
  const idx  = list.findIndex((m) => m.slug === movie.slug);
  if (idx > -1) {
    list.splice(idx, 1);
    write(WATCHLIST_KEY, list);
    return false;
  }
  list.unshift({ ...movie, addedAt: Date.now() });
  write(WATCHLIST_KEY, list);
  return true;
}
export function removeFromWatchlist(slug: string) {
  write(WATCHLIST_KEY, getWatchlist().filter((m) => m.slug !== slug));
}

// ── History ──────────────────────────────────────────────────
export function getHistory(): HistoryItem[] {
  return read<HistoryItem[]>(HISTORY_KEY, []);
}
export function addToHistory(movie: StoredMovie) {
  const list = getHistory().filter((m) => m.slug !== movie.slug);
  list.unshift({ ...movie, watchedAt: Date.now() });
  write(HISTORY_KEY, list.slice(0, MAX_HISTORY));
}
export function removeFromHistory(slug: string) {
  write(HISTORY_KEY, getHistory().filter((m) => m.slug !== slug));
}
export function clearHistory() {
  write(HISTORY_KEY, []);
}

// ── Search history ────────────────────────────────────────────
export function getSearchHistory(): string[] {
  return read<string[]>(SEARCH_KEY, []);
}
export function addToSearchHistory(q: string) {
  const trimmed = q.trim();
  if (!trimmed) return;
  const list = getSearchHistory().filter((s) => s !== trimmed);
  list.unshift(trimmed);
  write(SEARCH_KEY, list.slice(0, MAX_SEARCHES));
}
export function removeFromSearchHistory(q: string) {
  write(SEARCH_KEY, getSearchHistory().filter((s) => s !== q));
}
export function clearSearchHistory() {
  write(SEARCH_KEY, []);
}
