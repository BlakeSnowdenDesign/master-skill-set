---
name: 3d-interaction-contract
description: Use when planning selectable illustrative 3D layers, reversible assembly states and camera framing; verify the original project contract before implementation.
---

# Illustrative 3D interaction contract

**Evidence: C14, U02/U04/U05.** User-supplied ChatGPT report, not underlying source inspection or tested behavior. See [integration limits](../../audit/CHATGPT-INTEGRATION.md).

1. Retrieve the original model/approved handoff before choosing interactions. A suggested journey is not permission to resume paused work.
2. Define stable layer ID, assembled transform, separation direction, material explanation, callout anchor and UI-control mapping. Preserve original identifiers where they exist.
3. Separate geometry/system-specific groups from shared interaction logic. Walls, roofs and foundations need not share geometry or camera assumptions.
4. Define select, highlight, zoom, pullout, exploded detail, reverse return and reset explicitly. These are proposed states, not proof MONGRAIN implements each.
5. Preserve stable transition state; cancel stale callbacks, stop autoplay after deliberate input, and support keyboard/touch/reduced motion. Do not let old animation completion undo a newer selection.
6. Frame assembled and exploded bounds, plus the longest mobile panel. Inspect near corners, labels and leaders at actual viewport sizes.
7. Keep illustrative models distinct from as-built/BIM/engineering evidence. Manufacturer reference material does not establish installed systems, ratings, thicknesses or performance.

Read [contract example](references/contract.md), then [media embedding](../media-3d/SKILL.md). MONGRAIN hospital BIM integration is reported stopped; do not resume without current source verification and a new authorized instruction.
