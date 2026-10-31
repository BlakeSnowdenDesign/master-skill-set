---
name: snowden-design-studio
description: Route Snowden Design studio work to the shared capability library and attributed client-specific references without mixing brand identities.
---

# Studio entry skill

This is the compatible entry point for assistants that previously loaded the single studio skill. It now routes to the same [capability modules](../../SKILLS.md) as every other model.

1. Read [START-HERE.md](../../START-HERE.md) and select the target project profile.
2. Load only the relevant capability skill. Use [SECTION-INDEX.md](../../SECTION-INDEX.md) to find real implementation code.
3. For the earlier studio synthesis and its source references, locate project `master-skill-set`, ref `origin/claude/master-skill-set` in [the manifest](../../audit/current-source-manifest.json). Its exact original skill, client references and packaging script are preserved as source snapshots.
4. Treat the original client references as project-scoped, not universal art direction. Do not automatically load a different client's colors, claims, naming permissions or paused-work decisions.

The earlier studio skill said iframe text gets little or no ranking credit. Treat that as practical guidance to keep essential copy in the native parent page, not a categorical guarantee about Google's treatment of every iframe. Contextual image alt, a descriptive iframe name and useful visible native copy have separate roles.

The original source is retained rather than silently rewritten. This router prevents duplicated instructions and keeps the current library succinct.
