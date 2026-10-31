# Snowden Design — eight interior pages

## Review and delivery

Open the local page paths below in the existing Snowden preview. Use its metallic
menu to move between pages. Copy/download controls sit immediately beside each
section in development. They are absent from visitor exports.

| Page | Local path / live slug | Delivery folder |
|---|---|---|
| Work | /work | work/ |
| Services | /services | services/ |
| 3D & Rendering | /3d-interactive | 3d-interactive/ |
| SEO & GEO | /seo-geo | seo-geo/ |
| Website & Growth Plans | /website-growth | website-growth/ |
| Photography, Video & Aerial | /drone-photograph-video | drone-photograph-video/ |
| About | /about | about/ |
| Contact | /contact | contact/ |

Each folder includes section HTML, `WIX-SETUP.md`, and `NATIVE-WIX-COPY.md`.
The sibling `<slug>.html` file is the full visual content reference, not a second
copy to insert alongside every section. `manifest.json` lists all filenames,
titles, descriptions and destinations. `../KEYWORD-STRATEGY.md` preserves the full
50-phrase seed list and page mapping.

Regenerate all shared Home and interior deliverables from the workspace root:

`pnpm --filter @workspace/snowden-home run export:wix`

Run the repeatable delivery checks:

`pnpm --filter @workspace/snowden-home run check:interiors`

## Verified source inventory — October 26, 2026

- `https://www.snowden-design.com/pages-sitemap.xml` lists every slug above.
  Every corresponding live page returned HTTP 200 without changing its URL.
- GitHub `BlakeSnowdenDesign/Snowden-Design` main contains only `pages/home`
  page deliverables, not completed interiors. Current local Home and the user's
  newer cream/stone/green/orange decisions take precedence over the older README.
  No GitHub branches or live Wix pages were edited.
- Public contact uses `blake@snowden-design.com` and `720-340-2611`, consistent
  with the approved local reference. Do not restore the retired 970 number.
- Portfolio retains Helen Falls Lodge, Shadow Creek Ranch, Edge Internet,
  Harbour View Cottages, Trout Extravaganza and Harbour Island's dock page.
  Existing approved remote media is reused, not copied into fabricated case studies.
- MONGRAIN uses the original viewer and a visible development status. Work
  links to its dedicated page rather than mounting another heavy viewer.
- Contact uses Blake's designated seated studio portrait. Leica remains a
  studio detail only. New media lists remain empty pending supplied work.
- Growth uses a readable reporting explanation rather than exposing the
  supplied Wix Traffic Overview metrics. It makes no GA4/dashboard or result claim.

## Before using these in Wix

Read each setup note. Keep important text, images, navigation, footer and forms
native to the Wix parent page. Give each embed an accessible name and enough
height at each breakpoint. No automatic resize or cross-iframe overlay is included.
The iframe's metadata is not the parent's metadata. These previews remain
noindex, and neither metadata nor readable content guarantees indexing, rankings
or AI citations. Blake reviews copy and publishes manually.

Contact's email and phone links work; no form backend was added. Configure and
test the native Wix form's validation, recipients and actual message delivery.
Preserve existing approved privacy/terms links in the native footer.
