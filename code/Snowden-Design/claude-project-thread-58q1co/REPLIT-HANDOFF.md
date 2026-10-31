# Snowden Design — Replit handoff

**Prepared:** 25 October 2026 · **For:** Replit Agent (and any other AI or developer picking up Blake's work)
**Owner:** Blake Snowden, Snowden Design (Denver, Colorado) · blake@snowden-design.com · GitHub `BlakeSnowdenDesign`

This one file collects every skill, standing rule, dev convention and project note from Blake's GitHub repositories, his Claude project instructions and the Claude project memory, so a Replit workspace can continue the work without re-asking. Part 1 is the working summary. Part 2 holds the skills word for word.

> **Priority order when instructions conflict:** Blake's current message → the approved source file for that page → the client-specific skill (Harbour View, Mongrain) → the house build skill → generic defaults.

---

## Part 1 — Working summary

### 1. Who Blake is and how he works

- Blake runs **Snowden Design**, a web design studio ("Full Spectrum Strategy"). He builds client sites in **Wix / Wix Studio** and adds custom sections as **Wix "Embed HTML" iframes**. Some interactive 3D work is built in **Replit** (React + Vite + Three.js) and exported to single-file HTML for Wix.
- He expects **award-winning agency quality**: act as UX director, architectural photographer and motion designer at once.
- He wants **finished, pasteable code**, not a hosted link or a description. Every deliverable comes with a **preview** and a **Copy code** button.
- **Owner tools (copy code, download, embed buttons) must never appear on the public, visitor-facing page.** Put them on a separate private preview page (e.g. `/embed` or `*-preview.html`).
- He reviews visually and gives rounds of edits. Keep approved work; change only what he asks.
- **Never invent** copy, stats, prices, ratings, certifications or contact details. Missing facts become `[PLACEHOLDERS]`.
- "Same style as Fishing With Prince" means the house style in the `wix-embed-page-build` skill (Part 2A).

### 2. Repositories

| Repo | Visibility | What's in it | Branches |
| --- | --- | --- | --- |
| `BlakeSnowdenDesign/Snowden-Design` | public | Blake's own studio site redesign (snowden-design.com). Home page Wix embed + preview + screenshots. **This handoff lives here.** | No `main` yet. `claude/project-thread-u8tc9l` and `claude/project-thread-58q1co` |
| `BlakeSnowdenDesign/Harbour-View` | public | Harbour View Cottages (Harbour Island, Bahamas): rates page embed, source copy, the two Claude skills (`.claude/skills/`) | No `main` yet. `claude/project-thread-pcqq5b` |
| `BlakeSnowdenDesign/Mongrain-Code` | private | Mongrain (Québec building-envelope contractor): Replit pnpm monorepo with the 3D hospital envelope explorer, foundation systems page, fire protection page, Wix exports, research, `.agents/` skills + memory | `main` (current). Open PRs #1 `claude/fire-protection-page-f1hinj`, #2 `claude/project-thread-hzci8u`; plus `codex/woodtek-hq-model-study` |
| `BlakeSnowdenDesign/LimeTreeSocial` | private | Empty (no commits yet) | — |

Rules for all repos:
- Never force-push, rewrite history, change repo visibility, replace a database, or publish/deploy without Blake's go-ahead.
- Pushing to GitHub does **not** update a page already pasted into Wix. Blake must re-paste the code.
- Keep large source photos and films out of git; media is served from Wix (`static.wixstatic.com`).
- No secrets, environment values or credentials in any repo or doc.

### 3. The standard deliverable (every Wix embed)

1. **One self-contained `.html` file**: HTML + CSS + vanilla JS, no frameworks. Only external dependencies: Google Fonts and Wix media URLs. (React/Three.js work is bundled into one file by an exporter; see §7.)
2. **Preview page**: a browser-style preview window, then the full code in a dark code panel with **COPY CODE** buttons (top and above the code), then 3 short Wix steps.
3. **Measured iframe heights** at desktop 1280 / tablet 980 / phone 390 (and 320 for the Wix mobile editor when relevant). Measure the real document height in a browser; don't guess.
4. **Wix steps:** Add › Embed code › Embed HTML, stretch to full width (remove section padding) › Code › paste › Update › set height.
5. Every booking/contact/off-page link uses **`target="_top"`** so it leaves the iframe.
6. Class names are **prefixed per client** so nothing clashes with Wix: `.sd-` Snowden Design, `.hv-` Harbour View, Mongrain uses its own scoped names.
7. Remind Blake that iframe text doesn't help SEO; put the key title/intro in native Wix text and page SEO settings.

### 4. House visual system (Snowden Design defaults)

Used for Snowden Design's own site and any client without its own brand. Full rules in Part 2A.

- **Type:** Archivo variable (font-stretch ~118%, 600–800) for headlines; IBM Plex Mono uppercase, 0.14em tracking, for eyebrows/labels/indexes; body Archivo 15–18px, line-height 1.55–1.65.
- **Color:** ink navy `#0A1D26` / `#123440`; turquoise `#16B3A6`; aqua `#7FE0D4`; sun `#F2A93B` for small dots/badges only; white cards. 4.5:1 contrast minimum.
- **Shape:** 40px hero/CTA/photos, 28–30px cards, 20–22px tiles, pill buttons and chips.
- **Depth:** layered shadows (small contact + large blurred ambient); frosted-glass pills over photos.
- **Layout:** max-width ~1240px; three-column section headers (index pill "01", eyebrow + headline, short note) with hairline divider.
- **Icons:** inline stroke SVG, 1.6px, round caps, `aria-hidden`. No emoji.
- **Motion:** staggered hero entrance (fade + rise 30px + blur 8px → sharp, 1–1.1s, delays .1/.22/.34s); Ken Burns `kenBurns 22s ease-out both` from `scale(1.16)` to `scale(1)`; IntersectionObserver reveals (rise 48px, scale .98 → 1) and photo mask wipes (clip-path inset 14% 10% → 0, image 1.3 → 1); easing `cubic-bezier(.2,.8,.2,1)` everywhere; no bouncy springs; everything off under `prefers-reduced-motion`.
- **Iframe rule:** use IntersectionObserver, never scroll position (the page scrolls outside the Wix iframe). Only hide reveal elements after JS adds a class to `<html>`, so content shows without JS.
- **Responsive:** grids collapse at 1000 / 820 / 600px; full-width buttons on phones; hero overlay goes bottom-up on mobile; no horizontal scroll. 44px+ touch targets, focus outlines, alt text on every photo.

### 5. Client: Harbour View Cottages (Harbour Island, Bahamas)

**Art direction — "modern Briland luxury"** (overrides house visuals; full text in Part 2B). Soft coastal minimalism, understated Bahamian character, elevated bohemian resort. Think Pink Sands Beach, white clapboard cottages, linen, oak, coral stone, bougainvillea, rattan, sea glass, warm filtered light. Motion is slow and editorial: fade-up reveals, soft image scaling, text masks, understated parallax, animated hairlines. Goal: *"A private Harbour Island residence presented like a luxury design brand"*, not "vacation rental website".

**Brand**
- Type: **Prata** (display) + **Questrial** (all secondary/body). Earlier pairing was Prata + Karla; Questrial replaced Karla.
- Palette "Harbour Twilight": navy `#0F1B2D`, dusk blue `#24506B`, sea glass `#7FB3C8`, pale sand `#EFE3D6`, sunset coral `#E4A788`. All former blue accents use the gradient **`#B4D5E2 → #24506B`**.
- Prefix `.hv-`.

**Content rules**
- Two cottages: **High Tide** and **Low Tide** (copy in `Harbour-View/content/`, use word for word).
- **No numbers/stats** (acres, square footage) on homepage sections.
- Booking button label is **"Check dates"**; it links to the site's Rates section until a booking link is given (Wix Hotels is installed).
- Site is built in Wix Studio at `snowden-design.wixstudio.com/harbourviewcottages` (Wix site id `e049c623-6ca7-487e-b5e4-60e047c2c51b`). Cottage pages: `/hightide`, `/lowtide`, plus a master Cottages page.

**Pages**
- **Rates & Availability** — `Harbour-View/pages/rates/harbour-view-rates.html`. Rates: standard $3,250 single / $4,800 full; holiday $4,300 / $6,000. The availability calendar is **sample data only**. Hero video Wix id `2fde66_a07f7aa44ef646dd8233075a6292ba43`; its poster is an inlined data URI (Blake was asked for a Wix image URL to replace it).
- **Homepage** — six full-width embeds, in order:
  1. `0-hv-hero-film` — Wix video `2fde66_a07f7aa4…`, centred Harbour View badge logo, small Reverie Collection logo (50%) top left, line "Two Private Cottages — One Beautiful Piece of Briland.", single "Check dates" button.
  2. `a-hv-hero` — hats photo, "Arrive easy. Settle in slowly."
  3. `b-hv-estate` — Wix film `2fde66_d77661dc…`
  4. `c-hv-cottages` — deck photo, **the only section whose Ken Burns zooms IN**.
  5. `d-hv-water-dock` — Wix film `2fde66_ad48f906…`, 1080p, no wipe.
  6. `e-hv-closing` — drone aerial.
- **The homepage HTML was never saved as files** and is not in the repo. Ask Blake to paste a section's code before editing it; save it to `pages/homepage/` when he does.

### 6. Client: Snowden Design (Blake's own site)

- **Build target (new, 25 Oct 2026): the blank Wix site "Snowden design 2".** All new Snowden Design pages go there.
- **Content source: the existing Wix site "Snowden design"** (live at **www.snowden-design.com**, pages `/projects`, `/about`, `/contact-1`). Pull copy, projects and media from it; don't build on it.
- Facts: Snowden Design / Blake Snowden Designs, Denver, Colorado. Tagline "Full Spectrum Strategy". Motto "If you follow the paths of the uninspired, your rewards will be commensurate." Closing line "prepare for success." Phone 970-685-8733.
- Projects shown: Helen Falls Lodge, Shadow Creek Ranch, Schultz's Gourmet, Pasta Jay's, Mojo Broadband, Edge Internet, Apes Brain.
- Assets: portrait `2fde66_67f00bbee6d54cc5bbece13af1434fcc~mv2.png` (only 533×528, so don't display it large); white logo `2fde66_a5f60e520e2d43c3ac2eaea2bc564bf8~mv2.png`.
- Uses the **house defaults** (§4), not Harbour View's Briland direction. Prefix `.sd-`.
- Status: home page built (`pages/home/snowden-home.html`, preview `pages/home/preview.html`; heights 7,420 / 9,230 / 12,030 px). Its copy is a **draft** written from the old site and awaits Blake's approval. Next pages: Work, About, Contact.

### 7. Client: Mongrain (already a Replit project)

Mongrain-Code is a Replit workspace already (`.replit`, `replit.md`, `.agents/skills`, `.agents/memory`). Its own docs are the authority; read them in this order: `GROK_START_HERE.md` → `Mongrain_master skills builder.md` → `docs/mongrain-website-handoff-2026-10-12.md` → `replit.md` → source. The master skills guide and the material-studies skill are reproduced in Part 2C and 2D.

**What it is:** an interactive, illustrative architectural envelope explorer of a hospital Mongrain is building (Vaudreuil-Soulanges), plus service pages, all delivered to Wix.

**Hard rules**
- **Vendor-neutral.** Mongrain buys from many vendors. No SOPREMA (or other) product names, logos or branded textures in public work. Manufacturer PDFs are research only.
- **Remove the hospital name** from public titles.
- Use the supplied Mongrain logos (`artifacts/mongrain-building/public/assets/logo-cyan.png`).
- Approved journey: **select → highlight → zoom → section pullout → large exploded detail → reverse return.** Opening assembles foundation → walls → roof with matching callouts. Keep wall/roof/foundation geometry and framing independent; share only interaction logic.
- No public GLB export button. The hospital "Explore BIM assembly" integration is **stopped**; don't resume it without a new instruction.
- Models are procedural Three.js / React Three Fiber, illustrative, not as-built BIM. Don't invent performance claims, ratings, certifications or programme dates.
- Match H1 typography to the hero introduction by inspecting its real CSS (the foundation page uses Hanken Grotesk throughout; the older Foundations animation used Schibsted Grotesk).
- Foundation enquiry brief is generated **locally only**; it is not sent to Mongrain.

**Stack and commands** (pnpm workspaces, Node 24, TypeScript 5.9, Express 5, Postgres + Drizzle, Zod, Orval, Vite)
```bash
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/api-server run dev            # API, port 5000
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building export:wix
cd artifacts/mongrain-building && PORT=24888 BASE_PATH=/ node scripts/export-wix.mjs --foundation
```
Outputs: `exports/mongrain-building-wix.html` and `exports/mongrain-foundation-systems-wix.html`. The normal build does **not** refresh the foundation export; run `--foundation` explicitly.

**Visual identities (don't mix on one page)**
- Hospital explorer: light gray `#E8EBEC`, translucent white, charcoal, cyan `#12B5D1`.
- Foundation page: dark teal hero `#17353d`, mist/light content, cyan emphasis `#66d2da`; Hanken Grotesk, Instrument Serif accents, DM Mono labels.
- Corporate fragments: Ice `#EAF4FF`, Harbour `#1F5B8F`, Ink `#0C1E30`, Slate `#4B5D70`, Hairline `#C9DCEE`; gradient `#8FC3EA → #174873`.
- Material studies: Space Grotesk headings, Questrial labels.

**Work in progress (branches / PRs)**
- PR #1 `claude/fire-protection-page-f1hinj` — Fire Protection service page as a Wix embed (`mongrain-code/fire/`), copy-code preview builder (`scripts/build-wix-preview.py`). Heights 5440 / 5750 / 7660 / 7850 (320px). "Request a submission" → `https://snowden-design.wixstudio.com/mongrain-new/contact-us` (`target="_top"`). French strings in a `STR` object.
- PR #2 `claude/project-thread-hzci8u` — Foundation Systems page split into four Wix embed sections, sub-grade assembly animations, Blake's edit rounds.
- `codex/woodtek-hq-model-study` — WoodTek HQ named-node GLB model study (metres, Y-up, front +Z), standalone viewer, `asset-contract.json`.
- Both PR branches were cut from an older `main`; merge or rebase onto current `main` carefully so they don't delete newer files (e.g. `research/fireproofing/`).
- Older Replit publish: `https://layered-foundation-reveal.replit.app` (Foundations 2D/3D). Its visibility was **Private**, so Wix visitors can't see it until Blake sets it Public.

**Replit-specific gotchas (from `.agents/memory`)**
- Headless previews often lack WebGL; a WebGL-unavailable screen in a capture isn't proof the model is broken. Use software rendering and wait for real completed states.
- Give browser-test servers their own Vite optimizer cache; a shared cache can make a failed dynamic import look like a WebGL fallback.
- After a task merge, an old preview process can hold the port while the workflow reports failure. Check who owns the port; don't change ports to hide it.
- Fit detail cameras to the full **exploded** bounds (including near corners and the space under phone cards), and anchor callouts on visible edges.
- Replit analytics only works on the Replit-hosted app after enabling it in Publishing; copied Wix HTML doesn't inherit it.
- GitHub sync via the connector: overlay files on the remote head, parent the commit on it, never force-push.

### 8. Environment notes

- `static.wixstatic.com` and `snowden-design.com` were blocked from Claude's cloud environment, so Wix images couldn't be previewed there. Replit may be able to reach them; check.
- The live Wix sites can't be edited through an API for nav menus; Blake pastes embeds by hand.
- Blake's local folders: `~/Snowden Design` (this handoff is copied there) and `~/Downloads`. Source photos for Harbour View (Cabana & Poolhouse, Dock, High Tide, Low Tide) live in his Claude project files; large originals (5–18 MB) should be compressed or uploaded to Wix before use.

### 9. Open items

- Harbour View: recover the six homepage section files from Blake; replace the rates hero poster with a Wix image URL; real booking link to replace "Check dates" → Rates.
- Snowden Design: build into the new Wix site "Snowden design 2"; Blake to approve the home page draft copy and page list; build Work, About, Contact; merge the branch into a new `main`.
- Mongrain: review/merge PRs #1 and #2; make the Replit publish public or host the exports; French localization not complete.
- LimeTreeSocial: empty repo, no brief recorded yet.

### 10. Reusable prompt for Replit Agent

> Act as Snowden Design's award-winning digital design agency (UX director, architectural photographer, motion designer). Build **[page/section]** for **[client]** as one self-contained HTML file for a Wix Embed HTML iframe, following this handoff: the house build skill (Part 2A) plus the client's skill. Use the supplied copy word for word and mark missing facts as [PLACEHOLDERS]. Deliver the embed file, a private preview page with Copy code buttons, measured heights at 1280 / 980 / 390, and the 3 Wix steps. Don't publish, force-push or change approved sections without asking.

---

## Part 2 — Skills, word for word

### 2A. wix-embed-page-build — house build skill

_Source: `Harbour-View/.claude/skills/wix-embed-page-build/SKILL.md` (also Blake's Claude account skill and project instructions)._


Use this whenever Blake asks for a web page, section or landing page to embed in Wix, or says "same style as Fishing With Prince".

#### Role
Act as an award-winning digital design agency: UX director, architectural photographer and motion designer. Build at the highest level of clean, award-winning web development and motion design.

#### Before building, gather
- Client / page purpose
- Copy (use word-for-word; never invent stats, prices or claims; missing facts become [PLACEHOLDERS])
- Photos (Wix image URLs preferred; art-direct each one: hero, portrait, wide band, poster/collage, CTA; crop to protect faces)
- Link target for booking/contact buttons
- Background gradient colors (top → bottom) if given; otherwise propose a palette from the brand
Ask only for what is missing.

#### Deliverable
- One self-contained HTML file (HTML + CSS + vanilla JS, no frameworks) for a Wix "Embed HTML" element (runs in an iframe).
- Show it on a Design canvas artboard with a browser-style PREVIEW window, then the full code in a dark code panel with COPY CODE buttons (top and above the code), then 3 short Wix steps (Add Embed HTML › paste code › set height). Multiple pages = multiple artboards on the same canvas.
- Also deliver the standalone .html file and recommended iframe heights for desktop / tablet / mobile (measure them).
- All booking/contact links use target="_top" so they leave the iframe.

#### Visual system (defaults; swap for a client brand when one exists)
- Type: Archivo variable (wide, font-stretch ~118%, weights 600–800) for headlines; IBM Plex Mono uppercase, 0.14em tracking, for eyebrows, labels, indexes and captions. Body Archivo 15–18px, line-height 1.55–1.65.
- Color: deep ink navy (#0A1D26 / #123440) for dark cards and text; one bright accent (turquoise #16B3A6 / aqua #7FE0D4); warm sun accent (#F2A93B) for small dots and badges only; white cards. Text on gradients is dark navy (4.5:1 minimum).
- Shape: generous rounded corners — 40px hero, CTA and photos; 28–30px cards; 20–22px tiles; pill buttons and chips.
- Depth: layered soft drop shadows (small contact shadow + large blurred ambient shadow); frosted-glass pills (backdrop blur) over photos.
- Layout: max-width ~1240px; big vertical rhythm; section headers in a three-column grid (index pill "01", eyebrow + large headline, short note) with a hairline divider; mono section numbering like a technical field guide.
- Icons: inline stroke SVGs (1.6px stroke, round caps). No emoji.

#### Page structure (adapt to content)
1. Hero: full-bleed photo in a 40px rounded card with a Ken Burns slow zoom-out, a directional dark overlay behind the text, frosted eyebrow pills, a huge two-tone headline (second line in the accent color), subhead, one primary button.
2. Intro / meet-the-person: portrait in a rounded frame with a floating stat badge that gently bobs; headline, body, chip tags.
3. Big statement: oversized sentence with a key phrase that gets a highlighter sweep on scroll.
4. Wide photo band with glass caption pills.
5. Feature cards (4-up grid) + a dark full-width band with a slowly spinning dashed ring icon.
6. Gallery split: tall/poster photo beside a story card and stacked feature rows.
7. Pull-quote card with an infinite keyword marquee (pauses on hover).
8. Dark CTA split: copy + button left, photo right fading into the dark.
9. Mono footer line.
A data-heavy brief can use the "technical field sheet" variant instead: stat tiles, an animated SVG chart, spec scales, route diagrams.

#### Motion design
- Load: staggered hero entrance (fade + rise 30px + blur 8px → sharp, 1–1.1s, delays 0.1 / 0.22 / 0.34s).
- Ken Burns on the hero: `animation: kenBurns 22s ease-out both;` with `@keyframes kenBurns{from{transform:scale(1.16)}to{transform:scale(1)}}`.
- Scroll reveals: elements rise in (48px, scale 0.98 → 1) via IntersectionObserver adding `.is-in` (only hide them once JS adds a class to <html>, so content shows without JS). Photos get a mask reveal: clip-path inset 14% 10% → 0 with 40px rounded corners while the image zooms 1.3 → 1. Use IntersectionObserver, never scroll position — the page scrolls outside the Wix iframe.
- In canvas (.dc.html) previews, use CSS `animation-timeline: view()` and animate the individual `translate` / `scale` properties so hover transforms still work.
- Hover: cards lift 6–8px, deepen shadow and invert to navy; icons tilt and scale; buttons get a light sweep and the arrow nudges right; feature rows fill with navy from the side; photos slow-zoom to 1.05; chips fill dark.
- Easing: cubic-bezier(.2,.8,.2,1) everywhere; no bouncy springs.
- prefers-reduced-motion: all motion off, everything visible.

#### Quality bar
- Responsive: grids collapse at 1000 / 820 / 600px; buttons full-width on phones; hero overlay switches to bottom-up on mobile; no horizontal scroll.
- Accessible: real <a>/<button>, alt text on every photo, focus outlines, 44px+ touch targets, decorative SVGs aria-hidden.
- Clean code: prefixed class names (e.g. .xyz-) so nothing clashes with Wix; one file; only external dependencies are Google Fonts and Wix image URLs. Photos without a Wix URL can be inlined as compressed data URIs, but ask for Wix URLs to keep the code light.
- Render and check the page at 1280 / 980 / 390 before delivering; measure heights.
- Remind Blake that iframe text doesn't help SEO: put key copy in native Wix text or page SEO settings.
---

### 2B. harbour-view-briland-luxury — Harbour View art direction

_Source: `Harbour-View/.claude/skills/harbour-view-briland-luxury/SKILL.md`. In it, `content/` and `pages/` mean folders in the Harbour-View repo._


Use together with `wix-embed-page-build` whenever building or editing a Harbour View Cottages (Harbour Island, Bahamas) page or section. That skill sets the build rules (single-file Wix Embed HTML, preview + copy code, motion, quality bar). This one sets the art direction and the client brand, which replace the default house visual system.

#### Design direction
The overall aesthetic is "modern Briland luxury": soft coastal minimalism, understated Bahamian character and elevated bohemian resort styling.

Think: Harbour Island, Pink Sands Beach, white clapboard cottages, soft linen, natural oak, coral stone, bougainvillea, weathered shutters, rattan, teak, woven textures, pale sand, sea glass, turquoise water, warm filtered sunlight, open-air island living, refined barefoot luxury.

#### Motion
- Slow fade-up reveals
- Soft image scaling
- Text reveal masks
- Understated parallax
- Gentle hover transitions
- Thin divider lines that animate into view
- Smooth scrolling
- Subtle cursor-responsive image movement, only if performance remains excellent

Animations should feel like high-end hospitality, architectural, fashion or luxury real estate websites.

#### Feel
Custom-designed, architectural, sophisticated, editorial, modern, Bahamian and exceptionally expensive.

Not "vacation rental website". Instead: "a private Harbour Island residence presented like a luxury design brand."

#### Client brand (use instead of the house defaults)
- Type: Prata (display) and Questrial (secondary / body).
- Palette: "Harbour Twilight". Former blue accents use the gradient #B4D5E2 → #24506B.
- Prefix classes with `.hv-`.
- "Check dates" buttons link to the site's Rates section until a booking link is given (the Wix site has Wix Hotels installed). Use `target="_top"`.

#### Content
- Use the copy in `content/` word for word. Never invent rates, stats or claims; missing facts become [PLACEHOLDERS].
- Rates live in `pages/rates/harbour-view-rates.html`; its availability calendar is sample data only.
- Homepage is six full-width Embed HTML sections: 0-hv-hero-film, a-hv-hero, b-hv-estate, c-hv-cottages (the only section whose Ken Burns zooms in), d-hv-water-dock, e-hv-closing.

---

### 2C. Mongrain — Unified Design & Development Skills

_Source: `Mongrain-Code/Mongrain_master skills builder.md` (main). Relative links point inside the Mongrain-Code repo._


**Updated:** 23 October 2026  
**Purpose:** One cohesive working framework for Mongrain’s website, architectural visualization, motion design and Wix delivery.

Work as a premium digital design team combining **UX direction, architectural 3D motion design, Three.js/WebGL engineering and front-end development**. “Award-winning” defines the requested quality standard, not a claim that this project has won an award.

This guide consolidates the available Mongrain collaboration and both skills documents into a single workflow. It describes reusable practices, not a guarantee that every capability is already installed. Inspect the target source before applying a technique.

#### 1. The standard

Create large, clear architectural imagery with restrained motion, readable systems and reliable interaction.

- Architecture is the subject; the interface supports it.
- Preserve the recognizable hospital, not a generic replacement.
- Simplify construction-site clutter and repetition without erasing building identity.
- Use fewer competing elements and more space for the principal image.
- Explain construction through assembly, separation, selection and connections.
- Keep one primary visual emphasis and an obvious next action.
- Make motion communicate location, sequence or response.
- Preserve approved work instead of replacing it with a template.
- Treat technical accuracy, accessibility and delivery reliability as design quality.

**Priority order:** current user instruction → approved target source → technical evidence → this guide → generic defaults.

#### 2. One development workflow

| Step | Work | Required result |
| --- | --- | --- |
| Understand | Confirm purpose, audience, system, references and requested output | A specific brief; no premature implementation |
| Establish | Identify approved source, visual identity, facts and boundaries | One editable source of truth |
| Compose | Design page hierarchy, model framing and interaction | A clear visitor journey |
| Construct | Build geometry, diagrams, components and content | Accurate, maintainable structure |
| Choreograph | Add assembly, camera movement, reveals and feedback | Motion that explains |
| Validate | Check technical content, states, devices and exports | Evidence proportional to risk |
| Deliver | Provide source, requested HTML and concise instructions | A usable output, not only a preview |

Ask only questions that materially change the result. Distinguish discovery from permission to build. Do not publish or resume stopped work because a document describes how.

Before work starts, state the target experience, source owner, editable files, delivery format, approved style, languages, device widths and what may change.

#### 3. A consistent visual system

##### Typography

Match H1 typography to the approved hero introduction when alignment is requested. Inspect the actual CSS:

- Font family and loaded files.
- Weight and responsive size.
- Line height, tracking and line breaks.
- Emphasis styling.
- Gradient stops, direction and text clipping.
- Mobile overrides.

Compare the rendered result. Do not guess a font from a screenshot or introduce a different serif for one H1 word.

##### Tokens, not unrelated defaults

Use a common vocabulary—surface, ink, secondary text, accent, rule, shadow and material colours—while resolving values from the approved target.

| Existing experience | Identity reference |
| --- | --- |
| Hospital/refined explorer | Light gray, translucent white, charcoal and cyan |
| Foundation full page | Dark teal hero, mist/light content, cyan emphasis; Hanken Grotesk |
| Corporate fragment system | Documented Ice/Harbour/Ink palette; Space Grotesk, Geist and Geist Mono where its source confirms them |

These are existing contexts, not three styles to combine on one page. Knowledge consolidation does not authorize a global font or palette change.

Useful references:

- Foundation hero: `#17353d`; emphasis: `#66d2da`.
- Foundation desktop H1: `clamp(58px, 6.25vw, 92px)`, weight `500`, line height `.93`, tracking `-.065em`; verify mobile CSS.
- Corporate tokens: Ice `#EAF4FF`, Harbour `#1F5B8F`, Ink `#0C1E30`, Slate `#4B5D70`, Hairline `#C9DCEE`.
- Material keys described by the corporate guide: blue/waterproofing, green/insulation, amber/structure and fire, red/risk.
- Its accent gradient is `#8FC3EA → #174873`; use only where that reference is approved.

Keep material differentiation separate from interface branding. Avoid using risk red as decoration.

##### Finish

Use generous spacing, deliberate rules, layered contact/ambient shadows and restrained glass over media. A useful radius vocabulary is 12 / 22 / 30 / 40 px / pill; adapt it to the actual component and phone layout.

Use crisp stroke SVG icons and readable technical annotations. Preserve supplied Mongrain logos, aspect ratio and transparency. Optimize the artwork rather than rebuilding it.


##### Approved architectural material-study technique

Use [Mongrain Architectural Material Studies](.agents/skills/mongrain-architectural-material-studies/SKILL.md) for the approved dimensional graphic treatment: upper-left lighting, readable steel sections, differentiated coating/char/spray/insulation surfaces, soft contact shadows, clean leaders and restrained layer arrivals. Its linked HTML preserves the exact approved five-service visual reference. Use Space Grotesk headings and Questrial graphic labels for this family. Preserve existing layouts during graphics-only changes. The visual reference does not approve its unverified technical or company claims.

#### 4. Page composition and storytelling

Every section needs a distinct purpose. Avoid repeating the same card grid and reveal throughout a page.

The foundation page establishes a six-section technical narrative:

1. **Introduction:** large architectural cutaway and clear controls.
2. **Assembly:** selectable materials and explanations.
3. **Installation:** approaches and sequence.
4. **Connections:** transitions, water paths and outlets.
5. **Responsibility:** project inputs and limitations.
6. **Action:** a useful, truthful next step.

For corporate storytelling, draw from a composition library: media hero, introduction, large statement, wide image band, feature grid, gallery/story split, pull quote, CTA and compact footer. Use only the sections justified by the brief.

Technical field-sheet layouts can combine diagrams, indices, legends and evidence-backed data. “Typical,” “illustrative” and “NTS” communicate limitations; invented timings or codes must not imply engineering provenance.

Protect important architecture and faces in image crops. Use factual badges only when supported. Coordinate headings and copy with the host site to avoid duplicate H1s.

#### 5. Choose the right visualization method

| Method | Best use | Implementation discipline |
| --- | --- | --- |
| Procedural Three.js / React Three Fiber | Interactive building and editable system geometry | Typed state, stable groups, frame updates and cleanup |
| Imported GLB/glTF | Studio-authored architecture and material fidelity | Agreed hierarchy, units, pivots, naming and integration |
| Direct Three.js HTML | Independently delivered WebGL section | Verified module imports, renderer lifecycle and dependencies |
| CSS 3D | Lightweight box-based educational assembly | Six-face geometry, projected framing and support checks |
| Isometric SVG | Fixed construction story or diagram | Consistent projection and deliberate painter’s order |
| Animated SVG section | System families, junctions and performance explanations | Separate groups, scalable strokes and accessible controls |

Use the simplest method that satisfies the actual experience. CSS 3D is not BIM; an SVG mechanism is not tested performance; a coded model is not an imported studio asset.

##### The shared model contract

Each system/layer needs:

- A stable identifier independent of display text.
- Recorded assembled transforms.
- A meaningful separation direction.
- A material identity and explanation.
- A visible anchor for its callout.
- A relationship to system and performance categories where applicable.

Keep context, selectable systems and explodable groups separate. Share interaction logic without forcing walls, roofs and foundations into one geometry or camera layout.

#### 6. Architectural geometry and materials

Preserve massing, façade rhythm, podium/tower relationships and roof profile from approved references. Exterior photographs establish visible form, not hidden assemblies or surveyed dimensions.

Model framing, clips, rails and supports when they explain attachment. Simplify repeated elements efficiently. Any exaggerated membrane thickness or spacing must remain illustrative.

Use lighting that reveals edges, depth and materials:

- Balanced environment, key and fill rather than dramatic darkness.
- Appropriate roughness/metalness and colour-space handling.
- Controlled shadows and a readable contact/shadow catcher.
- Transparent context that does not obscure the assembly through incorrect depth writes.

Procedural canvas textures can express board lines, insulation, membrane and metal without external texture requests. Choose adequate resolution; raster textures are not automatically crisp at every zoom.

For CSS 3D, build consistent box faces, use restrained face shading/hatching and preserve readable silhouettes. For SVG, use `viewBox` and non-scaling strokes. Fixed scenes can use deliberate painter’s order; changing overlaps may need sorting.

#### 7. The spatial interaction model

The approved building journey is:

**Select → highlight → zoom → section pullout → large exploded detail → reverse return.**

- Model hotspots and labeled buttons must select the same section.
- The opening starts exploded and assembles **foundation → walls → roof**, with matching callouts.
- The selected detail should remain recognizably connected to the building.
- Use a large detail with a small overview where appropriate.
- Offer previous/next, numbered labels, assemble/explode, reset and return.
- Preserve manual input instead of repeatedly overriding it with autoplay.
- Guard transitions and cancel obsolete callbacks.
- Restore a clear building state after closing.

Share safe selection/control behavior; keep section geometry, explanations, framing and guides independent. Guided roof playback does not mean every detail needs the same guide.

Use source-owned state/components when available. Treat observer-based DOM injection as a reviewed adapter, not a default architecture. Do not indiscriminately intercept global animation callbacks to freeze an application.

#### 8. Exploded views and callouts

Explode along the actual conceptual assembly direction, not an arbitrary decorative axis. Space layers to reveal thin control membranes and mechanical attachments.

- Record base transforms and reassemble to them.
- Apply changing values to actual mesh/group transforms during rendering.
- Use elapsed-time-aware movement, not frame-count assumptions.
- Keep explicit manual actions functional while automatic motion is paused.
- Highlight the selected layer while retaining useful context.
- Distinguish cavities and drainage paths from solid layers.

Use DOM/SVG labels instead of text baked into textures. Project their anchors from visible material edges. Reserve label space, separate dense labels and route leaders to avoid confusing crossings.

CSS 3D can use a normalized separation value and per-layer offsets; WebGL can use the same conceptual contract with scene transforms. A range scrubber is optional—do not add controls without a user need.

#### 9. Camera framing

Fit the complete assembled **and** exploded bounds.

1. Measure the available stage after subtracting headers, controls, labels and description cards.
2. Include panel depth, near corners and the selected view angle.
3. Fit projected bounds with useful padding.
4. Keep the orbit target centred on the assembly.
5. Refit when viewport, scope or separation changes.
6. Check the longest material explanation and the outermost/lowest layers.

A stack can fit the browser but remain hidden behind a phone card. A roof can fit by layer-centre height while its near deck corner is cropped. Avoid camera views that conceal the layers being explained.

CSS 3D framing should solve scale from transformed visible bounds, not use a single hardcoded zoom. SVG framing should preserve labels and line weights as the viewport changes.

#### 10. Motion grammar

Motion must explain sequence, hierarchy, location or response.

- Compose the starting and landing camera views.
- Stage one principal action at a time.
- Keep idle movement subtle; stop it when the visitor takes control.
- Pause unnecessary work offscreen and when the document is hidden.
- Preserve usable final states under reduced motion.

For new editorial effects, the documented reference easing is `cubic-bezier(.2,.8,.2,1)`. Existing 3D choreography keeps its verified easing and timing until deliberately revised.

| Effect | Recipe | Guardrail |
| --- | --- | --- |
| Hero arrival | Stagger text, logo and rules; controlled clip/mask opening | Strongest arrival belongs above the fold |
| Rise reveal | Fade, approximately 48 px rise, .98 → 1 scale, blur → sharp | Enable hiding only after JS enhancement |
| Heading mask | Lines move from overflow-hidden wrappers | Preserve readable settled text |
| Rule/photo reveal | Grow a rule or open a rounded inset | Do not replay constantly |
| Button/card feedback | Restrained bloom, sweep, lift or inversion | Feedback must not delay the action |
| Slow media movement | Approximately 22 s Ken Burns reference | Pause appropriately; avoid distracting repetition |
| Cursor drift | Fine pointers, frame-throttled updates | Never essential to navigation |

Compose reveal and hover transforms so they do not overwrite each other. Use no bouncy springs by default for this architectural style. Timing references are not requirements to slow every control.

#### 11. Technical system accuracy

##### Illustrative assemblies currently used

| System | Order |
| --- | --- |
| Wall | Steel frame → exterior gypsum → air barrier → thermal clips → insulation → omega bar → exterior metal cladding |
| Conventional roof | Structural steel deck → air/vapour control → rigid polyiso insulation → generic TPO membrane |
| Positive-side foundation | Concrete support/footing/wall → waterproofing → insulation → drainage board → filter fabric |

These are simplified illustrations, not complete construction specifications. Cover boards, slopes, attachment, drains, flashings, fire detailing, compatibility and exact thicknesses require project evidence.

##### Foundation sequencing

- **Positive-side post-applied:** suitable concrete/substrate, exterior waterproofing, then specified protection/insulation/drainage.
- **Blindside pre-applied:** prepared support/substrate, compatible membrane, then reinforcement and concrete against it.
- Do not insert ordinary post-applied insulation/drainage between a blindside membrane and concrete.
- Drainage requires a designed, serviceable outlet.
- Waterproofing, damp-proofing and drainage are not interchangeable.

Reflect these differences in geometry and copy, not just disclaimers.

##### Performance diagrams

Rain, heat, load, fire, sound and vapour diagrams can explain a mechanism. Keep effects in separate selectable groups, use legends and preserve static states. They do not establish a rating, tested assembly or certified result.

Do not present illustrative installation dates as a real hospital programme. Do not turn a BIM roadmap into delivered 4D/5D capabilities.

#### 12. Research, content and localization

Map system families, inspect technical PDFs, extract relevant drawings and preserve provenance. Separate manufacturer documentation, interpretation and verified project facts.

Mongrain purchases from multiple vendors. SOPREMA material may inform research, but public system callouts must use generic names—not product branding, logos or branded textures.

- Use approved factual copy; never invent statistics, prices, ratings, warranties or certifications.
- Check current company facts against the approved presentation before publishing.
- Verify media rights and permitted usage.
- Distinguish genuine project imagery from illustrative diagrams.
- Avoid stock/AI-rendered imagery as supposed technical evidence.
- Prepare headings, labels, explanations, metadata and alt text for English/French localization.
- Confirm the French-first Québec publication brief and applicable requirements; do not imply localization is already complete.

Keep client explanations short and direct. Technical handoffs still need explicit states, dependencies, evidence and limitations.

##### Fireproofing research and evidence

For fireproofing copy, diagrams or system comparisons, read [the fireproofing research notes](research/fireproofing/fireproofing-research-notes.md) first. They include the uploaded research index, reviewed official-source links, evidence limits and a claim-review checklist.

- Treat the uploaded ChatGPT research index as a source-finding aid, not a SOPREMA manual, code extract or assembly approval.
- Confirm the locally adopted code and amendments; a newer national model-code publication does not establish provincial adoption. US-facing test/code guidance is not automatically Canadian compliance.
- Distinguish intumescent coatings, spray-applied protection, board encasement, rated assemblies, perimeter containment and exterior-wall fire-spread evaluation. They are not interchangeable systems or tests.
- Require the actual supported assembly/member/material conditions for hourly ratings, coating thicknesses and installation requirements. Illustrative animation does not establish fire performance.
- Keep technical guidance separate from company evidence: manufacturer sources cannot verify Mongrain project rankings or a claim such as “largest project in Canada.”
- Explain perimeter containment as a coordinated tested system, not mineral wool alone. Obtain dedicated evidence before expanding foam thermal-barrier or hazardous-material removal guidance.
- Preserve vendor-neutral public labels. Record source, review date, jurisdiction and exactly what was checked; flag unresolved claims instead of silently approving them.

#### 13. GLB/glTF studio delivery

The current Replit building is procedural. Imported-asset development is a separate, explicitly commissioned capability.

Agree on:

1. Units, origin, world axes and per-system separation axes.
2. Stable node/group names and recorded assembled transforms.
3. PBR materials, texture colour spaces and transparency.
4. External labels rather than baked text.
5. Budgets for geometry, textures, draw calls and loading.
6. Supported compression and loader versions.
7. Selection, labels, assembly, isolation and camera contracts.
8. Loading/failure states and fallback.

The documented studio naming pattern is `F-`, `W-`, `R-`; the wall example uses `W-01` … `W-07`, metres and +Z toward the exterior. Define roof/foundation axes separately. Existing examples such as `MG_WALL_GLB` are source-specific hooks, not universal installed interfaces.

Approve a live assembled/exploded wall look-development test before the full model. A proposed 24-layer building is not interchangeable with the current seven/four/five-layer details.

Integrating a model should preserve the approved UX. Internal asset development is not permission to restore the removed public GLB export button.

#### 14. Wix architecture and delivery

Deliver complete, copyable HTML when requested—not merely a development URL.

##### Host and iframe responsibilities

- Coordinate native headings, copy, forms and metadata with embedded visuals.
- Do not assume access to parent fonts, CSS, scroll state or analytics.
- An iframe cannot draw a menu beyond its own rectangle.
- Use native host navigation or a reviewed Custom Element when navigation must overlay the page.
- Use top-level navigation only for real host-site links, not internal section controls.
- Measure real host heights at desktop/tablet/phone widths.
- Treat viewport units and IntersectionObserver within the actual embedding context; the iframe viewport is not interchangeable with parent-page scroll.
- Do not promise that iframe text alone supplies host-page SEO.

For Custom Elements, verify current Wix setup, hosting, browser support and requirements. Validate routes and media URLs; isolate component styles where appropriate.

##### Self-contained export

Bundle the required JS/CSS, optimize/embed assets, preserve fonts and hide authoring controls. A single file can still depend on Google Fonts or hosted media; document dependencies honestly.

Preserve literal minified script content when inserting it into HTML. Replacement callbacks avoid accidental interpretation of dollar/backreference sequences.

Provide preview, copy support, the HTML file, measured heights and concise paste instructions. Optional text/copy packs should match the actual hosting composition.

##### Cross-frame security

Use an explicit message contract with allowed origins, expected source windows, validated data and scope values. Names such as `mg-bim:ready/open/close` describe a possible interface, not proof of an installed or secure integration.

Do not enable stopped BIM work while implementing an unrelated embed.

#### 15. Source and build discipline

Use one authoritative source per experience; build exports from it rather than maintaining an unrelated production mockup.

| Implementation | Editable source | Build/output contract |
| --- | --- | --- |
| React/TypeScript/R3F application | Existing workspace components, models and scoped CSS | pnpm/Vite exporter; target-specific standalone HTML |
| Static HTML fragments | Verified section source and shared styles | Its actual fragment builder, stitched preview and paste-ready outputs |
| Studio model | Approved asset hierarchy and material files | Loader plus reviewed interaction integration |

Do not copy commands between implementations without verifying their files.

Current Replit targets:

```bash
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building export:wix

cd artifacts/mongrain-building
PORT=24888 BASE_PATH=/ node scripts/export-wix.mjs --foundation
```

Outputs are `exports/mongrain-building-wix.html` and `exports/mongrain-foundation-systems-wix.html`. The normal build does **not** automatically refresh the foundation target.

In the static-fragment workflow, `FRAGMENT` denotes shared-style/script assembly, `NOBUILD` denotes a dedicated builder, and `embeds/`, `txt/`, copy pages and stitched previews are generated outputs. Edit its source, not generated output. Commands such as `python3 build.py <folder>` and flags such as `#instant`/`#still` apply only where implemented.

Keep focused modules, typed state, lazy loading where useful, scoped CSS, correct lifecycle cleanup and artifact-aware URLs. Do not introduce unrelated backend services or replace the database during visual work.

Rebuilding or updating GitHub does not update HTML already pasted into Wix.

#### 16. Accessibility, performance and truthful states

- Use semantic buttons/links, focus visibility, keyboard navigation and readable selection.
- Verify Escape, close and focus return for dialogs.
- Preserve touch/page scrolling and sufficiently large targets.
- Use alt text for meaningful images and hide decorative SVG from assistive technology.
- Reduced motion must retain a complete explanation and functional manual controls.
- Unsupported WebGL needs an honest diagram or explanation.
- Reduced motion is not the same as unavailable WebGL.
- Fragment progressive enhancement should keep content visible without JS; React viewers require JS unless a separately verified alternative is implemented.
- Pause hidden/offscreen work, manage pixel ratio and release resources appropriately.
- Measure performance on target devices; do not promise a frame rate without evidence.

Keep feedback accurate. The current foundation brief is locally generated for copy/download—not sent to Mongrain. An actual enquiry requires implemented submission, validation, delivery/storage, error handling and confirmation.

Analytics is optional and non-blocking. Track deliberate manual actions using fixed values, not personal data or animation frames. Copied Wix HTML does not inherit Replit tracking; instrumenting the host or a new page is separate work.

#### 17. Verification and completion

Check the complete requested unit, not isolated files.

1. Confirm source, system order, vendor-neutral labels and factual claims.
2. Type-check relevant changes.
3. Inspect real assembled/exploded geometry, selected layers and camera bounds.
4. Exercise affected controls, interruptions and reverse return.
5. Test desktop, tablet and narrow phone composition, long descriptions and overflow.
6. Check focus, touch, reduced motion, offscreen pause and unsupported rendering.
7. Verify the standalone HTML independently of the development application.
8. Inspect current console/network output and intended dependencies.
9. Verify the actual Wix placement when host testing is in scope.
10. Report evidence and remaining limitations.

A headless capture can lack WebGL even when the model works. A static fallback does not verify live framing or movement. Wait for meaningful completed states; distinguish slow software rendering from deadlock and current errors from replayed iframe-context errors.

Use deeper browser testing for significant, costly-to-fail journeys. Do not repeat expensive suites for every cosmetic edit.

For documents, validate beginning/end, expected sections and complete saved content before delivery; successful stdout can be incomplete.

#### 18. Collaboration, scope and reusable brief

##### Source preservation

Preserve remote history and unrelated website/research files. Parent snapshots to the current remote head, avoid force-push, stop if the branch advances, and verify uploaded and preserved hashes.

Exclude secrets, private profiles, environment values, caches and dependencies. Keep large generated packages out of source history. Do not confuse a local checkpoint with a remote snapshot commit.

Provide source, requested exports, references, reading order, verification and clear built/planned/paused status. Keep private repository access private. GitHub updates are not publication.

##### Current scope boundaries

- The hospital “Explore BIM assembly” integration remains stopped.
- A standalone reviewed BIM document does not mean that button is integrated.
- The foundation overlay and full foundation page are separate.
- Do not restore public GLB export controls or hospital-name titles.
- Do not claim verified as-built geometry, installed studio loaders, complete localization, enquiry delivery or certified performance without evidence.
- Do not silently merge application architectures or rewrite approved corporate sections.
- Do not publish or change production data without permission.

##### Reusable builder instruction

> Act as Mongrain’s premium UX, architectural 3D motion and front-end development team. Continue the approved source. Build or improve **[specific experience]** using **[approved references]**, and deliver **[requested format]**.
>
> Prioritize large readable imagery, exact approved typography, Mongrain branding, accurate generic system explanations and restrained motion. Preserve spatial continuity and independent system geometry. Select the appropriate renderer and follow this guide’s source, accessibility, Wix and verification practices.
>
> Identify what is built versus proposed. Do not invent claims, resume paused work, alter unrelated sections or publish without permission. Report the actual changes, checks and limitations.

##### Definition of done

The architecture is recognizable; hierarchy is clear; imagery is unobscured; controls work; layer logic is understandable; framing works with real UI; motion explains; alternative states remain useful; claims are supported; the requested delivery works; and approved scope is preserved.

**Reference entry points:** `GROK_START_HERE.md`, `replit.md`, `docs/mongrain-website-handoff-2026-10-12.md`, current application source and approved technical references. The two original skills files remain provenance, not separate competing operating guides.

**Working principle:** one clear design language per experience, one source of truth per implementation, and one coherent development workflow.

---

### 2D. mongrain-architectural-material-studies

_Source: `Mongrain-Code/.agents/skills/mongrain-architectural-material-studies/SKILL.md`. Its reference file is `references/approved-fire-protection.html` inside that skill folder._


Create precise, calmly lit architectural material studies rather than flat icons, cartoon flames or generic marketing illustrations.

#### Start from the approved visual reference

Read [the worked reference](references/approved-fire-protection.html) when implementing this treatment. It contains five complete inline SVG scenes, their gradients and material patterns, transitions, responsive presentation and standalone embed behavior. Preserve its geometry and finish when extending this exact visual family; do not approximate it from this description alone.

The reference is an approved visual specimen, **not approved technical copy**. Its service/company claims, hourly ratings and historical-material descriptions need independent evidence before reuse. Nothing in its geometry establishes a tested assembly.

#### Build the material study

1. Select a view that makes the mechanism legible: axonometric steel, a stepped cutaway for layered walls, a compartment view for separation, or small aligned scenes for a process.
2. Establish one projection and one light direction. The reference uses upper-left illumination, pale upper faces, darker side faces and a fine leading-edge highlight. Draw rear faces first and foreground sections last.
3. Make the cross-section unmistakable before adding detail. Reveal a W-section at the beam end; cut protective layers back so the steel remains visible. Use a quiet section hatch on cut metal rather than texturing every face.
4. Differentiate real material roles. Use smooth, thin pale paint for dry film; thick dark irregular/speckled char for heat expansion; granular warm-gray spray; softly cellular insulation; smooth board or barrier surfaces. Do not substitute a boxed board enclosure for sprayed protection.
5. Ground the assembly with a soft contact shadow. Add restrained ambient shading to communicate depth; keep the background pale and the object silhouette crisp. Avoid a dark cinematic scene that conceals the system.
6. Position short labels outside the assembly with clear leader endpoints. Use a small neutral “Illustrative · NTS” note. Keep system color accents separate from realistic material colors.

The worked specimen's five compositions:

- **Intumescent coating:** two matching dimensional beams, dry film on the left and expanded char on the right. A restrained heat arrow links states; the coating rim and cut steel remain readable.
- **Spray-applied fireproofing:** a long beam with a rough protective layer cut back to reveal steel, plus a qualitative specified-thickness annotation.
- **Thermal barrier:** stepped substrate/foam/barrier cutaway, with room-side heat indicated without numerical performance claims.
- **Partition:** a dimensional floor divided into compartments, with board, insulation and framing visible at a cut end. This is not a universal rated wall design.
- **Remediation process:** aligned dimensional floor sections showing assessment, controlled removal and rebuilding. Do not infer hazardous content or safe procedures from an illustration.

#### Visual language

For this visual family use Space Grotesk headings and Questrial graphic labels. The reference combines pale green-gray surfaces, dark teal ink, muted warm materials, cyan explanatory accents and restrained ember-orange heat cues. Its exact tokens and gradients are in the worked file.

Use rounded stage boundaries and layered contact/ambient shadows without converting each annotation into a card. Let the primary architectural image occupy the available stage. Preserve surrounding approved layouts when the requested work is graphics-only.

#### Motion that explains

Reveal distinct parts in an intentional sequence when the scene is entered or selected. Prefer one settling arrival over endless pulsing, moving dashes or flickering flames. Small hover brightening may expose an interactive detail; it must not imply a control where none exists.

Use opacity and individual `translate`/`scale` properties on animation wrappers. A CSS `transform` applied to an SVG group overrides that group's positioned `transform` attribute; keep positioning on an inner group and animation on an outer wrapper when needed.

Reference easing: `cubic-bezier(.2,.8,.2,1)`. Reduced motion must show complete static diagrams, labels and working controls. Do not continuously replay the layer arrival while reading.

#### SVG and Wix implementation details

- Prefix every gradient, pattern and filter ID by scene, for example `p1-steel`, and resolve every `url(#...)` locally.
- Preserve an `800 450`-style viewBox and reserve margins for labels and expanded geometry. Use carefully bounded blur filters to avoid clipped shadows or excessive GPU work.
- Keep grid children shrinkable with `min-width:0`. An overflowing horizontal tab strip can otherwise expand the entire illustration beyond the phone viewport.
- Verify the **actual rendered** label size after SVG scaling; increasing SVG font size is not enough if the parent stage overflows.
- Keep CSS/JS and graphics inline in standalone HTML. Document external font dependencies rather than calling the file fully offline.
- Generate preview, Copy HTML and Download HTML from the same authoritative source. Updating a repository does not update code already pasted into Wix.

#### Validation specific to this treatment

Check recognizable silhouettes, consistent face ordering, visible material boundaries, unobscured leaders and full geometry bounds at desktop and narrow-phone widths. Parse every SVG, reject duplicate IDs and verify all gradient/pattern/filter references.

The worked reference was visually inspected on desktop and a 390px phone for its initial steel scene; all five SVGs parsed with unique IDs and resolved references. That does not prove every other scene or future variation fits: inspect each composition materially changed by new work.

Keep this a graphical technique, not a source of construction specifications, manufacturer claims or project rankings.

---

_End of handoff. Sources: GitHub repos Snowden-Design, Harbour-View, Mongrain-Code, LimeTreeSocial (as of 25 Oct 2026), Claude project instructions and project memory for "Harbour View Cottages Bahamas"._
