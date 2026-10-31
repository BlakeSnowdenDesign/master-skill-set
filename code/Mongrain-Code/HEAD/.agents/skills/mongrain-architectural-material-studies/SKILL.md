---
name: mongrain-architectural-material-studies
description: "Creates dimensional architectural graphics in code: lit steel sections, textured protective layers, cutaways and compartment diagrams with restrained explanatory motion. Use for architectural service graphics, construction-system illustrations and material studies, including standalone Wix embeds. Complements frontend implementation skills rather than replacing them."
---

# Mongrain Architectural Material Studies

Create precise, calmly lit architectural material studies rather than flat icons, cartoon flames or generic marketing illustrations.

## Start from the approved visual reference

Read [the worked reference](references/approved-fire-protection.html) when implementing this treatment. It contains five complete inline SVG scenes, their gradients and material patterns, transitions, responsive presentation and standalone embed behavior. Preserve its geometry and finish when extending this exact visual family; do not approximate it from this description alone.

The reference is an approved visual specimen, **not approved technical copy**. Its service/company claims, hourly ratings and historical-material descriptions need independent evidence before reuse. Nothing in its geometry establishes a tested assembly.

## Build the material study

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

## Visual language

For this visual family use Space Grotesk headings and Questrial graphic labels. The reference combines pale green-gray surfaces, dark teal ink, muted warm materials, cyan explanatory accents and restrained ember-orange heat cues. Its exact tokens and gradients are in the worked file.

Use rounded stage boundaries and layered contact/ambient shadows without converting each annotation into a card. Let the primary architectural image occupy the available stage. Preserve surrounding approved layouts when the requested work is graphics-only.

## Motion that explains

Reveal distinct parts in an intentional sequence when the scene is entered or selected. Prefer one settling arrival over endless pulsing, moving dashes or flickering flames. Small hover brightening may expose an interactive detail; it must not imply a control where none exists.

Use opacity and individual `translate`/`scale` properties on animation wrappers. A CSS `transform` applied to an SVG group overrides that group's positioned `transform` attribute; keep positioning on an inner group and animation on an outer wrapper when needed.

Reference easing: `cubic-bezier(.2,.8,.2,1)`. Reduced motion must show complete static diagrams, labels and working controls. Do not continuously replay the layer arrival while reading.

## SVG and Wix implementation details

- Prefix every gradient, pattern and filter ID by scene, for example `p1-steel`, and resolve every `url(#...)` locally.
- Preserve an `800 450`-style viewBox and reserve margins for labels and expanded geometry. Use carefully bounded blur filters to avoid clipped shadows or excessive GPU work.
- Keep grid children shrinkable with `min-width:0`. An overflowing horizontal tab strip can otherwise expand the entire illustration beyond the phone viewport.
- Verify the **actual rendered** label size after SVG scaling; increasing SVG font size is not enough if the parent stage overflows.
- Keep CSS/JS and graphics inline in standalone HTML. Document external font dependencies rather than calling the file fully offline.
- Generate preview, Copy HTML and Download HTML from the same authoritative source. Updating a repository does not update code already pasted into Wix.

## Validation specific to this treatment

Check recognizable silhouettes, consistent face ordering, visible material boundaries, unobscured leaders and full geometry bounds at desktop and narrow-phone widths. Parse every SVG, reject duplicate IDs and verify all gradient/pattern/filter references.

The worked reference was visually inspected on desktop and a 390px phone for its initial steel scene; all five SVGs parsed with unique IDs and resolved references. That does not prove every other scene or future variation fits: inspect each composition materially changed by new work.

Keep this a graphical technique, not a source of construction specifications, manufacturer claims or project rankings.
