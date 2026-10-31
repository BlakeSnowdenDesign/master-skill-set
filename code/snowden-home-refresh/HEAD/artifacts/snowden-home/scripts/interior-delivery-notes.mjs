import { writeFileSync } from "node:fs";

const notes = {
  work: "The Lime Tree Hospitality case study sits above the portfolio and expands the approved project brief, editorial approach and four deliverables (digital lookbook, video, social media design and design stories). Two supplied films appear in the case study outside the complete uploaded Guest Rooms lookbook; the portrait film remains 4:5 with controls, inline playback and metadata preload. The original presentation is mounted only when its accessible disclosure opens and is not modified. The supplied Instagram post is linked directly without a simulated embed or unverified post copy. The lookbook archive contains 23 properties, 571 photographs and 10 films; these are archive contents, not performance outcomes. The Gold Key Awards 2026 film is awards-themed and does not claim a client or studio win. Keep the existing portfolio cards. MONGRAIN links to /3d-interactive rather than loading another viewer. Verify external destinations and media permission again before publishing.",
  services: "Website design and cinematic video lead the offering, supported by photography and aerial imagery, 3D and interactive design, brand identity and digital art, and search visibility and ongoing care. Confirm deliverables and support during scoping; do not imply guaranteed rankings, AI citations, performance results or an included maintenance package. Reuse only approved project imagery and films. AI-assisted editing describes a production technique, not a standalone guaranteed deliverable. Keep contact and discipline links functional in both the local preview and standalone Wix sections.",
  "3d-interactive": "Keep the visible Project in development notice and engineering disclaimer. This reuses the original MONGRAIN viewer, not a reconstructed model. It requires JavaScript and WebGL; retain its explicit unavailable fallback. Hosted and srcdoc copies have different routing, so preserve the checked srcdoc adapter. Test model rotation, assemblies and controls on a WebGL-capable device. This delivery does not establish engineering validity.",
  "seo-geo": "The six original 1672×941 PNGs are the source of truth, in supplied filename order. They are reference graphics, not live analytics or evidence of client outcomes. Do not correct, reinterpret, redraw, recolor or crop their contents, even if figures differ between panels. Three-second one-shot reveals cover only existing chart plot regions; the map uses temporary glows centered on existing markers. Original labels and surrounding interface stay still. Navigation, replay, pause/play, reduced-motion and offscreen pausing travel with the HTML export. The export embeds the exact original image bytes so it works in Wix without a Replit development URL; this makes the gallery HTML approximately 12 MB. For a smaller embed, upload the unchanged PNGs to Wix and provide their permanent URLs for substitution. No analytics connection or tracking is installed by the showcase. Keep the explicit no-guarantee answer. Do not claim rankings, traffic, leads or AI citations. Native FAQ answers must match visible answers if you choose FAQPage schema; eligibility for rich results is separate. Crawler access does not guarantee indexing or citations. Search-crawler and AI-training permissions are separate owner choices.",
  "website-growth": "Ten sections connect ongoing website upkeep, SEO and evolving GEO practices, helpful organic content, scoped PPC campaigns, social media and relevant business partnerships. These are possible support areas to discuss, not priced tiers or service-level commitments. Confirm scope, cadence, approvals, account access, ad spend, platform costs, third-party fees and exclusions before quoting. Retain the eight-area recurring plan, four-step review process and visible limits on search/AI placement or advertising results. Relevant partnerships are editorial/customer resources, never paid link manipulation or unrelated link swaps. Social platform examples are optional channels chosen for the business, not a commitment to publish on all six. Growth-review CTAs navigate to Contact; they do not complete a booking or imply a configured calendar. Use the existing approved native Wix enquiry flow and verify actual message delivery separately. Keep descriptive native Wix headings and substantive copy; do not duplicate all embedded text invisibly for SEO.",
  "drone-photograph-video": "Edit src/media-inventory.mjs when Blake supplies cleared media. Use durable HTTPS media sources, descriptive alt text, dimensions, captions, video posters and WebVTT captions for speech. No empty src attributes or pretend play buttons. The Leica image is studio detail only, not a client sample. Confirm ownership, aerial permissions, flight feasibility and any required operator qualifications for each brief; this page claims none. Empty lists yield one understated public message, not placeholder cards.",
  about: "Independent Denver studio, direct work with Blake and multidisciplinary practice are the approved facts. Do not add years, awards, employers, credentials or a larger team without confirmation. The existing Home portrait is retained here; the designated seated studio portrait belongs to Contact.",
  contact: "Place a native Wix form after the contact introduction and before or alongside Helpful to mention. Suggested fields: name (required), email (required, validated), business (optional), website URL (optional), project message (required), optional timing and budget context. Use clear visible labels, field-level errors, keyboard focus and an honest submission status. Configure recipients and test delivery in Wix; these HTML files contain no submitting form and never simulate success. Keep verified email blake@snowden-design.com and phone +1 720-340-2611. Use the supplied seated portrait. Link existing approved privacy/terms pages in the native footer, not invented legal text.",
};

function text(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<(iframe|video)[\s\S]*?<\/\1>/g, "")
    .replace(/<h([1-6])[^>]*>/g, (_, n) => "\n\n" + "#".repeat(Number(n)) + " ")
    .replace(/<\/h[1-6]>/g, "\n\n")
    .replace(/<\/(span|b|a)>/g, " ")
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<(p|dt|dd|figcaption)[^>]*>/g, "\n")
    .replace(/<\/(p|article|div|section|ul|dl|dd|dt|figcaption)>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .split("\n").map(line => line.trim()).filter(Boolean).join("\n\n");
}

notes["seo-geo"] += " Views 07–09 now use the three supplied 1680×1050 GEO PNGs: AI visibility overview, Prompt & citation intelligence, and AI referral performance. The earlier custom-rendered GEO dashboards have been removed. All nine supplied images are embedded unchanged in the export (approximately 13 MB total). Retain the illustrative/demo/not-live disclosures, even when individual panels do not numerically reconcile; do not silently correct source artwork. GEO animation reveals existing plot areas and exact bar regions, with a gentle masked donut reveal that leaves its center value and legend still. The whole supplied image remains intact and proportionally scaled, not reflowed or redrawn. Use ?dashboard=7, ?dashboard=8 or ?dashboard=9 to open a particular view. Reserve enough iframe height for the taller GEO images and their controls. The slideshow automatically advances only after every chart reveal on the current graphic finishes. A simultaneous 50 ms (0.05 second) outgoing/incoming wipe and fade completes before the next graphic starts its reveal. It runs through slide nine and stops without wrapping; Replay slideshow or Play at the end restarts from slide one. Pause, offscreen and background-tab suspension cover both charts and transitions. Reduced motion disables automatic advancement and wipe/fade motion while keeping manual navigation available. A not-yet-loaded next image holds advancement until it is ready.";

notes["seo-geo"] = notes["seo-geo"]
  .replace("Three-second one-shot", "Six-second one-shot")
  .replace("50 ms (0.05 second)", "100 ms (0.1 second)");
notes["seo-geo"] += " All dashboard and transition animations now play at 0.5x speed: chart cycles last six seconds and wipe/fades last 0.1 seconds. Sequence order, final-slide stopping, pause and reduced-motion behavior are unchanged.";
notes["seo-geo"] += " View full size opens the active unchanged PNG at its original pixel dimensions in an in-embed modal with horizontal/vertical scrolling. The slideshow pauses until Play is chosen. Close or Escape restores focus to View full size. Native touch scrolling and pinch zoom remain available; the Close button stays outside the scrolling image area. The dialog cannot extend beyond its Wix iframe. In tall embeds it opens near its trigger rather than the iframe midpoint. Check phone portrait/landscape placement and iframe height in Wix before publishing.";

notes["website-growth"] += " The opening hero now embeds the user-supplied 3D website hub (aluminum monitor, orbiting channel pills, sequential traffic pulses). The exported hero contains the nested animation HTML and its original PNG poster inline; it does not need a Replit development URL. Three.js modules load from jsDelivr and typography from Google Fonts, so the animated view requires network access and WebGL. Reduced motion uses a still render; devices without WebGL show the supplied poster and an explicit static-preview notice. A pause/play button is available for the continuous animation. Keep hero copy and CTA in the outer section, not inside the animation.";

export function writeDeliveryNotes(page) {
  const dir = `public/delivery/interiors/${page.slug}`;
  const h1 = text(page.sections[0].html).split("\n\n").find(line => line.startsWith("# "))?.slice(2) || page.name;
  writeFileSync(`${dir}/NATIVE-WIX-COPY.md`, `# ${page.name} — native Wix copy

Copy from the same source as the visual review. Headings below indicate Wix text styles, not hidden SEO text. Keep one H1: “${h1}”. Build important copy and indexable images natively instead of duplicating entire visual embeds. Links, video alternatives and button labels must be wired to the destinations in WIX-SETUP.md or the HTML, not pasted as inert text.

${page.sections.map(section => `## Native section: ${section.label}\n\n${text(section.html)}`).join("\n\n---\n\n")}
`);
  const serviceHeights = {
    "si-grow-hero": "1100 / 1600",
    "si-seo-dashboard": "2200 / 3100; full-size viewer scrolls inside this embed",
    "si-svc-intro": "820 / 850",
    "si-svc-lead": "1600 / 1750",
    "si-svc-core": "1500 / 2600",
    "si-svc-spec": "850 / 950",
    "si-svc-process": "820 / 1200",
    "si-svc-close": "450 / 550",
  };
  const heights = s => serviceHeights[s.id] || (s.id === "sd-work" ? "1800 / 4400" : s.id === "si-work-limetree-feature" ? "1050 / 1250 collapsed; allow more when lookbook is open" : s.id === "sd-mongrain" ? "1100 / 1250" : s.id.includes("intro") ? "850 / 1100" : "750 / 1200");
  writeFileSync(`${dir}/WIX-SETUP.md`, `# ${page.name} — Wix Studio placement

This is a reviewable draft and paste-ready delivery, not a live site edit.

## Parent-page search settings

- Existing canonical: https://www.snowden-design.com/${page.slug}
- Title: ${page.title}
- Meta description: ${page.description}
- Page intent: ${page.intent}
- Social title and description: reuse the approved title and description. Choose an approved representative social image in Wix; do not invent an image URL. Use website type, en_US and Snowden Design as site name.
- This Replit preview and standalone HTML remain noindex. Set indexing, canonical and metadata on the parent Wix page. Do not copy the embed's noindex tag into parent SEO settings.

## Recommended hybrid placement

1. Retain native Wix site navigation and the approved native footer. No new header/footer is included in these content exports.
2. Create one native H1: **${h1}**. Use NATIVE-WIX-COPY.md for the matching introduction and substantive service/project copy. Set H2/H3 styles deliberately.
3. Do not stack native copy and an identical full intro embed. Use native introduction and omit the matching introduction embed, or translate the whole intro composition into native Wix elements. Likewise prefer native service explanations, questions and answers; use custom embeds only for the visual/interactive portions you choose to retain. Never hide duplicate keyword text off-screen.
4. Use native Wix image/gallery elements when their images should be credited to this page. Set honest alt text from the HTML, dimensions and appropriate crops. Keep client permissions intact.
5. For a selected custom section, paste only its HTML into a separately named Wix Embed HTML element. The whole-page ${page.slug}.html is a visual reference or alternative single content embed, NOT an additional block to paste alongside all individual sections.
6. Exports demote the visual H1 to H2 so Wix owns the sole native H1. If building the whole page natively, use the supplied native H1 and logical H2/H3 levels.

## Content order and optional embed starting heights

These heights are **starting estimates**, not automatic sizing or verified final Wix heights. Adjust at desktop, tablet and phone to show the complete content without clipping or nested scrolling. Text length, font loading and Wix width affect them.

| Section | HTML filename | Starting height desktop / phone (px) |
|---|---|---|
${page.sections.map(s => `| ${s.label} | ${s.id}.html | ${heights(s)} |`).join("\n")}

HTML files in this folder have no owner controls. Each preview's adjacent Copy HTML for Wix and Download HTML controls fetch the corresponding file. Regenerate with \`pnpm --filter @workspace/snowden-home run export:wix\` after source edits.

## Page-specific instructions

${notes[page.slug]}

## Navigation, semantics and iframe limits

Local review routes stay local using explicit preview options. Visitor export links retain the verified live Wix destinations, using _top for same-site navigation. Current destinations: /work, /services, /3d-interactive, /seo-geo, /website-growth, /drone-photograph-video, /about, /contact. Do not use legacy /home-1… links.

Name each iframe with its section subject. The iframe cannot overlay content outside its own bounds. The standalone header needs reserved height for its open menu; use native Wix navigation for seamless overlay. No cross-iframe resizing, Velo integration or parent-document access is supplied. The MONGRAIN iframe has its own accessible name and an explicit fallback.

Title, description, canonical, social tags, structured data, robots settings, sitemap and indexable page copy remain Wix responsibilities. Metadata alone does not make iframe content attributable to the parent or guarantee search/AI visibility. Optional schema: ${page.slug === "about" ? "AboutPage and Person" : page.slug === "contact" ? "ContactPage and the existing ProfessionalService identity" : page.slug === "work" ? "CollectionPage with truthful CreativeWork details" : page.slug === "3d-interactive" ? "WebPage and CreativeWork for the illustrative development project" : "WebPage and accurately scoped Service"}; use only visible, verified facts, not invented ratings, offers or prices.

## Before Blake publishes

Check all breakpoints in Wix itself; fonts, embeds and native sections do not share document layout. Check no horizontal overflow, readable cream/stone/ink contrast, visible keyboard focus, touch activation, reduced motion and actual media loading. Check external project links and native form delivery where relevant. Keep approved legal links in the native footer. Verify social crops, canonical and indexing settings, sitemap and structured data in the parent page. Only Blake publishes.
`);
}
