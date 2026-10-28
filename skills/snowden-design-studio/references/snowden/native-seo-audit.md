> Source: Snowden-Design project, `docs/native-seo-audit.md` (26 Oct 2026). Page-specific status here is a snapshot.

# Native SEO audit: every page

October 26, 2026. Checks each page against Blake's rule: the embed carries the design, motion and 3D, and Wix itself carries the SEO foundation. Sources: each page's setup doc on its branch, `docs/copy-deck.md` (PR #9) and the live site.

## The checklist

1. One visible native H1 naming the page and service.
2. A short original native intro naming the service, and Denver where it fits.
3. Key service details, project links and CTAs as native text and links.
4. A unique title, meta description, slug and canonical in the Wix SEO panel.
5. Alt text on meaningful native images, and a descriptive accessible name (iframe `title`) on every embed.

## Results

| Page | Owner / PR | 1 H1 | 2 Intro | 3 Links and CTAs | 4 SEO panel | 5 Alt + embed title | Fixed in this round |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Claude, `main` → this PR | Was inside the embed; now native | Native, names Denver | Native services, work, 3D, plans, FAQ, CTA | Draft saved | Specified | New `pages/home/WIX-SETUP.md`. The embed loses its hero H1, CTA and footer; 970 → 720 number gone with the CTA; /projects → /work, /contact-1 → /contact; heights re-measured |
| Work | Replit | Spec'd in copy deck | Spec'd | Spec'd | Draft saved | Spec'd | Nothing in the repo yet; notes for Replit below |
| 3D Visualization | Claude, PR #7 | Native | Native | Native gallery, FAQ, CTA | Draft saved | Gallery alt done; embed name added | The embed's own hero headline is now an H2, so the native H1 is the page's only H1; accessible-name field location added |
| Packages | Claude, PR #6 | Native | Native | Native plans, SEO and GEO, FAQ, CTA | Draft saved | Embed name added | Same H1 → H2 change in the embed; accessible-name field location added |
| About | Claude, PR #3 | Native | Native | Native answers, story, links, CTA | Draft saved | Portrait alt done | Signature embed now has an accessible name |
| Contact | Claude, PR #4 | Native | Native | Native form, buttons, answers, links | Draft saved | n/a | Signature embed now has an accessible name |
| Privacy Policy | Native page, copy deck | Native | Native | Footer link only | Draft saved | n/a | None needed |
| Site header | Replit, PR #10 | n/a | n/a | Menu links sit inside an iframe | n/a | Needs a name | Note for Replit below |

## Embed accessible names

In Wix, select the embed and open its Accessibility settings (in some editors this sits under Settings). Wix writes the field to the iframe's `title` attribute.

| Page | Embed | Accessible name |
| --- | --- | --- |
| Home | `snowden-home.html` | Snowden Design studio, services, selected work and process |
| 3D Visualization | `snowden-3d-visualization.html` | Interactive 3D building-envelope explorer for Mongrain |
| Packages | `snowden-packages.html` | Basecamp, Ascent and Summit website maintenance plans with a sample GA4 report |
| About | `snowden-about.html` | Snowden Design services, principles and client sites |
| Contact | `snowden-contact.html` | How a Snowden Design project starts |
| Home, About, Contact | `shared/snowden-signature.html` | Snowden Design geometric signature, decorative |
| Every page | `shared/header/snowden-header.html` | Snowden Design site navigation |
| Work | Replit's embed, if any | Snowden Design web design portfolio project gallery |

## The live site today

On October 26 the public site at www.snowden-design.com still served the old pages (Home, /projects, /about, /contact-1), and /3d-visualization returned an error. On those old pages, /about and /projects have no H1, most images have empty or file-name alt text such as "sd logo3 WHITE.png", and the footer shows 970•685•8733. All of this is fixed once Snowden Design 2 is published with the native blocks above, the slugs renamed, and the 301s from /projects and /contact-1 in place.

## Notes for Replit

- **Work:** build the hero H1, intro, project cards (H3, context line, description, "Visit site" link), answer block, FAQ and CTA as native Wix elements, from the copy deck's Work section. If the project grid is an embed, keep a native text version of the eight projects and their links on the page too. Native images use the copy deck's file names and alt text.
- **Header:** with the menu inside an HTML embed, its links are iframe links, and Google may not count them as internal links. The native footer links (Work · 3D Visualization · Packages · About · Contact · Privacy Policy) carry the internal linking, so they must stay native. Give the header embed the accessible name above.

## If copy ever stays inside an embed

Blake's fallback still applies: the text must be ordinary HTML in the embed, not canvas-drawn or hidden behind a click. Every embed here already meets that; the 3D model's canvas has a text and image fallback. We don't depend on it, because every page's ranking copy is native.
