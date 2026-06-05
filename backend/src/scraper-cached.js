const { cached, TTL } = require("./cache");
const scraper = require("./scraper");

const c = (key, ttl, fn) => cached(key, ttl, fn);
const L = TTL.list;
const D = TTL.detail;
const S = TTL.search;

module.exports = {
  scrapeLatest:    (page = 1)  => c(`latest:${page}`,           L, () => scraper.scrapeLatest(page)),
  scrapeBestRating:(page = 1)  => c(`best-rating:${page}`,       L, () => scraper.scrapeBestRating(page)),
  scrapeCategory:  (cat, page) => c(`category:${cat}:${page}`,   L, () => scraper.scrapeCategory(cat, page)),
  scrapeGenre:     (g, page)   => c(`genre:${g}:${page}`,        L, () => scraper.scrapeGenre(g, page)),
  scrapeCountry:   (co, page)  => c(`country:${co}:${page}`,     L, () => scraper.scrapeCountry(co, page)),
  scrapeYear:      (y, page)   => c(`year:${y}:${page}`,         L, () => scraper.scrapeYear(y, page)),
  scrapeSearch:    (q, page)   => c(`search:${q}:${page}`,       S, () => scraper.scrapeSearch(q, page)),
  scrapeAdvancedSearch: (opts) => {
    const key = `adv:${JSON.stringify(opts)}`;
    return c(key, S, () => scraper.scrapeAdvancedSearch(opts));
  },
  scrapeMovieDetail: (slug)    => c(`detail:${slug}`,            D, () => scraper.scrapeMovieDetail(slug)),
  scrapePerson: (type, slug, page) => c(`person:${type}:${slug}:${page}`, L, () => scraper.scrapePerson(type, slug, page)),
};
