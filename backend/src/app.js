require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moviesRouter = require("./routes/scrape");

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
    },
  });
});

app.use("/api/movies", moviesRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: err.message });
});

module.exports = app;
