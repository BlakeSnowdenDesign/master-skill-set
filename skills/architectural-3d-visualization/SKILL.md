---
name: architectural-3d-visualization
description: Reuse architectural envelope viewers and foundation cutaways with stable component identity and truthful BIM-style presentation.
---

# Architectural 3D visualization

Use for interactive building-envelope models, exploded wall layers and foundation cutaways. Use the material-study module for SVG illustrations rather than a live 3D viewer.

## Workflow

1. Start from the original viewer and its geometry/material definitions; do not replace it with an approximate illustration while claiming equivalent behavior.
2. Keep stable IDs across selection, layer visibility, explosion, annotations and analytics. A selected item must remain identifiable after assembly mode changes.
3. Separate camera state from assembly state. Define reset behavior, orbit bounds and part-specific focus positions explicitly.
4. Preserve legible labels and visible geometry at narrow widths. Bound exploded offsets so components do not leave the useful camera region.
5. Provide a meaningful fallback for WebGL failure and reduced-motion behavior. Avoid running multiple off-screen viewers continuously.
6. Generate Wix HTML and owner preview from the same implementation. Resolve all module, font and image URLs in the actual iframe environment.

## Evidence and limits

Find Mongrain-Code's `artifacts/mongrain-building/src/components/Explorer.tsx`, its `foundation/` components, `lib/wallLayers.ts`, standalone exports and `Foundations/` build code through the manifest. Snowden Design's `claude/3d-visualization` branch contains its page build and live-viewer integration.

These files were retrieved and inspected as source, not all executed in this consolidation. The underlying scenes illustrate construction concepts; they do not establish engineering performance, tested fire ratings, code compliance or manufacturer certification. Public use of client names and imagery still needs appropriate permission.

Check selection, explode/reassemble, reset, camera framing, failed WebGL and standalone asset resolution before adopting a viewer.
