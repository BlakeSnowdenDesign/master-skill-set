# Small illustrative SVG example

New minimal example based on U04's suggested reference hygiene, not the unavailable approved fire-protection specimen.

```html
<svg viewBox="0 0 320 180" role="img" aria-labelledby="study-a-title">
  <title id="study-a-title">Illustrative material section, not to scale</title>
  <defs>
    <linearGradient id="study-a-face" x2="0" y2="1">
      <stop stop-color="#e3e8eb"/><stop offset="1" stop-color="#aab7bf"/>
    </linearGradient>
  </defs>
  <g>
    <path d="M60 60 180 40 240 70 120 90Z" fill="#eff3f5"/>
    <path d="M60 60 120 90 120 140 60 110Z" fill="#778892"/>
    <path d="M120 90 240 70 240 120 120 140Z" fill="url(#study-a-face)"/>
  </g>
  <text x="12" y="170" font-size="12">Illustrative · NTS</text>
</svg>
```

Use a unique prefix when placing multiple scenes in one document. If animation is added, put positioning transforms and animated transforms on separate nested groups; U04 recommends this to avoid overwriting SVG geometry transforms.

Check all referenced IDs resolve exactly once, labels fit viewBox bounds, meaningful content has accessible naming, and filters do not crop shadows or impose unmeasured rendering cost. Do not attach engineering claims to this diagram.

Primary retrieval lead: `.agents/skills/mongrain-architectural-material-studies/` in the [reported inventory](../../../REPOSITORY-INVENTORY.md). No upstream SHA supplied.
