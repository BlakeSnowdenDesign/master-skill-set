# Snowden Design — Site Copy Deck (SEO + GEO)

Oct 25, 2026 · BLAKE · Living version: [Claude Doc](https://claude.ai/artifact/1kGvjJLVGboMkdhdNA2M5K)

## How to use this deck

Every word that should rank goes in **native Wix elements**; the HTML embeds carry design, motion and 3D only. Each page below is laid out top to bottom, and every block is tagged **\[Native\]** (paste into a Wix text, button, image or form element), **\[Embed\]** (already in that page's HTML file) or **\[SEO panel\]** (Pages › page › SEO basics, Social share, Advanced SEO). Copy is final unless it sits in \[square brackets\], which marks a fact only BLAKE can supply.

This deck supersedes the page tables in PR #5 where they differ, because the site map is now seven pages with no separate Services, SEO & GEO or Analytics page. Everything else in PR #5 (embed rule, GEO rules, launch checklist) still holds.

### Site map and keyword ownership

One primary keyword per page, never shared. Other pages link to the owner using that keyword as anchor text.

| Page | Slug | Primary keyword | Secondary keywords | Schema |
| --- | --- | --- | --- | --- |
| Home | / | web design Denver | Denver web designer; Wix web designer Denver; web developer Denver; SEO and GEO services; B2B and B2C business development strategy | ProfessionalService, WebSite, WebPage, FAQPage |
| Work | /work | Denver web design portfolio | Wix website examples; hospitality website design; e-commerce website design; video and drone production; UX and branding | CollectionPage, ItemList of CreativeWork |
| 3D Visualization | /3d-visualization | 3D architectural visualization | interactive 3D building model; exploded assembly animation; BIM-style visualization; 3D modeling services Denver; interactive 3D for Wix | WebPage, Service, CreativeWork, FAQPage |
| Packages | /packages | website maintenance plans | website care plan Denver; managed Wix hosting; SEO and GEO services Denver; Google Ads management Denver; social media management; monthly GA4 report | WebPage, Service + OfferCatalog, FAQPage |
| About | /about | Denver web developer and 3D artist | Blake Snowden; Snowden Design Denver; B2B and B2C business development | AboutPage, Person |
| Contact | /contact | contact a Denver web designer | hire a web designer in Denver; free website consultation Denver; web development and digital marketing consultation | ContactPage |
| Privacy Policy | /privacy-policy | none (footer only) | none | WebPage |

**Changes from PR #5:** Work's primary moves from "3D product rendering services" to "Denver web design portfolio", because no product-render samples exist yet and the design direction rules out unsupported claims. "SEO services Denver" and "Wix web designer Denver" have no page of their own any more, so they live in Home's services section and Packages' SEO & GEO section. If BLAKE later adds a /seo-geo page, it takes "SEO services Denver" back from Packages.

### Entity facts (identical everywhere)

| Field | Value |
| --- | --- |
| Business name | Snowden Design |
| Founder | Blake Snowden, web developer and 3D artist |
| Service area | Denver, Colorado; clients across Colorado and the US (no street address shown) |
| Phone | 720-340-2611 (link `tel:+17203402611`). Retire 970.685.8733 everywhere. |
| Email | blake@snowden-design.com |
| Canonical domain | https://www.snowden-design.com |
| Platform | Wix Studio, plus custom code (Three.js/WebGL for 3D) |

### Site-wide settings (once, before publish)

| Setting | Where in Wix | Value |
| --- | --- | --- |
| Site title / og:site\_name | Settings › SEO › Site name | Snowden Design |
| Default og:image | Settings › Social share | 1200 × 630 branded card, ink background, rook logo + "Web design, 3D and growth / Denver, Colorado" |
| og:locale / language | Settings › Language | en\_US |
| twitter:card | Social share (Wix default) | summary\_large\_image; add twitter:site only if an X account exists |
| Favicon | Settings › Favicon | Rook mark, 512 × 512 PNG |
| Business entity JSON-LD | Settings › Custom Code › Head, all pages | The Home `#business` block (then leave it off the individual pages) |
| robots.txt | SEO › Tools › robots.txt | Allow Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended |
| Redirects (301) | SEO › URL Redirect Manager | /projects → /work; /contact-1 → /contact |
| Sitemap | Auto | Submit https://www.snowden-design.com/sitemap.xml in Google Search Console and Bing Webmaster Tools |
| Meta keywords tag | none | Leave empty; Google ignores it |

### Header and footer \[Native, site-wide\]

- **Menu:** Work · 3D Visualization · Packages · About · Contact. Button at the right: "Book a free consultation" → /contact.
- **Logo alt text:** "Snowden Design logo"; logo links to /.
- **Footer NAP:** Snowden Design · Web design, 3D and growth · Denver, Colorado · 720-340-2611 · blake@snowden-design.com
- **Footer links:** Work · 3D Visualization · Packages · About · Contact · Privacy Policy
- **Footer line:** © 2026 Snowden Design. Built in Denver on Wix Studio.

## Home (/)

Home owns **web design Denver** and introduces the whole studio in one scroll: who, what, proof, process, after-launch, questions, call to action. The current Home embed on `main` holds all of this inside the iframe and still shows 970.685.8733, so it needs the native/embed split below (see the PR notes section).

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | / |
| Title tag (54 chars) | Web Design Denver \| Wix, 3D & SEO/GEO \| Snowden Design |
| Meta description (146 chars) | Denver web designer building Wix websites, interactive 3D visualization and SEO/GEO growth plans for B2B and B2C brands. Book a free consultation. |
| og:title | Snowden Design: Denver web design, 3D and growth |
| og:description | Wix websites, interactive 3D and SEO/GEO growth plans from one Denver studio. Strategy, design, media and code from the same desk. |
| og:image | Branded card: hero headline over the Helen Falls, Schultz's and Shadow Creek screens, 1200 × 630, `snowden-design-denver-web-design-og.jpg` |
| og:type | website |
| Canonical | https://www.snowden-design.com/ |
| Robots | index, follow |
| Structured data | The JSON-LD at the end of this section |

### Keywords

- **Primary:** web design Denver (title, H1, first sentence, one H2, lead image alt)
- **Secondary:** Denver web designer; Wix web designer Denver; web developer Denver; SEO and GEO services; B2B and B2C business development strategy
- **Entity:** Snowden Design, Blake Snowden, Denver, Colorado

### Page copy, top to bottom

**1. Hero \[Native, dark Midnight Ink section\]**

- Eyebrow: WEB DESIGN STUDIO / DENVER, COLORADO
- H1: **Denver web design, built on full-spectrum strategy.** (second line in Glacier Aqua: "built on full-spectrum strategy.")
- Intro: Snowden Design is a web design studio in Denver, Colorado, led by Blake Snowden. I build Wix websites, interactive 3D, video and SEO and GEO growth plans for B2B and B2C brands, with the strategy, design and code coming from one desk.
- Primary button: Book a free consultation → /contact
- Secondary button: See the work → /work
- Layered project screens \[Native images, right side\]: Helen Falls Lodge, Schultz's Gourmet, Shadow Creek Ranch (alt text in the image table)
- Geometric signature \[Embed\]: `shared/snowden-signature.html`, transparent, behind the screens

**2. Answer block \[Native, Snow background\]**

- H2: **What is Snowden Design?**
- Answer: Snowden Design is a Denver web design studio founded by web developer and 3D artist Blake Snowden. It designs and builds Wix websites, creates graphics, video, drone footage and interactive 3D, and runs SEO, GEO and marketing after launch. One person leads every project, from business strategy to the final line of code.

**3. Services \[Native, 4 columns\]**

- Section label: 01 / SERVICES
- H2: **Web design, 3D and growth services in Denver**
- Intro: Hire the whole studio, or bring in just the piece you're missing.
- H3: **Build: web design and development.** Custom Wix Studio websites with UX, motion and video designed in from the first sketch, plus e-commerce where you sell online. As a Wix web designer in Denver, I set up SEO from day one, not after launch. Link: "See Wix website examples" → /work
- H3: **Create: graphics, 3D and video.** Logo design, style guides, illustration, digital art, live-action video and drone footage, and interactive 3D models that run right in the browser. Link: "3D architectural visualization" → /3d-visualization
- H3: **Grow: SEO, GEO and marketing.** Search engine optimization, generative engine optimization for AI answers, Google Business Profile, social media, lead generation and performance marketing, reported monthly in Google Analytics 4. Link: "SEO and GEO services" → /packages#seo-geo
- H3: **Lead: strategy and delivery.** B2B and B2C business development strategy, brand consulting, project management and leadership development, backed by a technical grasp of what it takes to close sophisticated, high-value deals. Link: "About Blake Snowden" → /about

**4. Selected work \[Native images + text\]**

- Section label: 02 / SELECTED WORK
- H2: **Live sites for real brands**
- Intro: From a fly-in fishing lodge to a sauce brand and a Colorado ranch. Every site is live, so click through and explore.
- H3: **Helen Falls Lodge** · Hospitality, Northern Quebec. A luxury helicopter fly-fishing lodge, presented with large-format hero imagery and video. Link: "Visit helenfalls.com" (new tab)
- H3: **Schultz's Gourmet** · E-commerce, food. Online store for a new sauce brand, with live-action video, drone footage and cart checkout. Link: "Visit schultzgourmet.com"
- H3: **Shadow Creek Ranch** · Ranch, Colorado. A large-format showcase built around drone footage and photography of a private shared-amenity ranch. Link: "Visit shadowcreekranch.co"
- Text link under the row: "See the full Denver web design portfolio" → /work

**5. 3D spotlight \[Native text + native image\]**

- H2: **Interactive 3D architectural visualization**
- Body: For Mongrain, a building-envelope contractor, Snowden Design built a 3D hospital model visitors can take apart layer by layer, from foundation to roof. It runs inside a Wix page with no apps or plugins.
- Button: Explore the 3D model → /3d-visualization

**6. Process \[Native H2/H3 text; step motion can stay in Embed\]**

- Section label: 03 / PROCESS
- H2: **How does a website project with Snowden Design work?**
- Answer-first intro: Every project runs in four steps: strategy, design, content, then build and launch. You review the work at each step, and the person who plans your site is the one who designs, films and builds it.
- H3: **1. Strategy.** Goals, audience and a content plan before a single pixel moves.
- H3: **2. Design.** Art direction, style guide, layouts and motion, reviewed together.
- H3: **3. Content.** Photography, drone footage, video and copy made for the page they live on.
- H3: **4. Build and launch.** Responsive, fast and SEO-ready on Wix Studio, with GA4, Search Console and schema set up on day one.
- Button: Book a discovery call → /contact

**7. After launch \[Native\]**

- H2: **What happens after the site launches?**
- Body: A website should get better every month, not drift out of date. Snowden Design's website maintenance plans cover managed Wix hosting, edits, SEO and GEO, social media, Google Ads and a monthly GA4 report, in three tiers: Basecamp, Ascent and Summit.
- Link: "Compare website maintenance plans" → /packages

**8. FAQ \[Native accordion or text; must match the FAQPage schema word for word\]**

- H2: **Web design in Denver: common questions**
- H3: **How much does a website cost in Denver?** Snowden Design quotes every website after a free consultation. Price depends on the number of pages, custom motion or 3D, e-commerce, and whether photography, video and copywriting are included. Website projects start at \[$ starting price\], and monthly care plans are listed on the Packages page.
- H3: **How long does a website project take?** Most Snowden Design websites launch in \[X to Y\] weeks from the strategy call. Larger builds with e-commerce, video shoots or interactive 3D take longer, and you get a dated schedule for each step before design starts.
- H3: **Is Wix good for SEO in 2026?** Yes, when it is set up properly. Wix Studio gives full control of title tags, meta descriptions, URL slugs, structured data, 301 redirects, robots.txt and the XML sitemap. Rankings still depend on useful content, fast pages and links, which is where Snowden Design's SEO and GEO work comes in.
- H3: **Do you only work with Denver businesses?** No. Snowden Design is based in Denver, Colorado, and works with clients well beyond the Front Range, including a fly-fishing lodge in Northern Quebec and an internet provider in metro Phoenix. Strategy calls and reviews happen online, with in-person meetings around Denver.
- H3: **What does Snowden Design do besides web design?** Graphics, logo design, digital art, interactive 3D, video and drone footage, SEO and GEO, social media, lead generation, brand consulting, project management and B2B and B2C business development strategy. You can hire the full studio or one discipline.

**9. Motto band \[Embed or native\]**

- Quote: "If you follow the paths of the uninspired, your rewards will be commensurate." — Studio motto, Snowden Design
- Capability ticker \[Embed\]: Web design · UX · Graphics · 3D · Video · Drone footage · E-commerce · SEO · GEO · Social media · Lead generation · Brand consulting

**10. Closing CTA \[Native, dark\]**

- H2: **Prepare for success.**
- Body: Have a site that needs to stop showing and start moving people? Tell me about the brand, the audience and the deadline, and I'll come back with a plan.
- Buttons: Book a free consultation → /contact · Call 720-340-2611 → tel:+17203402611

### Images and alt text

| File name | Alt text | Where |
| --- | --- | --- |
| helen-falls-lodge-website-design-denver.webp | Helen Falls Lodge website home page with a helicopter fly-fishing hero image, designed by Snowden Design | Hero + work row (lead image, carries the keyword) |
| schultzs-gourmet-ecommerce-website.webp | Schultz's Gourmet sauce e-commerce website with product video and cart checkout | Hero + work row |
| shadow-creek-ranch-website-drone-footage.webp | Shadow Creek Ranch website showing drone footage of a private Colorado ranch | Hero + work row |
| mongrain-building-envelope-exploded-3d-model.webp | Exploded 3D model of a hospital building envelope separating into roof, wall and foundation layers | 3D spotlight |
| geometric signature, ticker, dividers | (empty alt, decorative) | Embed |

Lead image alt reads "…designed by Snowden Design"; to carry the primary keyword without stuffing, use "…designed by Snowden Design, a Denver web design studio" on that one image only.

### Internal links

| Anchor text | Target |
| --- | --- |
| See the work / See Wix website examples / See the full Denver web design portfolio | /work |
| 3D architectural visualization / Explore the 3D model | /3d-visualization |
| SEO and GEO services / Compare website maintenance plans | /packages |
| About Blake Snowden | /about |
| Book a free consultation / Book a discovery call | /contact |

### JSON-LD \[SEO panel › Advanced SEO › Structured data markup\]

If the `#business` block goes site-wide in Custom Code, delete it from this graph. Fill or delete each `sameAs` placeholder; never ship a placeholder.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.snowden-design.com/#business",
      "name": "Snowden Design",
      "url": "https://www.snowden-design.com/",
      "logo": "<Wix URL of the rook logo PNG>",
      "image": "<Wix URL of the Home og:image>",
      "description": "Denver web design studio building Wix websites, interactive 3D visualization, video and SEO/GEO growth plans for B2B and B2C brands.",
      "telephone": "+1-720-340-2611",
      "email": "blake@snowden-design.com",
      "founder": { "@id": "https://www.snowden-design.com/about#blake" },
      "address": { "@type": "PostalAddress", "addressLocality": "Denver", "addressRegion": "CO", "addressCountry": "US" },
      "areaServed": [
        { "@type": "City", "name": "Denver" },
        { "@type": "State", "name": "Colorado" },
        { "@type": "Country", "name": "United States" }
      ],
      "knowsAbout": ["Web design", "Web development", "Wix Studio", "User experience design", "3D architectural visualization", "3D modeling", "Video production", "Drone videography", "Search engine optimization", "Generative engine optimization", "Google Analytics 4", "Google Ads", "Social media marketing", "Lead generation", "Business development"],
      "priceRange": "$$",
      "sameAs": ["<Google Business Profile URL>", "<LinkedIn URL>", "<Instagram URL>"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.snowden-design.com/#website",
      "name": "Snowden Design",
      "url": "https://www.snowden-design.com/",
      "publisher": { "@id": "https://www.snowden-design.com/#business" },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.snowden-design.com/#webpage",
      "url": "https://www.snowden-design.com/",
      "name": "Web Design Denver | Wix, 3D & SEO/GEO | Snowden Design",
      "description": "Denver web designer building Wix websites, interactive 3D visualization and SEO/GEO growth plans for B2B and B2C brands. Book a free consultation.",
      "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
      "about": { "@id": "https://www.snowden-design.com/#business" },
      "author": { "@id": "https://www.snowden-design.com/about#blake" },
      "inLanguage": "en-US",
      "dateModified": "2026-10-25"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a website cost in Denver?", "acceptedAnswer": { "@type": "Answer", "text": "Snowden Design quotes every website after a free consultation. Price depends on the number of pages, custom motion or 3D, e-commerce, and whether photography, video and copywriting are included. Website projects start at [$ starting price], and monthly care plans are listed on the Packages page." } },
        { "@type": "Question", "name": "How long does a website project take?", "acceptedAnswer": { "@type": "Answer", "text": "Most Snowden Design websites launch in [X to Y] weeks from the strategy call. Larger builds with e-commerce, video shoots or interactive 3D take longer, and you get a dated schedule for each step before design starts." } },
        { "@type": "Question", "name": "Is Wix good for SEO in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, when it is set up properly. Wix Studio gives full control of title tags, meta descriptions, URL slugs, structured data, 301 redirects, robots.txt and the XML sitemap. Rankings still depend on useful content, fast pages and links, which is where Snowden Design's SEO and GEO work comes in." } },
        { "@type": "Question", "name": "Do you only work with Denver businesses?", "acceptedAnswer": { "@type": "Answer", "text": "No. Snowden Design is based in Denver, Colorado, and works with clients well beyond the Front Range, including a fly-fishing lodge in Northern Quebec and an internet provider in metro Phoenix. Strategy calls and reviews happen online, with in-person meetings around Denver." } },
        { "@type": "Question", "name": "What does Snowden Design do besides web design?", "acceptedAnswer": { "@type": "Answer", "text": "Graphics, logo design, digital art, interactive 3D, video and drone footage, SEO and GEO, social media, lead generation, brand consulting, project management and B2B and B2C business development strategy. You can hire the full studio or one discipline." } }
      ]
    }
  ]
}
```

The two FAQ answers with \[brackets\] must be filled on the page and in the schema together, or both removed, before publishing.

## Work (/work), copy for Replit's build

Work owns **Denver web design portfolio** and proves the range with seven live sites plus the Mongrain 3D project. Replit builds this page on its own `replit/` branch; this copy is for that thread to paste, and nothing here edits Replit's branch. Descriptions use only facts already on the live site and the existing Home draft; outcomes are added only once BLAKE confirms them.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /work (301 from /projects) |
| Title tag (56 chars) | Denver Web Design Portfolio \| Wix Sites \| Snowden Design |
| Meta description (148 chars) | Live websites by Snowden Design, a Denver web designer: Helen Falls Lodge, Schultz's Gourmet, Shadow Creek Ranch and more, with video, drone and 3D. |
| og:title | Snowden Design portfolio: live websites for real brands |
| og:description | Lodges, ranches, food brands and internet providers. Seven live Wix sites and an interactive 3D project from a Denver studio. |
| og:image | Collage of three project screens, 1200 × 630, `snowden-design-web-design-portfolio-og.jpg` |
| Canonical | https://www.snowden-design.com/work |
| Robots | index, follow |

### Keywords

- **Primary:** Denver web design portfolio
- **Secondary:** Wix website examples; hospitality website design; e-commerce website design; video and drone production; UX and branding
- **Links out with keyword anchors:** "3D architectural visualization" → /3d-visualization; "web design Denver" → /

### Page copy, top to bottom

**1. Hero \[Native\]**

- Eyebrow: SELECTED WORK / DENVER, COLORADO
- H1: **Denver web design portfolio: live sites for real brands.**
- Intro: This is the Snowden Design web design portfolio: Wix websites, video, drone footage and interactive 3D made in Denver, Colorado, for lodges, ranches, food brands and internet providers. Every project below is live, so click through and explore the real thing.
- Filter chips (optional, only if quick): All · Hospitality · E-commerce · Internet · Outdoor · 3D

**2. Project grid \[Native images and text; hover motion may come from Embed\]**

Each card: H3 project name, a context line (industry · location), work type tags, a one-sentence description, and a "Visit site" link opening in a new tab with `rel="noopener"`.

| # | H3 | Context | Work type | Description | Link |
| --- | --- | --- | --- | --- | --- |
| 01 | Helen Falls Lodge | Hospitality · Northern Quebec | Web design, UX, video | A luxury helicopter fly-fishing lodge, presented with large-format hero imagery and video. | https://www.helenfalls.com/ |
| 02 | Shadow Creek Ranch | Ranch · Colorado | Web design, drone footage, photography | A large-format showcase built around drone footage and photography of a private shared-amenity ranch. | https://www.shadowcreekranch.co/ |
| 03 | Schultz's Gourmet | E-commerce · Food | E-commerce, video, drone footage | Online store for a new sauce brand, with live-action video, drone footage and cart checkout. | https://www.schultzgourmet.com/ |
| 04 | Pasta Jay's | Brand · Food | Brand site, video | A pasta sauce brand site with live video and a where-to-buy guide. | https://www.pastajaysauce.com/ |
| 05 | Mojo Broadband | Internet · Phoenix, AZ | Web design, UX | Site for a locally owned fixed-wireless provider offering no-data-cap broadband across metro Phoenix. | https://www.mojobroadband.co/ |
| 06 | Edge Internet | Internet · Showcase | Web design, motion | An action-focused, large-format showcase for a point-to-point internet provider. | https://www.edgeinternet.co/ |
| 07 | Apes Brain | Outdoor · Fly fishing | Brand site, graphics | A bold fly-fishing brand with a website that matches its attitude. | https://www.apesbrain.com/ |
| 08 | Mongrain 3D envelope explorer | Construction · 3D | Interactive 3D, Three.js | An interactive 3D hospital model that visitors take apart layer by layer, from foundation to roof. | /3d-visualization (same tab), anchor "3D architectural visualization" |

**3. Case-study block \[Native, one per featured project, start with Helen Falls\]**

- H2: **Helen Falls Lodge: website design for a fly-in fishing lodge**
- H3: The brief — \[one or two sentences from BLAKE: what the lodge needed\]
- H3: The approach — Large-format hero imagery and video lead the page, so guests feel the river and the flight in before they read a word. \[Add pages built, booking path, tools.\]
- H3: The result — \[only confirmed outcomes: launch date, bookings, traffic. Leave this H3 out until there is one.\]

**4. Answer block \[Native, for GEO\]**

- H2: **What kinds of websites does Snowden Design build?**
- Answer: Snowden Design builds custom Wix websites for hospitality, food and e-commerce, internet service, ranch and outdoor brands. Most projects combine web design and UX with original content, such as live-action video, drone footage, photography and graphics. Some add interactive 3D, such as the Mongrain building-envelope explorer.

**5. FAQ \[Native\]**

- H2: **Portfolio questions**
- H3: **Are these real, live websites?** Yes. Every project in this Denver web design portfolio is a live website for a real client, and each card links to it. Screenshots show the site as launched; the live versions may have been updated since.
- H3: **Does Snowden Design make the photos and video too?** Yes. Snowden Design produces live-action video, drone footage, photography and graphics for the sites it builds, so content is made for the exact page it will live on. Helen Falls Lodge, Shadow Creek Ranch and Schultz's Gourmet all use original video or drone footage.
- H3: **Are all of these sites built on Wix?** \[BLAKE to confirm per site.\] New Snowden Design websites are built on Wix Studio, with custom HTML, CSS and JavaScript embeds for motion and 3D, so clients can still edit text and images themselves.

**6. CTA \[Native, dark\]**

- H2: **Your project, next.**
- Body: Tell me about the brand, the audience and the deadline. I'll come back with a plan.
- Button: Book a free consultation → /contact

### Images and alt text

WebP, 1600 px wide max, under 200 KB, native Wix images with lazy loading below the fold.

| File name | Alt text |
| --- | --- |
| helen-falls-lodge-website-design.webp | Helen Falls Lodge website with a helicopter fly-fishing hero image and video, designed by Snowden Design, a Denver web design studio |
| shadow-creek-ranch-website-drone-footage.webp | Shadow Creek Ranch website showing drone footage of a private Colorado ranch |
| schultzs-gourmet-ecommerce-website.webp | Schultz's Gourmet sauce e-commerce website with product video and cart checkout |
| pasta-jays-sauce-brand-website.webp | Pasta Jay's pasta sauce brand website with live video and where-to-buy section |
| mojo-broadband-phoenix-isp-website.webp | Mojo Broadband website for a fixed-wireless internet provider in metro Phoenix |
| edge-internet-website-design.webp | Edge Internet large-format website for a point-to-point internet provider |
| apes-brain-fly-fishing-brand-website.webp | Apes Brain fly-fishing brand website with bold graphics |
| mongrain-building-envelope-exploded-3d-model.webp | Exploded 3D model of a hospital building envelope separating into roof, wall and foundation layers |

### Internal links

| Anchor text | Target |
| --- | --- |
| 3D architectural visualization | /3d-visualization |
| web design Denver (in footer CTA line: "More about web design in Denver") | / |
| website maintenance plans ("Keep your site growing with a website maintenance plan") | /packages |
| Book a free consultation | /contact |

### JSON-LD \[SEO panel › Structured data markup\]

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.snowden-design.com/work#webpage",
      "url": "https://www.snowden-design.com/work",
      "name": "Denver Web Design Portfolio | Wix Sites | Snowden Design",
      "description": "Live websites by Snowden Design, a Denver web designer: Helen Falls Lodge, Schultz's Gourmet, Shadow Creek Ranch and more, with video, drone and 3D.",
      "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
      "about": { "@id": "https://www.snowden-design.com/#business" },
      "author": { "@id": "https://www.snowden-design.com/about#blake" },
      "inLanguage": "en-US",
      "dateModified": "2026-10-25",
      "mainEntity": { "@id": "https://www.snowden-design.com/work#projects" }
    },
    {
      "@type": "ItemList",
      "@id": "https://www.snowden-design.com/work#projects",
      "name": "Snowden Design web design portfolio",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "CreativeWork", "name": "Helen Falls Lodge website", "url": "https://www.helenfalls.com/", "genre": "Hospitality website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "CreativeWork", "name": "Shadow Creek Ranch website", "url": "https://www.shadowcreekranch.co/", "genre": "Website design and drone videography", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "CreativeWork", "name": "Schultz's Gourmet e-commerce website", "url": "https://www.schultzgourmet.com/", "genre": "E-commerce website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "CreativeWork", "name": "Pasta Jay's brand website", "url": "https://www.pastajaysauce.com/", "genre": "Brand website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "CreativeWork", "name": "Mojo Broadband website", "url": "https://www.mojobroadband.co/", "genre": "Internet provider website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "CreativeWork", "name": "Edge Internet website", "url": "https://www.edgeinternet.co/", "genre": "Internet provider website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 7, "item": { "@type": "CreativeWork", "name": "Apes Brain brand website", "url": "https://www.apesbrain.com/", "genre": "Outdoor brand website design", "creator": { "@id": "https://www.snowden-design.com/#business" } } },
        { "@type": "ListItem", "position": 8, "item": { "@id": "https://www.snowden-design.com/3d-visualization#mongrain" } }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/work#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Are these real, live websites?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every project in this Denver web design portfolio is a live website for a real client, and each card links to it. Screenshots show the site as launched; the live versions may have been updated since." } },
        { "@type": "Question", "name": "Does Snowden Design make the photos and video too?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Snowden Design produces live-action video, drone footage, photography and graphics for the sites it builds, so content is made for the exact page it will live on. Helen Falls Lodge, Shadow Creek Ranch and Schultz's Gourmet all use original video or drone footage." } }
      ]
    }
  ]
}
```

The third FAQ stays out of the schema until BLAKE confirms which sites are on Wix.

## 3D Visualization (/3d-visualization)

This page owns **3D architectural visualization**, proven by the Mongrain building-envelope explorer. PR #7's SEO pack already passes the checklist, so its copy is kept word for word below with two fixes: the Work link no longer promises product renders,, and the closing CTA is new. The JSON-LD stays as generated in `pages/3d-visualization/SEO.md` section 5 (built by `src/build.py`), so it is not duplicated here.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /3d-visualization |
| Title tag (54 chars) | 3D Architectural Visualization Denver \| Snowden Design |
| Meta description (152 chars) | Interactive 3D building models, exploded assembly animations and BIM-style renders by Snowden Design in Denver. See the live Mongrain envelope explorer. |
| og:title | Interactive 3D architectural visualization: the Mongrain envelope explorer |
| og:description | Take a hospital building envelope apart layer by layer, from foundation to roof. Built in Three.js for Wix by Snowden Design, Denver. |
| og:image | `og-3d-architectural-visualization.jpg` (1200 × 630, already in PR #7) |
| og:image:alt | Exploded 3D model of a hospital building envelope by Snowden Design |
| Canonical | https://www.snowden-design.com/3d-visualization |
| Robots | index, follow |
| Menu name | 3D Visualization |

### Keywords

- **Primary:** 3D architectural visualization
- **Secondary:** interactive 3D building model; exploded assembly animation; BIM-style visualization; 3D modeling services Denver; interactive 3D for Wix
- **Supporting:** building envelope 3D model; Three.js; WebGL; 3D rendering Denver

### Page copy, top to bottom

**1. Hero \[Native\]**

- Eyebrow: 3D VISUALIZATION / DENVER, COLORADO
- H1: **3D architectural visualization you can explore**
- Intro: Snowden Design is a Denver studio that builds interactive 3D building models, exploded assembly animations and BIM-style renders that run right in the browser, including on Wix. For Mongrain, a building-envelope contractor, we modeled a hospital that visitors can take apart layer by layer, from foundation to roof.
- Button: Launch the 3D model (scrolls to the embed) · secondary: Book a free consultation → /contact

**2. Live model \[Embed\]** `snowden-3d-visualization.html`, full width. Accessible name: "Interactive 3D building-envelope explorer for Mongrain". Heights per PR #7: 7,370 / 7,810 / 10,680 px.

**3. Gallery \[Native Pro Gallery, four renders\]** (alt text below)

**4. Case study \[Native\]**

- H2: **What we built for Mongrain**
- Body: Mongrain needed a clear way to show how a building envelope works. Snowden Design built an interactive 3D explorer of a hospital project: the building assembles foundation, walls, then roof; any zone can be clicked to zoom in, pull the section out and explode it into labeled layers; a 24-component BIM-style section runs from footing to parapet; and a six-section foundation systems page adds its own 3D cutaway. Everything is generic and vendor-neutral, and every model ships as Wix-ready HTML with no apps or plugins.
- H2: **What can a 3D model do for your site?**
- Body: A 3D model explains a building, system or product in seconds instead of paragraphs, and keeps visitors on the page while they explore it. Snowden Design's 3D modeling services cover modeling from CAD, drawings or photos; exploded assembly animation; real-time Three.js and WebGL scenes; rendering and materials matched to your brand; and Wix-ready delivery with SEO copy and schema. **Changed:** "See more projects in our Denver web design portfolio." (replaces "Need still product renders instead? See our 3D product rendering services.")

**5. FAQ \[Native, H2 + six H3s; matches the PR #7 FAQPage schema word for word\]**

- H2: **3D architectural visualization FAQ**
- H3: **What is 3D architectural visualization?** 3D architectural visualization turns drawings, CAD files or photos of a building into a 3D model people can see from any angle. Snowden Design builds them as interactive web scenes, so visitors can rotate a building, open its layers and understand how it goes together without reading a spec sheet.
- H3: **Can an interactive 3D model run on a Wix website?** Yes. Snowden Design delivers each model as one self-contained HTML file that pastes into a Wix Embed HTML element. It needs no apps, plugins or Velo code, runs in any modern browser with WebGL, and falls back to still images and plain text when 3D or motion is turned off.
- H3: **What did Snowden Design build for Mongrain?** For Mongrain, a building-envelope contractor, Snowden Design built an interactive 3D explorer of a hospital project. Visitors watch the building assemble from foundation to roof, click a wall, roof or foundation zone to explode its layers, and explore a 24-component BIM-style section and a six-section foundation systems page.
- H3: **What files do I need to start a 3D project?** Whatever you already have is usually enough: CAD or BIM exports, architectural drawings, product spec sheets, PDFs or clear photos. Mongrain's models started from system drawings and photos of the finished building. Snowden Design simplifies that reference into a model that reads clearly on a phone or desktop screen.
- H3: **How much does 3D visualization cost?** Every 3D project is quoted after a free consultation, because cost depends on how many assemblies the model shows, how much animation and interaction it needs, and where it will be published. Call 720-340-2611 or email blake@snowden-design.com with your drawings or photos for a fixed quote.
- H3: **Does interactive 3D content help SEO?** It helps indirectly. A model keeps visitors engaged longer and earns links, but search engines and AI answer engines read text, not WebGL. That's why Snowden Design pairs every model with crawlable page copy, descriptive image alt text, FAQ content and schema markup, so the page around the model ranks and gets cited.

**6. CTA \[Native, dark\]**

- H2: **Have drawings that need explaining?**
- Body: Send the CAD files, drawings or photos you already have, and I'll scope a model that tells the story on any screen.
- Buttons: Book a free consultation → /contact · Call 720-340-2611

### Images and alt text (from PR #7, files already keyword-named)

| File name | Alt text |
| --- | --- |
| mongrain-building-envelope-exploded-3d-model.webp | Exploded 3D model of a hospital building envelope separating into roof, wall and foundation layers |
| mongrain-exploded-wall-assembly-3d-render.webp | Exploded 3D wall assembly render showing steel frame, gypsum, air barrier, clips, insulation and metal cladding |
| mongrain-foundation-systems-3d-cutaway.webp | Interactive 3D cutaway of a below-grade foundation wall with waterproofing, insulation and drainage layers |
| mongrain-bim-style-envelope-section-3d.webp | BIM-style 3D building envelope section with 24 labeled components from footing to parapet |

### Internal links

| Anchor text | Target |
| --- | --- |
| Denver web design portfolio | /work |
| web design Denver ("Need a full site around your model? See web design in Denver.") | / |
| Book a free consultation | /contact |
| Inbound: Home 3D spotlight, Work card 08 and About use "3D architectural visualization" | this page |

### JSON-LD

Paste the `@graph` from `pages/3d-visualization/SEO.md` section 5 (PR #7) unchanged: WebPage, BreadcrumbList, Service `#service`, CreativeWork `#mongrain` and FAQPage. Swap in the four Wix image URLs after upload. Before publishing, confirm with Mongrain that their name can be shown.

## Packages (/packages)

Packages owns **website maintenance plans** and, since there is no separate SEO page, also carries **SEO and GEO services Denver** in a native section. Copy follows PR #6's SEO kit with three fixes: a native SEO & GEO block (the embed's version is in the iframe and doesn't count), links that pointed at /services and /seo-geo now point at pages that exist, and the breadcrumb drops the Services step.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /packages |
| Title tag (60 chars) | Website Maintenance Plans & Growth Packages \| Snowden Design |
| Meta description (151 chars) | Monthly website care plans: hosting, updates, security, GA4 reports, SEO/GEO, Google Ads and social media management from Snowden Design in Denver, CO. |
| og:title | Website maintenance plans that keep climbing: Basecamp, Ascent, Summit |
| og:description | Managed Wix hosting, SEO and GEO, social media, Google Ads and a monthly GA4 report from a Denver studio. Compare the three plans. |
| og:image | Branded card with the three plan names and the sample GA4 tile, 1200 × 630, `website-maintenance-plans-denver-og.jpg` |
| Canonical | https://www.snowden-design.com/packages |
| Robots | index, follow |

### Keywords

- **Primary:** website maintenance plans
- **Secondary:** website care plan Denver; managed Wix hosting; SEO and GEO services Denver; Google Ads management Denver; social media management; monthly GA4 report; Google Business Profile management

### Page copy, top to bottom

**1. Intro band \[Native\]** (style the H1 in Google Sans Flex 800, 28 to 34 px, not Archivo as PR #6 says)

- H1: **Website maintenance plans and growth packages**
- Intro: Snowden Design's website maintenance plans keep your Wix site fast, secure and growing after launch. Three monthly plans, Basecamp, Ascent and Summit, cover managed hosting, backups and edits, SEO and GEO, AI-assisted social media, Google Ads and a Google Analytics 4 report every month, for businesses in Denver and across Colorado.
- Date line: Updated October 2026

**2. Plans, comparison table and sample dashboard \[Embed\]** `snowden-packages.html`. Accessible name: "Basecamp, Ascent and Summit website maintenance plans with a sample GA4 report".

**3. Plan summaries \[Native, three short blocks under the embed so tier names and inclusions are crawlable\]**

- H2: **Compare the three website maintenance plans**
- H3: **Basecamp: website care.** Managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, 1 hour of edits a month, a quarterly technical SEO check and a monthly GA4 report. \[$ \] per month.
- H3: **Ascent: SEO, GEO and social.** Everything in Basecamp with 3 hours of edits, plus monthly SEO and GEO, Google Business Profile management, 1 new article a month, 8 AI-assisted social posts a month on 2 platforms, a live analytics dashboard and a quarterly strategy call. \[$ \] per month.
- H3: **Summit: ads and performance.** Everything in Ascent with 6 hours of edits, plus Google Ads and Meta ads management, 16 social posts a month on 3 platforms, email newsletter and lead follow-up automation, 2 new articles a month and a monthly strategy call. \[$ \] per month plus ad spend.
- Buttons: Start with Basecamp / Ascent / Summit → /contact?plan=basecamp | ascent | summit

**4. SEO and GEO \[Native, add a Wix anchor named `seo-geo` here\]**

- H2: **SEO and GEO services in Denver**
- Answer-first body: Snowden Design's SEO and GEO services help Denver and Colorado businesses get found two ways: ranking in Google search and Maps, and being cited when people ask AI assistants such as ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude. Both are included in the Ascent and Summit plans.
- H3: **SEO: rank where people search.** Page speed and Core Web Vitals, titles and descriptions that earn the click, crawl and index fixes, internal links, and local presence through Google Business Profile and reviews.
- H3: **GEO: be the answer AI gives.** Structured data that names who you are, where you work and what you offer; clear, quotable answers to customer questions; consistent facts across the web; and a monthly check of whether AI assistants name your business.

**5. FAQ \[Native, H2 + nine H3s; matches the PR #6 FAQPage schema word for word\]**

- H2: **Questions about website maintenance plans**
- H3: **What is included in a website maintenance plan?** A Snowden Design website maintenance plan covers managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, content edits and a monthly Google Analytics 4 report. Higher plans add SEO and GEO, Google Business Profile management, new articles, AI-assisted social media, Google Ads and customer email follow-up.
- H3: **How much does a website maintenance plan cost?** Basecamp is \[$ \] per month, Ascent is \[$ \] per month and Summit is \[$ \] per month plus ad spend, which is paid directly to Google and Meta. Every plan includes managed hosting and a monthly GA4 report, and one-time projects such as 3D rendering are quoted separately.
- H3: **What is GEO and how is it different from SEO?** Search engine optimization (SEO) helps your pages rank in Google's search results. Generative engine optimization (GEO) helps AI assistants such as ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude understand your business, trust it and cite it in their answers. Both rely on fast pages, clear structured data and content that answers real questions.
- H3: **How do I get my business mentioned by ChatGPT or Google AI Overviews?** Make your business easy to identify and quote: structured data that names your business, services and service area; clear answers to the questions customers ask; the same name, phone and address everywhere online; reviews and mentions on trusted sites; and a robots.txt file that lets AI crawlers read your site.
- H3: **What should a monthly website analytics report include?** A useful monthly report compares users, sessions, engagement rate and leads with last month, breaks traffic down by channel with AI assistant referrals shown on their own, lists top pages and Google search queries, counts leads by source, and ends with a plain-language summary of what changed and what comes next.
- H3: **Do I need Google Ads if I have good SEO?** Not always. SEO builds traffic that compounds over months, while Google Ads buys visibility today for searches you don't rank for yet, seasonal offers or new services. Many businesses run both: ads for fast leads and testing, SEO for a lower cost per lead over time.
- H3: **Does AI write my social media posts?** AI helps research topics, draft options and pick posting times. A person at Snowden Design edits and approves every post before it goes live, so everything that carries your name sounds like you.
- H3: **Can I change plans later?** Yes. Most clients start on the plan that fits their launch and move up as the site grows. Plans can be changed at the next billing cycle.
- H3: **Do you offer 3D modeling and rendering?** Yes. Snowden Design creates 3D product, architectural and environment models, photoreal renderings and turntable animations as add-on projects that can be used on your website, in ads and on social media. **Suggested edit:** end with "See an example of 3D architectural visualization." linking to /3d-visualization, and have BLAKE confirm product and environment work before keeping those words.

**6. CTA \[Native, dark\]**

- H2: **Pick your altitude.**
- Body: Not sure which plan fits? Tell me where the site is today and where you want it in a year.
- Buttons: Book a free consultation → /contact · Call 720-340-2611

### Images and alt text

| File name | Alt text |
| --- | --- |
| website-maintenance-plans-denver-og.jpg | Snowden Design website maintenance plans: Basecamp, Ascent and Summit |
| sample-ga4-website-report.webp (if the dashboard is also shown as a native image) | Sample monthly Google Analytics 4 website report with users, leads and AI assistant referrals |
| Embed icons, mountain line art | (empty alt, decorative) |

### Internal links (fixes for the embed in PR #6)

| Current link in embed | Change to | Anchor text |
| --- | --- | --- |
| /services | / (Home services section, Wix anchor `services`) | web design Denver |
| /seo-geo | /packages#seo-geo | SEO and GEO services in Denver |
| /work with "3D product rendering services" | /3d-visualization | 3D architectural visualization |
| /contact?plan=… | unchanged | Start with Basecamp / Ascent / Summit |
| embed nav "Services" | Remove, or point to / | Home |

### JSON-LD

Use the `@graph` in `pages/packages/SEO-KIT.md` section 4 (PR #6), with two edits: delete the BreadcrumbList item "Services" and renumber "Growth packages" to position 2, and change the `#3d-rendering` Service `url` from /work to /3d-visualization. Fill the three prices on the page and in the FAQ answer together, or remove that question from both.

## About (/about)

About owns **Denver web developer and 3D artist** and is the page AI assistants use to answer "who is Blake Snowden?". PR #3's native hero and two answer blocks are kept word for word; this deck adds a third answer, moves the story paragraph into native text, and adds FAQPage markup so the answers are machine-readable.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /about |
| Title tag (54 chars) | About Blake Snowden \| Denver Web Developer & 3D Artist |
| Meta description (157 chars) | Blake Snowden is a Denver web developer and 3D artist who builds Wix websites, renders products in 3D and runs SEO and GEO growth plans for small businesses. |
| **Suggested meta (142 chars)** | Blake Snowden is a Denver web developer and 3D artist who builds Wix websites, interactive 3D and SEO/GEO growth plans for B2B and B2C brands. |
| og:title | Blake Snowden, Denver web developer and 3D artist |
| og:description | The person behind Snowden Design: strategy, design, media and code from one desk in Denver, Colorado. |
| og:image | Branded card now; new high-resolution portrait when available, 1200 × 630 |
| Canonical | https://www.snowden-design.com/about |
| Robots | index, follow |

The suggested meta drops "renders products in 3D", which the portfolio doesn't show yet (update PR #3).

### Keywords

- **Primary:** Denver web developer and 3D artist
- **Secondary:** Blake Snowden; Snowden Design Denver; B2B and B2C business development; Wix Studio designer

### Page copy, top to bottom

**1. Hero \[Native, dark\] (PR #3)**

- Eyebrow: ABOUT THE STUDIO / DENVER, COLORADO
- H1: **Blake Snowden, Denver web developer and 3D artist.**
- Intro: I'm Blake Snowden, a Denver web developer and 3D artist. I build Wix websites, render products in 3D and run SEO and GEO growth plans, with strategy, design, media and code coming from the same desk. **Suggested:** "…I build Wix websites, interactive 3D and SEO and GEO growth plans, with strategy, design, media and code coming from the same desk."
- Button: Book a free consultation → /contact
- Signature \[Embed\]: `shared/snowden-signature.html`

**2. Answer blocks \[Native, two columns\] (PR #3 + one new)**

- H2: **Who is Blake Snowden?** Blake Snowden is a web developer and 3D artist in Denver, Colorado, and the founder of Snowden Design. He designs and builds Wix websites, creates graphics, video and 3D product renders, and pairs that with B2B and B2C business development strategy, so one person is accountable from the first plan to launch.
- H2: **What does Snowden Design do?** Snowden Design is a Denver web design studio. It builds Wix websites and handles UX, SEO and GEO, graphics, digital art and 3D, video and drone footage, brand consulting, digital marketing, lead generation and project management for clients across Colorado and the US.
- H2 (new): **Why work with one lead instead of an agency?** With Snowden Design, the person planning your site is the one designing it, filming it and building it. Nothing gets lost between a strategist, a designer and a developer, decisions happen in one conversation, and you always know who is accountable for the result.

**3. Story \[Native, moved out of the embed\]**

- H2: **One lead, full spectrum.**
- H3: **Hi, I'm Blake.**
- Body 1: I'm a Denver web developer and 3D artist, and the designer behind Snowden Design. I build Wix websites that blend art and technology into interactive, engaging experiences, create interactive 3D, and make much of the content that fills them: graphics, digital art, video and drone footage.
- Body 2: I pair the creative work with full-spectrum business development strategy for B2B and B2C clients, backed by a deep technical understanding of the nuances it takes to close sophisticated, high-value deals.
- Fact row: Based in Denver, Colorado · Clients B2B and B2C · Builds on Wix Studio, plus custom code · Approach Full Spectrum Strategy
- Portrait \[Native image, 340 px\]: alt text below

**4. Services, principles, client list, motto \[Embed\]** `snowden-about.html` (PR #3). Its H2s stay as they are: "Every discipline a launch needs.", "More than a showcase.", "Brands I've built for.". If the story moves native, cut it from the embed and re-measure the embed height.

**5. Client links \[Native text line under the embed\]** Helen Falls Lodge, Shadow Creek Ranch, Schultz's Gourmet, Pasta Jay's, Mojo Broadband, Edge Internet and Apes Brain. Link: "See the Denver web design portfolio" → /work. Link: "3D architectural visualization for Mongrain" → /3d-visualization.

**6. CTA \[Native, dark\]**

- H2: **Prepare for success.**
- Body: Tell me about the brand, the audience and the deadline. I'll come back with a plan.
- Buttons: Start a project → /contact · 720-340-2611 · blake@snowden-design.com

### Images and alt text

| File name | Alt text |
| --- | --- |
| blake-snowden-denver-web-developer-3d-artist.webp | Blake Snowden, Denver web developer and 3D artist, founder of Snowden Design |
| Geometric signature, section numbers | (empty alt, decorative) |

### Internal links

| Anchor text | Target |
| --- | --- |
| See the Denver web design portfolio | /work |
| 3D architectural visualization for Mongrain | /3d-visualization |
| website maintenance plans (in the services embed "Grow" card) | /packages |
| Book a free consultation / Start a project | /contact |

### JSON-LD \[SEO panel › Structured data markup\]

Replaces PR #3's two blocks with one graph that adds the FAQ.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.snowden-design.com/about#webpage",
      "url": "https://www.snowden-design.com/about",
      "name": "About Blake Snowden | Denver Web Developer & 3D Artist",
      "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
      "mainEntity": { "@id": "https://www.snowden-design.com/about#blake" },
      "about": { "@id": "https://www.snowden-design.com/#business" },
      "inLanguage": "en-US",
      "dateModified": "2026-10-25"
    },
    {
      "@type": "Person",
      "@id": "https://www.snowden-design.com/about#blake",
      "name": "Blake Snowden",
      "jobTitle": "Web Developer and 3D Artist",
      "worksFor": { "@id": "https://www.snowden-design.com/#business" },
      "url": "https://www.snowden-design.com/about",
      "email": "blake@snowden-design.com",
      "homeLocation": { "@type": "City", "name": "Denver" },
      "knowsAbout": ["Wix Studio", "Web development", "User experience design", "3D modeling", "3D architectural visualization", "Three.js", "SEO", "GEO", "Video production", "Drone videography", "Business development strategy"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/about#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Who is Blake Snowden?", "acceptedAnswer": { "@type": "Answer", "text": "Blake Snowden is a web developer and 3D artist in Denver, Colorado, and the founder of Snowden Design. He designs and builds Wix websites, creates graphics, video and 3D product renders, and pairs that with B2B and B2C business development strategy, so one person is accountable from the first plan to launch." } },
        { "@type": "Question", "name": "What does Snowden Design do?", "acceptedAnswer": { "@type": "Answer", "text": "Snowden Design is a Denver web design studio. It builds Wix websites and handles UX, SEO and GEO, graphics, digital art and 3D, video and drone footage, brand consulting, digital marketing, lead generation and project management for clients across Colorado and the US." } },
        { "@type": "Question", "name": "Why work with one lead instead of an agency?", "acceptedAnswer": { "@type": "Answer", "text": "With Snowden Design, the person planning your site is the one designing it, filming it and building it. Nothing gets lost between a strategist, a designer and a developer, decisions happen in one conversation, and you always know who is accountable for the result." } }
      ]
    }
  ]
}
```

Add `"image"` once there is a headshot URL and `"sameAs": ["<LinkedIn URL>"]` once confirmed. If BLAKE drops "3D product renders" from the first answer, change it in the schema too.

## Contact (/contact)

Contact owns **contact a Denver web designer** and should convert, not just rank. PR #4's native hero, form and answer block are kept word for word; this deck adds two short answers people ask before they reach out, and FAQPage markup for them.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /contact (rename from /contact-1, 301 the old slug) |
| Title tag (59 chars) | Contact Snowden Design \| Denver Web Designer \| 720-340-2611 |
| Meta description (149 chars) | Book a free website consultation with Snowden Design in Denver. Call 720-340-2611 or email blake@snowden-design.com for a quote on design, 3D or SEO. |
| og:title | Contact Snowden Design, a Denver web designer |
| og:description | Tell me about your brand, your audience and your timing. Call 720-340-2611 or email blake@snowden-design.com. |
| og:image | Default branded card |
| Canonical | https://www.snowden-design.com/contact |
| Robots | index, follow |

### Keywords

- **Primary:** contact a Denver web designer
- **Secondary:** hire a web designer in Denver; free website consultation Denver; web development and digital marketing consultation

### Page copy, top to bottom

**1. Hero \[Native, dark\] (PR #4)**

- Eyebrow: TAKING NEW PROJECTS / DENVER, COLORADO
- H1: **Contact a Denver web designer.**
- Intro: Tell me about your brand, your audience and your timing. Snowden Design builds Wix websites, 3D product renders and SEO and GEO growth plans from Denver, Colorado. **Suggested:** swap "3D product renders" for "interactive 3D" (update PR #4).
- Buttons: Call 720-340-2611 → tel:+17203402611 · Email blake@snowden-design.com → mailto:blake@snowden-design.com

**2. What happens next \[Embed\]** `snowden-contact.html` (PR #4): H2 "From hello to a plan.", steps "I read your note", "Discovery call", "Your plan", then H2 "Tell me what you're building."

**3. Form \[Native Wix Form\] (PR #4)**

- Fields: Name\* · Email\* · Phone · Project type\* (Web design and development; Branding, graphics and 3D; Video; SEO and GEO; Marketing and lead generation; Something else) · Tell me about the project\* (placeholder "A few lines is plenty")
- Field labels are visible text, not only placeholders (accessibility and form SEO)
- Submit: Start the conversation
- Success: Thanks. I'll be in touch.
- Prefill: when the URL carries `?plan=basecamp|ascent|summit` or `?service=3d-rendering`, set Project type to match (Wix Forms supports URL prefill without Velo; if not, ignore the parameter)

**4. Answer blocks \[Native\]**

- H2: **How do I start a project with Snowden Design?** Send the form above, call 720-340-2611 or email blake@snowden-design.com. Blake Snowden replies personally with a few questions, then sets up a discovery call about your business, content and goals. You leave with a plan covering scope, timing and the next step to launch.
- H3 (new): **Is the first consultation free?** \[BLAKE to confirm\] Yes. The first discovery call with Snowden Design is free and has no obligation. It covers your goals, audience, existing content and timing, and ends with a clear next step and, if it fits, a written quote.
- H3 (new): **How quickly will I hear back?** Blake Snowden reads every message himself and replies within \[one business day\]. Calls to 720-340-2611 that go to voicemail are returned the same way.

**5. Service area line \[Native, small text above the footer\]** Snowden Design works from Denver, Colorado, with clients across the Front Range, Colorado and the US. Meetings in person around Denver or online.

### Images and alt text

No content images. Signature and step icons get empty alt.

### Internal links

| Anchor text | Target |
| --- | --- |
| web design Denver ("Not ready to talk? See web design in Denver first.") | / |
| website maintenance plans | /packages |
| Denver web design portfolio | /work |

### JSON-LD \[SEO panel › Structured data markup\]

If the `#business` block runs site-wide from Custom Code, this graph is all the page needs. Keep the two new FAQ entries only once the bracketed facts are confirmed.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.snowden-design.com/contact#webpage",
      "url": "https://www.snowden-design.com/contact",
      "name": "Contact Snowden Design | Denver Web Designer | 720-340-2611",
      "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
      "about": { "@id": "https://www.snowden-design.com/#business" },
      "inLanguage": "en-US",
      "dateModified": "2026-10-25"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/contact#faq",
      "mainEntity": [
        { "@type": "Question", "name": "How do I start a project with Snowden Design?", "acceptedAnswer": { "@type": "Answer", "text": "Send the form above, call 720-340-2611 or email blake@snowden-design.com. Blake Snowden replies personally with a few questions, then sets up a discovery call about your business, content and goals. You leave with a plan covering scope, timing and the next step to launch." } },
        { "@type": "Question", "name": "Is the first consultation free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The first discovery call with Snowden Design is free and has no obligation. It covers your goals, audience, existing content and timing, and ends with a clear next step and, if it fits, a written quote." } },
        { "@type": "Question", "name": "How quickly will I hear back?", "acceptedAnswer": { "@type": "Answer", "text": "Blake Snowden reads every message himself and replies within [one business day]. Calls to 720-340-2611 that go to voicemail are returned the same way." } }
      ]
    }
  ]
}
```

## Privacy Policy (/privacy-policy) and 404 page

The privacy page targets no keyword; it exists for trust, GA4 and ad-platform requirements, and is linked from the footer only. This is a plain-language draft for a small studio using Wix Forms and GA4, not legal advice; have it checked if you run ads in regulated markets or collect payments.

### SEO panel

| Field | Value |
| --- | --- |
| URL slug | /privacy-policy |
| Title tag | Privacy Policy \| Snowden Design |
| Meta description | How Snowden Design collects, uses and protects the information you share through this website, including contact forms and analytics. |
| Robots | index, follow (keep it indexable; it supports trust signals) |
| Menu | Hidden from the header, linked in the footer |

### Page copy \[Native text\]

- H1: **Privacy Policy**
- Date line: Last updated October 25, 2026
- Intro: Snowden Design ("we") runs www.snowden-design.com from Denver, Colorado. This page explains what information we collect through the site, why, and the choices you have.
- H2: **Information you give us.** When you send the contact form, call or email, we receive your name, email address, phone number if you add it, and what you tell us about your project. We use it only to reply, prepare a proposal and run the project.
- H2: **Information collected automatically.** The site uses Google Analytics 4 and Wix's built-in tools to count visits, pages viewed, approximate location, device type and how you arrived. This data is aggregated and is used to improve the site. It does not identify you by name.
- H2: **Cookies.** Wix and Google Analytics set cookies to keep the site working and to measure traffic. You can block or delete cookies in your browser settings; the site still works without analytics cookies.
- H2: **Who we share it with.** We don't sell your information. It is stored by our service providers, Wix (website hosting and forms) and Google (analytics and email), only to run the site and our business, or when the law requires it.
- H2: **How long we keep it.** Contact messages are kept while we're talking and for the length of any project, then for up to \[three\] years for our records. Analytics data is kept for \[14\] months.
- H2: **Your choices.** You can ask to see, correct or delete the information you've sent us. Email blake@snowden-design.com or call 720-340-2611, and we'll respond within 30 days.
- H2: **Children.** This site is for businesses and isn't directed at children under 13.
- H2: **Changes.** If this policy changes, the date at the top changes too.
- H2: **Contact.** Snowden Design · Denver, Colorado · 720-340-2611 · blake@snowden-design.com

### JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.snowden-design.com/privacy-policy#webpage",
  "url": "https://www.snowden-design.com/privacy-policy",
  "name": "Privacy Policy | Snowden Design",
  "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
  "publisher": { "@id": "https://www.snowden-design.com/#business" },
  "dateModified": "2026-10-25"
}
```

### 404 page \[Native, Wix › Pages › 404\]

- H1: **This page wandered off the trail.**
- Body: The link may be old, or the page has moved. Try one of these instead.
- Links: Web design in Denver → / · See the work → /work · 3D Visualization → /3d-visualization · Website maintenance plans → /packages · Contact → /contact
- Robots: noindex (Wix sets this automatically on the 404 page)

## SEO checklist results and PR updates

All seven pages pass the on-page checklist as written; what's left is eight facts only BLAKE can supply and six PR updates. Title and meta lengths were counted by script, every JSON-LD block parses as valid JSON, and every FAQ answer in the schema matches the visible copy word for word. Run Google's Rich Results Test on each live URL after publishing, since that can't be done before the pages exist.

### Checklist by page

| Check | Home | Work | 3D | Packages | About | Contact | Privacy |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Title ≤ 60 chars, keyword first, brand last | Pass (54) | Pass (56) | Pass (54) | Pass (60) | Pass (54) | Pass (59) | Pass (31) |
| Meta 140–160 chars with an action | Pass (146) | Pass (148) | Pass (152) | Pass (151) | Pass (157) | Pass (149) | 133, fine for a legal page |
| Clean slug, 301 from old URL | / | /work ← /projects | Pass | Pass | Pass | /contact ← /contact-1 | Pass |
| One native H1 with the primary keyword | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Keyword in first 100 words | Pass | Pass | Pass | Pass | Pass | Pass | n/a |
| H2 → H3 order, no skipped levels | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| At least two question headings | 8 | 4 | 7 | 9 | 3 | 3 | n/a |
| Answer-first 40–60 word GEO passage | Pass | Pass | Pass | Pass | Pass | Pass | n/a |
| Ranking text and images native, not in iframe | Pass | Pass | Pass | Pass (adds native plan + SEO/GEO blocks) | Pass (story moved native) | Pass | Pass |
| Descriptive file names + alt text, decorative alt empty | Pass | Pass | Pass | Pass | Pass | Pass | n/a |
| 3+ keyword-anchor internal links, incl. /contact | Pass | Pass | Pass | Pass | Pass | Pass | 404 page links all |
| og:title, og:description, og:image 1200 × 630 | Pass | Pass | Pass | Pass | Pass | Pass | Default |
| Self-referencing canonical, index/follow | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| JSON-LD valid and tied by @id | Pass | Pass | PR #7 graph | PR #6 graph + 2 edits | Pass | Pass | Pass |
| FAQ schema = visible text | Pass | Pass | Pass | Pass | Pass | Pass | n/a |
| NAP footer, 720-340-2611 everywhere | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Visible date / author signal | dateModified | dateModified | Pass | "Updated October 2026" | Person schema | dateModified | "Last updated" |
| Still open | 2 FAQ facts | Case study, Wix per site | Mongrain OK, image URLs | Three prices | Headshot, LinkedIn | 2 FAQ facts | Retention periods |

Site-wide items (robots.txt for AI crawlers, sitemap submission, GA4 key events, Google Business Profile on 720-340-2611, PageSpeed under LCP 2.5 s / CLS 0.1 / INP 200 ms) stay on PR #5's launch checklist.

### What to update in each PR

| PR / branch | Change |
| --- | --- |
| PR #5 SEO/GEO spec | Replace the page table and title/meta table with this deck's seven pages; Work's primary becomes "Denver web design portfolio"; drop the Services, SEO & GEO and Analytics rows; Home meta and the `#business` description change "photorealistic 3D product renders" to "interactive 3D visualization". |
| `main` Home draft | Rebuild to the native/embed split above; change 970.685.8733 to 720-340-2611 (`tel:+17203402611`); point /projects and /contact-1 links at /work and /contact; swap Archivo and IBM Plex for Google Sans Flex and Satoshi; add a Wix anchor named `services` on the services section. |
| PR #3 About | Use the suggested meta and intro (drop "renders products in 3D"); add the third answer block; move the story into native text and re-measure the embed; replace the two JSON-LD blocks with this deck's graph. |
| PR #4 Contact | Intro: "3D product renders" → "interactive 3D"; add the two new answers and the FAQPage graph; update the `#business` description to match Home. |
| PR #6 Packages | Embed links: /services → /, /seo-geo → /packages#seo-geo, Work "3D product rendering services" → /3d-visualization "3D architectural visualization"; remove the embed's "Services" nav item; add the native plan summaries and SEO & GEO section; breadcrumb and `#3d-rendering` url edits; fonts to Google Sans Flex and Satoshi. |
| PR #7 3D Visualization | Replace the "3D product rendering services" sentence with the portfolio link; add the closing CTA. Edit `src/build.py`, not the generated files. |
| Work (Replit) | No edits to Replit's branch. The Work section above is the copy for that thread to use. |

### Facts only BLAKE can supply

- [ ] Website starting price and typical timeline (Home FAQ)
- [ ] Basecamp, Ascent and Summit monthly prices (Packages, page and schema)
- [ ] Is the first consultation free, and how fast are replies? (Contact FAQ; "free consultation" also appears in buttons and metas)
- [ ] Which portfolio sites are on Wix, and the Helen Falls brief and outcomes (Work)
- [ ] Has Snowden Design delivered product or environment 3D work? If not, cut "3D product renders" from About and Packages
- [ ] Mongrain's OK to be named publicly (3D)
- [ ] Google Business Profile, LinkedIn and Instagram URLs for `sameAs`; a high-resolution headshot
- [ ] Data retention periods (Privacy Policy)
