# WoodTek HQ — reusable GLB model study

This review build translates the supplied exterior photographs, ground and fourth-floor plans, roof plan, building/stair sections, and envelope details into a named-node architectural model. It preserves the visible composition: a narrow four-level amber-clad volume, upper recessed terraces, glazed street-level frontage, basement plinth, and roof stair penthouse.

## Deliverables

- `woodtek-hq.glb` — reusable GLB 2.0 asset, metres, Y-up, photographed front elevation toward +Z.
- `index.html` — standalone Three.js viewer with orbit/zoom, level explode/assemble, named-component selection, structural/envelope/glazing isolation, reduced-motion behavior, and a static elevation fallback.
- `build_model.py` — dependency-free source that rebuilds the GLB.
- `asset-contract.json` — coordinate, naming, material, and interaction contract for a future Revit/Three.js handoff.

## Run locally

Serve this folder over HTTP; opening `index.html` directly from `file://` will block the model fetch in most browsers.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` from this folder. To rebuild the model:

```bash
python3 build_model.py
```

The viewer imports Three.js 0.170.0 modules from jsDelivr. The GLB itself has no external texture dependencies.

## Model limits

The source drawings are labeled 1:100 but the supplied image set does not expose verified building dimensions. The model uses estimated proportions to create a reviewable architectural massing study. It is not a surveyed, dimensionally verified, permit, structural, or construction BIM model. Hidden wall and roof build-ups are not inferred from detail sheets; those details guide the envelope vocabulary only. Explode offsets are explanatory and are not construction clearances.

The asset hierarchy, parts, materials, and viewer controls are prepared for look-development review. Confirm overall proportions, façade rhythm, and material treatment before treating this study as the approved production model.
