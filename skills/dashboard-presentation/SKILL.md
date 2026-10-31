---
name: dashboard-presentation
description: Present supplied dashboard images with faithful reveals and cycle-driven slide transitions without fabricating changing analytics.
---

# Dashboard presentation

Use when supplied screenshots must remain exact but the presentation needs motion.

1. Keep the original image intact. Do not redraw values, distort a chart, invent spikes, or animate a screenshot as though it were live telemetry.
2. Animate the presentation layer with a reveal mask, modest pan, or highlight around an existing region. Clearly label illustrative material when required.
3. Define one slide-cycle duration and one transition duration. Start the incoming slide only after the current reveal cycle finishes; avoid unrelated timers that drift.
4. Keep a single active index and reset cycle state on manual navigation. Pause expensive work outside the visible section.
5. Use overlapping outgoing/incoming wrappers for wipe-fade transitions. Reserve stage dimensions so image changes do not shift surrounding content.
6. Reduced motion must display the complete image and retain manual navigation. Images need meaningful descriptions rather than keyword lists.

Locate Home Refresh `src/analytics-showcase.mjs`, `src/geo-source-graphics.mjs`, and `scripts/check-dashboard-viewer.mjs`.

Validate the full slide count, sequence, wraparound, mobile containment and exact supplied asset URLs. The screenshot-based showcase is not a connected analytics product.
