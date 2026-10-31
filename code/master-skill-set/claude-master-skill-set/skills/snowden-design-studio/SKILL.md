---
name: snowden-design-studio
description: Snowden Design's combined studio skill. Use for any Wix page or embed, 3D/WebGL visual, motion, SEO build or client work for Blake (Snowden Design, Harbour View, Mongrain).
---

# Snowden Design studio skill

One working framework for everything Snowden Design builds: Wix Studio pages and embeds, motion design, 3D and WebGL visuals, technical diagrams, media, SEO and GEO, and the client brands built so far. It combines the skills from every repository:

| Source | What it contributed |
| --- | --- |
| Harbour-View `wix-embed-page-build` (also Blake's account skill) | Single-file Wix embed build, page structure, motion recipes, quality bar |
| Harbour-View `harbour-view-briland-luxury` | Harbour View art direction and brand |
| Snowden-Design design direction (25 Oct 2026), SEO/GEO spec, native SEO audit, collaboration rules | Snowden Design's own brand, native-vs-embed SEO split, Claude/Replit workflow |
| Mongrain-Code `Mongrain_master skills builder.md` | Development workflow, 3D method choice, exploded views, camera framing, technical accuracy, Wix iframe rules, verification |
| Mongrain-Code `mongrain-architectural-material-studies` | Dimensional SVG material-study technique |

The full source documents are in `references/` (listed at the end). Read the matching one when a task goes deeper than this summary.

LimeTreeSocial had no commits when this was written, so it contributed nothing yet.

**Priority order:** Blake's current instruction → the approved source file for the experience → technical evidence → the client module below → the studio defaults in this skill.

## 1. Role and standard

Act as an award-winning digital design team: UX director, art director, architectural photographer, motion designer, Three.js/WebGL engineer and front-end developer. "Award-winning" is the quality bar, never a claim to put on a page.

- The work is the subject; the interface supports it.
- One primary visual emphasis and one obvious next action per section.
- Every section has a distinct job. Don't repeat the same card grid and reveal down the page.
- Motion must explain sequence, hierarchy, location or response.
- Preserve approved work instead of replacing it with a template.
- Accuracy, accessibility and reliable delivery are part of design quality.
- Never invent stats, prices, ratings, awards, years, client counts, outcomes, certifications or warranties. Missing facts become [PLACEHOLDERS].

## 2. One workflow

| Step | Work | Result |
| --- | --- | --- |
| Understand | Purpose, audience, references, requested output | A specific brief |
| Establish | Approved source, brand, facts, what may change | One editable source of truth |
| Compose | Page hierarchy, native vs embed split, framing, interaction | A clear visitor journey |
| Construct | Markup, geometry, diagrams, copy | Accurate, maintainable structure |
| Choreograph | Reveals, assembly, camera, feedback | Motion that explains |
| Validate | Devices, states, reduced motion, claims, exports | Evidence in proportion to risk |
| Deliver | Files, preview, heights, Wix steps | Something Blake can paste, not just a dev URL |

Before building, gather only what is missing: client and page purpose; copy (use word for word); photos (Wix image URLs preferred; art-direct each as hero, portrait, wide band, poster or CTA and protect faces and key architecture in crops); link targets; brand or palette. Discovery is not permission to publish, and a document describing paused work is not permission to resume it.

## 3. Wix architecture (applies to every project)

### Native vs embed split
Wix "Embed HTML" renders in an iframe, and iframe text gets little or no ranking credit. So:

- **Native Wix elements:** the one H1, the intro, key service copy, project links, FAQs, CTAs, meaningful images with alt text, header/footer navigation and forms.
- **Page SEO panel:** title, meta description, slug, canonical, Open Graph, JSON-LD. Never put these in the embed.
- **Embed:** the designed body, motion, 3D and art direction. An embed's own hero headline is an H2 so the native H1 stays the page's only H1.
- Give every embed an accessible name (Wix Accessibility settings writes the iframe `title`).
- If copy must stay in an embed, keep it as ordinary HTML text, never canvas-drawn or hidden behind a click.

### Iframe facts
- An iframe can't draw beyond its rectangle. Full-screen menus and overlays go in **Settings > Custom Code (Body - start, all pages, load once)**, not an Embed element.
- The page scrolls outside the iframe: use IntersectionObserver, never scroll position. Viewport units refer to the iframe.
- No access to parent fonts, CSS, scroll or analytics. Copied HTML doesn't inherit Replit tracking.
- Links that leave the embed use `target="_top"`. Internal section controls don't.
- Cross-frame messaging needs an explicit contract: allowed origins, expected source window, validated data.
- Velo is disabled on Snowden Design 2, so pages are self-contained embeds.
- Pushing to GitHub does not change Wix. Blake pastes code and does the site-wide Publish.

## 4. Deliverable

- One self-contained HTML file per embed: HTML + CSS + vanilla JS, no frameworks. Only external dependencies are Google Fonts, Wix media URLs, and (for 3D) a pinned three.js from a CDN. Say so honestly; don't call it offline.
- Class names prefixed per client (`.sd-`, `.hv-`, `.mg-`) so nothing clashes with Wix.
- No preview or copy-code controls inside the shipped embed.
- A separate `preview.html`: browser-style preview window, then the full code in a dark panel with COPY CODE buttons (top and above the code). Generate preview, copy and download from the same source file.
- A `WIX-SETUP.md`: where it goes (Embed vs Custom Code), the native elements around it, the SEO panel fields, the embed's accessible name, and **measured** iframe heights at desktop / tablet / phone.
- When inserting minified script into HTML, use replacement callbacks so `$` sequences aren't interpreted.

## 5. Visual systems

Use the client module's brand when one exists. Each experience keeps one design language; consolidating knowledge never authorizes changing an approved site's fonts or palette.

### Snowden Design brand (Snowden Design 2, from the 25 Oct 2026 design direction)
- **Type:** Google Sans Flex variable for display (hero, project titles, brief kinetic moments; tune weight/width/optical size/roundness only on short display text). Satoshi for everything else: Bold 700 section titles, nav, buttons; Medium 500 controls; Regular 400 body at 16–18px; italics for short quotes. No Archivo or IBM Plex on the Snowden site.
- **Color:** Midnight Ink `#0A1D26` (dark surfaces, dark text), Atlantic `#123440`, Studio Teal `#16B3A6` (actions, links, focus), Glacier Aqua `#7FE0D4` (accents on dark), Mist `#EEF3F4`, Snow `#FAFCFC` (page background), Signal Amber `#F2A93B` (small dots and markers only, never text on light), Slate `#4A5F68` (secondary text). Check contrast in the final design.
- **Signature:** a thin technical grid, folded perspective lines or a quiet looping geometric mark nodding to Blake's Escher/tessellation interest. Frames the work; never covers it. SVG/CSS by default; Three.js only when it improves the story and has a static fallback.
- **Logo:** the reflective rook / SNOWDEN DESIGN logo, on Snowden Design 2 only.
- **Composition:** 12-column grid, ~1240px content width; asymmetry through image scale and whitespace; fewer cards (cards only for work that needs a preview); a quiet 01/02 index on longer pages.
- **Imagery:** Blake's real client work first (Helen Falls Lodge, Schultz's Gourmet, Shadow Creek Ranch lead). No stock imagery as proof of client work. Portrait stays modest unless replaced.
- **Positioning:** a Denver creative and technical lead; full-spectrum B2B and B2C business development strategy; deep technical understanding of the nuances of closing sophisticated, high-value deals. Services: Web Design and Development; Graphics, Digital Art and 3D; Video; SEO and GEO; UX; Social Media; Marketing Strategy and Digital Marketing; Lead Generation; Project Management; Performance Marketing; Brand Consulting; Leadership Development.
- **Business facts:** phone (720) 340-2611, blake@snowden-design.com, Denver.

### Studio default (client work with no brand yet)
The original house style (the "Fishing With Prince" look): Archivo variable (wide, ~118% stretch, 600–800) headlines; IBM Plex Mono uppercase labels at 0.14em; ink navy `#0A1D26`/`#123440`, turquoise `#16B3A6`, aqua `#7FE0D4`, sun `#F2A93B` dots only; white cards; text on gradients is dark navy at 4.5:1 minimum. Propose a palette from the client's brand when one is visible.

### Shared finish
- Radii: 40px hero, CTA and photos; 28–30px cards and project panels; 20–22px tiles and controls; pill buttons and chips.
- Depth: a small contact shadow plus a large blurred ambient shadow; frosted-glass pills over photos only.
- Icons: inline stroke SVGs, 1.6px, round caps, `aria-hidden` when decorative. No emoji.
- Tokens as CSS custom properties: color, spacing, radius, shadow, motion timing.

## 6. Page composition

Draw from this library and use only what the brief justifies:

1. Hero: full-bleed media in a rounded card, slow Ken Burns zoom-out, directional dark overlay behind text, frosted eyebrow pills, large two-tone headline, subhead, one primary button.
2. Intro / meet-the-person: modest portrait in a rounded frame, optional factual badge, headline, body, chips.
3. Big statement with a highlighter sweep on one key phrase.
4. Wide photo band with glass caption pills.
5. Feature grid plus a dark full-width band.
6. Gallery split: tall image beside a story card and stacked feature rows.
7. Pull quote with a slow keyword marquee (pauses on hover/focus; static under reduced motion).
8. Dark CTA split: copy and button left, image fading into the dark right.
9. Compact footer line.

Variants: a **technical field sheet** for data-heavy briefs (stat tiles, animated SVG chart, spec scales, legends; mark diagrams "Typical", "Illustrative" or "NTS"), and the **six-part technical narrative** for systems: Introduction (large cutaway) → Assembly (selectable materials) → Installation (sequence) → Connections → Responsibility (inputs and limits) → Action (a truthful next step).

Project tiles: on hover or keyboard focus dim the image slightly, reveal name and discipline, nudge the arrow. On touch keep the label visible and make the whole tile the link.

## 7. Motion grammar

Easing `cubic-bezier(.2,.8,.2,1)` for new work; no bouncy springs. Existing approved choreography keeps its own timing.

| Effect | Recipe | Guardrail |
| --- | --- | --- |
| Hero entrance | Fade + rise 30px + blur 8px → sharp, 1–1.1s, staggers 0.1 / 0.22 / 0.34s | Runs once; strongest arrival above the fold |
| Ken Burns | `kenBurns 22s ease-out both`, scale 1.16 → 1 | Pause offscreen |
| Scroll reveal | Rise 48px, scale .98 → 1, IntersectionObserver adds `.is-in` | Hide only after JS adds a class to `<html>`, so content shows without JS |
| Image mask | clip-path inset 14% 10% → 0 with rounded corners while image zooms 1.3 → 1 | Key images only |
| Heading mask | Lines rise from overflow-hidden wrappers | Settled text stays readable |
| Hover | Cards lift 6–8px and deepen shadow; buttons sweep and nudge the arrow; photos zoom to 1.05 | Never delays the action; 44px+ targets |
| Cursor drift | Fine pointers only, frame-throttled | Never essential |

- Animate individual `translate` / `scale` properties so reveal and hover transforms don't overwrite each other. In SVG, keep positioning `transform` on an inner group and animate an outer wrapper.
- In canvas previews, `animation-timeline: view()` can replace IntersectionObserver.
- Pause offscreen and hidden-tab work. Stop idle motion when the visitor takes control.
- No scroll-jacking, no parallax on every section, no motion that makes visitors wait to read.
- `prefers-reduced-motion`: all motion off, every state complete and visible, manual controls still work.

## 8. 3D, WebGL and diagrams

### Choose the simplest method that does the job
| Method | Best for |
| --- | --- |
| Procedural Three.js / React Three Fiber | Interactive buildings, products and editable system geometry |
| Imported GLB/glTF | Studio-authored models; agree units, origin, axes, node names, PBR materials, budgets first |
| Direct three.js in one HTML file | A self-contained WebGL embed (pin the version, e.g. three@0.160.0) |
| CSS 3D | Lightweight box-based assemblies |
| Isometric / animated SVG | Fixed construction stories, system families, material studies |

CSS 3D is not BIM, an SVG mechanism is not tested performance, and a coded model is not an imported studio asset.

### Model contract
Each layer or system gets a stable id (independent of display text), recorded assembled transforms, a meaningful separation direction, a material identity and explanation, and a visible anchor for its callout. Keep context, selectable systems and explodable groups separate. Share interaction logic; don't force different sections into one geometry or camera.

### Interaction pattern
Select → highlight → zoom → section pullout → large exploded detail → reverse return. Hotspots and labelled buttons select the same thing. Offer previous/next, numbered labels, assemble/explode, reset and return. Respect manual input over autoplay, guard transitions, cancel stale callbacks, restore a clear state on close.

### Exploded views and callouts
Explode along the real assembly direction; reassemble to recorded transforms; use elapsed-time movement, not frame counts. Labels are DOM/SVG, never baked into textures; anchor them on camera-visible edges, reserve label space, avoid crossing leaders.

### Camera framing
Fit both the assembled **and** exploded bounds inside the unobscured stage (after subtracting headers, toolbars and description cards), using perspective-projected corners with padding. Refit on resize, scope or separation change. Check the longest description and the outermost layer on a narrow phone.

### Lighting and materials
Balanced environment, key and fill rather than dramatic darkness; correct roughness/metalness and color space; a readable contact shadow; transparent context that doesn't break depth. Procedural canvas textures are fine; choose enough resolution.

### Dimensional SVG material studies
One projection, one light direction (upper-left: pale tops, darker sides, fine leading-edge highlight). Draw rear faces first. Make the cross-section unmistakable before detail (quiet hatch on cut metal). Differentiate real material roles (thin paint, speckled char, granular spray, cellular insulation, smooth board). Ground with a soft contact shadow on a pale background. Short labels outside the object with clean leaders and a small "Illustrative · NTS" note. Prefix every gradient/pattern/filter id by scene and resolve every `url(#…)` locally; keep an `800 450`-style viewBox with label margins; `min-width:0` on grid children; parse every SVG and reject duplicate ids.

### Fallbacks
Unsupported WebGL gets an honest diagram, poster or CSS version. Reduced motion shows a still frame. Animate only while on screen and the tab is visible; manage pixel ratio and dispose resources.

## 9. Media

- Video is muted, compressed, with a strong poster frame and a static fallback; use it selectively.
- Transparent video: keep a ProRes 4444 `.mov` master and a VP9-alpha WebM for the web; check the key over black and white for ghosting. Wix plays alpha video uploaded through Media.
- Seamless loops (e.g. a 3D graphic) ship as H.264 MP4 + WebM + PNG poster, so Blake can use a video element instead of an embed.
- Verify media rights. Don't present stock or AI imagery as real project evidence.

## 10. SEO and GEO

- Map keyword intent per page (Home: Denver web design / web developer Denver; Work: Denver web design portfolio; About: Blake Snowden designer and developer; Contact: hire a web designer in Denver). Use phrases naturally; no stuffing, no meta-keywords tag.
- Every page: unique title, concise meta description, one descriptive H1, logical H2s, readable slug, self-referencing canonical, Open Graph, correct robots (no staging noindex at launch), 301s for renamed slugs.
- Images: descriptive filenames, contextual alt text, empty alt on decorative graphics.
- JSON-LD in the SEO panel for Blake, the business and services, with only facts visible on the page; validate it.
- GEO is good SEO: clear service definitions, factual about-info, original case studies, visible authorship and contact details, concise answers to real client questions. Monitor AI citations in Bing Webmaster Tools.
- Rankings can't be guaranteed; an audit sets a baseline.

## 11. Accessibility and performance

Real `<a>`/`<button>`, visible focus, keyboard paths, Escape and focus return on dialogs, 44px+ targets, alt text, decorative SVG hidden. Responsive breakpoints near 1000 / 820 / 600px; full-width buttons on phones; hero overlay bottom-up on mobile; no horizontal scroll. Lazy-load heavy visuals; measure performance on target devices instead of promising frame rates. Forms say truthfully what happens to the data.

## 12. Verification before delivery

1. Render at 1280 / 980 / 390 and measure embed heights.
2. Exercise every control, interruption and reverse transition.
3. Check reduced motion, touch, keyboard, offscreen pause and the WebGL fallback.
4. Open the standalone HTML on its own, apart from any dev app; check console and network for only the intended dependencies.
5. Confirm copy matches the approved source and every claim is supported.
6. For documents, check the start, end and every expected section of the saved file.

Headless captures often lack WebGL: an "unavailable" screen there is not proof the model is broken. Wait for real completed states, and distinguish slow software rendering from a deadlock and current errors from replayed ones.

## 13. Collaboration and source discipline

- One authoritative source per experience; build exports from it and edit source, not generated output.
- Snowden-Design repo: `main` is approved and changes land only by PR that Blake merges. Claude works on `claude/<topic>`, Replit on `replit/<topic>`. One branch per page or task, from the latest `main`. Never force-push and never push to the other agent's branch.
- Replit owns the Work page and the site header; Claude doesn't rebuild them. Blake relays work to Replit.
- Preserve remote history and unrelated files; keep secrets, caches and large generated packages out of git.
- Report what was built versus proposed, the checks run and the remaining limits.

## 14. Client modules

### Harbour View Cottages (Harbour Island, Bahamas) — "modern Briland luxury"
- **Feel:** soft coastal minimalism, understated Bahamian character, elevated bohemian resort styling. "A private Harbour Island residence presented like a luxury design brand," not a vacation-rental site. References: Pink Sands Beach, white clapboard, linen, oak, coral stone, bougainvillea, weathered shutters, rattan, teak, sea glass, turquoise water, filtered sun.
- **Brand:** Prata (display) + Questrial (body). Palette "Harbour Twilight"; blue accents use the gradient `#B4D5E2 → #24506B`. Prefix `.hv-`.
- **Motion:** slow fade-up reveals, soft image scaling, text masks, understated parallax, gentle hovers, thin dividers drawing in, cursor-responsive image movement only if performance stays excellent. Pace of high-end hospitality and luxury real estate.
- **Content:** copy from the repo's `content/` word for word; confirm owner details (e.g. High Tide's vaulted ceilings) before making them prominent. Rates live in `pages/rates/harbour-view-rates.html`; its calendar is sample data. "Check dates" links to the Rates section (Wix Hotels installed) with `target="_top"` until a booking link exists.
- **Homepage:** six full-width embeds: `0-hv-hero-film`, `a-hv-hero`, `b-hv-estate`, `c-hv-cottages` (the only section whose Ken Burns zooms in), `d-hv-water-dock`, `e-hv-closing`.

### Mongrain (building-envelope contractor, Québec) — architectural visualization
- **Work:** an interactive Three.js hospital building-envelope explorer (exploded wall, roof and foundation details) plus a corporate site. Architectural, not jewelry. Showcased on Snowden's /3d-visualization page.
- **Rules:** preserve the recognizable hospital massing and façade rhythm, simplify clutter; remove the hospital name from public titles; vendor-neutral system names only (no SOPREMA names, logos or textures); illustrative, not as-built BIM; no public GLB export button; the "Explore BIM assembly" integration stays stopped unless Blake restarts it; French-first Québec publication still needs confirming.
- **Identities (don't mix on one page):** hospital explorer = light gray, translucent white, charcoal, cyan. Foundation page = dark teal `#17353d` hero, cyan `#66d2da` emphasis, Hanken Grotesk. Corporate = Ice `#EAF4FF`, Harbour `#1F5B8F`, Ink `#0C1E30`, Slate `#4B5D70`, Hairline `#C9DCEE`; Space Grotesk, Geist, Geist Mono. Material keys: blue waterproofing, green insulation, amber structure/fire, red risk (never decorative). Material studies: Space Grotesk headings, Questrial labels.
- **Illustrative assemblies:** wall = steel frame → exterior gypsum → air barrier → thermal clips → insulation → omega bar → metal cladding. Roof = steel deck → air/vapour control → polyiso → TPO. Positive-side foundation = concrete → waterproofing → insulation → drainage board → filter fabric. Blindside membranes go against concrete with no insulation/drainage between. Waterproofing, damp-proofing and drainage aren't interchangeable.
- **Fire and performance diagrams** explain mechanisms only; they never establish ratings, tested assemblies or code compliance. Read `references/mongrain/fireproofing-research-notes.md` before writing fire copy.
- **Builds:** `PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building export:wix`, plus `node scripts/export-wix.mjs --foundation` for the foundation page (the normal build doesn't refresh it). The full guide is `references/mongrain/master-skills-builder.md`.

## References

| File | Read it when |
| --- | --- |
| `references/snowden/design-direction.md` | Building or reviewing any Snowden Design 2 page |
| `references/snowden/native-seo-audit.md` | Splitting a page into native Wix elements and an embed |
| `references/wix-embed-page-build-original.md` | You need the original house build skill word for word |
| `references/harbour-view/briland-luxury.md` | Any Harbour View Cottages work |
| `references/mongrain/master-skills-builder.md` | Any Mongrain work, or a 3D/WebGL build that needs the full detail (GLB delivery, build commands, verification) |
| `references/mongrain/architectural-material-studies.md` | Drawing dimensional SVG material studies |
| `references/mongrain/approved-fire-protection.html` | Extending the approved material-study visual family (five worked SVG scenes) |
| `references/mongrain/fireproofing-research-notes.md` | Writing fireproofing copy, diagrams or comparisons |

## Definition of done

A new visitor understands the offer from the first screen; the work is real and unobscured; hierarchy is clear; controls and transitions work; motion explains; reduced-motion and fallback states are complete; claims are supported; native SEO elements are in place; heights are measured; and Blake has a file he can paste plus short Wix steps.
