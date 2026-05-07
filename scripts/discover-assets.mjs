// Walk every URL in the sitemap, collect every unique asset reference
// (img src, srcset, video src, css background-image, PDF/zip/doc anchors).
// Output: data/asset-manifest.json — { url -> [page paths that use it] }
import { writeFile, mkdir } from "node:fs/promises";

const ORIGIN = "https://www.buildaballot.org.au";
const SITEMAP = ORIGIN + "/sitemap.xml";

function stripScripts(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");
}

function removeChrome(html) {
  return html
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "");
}

function extractAssets(html) {
  const cleaned = removeChrome(stripScripts(html));
  const assets = new Set();

  // <img src="..."> + srcset
  for (const m of cleaned.matchAll(/<img[^>]*\bsrc="([^"]+)"/gi)) assets.add(m[1]);
  for (const m of cleaned.matchAll(/<img[^>]*\bsrcset="([^"]+)"/gi)) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) assets.add(url);
    }
  }

  // <video src> and <source src>
  for (const m of cleaned.matchAll(/<(?:video|source)[^>]*\bsrc="([^"]+)"/gi)) assets.add(m[1]);

  // <video poster>
  for (const m of cleaned.matchAll(/<video[^>]*\bposter="([^"]+)"/gi)) assets.add(m[1]);

  // background-image: url("...")
  for (const m of cleaned.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)/gi)) assets.add(m[1]);

  // anchors to file extensions we care about (downloads)
  for (const m of cleaned.matchAll(/<a[^>]*\bhref="([^"]+\.(?:pdf|zip|docx?|pptx?|xlsx?|csv|svg|mp4|mp3|webm))"/gi)) {
    assets.add(m[1]);
  }

  return [...assets];
}

function isHttpAsset(u) {
  return /^https?:\/\//.test(u) || u.startsWith("//");
}

function normalizeUrl(u, base = ORIGIN) {
  if (!u) return null;
  if (u.startsWith("//")) return "https:" + u;
  if (u.startsWith("http")) return u;
  if (u.startsWith("/")) return base + u;
  return null;
}

async function fetchSitemap() {
  const r = await fetch(SITEMAP);
  const xml = await r.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(ORIGIN, ""))
    .map((p) => (p === "" ? "/" : p))
    .filter((p) => !p.startsWith("/admin/"));
}

async function fetchPage(path) {
  try {
    const r = await fetch(ORIGIN + path, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-clone)" },
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return [];
    const html = await r.text();
    return extractAssets(html).map(normalizeUrl).filter(Boolean).filter(isHttpAsset);
  } catch {
    return [];
  }
}

const paths = await fetchSitemap();
console.log("scanning", paths.length, "pages for assets...");
const concurrency = 12;
const manifest = new Map(); // url -> Set<path>
const perPage = {}; // path -> string[]
let done = 0;
for (let i = 0; i < paths.length; i += concurrency) {
  const slice = paths.slice(i, i + concurrency);
  const results = await Promise.all(slice.map(async (p) => [p, await fetchPage(p)]));
  for (const [p, urls] of results) {
    perPage[p] = urls;
    for (const u of urls) {
      if (!manifest.has(u)) manifest.set(u, new Set());
      manifest.get(u).add(p);
    }
    done += 1;
  }
  if (done % 60 === 0 || done === paths.length) console.log(`progress ${done}/${paths.length} unique=${manifest.size}`);
}

const out = {
  totalPages: paths.length,
  totalUniqueAssets: manifest.size,
  assets: [...manifest.entries()].map(([url, pages]) => ({
    url,
    pages: [...pages],
    pageCount: pages.size,
  })),
  perPage,
};

await mkdir("data", { recursive: true });
await writeFile("data/asset-manifest.json", JSON.stringify(out, null, 2));
console.log(`\nwrote data/asset-manifest.json`);
console.log(`unique asset URLs: ${manifest.size}`);

// Breakdown by host
const hostCount = {};
for (const u of manifest.keys()) {
  const h = new URL(u).hostname;
  hostCount[h] = (hostCount[h] || 0) + 1;
}
console.log("by host:", hostCount);

// Breakdown by extension
const extCount = {};
for (const u of manifest.keys()) {
  const m = u.match(/\.([a-z0-9]+)(?:\?|$)/i);
  const ext = m ? m[1].toLowerCase() : "(none)";
  extCount[ext] = (extCount[ext] || 0) + 1;
}
console.log("by ext:", extCount);
