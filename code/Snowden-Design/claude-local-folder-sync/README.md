# Snowden Design

Redesign of [snowden-design.com](https://www.snowden-design.com), Blake Snowden's web design studio in Denver, Colorado. The site stays on Wix; each page is built as one self-contained HTML file pasted into a Wix **Embed HTML** element.

## Pages

| Page | File | Wix iframe height (desktop / tablet / phone) |
| --- | --- | --- |
| Home | `pages/home/snowden-home.html` | 7,500 / 9,300 / 12,030 px |

`pages/home/preview.html` is the preview page (browser window + copy-code panel) generated from the embed file.

## House style

- Type: Archivo (wide, 118% stretch, 600–800) for headlines; IBM Plex Mono uppercase, 0.14em tracking, for labels.
- Color: ink navy `#0A1D26` / `#123440`, turquoise `#16B3A6`, aqua `#7FE0D4`, sun `#F2A93B` for small dots only.
- Shape: 40px hero, CTA and photos; 28–30px cards; 20–22px tiles; pill buttons.
- Motion: staggered hero entrance, Ken Burns, IntersectionObserver reveals with photo mask wipes, `cubic-bezier(.2,.8,.2,1)`, everything off under `prefers-reduced-motion`.
- All classes prefixed `.sd-`; links that leave the site use `target="_top"`.

## Install in Wix

1. Add › Embed code › Embed HTML, stretched to full width.
2. Paste the page's HTML and click Update.
3. Set the height from the table above.

Text inside an iframe does not help SEO, so put the key copy in Wix page SEO settings too.
