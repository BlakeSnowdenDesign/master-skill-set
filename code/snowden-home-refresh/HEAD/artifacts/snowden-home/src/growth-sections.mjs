/**
 * Website growth page content. These HTML sections are shared by the React
 * preview and the Wix export; keep links and copy useful in either context.
 */
export function buildGrowthSections(ctx, { intro, closer, metal, textLink, arrow }) {
  const crossLink = (slug, label, id) => textLink(slug, ctx, label, id);
  const serviceLink = crossLink("services", "Explore website services", "link-growth-services");
  const searchLink = crossLink("seo-geo", "SEO and GEO, explained", "link-growth-seo");
  const workLink = crossLink("work", "See selected website projects", "link-growth-work");
  const partnerWorkLink = crossLink("work", "See selected website projects", "link-growth-partners-work");
  const filmLink = crossLink("drone-photograph-video", "Photography, video and aerial work", "link-growth-film");
  const sectionsWithBackgroundMotion = (sections) => {
    const treatments = {
      "si-grow-attention": "drift",
      "si-grow-search": "contour",
      "si-grow-organic": "orbit",
      "si-grow-ads": "sun",
      "si-grow-social": "rings",
      "si-grow-partners": "drift",
      "si-grow-plan": "orbit",
      "si-grow-process": "contour",
      "si-grow-close": "sun",
    };
    return sections.map((section) => {
      const treatment = treatments[section.id];
      if (!treatment) return section;
      const opening = new RegExp(`(<section\\b[^>]*\\bid="${section.id}"[^>]*>)`);
      const background = `<div class="si-grow-bg si-grow-bg--${treatment}" aria-hidden="true"><span class="si-grow-bg__shape si-grow-bg__shape--one"></span><span class="si-grow-bg__shape si-grow-bg__shape--two"></span><span class="si-grow-bg__shape si-grow-bg__shape--three"></span></div>`;
      return { ...section, html: section.html.replace(opening, `$1${background}`) };
    });
  };

  const areas = [
    ["01", "Website updates & routine care", "Keep key details current, review forms and links, and address small fixes as they come up."],
    ["02", "SEO & GEO content reviews", "Revisit page clarity, structure and usefulness as customer questions and search tools evolve."],
    ["03", "New and refreshed pages", "Add a service, project, local page or useful answer when the business has something real to say."],
    ["04", "Organic visibility monitoring", "Look at available search and site data in context, then decide whether a page needs attention."],
    ["05", "PPC & campaign coordination", "Connect paid campaigns to a clear offer, suitable landing page, considered budget and tracking."],
    ["06", "Social planning & publishing", "Plan a steady mix of useful posts and adapt them to the platforms your customers use."],
    ["07", "Relevant business partnerships", "Find thoughtful opportunities to feature complementary businesses and useful shared resources."],
    ["08", "Reporting & next steps", "Review what changed, what can be learned, and a practical priority for the next stretch."],
  ].map(([n, title, copy], i) => `<li class="si-grow-plan__item sd-r" style="--d:${(i % 4) * .06}s"><span class="si-grow__index">${n} /</span><h3 class="sd-h">${title}</h3><p>${copy}</p></li>`).join("");

  const process = [
    ["01", "Review", "Look at the website, current marketing and the questions the business needs to answer."],
    ["02", "Prioritize", "Agree what matters now, what can wait, and a practical scope for the work."],
    ["03", "Improve", "Make the updates, publish useful content and connect each piece to the wider plan."],
    ["04", "Refine", "Review available performance information and use it to shape the next set of priorities."],
  ].map(([n, title, copy], i) => `<li class="si-grow-process__step sd-r" style="--d:${i * .07}s"><span>Step ${n}</span><h3 class="sd-h">${title}</h3><p>${copy}</p></li>`).join("");

  const hubSource = ctx.assets?.websiteHubHtml;
  const hubLocation = hubSource
    ? `srcdoc="${hubSource.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}"`
    : `src="${(ctx.previewBase || "").replace(/\/$/, "")}/assets/website-hub/snowden-website-hub.html"`;
  const heroArt = `<div class="si-grow-hub">
    <iframe class="si-grow-hub__frame" title="Animated 3D website hub connecting Search, Content, Social and Campaigns" ${hubLocation} loading="eager" sandbox="allow-scripts allow-same-origin"></iframe>
  </div>`;

  return sectionsWithBackgroundMotion([
    {
      id: "si-grow-hero",
      label: "Website Growth — Introduction",
      html: intro("si-grow-hero", {
        h1: "Keep your website <em>working for your business.</em>",
        lede: "A website needs ongoing attention to stay useful and easy to find. Regular updates, relevant content, stronger search visibility, and smart marketing help you reach the right people and keep your business growing.",
        body: `<div class="si-grow-hero__actions sd-in" style="--d:.18s">${metal("contact", ctx, "Talk About Ongoing Website Growth", "link-growth-hero-contact")}<p>Start with a conversation about the site you already have.</p></div>`,
        aside: heroArt,
        cls: "si-grow-intro",
      }),
    },
    {
      id: "si-grow-attention",
      label: "Website Growth — Why ongoing attention matters",
      html: `<section class="si-grow-attention" id="si-grow-attention" aria-labelledby="si-grow-attention-h">
        <div class="sd-wrap si-grow-attention__in">
          <div class="si-grow-attention__lead sd-r"><p class="si-grow__eyebrow">01 / Keep it current</p><h2 class="sd-h sd-h2" id="si-grow-attention-h">A website can stand still while everything around it <em>changes.</em></h2></div>
          <div class="si-grow-attention__copy sd-r" style="--d:.12s"><p>Customer questions shift. Services change. Competitors update their offers. Search and AI-assisted tools continue to evolve. Meanwhile, an old link, expired offer or unclear page can quietly make a site less useful.</p><p>Ongoing attention is a practical habit: keep the information accurate, review technical health periodically, check the important paths, and make considered improvements when the business has something new to share.</p><p class="si-grow-attention__note"><span aria-hidden="true">↗</span> No single tactic guarantees rankings or visibility. The value is in steady, relevant work.</p></div>
        </div>
      </section>`,
    },
    {
      id: "si-grow-search",
      label: "Website Growth — SEO and GEO",
      html: `<section class="si-grow-search" id="si-grow-search" aria-labelledby="si-grow-search-h">
        <div class="sd-wrap">
          <div class="si-grow-search__head sd-r"><p class="si-grow__eyebrow">02 / Be clear and findable</p><h2 class="sd-h sd-h2" id="si-grow-search-h">SEO &amp; GEO begin with <em>good information.</em></h2><p>Make it easier for people—and the systems helping them search—to understand what the business does.</p></div>
          <div class="si-grow-search__columns">
            <article class="si-grow-search__column si-grow-search__column--seo sd-r"><span class="si-grow__index">A / SEO</span><h3 class="sd-h">Help the right pages make sense</h3><p>Search engine optimization is the ongoing work of making useful pages easier to find and understand: clear structure, meaningful titles and descriptions, helpful internal links, accessible technical foundations, and answers to real customer questions.</p><ul><li>Refresh a service page when the offer changes.</li><li>Add useful FAQs based on conversations with customers.</li><li>Check local business details and the important paths through the site.</li></ul></article>
            <article class="si-grow-search__column si-grow-search__column--geo sd-r" style="--d:.1s"><span class="si-grow__index">B / GEO</span><h3 class="sd-h">Give AI tools accurate context</h3><p>Generative Engine Optimization means preparing clear, trustworthy, well-organized information so AI-powered search and answer tools can better understand a business and its expertise.</p><ul><li>State who you serve, what you do and where you work.</li><li>Publish original expertise, not thin copy written just to fill a page.</li><li>Review whether important information is easy to find and understand.</li></ul><p class="si-grow-search__caveat">GEO practices and platforms are evolving. No ranking, citation or placement can be promised.</p></article>
          </div>
          <div class="si-grow-search__foot sd-r">${searchLink}<span>Useful basics, revisited as the business changes.</span></div>
        </div>
      </section>`,
    },
    {
      id: "si-grow-organic",
      label: "Website Growth — Organic visibility and content",
      html: `<section class="si-grow-organic" id="si-grow-organic" aria-labelledby="si-grow-organic-h">
        <div class="sd-wrap si-grow-organic__in">
          <div class="si-grow-organic__statement sd-r"><p class="si-grow__eyebrow">03 / Earn attention</p><h2 class="sd-h sd-h2" id="si-grow-organic-h">Make useful things people can <em>come back to.</em></h2><p>Paid promotion can put an offer in front of an audience. Organic visibility is built differently: helpful, accurate, relevant pages give people a reason to arrive and a reason to trust what they find.</p>${workLink}</div>
          <div class="si-grow-organic__examples sd-r" style="--d:.12s"><p class="si-grow-organic__label">A living library, not a posting quota</p><ul><li><span>01 /</span><div><h3 class="sd-h">Service updates</h3><p>Clarify what is available and who it is for.</p></div></li><li><span>02 /</span><div><h3 class="sd-h">Project stories</h3><p>Show the thinking, details and people behind the work.</p></div></li><li><span>03 /</span><div><h3 class="sd-h">Customer questions</h3><p>Answer the things people ask before they get in touch.</p></div></li><li><span>04 /</span><div><h3 class="sd-h">Seasonal and local pages</h3><p>Share timely information with a real connection to place.</p></div></li><li><span>05 /</span><div><h3 class="sd-h">Articles and short-form media</h3><p>Offer depth, then make ideas easy to discover in different formats.</p></div></li></ul>${filmLink}</div>
        </div>
      </section>`,
    },
    {
      id: "si-grow-ads",
      label: "Website Growth — PPC and digital advertising",
      html: `<section class="si-grow-ads" id="si-grow-ads" aria-labelledby="si-grow-ads-h">
        <div class="sd-wrap si-grow-ads__in">
          <div class="si-grow-ads__intro sd-r"><p class="si-grow__eyebrow">04 / Promote with a plan</p><h2 class="sd-h sd-h2" id="si-grow-ads-h">Paid reach works best when the <em>next step is clear.</em></h2><p>Paid search and other digital advertising can complement organic marketing by bringing a relevant offer to a defined audience. The campaign and the page it points to should make sense together.</p></div>
          <div class="si-grow-ads__checklist sd-r" style="--d:.12s"><h3 class="sd-h">Plan, then pay attention</h3><ol><li><span>Step 01</span><div><b>Choose an audience and offer</b><p>Be specific about who the campaign is for and what it invites them to do.</p></div></li><li><span>Step 02</span><div><b>Prepare the landing page</b><p>Keep the message consistent and make the next step easy to understand.</p></div></li><li><span>Step 03</span><div><b>Set a considered budget</b><p>Agree on a spend that fits the business before a campaign goes live.</p></div></li><li><span>Step 04</span><div><b>Track and review</b><p>Check the available conversion data, make adjustments and learn over time.</p></div></li></ol><p class="si-grow-ads__note">Advertising needs monitoring. Results depend on many factors, and no return is guaranteed.</p></div>
        </div>
      </section>`,
    },
    {
      id: "si-grow-social",
      label: "Website Growth — Social media",
      html: `<section class="si-grow-social" id="si-grow-social" aria-labelledby="si-grow-social-h">
        <div class="sd-wrap si-grow-social__in">
          <div class="si-grow-social__heading sd-r"><p class="si-grow__eyebrow">05 / Connect the channels</p><h2 class="sd-h sd-h2" id="si-grow-social-h">Social should point somewhere <em>worth visiting.</em></h2><p>Instagram, Facebook, X, TikTok, LinkedIn and YouTube are options—not a checklist. The right mix depends on the business, its audience and the kind of content it can keep making well.</p></div>
          <div class="si-grow-social__plate sd-r" style="--d:.1s"><p class="si-grow-social__plate-label">One story, shaped for each place</p><div class="si-grow-social__platforms" aria-label="Example social platforms"><span>Instagram</span><span>Facebook</span><span>X</span><span>TikTok</span><span>LinkedIn</span><span>YouTube</span></div><p>Plan and create a steady variety of posts, adapt the format to each platform, and link back to a relevant page with a consistent, clear call to action. Keep the website and social profiles connected with accurate links.</p><div class="si-grow-social__path"><span>Useful idea</span><b aria-hidden="true">→</b><span>Platform-native post</span><b aria-hidden="true">→</b><span>Relevant website page</span></div></div>
        </div>
      </section>`,
    },
    {
      id: "si-grow-partners",
      label: "Website Growth — Business partnerships",
      html: `<section class="si-grow-partners" id="si-grow-partners" aria-labelledby="si-grow-partners-h">
        <div class="sd-wrap si-grow-partners__in">
          <p class="si-grow__eyebrow sd-r">06 / Grow through good relationships</p>
          <div class="si-grow-partners__body sd-r" style="--d:.08s"><h2 class="sd-h sd-h2" id="si-grow-partners-h">Useful connections make the web <em>more useful.</em></h2><p>Complementary, like-minded businesses can share something their audiences genuinely value: a resource page, partner profile, project feature, interview, event page or thoughtful referral.</p><p>Any link should be relevant, trustworthy and useful to the customer. This is about real relationships—not link schemes, paid link manipulation or unrelated swaps.</p><div class="si-grow-partners__links">${serviceLink}${partnerWorkLink}</div></div>
          <aside class="si-grow-partners__aside sd-r" style="--d:.16s"><span>Good collaboration</span><strong>Shared context.<br/>A useful reason to connect.</strong><small>Not every relationship needs a link. It should make sense first.</small></aside>
        </div>
      </section>`,
    },
    {
      id: "si-grow-plan",
      label: "Website Growth — Tailored ongoing plan",
      html: `<section class="si-grow-plan" id="si-grow-plan" aria-labelledby="si-grow-plan-h">
        <div class="sd-wrap">
          <div class="si-grow-plan__heading sd-r"><p class="si-grow__eyebrow">07 / A flexible partnership</p><h2 class="sd-h sd-h2" id="si-grow-plan-h">A recurring plan, built around <em>your real priorities.</em></h2><p>Some businesses need regular content. Others need a focused campaign or a dependable pair of eyes on the whole site. Scope and cadence are agreed together—there are no one-size-fits-all tiers.</p></div>
          <ol class="si-grow-plan__list">${areas}</ol>
          <p class="si-grow-plan__note sd-r">The mix can change as the business changes. We’ll agree what is useful, what is in scope and what to review next.</p>
        </div>
      </section>`,
    },
    {
      id: "si-grow-process",
      label: "Website Growth — Four-step process",
      html: `<section class="si-grow-process" id="si-grow-process" aria-labelledby="si-grow-process-h">
        <div class="sd-wrap">
          <div class="si-grow-process__head sd-r"><div><p class="si-grow__eyebrow">08 / How it works</p><h2 class="sd-h sd-h2" id="si-grow-process-h">A clear next step, then another.</h2></div><p>Start with what is happening now. The plan follows the business—not a pre-set marketing calendar.</p></div>
          <ol class="si-grow-process__list">${process}</ol>
        </div>
      </section>`,
    },
    {
      id: "si-grow-close",
      label: "Website Growth — Next step",
      html: closer("si-grow-close", ctx, {
        h: "Let’s make your next website move a useful one.",
        p: "Share your website and what you want it to do better. We can talk through the opportunities and what kind of ongoing support would make sense.",
        label: "Schedule a Website Growth Review",
        secondary: `<a class="si-tlink" href="mailto:blake@snowden-design.com" data-testid="link-growth-close-email">Or email Blake directly ${arrow}</a>`,
      }),
    },
  ]);
}
