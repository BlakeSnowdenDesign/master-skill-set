---
name: background-motion
description: Build restrained Ken Burns photo loops and geometric gradient backgrounds without breaking media framing or reduced-motion layouts.
---

# Photo and background motion

Use for photo-led HTML sections, slow organic geometry and subtle moving gradients.

## Photo workflow

1. Inspect the intrinsic image ratio and the user's required visible subject. `object-fit:cover` clips; use the intrinsic aspect ratio and `contain` when the entire computer or subject must appear at full zoom-out.
2. Center and size the outer layout frame; clip only the inner animated media. Do not use the zoom transform to repair a misaligned grid.
3. Animate an inner image from `scale(close)` to `scale(1)` with `infinite alternate both`. This starts close, reaches the full frame, and returns without a reset jump.
4. Interpret a speed change mathematically. For 30% faster use `duration / 1.30`; for 13% slower use `duration / .87`. Keep speed changes separate from zoom range.
5. Reserve image dimensions. For an above-the-fold photo inside a Wix iframe, eager loading and high fetch priority can avoid a blank placeholder caused by deferred loading. Do not eagerly load every portfolio item.

## Backdrop workflow

Use a positioned, isolated section with noninteractive pseudo-elements behind a foreground content wrapper. Combine very low-opacity borders, radial gradients and asymmetric `border-radius` values for curved forms. Confine decoration to the requested region and clip overflow at the section.

Move gradients or geometry with slow transform/opacity animations; avoid continuously animating large blur filters. Keep hover, positioning and loop transforms on separate wrappers. Do not apply the same iris motif to every page.

## Source lookup and checks

In the section index, find Home Refresh `scripts/export-about-ken-burns.mjs`, `src/growth-backgrounds.css`, `src/photography.css` and the corresponding delivered HTML.

Compare the full zoom-out frame and close frame at phone and wide desktop widths. Under reduced motion show the complete static photo and background. Updating the Git source does not update HTML already pasted into Wix.
