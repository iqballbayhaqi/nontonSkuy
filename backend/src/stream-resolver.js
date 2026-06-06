const crypto = require("crypto");
const https = require("https");

const KEY = Buffer.from("kiemtienmua911ca");
const IV  = Buffer.from("1234567890oiuytr");

const P2P_DOMAINS = ["playerp2p", "p2pplay"];

function isP2pHost(hostname) {
  return P2P_DOMAINS.some((d) => hostname.includes(d));
}

function extractP2pInfo(embedUrl) {
  try {
    const url = new URL(embedUrl);
    if (!isP2pHost(url.hostname)) return null;
    const id =
      url.hash && url.hash.length > 1
        ? url.hash.slice(1)
        : url.pathname.split("/").filter(Boolean).pop() || null;
    return id ? { id, hostname: url.hostname } : null;
  } catch {
    return null;
  }
}

function fetchEncrypted(hostname, videoId) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname,
          path: `/api/v1/video?id=${videoId}`,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Referer: `https://${hostname}/#${videoId}`,
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
  const info = extractP2pInfo(embedUrl);
  if (!info) throw new Error("Not a supported p2p player URL");

  const hexData = await fetchEncrypted(info.hostname, info.id);
  const data = decryptResponse(hexData);

  const poster = data.poster
    ? data.poster.startsWith("http")
      ? data.poster
      : `https://${info.hostname}${data.poster}`
    : null;

  return {
    streamUrl: data.source || null,
    poster,
    title: data.title || null,
  };
}

module.exports = { resolvePlayerp2pStream, isP2pHost };
