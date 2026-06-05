/**
 * Simple in-memory cache dengan TTL dan stale-while-revalidate.
 *
 * Kalau source website down, data lama (stale) dikembalikan
 * daripada error langsung ke user.
 */

const store = new Map();

const TTL = {
  detail:   30 * 60 * 1000,  // 30 menit  — halaman film jarang berubah
  list:     5  * 60 * 1000,  // 5 menit   — daftar film (latest, genre, dll)
  search:   2  * 60 * 1000,  // 2 menit   — hasil pencarian
};

/**
 * Jalankan fetchFn, cache hasilnya.
 * Kalau cache masih fresh → langsung pakai.
 * Kalau source error dan ada cache lama → kembalikan stale data.
 * Kalau tidak ada cache sama sekali → lempar error ke caller.
 *
 * @param {string} key   Cache key unik per endpoint + param
 * @param {number} ttl   Milliseconds sebelum dianggap stale
 * @param {Function} fetchFn  Async function yang melakukan scraping
 */
async function cached(key, ttl, fetchFn) {
  const entry = store.get(key);
  const now = Date.now();

  // Cache masih fresh — return langsung
  if (entry && now - entry.ts < ttl) {
    return entry.data;
  }

  try {
    const data = await fetchFn();
    store.set(key, { data, ts: now });
    return data;
  } catch (err) {
    // Source website down — kembalikan data lama kalau ada
    if (entry) {
      const ageMin = Math.round((now - entry.ts) / 60000);
      console.warn(`[cache] source error, serving stale data (${ageMin}m old) for: ${key}`);
      return { ...entry.data, _stale: true, _staleAge: ageMin };
    }
    // Tidak ada cache sama sekali — teruskan error
    throw err;
  }
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
