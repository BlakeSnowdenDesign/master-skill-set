# Request a Proposal page: Wix setup

A three-step proposal form modeled on The Old State's [Request a Proposal](https://www.theoldstate.com/request-a-proposal) page: a short "let's work together" hero, the form as the centerpiece, and a contact block beside it. Their form loads by script and could not be read, so the fields below are written for Snowden Design rather than copied.

The site has Velo disabled and an Embed HTML element can't submit to Wix, so **everything on this page is native**: the hero, the form (a native Wix Form), the side panels and the answer blocks. `preview.html` in this folder shows the designed look; it is a reference, not code to paste. Copy in [square brackets] is a fact only Blake can confirm.

## Page
- **Page name:** Request a Proposal
- **Slug:** `/request-a-proposal`
- **Menu:** add it as the header's call-to-action button ("Request a proposal") and as a footer link. Point the "Get a quote" style buttons on Home, Packages and 3D Visualization here.

## Page structure, top to bottom

| # | Block | Type |
| --- | --- | --- |
| 1 | Site header | Native |
| 2 | Hero | Native dark section, optional `shared/snowden-signature.html` embed |
| 3 | Form (left) + What happens next and Rather talk now? panels (right) | Native Wix Form + native containers |
| 4 | Answer blocks | Native |
| 5 | Site footer (NAP) | Native |

### 2. Hero [Native, dark]
Same section style as the Contact and About heroes: Midnight Ink `#0A1D26`, 40 px radius, 1,240 px content width. On the right, either the transparent cube signature embed (about 560 × 480 px, hidden on phone, accessible name "Snowden Design geometric signature, decorative") or the isometric cube pattern from the preview as a background image at about 50% opacity.
- **Eyebrow** (Satoshi Bold 12 px, uppercase, 0.14em, Glacier Aqua `#7FE0D4`, amber dot): REQUEST A PROPOSAL / DENVER, COLORADO
- **H1** (Heading 1, Google Sans Flex 800, white; second line in Glacier Aqua): **Have a project in mind? / Let's put it on paper.**
- **Intro:** Tell me what you're building, who it's for and when it needs to launch. I'll come back with a written proposal for your website, 3D or SEO and GEO work: scope, timeline and price, in plain language.
- **Buttons:**
  - Start the proposal → anchor to the form section (Glacier Aqua pill)
  - Call 720-340-2611 → `tel:+17203402611` (outline pill)

### 3. Form section [Native, Snow `#FAFCFC`, 1,240 px]
Two columns on desktop, about 60/40, 56 px gap. On tablet and phone the right column stacks under the form.

Above the form (left column):
- Eyebrow: THREE SHORT STEPS
- **H2:** Send me the brief.
- Text (Slate `#4A5F68`): About three minutes. Rough answers are fine. Anything you're not sure about, we'll work out on the call.

#### The Wix Form (Add > Contact & Forms > Wix Forms)
Make it a **multi-step form** (Form settings > Add step), three steps. If multi-step isn't available on the plan, use one form with the three step titles as section headings.

**Step 1: About you** (helper text: Who should the proposal go to?)

| Field | Wix field type | Required | Notes |
| --- | --- | --- | --- |
| Name | Short answer (or Contact > Full name) | Yes | Error: Please add your name. |
| Company or organization | Short answer | No | |
| Email | Email (Contact > Email) | Yes | Error: Please add an email I can reply to. |
| Phone | Phone (Contact > Phone) | No | Placeholder (720) 555-0123 |
| Current website | Website / URL | No | Placeholder `https://`, help text: Leave it blank if you're starting fresh. |

**Step 2: The project** (helper text: Pick everything that applies.)

| Field | Wix field type | Required | Options |
| --- | --- | --- | --- |
| What do you need? | Multi checkbox, two columns | Yes, at least one | Website design and development; 3D visualization and rendering; SEO and GEO; Branding and graphics; Video; Marketing and lead generation; Brand consulting or project management; Website care plan |
| Where are you starting from? | Dropdown | No | A brand-new website; Redesigning a site I already have; Adding to or fixing my current site; Ongoing help after launch; Not sure yet |
| Tell me about the project | Long answer | Yes | Placeholder: What does the business do, who are the customers, and what should the new work change? Error: A few lines is plenty. |

**Step 3: Budget and timing** (helper text: A range helps me shape the right scope, not a bigger one.)

| Field | Wix field type | Required | Options |
| --- | --- | --- | --- |
| Budget range | Dropdown | Yes | [Blake to confirm the ranges against the Packages prices] Under $3,000; $3,000 – $7,500; $7,500 – $15,000; $15,000 – $30,000; $30,000+; Not sure yet |
| When do you want to launch? | Dropdown | Yes | As soon as possible; In 1–3 months; In 3–6 months; Later this year or next; I'm flexible |
| How did you find Snowden Design? | Dropdown | No | Google or another search engine; ChatGPT, Gemini or another AI assistant; Referral from a client or friend; Social media; I've seen your work on another site; Something else |

Under step 3, a small text line: I'll use these details only to reply about your project. See the privacy policy. (link "privacy policy" to the Privacy Policy page). Turn on Wix's spam protection (reCAPTCHA) for the form.

**Buttons:** "Next" and "Back" between steps; the final button is **Request my proposal**.

**Success message** (show in place of the form):
> **Got it. Your brief is in.** I read every request myself and reply within [one business day] with a few questions and times for a discovery call.

Optional link under it: "See recent work" → /work.

#### Form design
Match the Contact form so the two feel like one system.
- **Form container:** white, 1.5 px border `rgba(10,29,38,.12)`, 30 px radius, 40 px padding (24 px on phone).
- **Progress:** Wix's step indicator in Studio Teal `#16B3A6` on Mist `#EEF3F4`, step names in Satoshi Bold 11 px uppercase.
- **Labels:** visible above every field, not placeholder-only. Satoshi Bold 12 px, uppercase, 0.14em letter spacing, Slate `#4A5F68`. Required marker in Studio Teal.
- **Fields:** Mist `#EEF3F4` fill, 1.5 px border `rgba(10,29,38,.12)`, 20 px radius, Satoshi 16 px, Studio Teal focus border. Checkbox options as Mist tiles, teal fill when checked.
- **Error text:** 13 px, `#C2412D`.
- **Buttons:** primary is a Midnight Ink pill with white Satoshi Bold text, Studio Teal on hover, at least 48 px tall. Back is an outline pill. On phone both buttons go full width.

#### Prefill and tracking
- If Wix Forms supports URL prefill, tick "What do you need?" from `?service=web|3d|seo` and add `?plan=basecamp|ascent|summit` to the brief. If it doesn't, ignore the parameters.
- **Notifications:** email each submission to blake@snowden-design.com and add the person to Wix Contacts with the label **Proposal request**.
- **Automation** (Automations > Form submitted, optional): send the person a short confirmation email: "Thanks for the brief. I'll reply within [one business day]. Blake, Snowden Design, 720-340-2611."
- **GA4:** mark the form submit and `tel:` clicks as key events, the same as Contact.

#### Right column panels [Native containers]
**What happens next** (Midnight Ink container, 30 px radius, eyebrow in Glacier Aqua)
- H3: From brief to proposal
- 01 **I read your brief.** Personally, and I reply within [one business day] with a few questions.
- 02 **We talk it through.** A [free] 30-minute discovery call, in person around Denver or online.
- 03 **You get a written proposal.** Scope, timeline, price and the first step to launch. No obligation.

**Rather talk now?** (Mist container)
- 720-340-2611 → `tel:+17203402611`
- blake@snowden-design.com → `mailto:blake@snowden-design.com`
- Snowden Design, Denver, Colorado. Working with clients across the Front Range, Colorado and the US.

### 4. Answer blocks [Native]
- **H2: Before you send it**
- **H3: What's in a Snowden Design proposal?** A written plan with the pages or deliverables, the timeline, a fixed price or price range, what I need from you, and the first step to launch.
- **H3: Do I need an exact budget?** No. A range is enough. It tells me whether to plan a focused launch or a larger build, and the proposal explains what fits inside it.
- **H3: Is there a cost for the proposal?** [Blake to confirm] No. The discovery call and the written proposal are free and carry no obligation.

Leave out the third answer, and its schema entry, until Blake confirms it.

## SEO panel
| Field | Value |
| --- | --- |
| URL slug | /request-a-proposal |
| Title tag | Request a Proposal \| Denver Web Design \| Snowden Design |
| Meta description | Get a written proposal for your website, 3D or SEO project from Snowden Design in Denver. Three short steps, or call 720-340-2611. |
| og:title | Request a proposal from Snowden Design |
| og:description | Tell me what you're building and when it needs to launch. You'll get scope, timeline and price in plain language. |
| og:image | Default branded card |
| Canonical | https://www.snowden-design.com/request-a-proposal |
| Robots | index, follow |

## Structured data (Advanced SEO > Structured data markup)
The site-wide `#business` block (Home setup) already covers the business. Drop the third FAQ entry until it's confirmed.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.snowden-design.com/request-a-proposal#webpage",
      "url": "https://www.snowden-design.com/request-a-proposal",
      "name": "Request a Proposal | Denver Web Design | Snowden Design",
      "isPartOf": { "@id": "https://www.snowden-design.com/#website" },
      "about": { "@id": "https://www.snowden-design.com/#business" },
      "potentialAction": { "@type": "QuoteAction", "target": "https://www.snowden-design.com/request-a-proposal" },
      "inLanguage": "en-US",
      "dateModified": "2026-10-29"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/request-a-proposal#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What's in a Snowden Design proposal?", "acceptedAnswer": { "@type": "Answer", "text": "A written plan with the pages or deliverables, the timeline, a fixed price or price range, what I need from you, and the first step to launch." } },
        { "@type": "Question", "name": "Do I need an exact budget?", "acceptedAnswer": { "@type": "Answer", "text": "No. A range is enough. It tells me whether to plan a focused launch or a larger build, and the proposal explains what fits inside it." } },
        { "@type": "Question", "name": "Is there a cost for the proposal?", "acceptedAnswer": { "@type": "Answer", "text": "No. The discovery call and the written proposal are free and carry no obligation." } }
      ]
    }
  ]
}
```

## Facts only Blake can confirm
- [ ] Budget ranges (should line up with the Packages prices once they're set)
- [ ] Reply time (replaces [one business day], same as Contact)
- [ ] Is the discovery call and proposal free? (process step 02, third answer, its schema entry)
