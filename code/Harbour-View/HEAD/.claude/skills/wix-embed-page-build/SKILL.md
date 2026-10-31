---
name: "wix-embed-page-build"
description: "Build an award-winning, motion-rich single-file HTML page for a Wix Embed HTML iframe, with a canvas preview window and copy-code button."
---

# Wix Embed Page Build (Snowden Design house style)

Use this whenever Blake asks for a web page, section or landing page to embed in Wix, or says "same style as Fishing With Prince".

## Role
Act as an award-winning digital design agency: UX director, architectural photographer and motion designer. Build at the highest level of clean, award-winning web development and motion design.

## Before building, gather
- Client / page purpose
- Copy (use word-for-word; never invent stats, prices or claims; missing facts become [PLACEHOLDERS])
- Photos (Wix image URLs preferred; art-direct each one: hero, portrait, wide band, poster/collage, CTA; crop to protect faces)
- Link target for booking/contact buttons
- Background gradient colors (top → bottom) if given; otherwise propose a palette from the brand
Ask only for what is missing.

## Deliverable
- One self-contained HTML file (HTML + CSS + vanilla JS, no frameworks) for a Wix "Embed HTML" element (runs in an iframe).
- Show it on a Design canvas artboard with a browser-style PREVIEW window, then the full code in a dark code panel with COPY CODE buttons (top and above the code), then 3 short Wix steps (Add Embed HTML › paste code › set height). Multiple pages = multiple artboards on the same canvas.
- Also deliver the standalone .html file and recommended iframe heights for desktop / tablet / mobile (measure them).
- All booking/contact links use target="_top" so they leave the iframe.

## Visual system (defaults; swap for a client brand when one exists)
- Type: Archivo variable (wide, font-stretch ~118%, weights 600–800) for headlines; IBM Plex Mono uppercase, 0.14em tracking, for eyebrows, labels, indexes and captions. Body Archivo 15–18px, line-height 1.55–1.65.
- Color: deep ink navy (#0A1D26 / #123440) for dark cards and text; one bright accent (turquoise #16B3A6 / aqua #7FE0D4); warm sun accent (#F2A93B) for small dots and badges only; white cards. Text on gradients is dark navy (4.5:1 minimum).
- Shape: generous rounded corners — 40px hero, CTA and photos; 28–30px cards; 20–22px tiles; pill buttons and chips.
- Depth: layered soft drop shadows (small contact shadow + large blurred ambient shadow); frosted-glass pills (backdrop blur) over photos.
- Layout: max-width ~1240px; big vertical rhythm; section headers in a three-column grid (index pill "01", eyebrow + large headline, short note) with a hairline divider; mono section numbering like a technical field guide.
- Icons: inline stroke SVGs (1.6px stroke, round caps). No emoji.

## Page structure (adapt to content)
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

## Motion design
- Load: staggered hero entrance (fade + rise 30px + blur 8px → sharp, 1–1.1s, delays 0.1 / 0.22 / 0.34s).
- Ken Burns on the hero: `animation: kenBurns 22s ease-out both;` with `@keyframes kenBurns{from{transform:scale(1.16)}to{transform:scale(1)}}`.
- Scroll reveals: elements rise in (48px, scale 0.98 → 1) via IntersectionObserver adding `.is-in` (only hide them once JS adds a class to <html>, so content shows without JS). Photos get a mask reveal: clip-path inset 14% 10% → 0 with 40px rounded corners while the image zooms 1.3 → 1. Use IntersectionObserver, never scroll position — the page scrolls outside the Wix iframe.
- In canvas (.dc.html) previews, use CSS `animation-timeline: view()` and animate the individual `translate` / `scale` properties so hover transforms still work.
- Hover: cards lift 6–8px, deepen shadow and invert to navy; icons tilt and scale; buttons get a light sweep and the arrow nudges right; feature rows fill with navy from the side; photos slow-zoom to 1.05; chips fill dark.
- Easing: cubic-bezier(.2,.8,.2,1) everywhere; no bouncy springs.
- prefers-reduced-motion: all motion off, everything visible.

## Quality bar
- Responsive: grids collapse at 1000 / 820 / 600px; buttons full-width on phones; hero overlay switches to bottom-up on mobile; no horizontal scroll.
- Accessible: real <a>/<button>, alt text on every photo, focus outlines, 44px+ touch targets, decorative SVGs aria-hidden.
- Clean code: prefixed class names (e.g. .xyz-) so nothing clashes with Wix; one file; only external dependencies are Google Fonts and Wix image URLs. Photos without a Wix URL can be inlined as compressed data URIs, but ask for Wix URLs to keep the code light.
- Render and check the page at 1280 / 980 / 390 before delivering; measure heights.
- Remind Blake that iframe text doesn't help SEO: put key copy in native Wix text or page SEO settings.