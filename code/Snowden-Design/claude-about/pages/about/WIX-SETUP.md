# About page: Wix setup

Follows the design direction, the SEO/GEO spec (PR #5) and the copy deck (`docs/copy-deck.md`, PR #9). Text that should rank is **native Wix text**. The embed holds the designed middle of the page: mission statement, services, principles, client sites and motto. Copy in [square brackets] is a fact only Blake can confirm.

## Page structure, top to bottom

| # | Block | Type |
| --- | --- | --- |
| 1 | Site header | Native |
| 2 | Hero | Native dark section + `shared/snowden-signature.html` embed |
| 3 | Three answer blocks | Native |
| 4 | Story with portrait and facts | Native |
| 5 | Mission, services, principles, client sites, motto | Embed `pages/about/snowden-about.html` |
| 6 | Client links line | Native |
| 7 | CTA | Native dark section |
| 8 | Site footer (NAP) | Native |

### 2. Hero [Native, dark]
- **Section:** 1,240 px content width, 40 px radius, Midnight Ink `#0A1D26` with an optional Atlantic `#123440` glow at the top right. Padding: 120 px top, 72 px bottom, 64 px sides.
- **Eyebrow** (Satoshi Bold 12 px, uppercase, 0.14em letter spacing, Glacier Aqua): ABOUT THE STUDIO / DENVER, COLORADO
- **H1** (Heading 1, Google Sans Flex 800, 64 to 96 px, white; second line in Glacier Aqua `#7FE0D4`): **Blake Snowden, / Denver web developer and 3D artist.**
- **Intro** (Satoshi 19 px, white at 80%): I'm Blake Snowden, a Denver web developer and 3D artist. I build Wix websites, interactive 3D and SEO and GEO growth plans, with strategy, design, media and code coming from the same desk.
- **Button:** Book a free consultation → /contact. Glacier Aqua pill, Midnight Ink text, 48 px tall. [Keep "free" only if Blake confirms it.]
- **Signature:** Embed HTML with `shared/snowden-signature.html` (transparent background), about 560 × 520 px on the right half. On phone, set it to full width at 50% opacity, or hide it. Accessible name: "Snowden Design geometric signature, decorative".

### 3. Answer blocks [Native, two columns; Snow background]
- **H2: Who is Blake Snowden?** Blake Snowden is a web developer and 3D artist in Denver, Colorado, and the founder of Snowden Design. He designs and builds Wix websites, creates graphics, video and 3D product renders, and pairs that with B2B and B2C business development strategy, so one person is accountable from the first plan to launch. [If Blake hasn't delivered product renders, change "3D product renders" to "interactive 3D", here and in the schema.]
- **H2: What does Snowden Design do?** Snowden Design is a Denver web design studio. It builds Wix websites and handles UX, SEO and GEO, graphics, digital art and 3D, video and drone footage, brand consulting, digital marketing, lead generation and project management for clients across Colorado and the US.
- **H2: Why work with one lead instead of an agency?** With Snowden Design, the person planning your site is the one designing it, filming it and building it. Nothing gets lost between a strategist, a designer and a developer, decisions happen in one conversation, and you always know who is accountable for the result.

### 4. Story [Native]
Two columns: the portrait on the left, at 340 px with a 28 px radius, and the text on the right.
- **H2:** One lead, full spectrum.
- **H3:** Hi, I'm Blake.
- **Body 1:** I'm a Denver web developer and 3D artist, and the designer behind Snowden Design. I build Wix websites that blend art and technology into interactive, engaging experiences, create interactive 3D, and make much of the content that fills them: graphics, digital art, video and drone footage.
- **Body 2:** I pair the creative work with full-spectrum business development strategy for B2B and B2C clients, backed by a deep technical understanding of the nuances it takes to close sophisticated, high-value deals.
- **Fact row:** four small columns, each with a 1.5 px Midnight Ink rule above it. Each has a Studio Teal label (Satoshi Bold 12 px, uppercase) and a value in Google Sans Flex 700 at 18 px:
  - BASED IN: Denver, Colorado
  - CLIENTS: B2B and B2C
  - BUILDS ON: Wix Studio, plus custom code
  - APPROACH: Full Spectrum Strategy
- **Portrait:** native image. File name `blake-snowden-denver-web-developer-3d-artist.webp`. Alt text: "Blake Snowden, Denver web developer and 3D artist, founder of Snowden Design". [Swap in a high-resolution headshot when there is one.]

### 5. Embed
Embed HTML, full width, paste `snowden-about.html`. Height: **3,300 px** desktop, **3,490 px** tablet, **4,480 px** phone. Accessible name: "Snowden Design services, principles and client sites". Enter it in the embed's Accessibility settings (Accessible name / title); Wix writes it to the iframe `title`. Its links already point to /packages (website maintenance plans) and /work (See the Denver web design portfolio).

### 6. Client links line [Native, small text under the embed]
Helen Falls Lodge, Shadow Creek Ranch, Schultz's Gourmet, Pasta Jay's, Mojo Broadband, Edge Internet and Apes Brain. Add two links: "See the Denver web design portfolio" → /work, and "3D architectural visualization for Mongrain" → /3d-visualization.

### 7. CTA [Native, dark]
Use the same section style as the hero.
- **H2:** Prepare for success.
- **Body:** Tell me about the brand, the audience and the deadline. I'll come back with a plan.
- **Buttons:**
  - Start a project → /contact (Glacier Aqua pill)
  - 720-340-2611 → `tel:+17203402611`
  - blake@snowden-design.com → `mailto:blake@snowden-design.com`

## SEO panel
| Field | Value |
| --- | --- |
| URL slug | /about |
| Title tag | About Blake Snowden \| Denver Web Developer & 3D Artist |
| Meta description | Blake Snowden is a Denver web developer and 3D artist who builds Wix websites, interactive 3D and SEO/GEO growth plans for B2B and B2C brands. |
| og:title | Blake Snowden, Denver web developer and 3D artist |
| og:description | The person behind Snowden Design: strategy, design, media and code from one desk in Denver, Colorado. |
| og:image | Branded card for now; a new 1200 × 630 portrait when available |
| Canonical | https://www.snowden-design.com/about |
| Robots | index, follow |

## Structured data (Advanced SEO > Structured data markup)
Paste this one graph. It replaces the earlier two blocks. The `#business` block runs site-wide from Settings > Custom Code (see the Home setup).

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

Add `"image"` to the Person once there is a headshot URL, and `"sameAs": ["[LinkedIn URL]"]` once that's confirmed. The FAQ text must match the visible answers word for word.

## Facts only Blake can confirm
- [ ] Is the first consultation free? (hero button)
- [ ] Has Snowden Design delivered product 3D renders? If not, use "interactive 3D" in the first answer and the schema.
- [ ] A high-resolution headshot, and the LinkedIn URL
