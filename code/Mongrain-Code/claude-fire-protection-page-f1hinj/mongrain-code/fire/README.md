# Fire Protection page (Wix HTML embed)

- `fire-protection.html` is the code to paste into a Wix **Embed HTML** element. It is one self-contained file: HTML, CSS and vanilla JS, with the Mongrain logo inlined. The only external dependency is Google Fonts (Hanken Grotesk, Instrument Serif, DM Mono).
- `fire-protection-preview.html` is a preview page with desktop / tablet / phone widths, the full code and a Copy code button.

## Wix setup

1. Add › Embed code › **Embed HTML**. Stretch it to full width and remove section padding above and below.
2. Choose **Code**, paste all of `fire-protection.html`, then **Update**.
3. Set the element height (measured in Chromium, document height at each width):

| Width | Measured height | Set the embed to |
| --- | --- | --- |
| 1280 desktop | 5431 px | 5440 px |
| 980 tablet | 5745 px | 5750 px |
| 390 phone | 7647 px | 7660 px |
| 320 phone (Wix mobile editor) | 7839 px | 7850 px |

The Wix mobile editor is about 320 px wide, so use 7850 px there.

## Notes

- "Request a submission" links to `https://snowden-design.wixstudio.com/mongrain-new/contact-us` with `target="_top"`, matching the home hero. Change it when the live domain is set.
- The enquiry brief is created on the visitor's device (download or copy). Nothing is sent to Mongrain. Wix sandboxes embeds, so test the Download and Copy buttons on the published site; if a browser blocks them, the status line says so.
- Text inside the iframe does not count for SEO. Put the page title and a short intro in native Wix text, and fill in the page SEO settings.
- French: user-facing strings in the script are in the `STR` object at the top of the script; the rest are in the HTML. Official FR names from mongrain.ca/fr/services/ignifuge: Protection ignifuge, Ignifugation, Enduit intumescent, Barrière thermique, Coupe-feu (pare-feu), Enlèvement d'amiante et de vermiculite, CTA "Demande de soumission".
- Claims are limited to the supplied copy and the live mongrain.ca page. The fire-side curve is the standard CAN/ULC-S101 / ASTM E119 time–temperature curve; the steel lines are labelled as schematic, not test data.
- Vendor-neutral: no supplier names or branding.
