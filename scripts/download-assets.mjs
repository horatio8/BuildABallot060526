// Download all assets from buildaballot.org.au into public/
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const assets = [
  // Hero background
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69f3f892da4d4e13116bf8bf_Farrer%20background%20(1).jpg", out: "public/images/hero-farrer.jpg" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69f3f892da4d4e13116bf8bf_Farrer%20background%20(1)-p-2000.jpg", out: "public/images/hero-farrer-2000.jpg" },
  // How-it-works mockups
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69964bf98354b2f6d078889d_Frame%201163.png", out: "public/images/mockup-issues.png" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69964bf9c6086b6d4fafb79d_Group%201207.png", out: "public/images/mockup-electorate.png" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/699949fdb7837e8ab4f31451_Build%20a%20Ballot%20mockup-1.png", out: "public/images/mockup-1.png" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/699949fdb188cf1fcb03d4a7_Build%20a%20Ballot%20mockup-2.png", out: "public/images/mockup-2.png" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/699949fd68bcd131d60989e8_Build%20a%20Ballot%20mockup.png", out: "public/images/mockup-summary.png" },
  // Hand holding phone
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69957cf50b05836de91fcdf3_hand%20holding%20build%20a%20ballot.png", out: "public/images/hand-holding-phone.png" },
  // Banner mockup
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/69964979b93f5183a8dbec18_Build%20a%20Ballot%20banner%20(1).jpg", out: "public/images/banner.jpg" },
  // Favicons
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/6999924f006fb560ddae9818_Build%20a%20Ballot%20Favicon.png", out: "public/seo/favicon.png" },
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/677ca39faab6fa78a0fd88ff_Webclip.png", out: "public/seo/apple-touch-icon.png" },
  // OG image
  { url: "https://cdn.prod.website-files.com/6696ba979099335de734f100/67e7623bafa2cb1799b08ce5_Build%20a%20Ballot%20Open%20Graph.jpg", out: "public/seo/og-image.jpg" },
];

async function download({ url, out }) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-clone)" },
    });
    if (!res.ok) {
      console.warn(`✗ ${out} (${res.status})`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    console.log(`✓ ${out} (${(buf.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (e) {
    console.error(`✗ ${out}: ${e.message}`);
    return false;
  }
}

// Batched parallel downloads (4 at a time)
async function batchedDownload(items, concurrency = 4) {
  for (let i = 0; i < items.length; i += concurrency) {
    const slice = items.slice(i, i + concurrency);
    await Promise.all(slice.map(download));
  }
}

await batchedDownload(assets);
console.log("Done.");
