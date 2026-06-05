const express = require("express");
const router = express.Router();
const {
  scrapeLatest,
  scrapeCategory,
  scrapeGenre,
  scrapeCountry,
  scrapeYear,
  scrapeBestRating,
  scrapeSearch,
  scrapeAdvancedSearch,
  scrapeMovieDetail,
} = require("../scraper-cached");

function wrap(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// GET /api/movies?page=1
router.get(
  "/",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeLatest(page) });
  })
);

// GET /api/movies/best-rating?page=1
router.get(
  "/best-rating",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeBestRating(page) });
  })
);

// GET /api/movies/search?q=avengers&page=1
router.get(
  "/search",
  wrap(async (req, res) => {
    const { q, page } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query param 'q' is required" });
    res.json({ success: true, data: await scrapeSearch(q, parseInt(page) || 1) });
  })
);

// GET /api/movies/category/:cat?page=1  (barat | indo | jav | film-semi)
router.get(
  "/category/:cat",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeCategory(req.params.cat, page) });
  })
);

// GET /api/movies/genre/:genre?page=1  (action | comedy | horror | ...)
router.get(
  "/genre/:genre",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeGenre(req.params.genre, page) });
  })
);

// GET /api/movies/country/:country?page=1  (indonesia | korea | usa | ...)
router.get(
  "/country/:country",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeCountry(req.params.country, page) });
  })
);

// GET /api/movies/year/:year?page=1
router.get(
  "/year/:year",
  wrap(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    res.json({ success: true, data: await scrapeYear(req.params.year, page) });
  })
);

// GET /api/movies/search/advanced?q=&genre=action&year=2024&country=usa&quality=hd&orderby=rating&post_type=movie&page=1
router.get(
  "/search/advanced",
  wrap(async (req, res) => {
    const { q, post_type, orderby, genre, year, country, quality, page } = req.query;
    const data = await scrapeAdvancedSearch({
      q:        q        || "",
      postType: post_type|| "",
      orderBy:  orderby  || "",
      genre:    genre    || "",
      year:     year     || "",
      country:  country  || "",
      quality:  quality  || "",
      page:     parseInt(page) || 1,
    });
    res.json({ success: true, data });
  })
);

// GET /api/movies/:slug  (detail film)
router.get(
  "/:slug",
  wrap(async (req, res) => {
    res.json({ success: true, data: await scrapeMovieDetail(req.params.slug) });
  })
);

module.exports = router;
