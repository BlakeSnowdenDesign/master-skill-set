---
name: responsive-layout
description: Use for fluid HTML/CSS frames, responsive image motion, and separate preview/export layout checks; not for importing another project's brand.
---

# Responsive layout and framed motion

**Evidence:** C03, S07/S18/S20, [manifest](../../audit/SOURCES.md).

1. Inspect the target's layout before extracting a pattern. Namespace component selectors; preserve semantic reading order and headings.
2. Use fluid widths, bounded `clamp()` spacing, centered containers and intrinsic image ratios. Avoid one desktop width scaled down wholesale.
3. Keep a moving image inside a stable, clipped frame; transform the image, not document flow. Reveal intended edges at the resting/zoomed-out pose. A rotated image can expose gaps: inspect all loop poses.
4. Separate parent entry transform from image motion and button interaction. Explicit final states prevent hidden content after entry.
5. Provide static reduced-motion presentation; retain all content without animation/observer support.
6. Check wide desktop (~2220px), ordinary desktop, tablet, narrow phone, portrait and landscape. Check standalone export independently from integrated preview, especially centering and parent iframe height.

The Snowden request for slow reverse-loop office motion and smaller centered photo is project-specific. Do not copy those exact values to Harbour or Lime Tree.

Read [example and review matrix](references/frame.md). This module is statically extracted; the matrix is recommended, not run here.
