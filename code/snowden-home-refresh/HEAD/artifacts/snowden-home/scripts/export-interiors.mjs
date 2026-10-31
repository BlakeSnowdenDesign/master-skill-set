// Exports the eight interior pages from src/interior-shared.mjs (same source as the previews).
// Output: public/delivery/interiors/<slug>.html (whole page) and
//         public/delivery/interiors/<slug>/<section-id>.html (one Wix embed per section).
// Visitor HTML: live Wix URLs (target=_top), no owner controls, H1 demoted to H2 (Wix owns the native H1).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { interiorPage, PAGE_ORDER } from "../src/interior-shared.mjs";
import { initHome, CAPTIONS } from "../src/home-shared.mjs";
import { writeDeliveryNotes } from "./interior-delivery-notes.mjs";
import { geoSourceGraphics } from "../src/geo-source-graphics.mjs";

const uri = (f, type = "webp") => `data:image/${type};base64,` + readFileSync("public/assets/" + f).toString("base64");
const viewerSource = readFileSync("public/delivery/mongrain-viewer-source.html", "utf8");
const hook = "()=>location.pathname";
if (!viewerSource.includes(hook)) throw new Error("Recheck the MONGRAIN embed's routing adapter.");
const viewerEmbed = viewerSource.replace(hook, '()=>location.pathname==="srcdoc"?"/":location.pathname');

const assets = {
  websiteHubHtml: readFileSync("public/assets/website-hub/snowden-website-hub.html", "utf8")
    .replace('src="website-hub-poster.png"', `src="${uri("website-hub/website-hub-poster.png", "png")}"`),
  geoDashboards: geoSourceGraphics.map(graphic => uri(`geo-originals/${graphic.file}`, "png")),
  analyticsDashboards: [
    "01-traffic-overview.png",
    "02-traffic-acquisition.png",
    "03-search-performance.png",
    "04-global-traffic-map.png",
    "05-landing-page-performance.png",
    "06-device-technology.png",
  ].map(file => uri(`analytics-originals/${file}`, "png")),
  office: "",
  mongrain: uri("mongrain.webp"),
  mongrainViewerHtml: viewerEmbed,
  edge: uri("edge-internet.webp"),
  harbour: uri("harbour-view.webp"),
  trout: uri("trout-extravaganza.webp"),
  camera: "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png",
  helen: "https://static.wixstatic.com/media/2fde66_5bab9e8c59f44e64a3f1ace9cb116342~mv2.jpg/v1/fill/w_1400,h_875,al_t,q_85,enc_auto/helen-falls-lodge.jpg",
  shadow: "https://static.wixstatic.com/media/2fde66_c8932db74d9045d4b765f5187c99e67c~mv2.png/v1/fill/w_1000,h_625,al_t,q_85,enc_auto/shadow-creek-ranch.png",
  blake: "https://static.wixstatic.com/media/2fde66_8ae605c421084ad9b842ab1a21440ec3~mv2.png",
  leica: uri("leica-studio.webp"),
  portrait: uri("blake-seated-portrait.webp"),
  limetreeLookbookHtml: readFileSync("../../attached_assets/limetree-lookbook_1793053839308.html", "utf8"),
};
const css = readFileSync("src/sd-home.css", "utf8").split("/* Preview-only native shell mock */")[0]
  + "\n" + readFileSync("src/photography.css", "utf8").replace(/^@import[^\n]+\n/gm, "")
  + "\n" + readFileSync("src/studio-theme.css", "utf8")
  + "\n" + readFileSync("src/interior.css", "utf8")
  + "\n" + readFileSync("src/growth-backgrounds.css", "utf8");

const escape = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const doc = (title, body, description) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#F3EDE3}
${css}</style></head>
<body><main class="sd-root si-page">
${body}
</main>
<script>(function(){var initHome=${initHome.toString()};initHome(document.querySelector(".sd-root"),${JSON.stringify(CAPTIONS)});})();</script>
</body></html>`;
const demote = html => html.replace(/<h1 /g, "<h2 ").replace(/<\/h1>/g, "</h2>");

mkdirSync("public/delivery/interiors", { recursive: true });
const manifest = [];
for (const slug of PAGE_ORDER) {
  const page = interiorPage(slug, { assets });
  mkdirSync(`public/delivery/interiors/${slug}`, { recursive: true });
  for (const s of page.sections) {
    if (s.id === "si-seo-dashboard" && (!s.html.includes("data-sd-analytics-dialog") || !s.html.includes("data-sd-analytics-expand"))) {
      throw new Error("Dashboard export must include the shared full-resolution viewer.");
    }
    if (/src="(undefined|)"/.test(s.html)) throw new Error(`Missing asset in ${slug}/${s.id}`);
    if (/localhost|\/review|wix-copy/i.test(s.html)) throw new Error(`Preview-only content in ${slug}/${s.id}`);
    writeFileSync(`public/delivery/interiors/${slug}/${s.id}.html`, doc(`${s.label} | Snowden Design`, demote(s.html), page.description));
  }
  const full = doc(page.title, demote(page.sections.map(s => s.html).join("\n")), page.description);
  writeFileSync(`public/delivery/interiors/${slug}.html`, full);
  manifest.push({ slug, url: `https://www.snowden-design.com/${slug}`, title: page.title, description: page.description, setup: `${slug}/WIX-SETUP.md`, nativeCopy: `${slug}/NATIVE-WIX-COPY.md`, sections: page.sections.map(s => ({ id: s.id, label: s.label, file: `${slug}/${s.id}.html` })) });
  writeDeliveryNotes(page);
  console.log(`Exported ${slug}: ${page.sections.length} sections, ${Buffer.byteLength(full)} bytes`);
}
writeFileSync("public/delivery/interiors/manifest.json", JSON.stringify(manifest, null, 2));
