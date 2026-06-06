require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moviesRouter = require("./routes/scrape");
const { scrapePerson } = require("./scraper-cached");
const { stats, flush } = require("./cache");
const { resolvePlayerp2pStream } = require("./stream-resolver");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "nontonSkuy Scraper API",
    base: process.env.BASE_URL,
    endpoints: {
      latest:      "GET /api/movies?page=1",
      bestRating:  "GET /api/movies/best-rating?page=1",
      search:      "GET /api/movies/search?q=avengers&page=1",
      category:    "GET /api/movies/category/:cat        (barat|indo|jav|film-semi)",
      genre:       "GET /api/movies/genre/:genre          (action|comedy|horror|...)",
      country:     "GET /api/movies/country/:country      (indonesia|korea|usa|...)",
      year:        "GET /api/movies/year/:year",
      detail:      "GET /api/movies/:slug",
      cacheStats:  "GET /cache/stats",
      cacheFlush:  "POST /cache/flush",
    },
  });
});

// Cache monitoring & control
app.get("/cache/stats", (req, res) => {
  res.json({ success: true, entries: stats() });
});

app.post("/cache/flush", (req, res) => {
  flush();
  res.json({ success: true, message: "Cache cleared" });
});

app.use("/api/movies", moviesRouter);

// Stream resolver — convert playerp2p embed URL to direct m3u8
app.get("/api/stream", async (req, res, next) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false, message: "url query param is required" });
    const data = await resolvePlayerp2pStream(url);
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

// Cast & Director pages
["cast", "director"].forEach((type) => {
  app.get(`/api/${type}/:slug`, async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const data = await scrapePerson(type, req.params.slug, page);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  });
});

app.use((err, req, res, next) => {
  const isSourceDown =
    err.code === "ECONNREFUSED" ||
    err.code === "ETIMEDOUT" ||
    err.code === "ENOTFOUND" ||
    (err.response && err.response.status >= 500);

  const status = isSourceDown ? 503 : 500;
  const message = isSourceDown
    ? "Source website sedang tidak dapat diakses. Coba beberapa saat lagi."
    : err.message;

  console.error(`[${status}] ${err.message}`);
  res.status(status).json({ success: false, message });
});

module.exports = app;
