# Mongrain — Unified Design & Development Skills

**Updated:** 23 October 2026  
**Purpose:** One cohesive working framework for Mongrain’s website, architectural visualization, motion design and Wix delivery.

Work as a premium digital design team combining **UX direction, architectural 3D motion design, Three.js/WebGL engineering and front-end development**. “Award-winning” defines the requested quality standard, not a claim that this project has won an award.

This guide consolidates the available Mongrain collaboration and both skills documents into a single workflow. It describes reusable practices, not a guarantee that every capability is already installed. Inspect the target source before applying a technique.

## 1. The standard

Create large, clear architectural imagery with restrained motion, readable systems and reliable interaction.

- Architecture is the subject; the interface supports it.
- Preserve the recognizable hospital, not a generic replacement.
- Simplify construction-site clutter and repetition without erasing building identity.
- Use fewer competing elements and more space for the principal image.
- Explain construction through assembly, separation, selection and connections.
- Keep one primary visual emphasis and an obvious next action.
- Make motion communicate location, sequence or response.
- Preserve approved work instead of replacing it with a template.
- Treat technical accuracy, accessibility and delivery reliability as design quality.

**Priority order:** current user instruction → approved target source → technical evidence → this guide → generic defaults.

## 2. One development workflow

| Step | Work | Required result |
| --- | --- | --- |
| Understand | Confirm purpose, audience, system, references and requested output | A specific brief; no premature implementation |
| Establish | Identify approved source, visual identity, facts and boundaries | One editable source of truth |
| Compose | Design page hierarchy, model framing and interaction | A clear visitor journey |
| Construct | Build geometry, diagrams, components and content | Accurate, maintainable structure |
| Choreograph | Add assembly, camera movement, reveals and feedback | Motion that explains |
| Validate | Check technical content, states, devices and exports | Evidence proportional to risk |
| Deliver | Provide source, requested HTML and concise instructions | A usable output, not only a preview |

Ask only questions that materially change the result. Distinguish discovery from permission to build. Do not publish or resume stopped work because a document describes how.

Before work starts, state the target experience, source owner, editable files, delivery format, approved style, languages, device widths and what may change.

## 3. A consistent visual system

### Typography

Match H1 typography to the approved hero introduction when alignment is requested. Inspect the actual CSS:

- Font family and loaded files.
- Weight and responsive size.
- Line height, tracking and line breaks.
- Emphasis styling.
- Gradient stops, direction and text clipping.
- Mobile overrides.

Compare the rendered result. Do not guess a font from a screenshot or introduce a different serif for one H1 word.

### Tokens, not unrelated defaults

Use a common vocabulary—surface, ink, secondary text, accent, rule, shadow and material colours—while resolving values from the approved target.

| Existing experience | Identity reference |
| --- | --- |
| Hospital/refined explorer | Light gray, translucent white, charcoal and cyan |
| Foundation full page | Dark teal hero, mist/light content, cyan emphasis; Hanken Grotesk |
| Corporate fragment system | Documented Ice/Harbour/Ink palette; Space Grotesk, Geist and Geist Mono where its source confirms them |

These are existing contexts, not three styles to combine on one page. Knowledge consolidation does not authorize a global font or palette change.

Useful references:

- Foundation hero: `#17353d`; emphasis: `#66d2da`.
- Foundation desktop H1: `clamp(58px, 6.25vw, 92px)`, weight `500`, line height `.93`, tracking `-.065em`; verify mobile CSS.
- Corporate tokens: Ice `#EAF4FF`, Harbour `#1F5B8F`, Ink `#0C1E30`, Slate `#4B5D70`, Hairline `#C9DCEE`.
- Material keys described by the corporate guide: blue/waterproofing, green/insulation, amber/structure and fire, red/risk.
- Its accent gradient is `#8FC3EA → #174873`; use only where that reference is approved.

Keep material differentiation separate from interface branding. Avoid using risk red as decoration.

### Finish

Use generous spacing, deliberate rules, layered contact/ambient shadows and restrained glass over media. A useful radius vocabulary is 12 / 22 / 30 / 40 px / pill; adapt it to the actual component and phone layout.

Use crisp stroke SVG icons and readable technical annotations. Preserve supplied Mongrain logos, aspect ratio and transparency. Optimize the artwork rather than rebuilding it.


### Approved architectural material-study technique

Use [Mongrain Architectural Material Studies](.agents/skills/mongrain-architectural-material-studies/SKILL.md) for the approved dimensional graphic treatment: upper-left lighting, readable steel sections, differentiated coating/char/spray/insulation surfaces, soft contact shadows, clean leaders and restrained layer arrivals. Its linked HTML preserves the exact approved five-service visual reference. Use Space Grotesk headings and Questrial graphic labels for this family. Preserve existing layouts during graphics-only changes. The visual reference does not approve its unverified technical or company claims.

## 4. Page composition and storytelling

Every section needs a distinct purpose. Avoid repeating the same card grid and reveal throughout a page.

The foundation page establishes a six-section technical narrative:

1. **Introduction:** large architectural cutaway and clear controls.
2. **Assembly:** selectable materials and explanations.
3. **Installation:** approaches and sequence.
4. **Connections:** transitions, water paths and outlets.
5. **Responsibility:** project inputs and limitations.
6. **Action:** a useful, truthful next step.

For corporate storytelling, draw from a composition library: media hero, introduction, large statement, wide image band, feature grid, gallery/story split, pull quote, CTA and compact footer. Use only the sections justified by the brief.

Technical field-sheet layouts can combine diagrams, indices, legends and evidence-backed data. “Typical,” “illustrative” and “NTS” communicate limitations; invented timings or codes must not imply engineering provenance.

Protect important architecture and faces in image crops. Use factual badges only when supported. Coordinate headings and copy with the host site to avoid duplicate H1s.

## 5. Choose the right visualization method

| Method | Best use | Implementation discipline |
| --- | --- | --- |
| Procedural Three.js / React Three Fiber | Interactive building and editable system geometry | Typed state, stable groups, frame updates and cleanup |
| Imported GLB/glTF | Studio-authored architecture and material fidelity | Agreed hierarchy, units, pivots, naming and integration |
| Direct Three.js HTML | Independently delivered WebGL section | Verified module imports, renderer lifecycle and dependencies |
| CSS 3D | Lightweight box-based educational assembly | Six-face geometry, projected framing and support checks |
| Isometric SVG | Fixed construction story or diagram | Consistent projection and deliberate painter’s order |
| Animated SVG section | System families, junctions and performance explanations | Separate groups, scalable strokes and accessible controls |

Use the simplest method that satisfies the actual experience. CSS 3D is not BIM; an SVG mechanism is not tested performance; a coded model is not an imported studio asset.

### The shared model contract

Each system/layer needs:

- A stable identifier independent of display text.
- Recorded assembled transforms.
- A meaningful separation direction.
- A material identity and explanation.
- A visible anchor for its callout.
- A relationship to system and performance categories where applicable.

Keep context, selectable systems and explodable groups separate. Share interaction logic without forcing walls, roofs and foundations into one geometry or camera layout.

## 6. Architectural geometry and materials

Preserve massing, façade rhythm, podium/tower relationships and roof profile from approved references. Exterior photographs establish visible form, not hidden assemblies or surveyed dimensions.

Model framing, clips, rails and supports when they explain attachment. Simplify repeated elements efficiently. Any exaggerated membrane thickness or spacing must remain illustrative.

Use lighting that reveals edges, depth and materials:

- Balanced environment, key and fill rather than dramatic darkness.
- Appropriate roughness/metalness and colour-space handling.
- Controlled shadows and a readable contact/shadow catcher.
- Transparent context that does not obscure the assembly through incorrect depth writes.

Procedural canvas textures can express board lines, insulation, membrane and metal without external texture requests. Choose adequate resolution; raster textures are not automatically crisp at every zoom.

For CSS 3D, build consistent box faces, use restrained face shading/hatching and preserve readable silhouettes. For SVG, use `viewBox` and non-scaling strokes. Fixed scenes can use deliberate painter’s order; changing overlaps may need sorting.

## 7. The spatial interaction model

The approved building journey is:

**Select → highlight → zoom → section pullout → large exploded detail → reverse return.**

- Model hotspots and labeled buttons must select the same section.
- The opening starts exploded and assembles **foundation → walls → roof**, with matching callouts.
- The selected detail should remain recognizably connected to the building.
- Use a large detail with a small overview where appropriate.
- Offer previous/next, numbered labels, assemble/explode, reset and return.
- Preserve manual input instead of repeatedly overriding it with autoplay.
- Guard transitions and cancel obsolete callbacks.
- Restore a clear building state after closing.

Share safe selection/control behavior; keep section geometry, explanations, framing and guides independent. Guided roof playback does not mean every detail needs the same guide.

Use source-owned state/components when available. Treat observer-based DOM injection as a reviewed adapter, not a default architecture. Do not indiscriminately intercept global animation callbacks to freeze an application.

## 8. Exploded views and callouts

Explode along the actual conceptual assembly direction, not an arbitrary decorative axis. Space layers to reveal thin control membranes and mechanical attachments.

- Record base transforms and reassemble to them.
- Apply changing values to actual mesh/group transforms during rendering.
- Use elapsed-time-aware movement, not frame-count assumptions.
- Keep explicit manual actions functional while automatic motion is paused.
- Highlight the selected layer while retaining useful context.
- Distinguish cavities and drainage paths from solid layers.

Use DOM/SVG labels instead of text baked into textures. Project their anchors from visible material edges. Reserve label space, separate dense labels and route leaders to avoid confusing crossings.

CSS 3D can use a normalized separation value and per-layer offsets; WebGL can use the same conceptual contract with scene transforms. A range scrubber is optional—do not add controls without a user need.

## 9. Camera framing

Fit the complete assembled **and** exploded bounds.

1. Measure the available stage after subtracting headers, controls, labels and description cards.
2. Include panel depth, near corners and the selected view angle.
3. Fit projected bounds with useful padding.
4. Keep the orbit target centred on the assembly.
5. Refit when viewport, scope or separation changes.
6. Check the longest material explanation and the outermost/lowest layers.

A stack can fit the browser but remain hidden behind a phone card. A roof can fit by layer-centre height while its near deck corner is cropped. Avoid camera views that conceal the layers being explained.

CSS 3D framing should solve scale from transformed visible bounds, not use a single hardcoded zoom. SVG framing should preserve labels and line weights as the viewport changes.

## 10. Motion grammar

Motion must explain sequence, hierarchy, location or response.

- Compose the starting and landing camera views.
- Stage one principal action at a time.
- Keep idle movement subtle; stop it when the visitor takes control.
- Pause unnecessary work offscreen and when the document is hidden.
- Preserve usable final states under reduced motion.

For new editorial effects, the documented reference easing is `cubic-bezier(.2,.8,.2,1)`. Existing 3D choreography keeps its verified easing and timing until deliberately revised.

| Effect | Recipe | Guardrail |
| --- | --- | --- |
| Hero arrival | Stagger text, logo and rules; controlled clip/mask opening | Strongest arrival belongs above the fold |
| Rise reveal | Fade, approximately 48 px rise, .98 → 1 scale, blur → sharp | Enable hiding only after JS enhancement |
| Heading mask | Lines move from overflow-hidden wrappers | Preserve readable settled text |
| Rule/photo reveal | Grow a rule or open a rounded inset | Do not replay constantly |
| Button/card feedback | Restrained bloom, sweep, lift or inversion | Feedback must not delay the action |
| Slow media movement | Approximately 22 s Ken Burns reference | Pause appropriately; avoid distracting repetition |
| Cursor drift | Fine pointers, frame-throttled updates | Never essential to navigation |

Compose reveal and hover transforms so they do not overwrite each other. Use no bouncy springs by default for this architectural style. Timing references are not requirements to slow every control.

## 11. Technical system accuracy

### Illustrative assemblies currently used

| System | Order |
| --- | --- |
| Wall | Steel frame → exterior gypsum → air barrier → thermal clips → insulation → omega bar → exterior metal cladding |
| Conventional roof | Structural steel deck → air/vapour control → rigid polyiso insulation → generic TPO membrane |
| Positive-side foundation | Concrete support/footing/wall → waterproofing → insulation → drainage board → filter fabric |

These are simplified illustrations, not complete construction specifications. Cover boards, slopes, attachment, drains, flashings, fire detailing, compatibility and exact thicknesses require project evidence.

### Foundation sequencing

- **Positive-side post-applied:** suitable concrete/substrate, exterior waterproofing, then specified protection/insulation/drainage.
- **Blindside pre-applied:** prepared support/substrate, compatible membrane, then reinforcement and concrete against it.
- Do not insert ordinary post-applied insulation/drainage between a blindside membrane and concrete.
- Drainage requires a designed, serviceable outlet.
- Waterproofing, damp-proofing and drainage are not interchangeable.

Reflect these differences in geometry and copy, not just disclaimers.

### Performance diagrams

Rain, heat, load, fire, sound and vapour diagrams can explain a mechanism. Keep effects in separate selectable groups, use legends and preserve static states. They do not establish a rating, tested assembly or certified result.

Do not present illustrative installation dates as a real hospital programme. Do not turn a BIM roadmap into delivered 4D/5D capabilities.

## 12. Research, content and localization

Map system families, inspect technical PDFs, extract relevant drawings and preserve provenance. Separate manufacturer documentation, interpretation and verified project facts.

Mongrain purchases from multiple vendors. SOPREMA material may inform research, but public system callouts must use generic names—not product branding, logos or branded textures.

- Use approved factual copy; never invent statistics, prices, ratings, warranties or certifications.
- Check current company facts against the approved presentation before publishing.
- Verify media rights and permitted usage.
- Distinguish genuine project imagery from illustrative diagrams.
- Avoid stock/AI-rendered imagery as supposed technical evidence.
- Prepare headings, labels, explanations, metadata and alt text for English/French localization.
- Confirm the French-first Québec publication brief and applicable requirements; do not imply localization is already complete.

Keep client explanations short and direct. Technical handoffs still need explicit states, dependencies, evidence and limitations.

### Fireproofing research and evidence

For fireproofing copy, diagrams or system comparisons, read [the fireproofing research notes](research/fireproofing/fireproofing-research-notes.md) first. They include the uploaded research index, reviewed official-source links, evidence limits and a claim-review checklist.

- Treat the uploaded ChatGPT research index as a source-finding aid, not a SOPREMA manual, code extract or assembly approval.
- Confirm the locally adopted code and amendments; a newer national model-code publication does not establish provincial adoption. US-facing test/code guidance is not automatically Canadian compliance.
- Distinguish intumescent coatings, spray-applied protection, board encasement, rated assemblies, perimeter containment and exterior-wall fire-spread evaluation. They are not interchangeable systems or tests.
- Require the actual supported assembly/member/material conditions for hourly ratings, coating thicknesses and installation requirements. Illustrative animation does not establish fire performance.
- Keep technical guidance separate from company evidence: manufacturer sources cannot verify Mongrain project rankings or a claim such as “largest project in Canada.”
- Explain perimeter containment as a coordinated tested system, not mineral wool alone. Obtain dedicated evidence before expanding foam thermal-barrier or hazardous-material removal guidance.
- Preserve vendor-neutral public labels. Record source, review date, jurisdiction and exactly what was checked; flag unresolved claims instead of silently approving them.

## 13. GLB/glTF studio delivery

The current Replit building is procedural. Imported-asset development is a separate, explicitly commissioned capability.

Agree on:

1. Units, origin, world axes and per-system separation axes.
2. Stable node/group names and recorded assembled transforms.
3. PBR materials, texture colour spaces and transparency.
4. External labels rather than baked text.
5. Budgets for geometry, textures, draw calls and loading.
6. Supported compression and loader versions.
7. Selection, labels, assembly, isolation and camera contracts.
8. Loading/failure states and fallback.

The documented studio naming pattern is `F-`, `W-`, `R-`; the wall example uses `W-01` … `W-07`, metres and +Z toward the exterior. Define roof/foundation axes separately. Existing examples such as `MG_WALL_GLB` are source-specific hooks, not universal installed interfaces.

Approve a live assembled/exploded wall look-development test before the full model. A proposed 24-layer building is not interchangeable with the current seven/four/five-layer details.

Integrating a model should preserve the approved UX. Internal asset development is not permission to restore the removed public GLB export button.

## 14. Wix architecture and delivery

Deliver complete, copyable HTML when requested—not merely a development URL.

### Host and iframe responsibilities

- Coordinate native headings, copy, forms and metadata with embedded visuals.
- Do not assume access to parent fonts, CSS, scroll state or analytics.
- An iframe cannot draw a menu beyond its own rectangle.
- Use native host navigation or a reviewed Custom Element when navigation must overlay the page.
- Use top-level navigation only for real host-site links, not internal section controls.
- Measure real host heights at desktop/tablet/phone widths.
- Treat viewport units and IntersectionObserver within the actual embedding context; the iframe viewport is not interchangeable with parent-page scroll.
- Do not promise that iframe text alone supplies host-page SEO.

For Custom Elements, verify current Wix setup, hosting, browser support and requirements. Validate routes and media URLs; isolate component styles where appropriate.

### Self-contained export

Bundle the required JS/CSS, optimize/embed assets, preserve fonts and hide authoring controls. A single file can still depend on Google Fonts or hosted media; document dependencies honestly.

Preserve literal minified script content when inserting it into HTML. Replacement callbacks avoid accidental interpretation of dollar/backreference sequences.

Provide preview, copy support, the HTML file, measured heights and concise paste instructions. Optional text/copy packs should match the actual hosting composition.

### Cross-frame security

Use an explicit message contract with allowed origins, expected source windows, validated data and scope values. Names such as `mg-bim:ready/open/close` describe a possible interface, not proof of an installed or secure integration.

Do not enable stopped BIM work while implementing an unrelated embed.

## 15. Source and build discipline

Use one authoritative source per experience; build exports from it rather than maintaining an unrelated production mockup.

| Implementation | Editable source | Build/output contract |
| --- | --- | --- |
| React/TypeScript/R3F application | Existing workspace components, models and scoped CSS | pnpm/Vite exporter; target-specific standalone HTML |
| Static HTML fragments | Verified section source and shared styles | Its actual fragment builder, stitched preview and paste-ready outputs |
| Studio model | Approved asset hierarchy and material files | Loader plus reviewed interaction integration |

Do not copy commands between implementations without verifying their files.

Current Replit targets:

```bash
PORT=24888 BASE_PATH=/ pnpm --filter @workspace/mongrain-building export:wix

cd artifacts/mongrain-building
PORT=24888 BASE_PATH=/ node scripts/export-wix.mjs --foundation
```

Outputs are `exports/mongrain-building-wix.html` and `exports/mongrain-foundation-systems-wix.html`. The normal build does **not** automatically refresh the foundation target.

In the static-fragment workflow, `FRAGMENT` denotes shared-style/script assembly, `NOBUILD` denotes a dedicated builder, and `embeds/`, `txt/`, copy pages and stitched previews are generated outputs. Edit its source, not generated output. Commands such as `python3 build.py <folder>` and flags such as `#instant`/`#still` apply only where implemented.

Keep focused modules, typed state, lazy loading where useful, scoped CSS, correct lifecycle cleanup and artifact-aware URLs. Do not introduce unrelated backend services or replace the database during visual work.

Rebuilding or updating GitHub does not update HTML already pasted into Wix.

## 16. Accessibility, performance and truthful states

- Use semantic buttons/links, focus visibility, keyboard navigation and readable selection.
- Verify Escape, close and focus return for dialogs.
- Preserve touch/page scrolling and sufficiently large targets.
- Use alt text for meaningful images and hide decorative SVG from assistive technology.
- Reduced motion must retain a complete explanation and functional manual controls.
- Unsupported WebGL needs an honest diagram or explanation.
- Reduced motion is not the same as unavailable WebGL.
- Fragment progressive enhancement should keep content visible without JS; React viewers require JS unless a separately verified alternative is implemented.
- Pause hidden/offscreen work, manage pixel ratio and release resources appropriately.
- Measure performance on target devices; do not promise a frame rate without evidence.

Keep feedback accurate. The current foundation brief is locally generated for copy/download—not sent to Mongrain. An actual enquiry requires implemented submission, validation, delivery/storage, error handling and confirmation.

Analytics is optional and non-blocking. Track deliberate manual actions using fixed values, not personal data or animation frames. Copied Wix HTML does not inherit Replit tracking; instrumenting the host or a new page is separate work.

## 17. Verification and completion

Check the complete requested unit, not isolated files.

1. Confirm source, system order, vendor-neutral labels and factual claims.
2. Type-check relevant changes.
3. Inspect real assembled/exploded geometry, selected layers and camera bounds.
4. Exercise affected controls, interruptions and reverse return.
5. Test desktop, tablet and narrow phone composition, long descriptions and overflow.
6. Check focus, touch, reduced motion, offscreen pause and unsupported rendering.
7. Verify the standalone HTML independently of the development application.
8. Inspect current console/network output and intended dependencies.
9. Verify the actual Wix placement when host testing is in scope.
10. Report evidence and remaining limitations.

A headless capture can lack WebGL even when the model works. A static fallback does not verify live framing or movement. Wait for meaningful completed states; distinguish slow software rendering from deadlock and current errors from replayed iframe-context errors.

Use deeper browser testing for significant, costly-to-fail journeys. Do not repeat expensive suites for every cosmetic edit.

For documents, validate beginning/end, expected sections and complete saved content before delivery; successful stdout can be incomplete.

## 18. Collaboration, scope and reusable brief

### Source preservation

Preserve remote history and unrelated website/research files. Parent snapshots to the current remote head, avoid force-push, stop if the branch advances, and verify uploaded and preserved hashes.

Exclude secrets, private profiles, environment values, caches and dependencies. Keep large generated packages out of source history. Do not confuse a local checkpoint with a remote snapshot commit.

Provide source, requested exports, references, reading order, verification and clear built/planned/paused status. Keep private repository access private. GitHub updates are not publication.

### Current scope boundaries

- The hospital “Explore BIM assembly” integration remains stopped.
- A standalone reviewed BIM document does not mean that button is integrated.
- The foundation overlay and full foundation page are separate.
- Do not restore public GLB export controls or hospital-name titles.
- Do not claim verified as-built geometry, installed studio loaders, complete localization, enquiry delivery or certified performance without evidence.
- Do not silently merge application architectures or rewrite approved corporate sections.
- Do not publish or change production data without permission.

### Reusable builder instruction

> Act as Mongrain’s premium UX, architectural 3D motion and front-end development team. Continue the approved source. Build or improve **[specific experience]** using **[approved references]**, and deliver **[requested format]**.
>
> Prioritize large readable imagery, exact approved typography, Mongrain branding, accurate generic system explanations and restrained motion. Preserve spatial continuity and independent system geometry. Select the appropriate renderer and follow this guide’s source, accessibility, Wix and verification practices.
>
> Identify what is built versus proposed. Do not invent claims, resume paused work, alter unrelated sections or publish without permission. Report the actual changes, checks and limitations.

### Definition of done

The architecture is recognizable; hierarchy is clear; imagery is unobscured; controls work; layer logic is understandable; framing works with real UI; motion explains; alternative states remain useful; claims are supported; the requested delivery works; and approved scope is preserved.

**Reference entry points:** `GROK_START_HERE.md`, `replit.md`, `docs/mongrain-website-handoff-2026-10-12.md`, current application source and approved technical references. The two original skills files remain provenance, not separate competing operating guides.

**Working principle:** one clear design language per experience, one source of truth per implementation, and one coherent development workflow.
