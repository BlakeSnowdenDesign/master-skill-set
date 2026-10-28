# Snowden Design master skill set

One agent skill that combines everything Snowden Design's AI collaborators have learned across Blake Snowden's repositories: how to build Wix Studio pages and embeds, motion design, 3D and WebGL visuals, technical diagrams, media, SEO and GEO, and the art direction for each client.

| Combined from | What it brought |
| --- | --- |
| [Snowden-Design](https://github.com/BlakeSnowdenDesign/Snowden-Design) | The Snowden Design 2 brand and design direction, the native-Wix vs embed SEO split, Claude/Replit collaboration rules |
| [Harbour-View](https://github.com/BlakeSnowdenDesign/Harbour-View) | The house Wix embed build skill and the "modern Briland luxury" art direction |
| [Mongrain-Code](https://github.com/BlakeSnowdenDesign/Mongrain-Code) | The 3D/WebGL development workflow, exploded views, camera framing, technical accuracy and the architectural material-study technique |
| LimeTreeSocial | Nothing yet (the repository was empty on 28 Oct 2026) |

## What's inside

```
skills/snowden-design-studio/
  SKILL.md                       the skill: start here
  references/
    snowden/                     design direction, native SEO audit
    harbour-view/                Briland luxury art direction
    mongrain/                    master builder guide, material studies, approved SVG specimen, fireproofing notes
    wix-embed-page-build-original.md
.claude-plugin/                  lets Claude Code install this repo as a plugin
AGENTS.md, CLAUDE.md             point any agent working in this repo at the skill
scripts/package-skill.sh         zips the skill for claude.ai upload
```

`SKILL.md` is the single operating guide. The reference files are the original source documents, kept so the agent can read the full detail when a task needs it. Where a reference disagrees with `SKILL.md`, `SKILL.md` wins.

## Install

### Claude Code: as a plugin (recommended, stays up to date)

```
/plugin marketplace add BlakeSnowdenDesign/master-skill-set
/plugin install snowden-design-studio@snowden-design
```

### Claude Code: copy the folder

- For every project on your machine: copy `skills/snowden-design-studio` into `~/.claude/skills/`.
- For one repository only: copy it into that repo's `.claude/skills/` and commit it.

### claude.ai (web, desktop and mobile apps)

Run `scripts/package-skill.sh`, then upload `dist/snowden-design-studio.zip` in Settings > Capabilities > Skills. Once it's saved, remove the older `wix-embed-page-build` skill, since its font defaults predate the Snowden Design 2 brand.

### Replit Agent, Codex and other agents

Copy `skills/snowden-design-studio` into the project's `.agents/skills/` folder (Replit) or point the agent at it from the project's `AGENTS.md`, like this repo's own `AGENTS.md` does.

## Updating the skill

Edit `skills/snowden-design-studio/SKILL.md` on a branch and merge it by pull request. Claude works on `claude/...` branches and Replit on `replit/...` branches. When a client repository's own skill changes, copy the new version into `references/` and fold any rule that changed into `SKILL.md`.
