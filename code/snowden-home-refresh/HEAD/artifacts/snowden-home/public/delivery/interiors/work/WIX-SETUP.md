# Work — Wix Studio placement

This is a reviewable draft and paste-ready delivery, not a live site edit.

## Parent-page search settings

- Existing canonical: https://www.snowden-design.com/work
- Title: Web Design & 3D Portfolio Denver | Snowden Design
- Meta description: Explore selected websites and illustrative 3D work from Blake Snowden’s independent Denver studio. See the projects and discuss what you want to create.
- Page intent: Portfolio evidence: digital art and design Denver; selected websites and illustrative 3D
- Social title and description: reuse the approved title and description. Choose an approved representative social image in Wix; do not invent an image URL. Use website type, en_US and Snowden Design as site name.
- This Replit preview and standalone HTML remain noindex. Set indexing, canonical and metadata on the parent Wix page. Do not copy the embed's noindex tag into parent SEO settings.

## Recommended hybrid placement

1. Retain native Wix site navigation and the approved native footer. No new header/footer is included in these content exports.
2. Create one native H1: **Design with depth. Vision meets technology.**. Use NATIVE-WIX-COPY.md for the matching introduction and substantive service/project copy. Set H2/H3 styles deliberately.
3. Do not stack native copy and an identical full intro embed. Use native introduction and omit the matching introduction embed, or translate the whole intro composition into native Wix elements. Likewise prefer native service explanations, questions and answers; use custom embeds only for the visual/interactive portions you choose to retain. Never hide duplicate keyword text off-screen.
4. Use native Wix image/gallery elements when their images should be credited to this page. Set honest alt text from the HTML, dimensions and appropriate crops. Keep client permissions intact.
5. For a selected custom section, paste only its HTML into a separately named Wix Embed HTML element. The whole-page work.html is a visual reference or alternative single content embed, NOT an additional block to paste alongside all individual sections.
6. Exports demote the visual H1 to H2 so Wix owns the sole native H1. If building the whole page natively, use the supplied native H1 and logical H2/H3 levels.

## Content order and optional embed starting heights

These heights are **starting estimates**, not automatic sizing or verified final Wix heights. Adjust at desktop, tablet and phone to show the complete content without clipping or nested scrolling. Text length, font loading and Wix width affect them.

| Section | HTML filename | Starting height desktop / phone (px) |
|---|---|---|
| Work — Introduction | si-work-intro.html | 850 / 1100 |
| Work — Featured case study: Lime Tree Hospitality | si-work-limetree-feature.html | 1050 / 1250 collapsed; allow more when lookbook is open |
| Work — Portfolio | sd-work.html | 1800 / 4400 |
| Work — Next step | si-work-close.html | 750 / 1200 |

HTML files in this folder have no owner controls. Each preview's adjacent Copy HTML for Wix and Download HTML controls fetch the corresponding file. Regenerate with `pnpm --filter @workspace/snowden-home run export:wix` after source edits.

## Page-specific instructions

The Lime Tree Hospitality case study sits above the portfolio and expands the approved project brief, editorial approach and four deliverables (digital lookbook, video, social media design and design stories). Two supplied films appear in the case study outside the complete uploaded Guest Rooms lookbook; the portrait film remains 4:5 with controls, inline playback and metadata preload. The original presentation is mounted only when its accessible disclosure opens and is not modified. The supplied Instagram post is linked directly without a simulated embed or unverified post copy. The lookbook archive contains 23 properties, 571 photographs and 10 films; these are archive contents, not performance outcomes. The Gold Key Awards 2026 film is awards-themed and does not claim a client or studio win. Keep the existing portfolio cards. MONGRAIN links to /3d-interactive rather than loading another viewer. Verify external destinations and media permission again before publishing.

## Navigation, semantics and iframe limits

Local review routes stay local using explicit preview options. Visitor export links retain the verified live Wix destinations, using _top for same-site navigation. Current destinations: /work, /services, /3d-interactive, /seo-geo, /website-growth, /drone-photograph-video, /about, /contact. Do not use legacy /home-1… links.

Name each iframe with its section subject. The iframe cannot overlay content outside its own bounds. The standalone header needs reserved height for its open menu; use native Wix navigation for seamless overlay. No cross-iframe resizing, Velo integration or parent-document access is supplied. The MONGRAIN iframe has its own accessible name and an explicit fallback.

Title, description, canonical, social tags, structured data, robots settings, sitemap and indexable page copy remain Wix responsibilities. Metadata alone does not make iframe content attributable to the parent or guarantee search/AI visibility. Optional schema: CollectionPage with truthful CreativeWork details; use only visible, verified facts, not invented ratings, offers or prices.

## Before Blake publishes

Check all breakpoints in Wix itself; fonts, embeds and native sections do not share document layout. Check no horizontal overflow, readable cream/stone/ink contrast, visible keyboard focus, touch activation, reduced motion and actual media loading. Check external project links and native form delivery where relevant. Keep approved legal links in the native footer. Verify social crops, canonical and indexing settings, sitemap and structured data in the parent page. Only Blake publishes.
