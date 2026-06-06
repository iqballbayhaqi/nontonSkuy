const crypto = require("crypto");
const https = require("https");

const KEY = Buffer.from("kiemtienmua911ca");
const IV  = Buffer.from("1234567890oiuytr");

function extractPlayerp2pId(embedUrl) {
  try {
    const url = new URL(embedUrl);
    if (!url.hostname.includes("playerp2p")) return null;
    if (url.hash && url.hash.length > 1) return url.hash.slice(1);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : null;
  } catch {
    return null;
  }
}

function fetchEncrypted(videoId) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: "ewa.playerp2p.live",
          path: `/api/v1/video?id=${videoId}`,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Referer: `https://ewa.playerp2p.live/#${videoId}`,
          },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve(data.trim()));
        }
      )
      .on("error", reject);
  });
}

function decryptResponse(hexData) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", KEY, IV);
  const dec = Buffer.concat([
    decipher.update(Buffer.from(hexData, "hex")),
    decipher.final(),
  ]);
  return JSON.parse(dec.toString("utf8"));
}

async function resolvePlayerp2pStream(embedUrl) {
  const videoId = extractPlayerp2pId(embedUrl);
  if (!videoId) throw new Error("Not a playerp2p URL");

  const hexData = await fetchEncrypted(videoId);
  const data = decryptResponse(hexData);

  const poster = data.poster
    ? data.poster.startsWith("http")
      ? data.poster
      : `https://ewa.playerp2p.live${data.poster}`
    : null;

  return {
    streamUrl: data.source || null,
    poster,
    title: data.title || null,
  };
}

module.exports = { resolvePlayerp2pStream, extractPlayerp2pId };
