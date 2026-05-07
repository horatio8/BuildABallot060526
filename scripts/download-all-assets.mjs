// Download every unique Webflow CDN asset to public/cdn/<filename>.
// Skips third-party hosts (we leave those as external links).
// After download, writes data/asset-map.json mapping original URL -> local path.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, basename } from "node:path";

const WEBFLOW_HOST = "cdn.prod.website-files.com";
const OUT_DIR = "public/cdn";

const manifest = JSON.parse(await readFile("data/asset-manifest.json", "utf8"));
const targets = manifest.assets.filter((a) => {
  try {
    return new URL(a.url).hostname === WEBFLOW_HOST;
  } catch {
    return false;
  }
});

console.log(`downloading ${targets.length} Webflow CDN assets...`);

function localFor(url) {
  const u = new URL(url);
  // Path on CDN is /<site-id>/<hash>_<name>.<ext>; collapse to just the filename
  const file = decodeURIComponent(basename(u.pathname));
  return `${OUT_DIR}/${file}`;
}

async function downloadOne(target) {
  const out = localFor(target.url);
  try {
    const res = await fetch(target.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-clone)" },
    });
    if (!res.ok) return { url: target.url, ok: false, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    return { url: target.url, ok: true, local: "/" + out.replace(/^public\//, ""), size: buf.length };
  } catch (e) {
    return { url: target.url, ok: false, error: e.message };
  }
}

const map = {}; // originalUrl -> "/cdn/<file>"
let done = 0;
let bytes = 0;
const concurrency = 8;
for (let i = 0; i < targets.length; i += concurrency) {
  const slice = targets.slice(i, i + concurrency);
  const results = await Promise.all(slice.map(downloadOne));
  for (const r of results) {
    done += 1;
    if (r.ok) {
      map[r.url] = r.local;
      bytes += r.size;
    } else {
      console.warn(`✗ ${r.url} ${r.status || r.error}`);
    }
  }
  if (done % 32 === 0 || done === targets.length) {
    console.log(`progress ${done}/${targets.length} downloaded (${(bytes / 1024 / 1024).toFixed(1)} MB so far)`);
  }
}

await writeFile("data/asset-map.json", JSON.stringify(map, null, 2));
console.log(`\n✓ downloaded ${Object.keys(map).length} files, total ${(bytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`wrote data/asset-map.json`);
