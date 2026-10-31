> Source: Harbour-View `.claude/skills/harbour-view-briland-luxury/SKILL.md`, copied 28 Oct 2026. Kept as a reference for the snowden-design-studio skill; where they differ, `../../SKILL.md` wins.

# Harbour View Cottages: modern Briland luxury

Use together with `wix-embed-page-build` whenever building or editing a Harbour View Cottages (Harbour Island, Bahamas) page or section. That skill sets the build rules (single-file Wix Embed HTML, preview + copy code, motion, quality bar). This one sets the art direction and the client brand, which replace the default house visual system.

## Design direction
The overall aesthetic is "modern Briland luxury": soft coastal minimalism, understated Bahamian character and elevated bohemian resort styling.

Think: Harbour Island, Pink Sands Beach, white clapboard cottages, soft linen, natural oak, coral stone, bougainvillea, weathered shutters, rattan, teak, woven textures, pale sand, sea glass, turquoise water, warm filtered sunlight, open-air island living, refined barefoot luxury.

## Motion
- Slow fade-up reveals
- Soft image scaling
- Text reveal masks
- Understated parallax
- Gentle hover transitions
- Thin divider lines that animate into view
- Smooth scrolling
- Subtle cursor-responsive image movement, only if performance remains excellent

Animations should feel like high-end hospitality, architectural, fashion or luxury real estate websites.

## Feel
Custom-designed, architectural, sophisticated, editorial, modern, Bahamian and exceptionally expensive.

Not "vacation rental website". Instead: "a private Harbour Island residence presented like a luxury design brand."

## Client brand (use instead of the house defaults)
- Type: Prata (display) and Questrial (secondary / body).
- Palette: "Harbour Twilight". Former blue accents use the gradient #B4D5E2 → #24506B.
- Prefix classes with `.hv-`.
- "Check dates" buttons link to the site's Rates section until a booking link is given (the Wix site has Wix Hotels installed). Use `target="_top"`.

## Content
- Use the copy in `content/` word for word. Never invent rates, stats or claims; missing facts become [PLACEHOLDERS].
- Rates live in `pages/rates/harbour-view-rates.html`; its availability calendar is sample data only.
- Homepage is six full-width Embed HTML sections: 0-hv-hero-film, a-hv-hero, b-hv-estate, c-hv-cottages (the only section whose Ken Burns zooms in), d-hv-water-dock, e-hv-closing.
