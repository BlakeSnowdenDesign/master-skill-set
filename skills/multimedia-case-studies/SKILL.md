---
name: multimedia-case-studies
description: Combine editorial lookbooks, video, social links and portfolio cards into one coherent case study with efficient media loading.
---

# Multimedia case studies

Use for a body of work spanning video, web, editorial, photography and social design.

1. Organize the case study by creative objective and deliverable, not a dump of every media file. Keep the story, technical approach and evidence distinct.
2. Use one source record for each project card and its detail section so URLs, labels and poster images stay consistent.
3. Background previews can use muted, looping, inline autoplay. Meaningful films need discoverable controls and an explicit way to enable sound. Autoplay may still be blocked.
4. Defer heavy lookbook iframes until requested. Prefer posters and metadata preload over downloading every video at page load.
5. Retain original external destinations. Social links must have an honest fallback when an embed requires login or third-party cookies.
6. Do not merge Lime Tree Hospitality with Lime Tree Social without evidence. Shared spelling is not proof of shared brand or ownership.

Locate Home Refresh `src/limetree-feature.mjs`, `src/media-inventory.mjs`, `scripts/export-work.mjs` and `si-work-limetree-feature.html` in the section index.

Check responsive aspect ratios, visible video controls, failed-media states and modal position inside tall Wix iframes. Keep a dialog near its trigger rather than assuming the iframe viewport equals the visible phone viewport.
