---
name: reversible-navigation
description: Build staggered menus that retract in reverse order with cancellable automatic opening and safe iframe-aware navigation.
---

# Reversible navigation

Use for expanding header strips and ordered navigation reveals.

1. Give the menu one explicit open/closed state. Update `aria-expanded`, hidden/inert behavior and focus availability together; opacity alone does not remove closed links from keyboard navigation.
2. Open items in index order with an even delay. Close in reverse index order, and keep the enclosing background present until the final item retracts.
3. Maintain one settling timer and one optional auto-open timer. Clear prior timers before changing state so rapid clicks cannot leave the background stuck.
4. Cancel automatic opening on a manual interaction. An explicit user close must not be undone by the original delayed timer.
5. For translucent overlays use an alpha background, not opacity on the entire container, which also fades text and controls.
6. A menu inside an iframe cannot extend beyond its parent iframe. Size the Wix embed to the intended open height and document the closed-state overlap implications.
7. Use explicit intended navigation targets when links must leave the iframe. Keep logo and wordmark home links semantic.

Find Home Refresh `src/header-shared.mjs`, `src/header.css` and `scripts/export-header.mjs` through the manifest. Brushed-aluminum alternatives are retained from Snowden Design's corresponding branch.

Check open, close, fast repeated toggle, keyboard navigation, Escape, manual cancellation of delayed opening and reduced-motion completion. Project-specific automatic delay values are examples, not universal defaults.
