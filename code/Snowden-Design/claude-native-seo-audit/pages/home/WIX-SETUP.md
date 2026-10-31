# Home page: Wix setup

Follows the design direction, the SEO/GEO spec (PR #5) and the copy deck (`docs/copy-deck.md`, PR #9), which holds the full Home copy. Text that should rank is **native Wix text**. The embed is the visual tour: the studio intro, the services cards, the project grid, the process rows and the motto band. Its old hero, closing CTA and footer are gone, because the native hero, CTA and site footer replace them. Copy in [square brackets] is a fact only Blake can confirm.

## Page structure, top to bottom

| # | Block | Type |
| --- | --- | --- |
| 1 | Site header | Native (Replit's header) |
| 2 | Hero: H1, intro, two buttons, three project screens | Native dark section + `shared/snowden-signature.html` embed |
| 3 | Answer block: What is Snowden Design? | Native |
| 4 | Studio, services cards, project grid, process rows, motto | Embed `pages/home/snowden-home.html` |
| 5 | Services: H2 + four H3s with links | Native |
| 6 | Selected work: three projects + portfolio link | Native |
| 7 | 3D spotlight | Native |
| 8 | Process: H2 + four H3 steps | Native |
| 9 | After launch | Native |
| 10 | FAQ: H2 + five H3s | Native |
| 11 | Closing CTA | Native dark section |
| 12 | Site footer (NAP) | Native |

Blocks 5 to 10 can sit in one quieter "In detail" stretch under the embed, set in Satoshi body text on Snow `#FAFCFC`. They have to be on the page as native text either way.

### 2. Hero [Native, dark]
- **Section:** the same style as the About hero: 1,240 px content width, 40 px radius, Midnight Ink `#0A1D26`, 120 px top padding.
- **Eyebrow** (Satoshi Bold 12 px, uppercase, 0.14em letter spacing, Glacier Aqua): WEB DESIGN STUDIO / DENVER, COLORADO
- **H1** (set to Heading 1 in the text settings; Google Sans Flex 800, 64 to 104 px, white; second line in Glacier Aqua `#7FE0D4`): **Denver web design, / built on full-spectrum strategy.**
- **Intro** (Satoshi 19 px, white at 80%): Snowden Design is a web design studio in Denver, Colorado, led by Blake Snowden. I build Wix websites, interactive 3D, video and SEO and GEO growth plans for B2B and B2C brands, with the strategy, design and code coming from one desk.
- **Buttons:**
  - Book a free consultation → /contact (Glacier Aqua pill, Midnight Ink text, 48 px tall) [keep "free" only if Blake confirms it]
  - See the work → /work (outline pill)
- **Project screens:** three native images on the right, slightly rotated and overlapping, with the file names and alt text below.
- **Signature:** Embed HTML with `shared/snowden-signature.html`, transparent, behind the screens. Accessible name: "Snowden Design geometric signature, decorative". Hide it on phone.

| File name | Alt text |
| --- | --- |
| helen-falls-lodge-website-design-denver.webp | Helen Falls Lodge website home page with a helicopter fly-fishing hero image, designed by Snowden Design, a Denver web design studio |
| schultzs-gourmet-ecommerce-website.webp | Schultz's Gourmet sauce e-commerce website with product video and cart checkout |
| shadow-creek-ranch-website-drone-footage.webp | Shadow Creek Ranch website showing drone footage of a private Colorado ranch |

### 3. Answer block [Native, Snow background]
- **H2: What is Snowden Design?**
- Snowden Design is a Denver web design studio founded by web developer and 3D artist Blake Snowden. It designs and builds Wix websites, creates graphics, video, drone footage and interactive 3D, and runs SEO, GEO and marketing after launch. One person leads every project, from business strategy to the final line of code.

### 4. Embed
Embed HTML, full width, paste `snowden-home.html`. Height: **5,820 px** desktop, **7,140 px** tablet, **9,850 px** phone.

Accessible name: "Snowden Design studio, services, selected work and process". Enter it in the embed's Accessibility settings (Accessible name / title); Wix writes it to the iframe `title`.

The embed has no H1; the native hero holds the page's only H1. Its buttons and cards link to /about, /work and /contact. The project cards open the live client sites in a new tab.

### 5 to 10. Native text sections
Paste these from the copy deck's Home section, word for word, so the FAQ matches the schema:
- **5. Services:** H2 "Web design, 3D and growth services in Denver", the intro line, and the four H3s (Build, Create, Grow, Lead), each with its link: "See Wix website examples" → /work, "3D architectural visualization" → /3d-visualization, "SEO and GEO services" → /packages#seo-geo, "About Blake Snowden" → /about. Add a Wix anchor named `services` on this section.
- **6. Selected work:** H2 "Live sites for real brands", the intro, and three H3s (Helen Falls Lodge, Schultz's Gourmet, Shadow Creek Ranch), each with a "Visit …" link that opens in a new tab. Under them: "See the full Denver web design portfolio" → /work.
- **7. 3D spotlight:** H2 "Interactive 3D architectural visualization", the body, and the button "Explore the 3D model" → /3d-visualization. Native image `mongrain-building-envelope-exploded-3d-model.webp`, alt "Exploded 3D model of a hospital building envelope separating into roof, wall and foundation layers".
- **8. Process:** H2 "How does a website project with Snowden Design work?", the answer-first intro, four H3 steps, and the button "Book a discovery call" → /contact.
- **9. After launch:** H2 "What happens after the site launches?", the body, and "Compare website maintenance plans" → /packages.
- **10. FAQ:** H2 "Web design in Denver: common questions" and five H3 questions. Leave out the cost and timeline questions, on the page and in the schema, until Blake fills in their brackets.

### 11. Closing CTA [Native, dark]
- **H2:** Prepare for success.
- **Body:** Have a site that needs to stop showing and start moving people? Tell me about the brand, the audience and the deadline, and I'll come back with a plan.
- **Buttons:**
  - Book a free consultation → /contact (Glacier Aqua pill)
  - Call 720-340-2611 → `tel:+17203402611`
  - blake@snowden-design.com → `mailto:blake@snowden-design.com`

## SEO panel
| Field | Value |
| --- | --- |
| URL slug | / (home page) |
| Title tag | Web Design Denver \| Wix, 3D & SEO/GEO \| Snowden Design |
| Meta description | Denver web designer building Wix websites, interactive 3D visualization and SEO/GEO growth plans for B2B and B2C brands. Book a free consultation. |
| og:title | Snowden Design: Denver web design, 3D and growth |
| og:description | Wix websites, interactive 3D and SEO/GEO growth plans from one Denver studio. Strategy, design, media and code from the same desk. |
| og:image | `snowden-design-denver-web-design-og.jpg`, 1200 × 630 |
| Canonical | https://www.snowden-design.com/ |
| Robots | index, follow |
| Structured data | The Home JSON-LD in the copy deck. The `#business` block runs site-wide from Settings > Custom Code, so drop it from this page's graph. |

## Still to do on this embed
- Swap Archivo and IBM Plex Mono for Google Sans Flex and Satoshi, per the design direction. The heights above will need re-measuring after that.

## Facts only Blake can confirm
- [ ] Is the first consultation free? (hero and CTA buttons, meta description)
- [ ] Website starting price and typical timeline (two FAQ answers)
