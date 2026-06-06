const https = require("https");
const http = require("http");

function fetchFromSource(targetUrl, referer) {
  return new Promise((resolve, reject) => {
    const u = new URL(targetUrl);
    const client = u.protocol === "https:" ? https : http;
    client
      .get(
        {
          hostname: u.hostname,
          port: u.port || undefined,
          path: u.pathname + u.search,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Referer: referer,
            Origin: new URL(referer).origin,
          },
          // beberapa server pakai cert untuk domain lain pada IP
          rejectUnauthorized: false,
        },
        resolve
      )
      .on("error", reject);
  });
}

// Rewrite relative & absolute URLs dalam m3u8 → lewat proxy kita
function rewriteM3u8(content, baseUrl, referer, proxyBase) {
  const base = new URL(baseUrl);

  return content.replace(/^(.+)$/gm, (line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    if (trimmed.startsWith("#")) {
      // Rewrite URI= attributes inside tags (#EXT-X-MAP, #EXT-X-KEY, etc.)
      return trimmed.replace(
        /URI="([^"]+)"/g,
        (_, uri) => `URI="${toProxyUrl(uri, base, referer, proxyBase)}"`
      );
    }

    // Bare URL lines (segment .ts/.m4s, quality .m3u8, dll)
    return toProxyUrl(trimmed, base, referer, proxyBase);
  });
}

function toProxyUrl(url, base, referer, proxyBase) {
  const absolute = url.startsWith("http") ? url : new URL(url, base).toString();
  return `${proxyBase}?src=${encodeURIComponent(absolute)}&ref=${encodeURIComponent(referer)}`;
}

async function handleProxy(req, res) {
  const { src, ref } = req.query;
  if (!src) return res.status(400).send("src required");

  const referer = ref || "https://ewa.playerp2p.live/";
  const baseUrl = process.env.API_PUBLIC_URL
    ? process.env.API_PUBLIC_URL.replace(/\/$/, "")
    : `${req.protocol}://${req.get("host")}`;
  const proxyBase = `${baseUrl}/api/stream/proxy`;

  let sourceRes;
  try {
    sourceRes = await fetchFromSource(src, referer);
  } catch (err) {
    return res.status(502).send("Upstream error: " + err.message);
  }

  if (sourceRes.statusCode >= 400) {
    return res.status(sourceRes.statusCode).send("Upstream returned " + sourceRes.statusCode);
  }

  // CORS agar HLS.js di browser bisa akses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  const ct = sourceRes.headers["content-type"] || "";
  res.setHeader("Content-Type", ct || "application/octet-stream");

  const isM3u8 =
    src.includes(".m3u8") ||
    src.includes(".txt") ||
    ct.includes("mpegurl") ||
    ct.includes("m3u");

  if (isM3u8) {
    let body = "";
    sourceRes.on("data", (c) => (body += c));
    sourceRes.on("end", () => {
      res.send(rewriteM3u8(body, src, referer, proxyBase));
    });
  } else {
    // Segment .ts / key — stream langsung tanpa buffer
    res.setHeader("Cache-Control", "public, max-age=3600");
    sourceRes.pipe(res);
  }
}

module.exports = { handleProxy };
