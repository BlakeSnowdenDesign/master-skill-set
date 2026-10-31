# Web Development Master Skill Set

Model-neutral HTML/CSS/JavaScript and architectural-visualization compendium.

**Start with [START-HERE.md](START-HERE.md)** → [capability router](SKILLS.md) → [section-by-section code index](SECTION-INDEX.md).

The canonical shared destination is **https://github.com/BlakeSnowdenDesign/master-skill-set**.
The local working folder retains its historical `master skillet` spelling for compatibility.
The current repository collection and its limits are documented in [CURRENT-AUDIT.md](audit/CURRENT-AUDIT.md), with exact revisions and hashes in [the current manifest](audit/current-source-manifest.json).

Reusable modules are separate from attributed project snapshots under `code/`. Load only the module and source section needed for the next task. Model-specific entry files point to the same directives rather than maintaining separate skill libraries.

## Earlier draft documentation

The material below describes the previous local/imported audit. Its statements that no repositories were accessed or publication was unapproved are historical and superseded by the current audit above.

Portable web-development knowledge package · **LOCAL REVIEW DRAFT — PARTIAL INDEPENDENT AUDIT**

Now integrates the user-supplied ChatGPT review alongside workspace evidence. See [what was merged and reconciled](audit/CHATGPT-INTEGRATION.md). Imported findings are reported, not independently source-verified.

No GitHub writes occurred. No repository, remote folder, branch, pull request, or publication was created. The name `master skillet` is the requested local working name; exact eventual GitHub folder spelling, destination, visibility, and publication approval remain unresolved.

## Start here

1. Give a fresh assistant [MASTER-PROMPT.md](MASTER-PROMPT.md), or use [SESSION-START.md](SESSION-START.md).
2. Read [coverage](audit/COVERAGE.md) before treating this as a repository audit.
3. Choose a [project profile](projects/INDEX.md); never inherit another project's identity.
4. Load only relevant skills from the table below and their references.
5. Use [HANDOFF.md](HANDOFF.md) for shared constraints, [conflicts](audit/CONFLICTS.md) for disagreements, and the [source manifest](audit/SOURCES.md) for provenance.

| Need | Module |
|---|---|
| Fluid layouts, framed image motion | [Responsive HTML/CSS](skills/responsive-layout/SKILL.md) |
| Rounded metallic/glass controls | [Reflective controls](skills/reflective-controls/SKILL.md) |
| Parent Wix versus embedded document | [Wix delivery](skills/wix-delivery/SKILL.md) |
| Alt text, iframe names, visible native content | [Accessibility and SEO](skills/accessibility-seo/SKILL.md) |
| Original viewers, srcdoc, media fallback | [Media and 3D](skills/media-3d/SKILL.md) |
| Separate review pages and visitor exports | [Review/export](skills/review-export/SKILL.md) |
| Proposed reversible 3D state and camera contract | [3D interaction contract](skills/3d-interaction-contract/SKILL.md) |
| Proposed dimensional SVG material studies | [Architectural material studies](skills/architectural-material-studies/SKILL.md) |
| Privacy-minimal measurement and truthful delivery states | [Measurement honesty](skills/measurement-honesty/SKILL.md) |

## What is and is not covered

This draft extracts reviewed local Snowden workspace evidence and the five-document ChatGPT review attributed by the user. It includes recorded Claude/Replit collaboration and a GROK-labeled material reference, without guessing authorship or accessing private conversations. GitHub attachment was denied twice here. **Zero live repositories or organizations were independently enumerated. Pagination was not started here, not exhausted.** ChatGPT reports four repository candidates but provides no immutable source revisions or pagination records. Other project profiles retain explicit verification limits.

The package includes curated evidence excerpts and hashes, not full repositories, client media, analytics screenshots, third-party code bundles, credentials, private profile files, or managed agent libraries. An excerpt hash identifies the original local file but does not grant redistribution rights or prove upstream approval. Review rights before sharing.

## Review and upkeep

- [Full cross-project handoff](HANDOFF.md)
- [Familiar FULL-HANDOFF entry](FULL-HANDOFF.md)
- [Integrated skill compendium](SKILL-COMPENDIUM.md)
- [Reported repository inventory](REPOSITORY-INVENTORY.md)
- [ChatGPT integration decisions](audit/CHATGPT-INTEGRATION.md)
- [Coverage and exclusions](audit/COVERAGE.md)
- [Source manifest and claim map](audit/SOURCES.md)
- [Machine-readable provenance](audit/source-manifest.json)
- [Curated local evidence](audit/EVIDENCE.md)
- [Conflicts and open questions](audit/CONFLICTS.md)
- [Maintenance procedure](MAINTENANCE.md)
- [Optional instruction-file adapters](adapters/README.md)
- [Fresh-session walkthroughs](validation/WALKTHROUGHS.md)
- [Validation results](validation/RESULTS.md)

Local validation: `python3 scripts/validate-master-skillet.py`

Local export: `python3 scripts/export-master-skillet.py`

Run those commands from the workspace root, not inside this folder. Exports go to ignored `generated-artifacts/master-skillet/`; they do not change any app or remote repository.
