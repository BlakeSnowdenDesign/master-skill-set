---
name: review-export
description: Use for direct owner review pages with copy/download/setup controls, shared-source HTML exports, and explicit verification limits.
---

# Review and export workflow

**Evidence:** C08/C12; S01/S02/S06/S10/S12/S14/S17/S18, [manifest](../../audit/SOURCES.md).

1. Deliver a directly accessible review page, not only a canvas preview. Put clearly labeled section-specific Copy HTML, download and setup controls where the owner reviews the section.
2. Keep owner tools out of visitor HTML. A review page is not automatically password-protected; do not place sensitive source/data on it.
3. Share body/behavior sources between integrated preview and export to limit drift. Audit export CSS for preview-only leakage and heading context.
4. S12 changes the standalone H1 to an H2 because native Wix carries the page H1. That transformation is contextual, not a universal search-and-replace rule.
5. Handle export fetch failures explicitly, disable copy until content is ready, and provide download/raw-code fallback for clipboard denial.
6. Check actual export assets, destinations, native parent responsibilities, mobile/reduced motion and links. A preview pass does not establish live Wix or upstream publication.
7. Keep exact evidence labels: static review, historical report, current test, recommendation, unavailable.
8. Read project collaboration rules before any authorized later implementation. This audit/draft authorizes no GitHub writes, PRs or publishing.

Read [delivery checklist](references/delivery.md). No app implementation was changed by this package.
