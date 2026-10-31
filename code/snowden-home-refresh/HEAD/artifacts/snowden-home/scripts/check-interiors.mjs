import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { interiorPage, PAGE_ORDER } from "../src/interior-shared.mjs";
import { HEADER_LINKS, headerMarkup } from "../src/header-shared.mjs";
import { homeBody, LINKS } from "../src/home-shared.mjs";
import { geoSourceGraphics } from "../src/geo-source-graphics.mjs";

const read = file => readFileSync(file, "utf8");
const assets = Object.fromEntries(["mongrain", "mongrainViewerUrl", "edge", "harbour", "trout", "helen", "shadow", "leica", "portrait", "blake"].map(k => [k, `https://example.test/${k}.webp`]));
assets.limetreeLookbookHtml = read("../../attached_assets/limetree-lookbook_1793053839308.html");
const titles = new Set();
for (const slug of PAGE_ORDER) {
  const local = interiorPage(slug, { assets, previewBase: "/nested-preview/" });
  const visitor = interiorPage(slug, { assets });
  assert.equal(local.sections.length, visitor.sections.length);
  assert.equal(titles.has(local.title), false, `Duplicate title: ${slug}`);
  titles.add(local.title);
  const html = local.sections.map(s => s.html).join("");
  assert.equal((html.match(/<h1 /g) || []).length, 1, `${slug}: one H1`);
  assert.ok(!html.includes("undefined"), `${slug}: missing asset`);
  assert.ok(!html.replace(/href="https:\/\/www\.snowden-design\.com\/digitalart"/g, "").includes('href="https://www.snowden-design.com/'), `${slug}: local links escaped`);
  assert.ok(!/>0[1-9]<|home-1/.test(html), `${slug}: prohibited numbering or old slug`);
  const out = read(`public/delivery/interiors/${slug}.html`);
  assert.ok(out.includes('name="robots" content="noindex, nofollow"'));
  assert.ok(out.includes('name="description"'));
  assert.ok(!/Copy HTML for Wix|Download HTML|localhost|home-1|\/nested-preview\/|wix-copy/.test(out), `${slug}: owner or stale content in export`);
  assert.equal((out.match(/<h1 /g) || []).length, 0, `${slug}: Wix owns native H1`);
  assert.ok(read(`public/delivery/interiors/${slug}/WIX-SETUP.md`).includes(`https://www.snowden-design.com/${slug}`));
  assert.ok(read(`public/delivery/interiors/${slug}/NATIVE-WIX-COPY.md`).includes(local.name));
  for (const s of local.sections) {
    const standalone = read(`public/delivery/interiors/${slug}/${s.id}.html`);
    assert.ok(standalone.includes(`id="${s.id}"`));
    assert.ok(out.includes(standalone.match(/<main class="sd-root si-page">([\s\S]*?)<\/main>/)[1]), `${slug}: section/export parity`);
  }
  if (slug === "work") {
    assert.ok(!/MONGRAIN|si-work-3d|sd-mg__viewer/.test(html), "MONGRAIN belongs on the 3D page, not Work");
    assert.ok(html.includes('title="Lime Tree Hospitality Guest Rooms interactive digital lookbook, including cover, book and film reel" srcdoc="'), "Work includes the titled portable Lime Tree srcdoc lookbook");
    assert.ok(html.includes('data-sd-lookbook-template'), "Lookbook viewer is mounted on demand");
    assert.ok(html.includes("2fde66_92c3b873bac64ded93396fac80810928/720p/mp4/file.mp4"), "Lime Tree presentation includes supplied film");
    assert.ok(html.includes("2fde66_d400201f4da940bdb3dd4f631dd3ca48/720p/mp4/file.mp4"), "Lime Tree case study includes the supplied portrait design story");
    assert.ok(html.includes('href="https://www.instagram.com/p/DefahUJGuQ8/"'), "Case study links directly to the supplied Instagram post");
    assert.ok(html.includes("The goal: turn a deep hospitality portfolio"), "Case study explains the project goal");
    assert.ok(html.includes("The editorial idea"), "Case study explains the creative approach");
    for (const deliverable of ["Digital lookbook", "Video", "Social media design", "Design stories"]) {
      assert.ok(html.includes(deliverable), `Case study covers ${deliverable}`);
    }
    assert.ok(html.includes('aria-label="Design Story: Canyon Ranch Austin at Lake Travis, Austin, Texas"'), "Portrait film has an accurate accessible label");
    assert.ok(html.includes('si-lime__video-item--portrait sd-r"'), "Portrait film uses its responsive portrait presentation");
    assert.ok(html.includes("Guestroom casegoods: Lime Tree"), "Design-story credit remains visible");
    assert.ok(html.includes('<video data-sd-portfolio-video muted loop controls playsinline preload="none" aria-label="Design Story: Canyon Ranch Austin at Lake Travis, Austin, Texas" poster='), "Portrait film uses managed muted autoplay with accessible controls and inline playback");
    assert.ok(html.includes('<video data-sd-portfolio-video muted loop controls playsinline preload="none" aria-label="Hospitality film featuring the Gold Key Awards 2026 trophy"'), "Gold Key film uses managed muted autoplay with controls");
    assert.ok(!/<video[^>]*\bautoplay\b/.test(html), "Native autoplay is deferred to the visibility manager");
    assert.ok(!html.includes("Lime Tree Hospitality — in motion"), "Supplied film is not duplicated inside the lookbook presentation");
    assert.ok(html.includes('href="https://snowden-design.wixstudio.com/limetreesocial"'), "Featured case study links to live lookbook");
    assert.ok(html.indexOf('id="si-work-limetree-feature"') < html.indexOf('id="sd-work"'), "Featured case study precedes portfolio");
    assert.equal(local.sections.length, 4, "Work includes introduction, Lime Tree case study, portfolio and closing section");
  }
  if (slug === "website-growth") {
    const expected = ["hero", "attention", "search", "organic", "ads", "social", "partners", "plan", "process", "close"];
    assert.equal(local.sections.length, 10, "Growth page covers the ten requested sections");
    const backgroundStyles = new Set();
    for (const section of local.sections) {
      if (section.id === "si-grow-hero") {
        assert.ok(!section.html.includes("si-grow-bg"), "Growth introduction keeps its original background");
        assert.ok(!section.html.includes("si-grow-motion"), "Growth introduction has no decorative motion control");
        continue;
      }
      const treatment = section.html.match(/si-grow-bg--([a-z]+)"/);
      assert.ok(treatment, `${section.id}: decorative background is present`);
      backgroundStyles.add(treatment[1]);
      assert.ok(!section.html.includes("si-grow-motion"), `${section.id}: no background pause buttons`);
      assert.ok(section.html.includes('aria-hidden="true"'), `${section.id}: artwork is decorative`);
    }
    assert.equal(backgroundStyles.size, 5, "Growth page offers five distinct motion treatments");
    assert.ok(out.includes("@keyframes si-grow-light-drift"), "Portable Wix exports retain background motion styles");
    assert.deepEqual(local.sections.map(s => s.id), expected.map(name => `si-grow-${name}`), "Growth sections have stable, independently exportable IDs");
    assert.equal((html.match(/class="si-grow-plan__item sd-r"/g) || []).length, 8, "Tailored recurring plan covers eight support areas");
    assert.equal((html.match(/class="si-grow-process__step sd-r"/g) || []).length, 4, "Growth review process has four steps");
    for (const phrase of ["Talk About Ongoing Website Growth", "Schedule a Website Growth Review", "Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "Generative Engine Optimization", "budget", "landing page", "technical", "link schemes"]) {
      assert.ok(html.toLowerCase().includes(phrase.toLowerCase()), `Growth brief includes ${phrase}`);
    }
    assert.ok(html.includes('href="/nested-preview/contact"'), "Growth CTAs navigate to local Contact in preview");
    assert.ok(visitor.sections.map(s => s.html).join("").includes('href="https://www.snowden-design.com/contact" target="_top"'), "Growth CTAs navigate to native Wix Contact in exports");
    assert.ok(html.includes('href="mailto:blake@snowden-design.com"'), "Growth close has direct email option");
    assert.ok(!/[$€£]\s?\d/.test(html), "Growth page does not invent plan prices");
    assert.ok(html.includes('class="si-grow-hub__frame"'), "Growth hero uses the requested 3D website hub");
    assert.ok(!html.includes('id="grow-glass"'), "Growth hero no longer renders the old flat diagram");
    assert.ok(out.includes("srcdoc=") && out.includes("&lt;title&gt;Website Hub&lt;/title&gt;"), "Wix export includes the animation source inline, not a development URL");
    assert.ok(!/(guaranteed (rankings|leads|returns)|24\/7|page.one guarantee)/i.test(html), "Growth page does not invent result or service guarantees");
  }
  if (slug === "3d-interactive") assert.ok(html.includes('id="sd-mongrain"'), "3D page retains the MONGRAIN viewer");
  if (slug === "seo-geo") {
    for (const attr of ["data-sd-analytics-expand", "data-sd-analytics-dialog", "data-sd-analytics-close", "data-sd-analytics-full-scroll", "data-sd-analytics-full-image"]) {
      assert.ok(html.includes(attr) && out.includes(attr), `Full-size viewer preview/export parity: ${attr}`);
    }
    assert.ok(html.includes('aria-haspopup="dialog"') && html.includes('aria-labelledby="si-dashboard-full-title"'), "Full-size viewer has an accessible opener and name");
    assert.ok(out.includes('fullDialog.addEventListener("close", onFullClosed)') && out.includes("fullDialog.showModal()"), "Export retains native modal Escape and focus restoration behavior");
    assert.ok(out.includes("touch-action: pan-x pan-y pinch-zoom") && out.includes("max-width: none"), "Export retains native touch scrolling and full-resolution sizing");
    assert.ok(html.includes('id="si-seo-dashboard"'), "SEO includes a separately exportable animated dashboard");
    for (const attribute of ["data-sd-original-showcase", "data-sd-analytics-toggle", "data-sd-analytics-replay", "data-sd-analytics-prev", "data-sd-analytics-next"]) {
      assert.ok(html.includes(attribute), `Dashboard includes ${attribute}`);
    }
    assert.equal((html.match(/data-sd-analytics-slide /g) || []).length, 9, "Six original dashboards and three GEO views are present");
    assert.equal((html.match(/data-sd-analytics-image/g) || []).length, 9, "All nine supplied graphics are present");
    assert.ok(html.includes("0.1-second wipe/fade") && html.includes("stopping after slide nine"), "Dashboard slideshow explains its automatic sequence and stop");
    assert.ok(html.includes("Replay slideshow"), "Dashboard sequence has an explicit restart control");
    for (const heading of geoSourceGraphics.map(graphic => graphic.title)) {
      assert.ok(html.toLowerCase().includes(heading.toLowerCase()), `GEO view includes ${heading}`);
    }
    assert.ok(html.includes("not live results"), "Dashboard discloses static reference figures");
    assert.equal((html.match(/SUPPLIED GEO GRAPHIC/g) || []).length, 3, "Each GEO graphic discloses illustrative demo data");
    assert.ok(!/data-sd-geo-line|data-sd-geo-bar|data-sd-geo-indicator|si-geo__/.test(html), "Supplied graphics replace all custom GEO dashboards");
    for (const graphic of geoSourceGraphics) {
      const exact = readFileSync(`public/assets/geo-originals/${graphic.file}`).toString("base64");
      assert.ok(out.includes(`src="data:image/png;base64,${exact}"`), `Export embeds exact supplied ${graphic.file} bytes`);
    }
    assert.equal((html.match(/data-sd-geo-source-slide/g) || []).length, 3, "Three supplied GEO slides replace the previous designs");
    assert.equal((html.match(/data-sd-geo-source>/g) || []).length, 3, "New source images retain their own aspect ratio");
    assert.ok(!/data-sd-traffic-line|data-sd-donut|data-sd-visitor-count/.test(html), "Original images replace simulated metrics");
    assert.equal((out.match(/src="data:image\/png;base64,/g) || []).length, 9, "Wix export embeds all nine supplied PNGs");
    assert.ok(html.includes("Can you guarantee rankings or AI citations?"), "SEO retains its no-guarantee answer");
    assert.ok(!html.includes("si-seo-website-copy"), "Public page excludes reference-only copy tools");
  }
  if (slug === "services") {
    assert.equal(local.sections.length, 6, "Services has six separately exportable sections");
    assert.equal((html.match(/data-testid="card-service-/g) || []).length, 6, "Services covers six disciplines");
    assert.ok(html.includes('id="si-svc-process"'), "Services includes its process");
    assert.ok(html.includes('data-sd-portfolio-video'), "Services film uses shared accessible playback");
    assert.ok(html.includes('href="https://www.snowden-design.com/digitalart" target="_top"'), "Digital art uses its existing live page");
    assert.ok(html.includes("No rankings or citations are promised"), "Services avoids search guarantees");
  }
  if (slug === "contact") assert.ok(!/<form/.test(html), "No fake contact form");
  if (slug === "drone-photograph-video") {
    assert.ok(html.includes('data-testid="status-media-empty"'));
    assert.ok(!/<video/.test(html));
  }
}
assert.equal(HEADER_LINKS.length, 9);
assert.ok(headerMarkup({ previewBase: "/" }).includes('href="/work"'), "Root preview uses local page links");
assert.ok(headerMarkup({ previewBase: "/" }).includes('href="/"'), "Root preview branding links home");
assert.ok(headerMarkup().includes('href="https://www.snowden-design.com/digitalart"'), "Digital Art links to its verified Wix page");
assert.ok(headerMarkup({ previewBase: "/nested-preview/" }).includes('href="https://www.snowden-design.com/digitalart"'), "Wix-only Digital Art remains reachable in preview");
const localHeader = headerMarkup({ previewBase: "/nested-preview/" });
assert.ok(!localHeader.replace('href="https://www.snowden-design.com/digitalart"', "").includes('href="https://www.snowden-design.com'), "Only Wix-maintained Digital Art uses a live destination in preview");
assert.ok(headerMarkup().includes('href="https://www.snowden-design.com/3d-interactive"'));
const home = homeBody(assets, { previewBase: "/nested-preview/" });
assert.ok(home.includes('href="/nested-preview/contact"'));
assert.ok(!/home-1|>0[1-9]</.test(home));
assert.equal(LINKS.contact, "https://www.snowden-design.com/contact");
const keywords = read("public/delivery/KEYWORD-STRATEGY.md").match(/^\| \d+ \|/gm);
assert.equal(keywords.length, 50, "Preserve all 50 seed phrases");
const validMedia = {
  photography: [{ src: "https://example.test/photo.webp", alt: 'A "quoted" detail', caption: "<script>not executable</script>", width: 1000, height: 750 }],
  aerial: [],
  video: [{ src: "https://example.test/film.mp4", poster: "https://example.test/poster.webp", title: "An actual film", captionsVtt: "https://example.test/captions.vtt" }],
};
const populated = interiorPage("drone-photograph-video", { assets, media: validMedia }).sections.map(s => s.html).join("");
assert.ok(populated.includes("<video controls"));
assert.ok(populated.includes('kind="captions"'));
assert.ok(!populated.includes('status-media-empty'));
assert.ok(!populated.includes("<script>not executable"));
assert.throws(() => interiorPage("drone-photograph-video", { assets, media: { ...validMedia, photography: [{ src: "", alt: "Broken" }] } }), /HTTPS/);
console.log("Interior checks passed: 8 routes, section counts, local/live separation, metadata, 50 seeds, empty/populated media and export parity.");
