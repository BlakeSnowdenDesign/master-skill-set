---
name: reflective-controls
description: Use for rounded reflective glass or polished metal buttons with clipped sweeps, bevels, and shadows; not a replacement menu design.
---

# Reflective controls

**Evidence:** C01/C02; S04/S06/S15/S16, [manifest](../../audit/SOURCES.md). Supplied reference is labeled GROK in the local note; independent authorship unverified.

1. Keep semantic buttons or anchors and preserve destination, layout, timing and interaction contract.
2. Build separate broad silver gradient, subtle texture, upper highlight, inset bevel, tight contact shadow and softer cast shadow.
3. Clip moving sheen in a dedicated decorative child with inherited radius and `pointer-events:none`. Do not clip the outer focus outline or shadows.
4. Place labels above reflections. Check contrast at peak sheen, not just rest. Opaque chrome is not transparent glass; real background visibility needs alpha and optional backdrop filtering.
5. Transform a narrow angled gradient for roughly 550ms on hover **and focus**. Optional turned-metal reflection may rotate over 700ms; preserve a static fallback.
6. Keep entry animation separate. Use explicit visible final values and backwards fill where appropriate so entry does not override hover/pressed transforms.
7. Reduced motion disables entry/sweep/rotation, not affordances. Touch activates immediately; never require a second tap or delay navigation for animation.
8. Exclude preview console overrides, pointer-lock forwarding, broad wildcard messages, global scrollbar changes and copy toolbars.

Progressive references:

- [Compact material example](references/material.md)
- [Aluminum construction and lifecycle](references/aluminum.md)

Static extraction only. Local source reports a related desktop visual check, not exhaustive cross-browser, touch or generalized recipe validation.
