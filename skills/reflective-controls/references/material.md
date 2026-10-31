# Material-only example

Adapted from project-authored S04/S15. Newly abbreviated example, not a tested export.

```html
<button class="ms-metal" type="button">
  <span class="ms-metal__label">View work</span>
  <span class="ms-metal__sheen" aria-hidden="true"></span>
</button>
```

```css
.ms-metal {
  position: relative; isolation: isolate; min-height: 48px;
  padding: 11px 18px; border-radius: 12px; font: inherit;
  border: 1px solid #ffffffb8; color: #172126;
  background: linear-gradient(165deg,#fff,#b5bfc5 45%,#7f8d97 75%,#d9dfe2);
  box-shadow: inset 0 1px 0 #fff, inset 0 -3px 4px #16202b55,
    0 2px 3px #10141833, 0 8px 14px #10141844;
  transition: transform .28s;
}
.ms-metal__label { position: relative; z-index: 2; }
.ms-metal__sheen {
  position: absolute; inset: 0; overflow: hidden;
  border-radius: inherit; pointer-events: none; z-index: 1;
}
.ms-metal__sheen::before {
  content: ""; position: absolute; inset: -30% -50%;
  background: linear-gradient(100deg,transparent 36%,#ffffffd9 49%,transparent 64%);
  transform: translateX(-75%); transition: transform .55s;
}
.ms-metal:is(:hover,:focus-visible) { transform: translateY(-2px); }
.ms-metal:is(:hover,:focus-visible) .ms-metal__sheen::before {
  transform: translateX(75%);
}
.ms-metal:focus-visible { outline: 2px solid #153b46; outline-offset: 4px; }
.ms-metal:active { transform: translateY(1px); }
@media (prefers-reduced-motion: reduce) {
  .ms-metal { transition: none; }
  .ms-metal__sheen::before { display: none; }
}
```

Use `<a href="…">` for navigation, button for an action. A label font change is optional, not intrinsic to glass. Ensure a supported font and stable label width.

Recommended checks: light/dark surroundings, rounded clipping, peak-highlight contrast, keyboard outline, pressed state, single-tap navigation, reduced motion. No browser checks performed in this audit.
