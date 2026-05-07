// Crawl ALL pages from buildaballot.org.au sitemap.xml into JSON
import { writeFile, mkdir } from "node:fs/promises";

const ORIGIN = "https://www.buildaballot.org.au";
const SITEMAP = ORIGIN + "/sitemap.xml";
const OUT = "data/all-pages.json";

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

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

function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (m) return m[1];
  const w = html.match(/<div class="page-wrapper"[^>]*>([\s\S]*?)<\/div>\s*<\/body>/i);
  if (w) return w[1];
  const b = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return b ? b[1] : html;
}

function plainText(s) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].replace(/\s*\|\s*Build a Ballot.*$/, "").trim() : "";
}

function extractMetaDesc(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? m[1] : "";
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? plainText(m[1]) : "";
}

function extractSections(html) {
  const sections = [];
  const re = /<section\b[^>]*>([\s\S]*?)<\/section>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const inner = m[1];
    const h2s = [...inner.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((x) => plainText(x[1]));
    const h3s = [...inner.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((x) => plainText(x[1]));
    const ps = [...inner.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) => plainText(x[1])).filter((t) => t);
    const lis = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((x) => plainText(x[1])).filter((t) => t);
    if (h2s.length || h3s.length || ps.length || lis.length) {
      sections.push({ h2s, h3s, paragraphs: ps, list: lis });
    }
  }
  return sections;
}

function classifyPath(path) {
  if (path === "" || path === "/") return "home";
  if (path.startsWith("/electorates/")) return "electorate";
  if (path.startsWith("/party-candidate-assessments/")) return "candidate";
  if (path.startsWith("/parties/")) return "party";
  if (path.startsWith("/party-info/")) return "party-info";
  if (path.startsWith("/please-explain/")) return "explainer";
  if (path.startsWith("/volunteer-teams/")) return "volunteer-team";
  if (path.startsWith("/transparency/")) return "transparency-sub";
  if (path.startsWith("/research/")) return "research-sub";
  if (path.startsWith("/support/")) return "support-sub";
  if (path.startsWith("/admin/")) return "admin";
  return "main";
}

async function fetchSitemap() {
  const res = await fetch(SITEMAP);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls.map((u) => u.replace(ORIGIN, "")).map((p) => (p === "" ? "/" : p));
}

async function fetchPage(path) {
  try {
    const res = await fetch(ORIGIN + path, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-clone)" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return { path, status: res.status, kind: classifyPath(path), error: `HTTP ${res.status}` };
    const html = await res.text();
    const cleaned = stripScripts(html);
    const main = removeChrome(extractMain(cleaned));
    return {
      path,
      status: 200,
      kind: classifyPath(path),
      title: decodeEntities(extractTitle(html)),
      description: decodeEntities(extractMetaDesc(html)),
      h1: decodeEntities(extractH1(main)),
      sections: extractSections(main).map((s) => ({
        h2s: s.h2s.map(decodeEntities),
        h3s: s.h3s.map(decodeEntities),
        paragraphs: s.paragraphs.map(decodeEntities),
        list: s.list.map(decodeEntities),
      })),
    };
  } catch (e) {
    return { path, status: 0, kind: classifyPath(path), error: e.message };
  }
}

async function batched(paths, concurrency = 12) {
  const results = [];
  let idx = 0;
  let done = 0;
  while (idx < paths.length) {
    const slice = paths.slice(idx, idx + concurrency);
    idx += concurrency;
    const batch = await Promise.all(slice.map(fetchPage));
    for (const r of batch) {
      results.push(r);
      done += 1;
    }
    if (done % 60 === 0 || done === paths.length) {
      console.log(`progress ${done}/${paths.length}`);
    }
  }
  return results;
}

console.log("fetching sitemap...");
let urls = await fetchSitemap();
// Skip admin pages and home (home is hand-built)
urls = urls.filter((u) => !u.startsWith("/admin/") && u !== "/");
console.log(`crawling ${urls.length} pages with concurrency 12...`);
const out = await batched(urls);

const ok = out.filter((r) => r.status === 200).length;
const failed = out.length - ok;
console.log(`✓ ${ok} ok, ✗ ${failed} failed`);

await mkdir("data", { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 2));
console.log(`wrote ${OUT} (${out.length} entries)`);

// Also break down by kind for visibility
const byKind = {};
for (const r of out) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
console.log("by kind:", byKind);
