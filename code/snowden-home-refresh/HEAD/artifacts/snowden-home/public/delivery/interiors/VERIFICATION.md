# Interior delivery verification

Checked October 26, 2026. These results concern local previews and exported
content, not changes to the live Wix pages.

## Passed

- Workspace `pnpm run typecheck`.
- Shared-source Home and interior export generation.
- `check:interiors`: all eight routes and 32 section files, preview/live link
  separation, unique metadata, one preview H1, H1 demotion for native Wix
  ownership, no visitor owner controls, no old `/home-1…` destinations,
  section/full-export content parity and all 50 keyword seeds.
- Empty media behavior and a populated photo/video/captions inventory fixture;
  invalid empty media sources reject explicitly.
- Vite production build with the required build-only PORT/BASE_PATH values.
  Vite emitted an existing tooltip sourcemap warning but completed.
- Browser checks of all eight preview routes and all eight full-page standalone
  outputs at 1440×1000, 820×1180 and 390×844: no horizontal overflow.
- Page-specific title/descriptions, a main H1, readable content and preview
  footer; portfolio images loaded as the page was scrolled.
- Metallic menu opening, Escape closing/returning focus, visible keyboard
  outline, single-tap touch navigation to the local Work route.
- Reduced-motion sampled animation/transition durations were zero.
- SEO question disclosure, Contact seated portrait/email/telephone/no fake
  form, media empty note/no pretend play controls.
- Work Introduction Copy control reported successful copying. Downloaded
  source files were checked independently for visitor-only markup and live links.
- Every live Wix destination returned HTTP 200 at its expected canonical host.

## Corrections during verification

- Strengthened normal-size interior text on stone to meet 4.5:1 contrast.
  Small green link/status text on stone uses ink; large green headings retain
  the approved primary green.
- Interior keyboard focus uses ink against cream/stone. Owner toolbar labels
  use cream on green and ink on orange.
- Removed the empty numbering column from the shared Home photography layout.

These narrow CSS corrections were confirmed through source/contrast checks and
regenerated exports rather than a second full browser run.

## Limits and Wix-only checks

- MONGRAIN's original viewer loaded its explicit “The 3D view could not start”
  WebGL fallback in the test browser. Model rendering, rotation and assembly
  controls need a WebGL-capable device; no model-rendering claim is made here.
- The browser directly opened two individual section exports and one setup
  document; all 32 section files and setup/copy files were checked by the
  repeatable export consistency checks, not individually clicked.
- Copy success was observed, but the browser did not inspect the clipboard
  payload. Shared-source file parity was checked independently.
- The Home header-study iframe remains a separate illustrative preview; closing
  the actual site menu does not close that study. A touch capture caught tiles
  during the intentional rollout, not a verified persistent overlap.
- Reflective labels retain opaque ink above the highlights. No exhaustive
  frame-by-frame contrast test or cross-browser/device certification was run.
- Native form recipients, actual form delivery, iframe heights, native heading
  structure, legal links, parent-page metadata/schema/indexing, social crops,
  final media permissions and Core Web Vitals must be checked in Wix. No live
  edits, publication, external messages or search-performance measurements
  were performed.
