# Contact page: Wix setup

Follows the design direction, the SEO/GEO spec (PR #5) and the copy deck (`docs/copy-deck.md`, PR #9). The H1, intro, contact details, form and answers are **native Wix elements**. The embed holds only the "From hello to a plan" steps and the "Tell me what you're building" panel. Copy in [square brackets] is a fact only Blake can confirm.

## Page structure, top to bottom

| # | Block | Type |
| --- | --- | --- |
| 1 | Site header | Native |
| 2 | Hero | Native dark section + `shared/snowden-signature.html` embed |
| 3 | What happens next + hand-off panel | Embed `pages/contact/snowden-contact.html` |
| 4 | Contact form | Native Wix Form |
| 5 | Answer blocks | Native |
| 6 | Service area line and links | Native |
| 7 | Site footer (NAP) | Native |

### 2. Hero [Native, dark]
Use the same section style as the About hero: Midnight Ink, 40 px radius, 1,240 px content width.
- **Eyebrow:** TAKING NEW PROJECTS / DENVER, COLORADO
- **H1** (Heading 1, Google Sans Flex 800, white; second line in Glacier Aqua): **Contact a Denver / web designer.**
- **Intro:** Tell me about your brand, your audience and your timing. Snowden Design builds Wix websites, interactive 3D and SEO and GEO growth plans from Denver, Colorado.
- **Buttons:**
  - Call 720-340-2611 → `tel:+17203402611` (Glacier Aqua pill)
  - Email blake@snowden-design.com → `mailto:blake@snowden-design.com` (outline pill)
- **Signature embed:** on the right, about 560 × 480 px, transparent. Hide it on phone. Accessible name: "Snowden Design geometric signature, decorative".

### 3. Embed
Embed HTML, full width, paste `snowden-contact.html`. Height: **1,050 px** desktop, **1,190 px** tablet, **1,710 px** phone. Accessible name: "How a Snowden Design project starts". Enter it in the embed's Accessibility settings (Accessible name / title); Wix writes it to the iframe `title`.

### 4. Native Wix Form (Add > Contact & Forms)
Place the form directly under the embed, in a Snow `#FAFCFC` section that is 1,240 px wide.

| Field | Type | Required |
| --- | --- | --- |
| Name | Short text | Yes |
| Email | Email | Yes |
| Phone | Phone | No |
| Project type | Dropdown: Web design and development; Branding, graphics and 3D; Video; SEO and GEO; Marketing and lead generation; Something else | Yes |
| Tell me about the project | Long text, placeholder "A few lines is plenty" | Yes |

- **Labels:** keep them visible, not just placeholders. Satoshi Bold 12 px, uppercase, 0.14em letter spacing, Slate `#4A5F68`.
- **Fields:** Mist `#EEF3F4` fill, 1.5 px border `rgba(10,29,38,.12)`, 20 px radius, Satoshi 16 px, Studio Teal focus border.
- **Submit:** "Start the conversation". Midnight Ink pill with white Satoshi Bold text, Studio Teal `#16B3A6` on hover, at least 48 px tall.
- **Success message:** Thanks. I'll be in touch.
- **Prefill:** if Wix Forms supports URL prefill, set Project type from `?plan=basecamp|ascent|summit` or `?service=3d-rendering`. If it doesn't, ignore the parameter.
- **Notifications:** send submissions to blake@snowden-design.com. In GA4, mark the form submit and `tel:` clicks as key events.

### 5. Answer blocks [Native]
- **H2: How do I start a project with Snowden Design?** Send the form above, call 720-340-2611 or email blake@snowden-design.com. Blake Snowden replies personally with a few questions, then sets up a discovery call about your business, content and goals. You leave with a plan covering scope, timing and the next step to launch.
- **H3: Is the first consultation free?** [Blake to confirm] Yes. The first discovery call with Snowden Design is free and has no obligation. It covers your goals, audience, existing content and timing, and ends with a clear next step and, if it fits, a written quote.
- **H3: How quickly will I hear back?** Blake Snowden reads every message himself and replies within [one business day]. Calls to 720-340-2611 that go to voicemail are returned the same way.

Leave out the two H3 answers, and their schema entries below, until Blake confirms the facts in brackets.

### 6. Service area line [Native, small text above the footer]
Snowden Design works from Denver, Colorado, with clients across the Front Range, Colorado and the US. Meetings in person around Denver or online.

Links:
- "Not ready to talk? See web design in Denver first." → /
- "website maintenance plans" → /packages
- "Denver web design portfolio" → /work

## SEO panel
| Field | Value |
| --- | --- |
| URL slug | /contact (rename from /contact-1, with a 301 from the old slug in SEO > URL Redirect Manager) |
| Title tag | Contact Snowden Design \| Denver Web Designer \| 720-340-2611 |
| Meta description | Book a free website consultation with Snowden Design in Denver. Call 720-340-2611 or email blake@snowden-design.com for a quote on design, 3D or SEO. [Keep "free" only if confirmed.] |
| og:title | Contact Snowden Design, a Denver web designer |
| og:description | Tell me about your brand, your audience and your timing. Call 720-340-2611 or email blake@snowden-design.com. |
| og:image | Default branded card |
| Canonical | https://www.snowden-design.com/contact |
| Robots | index, follow |

## Structured data (Advanced SEO > Structured data markup)
The `#business` block runs site-wide from Settings > Custom Code (see the Home setup), and its description now reads "Denver web design studio building Wix websites, interactive 3D visualization and SEO/GEO growth plans." This graph is all the Contact page needs. Drop the last two FAQ entries until their facts are confirmed.

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

## Facts only Blake can confirm
- [ ] Is the first consultation free? (FAQ, meta description, hero buttons on other pages)
- [ ] How quickly does Blake reply? (replaces [one business day])
