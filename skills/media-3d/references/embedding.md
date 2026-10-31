# Narrow adapters and deferred media

S12 checks this known hook in a generated viewer copy:

```js
const hook = "()=>location.pathname";
if (!viewerSource.includes(hook)) {
  throw new Error("Recheck the viewer routing adapter.");
}
const embeddedCopy = viewerSource.replace(
  hook, '()=>location.pathname==="srcdoc"?"/":location.pathname'
);
```

This is a source-specific Wouter workaround, not a universal router fix. Recheck uniqueness and upstream behavior before applying; do not edit upstream merely to accommodate wrapper routing.

S13 escapes attribute content in order (`&`, `"`, `<`, `>`) before embedding an original presentation into `srcdoc`. This avoids breaking the attribute; **escaping is not sanitization of untrusted HTML**. Only embed trusted, authorized content, and choose iframe sandbox/permissions appropriate to its required scripts. Do not copy permissive settings blindly.

S13 keeps a heavier presentation in a template and mounts it when requested; the wrapper gives it a descriptive title. S18 supplies poster/controls and lazy `data-src` media activation, with reduced-motion and data-saving gating.

Recommended verification matrix:

| Environment | What to establish |
|---|---|
| Hosted viewer URL | Router reaches intended app |
| Embedded/srcdoc copy | Same model/controls load, escaped HTML intact |
| WebGL-capable browser | Actual render, camera/explode/control behavior |
| WebGL unavailable | Useful visible fallback, no false success claim |
| Phone/reduced motion/data saving | Manual playback and fallback remain usable |
| Exact dashboard image | Final pixels unchanged; no implied live data |

No WebGL/browser check was run for this documentation audit. S08's historical capture reported a fallback, not successful model rendering.

Source cross-reference: [C06/C07/C09](../../../audit/SOURCES.md).
