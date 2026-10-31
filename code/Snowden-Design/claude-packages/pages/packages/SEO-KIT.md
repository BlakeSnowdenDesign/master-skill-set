# Packages page: Wix SEO and GEO kit

Page: `/packages` · Primary keyword: **website maintenance plans** · Also carries **SEO and GEO services Denver** · Follows the copy deck (`docs/copy-deck.md`, PR #9), which supersedes the page table in PR #5.

Wix puts every Embed HTML element in an iframe, and Google gives text inside it little or no credit. The embed carries the visuals (plans, comparison table, sample dashboard, motion); everything that has to rank lives in native Wix elements and the SEO panel. Build the page top to bottom:

| Order | Block | Type |
| --- | --- | --- |
| 1 | Intro band: H1, intro, date line | Native |
| 2 | Plans, comparison table, SEO/GEO and AI visuals, sample GA4 dashboard, add-ons | Embed (`snowden-packages.html`) |
| 3 | Plan summaries: H2 + three H3s + buttons | Native |
| 4 | SEO and GEO services in Denver (Wix anchor `seo-geo`) | Native |
| 5 | FAQ: H2 + nine H3s | Native |
| 6 | CTA (dark) | Native |

Header, footer and NAP are the site-wide native ones from the copy deck. Type: Google Sans Flex for headings, Satoshi for body, the same as the embed.

## SEO panel

| Field | Value |
| --- | --- |
| URL slug | packages |
| Title tag | Website Maintenance Plans & Growth Packages \| Snowden Design |
| Meta description | Monthly website care plans: hosting, updates, security, GA4 reports, SEO/GEO, Google Ads and social media management from Snowden Design in Denver, CO. |
| og:title | Website maintenance plans that keep climbing: Basecamp, Ascent, Summit |
| og:description | Managed Wix hosting, SEO and GEO, social media, Google Ads and a monthly GA4 report from a Denver studio. Compare the three plans. |
| og:image | `website-maintenance-plans-denver-og.jpg`, 1200 × 630, alt "Snowden Design website maintenance plans: Basecamp, Ascent and Summit" |
| Canonical | https://www.snowden-design.com/packages |
| Robots | index, follow |
| Structured data | The JSON-LD at the end of this file |

## 1. Intro band [Native]

H1 in Google Sans Flex 800, 28 to 34 px.

**Website maintenance plans and growth packages** (H1)

Snowden Design's website maintenance plans keep your Wix site fast, secure and growing after launch. Three monthly plans, Basecamp, Ascent and Summit, cover managed hosting, backups and edits, SEO and GEO, AI-assisted social media, Google Ads and a Google Analytics 4 report every month, for businesses in Denver and across Colorado.

Updated October 2026

## 2. Embed [Embed]

Paste `snowden-packages.html` into an Embed HTML element, full width. Accessible name: "Basecamp, Ascent and Summit website maintenance plans with a sample GA4 report". Enter it in the embed's Accessibility settings (Accessible name / title); Wix writes it to the iframe `title`. The embed's own hero headline is an H2, so the native intro band holds the page's only H1. Heights are in the README table.

## 3. Plan summaries [Native]

**Compare the three website maintenance plans** (H2)

**Basecamp: website care.** (H3) Managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, 1 hour of edits a month, a quarterly technical SEO check and a monthly GA4 report. [$ ] per month.

**Ascent: SEO, GEO and social.** (H3) Everything in Basecamp with 3 hours of edits, plus monthly SEO and GEO, Google Business Profile management, 1 new article a month, 8 AI-assisted social posts a month on 2 platforms, a live analytics dashboard and a quarterly strategy call. [$ ] per month.

**Summit: ads and performance.** (H3) Everything in Ascent with 6 hours of edits, plus Google Ads and Meta ads management, 16 social posts a month on 3 platforms, email newsletter and lead follow-up automation, 2 new articles a month and a monthly strategy call. [$ ] per month plus ad spend.

Buttons: Start with Basecamp → `/contact?plan=basecamp` · Start with Ascent → `/contact?plan=ascent` · Start with Summit → `/contact?plan=summit`

## 4. SEO and GEO [Native, Wix anchor named `seo-geo`]

The embed links here with "SEO and GEO services in Denver" (`/packages#seo-geo`).

**SEO and GEO services in Denver** (H2)

Snowden Design's SEO and GEO services help Denver and Colorado businesses get found two ways: ranking in Google search and Maps, and being cited when people ask AI assistants such as ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude. Both are included in the Ascent and Summit plans.

**SEO: rank where people search.** (H3) Page speed and Core Web Vitals, titles and descriptions that earn the click, crawl and index fixes, internal links, and local presence through Google Business Profile and reviews.

**GEO: be the answer AI gives.** (H3) Structured data that names who you are, where you work and what you offer; clear, quotable answers to customer questions; consistent facts across the web; and a monthly check of whether AI assistants name your business.

## 5. FAQ [Native]

Must match the FAQPage schema word for word.

**Questions about website maintenance plans** (H2)

**What is included in a website maintenance plan?** (H3)

A Snowden Design website maintenance plan covers managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, content edits and a monthly Google Analytics 4 report. Higher plans add SEO and GEO, Google Business Profile management, new articles, AI-assisted social media, Google Ads and customer email follow-up.

**How much does a website maintenance plan cost?** (H3)

Basecamp is [$ ] per month, Ascent is [$ ] per month and Summit is [$ ] per month plus ad spend, which is paid directly to Google and Meta. Every plan includes managed hosting and a monthly GA4 report, and one-time projects such as 3D rendering are quoted separately.

**What is GEO and how is it different from SEO?** (H3)

Search engine optimization (SEO) helps your pages rank in Google's search results. Generative engine optimization (GEO) helps AI assistants such as ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude understand your business, trust it and cite it in their answers. Both rely on fast pages, clear structured data and content that answers real questions.

**How do I get my business mentioned by ChatGPT or Google AI Overviews?** (H3)

Make your business easy to identify and quote: structured data that names your business, services and service area; clear answers to the questions customers ask; the same name, phone and address everywhere online; reviews and mentions on trusted sites; and a robots.txt file that lets AI crawlers read your site.

**What should a monthly website analytics report include?** (H3)

A useful monthly report compares users, sessions, engagement rate and leads with last month, breaks traffic down by channel with AI assistant referrals shown on their own, lists top pages and Google search queries, counts leads by source, and ends with a plain-language summary of what changed and what comes next.

**Do I need Google Ads if I have good SEO?** (H3)

Not always. SEO builds traffic that compounds over months, while Google Ads buys visibility today for searches you don't rank for yet, seasonal offers or new services. Many businesses run both: ads for fast leads and testing, SEO for a lower cost per lead over time.

**Does AI write my social media posts?** (H3)

AI helps research topics, draft options and pick posting times. A person at Snowden Design edits and approves every post before it goes live, so everything that carries your name sounds like you.

**Can I change plans later?** (H3)

Yes. Most clients start on the plan that fits their launch and move up as the site grows. Plans can be changed at the next billing cycle.

**Do you offer 3D modeling and rendering?** (H3)

Yes. Snowden Design creates 3D product, architectural and environment models, photoreal renderings and turntable animations as add-on projects that can be used on your website, in ads and on social media. See an example of 3D architectural visualization. (link the last sentence to /3d-visualization)

The cost answer has price placeholders. Fill the prices on the page, in this answer and in the schema together, or remove the question from both. The 3D answer names product and environment work; keep those words only if Snowden Design has delivered that kind of work (open question in the copy deck).

## 6. CTA [Native, dark]

**Pick your altitude.** (H2)

Not sure which plan fits? Tell me where the site is today and where you want it in a year.

Buttons: Book a free consultation → `/contact` · Call 720-340-2611 → `tel:+17203402611`

## Site-level settings

Robots.txt for AI crawlers, sitemap submission, the `#business` block in Custom Code and the 301s are site-wide items on the copy deck's settings table and PR #5's launch checklist. For client sites, add a GA4 "AI assistants" channel (Admin › Data display › Channel groups; copy the default group and add a channel above Referral) with this source regex: `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai`. Then the dashboard's AI row has data from the first month.

## Embed links

`/` (Home, in the breadcrumb), `/packages#seo-geo`, `/3d-visualization` and `/contact?plan=…` / `/contact?service=3d-rendering`. They only work once `/contact-1` is renamed to `/contact` (with a 301) and the 3D page is live.

## Structured data (Advanced SEO › Structured data markup)

This references `#business`, `#website` and `about#blake`, which the site-wide Custom Code block and the About page define. Check it with the [Rich Results Test](https://search.google.com/test/rich-results) after publishing.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.snowden-design.com/packages#webpage",
      "url": "https://www.snowden-design.com/packages",
      "name": "Website Maintenance Plans & Growth Packages | Snowden Design",
      "description": "Monthly website care plans: hosting, updates, security, GA4 reports, SEO/GEO, Google Ads and social media management from Snowden Design in Denver, CO.",
      "inLanguage": "en-US",
      "dateModified": "2026-10-25",
      "isPartOf": {
        "@id": "https://www.snowden-design.com/#website"
      },
      "about": {
        "@id": "https://www.snowden-design.com/#business"
      },
      "author": {
        "@id": "https://www.snowden-design.com/about#blake"
      },
      "breadcrumb": {
        "@id": "https://www.snowden-design.com/packages#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://www.snowden-design.com/packages#plans"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.snowden-design.com/packages#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.snowden-design.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Growth packages",
          "item": "https://www.snowden-design.com/packages"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.snowden-design.com/packages#plans",
      "name": "Website maintenance plans and growth packages",
      "serviceType": "Website maintenance and digital marketing",
      "provider": {
        "@id": "https://www.snowden-design.com/#business"
      },
      "url": "https://www.snowden-design.com/packages",
      "areaServed": [
        {
          "@type": "City",
          "name": "Denver"
        },
        {
          "@type": "State",
          "name": "Colorado"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Monthly packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Basecamp website care plan",
            "description": "Managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, 1 hour of content edits a month, a quarterly technical SEO check and a monthly Google Analytics 4 report.",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.snowden-design.com/packages#basecamp",
              "name": "Basecamp website care plan",
              "serviceType": "Website maintenance and managed Wix hosting",
              "description": "Managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, 1 hour of content edits a month, a quarterly technical SEO check and a monthly Google Analytics 4 report.",
              "provider": {
                "@id": "https://www.snowden-design.com/#business"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Denver"
                },
                {
                  "@type": "State",
                  "name": "Colorado"
                }
              ]
            }
          },
          {
            "@type": "Offer",
            "name": "Ascent growth plan",
            "description": "Everything in Basecamp with 3 hours of edits, plus monthly SEO and GEO, Google Business Profile management, 1 new article a month, 8 AI-assisted social posts a month on 2 platforms, a live analytics dashboard and a quarterly strategy call.",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.snowden-design.com/packages#ascent",
              "name": "Ascent growth plan",
              "serviceType": "SEO, GEO and social media management",
              "description": "Everything in Basecamp with 3 hours of edits, plus monthly SEO and GEO, Google Business Profile management, 1 new article a month, 8 AI-assisted social posts a month on 2 platforms, a live analytics dashboard and a quarterly strategy call.",
              "provider": {
                "@id": "https://www.snowden-design.com/#business"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Denver"
                },
                {
                  "@type": "State",
                  "name": "Colorado"
                }
              ]
            }
          },
          {
            "@type": "Offer",
            "name": "Summit performance plan",
            "description": "Everything in Ascent with 6 hours of edits, plus Google Ads and Meta ads management, 16 social posts a month on 3 platforms, email newsletter and lead follow-up automation, 2 new articles a month and a monthly strategy call. Ad spend is billed separately.",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.snowden-design.com/packages#summit",
              "name": "Summit performance plan",
              "serviceType": "Google Ads, Meta ads, social media and email marketing management",
              "description": "Everything in Ascent with 6 hours of edits, plus Google Ads and Meta ads management, 16 social posts a month on 3 platforms, email newsletter and lead follow-up automation, 2 new articles a month and a monthly strategy call. Ad spend is billed separately.",
              "provider": {
                "@id": "https://www.snowden-design.com/#business"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Denver"
                },
                {
                  "@type": "State",
                  "name": "Colorado"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.snowden-design.com/packages#3d-rendering",
      "name": "3D modeling and rendering",
      "serviceType": "3D product, architectural and environment visualization",
      "provider": {
        "@id": "https://www.snowden-design.com/#business"
      },
      "url": "https://www.snowden-design.com/3d-visualization"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.snowden-design.com/packages#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is included in a website maintenance plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Snowden Design website maintenance plan covers managed Wix hosting, SSL, domain and email DNS, uptime and broken-link monitoring, monthly backups, content edits and a monthly Google Analytics 4 report. Higher plans add SEO and GEO, Google Business Profile management, new articles, AI-assisted social media, Google Ads and customer email follow-up."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a website maintenance plan cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basecamp is [$ ] per month, Ascent is [$ ] per month and Summit is [$ ] per month plus ad spend, which is paid directly to Google and Meta. Every plan includes managed hosting and a monthly GA4 report, and one-time projects such as 3D rendering are quoted separately."
          }
        },
        {
          "@type": "Question",
          "name": "What is GEO and how is it different from SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Search engine optimization (SEO) helps your pages rank in Google's search results. Generative engine optimization (GEO) helps AI assistants such as ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude understand your business, trust it and cite it in their answers. Both rely on fast pages, clear structured data and content that answers real questions."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get my business mentioned by ChatGPT or Google AI Overviews?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Make your business easy to identify and quote: structured data that names your business, services and service area; clear answers to the questions customers ask; the same name, phone and address everywhere online; reviews and mentions on trusted sites; and a robots.txt file that lets AI crawlers read your site."
          }
        },
        {
          "@type": "Question",
          "name": "What should a monthly website analytics report include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A useful monthly report compares users, sessions, engagement rate and leads with last month, breaks traffic down by channel with AI assistant referrals shown on their own, lists top pages and Google search queries, counts leads by source, and ends with a plain-language summary of what changed and what comes next."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need Google Ads if I have good SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not always. SEO builds traffic that compounds over months, while Google Ads buys visibility today for searches you don't rank for yet, seasonal offers or new services. Many businesses run both: ads for fast leads and testing, SEO for a lower cost per lead over time."
          }
        },
        {
          "@type": "Question",
          "name": "Does AI write my social media posts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI helps research topics, draft options and pick posting times. A person at Snowden Design edits and approves every post before it goes live, so everything that carries your name sounds like you."
          }
        },
        {
          "@type": "Question",
          "name": "Can I change plans later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Most clients start on the plan that fits their launch and move up as the site grows. Plans can be changed at the next billing cycle."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer 3D modeling and rendering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Snowden Design creates 3D product, architectural and environment models, photoreal renderings and turntable animations as add-on projects that can be used on your website, in ads and on social media. See an example of 3D architectural visualization."
          }
        }
      ]
    }
  ]
}
```
