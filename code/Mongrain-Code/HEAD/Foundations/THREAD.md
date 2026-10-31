# Thread record — Foundations animation (Replit, October 2026)

A faithful summary of the Replit Agent conversation that produced this work. It's not a verbatim transcript, because the earlier part of the chat was compacted.

## 1. Brief
- Mongrain (architecture / building-envelope firm) supplied a foundation diagram (`reference/foundation-diagram.jpg`) titled "Foundation Systems: The Sub-Grade Assembly".
- The request was to animate it so the assembly builds up layer by layer, for embedding in their Wix site.
- The layers are: Excavation, Conventional Footing, Berlin Wall/Blindside, Membrane Assembly, Protection & Insulation, and Drainage.
- The user said "I want both deliverables". This was taken to mean:
  - both versions: a 2D animation faithful to the diagram, and an interactive rotatable 3D model;
  - both Wix formats: a live link to embed (iframe) and single-file HTML to paste.

## 2. What was built
- A React + Vite web app (not a video), because Wix needs a publishable page to embed.
- **`/` Animated 2D:** an SVG isometric drawing that assembles layer by layer, with leader-line callouts per layer and a Replay button.
- **`/3d` Interactive 3D:** a three.js model.
  - Drag to orbit, scroll to zoom.
  - Click a layer to highlight it and explode it out.
  - An "Explode all" toggle and a layer legend.
  - A fallback message when WebGL is unavailable.
- Visual direction: calm, precise architectural-studio look. The H1 is in Schibsted Grotesk and matches the hero font, per the user's preference.
- Both routes were checked at desktop (1280) and mobile (420) widths.

## 3. Wix delivery
- **Single-file HTML exports** (`wix/*.html`, about 1.5 MB each): fully self-contained.
  - Because of their size they may exceed Wix's code-box limit, so the iframe embed is the recommended route.
- **Copy-code buttons.** The user asked for a copy-code button "as before".
  - An unlinked owner page `/embed` was added. Per view it has: Copy embed code (iframe), Copy full HTML and Download.
  - A "Get embed code" button was briefly added to the animation header. The user rejected it: *"this is only for me to copy... not for the viewers... not front facing on the page."* It was removed.
  - The rule now: owner tools never appear on the public animation.
  - The iframe snippets carry `?embed=1`.
- The user asked to make "always provide a copy HTML code button" a standing instruction for all future work. It was saved to their profile.

## 4. Publishing
- Published at https://layered-foundation-reveal.replit.app.
- **Open issue:** the deployment visibility is **Private**, so visitors get redirected to a Replit sign-in page and Wix viewers won't see the animation.
  - Fix: set visibility to Public in Replit Publishing.
  - Alternative: host the `wix/*.html` files somewhere public (for example GitHub Pages) and iframe that address.

## 5. GitHub
- The user asked to "coordinate this with GitHub" and chose both options:
  - back up the code;
  - host the animations publicly on GitHub Pages for Wix.
- The user's instruction: *"build a folder under mongrain code for 'Foundations', place this thread there — I will have claude code grab it."*
  - This folder is that handoff.

## Possible next steps
- Make the live site public, or host the `wix/` files publicly (GitHub Pages), then update the Wix embed.
- From the user's broader plan: further animations (roof, full building) with layer-by-layer explosion, a rotatable full building, and click-to-highlight sections.
  - The Proment Evoloflex example is the reference for the rotation and highlighting interaction only, not its graphics.
