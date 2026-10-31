# 3D & Rendering — Wix Studio placement

This is a reviewable draft and paste-ready delivery, not a live site edit.

## Parent-page search settings

- Existing canonical: https://www.snowden-design.com/3d-interactive
- Title: 3D Design & Interactive Rendering | Snowden Design
- Meta description: Explore MONGRAIN, an illustrative 3D building-envelope project in development. Discuss rendering and interactive visual storytelling with Snowden Design.
- Page intent: 3D design services Denver; illustrative rendering and interactive exploration
- Social title and description: reuse the approved title and description. Choose an approved representative social image in Wix; do not invent an image URL. Use website type, en_US and Snowden Design as site name.
- This Replit preview and standalone HTML remain noindex. Set indexing, canonical and metadata on the parent Wix page. Do not copy the embed's noindex tag into parent SEO settings.

## Recommended hybrid placement

1. Retain native Wix site navigation and the approved native footer. No new header/footer is included in these content exports.
2. Create one native H1: **Give the idea another dimension.**. Use NATIVE-WIX-COPY.md for the matching introduction and substantive service/project copy. Set H2/H3 styles deliberately.
3. Do not stack native copy and an identical full intro embed. Use native introduction and omit the matching introduction embed, or translate the whole intro composition into native Wix elements. Likewise prefer native service explanations, questions and answers; use custom embeds only for the visual/interactive portions you choose to retain. Never hide duplicate keyword text off-screen.
4. Use native Wix image/gallery elements when their images should be credited to this page. Set honest alt text from the HTML, dimensions and appropriate crops. Keep client permissions intact.
5. For a selected custom section, paste only its HTML into a separately named Wix Embed HTML element. The whole-page 3d-interactive.html is a visual reference or alternative single content embed, NOT an additional block to paste alongside all individual sections.
6. Exports demote the visual H1 to H2 so Wix owns the sole native H1. If building the whole page natively, use the supplied native H1 and logical H2/H3 levels.

## Content order and optional embed starting heights

These heights are **starting estimates**, not automatic sizing or verified final Wix heights. Adjust at desktop, tablet and phone to show the complete content without clipping or nested scrolling. Text length, font loading and Wix width affect them.

| Section | HTML filename | Starting height desktop / phone (px) |
|---|---|---|
| 3D — Introduction | si-3d-intro.html | 850 / 1100 |
| 3D — MONGRAIN viewer | sd-mongrain.html | 1100 / 1250 |
| 3D — Where 3D helps | si-3d-uses.html | 750 / 1200 |
| 3D — Next step | si-3d-close.html | 750 / 1200 |

HTML files in this folder have no owner controls. Each preview's adjacent Copy HTML for Wix and Download HTML controls fetch the corresponding file. Regenerate with `pnpm --filter @workspace/snowden-home run export:wix` after source edits.

## Page-specific instructions

Keep the visible Project in development notice and engineering disclaimer. This reuses the original MONGRAIN viewer, not a reconstructed model. It requires JavaScript and WebGL; retain its explicit unavailable fallback. Hosted and srcdoc copies have different routing, so preserve the checked srcdoc adapter. Test model rotation, assemblies and controls on a WebGL-capable device. This delivery does not establish engineering validity.

## Navigation, semantics and iframe limits

Local review routes stay local using explicit preview options. Visitor export links retain the verified live Wix destinations, using _top for same-site navigation. Current destinations: /work, /services, /3d-interactive, /seo-geo, /website-growth, /drone-photograph-video, /about, /contact. Do not use legacy /home-1… links.

Name each iframe with its section subject. The iframe cannot overlay content outside its own bounds. The standalone header needs reserved height for its open menu; use native Wix navigation for seamless overlay. No cross-iframe resizing, Velo integration or parent-document access is supplied. The MONGRAIN iframe has its own accessible name and an explicit fallback.

Title, description, canonical, social tags, structured data, robots settings, sitemap and indexable page copy remain Wix responsibilities. Metadata alone does not make iframe content attributable to the parent or guarantee search/AI visibility. Optional schema: WebPage and CreativeWork for the illustrative development project; use only visible, verified facts, not invented ratings, offers or prices.

## Before Blake publishes

Check all breakpoints in Wix itself; fonts, embeds and native sections do not share document layout. Check no horizontal overflow, readable cream/stone/ink contrast, visible keyboard focus, touch activation, reduced motion and actual media loading. Check external project links and native form delivery where relevant. Keep approved legal links in the native footer. Verify social crops, canonical and indexing settings, sitemap and structured data in the parent page. Only Blake publishes.
