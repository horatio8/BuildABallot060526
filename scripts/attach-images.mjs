// Attach an "images" array to each page entry in data/all-pages.json,
// using data/asset-manifest.json (perPage) and data/asset-map.json
// (originalUrl -> localPath) to translate references.
import { readFile, writeFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("data/asset-manifest.json", "utf8"));
const map = JSON.parse(await readFile("data/asset-map.json", "utf8"));
const pages = JSON.parse(await readFile("data/all-pages.json", "utf8"));

let attached = 0;
const updated = pages.map((p) => {
  const refs = manifest.perPage[p.path] || [];
  const seen = new Set();
  const images = [];
  for (const url of refs) {
    if (seen.has(url)) continue;
    seen.add(url);
    if (map[url]) {
      images.push({ src: map[url] });
    }
  }
  if (images.length) attached += 1;
  return { ...p, images };
});

await writeFile("data/all-pages.json", JSON.stringify(updated, null, 2));
console.log(`✓ attached images to ${attached}/${updated.length} pages`);
