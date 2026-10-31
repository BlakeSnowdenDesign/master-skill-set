# Foundations — Sub-Grade Assembly animation

Handoff folder for the Mongrain foundation animation, built in Replit. It holds the conversation record, source code, standalone Wix HTML files and the reference image. It's meant for Claude Code to pick up.

## What's here

| Path | What it is |
| --- | --- |
| `THREAD.md` | Record of the build conversation: requests, decisions and current state |
| `wix/foundation-assembly-2d.html` | Standalone animated 2D version (single file, about 1.5 MB). Paste it into Wix Embed HTML > Code, or host it |
| `wix/foundation-assembly-3d.html` | Standalone interactive 3D version (single file, about 1.5 MB) |
| `reference/foundation-diagram.jpg` | The original foundation diagram the animation is based on |
| `source/` | React + Vite + three.js source (the `artifacts/foundation-assembly` package from the Replit project) |

## Live (Replit) version

- Published at https://layered-foundation-reveal.replit.app. Its visibility is currently **Private**, so set it to Public in Replit Publishing before embedding.
- `/` shows the animated 2D version.
- `/3d` shows the interactive 3D version: orbit, click a layer to explode it, "Explode all".
- `/embed` is an unlinked, owner-only page with copy-code buttons.

### Wix embed codes

Animated 2D:
```html
<iframe src="https://layered-foundation-reveal.replit.app/?embed=1" title="Foundation Systems: The Sub-Grade Assembly" style="width:100%;height:700px;border:0;" loading="lazy" allowfullscreen></iframe>
```

Interactive 3D:
```html
<iframe src="https://layered-foundation-reveal.replit.app/3d?embed=1" title="Foundation Systems: The Sub-Grade Assembly" style="width:100%;height:700px;border:0;" loading="lazy" allowfullscreen></iframe>
```

## Source notes

- `source/` was a package inside a pnpm monorepo (`@workspace/foundation-assembly`). Some dependency versions use `catalog:`, so to run it standalone you'll need to replace those with real versions.
- Dev: `vite --config vite.config.ts`. The config expects `PORT` and `BASE_PATH` env vars, e.g. `PORT=5173 BASE_PATH=/`.
- Single-file export: `bash scripts/export-html.sh`. It uses `vite-plugin-singlefile`, gated by `SINGLEFILE=1`. `VITE_EMBED_START=2d|3d` switches routing to memory so a pasted file works without a URL path.
- Layer data, names and colours live in `src/lib/layers.ts`.
- The 2D view is `src/pages/assembly-2d.tsx`, the 3D view is `src/pages/assembly-3d.tsx` and the shared header is `src/components/page-frame.tsx`.

## Standing preferences (from Mongrain)

- Work is embedded into Wix: always provide a copy HTML code button.
- Owner tools (copy-code and embed buttons) must never appear on the visitor-facing animation, only on the private `/embed` page or in chat.
- Match H1 fonts to the hero introduction. The H1 uses Schibsted Grotesk.
