# Snowden Design 2 — Home delivery

## What this delivery changes

This is a reviewed development draft, not a change already applied to Wix.
The target is **Snowden Design 2** only. Do not edit the original Snowden Design site.
The visitor HTML is `snowden-home.html`; the review screen is `/review`.
Review tools must never be pasted into the public site.

Keep the Wix header, navigation, footer, page metadata, lead-capture form, and
the main search-oriented introduction native to Wix. Custom HTML supplies the
visual sections, not the site's global SEO or navigation.

## Verified Wix page addresses

Base: `https://www.snowden-design.com`

Blake connected the real domain to Snowden Design 2. The bare domain
`https://snowden-design.com` redirects to the canonical www domain above.
The live Home canonical and sitemap were verified on October 25, 2026.

| Page | Current suffix | Suggested future suffix — not applied |
|---|---|---|
| Home | none | none |
| Work | `/home-1` | `/work` |
| Services | `/home-1-1` | `/services` |
| 3D & Interactive | `/home-1-1-1` | `/3d-interactive` |
| SEO & GEO | `/home-1-1-1-1` | `/seo-geo` |
| Website Care & Growth | `/home-1-1-1-1-1` | `/plans-support` |
| About | `/home-1-1-1-1-2` | `/about` |
| Contact | `/home-1-1-1-1-2-1` | `/contact` |

These titles and addresses were read from the published site on October 25, 2026.
Do not change slugs without updating links in all delivered pages and coordinating
with Claude. For already indexed addresses, configure appropriate redirects.
The clean-slug column is a recommendation, not an assertion that these routes exist.

## Native Wix Home introduction

Use one native H1:

**Denver web design. Full-spectrum strategy.**

Suggested native introductory paragraph:

Blake Snowden combines custom website design and development, UX, branding and
interactive 3D visualization. Based in Denver, Colorado, Snowden Design builds
responsive Wix Studio websites with SEO, GEO and a plan for growth after launch.

Native button: **Start a Project** → the current Contact page.

Do not create a second native H1 for the same page. The export's visual hero
uses an H2 so it remains subordinate to the native page heading. The standalone
development preview has its own H1. Preview headings do not substitute for
configuring headings in Wix.

## Home SEO settings — proposed copy

Primary intent: **web design Denver**.
Primary natural wording: **Denver web design**.
Supporting language: custom website design Denver, Denver web development,
Wix Studio web designer Denver, responsive website design Denver, branding and
web design Denver. Use readable variations, not a list of keyword phrases.
See `KEYWORD-STRATEGY.md` for the user's complete 50-keyword list and page assignments.

Title:
`Denver Web Design, 3D & SEO | Snowden Design`

Description:
`Denver-based Snowden Design creates Wix websites, 3D visualizations and SEO/GEO strategies, with ongoing site care and marketing support. Start a project.`

Use matching Open Graph title and description. Choose an approved brand/work
image through Wix's social-share settings. Use an image that crops well at
1200 × 630 and inspect the actual preview. Supply its own meaningful alternative
text where the interface supports it.

Wix manages the page's canonical URL. The live Home currently declares
`https://www.snowden-design.com`, matching the connected domain. Keep future
page canonicals and links on that host; do not use the old Wix development URL.
The domain is live, but the Home delivery still needs to be applied in Wix.

The Replit development preview is marked **noindex** intentionally. It is not
the search-indexed replacement for the Wix site.

## Native entity markup

Check Wix's existing business/site markup before adding anything. Avoid duplicate,
conflicting Organization definitions. Merge these factual fields into the native
Wix Organization entity as appropriate:

- name: Snowden Design
- telephone: +1 720-340-2611
- email: blake@snowden-design.com
- locality: Denver
- region: Colorado
- country: US
- URL and logo: use the actual Wix site URL and the approved uploaded logo URL.

Do not invent a street address, review count, rating, opening hours, awards,
prices, or social profiles. Do not add a LocalBusiness address for an office
that has not been confirmed as public.

## Helpful native answers

These are draft, visible page-copy suggestions, not promises of rich search results.

**What does Snowden Design do?**
Snowden Design combines Wix website development, visual design, 3D modeling and
rendering, and search-focused content. Each project starts with the business
goal and the work needed to communicate it.

**What is GEO?**
Generative engine optimization helps make useful, accurate business information
easier for AI-assisted search systems to understand and cite. It complements
technical SEO, clear service descriptions, consistent business information,
and credible examples of real work. Rankings and AI citations are not guaranteed.

**Can support continue after launch?**
Yes. The proposed support offerings cover ongoing website care, SEO/GEO work,
analytics reporting, and optional advertising or social-media management.
Scope, reporting frequency, service levels, platform subscriptions, and ad spend
are agreed in the proposal; no prices or response-time promises are published yet.

## Measurement and analytics

The proposed website deliverable includes a reporting dashboard tailored to agreed
goals. GA4 and Search Console can support traffic, acquisition, and conversion
reporting; verify the client's consent and privacy requirements before enabling
tracking. Do not imply that a real account is connected or conversions are tracked
until configuration and test events are verified.

Any displayed sample dashboard must say **Illustrative demo — not client results**.
Do not use invented results as portfolio evidence.

## Pasting into Wix

1. In the Home page, add **Embed Code → Embed HTML**. Paste the visitor HTML from
   the review screen, not the review screen itself.
2. Stretch the section to the required width and remove unwanted section padding.
   Preserve the native Wix introduction and global header/footer.
3. Preview desktop, tablet, and phone. Set the embed's height to its actual
   rendered content at each breakpoint. Verify every top-level link, keyboard
   focus, the mobile menu, and reduced-motion behavior before publishing.

Iframe heights are not yet measured in the Wix editor. Do not reuse heights
from the old Home draft or guess values. A local preview's height is not proof
that Wix's parent page will size the embed correctly.

## Pre-publish checks

- Confirm the approved logo and new phone replace the old ones on the new site.
- Inspect one native H1, meaningful H2/H3 headings, and readable image descriptions.
- Keep important business/service copy and links in native Wix components.
- Verify no broken routes after any slug updates.
- Confirm mobile text, contrast, focus, and reduced-motion behavior.
- Verify the actual published page's title, description, canonical, and social image.
- Check indexability, Wix sitemap, redirects, Search Console, and Bing Webmaster Tools
  for the final chosen domain.
- Do not add meta-keywords or repeat keyword variants for their own sake.
- Do not promise first-place rankings, PageRank scores, or AI citations.
- Do not blanket-enable model-training crawlers as a prerequisite for search visibility;
  crawler and training preferences are separate decisions.
- Publish only when Blake approves the Wix page.

## Claude / GitHub handoff

The original Home draft was read from `BlakeSnowdenDesign/Snowden-Design` on `main`.
This refresh must go through its own `replit/home-refresh` branch and pull request,
never a direct push to `main` or Claude's branch.

GitHub attachment was unavailable in this Replit project during the initial build.
No GitHub branch, commit, or PR was created. Keep this handoff with the deliverable
until access is available and a pull request can be opened.
