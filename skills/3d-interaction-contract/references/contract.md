# Proposed contract and checks

Adapted example from U04's prose; newly authored here, not recovered repository code.

```js
const layer = {
  id: "illustrative-wall-layer",
  assembled: { position: [0, 0, 0], rotation: [0, 0, 0] },
  separationDirection: [1, 0, 0],
  calloutAnchor: [0, 0.5, 0],
  label: "Illustrative wall layer",
  evidence: "Source and approval required"
};
```

Before implementation, specify coordinate units, axis convention, pivot, material budget, hierarchy and approved model source. Do not infer a GLB/glTF contract from this placeholder.

| State change | Recommended check |
|---|---|
| Select during transition | Older callbacks cannot restore the wrong selection |
| Explode/return/reset | Recorded assembled transforms restore predictably |
| Manual selection during autoplay | Autoplay stops rather than taking control back |
| Narrow phone with longest card | Geometry, close/reset and labels remain visible |
| Reduced motion | Same content/actions without a long camera/assembly sequence |
| Unsupported WebGL | Explicit static explanation; not proof live rendering works |

Suggested technical labels must remain vendor-neutral where requested and distinguish illustrative research from installed assemblies. No browser/state-machine tests were run for this proposal.

Primary retrieval leads: MONGRAIN master guide and website handoff in [reported inventory](../../../REPOSITORY-INVENTORY.md). Underlying revisions unavailable.
