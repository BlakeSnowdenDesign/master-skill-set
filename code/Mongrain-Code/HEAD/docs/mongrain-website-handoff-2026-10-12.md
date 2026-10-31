# MONGRAIN — WEBSITE BUILD HANDOFF

## Prepared for Grok AI · 12 October 2026

This is a handoff of the actual current workspace, not a proposal for a new build. The source-code package accompanying this document is the implementation authority. The latest application checkpoint inspected was `7b2c112` on the local `main` branch. The foundation page was developed on 9 October; this handoff and refreshed Wix exports were prepared on 12 October.

**Important distinctions**

- The hospital explorer is an interactive application at `/`.
- The new six-section foundation systems page is a separate route at `/foundation-systems`.
- Wall, roof and foundation details also exist *inside* the hospital explorer. These overlays are not the same thing as the new full foundation page.
- The existing reviewed BIM animation is a separate HTML export. The requested hospital “Explore BIM assembly” integration was stopped by the user and must not be resumed without a new instruction.
- These are illustrative architectural models, not verified/as-built hospital BIM or construction specifications.
- No secrets, credentials, database contents, private user profile or conversation history are included.

## 1. Executive summary

Mongrain wants a high-quality architectural website experience with large, clean 3D imagery, restrained motion, readable layered assemblies and simple interactions. A recognizable representation of the hospital is the central envelope explorer. Visitors can rotate the building, select a foundation/wall/roof section, see that section pull away from the building and enter a larger exploded detail.

The latest addition is a six-section foundation systems page with its own interactive foundation cutaway, waterproofing approach comparison, coordination details and locally generated project enquiry brief.

The principal delivery requirement is **complete HTML that can be copied into a Wix HTML iframe embed**, not merely a development URL. Both the hospital and foundation-page standalone exports have been regenerated from the current source for this handoff.

### Delivered and present in the inspected source

- Recognizable hospital massing and façade rhythm, built with procedural Three.js geometry.
- Exploded opening and assembly with foundation → walls → roof system callouts.
- Building rotation and section selection through model zones and labeled controls.
- Wall, conventional roof and foundation detail components.
- Shared interaction utilities with separate geometry/layouts for each assembly.
- Roof/foundation pullout and transition machinery.
- Author-only Copy HTML for Wix control on the hospital application.
- Safe optional exploration analytics in the hospital/detail flows.
- Six-section foundation page, including working assemble/explode and rotation controls.
- Positive-side versus blindside sequences and model variations.
- Reduced-motion handling, unsupported-WebGL explanations and static foundation diagram.
- Local enquiry brief copy/download; it does not submit to Mongrain.
- Standalone exports and a canvas preview wrapper for the foundation page.

### Not delivered / not to be assumed

- A working hospital “Explore BIM assembly” integration.
- A real email/contact submission service for foundation enquiries.
- Verified hospital waterproofing specifications, performance ratings or hidden assemblies.
- A production GLB/glTF asset pipeline or public model export button.
- Automatic analytics collection inside copied Wix HTML.
- A verified latest production URL or confirmation that the newest foundation page is published.
- Confirmation that the latest foundation source has been pushed to GitHub.
- A completed six-section wall or roof website page matching the new foundation page.

## 2. Product and design rules

### Non-negotiable user direction

1. Treat the work as an architectural digital design and motion project: larger imagery, cleaner composition, better UX and better exploded views.
2. Use a recognizable version of the supplied hospital, not a generic invented building.
3. Remove the actual hospital name from public-facing animation titles. Internal references may identify it.
4. Use the supplied Mongrain logos where appropriate.
5. **Use generic system types only.** Mongrain buys systems from multiple vendors. Do not put SOPREMA product names, logos or branded textures into public animations.
6. Manufacturer drawings can inform research; they are not proof of the hospital’s actual assemblies.
7. Preserve the approved wall journey: click → zoom into hospital section → pull/explode section → transition to detailed layers → reverse return to the building.
8. Apply that journey to roof and foundation without normalizing their distinct geometry into the wall model.
9. Keep public controls free of GLB export buttons.
10. Deliver copyable, complete Wix HTML.
11. Match H1 typography to the established hero introduction. Do not introduce a different serif font for just one word of the foundation H1.
12. Do not restart the paused BIM integration simply because an old task or export exists.

### Visual identity

The hospital and refined explorer interfaces use light gray, translucent white, charcoal and cyan. Keep distinct material colors in the model; material differentiation is not the same thing as interface branding.

The new foundation page uses a dark teal architectural hero, mist/light content surfaces and cyan emphasis. Its actual scoped styles are the authority for exact values.

- Main UI family: Hanken Grotesk.
- Foundation H1: Hanken Grotesk throughout.
- Editorial secondary accents: Instrument Serif.
- Technical labels: DM Mono.
- Hospital background reference: approximately `#E8EBEC`.
- Hospital accent reference: approximately `#12B5D1`.
- Foundation hero reference: `#17353d`.
- Primary supplied logo: `artifacts/mongrain-building/public/assets/logo-cyan.png`.

Some older standalone HTML files have their own typography. Do not globally replace those styles without comparing the relevant approved reference.

## 3. Application and delivery inventory

| Experience | Current location | Status / meaning |
| --- | --- | --- |
| Hospital Envelope Explorer | `/` | Main live React application; existing experience retained |
| Wall exploded detail | Hospital overlay | Seven-layer illustrative wall assembly |
| Conventional roof detail | Hospital overlay | Four-layer illustrative conventional roof with guided narration |
| Foundation detail | Hospital overlay | Five-layer illustrative foundation detail |
| Foundation Systems full page | `/foundation-systems` | New six-section experience; separate from the overlay |
| Refined envelope explorer | `exports/mongrain-envelope-refined.html` | Standalone legacy/refined animation export |
| Envelope assembly color update | `exports/mongrain-envelope-assembly-hospital-colors.html` | Separate standalone HTML export |
| Reviewed BIM assembly | `exports/mongrain-bim-assembly-reviewed.html` | Preferred reviewed standalone BIM file; not integrated into hospital |
| Earlier BIM color/logo version | `exports/mongrain-bim-section-hospital-colors-logo.html` | Historical variant; do not treat as the reviewed authority |
| Foundation canvas preview | Mockup sandbox wrapper | Embeds the actual foundation export, not a second implementation |

The full foundation page currently includes a return link to the explorer in normal application mode. That link is omitted in the standalone Wix version. Its logo is non-navigating in Wix mode.

The hospital foundation control opens the existing detail overlay; the new full-page route does not silently replace that behavior. A future site-wide navigation decision is separate work.

## 4. Latest foundation-page update in detail

### Exactly six sections

1. **Architectural introduction** — large foundation cutaway, orbit/zoom, assemble/explode, rotate, pause and reset controls.
2. **Assembly / layers** — five selectable layer labels and technical explanations.
3. **Installation logic** — positive-side post-applied versus blindside pre-applied waterproofing, with different sequence descriptions and diagrams.
4. **Critical connections** — drainage path and outlet, footing transition, hydrostatic design considerations.
5. **Design responsibility** — groundwater/geotechnical inputs, structural coordination, compatibility, drainage and detailing caveats.
6. **Project enquiry brief** — select topics and copy/download a text brief locally.

Section labels were aligned to `01 / 06` through `06 / 06`. A decorative, unverified duration label was removed.

### Technical differences between system approaches

**Positive-side:** concrete placement and suitable substrate preparation precede exterior sheet/fluid waterproofing. Protection, insulation and drainage follow as specified.

**Blindside:** prepare the substrate/support, secure a compatible pre-applied membrane, then place reinforcement and concrete against it. Do not insert ordinary post-applied insulation/drainage layers between the membrane and concrete.

The blindside model omits the positive-side insulation/drainage/filter layers and shows the substrate beyond the membrane. Drainage/collector arrangements remain project-specific.

Waterproofing is not interchangeable with damp-proofing or drainage. Drainage requires a designed, serviceable outlet. Hydrostatic capacity, structural loads and exact material thicknesses are not established by this visualization.

### Important implementation fixes already applied

- Layer group references are updated during each animation frame. Merely changing a React ref value without applying it to mesh/group positions was insufficient.
- Layer spacing uses elapsed-time interpolation during normal motion.
- Manual assembly and rotation changes apply immediately under reduced-motion/pause conditions rather than becoming unusable.
- Ground/soil context was moved beside the cutaway so it does not cover the assembly.
- Transparent context does not write depth in a way that obscures the layers.
- Camera/orbit target is centered on the foundation assembly.
- The white model panel no longer overlaps the white desktop H1.
- Automatic motion pauses when the model is offscreen or the document is hidden.
- Foundation-specific document title, description, Open Graph and Twitter metadata are set/restored by the page.
- The standalone export contains foundation-specific static metadata.
- Enquiry success text explicitly says the brief was created locally and was not sent.

### New / changed source files

| File | Responsibility |
| --- | --- |
| `src/components/foundation/FoundationSystemsPage.tsx` | Six-section page, mode/layer state, navigation, metadata, local brief |
| `src/components/foundation/FoundationSystemsModel.tsx` | Procedural R3F cutaway, layer positioning, soil context, drain/outlet and controls |
| `src/components/foundation/foundation-systems.css` | Scoped layout, typography, responsive rules, reveals and page styling |
| `src/App.tsx` | Lazy `/foundation-systems` route and export override |
| `scripts/export-wix.mjs` | New `--foundation` target and foundation-specific metadata/output paths |
| `artifacts/mockup-sandbox/src/components/mockups/mongrain-foundation/FoundationSystems.tsx` | Canvas wrapper around the actual standalone export |

Paths in the first five rows are relative to `artifacts/mongrain-building/`.

## 5. Hospital, wall, roof and foundation implementation

### Navigation and state

`Explorer.tsx` owns section selection, introductory assembly callouts, detail opening/closing, transition tokens and error recovery. Selection is guarded while a transition is active. A stale completion callback must not open the wrong section.

`Scene.tsx` and `Envelope.tsx` render the recognizable building and envelope zones. `lib/spec.ts` holds simplified building/zone configuration. These are proportional interpretations of photographs and renderings, not surveyed BIM dimensions.

Detail views are loaded lazily. Each keeps a distinct canvas/model/layout while sharing suitable interaction and projection helpers.

### Illustrative layer definitions

**Wall, interior → exterior:**

1. Steel frame
2. Exterior gypsum
3. Air barrier
4. Thermal clips
5. Insulation
6. Omega bar
7. Metal cladding

**Conventional roof, structure → exterior:**

1. Structural steel deck
2. Air / vapour control layer
3. Rigid polyiso insulation
4. Generic TPO waterproofing membrane

This is a simplified conventional roof, with waterproofing above the insulation. The supplied reference does not establish the hospital’s actual roof. Cover boards, attachment, fire performance, slope, drains, flashings and compatibility require project review.

**Foundation, structure → exterior:**

1. Structural support: reinforced concrete footing and wall
2. Waterproofing
3. Insulation
4. Drainage board
5. Filter fabric

The drainage void is a cavity/path, not an additional solid material. These five items describe the existing positive-side illustrative detail; do not apply that order to every blindside condition.

### Main source map

- `src/components/Explorer.tsx` — overall hospital UI and detail lifecycle.
- `src/components/Scene.tsx` — building scene and camera behavior.
- `src/components/Envelope.tsx` — envelope geometry/zone interactions.
- `src/components/CopyWixHtml.tsx` — hospital authoring export control.
- `src/components/wall/` — wall model, canvas, detail and small building overview.
- `src/components/roof/` — roof model, canvas, locator, detail and guide.
- `src/components/foundation/` — existing foundation overlay plus new full foundation page.
- `src/components/pullout/` — roof/foundation section pullouts and transition helpers.
- `src/components/detail/` — shared selection, stepping and projection utilities.
- `src/lib/wallLayers.ts`, `src/lib/roofLayers.ts`, `src/components/foundation/layers.ts` — layer definitions.
- `src/lib/analytics.ts` — safe optional event adapter.
- `src/lib/materials.ts` — material/asset helpers.
- `src/index.css` — shared design tokens and base styling.
- `src/styles/refined-hospital-palette.css` — refined palette styling reference.

All these paths are relative to `artifacts/mongrain-building/`.

## 6. Code package and AI reading order

The accompanying package contains:

- This handoff as Markdown, HTML and PDF.
- `GROK_START_HERE.md` — concise context-transfer prompt.
- `CODE_FOR_GROK.md` — consolidated, path-labeled code/configuration appendix.
- `source/` — current application, API, sandbox, shared libraries, scripts and root build configuration with original relative paths.
- `source/exports/` — all seven existing standalone HTML exports.
- `references/soprema/` — the three research/report files requested earlier.
- Available selected project reference PDFs/images, where present.
- `LATEST_SOURCE_CHANGES.patch` — focused foundation-update diff against the preceding local checkpoint, excluding generated HTML and private agent files.
- `FILE_MANIFEST.json` — file lengths and SHA-256 hashes.
- `VERIFICATION.md` — current checks and historical verification boundary.

The code appendix omits binary assets, lockfile bulk and duplicated compiled HTML so that it is more practical to read in an AI context window. Their exact files remain in the package.

**Recommended reading order:** this document → Grok prompt → App and Explorer → foundation page/model/styles → detail/transition/layer definitions → exporter → analytics/tests → full source as needed.

If the Grok interface cannot unpack ZIP files, extract the package locally and upload the handoff plus `CODE_FOR_GROK.md`, then individual files for the requested change. Do not assume every AI interface accepts every file size/type.

## 7. Runtime, dependencies and local commands

### Inspected versions

- Node.js: `24.13.0`
- pnpm: `10.26.1`
- TypeScript: `5.9.3`
- React: `19.1.0`
- Vite: `7.3.6`
- React Three Fiber: `9.8.1`
- Drei: `10.7.9`
- Framer Motion: `12.43.0`
- Three.js package declaration: `^0.186.1`; resolve the exact installed version from the lockfile.
- Wouter: see package/lockfile for the pinned version.

Use pnpm. The root preinstall script intentionally rejects npm/yarn installation.

### Install and run the main browser app

```sh
pnpm install --frozen-lockfile
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building run dev
```

Open `/` for the hospital explorer or `/foundation-systems` for the full foundation page.

The actual web artifact descriptor uses port **24888**, base/preview path `/`, static production output `dist/public`, and an SPA rewrite to `index.html`.

### API and sandbox

```sh
PORT=8080 pnpm --filter @workspace/api-server run dev
PORT=8081 BASE_PATH=/__mockup pnpm --filter @workspace/mockup-sandbox run dev
```

The API artifact is mounted at `/api`; its startup health endpoint is `/api/healthz`. The API is currently primarily template/scaffold infrastructure; the foundation enquiry brief is not sent to it.

**Documentation discrepancy:** `replit.md` still mentions API port 5000. The inspected API descriptor and running configuration use **8080**. Follow the descriptor, not that stale sentence.

Shared API packages use OpenAPI/Orval, Zod, Express and PostgreSQL/Drizzle scaffolding. The browser models are client-side and do not constitute stored BIM/project records. Do not migrate or replace an existing database as part of visual work.

Use environment-variable names and placeholders only in shared instructions. No database URL, session secret, connector token or other credential is supplied in this handoff.

## 8. Wix export workflow

### Hospital export

```sh
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building run export:wix
```

Outputs:

- `exports/mongrain-building-wix.html`
- `artifacts/mongrain-building/public/wix-embed.html`

### Full foundation-page export

Run from the workspace root:

```sh
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building exec node scripts/export-wix.mjs --foundation
```

Or run `node scripts/export-wix.mjs --foundation` from the app directory with the same environment.

Outputs:

- `exports/mongrain-foundation-systems-wix.html`
- `artifacts/mongrain-building/public/foundation-systems-wix.html`

The new foundation target is a CLI flag; there is no separately named `export:foundation` package script at this snapshot.

### How it works

The exporter uses Vite with in-memory output, a single JavaScript bundle, inline styles and embedded optimized PNG assets converted to WebP. **ImageMagick `magick` must be available.**

- `__EMBEDDED_ASSETS__` supplies image data URLs.
- `__WIX_EMBED__` hides authoring and inappropriate navigation controls.
- `__FOUNDATION_PAGE__` forces the foundation page independently of iframe pathname.
- Dynamic imports are bundled inline.
- External bundle scripts/modulepreload references are removed.
- Google Fonts remain remote; there are no external application JS/image assets required by these exports.
- HTML replacement uses callbacks when inserting minified JS/CSS, avoiding corruption from replacement-string tokens.

Copy the **entire** selected HTML file into a Wix HTML embed. Do not paste only its canvas or body markup. Use the foundation file for the full foundation page and the building file for the hospital animation.

The foundation page scrolls within its own page container. Confirm actual iframe size, scrolling, clipboard and download permissions on the target Wix page. A standalone browser check is not proof of every Wix configuration.

The normal app build regenerates the hospital export and builds the SPA. **It does not automatically regenerate the foundation export.** After foundation edits, run the explicit foundation command too.

Refresh the canvas preview copy after rebuilding foundation HTML:

```sh
cp exports/mongrain-foundation-systems-wix.html artifacts/mockup-sandbox/public/images/mongrain-foundation-systems-wix.html
```

## 9. Analytics, data and contact boundaries

The hospital/detail code uses optional `window.replitAnalytics.track` forwarding through a safe adapter. Absence of a tracker, blocked access, synchronous exceptions or rejected promises must not stop the controls.

Current event names:

- `envelope_section_selected`
- `envelope_layer_selected`
- `envelope_assembly_toggled`
- `envelope_building_returned`

Allowed properties are fixed section identifiers, one-based layer numbers, selection method and action. Do not send names, email addresses, free-form text, URLs or secrets.

Intro assembly, hover, replay and automatic guide steps are not manual exploration events. Error recovery is not a visitor return event. Events before tracker loading are not buffered.

Copied Wix HTML does **not** automatically inherit the hosting page’s or Replit deployment’s analytics. No separate Wix tracker has been installed by this work. See `artifacts/mongrain-building/ANALYTICS.md`.

The new full foundation page does not currently add its own custom analytics instrumentation.

Enquiry briefs are client-generated text files with blank project fields. They can include selected topics and system approach. Copy/download feedback must say the brief is local and **not sent**. A future submission flow needs a verified recipient, appropriate privacy information, server validation, spam protection and real delivery confirmation.

## 10. Research and reference material

Three SOPREMA research deliverables are included as reference material:

1. `Mongrain-SOPREMA-wall-systems-analysis.html`
2. `Mongrain-SOPREMA-wall-systems-analysis.pdf`
3. `SOPREMA-wall-technical-drawings.pdf`

They were previously shared to the private GitHub research folder. Manufacturer names and drawing copyrights are retained in research. **That does not authorize adding vendor brands to the public animation.**

Research originated from the SOPREMA Canadian wall-systems catalogue:

https://www.soprema.ca/en/products-systems/building-components/walls/all-walls-systems

Other supplied references include hospital photographs/renderings, the seven-layer wall image, a roofing reference PDF, uploaded Mongrain logos, exterior-image/video references and the Proment rotation/highlight example. The Proment example is interaction inspiration, not a graphic to copy.

Only available selected reference files are packaged; this is not a complete historical upload/media archive. Raw videos, duplicated Apple Pages documents and internal extracted-image caches are excluded. Missing originals must not be recreated and represented as authentic.

## 11. Verification and limitations

### Fresh checks on 12 October 2026

All passed:

```sh
pnpm run typecheck
pnpm --filter @workspace/mongrain-building test:analytics
pnpm --filter @workspace/mongrain-building typecheck:regression
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building export:wix
```

The explicit foundation export also built successfully. The analytics test reports one passing Node test with no live analytics sent.

### Previous foundation verification on 9 October 2026

- Desktop and phone layouts inspected.
- Software-rendered WebGL scene rendered without page errors.
- Exploded and assembled geometry visually compared.
- Blindside approach selection checked.
- Downloaded brief reflected blindside mode and explicitly stated it was not sent.
- Six actual section elements counted.

These are historical verification observations, not a newly executed full browser regression suite on 12 October. Existing browser test files are included; the full Playwright suite was not rerun for this document request.

### Important limitations to preserve and review

- Standard screenshot browsers can lack WebGL and show the static fallback. This does not prove the actual 3D scene is broken, nor does it validate its geometry.
- For real model verification, use the established software-rendering Chromium settings and real elapsed loading time.
- Compare assembled/exploded meshes, not only button text.
- Isolate test optimizer caches and use one software-rendered scene worker to avoid misleading WebGL failures.
- Frame the full exploded stack at phone widths and anchor leaders on visible edges.
- Keep guide timing owned by the roof detail, not duplicated in shared helper effects.
- SPA foundation metadata updates on the client. The standalone foundation HTML has dedicated static tags; do not claim the SPA has complete server-rendered SEO/social previews.
- Normal route fallback currently returns the hospital explorer for other paths.
- A successful local brief download is not a successful lead submission.
- No manufacturer compliance, fire rating, R-value, hydrostatic rating or installation certification has been verified for the hospital.

## 12. Outstanding work and paused scope

The following are last-known planning items, not a live task-board audit. Inspect current status before starting or duplicating work.

- Dedicated foundation enquiries delivered to a verified Mongrain destination: proposed, not implemented.
- Regression protection for the new foundation page controls and Wix iframe behavior: proposed, not implemented.
- Layer-definition drift checks for assembly changes: previously pending.
- Roof guide timing regression coverage: previously pending.
- Wall-to-roof/foundation connection storytelling: previously pending.
- Published analytics delivery checks and separate Wix analytics configuration: not confirmed completed.
- Browser/WebGL recovery coverage: previously proposed.
- Roof/foundation direct-navigation work had been marked implemented in planning; do not assume every isolated task has merged solely from that label. Current source already contains the detail and pullout machinery; compare any pending changes against it.
- **Hospital BIM integration: stopped at the user’s request.** Do not start it from an old queued instruction.

No new work from this list was started to prepare the handoff.

## 13. GitHub and source-control guidance

Private repository:

https://github.com/BlakeSnowdenDesign/Mongrain-Code

Research folder:

https://github.com/BlakeSnowdenDesign/Mongrain-Code/tree/main/research/soprema

The prior GitHub synchronization used a history-preserving connector snapshot, not a force-push of local Replit checkpoints. Remote website history and local workspace checkpoint history are distinct.

**Do not assume `7b2c112` is a GitHub commit or that the remote already contains this foundation page.** The current package is a direct snapshot of the local source and refreshed exports. No GitHub upload was performed for this handoff request.

Before writing remotely: inspect the current branch, compare files/history, preserve existing website files and research, then make an ordinary non-destructive update. Never force-push to reconcile unrelated local/remote history.

## 14. Recommended first action for Grok

Read the source package and acknowledge the distinction between:

1. Hospital explorer and its overlays.
2. New full foundation page.
3. Standalone legacy/refined/BIM HTML files.
4. Reference research.
5. Stopped/proposed work.

Then ask what the user wants changed next. Do not redesign or restart the project merely because this context was uploaded.

For any requested change, preserve the approved experience, make a focused implementation, regenerate affected Wix exports, check types and verify the changed interaction. Do not claim GitHub sync, publication, enquiry delivery or technical building compliance without evidence.
