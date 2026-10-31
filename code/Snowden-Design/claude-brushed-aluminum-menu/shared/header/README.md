# Site header menu

Replit designed this header; Claude restyled the menu buttons only. The HTML structure, class names, test ids, links and open/close/keyboard behavior are Replit's, unchanged.

| File | What it is |
| --- | --- |
| `snowden-header.html` | The Wix Embed HTML. Add `?menu=open` to the URL to see it open. |
| `preview.html` | The reference study beside the live menu at phone and desktop widths. |
| `reference-brushed-aluminum-study.webp` | Blake's "Brushed aluminum navigation button study". |

## How the finish is built

- **Turned reflection**: a `conic-gradient` of light and dark sectors (`--sd-turned`) centred on each plate's own turning point (`--cx`/`--cy`, set per button with `nth-child`), like light on a lathe-turned face.
- **Lathe grain**: a small script paints fine circular arcs on a canvas once and hands it to CSS as `--sd-grain`. Without JS, a CSS ring pattern is used instead.
- **Rim**: a polished bezel in the border box, a dark groove and bright lip as inset shadows, rim glints, and a warm drop shadow for the tan wall.
- **States**: on hover/focus the plate lifts, the reflection rotates 24° (`@property --sd-turn`) and Replit's light sweep crosses it. Pressing sinks the plate. Reduced motion turns the rotation and sweep off.
- **Closing**: the plates slide back out the way they arrived, last one in leaving first (`.is-closing`, `--i-out`), then the panel hides. Reduced motion skips this and hides at once.
- Plates are 38px tall on desktop (14.5px labels, panel widened so every label fits on one line) and 50px on phones (17px labels).
