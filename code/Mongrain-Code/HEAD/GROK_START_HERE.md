# Mongrain — start here, Grok

This repository contains an approved website build and several envelope animations. Continue from the existing code; do not restart or replace it with a generic mockup.

## Reading order

1. Read the [unified design and development skills guide](Mongrain_master%20skills%20builder.md).
2. Read the [full creative and technical handoff](docs/mongrain-website-handoff-2026-10-12.md).
3. Read [project instructions](replit.md).
4. Inspect the relevant source under [artifacts/mongrain-building](artifacts/mongrain-building).
5. Consult [original website sections](mongrain-code), [standalone HTML exports](exports) and [technical research](research/soprema) when relevant.

The handoff was prepared on 12 October 2026, before this GitHub synchronization. Its historical statements about unverified GitHub synchronization describe that earlier snapshot. This upload adds the current workspace source and handoff to the existing `main` branch without replacing unrelated website files. No production publication is performed.

## What exists

- `/` is the recognizable hospital envelope explorer.
- `/foundation-systems` is the latest **six-section foundation systems page**.
- Wall, roof and foundation detail overlays are inside the hospital explorer. The foundation overlay is separate from the new foundation full page.
- `mongrain-code/` contains the older corporate website sections, including the hero introduction. Preserve them.
- `exports/` contains seven standalone HTML exports. The hospital and foundation-page exports were refreshed for the handoff.
- The separate reviewed BIM HTML exists, but the hospital **“Explore BIM assembly” integration was stopped by the user**. Do not resume it without a new instruction.
- The foundation enquiry brief is generated locally; it is **not sent to Mongrain**.

## Design and technical constraints

- Large imagery, restrained motion, clean presentation and readable exploded assemblies.
- Use the supplied Mongrain logos and established colours. Match H1 fonts to the hero introduction when asked to align website typography; inspect its actual CSS rather than guessing from a screenshot.
- Preserve the click → zoom → section pullout → detailed explosion journey.
- Keep each section's geometry and framing independent.
- The current models are procedural Three.js / React Three Fiber, not imported GLB/glTF or verified as-built BIM.
- Public animations must use generic system/material names, not SOPREMA product branding. Manufacturer PDFs are research references, not confirmation of the hospital's actual assemblies.
- Do not invent performance claims, certifications, construction specifications or contact details.
- Complete copyable Wix HTML is required. Changing source alone does not refresh an existing Wix embed.
- The normal app build does **not** regenerate the foundation-page standalone target. Follow the handoff's explicit `--foundation` export command.
- Do not force-push, replace the database, change repository visibility or publish the application without permission.

## Useful source entry points

- `artifacts/mongrain-building/src/App.tsx` — route selection.
- `artifacts/mongrain-building/src/components/Explorer.tsx` — hospital interactions.
- `artifacts/mongrain-building/src/components/foundation/FoundationSystemsPage.tsx` — six-section foundation page.
- `artifacts/mongrain-building/src/components/foundation/FoundationSystemsModel.tsx` — foundation cutaway and movement.
- `artifacts/mongrain-building/src/components/foundation/foundation-systems.css` — foundation-page styling.
- `artifacts/mongrain-building/scripts/export-wix.mjs` — self-contained HTML generation.
- `mongrain-code/home/01-hero-introduction.html` — original hero typography reference.
- `attached_assets/Mongrain_Roofing_Systems_1791517953363.pdf` — supplied roofing reference.

Repository access is private. Use authorized GitHub access; a public web-search result or unauthenticated fetch is not evidence that these files are missing.

**First action:** summarize your understanding and ask what the user wants changed next. Make requested changes in the existing source, not in an unrelated replacement design.
