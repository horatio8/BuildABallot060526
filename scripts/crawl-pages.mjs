// Crawl static info pages from buildaballot.org.au into JSON
import { writeFile, mkdir } from "node:fs/promises";

const STATIC_PAGES = [
  "/about",
  "/contact",
  "/faqs",
  "/elections-101",
  "/auspol-explained",
  "/support",
  "/support/volunteer",
  "/support/downloads",
  "/support/conversation-guide",
  "/support/partnerships",
  "/transparency",
  "/transparency/methodology",
  "/transparency/policies",
  "/transparency/candidate-and-party-assessments",
  "/research-hub",
  "/research/candidate-finder",
  "/research/resources",
  "/privacy-policy",
  "/terms-of-use",
  "/sign-up",
  "/report-an-issue",
  "/candidate-information",
  "/conversation-cards",
];

const ORIGIN = "https://www.buildaballot.org.au";

function stripHtml(html) {
  // Remove scripts, styles, then convert tags to spaces, decode entities
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");
}

function extractMain(html) {
  // Find main content section. Webflow typically uses <main> or div.page-wrapper
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) return mainMatch[1];
  const wrapperMatch = html.match(/<div class="page-wrapper"[^>]*>([\s\S]*?)<\/div>\s*<\/body>/i);
  if (wrapperMatch) return wrapperMatch[1];
  // Fall back to <body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

function htmlToBlocks(html) {
  // Remove navbar, footer, top banner — keep middle content
  // Webflow site uses class .new-nav for nav, footer is <footer>
  let cleaned = html
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "")
    .replace(/<div[^>]*class="[^"]*new-nav[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, "");
  return cleaned;
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
  if (!m) return "";
  return m[1].replace(/<[^>]+>/g, "").trim();
}

function extractSections(html) {
  // Pull out top-level <section>s with their text content
  const sections = [];
  const re = /<section\b[^>]*>([\s\S]*?)<\/section>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const inner = m[1];
    // Get headings
    const h2s = [...inner.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((x) =>
      x[1].replace(/<[^>]+>/g, "").trim()
    );
    const h3s = [...inner.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((x) =>
      x[1].replace(/<[^>]+>/g, "").trim()
    );
    // Pull paragraphs
    const ps = [...inner.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((x) => x[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 0);
    if (h2s.length || h3s.length || ps.length) {
      sections.push({ h2s, h3s, paragraphs: ps });
    }
  }
  return sections;
}

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

async function fetchPage(path) {
  const url = ORIGIN + path;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-clone)" },
    });
    if (!res.ok) {
      return { path, status: res.status, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    const cleaned = stripHtml(html);
    const main = extractMain(cleaned);
    const innerOnly = htmlToBlocks(main);
    return {
      path,
      status: 200,
      title: decodeEntities(extractTitle(html)),
      description: decodeEntities(extractMetaDesc(html)),
      h1: decodeEntities(extractH1(innerOnly)),
      sections: extractSections(innerOnly).map((s) => ({
        h2s: s.h2s.map(decodeEntities),
        h3s: s.h3s.map(decodeEntities),
        paragraphs: s.paragraphs.map(decodeEntities),
      })),
    };
  } catch (e) {
    return { path, status: 0, error: e.message };
  }
}

async function batchedCrawl(paths, concurrency = 4) {
  const results = [];
  for (let i = 0; i < paths.length; i += concurrency) {
    const slice = paths.slice(i, i + concurrency);
    const batch = await Promise.all(slice.map(fetchPage));
    for (const r of batch) {
      console.log(`${r.status === 200 ? "✓" : "✗"} ${r.path} — h1="${r.h1?.slice(0, 60) ?? ""}" sections=${r.sections?.length ?? 0}`);
      results.push(r);
    }
  }
  return results;
}

const out = await batchedCrawl(STATIC_PAGES);
await mkdir("data", { recursive: true });
await writeFile("data/static-pages.json", JSON.stringify(out, null, 2));
console.log(`\nWrote data/static-pages.json (${out.length} pages)`);
