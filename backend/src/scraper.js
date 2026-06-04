const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = process.env.BASE_URL || "https://bridgestoabrighterfuture.org";

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
  },
});

async function load(path) {
  const res = await http.get(path);
  return cheerio.load(res.data);
}

function parseMovieCards($, selector = "article") {
  const movies = [];
  $(selector).each((_, el) => {
    const title = $(el).find(".entry-title a, h2 a, h3 a").first().text().trim();
    const link = $(el).find(".entry-title a, h2 a, h3 a").first().attr("href") || null;
    const poster = $(el).find("img").first().attr("src") || null;
    const rating = $(el).find(".gmr-quality-item, [class*='rating']").first().text().trim() || null;
    const meta = $(el).find(".gmr-movie-on").first().text().trim() || null;
    const trailer = $(el).find("a.gmr-trailer-popup").attr("href") || null;
    const slug = link ? link.replace(/^https?:\/\/[^/]+\//, "").replace(/\/$/, "") : null;
    if (title) movies.push({ title, slug, link, poster, rating, meta, trailer });
  });
  return movies;
}

function parsePagination($) {
  const next = $("a.next.page-numbers").attr("href") || null;
  const prev = $("a.prev.page-numbers").attr("href") || null;
  return { next, prev };
}

// --- Scraper functions ---

async function scrapeLatest(page = 1) {
  const path = page > 1 ? `/page/${page}/` : "/";
  const $ = await load(path);
  return {
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeCategory(category, page = 1) {
  // category: "barat" | "indo" | "jav" | "film-semi"
  const path = page > 1 ? `/${category}/page/${page}/` : `/${category}/`;
  const $ = await load(path);
  return {
    category,
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeGenre(genre, page = 1) {
  const path = page > 1 ? `/${genre}/page/${page}/` : `/${genre}/`;
  const $ = await load(path);
  return {
    genre,
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeCountry(country, page = 1) {
  const path =
    page > 1
      ? `/country/${country}/page/${page}/`
      : `/country/${country}/`;
  const $ = await load(path);
  return {
    country,
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeYear(year, page = 1) {
  const path =
    page > 1 ? `/year/${year}/page/${page}/` : `/year/${year}/`;
  const $ = await load(path);
  return {
    year,
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeBestRating(page = 1) {
  const path =
    page > 1 ? `/best-rating/page/${page}/` : `/best-rating/`;
  const $ = await load(path);
  return {
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeSearch(query, page = 1) {
  const path =
    page > 1
      ? `/?s=${encodeURIComponent(query)}&page=${page}`
      : `/?s=${encodeURIComponent(query)}`;
  const $ = await load(path);
  return {
    query,
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeAdvancedSearch({ q = "", postType = "", orderBy = "", genre = "", year = "", country = "", quality = "", page = 1 } = {}) {
  const qs = new URLSearchParams();
  if (q)        qs.set("s", q);
  qs.set("search", "advanced");
  if (postType) qs.set("post_type", postType);
  if (orderBy)  qs.set("orderby", orderBy);
  if (genre)    qs.set("genre", genre);
  if (year)     qs.set("movieyear", year);
  if (country)  qs.set("country", country);
  if (quality)  qs.set("quality", quality);

  const path = page > 1
    ? `/page/${page}/?${qs.toString()}`
    : `/?${qs.toString()}`;

  const $ = await load(path);
  return {
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

async function scrapeMovieDetail(slug) {
  const path = `/${slug}/`;
  const $ = await load(path);

  const title = $("h1.entry-title, .entry-title").first().text().trim();

  // First wp-post-image thumbnail = poster of this movie
  const poster =
    $("img.attachment-thumbnail.size-thumbnail.wp-post-image").first().attr("src") || null;

  // Only the first direct <p> child of entry-content (before meta block)
  const description = $(".entry-content > p").first().text().trim();

  // Rating score and vote count
  const ratingText = $(".gmr-rating-content").first().text().trim();
  const scoreMatch = ratingText.match(/rata-rata ([\d.]+) dari (\d+)/);
  const votesMatch = ratingText.match(/^(\d+)\s*voting/);
  const rating = scoreMatch
    ? {
        score: parseFloat(scoreMatch[1]),
        maxScore: parseInt(scoreMatch[2]),
        votes: votesMatch ? parseInt(votesMatch[1]) : null,
      }
    : null;

  // Trailer (first YouTube link from trailer popup)
  const trailer = $("a.gmr-trailer-popup").first().attr("href") || null;

  // Parse server tabs: Server 1 uses main page, Server N uses ?player=N
  const tabItems = [];
  $(".muvipro-player-tabs li").each((i, el) => {
    const label = $(el).find("a").text().trim() || `Server ${i + 1}`;
    tabItems.push({ label, index: i + 1 });
  });
  if (tabItems.length === 0) tabItems.push({ label: "Server 1", index: 1 });

  // Fetch all server pages in parallel; server 1 is already loaded
  const servers = await Promise.all(
    tabItems.map(async ({ label, index }) => {
      let embedUrl = null;
      if (index === 1) {
        embedUrl =
          $(`#player-1 iframe`).attr("src") ||
          $(`#player-1 iframe`).attr("data-src") ||
          $(".gmr-server-wrap iframe").first().attr("src") ||
          null;
      } else {
        try {
          const $p = await load(`/${slug}/?player=${index}`);
          embedUrl =
            $p(`#player-${index} iframe`).attr("src") ||
            $p(`#player-${index} iframe`).attr("data-src") ||
            $p("iframe").first().attr("src") ||
            null;
        } catch {
          embedUrl = null;
        }
      }
      return { server: label, embedUrl };
    })
  );

  // Keep streamUrl pointing to server 1 for backward compat
  const streamUrl = servers[0]?.embedUrl || null;

  // Parse meta fields from .gmr-moviedata items
  const meta = {};
  $(".gmr-moviedata").each((_, el) => {
    const raw = $(el).text().trim();
    const colonIdx = raw.indexOf(":");
    if (colonIdx > -1) {
      const key = raw.slice(0, colonIdx).trim().toLowerCase();
      const val = raw.slice(colonIdx + 1).trim();
      if (key && val) meta[key] = val;
    }
  });

  // Cast with individual page links
  const cast = [];
  $(".gmr-moviedata a[href*='/cast/']").each((_, el) => {
    cast.push({ name: $(el).text().trim(), url: $(el).attr("href") });
  });

  // Directors with links
  const directors = [];
  $(".gmr-moviedata a[href*='/director/']").each((_, el) => {
    directors.push({ name: $(el).text().trim(), url: $(el).attr("href") });
  });

  // Genres and countries from meta
  const genres = meta["genre"]
    ? meta["genre"].split(",").map((g) => g.trim()).filter(Boolean)
    : [];
  const countries = meta["negara"]
    ? meta["negara"].split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  // Related movies
  const related = [];
  $(".gmr-box-archive .content-thumbnail").each((_, el) => {
    const anchor = $(el).find("a").first();
    const link = anchor.attr("href") || null;
    const relTitle = (anchor.attr("title") || "")
      .replace(/^Permalink ke:\s*/i, "")
      .trim();
    const relPoster = $(el).find("img").first().attr("src") || null;
    const relRating = $(el).find(".gmr-quality-item").first().text().trim() || null;
    if (relTitle && link) related.push({ title: relTitle, poster: relPoster, link, rating: relRating });
  });

  return {
    title,
    slug,
    poster,
    description,
    rating,
    trailer,
    streamUrl,
    servers,
    genres,
    countries,
    meta,
    cast,
    directors,
    related,
  };
}

async function scrapePerson(type, slug, page = 1) {
  // type: 'cast' | 'director'
  const path = page > 1 ? `/${type}/${slug}/page/${page}/` : `/${type}/${slug}/`;
  const $ = await load(path);
  const nameEl = $("h1.entry-title, .page-title, h1").first().text().trim();
  return {
    slug,
    name: nameEl || slug.replace(/-/g, " "),
    movies: parseMovieCards($),
    pagination: parsePagination($),
  };
}

module.exports = {
  scrapeLatest,
  scrapeCategory,
  scrapeGenre,
  scrapeCountry,
  scrapeYear,
  scrapeBestRating,
  scrapeSearch,
  scrapeAdvancedSearch,
  scrapeMovieDetail,
  scrapePerson,
};
