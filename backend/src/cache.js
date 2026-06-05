/**
 * Simple in-memory cache dengan TTL dan stale-while-revalidate.
 *
 * Kalau source website down, data lama (stale) dikembalikan
 * daripada error langsung ke user.
 */

const store   = new Map(); // { key → { data, ts } }
const inflight = new Map(); // { key → Promise } — dedup request paralel

const TTL = {
  detail: 30 * 60 * 1000, // 30 menit — halaman film jarang berubah
  list:    5 * 60 * 1000, // 5 menit  — daftar film (latest, genre, dll)
  search:  2 * 60 * 1000, // 2 menit  — hasil pencarian
};

/**
 * Jalankan fetchFn dengan caching + in-flight deduplication.
 *
 * - Fresh cache hit       → return tanpa scrape
 * - Key sedang di-fetch   → tunggu promise yang sama (tidak double-scrape)
 * - Source error + ada stale → return stale data daripada error
 * - Tidak ada cache sama sekali → lempar error ke caller
 */
async function cached(key, ttl, fetchFn) {
  const entry = store.get(key);
  const now   = Date.now();

  // Cache masih fresh
  if (entry && now - entry.ts < ttl) return entry.data;

  // Sedang di-fetch oleh request lain — ikut tunggu, tidak double scrape
  if (inflight.has(key)) return inflight.get(key);

  const promise = (async () => {
    try {
      const data = await fetchFn();
      store.set(key, { data, ts: Date.now() });
      return data;
    } catch (err) {
      if (entry) {
        const ageMin = Math.round((now - entry.ts) / 60000);
        console.warn(`[cache] source error, serving stale (${ageMin}m old): ${key}`);
        return { ...entry.data, _stale: true, _staleAge: ageMin };
      }
      throw err;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}

/** Paksa hapus cache untuk key tertentu (opsional, untuk keperluan admin) */
function invalidate(key) {
  store.delete(key);
}

/** Hapus semua cache */
function flush() {
  store.clear();
}

/** Info cache untuk debugging */
function stats() {
  const now = Date.now();
  return [...store.entries()].map(([key, { ts }]) => ({
    key,
    ageSeconds: Math.round((now - ts) / 1000),
  }));
}

module.exports = { cached, invalidate, flush, stats, TTL };
