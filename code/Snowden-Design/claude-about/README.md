# Snowden Design

Redesign of [snowden-design.com](https://www.snowden-design.com), Blake Snowden's web design studio in Denver, Colorado. The site stays on Wix; each page is built as one self-contained HTML file pasted into a Wix **Embed HTML** element.

## Pages

| Page | File | Wix iframe height (desktop / tablet / phone) |
| --- | --- | --- |
| Home | `pages/home/snowden-home.html` | 7,420 / 9,230 / 12,030 px |
| About | `pages/about/snowden-about.html` (native hero, answers and story above; native CTA below) | 3,300 / 3,490 / 4,480 px |

`pages/home/preview.html` is the preview page (browser window + copy-code panel) generated from the embed file.

## House style

Follows the Snowden Design 2 design direction (25 October 2026). Pages built before it, such as Home, still need updating to match.

- Type: Google Sans Flex (variable, Google Fonts) for display headlines; Satoshi (Fontshare) for body, labels, navigation and buttons. Labels use Satoshi Bold, uppercase, 0.14em tracking.
- Color: Snow `#FAFCFC` page background, Mist `#EEF3F4` soft sections, Midnight Ink `#0A1D26` / Atlantic `#123440` dark surfaces, Studio Teal `#16B3A6` actions and focus, Glacier Aqua `#7FE0D4` accents on dark, Slate `#4A5F68` secondary text, Signal Amber `#F2A93B` for small dots only.
- Shape: about 40px for heroes, 28 to 30px for panels, 20px for small controls; pill buttons. Use cards only where a preview needs one; prefer open grids and ruled columns.
- Signature: a thin isometric cube tessellation (a nod to Escher) in dark heroes, drawn in inline SVG.
- Motion: staggered hero entrance, IntersectionObserver reveals, `cubic-bezier(.2,.8,.2,1)`, hover states matched on keyboard focus, everything off under `prefers-reduced-motion`. A service ticker belongs on Home only.
- Wix: native header, footer and contact form. Each page hero (H1, intro, button) and its question-and-answer blocks are native Wix text so search engines credit them; `shared/snowden-signature.html` is the transparent cube embed layered into native dark heroes. Embeds hold the designed body sections. All classes are prefixed `.sd-`, and links that leave the embed use `target="_top"`. Each page folder has a `WIX-SETUP.md` with heights, SEO settings and structured data.
- Business phone: 720.340.2611 (Google Voice, Denver).

## Install in Wix

1. Add › Embed code › Embed HTML, stretched to full width.
2. Paste the page's HTML and click Update.
3. Set the height from the table above.

Text inside an iframe does not help SEO, so put the key copy in Wix page SEO settings too.
