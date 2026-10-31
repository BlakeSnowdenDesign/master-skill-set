# Home — Section 1: Hero

## Status

This standalone file is ready for manual placement, not already installed.
The connected Wix tools do not expose visual placement in this existing Studio page.
No Wix layout, custom-code injection, or publication was changed.

## Place in Wix Studio

1. Open **Snowden Design 2 → Edit Site → Home**. Keep your native header.
2. Add a section below it. Remove unwanted outer padding and set the background
   to `#E3E4E7`, sampled from the hosted logo video's background.
3. Select **Add Elements → Embed & Social → Embed Code → Enter Code**.
4. Paste only `01-hero.html` using **Copy hero code** on `/review/hero`, then Apply.
5. Stretch the embed to the section width. Preview desktop, tablet, and mobile.
   The review screen measures the actual standalone content at 1280, 980, 390,
   and 320 pixels after fonts and the office image load. Use those heights as starting
   points, then check the actual Wix element at its rendered width for clipping,
   extra space, and scrollbars. Widths in Wix may differ from viewport widths.
6. Review the draft in Wix Preview. Publish only when you approve it.

The file contains only the reworked hero, with its own CSS, fonts, inline office image,
and the Wix-hosted tan-rook MP4 animation, including its original background,
lighting, and shadows. It plays muted with native pause/play controls; reduced-motion
visitors can start it manually. The video sits at the upper-right above the enlarged
office frame, which now fills the visual column.
Its Ken Burns effect follows the Harbour View motion guidance: a 22-second
eased zoom-out that settles and holds, with subtle drift and rotation.
It stays inside the frame and stops when the visitor requests reduced motion.
It requires no React, Replit URL, Velo, or separately hosted image.
The video loads directly from the supplied Wix CDN URL rather than being
embedded as base64. Keep that hosted video available after pasting this HTML.
Font stylesheets load over HTTPS from Google Fonts and Fontshare.
Wix does not automatically inherit its site typography into this iframe.

## Links

The hero's **Step into the work** links to the verified Work-page address:
`https://www.snowden-design.com/home-1`.
**Explore capabilities** links to the verified Services-page address:
`https://www.snowden-design.com/home-1-1`.

Both use `target="_top"` so they leave the iframe.
These deliberately do not use `#work` or `#capabilities`, which would only
scroll within this standalone iframe. When actual Wix section anchors are
configured later, we can update the links to their exact Wix addresses.

## Native SEO content

Keep a single native H1 on the parent Wix Home page:
**Denver web design with dimension.**

Suggested native introduction:
**Snowden Design combines custom website design and development, UX, branding,
3D visualization, and SEO/GEO. Led by Blake Snowden in Denver, Colorado, the
studio connects business strategy with creative execution.**

The embed uses an H2 for its visual headline and is noindex as a standalone
delivery file. That does not set the parent Wix page to noindex.
Do not rely on iframe copy or iframe meta tags for Wix page SEO.
Set the parent page's title and description in Wix separately.

## Before publishing

- Check that the office image and fonts load. Keep the small brand logo in your native Wix header.
- Check the Work and Services links.
- Check keyboard focus and mobile text wrapping.
- Keep browser zoom enabled.
- Confirm no duplicated header/footer or owner review controls were pasted.
- Confirm draft height at each active Wix breakpoint.

Reference: https://support.wix.com/en/article/studio-editor-adding-an-html-iframe-element
