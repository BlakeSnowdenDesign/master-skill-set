---
name: wix-delivery
description: Use when delivering HTML sections to Wix, deciding parent versus iframe responsibilities, sizing embeds, or placing in-embed dialogs.
---

# Wix delivery and iframe boundaries

**Evidence:** C04/C08; S01/S02/S06/S10/S11/S12/S13, [manifest](../../audit/SOURCES.md).

1. Confirm the exact site and page authorized for changes. Development code is not Wix publication.
2. Keep important visible headings/copy, navigation, footer, forms, metadata, canonical and structured data in the Wix parent as appropriate. Put custom animation and interactive viewers in HTML embeds.
3. Label the **parent iframe** descriptively; distinguish this from inner image alt and document title.
4. Set width/height at actual Wix breakpoints. A fixed iframe cannot cover content beyond its bounds. Parent overlay/resize needs deliberate Wix integration and verification; inner CSS alone cannot create it.
5. In a very tall section, an iframe-centered dialog may be far from the visible phone viewport. Keep it near its trigger, retain native modal keyboard behavior, visible Close and internal image scrolling.
6. Preserve verified page links; proposed clean slugs are not automatically live. Coordinate route changes and redirects.
7. Deliver visitor HTML separately from review tools; preview real desktop/tablet/phone in Wix before the owner publishes. Do not guess embed heights.

Read [boundary checklist](references/boundaries.md) and pair with [accessibility/SEO](../accessibility-seo/SKILL.md). No Wix editor or live-site inspection performed in this audit.
