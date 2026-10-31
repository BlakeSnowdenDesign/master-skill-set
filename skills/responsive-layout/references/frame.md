# Fluid frame example

Derived adaptation of S20 layout and S07 intent; illustrative, not approved target geometry.

```html
<figure class="ms-frame">
  <img src="approved-project-image.webp" width="1800" height="1013"
       alt="Describe the meaningful project image in context">
</figure>
```

```css
.ms-frame { width: min(100%, 90rem); margin-inline: auto; overflow: hidden; }
.ms-frame img { display: block; width: 100%; height: auto; }
@media (prefers-reduced-motion: no-preference) {
  .ms-frame img { animation: ms-drift 32s ease-in-out infinite alternate; }
}
@keyframes ms-drift {
  from { transform: scale(1.04) translateX(-.3%); }
  to { transform: scale(1); }
}
```

Keep motion scale separate from frame size. If the owner requests every source edge visible, inspect the `scale(1)` endpoint, object-fit/cropping and any transform on ancestors. Do not assume adding `margin:auto` fixes a competing flex/grid rule.

| Surface | Check |
|---|---|
| Wide desktop + ordinary desktop | Center, intended maximum width, no edge gaps |
| Tablet + narrow phone | No horizontal overflow, readable copy, stable image ratio |
| Integrated preview + exported HTML | Same centering/asset; no preview-only rule leaking |
| Tall Wix embed | Height and nearby controls remain usable |
| Reduced motion / unsupported observer | Content visible and static |

Source cross-reference: [S07/S20](../../../audit/SOURCES.md).
