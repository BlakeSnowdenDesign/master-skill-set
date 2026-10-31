# Wall and Wix regression checks

Run from the workspace root:

```sh
pnpm --filter @workspace/mongrain-building test:regression
pnpm --filter @workspace/mongrain-building typecheck:regression
```

The runner starts its own app on port 5190, regenerates the actual Wix deliverable,
and serves only `exports/mongrain-building-wix.html` on a separate origin (5191).
Both projects execute the same wall flows. Third-party requests are blocked:
external fonts are optional, but models, scripts, styles and images must load
independently. No API server or database is required.
The test server uses a separate Vite dependency cache from the live preview,
so opening or restarting the preview cannot invalidate test imports.
The standalone project also exercises a sandboxed iframe host, matching the
embedded use case rather than only testing the exported page as a top-level tab.

Chromium uses ANGLE/SwiftShader software WebGL. Replit's supplied Chromium is
auto-detected. On other machines run `pnpm exec playwright install chromium`
in this artifact directory, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.
ImageMagick (`magick`) is required by the existing Wix exporter.

The suite fails rather than skips when WebGL cannot start. It covers actual mesh
clicks (not mocked selection), seven independent label expectations, Previous/
Next and arrow-key wraparound, projected geometry changes on explosion,
Back/Escape, focus trapping/restoration, mobile bounds, reduced and normal motion,
and building actions after detail teardown. Canvas clicks use the default home
camera: intentional camera/massing changes may require updating the documented
click coordinate, not replacing mesh tests with handler calls.

Failures save screenshots and traces in `test-results`; open the HTML report with
`pnpm --filter @workspace/mongrain-building test:regression:report`.
