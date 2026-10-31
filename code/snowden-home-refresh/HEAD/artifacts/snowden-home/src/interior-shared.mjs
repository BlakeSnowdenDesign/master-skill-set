// Shared source for the eight interior pages: React previews AND Wix exports
// (scripts/export-interiors.mjs) render these exact strings.
import { homeBody } from "./home-shared.mjs";
import { MEDIA_INVENTORY } from "./media-inventory.mjs";
import { INTERIOR_METADATA } from "./interior-metadata.mjs";
import { limetreeFeature } from "./limetree-feature.mjs";
import { analyticsShowcase } from "./analytics-showcase.mjs";
import { buildGrowthSections } from "./growth-sections.mjs";

export const LIVE = "https://www.snowden-design.com";
export const MAIL = "mailto:blake@snowden-design.com";
export const TEL = "tel:+17203402611";

export const PAGE_ORDER = ["work", "services", "3d-interactive", "seo-geo", "website-growth", "drone-photograph-video", "about", "contact"];

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// ctx: { previewBase?: string, assets: {...}, media?: MEDIA_INVENTORY }
// previewBase set => local preview links. Absent => verified live Wix URLs, target=_top.
function page(slug, ctx) {
  if (ctx.previewBase) return { href: ctx.previewBase.replace(/\/$/, "") + "/" + slug, target: "" };
  return { href: LIVE + "/" + slug, target: ' target="_top"' };
}
function link(slug, ctx, label, cls, testid) {
  const p = page(slug, ctx);
  return `<a class="${cls}" href="${p.href}"${p.target} data-testid="${testid}">${label}</a>`;
}
function metal(slug, ctx, label, testid) {
  return link(slug, ctx, `<span class="sd-hero-metal__sweep" aria-hidden="true"></span><span class="sd-hero-metal__label">${label} ${arrow}</span>`, "sd-btn sd-hero-metal", testid);
}
function textLink(slug, ctx, label, testid) {
  return link(slug, ctx, `${label} ${arrow}`, "si-tlink", testid);
}
function intro(id, { h1, lede, body = "", aside = "", cls = "" }) {
  return `<section class="si-intro ${cls}" id="${id}" aria-labelledby="${id}-h">
  <div class="sd-wrap si-intro__in">
    <div class="si-intro__copy">
      <h1 class="sd-h si-h1 sd-in" id="${id}-h">${h1}</h1>
      <p class="si-lede sd-in" style="--d:.1s">${lede}</p>
      ${body ? `<div class="sd-in" style="--d:.18s">${body}</div>` : ""}
    </div>
    ${aside ? `<div class="si-intro__aside sd-in" style="--d:.24s">${aside}</div>` : ""}
  </div>
</section>`;
}
function closer(id, ctx, { h, p, slug = "contact", label = "Start a conversation", secondary = "" }) {
  return `<section class="si-close" id="${id}" aria-labelledby="${id}-h">
  <div class="sd-wrap si-close__in sd-r">
    <div><h2 class="sd-h sd-h2" id="${id}-h">${h}</h2><p>${p}</p></div>
    <div class="si-close__act">${metal(slug, ctx, label, "link-" + id)}${secondary}</div>
  </div>
</section>`;
}

/* ---------------- WORK ---------------- */
function workSections(ctx) {
  const a = ctx.assets;
  const home = homeBody(a, { previewBase: ctx.previewBase });
  let work = home.match(/<section class="sd-sec" id="sd-work"[\s\S]*?<\/section>/)?.[0] || "";
  work = work
    .replace('href="https://snowden-design.wixstudio.com/harbourviewcottages/cottages"', 'href="https://snowden-design.wixstudio.com/harbourviewcottages"')
    .replace(/<div class="sd-head sd-r">[\s\S]*?<\/p>\s*<\/div>/, `<div class="sd-head sd-r"><h2 class="sd-h sd-h2" id="sd-work-h">Websites in the world</h2><p>Hospitality, outdoor travel, ranch life, private investment, plumbing and regional broadband. Each site was shaped around its setting and the decision a visitor came to make.</p></div>`)
    .replace('<div class="sd-work">', `<div class="sd-work">
      <article class="sd-proj sd-r" data-testid="card-work-karls">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_ac49c342698447b798f0bb67e6cd0b72f000.png/v1/fill/w_1200,h_750,al_c,q_85/2fde66_ac49c342698447b798f0bb67e6cd0b72f000.png" aria-label="Karl’s Adventure video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_32dc3dd99c8243a294ff69bde7a0a42c/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Helicopter expeditions / Website</span>
          <h3 class="sd-h">Karl’s Adventure</h3>
          <p>Helicopter exploration of Northern Québec, with immersive imagery and information for photographers, anglers and adventure travelers.</p>
          <a class="sd-dock__visit sd-mono" href="https://www.karlsadventure.com/" target="_blank" rel="noopener noreferrer" data-testid="link-work-karls">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-elktrout">
        <a class="sd-proj__img" href="https://snowden-design.wixsite.com/elktroutlodge/home" target="_blank" rel="noopener noreferrer" aria-label="Visit Elktrout Lodge website (opens in a new tab)">
          <img src="https://static.wixstatic.com/media/2fde66_3302f01c53de45b988844664396a0193~mv2.jpg/v1/fill/w_1200,h_750,al_c,q_85/2fde66_3302f01c53de45b988844664396a0193~mv2.jpg" alt="Mountain landscape and evergreen forest featured on the Elktrout Lodge website" loading="lazy" decoding="async" width="1200" height="750">
        </a>
        <div class="sd-proj__meta">
          <span class="sd-mono">Lodge &amp; outdoor experiences / Website</span>
          <h3 class="sd-h">Elktrout Lodge</h3>
          <p>A lodge website centered on mountain scenery, fly-fishing and outdoor experiences, with galleries that introduce the setting.</p>
          <a class="sd-dock__visit sd-mono" href="https://snowden-design.wixsite.com/elktroutlodge/home" target="_blank" rel="noopener noreferrer" data-testid="link-work-elktrout">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-apesbrain">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_3ce926e72298401d922d16a54d1faf8d~mv2.jpg/v1/fill/w_1200,h_750,al_c,q_85/2fde66_3ce926e72298401d922d16a54d1faf8d~mv2.jpg" aria-label="Apes Brain video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_4c055f8943be49aca7e19158d70124e7/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Fishing &amp; adventure apparel / Website</span>
          <h3 class="sd-h">Apes Brain</h3>
          <p>A Colorado-designed fishing and adventure apparel brand, brought online through product imagery, brand storytelling and video.</p>
          <a class="sd-dock__visit sd-mono" href="https://www.apesbrain.com/" target="_blank" rel="noopener noreferrer" data-testid="link-work-apesbrain">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-boundless">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_52f5b9edb0bb44b69191d4bdc3a1f96ff000.jpg/v1/fill/w_1200,h_750,al_c,q_85/2fde66_52f5b9edb0bb44b69191d4bdc3a1f96ff000.jpg" aria-label="Boundless video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_f268e16382254365935319464ba8769e/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Performance &amp; longevity medicine / Website</span>
          <h3 class="sd-h">Boundless</h3>
          <p>Performance and longevity medicine presented through coastal imagery and a clear introduction to the practice.</p>
          <a class="sd-dock__visit sd-mono" href="https://snowden-design.wixstudio.com/boundless" target="_blank" rel="noopener noreferrer" data-testid="link-work-boundless">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-limetree">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_0620b5c631e94bae97312a1c70d4b86df000.jpg" aria-label="Lime Tree Hospitality video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_0620b5c631e94bae97312a1c70d4b86d/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Hospitality furniture / Digital lookbook</span>
          <h3 class="sd-h">Lime Tree Social</h3>
          <p>An interactive lookbook showcasing Lime Tree Hospitality’s hotel furnishings through guest-room photography and walkthrough films.</p>
          <a class="sd-dock__visit sd-mono" href="https://snowden-design.wixstudio.com/limetreesocial" target="_blank" rel="noopener noreferrer" data-testid="link-work-limetree">View lookbook ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-carhart">
        <a class="sd-proj__img" href="https://www.carhartplumbing.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Carhart Plumbing website (opens in a new tab)">
          <img src="https://static.wixstatic.com/media/2fde66_bcdda98a49814294bb665ad5282c57cf~mv2.jpg/v1/fill/w_1200,h_750,al_c,q_85/2fde66_bcdda98a49814294bb665ad5282c57cf~mv2.jpg" alt="Carhart Plumbing team and service van in Jupiter, Florida" loading="lazy" decoding="async" width="1200" height="750">
        </a>
        <div class="sd-proj__meta">
          <span class="sd-mono">Plumbing / Website</span>
          <h3 class="sd-h">Carhart Plumbing</h3>
          <p>A Jupiter, Florida plumbing business, with new construction services and a clear way to get in touch.</p>
          <a class="sd-dock__visit sd-mono" href="https://www.carhartplumbing.com/" target="_blank" rel="noopener noreferrer" data-testid="link-work-carhart">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-mojo">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_34fbd6bafb62495fbb44fd1dbb4256dc~mv2.png/v1/fit/w_1200,h_675,al_c/2fde66_34fbd6bafb62495fbb44fd1dbb4256dc~mv2.png" aria-label="Mojo Broadband video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_86c5900bcd574415b1b625248ae05540/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Wireless broadband / Website</span>
          <h3 class="sd-h">Mojo Broadband</h3>
          <p>High-speed wireless internet for Arizona communities, with information about service areas and connectivity.</p>
          <a class="sd-dock__visit sd-mono" href="https://snowden-design.wixstudio.com/mojo2" target="_blank" rel="noopener noreferrer" data-testid="link-work-mojo">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-velvet-hammer">
        <a class="sd-proj__img" href="https://www.velvethammercapital.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Velvet Hammer Capital website (opens in a new tab)">
          <img src="https://static.wixstatic.com/media/2fde66_e422a05f364f41a59acfdccb3d05742f~mv2.png" alt="Velvet Hammer Capital website preview" loading="lazy" decoding="async" width="1200" height="675">
        </a>
        <div class="sd-proj__meta">
          <span class="sd-mono">Private investment / Website</span>
          <h3 class="sd-h">Velvet Hammer Capital</h3>
          <p>A family-owned private investment firm in West Palm Beach, partnering with founders through patient capital and long-term growth.</p>
          <a class="sd-dock__visit sd-mono" href="https://www.velvethammercapital.com/" target="_blank" rel="noopener noreferrer" data-testid="link-work-velvet-hammer">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>`)
    .replace(/<p class="sd-r" style="margin-top:32px">[\s\S]*?<\/p>\s*<\/div>\s*<\/section>$/, "</div></section>");
  return [
    { id: "si-work-intro", label: "Work — Introduction", html: intro("si-work-intro", {
      h1: "Design with depth. <em>Vision meets technology.</em>",
      lede: "Websites, brand systems, digital art and dimensional work from Snowden Design, Blake Snowden’s independent studio in Denver.",
      body: `<p class="si-body">A remote lodge, a working ranch and a regional internet provider need different ways to explain their value. These selected projects show how imagery, structure and interaction can give each business a distinct presence.</p>`,
    }) },
    { id: "si-work-limetree-feature", label: "Work — Featured case study: Lime Tree Hospitality", html: limetreeFeature(ctx.assets.limetreeLookbookHtml) },
    { id: "sd-work", label: "Work — Portfolio", html: work },
    { id: "si-work-close", label: "Work — Next step", html: closer("si-work-close", ctx, {
      h: "Have something that should exist?", p: "Bring a sketch, a half-built site or just the problem. Blake will tell you plainly what it would take.",
      secondary: textLink("services", ctx, "See services", "link-work-services"),
    }) },
  ];
}

/* ---------------- SERVICES ---------------- */
function servicesSections(ctx) {
  const offerings = [
    ["01", "Website design &amp; build", "A custom Wix Studio site, shaped around what visitors need to understand and do. Includes page architecture, responsive design, build, content direction and launch support.", "New site, thoughtful redesign, or a clearer path from first visit to inquiry."],
    ["02", "Cinematic film", "A considered film from the first story outline through filming, edit, sound and delivery. Made to carry a sense of place, show a process or give a business a human voice.", "Hospitality, outdoor experiences, products and teams that are better understood in motion."],
    ["03", "Photography &amp; aerial", "On-location stills and aerial perspectives planned for real placements: a website hero, room or property gallery, campaign, or a library of useful brand images.", "You need original imagery with the right light, point of view and crop for the site."],
    ["04", "3D &amp; interactive", "Models, rendered stills, motion and lightweight interactive scenes that help people see a product, space or system from another angle.", "The subject is difficult to photograph, still being developed, or easier to understand in dimension."],
    ["05", "Identity &amp; digital art", "Logo and mark development, type and color systems, illustration and bespoke digital artwork—made to hold together across the site and the places around it.", "A new venture needs a point of view, or an existing identity needs to catch up."],
    ["06", "Search &amp; ongoing website care", "Technical and on-page SEO, local search foundations, clear content for AI-assisted summaries, analytics, updates and practical maintenance.", "You want the site to stay accurate, cared for and easier to find after launch. No rankings or citations are promised."],
  ];
  const destinations = ["work", "work", "drone-photograph-video", "3d-interactive", "digitalart", "seo-geo"];
  const serviceLink = (i) => i === 4
    ? `<a href="${LIVE}/digitalart" target="_top" class="si-tlink" data-testid="link-service-${i}">Explore digital art ${arrow}</a>`
    : textLink(destinations[i], ctx, i < 2 ? "See related work" : "Explore this service", `link-service-${i}`);
  const rows = offerings.map(([n, t, d, w], i) => `<article class="si-svc si-svc--offering sd-r" style="--d:${(i % 3) * 0.07}s" data-testid="card-service-${i}">
      <span class="si-svc__index sd-mono">Service ${n}</span>
      <h3 class="sd-h">${t}</h3>
      <p class="si-svc__sum">${d}</p>
      <p class="si-svc__fit"><b>A good fit for</b> ${w}</p>
      ${serviceLink(i)}
      ${i === 5 ? textLink("website-growth", ctx, "Ongoing website care", "link-services-care") : ""}
    </article>`).join("");
  const digitalArt = { href: `${LIVE}/digitalart`, target: ' target="_top"' };
  const artLink = `<a href="${digitalArt.href}"${digitalArt.target} class="si-tlink" data-testid="link-services-digital-art">Explore digital art ${arrow}</a>`;
  const webImage = ctx.assets.leica || "";
  const portrait = ctx.assets.portrait || "";
  const process = [
    ["01", "Listen", "A first conversation about the business, its audience and the change you want to make. We decide what matters—and what can wait."],
    ["02", "Shape", "A focused scope, direction and sequence. For a site, that means structure and content before polishing screens; for a film, the story before the shot list."],
    ["03", "Make", "Design, production and build move together, with clear review points and room for useful feedback."],
    ["04", "Release &amp; care", "Prepare the work for launch, then agree what support makes sense: a clean handoff, a focused follow-up, or ongoing care."],
  ].map(([n, t, p]) => `<li class="si-process__step sd-r"><span class="sd-mono">Step ${n}</span><h3 class="sd-h">${t}</h3><p>${p}</p></li>`).join("");
  return [
    { id: "si-svc-intro", label: "Services — Introduction", html: intro("si-svc-intro", {
      h1: "Creative vision. <em>Built with precision.</em>",
      lede: "Websites and cinematic film lead a connected practice in photography, aerial, 3D, identity, digital art and search.",
      body: `<p class="si-body">Snowden Design is Blake Snowden’s independent creative studio. With roots in outdoor places and hospitality, the work brings visual storytelling and exacting digital craft into the same direction—planned, made and refined directly with Blake.</p><div class="si-svc-intro__actions">${metal("contact", ctx, "Discuss your project", "link-services-contact")}${textLink("work", ctx, "Explore selected work", "link-services-intro-work")}</div>`,
      aside: `<p class="si-svc-intro__note sd-mono">INDEPENDENT CREATIVE STUDIO<br>DENVER · WORKING EVERYWHERE</p>`,
    }) },
    { id: "si-svc-lead", label: "Services — Website and film", html: `<section class="si-svc-lead" id="si-svc-lead" aria-labelledby="si-svc-lead-h">
    <div class="sd-wrap si-svc-lead__in">
      <div class="si-svc-lead__copy sd-r"><p class="sd-mono si-svc__eyebrow">01 / DIGITAL PRESENCE</p><h2 class="sd-h sd-h2" id="si-svc-lead-h">Different disciplines.<br><em>One creative direction.</em></h2><p>A website can be the place where every part of a story meets: the identity, the film, the photographs and the details someone needs to take the next step. The work is designed as a whole, not assembled at the end.</p><p class="si-svc-lead__links">${textLink("work", ctx, "See the work", "link-services-work")}${textLink("contact", ctx, "Talk about a project", "link-services-lead-contact")}</p></div>
      <figure class="si-svc-lead__image sd-r" style="--d:.1s"><img src="${webImage}" alt="A tactile Leica camera in Snowden Design’s studio, ready for image-making" loading="lazy" decoding="async"><figcaption><span>Digital craft</span><span>Considered down to the frame</span></figcaption></figure>
    </div>
    <div class="sd-wrap si-svc-film">
      <div class="si-svc-film__head sd-r"><span class="sd-mono">02 / MOTION &amp; PLACE</span><h3 class="sd-h">A sense of place,<br><em>put into motion.</em></h3><p>From the first visual idea to the final edit, film can give a website its atmosphere. The scope can include story development, location filming, aerial footage, editing and delivery for web and social.</p></div>
      <figure class="si-svc-film__frame sd-r" style="--d:.1s"><video data-sd-portfolio-video muted loop playsinline controls preload="none" poster="https://static.wixstatic.com/media/2fde66_0620b5c631e94bae97312a1c70d4b86df000.jpg" aria-label="Lime Tree Hospitality film preview"><source data-src="https://video.wixstatic.com/video/2fde66_0620b5c631e94bae97312a1c70d4b86d/720p/mp4/file.mp4" type="video/mp4">Your browser does not support this video.</video><figcaption><span>Lime Tree Hospitality</span><span>Film in context</span></figcaption></figure>
    </div>
    </section>` },
    { id: "si-svc-core", label: "Services — Six disciplines", html: `<section class="sd-sec si-svcs" id="si-svc-core" aria-labelledby="si-svc-core-h"><div class="sd-wrap">
    <div class="si-svcs__heading sd-r"><p class="sd-mono si-svc__eyebrow">THE PRACTICE / 01—06</p><h2 class="sd-h sd-h2" id="si-svc-core-h">Six disciplines.<br><em>One point of view.</em></h2><p>Hire Blake for a single, clearly scoped piece of work—or bring the disciplines together when the brief calls for it.</p></div>
    <div class="si-svc-grid">${rows}</div></div></section>` },
    { id: "si-svc-spec", label: "Services — A connected practice", html: `<section class="si-specs si-specs--services" id="si-svc-spec" aria-labelledby="si-svc-spec-h"><div class="sd-wrap si-specs__in">
    <div class="si-specs__intro sd-r"><p class="sd-mono si-svc__eyebrow">HOW IT CONNECTS</p><h2 class="sd-h sd-h2" id="si-svc-spec-h">Make the pieces<br><em>belong together.</em></h2><p>Good production starts with where the work will live. A film is framed for its page. A photograph supports the story, not just the mood. Search work starts with what the business actually offers.</p>${artLink}</div>
    <div class="si-specs__image sd-r" style="--d:.1s"><img src="${portrait}" alt="Blake Snowden in his creative studio" loading="lazy" decoding="async"><p class="sd-mono">DIRECT COLLABORATION / FROM FIRST CONVERSATION TO LAUNCH</p></div></div></section>` },
    { id: "si-svc-process", label: "Services — Process", html: `<section class="si-process" id="si-svc-process" aria-labelledby="si-svc-process-h"><div class="sd-wrap">
      <div class="si-process__head sd-r"><div><p class="sd-mono si-svc__eyebrow">A CLEAR WAY THROUGH</p><h2 class="sd-h sd-h2" id="si-svc-process-h">From first conversation<br>to work in the world.</h2></div><p>Small, direct and collaborative. The exact sequence flexes with the project; the shared aim is clarity at every handoff.</p></div>
      <ol class="si-process__list">${process}</ol>
    </div></section>` },
    { id: "si-svc-close", label: "Services — Next step", html: closer("si-svc-close", ctx, {
      h: "Have a place, a product or an idea to bring to life?", p: "Start with the part that feels unclear. Blake will listen, ask a few useful questions and help shape a right-sized next step.",
      secondary: textLink("work", ctx, "See selected work", "link-svc-work"),
    }) },
  ];
}

/* ---------------- 3D ---------------- */
function threeDSections(ctx) {
  const a = ctx.assets;
  const viewer = a.mongrainViewerHtml
    ? `srcdoc="${a.mongrainViewerHtml.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}"`
    : `src="${a.mongrainViewerUrl}"`;
  const uses = [
    ["Illustrative rendering", "Stills of a product, space or building that does not exist yet, or cannot be photographed the way you need."],
    ["Dimensional storytelling", "Exploded views and assemblies that show how parts relate, so a complex idea reads at a glance."],
    ["Interactive exploration", "Lightweight web scenes visitors can rotate and inspect, embedded where the explanation happens."],
  ].map(([t, p], i) => `<li class="sd-r" style="--d:${i * 0.08}s"><h3 class="sd-h">${t}</h3><p>${p}</p></li>`).join("");
  return [
    { id: "si-3d-intro", label: "3D — Introduction", html: intro("si-3d-intro", {
      h1: "Give the idea <em>another dimension.</em>",
      lede: "3D modeling, rendering and interactive scenes for ideas that are easier to understand when you can turn them around.",
      cls: "si-intro--stone",
    }) },
    { id: "sd-mongrain", label: "3D — MONGRAIN viewer", html: `<section class="sd-mg sd-dark" id="sd-mongrain" aria-labelledby="sd-mg-h" data-active="all">
  <div class="sd-wrap">
    <div class="sd-mg__intro">
      <h2 class="sd-h sd-h2" id="sd-mg-h">MONGRAIN: a building you can take apart.</h2>
      <p class="sd-mg__status sd-mono" data-testid="status-mongrain">Project in development</p>
      <p>Rotate the MONGRAIN hospital building and select its roof, wall or foundation systems to explore their assemblies.</p>
      <p class="sd-mg__note">In development. This is an illustrative architectural representation, not a completed engineering product, as-built BIM model, or performance analysis.</p>
    </div>
    <iframe class="sd-mg__viewer" title="MONGRAIN interactive hospital building envelope explorer" ${viewer} loading="lazy" allow="fullscreen" sandbox="allow-scripts allow-same-origin"></iframe>
  </div>
</section>` },
    { id: "si-3d-uses", label: "3D — Where 3D helps", html: `<section class="sd-sec si-uses" id="si-3d-uses" aria-labelledby="si-3d-uses-h"><div class="sd-wrap">
    <div class="sd-head sd-r"><h2 class="sd-h sd-h2" id="si-3d-uses-h">When 3D makes an idea clearer</h2><p>Dimension is useful when it removes a paragraph of explanation. It is a visual tool, not a substitute for engineering, permitting or manufacturing review.</p></div>
    <ul class="si-uses__list">${uses}</ul></div></section>` },
    { id: "si-3d-close", label: "3D — Next step", html: closer("si-3d-close", ctx, {
      h: "Have something people need to see from every side?", p: "Share drawings, photos or a rough sketch. Blake will suggest whether a still, an animation or an interactive scene makes the most sense.",
    }) },
  ];
}

/* ---------------- SEO / GEO ---------------- */
function seoSections(ctx) {
  const qs = [
    ["Can you guarantee rankings or AI citations?", "No. Search engines and AI systems make their own decisions. The work improves the conditions that make a site easier to crawl, understand and trust; outcomes are measured honestly rather than promised."],
    ["Does a Wix Studio site work for SEO?", "Yes. Wix Studio supports page titles, descriptions, structured data, redirects and clean URLs. Most issues come from structure and content, not the platform."],
    ["Is GEO a replacement for SEO?", "No. Generative engine optimization builds on the same foundations: clear, accurate, well-structured pages. It adds attention to how your expertise is stated so it can be summarized correctly."],
  ].map(([q, a]) => `<details class="si-q"><summary data-testid="toggle-seo-q">${q}</summary><p>${a}</p></details>`).join("");
  return [
    { id: "si-seo-intro", label: "SEO & GEO — Introduction", html: intro("si-seo-intro", {
      h1: "expertise easier to find—<em>and understand.</em>",
      lede: "Blake helps independent businesses build clearer, more discoverable websites through technical, local, and on-page SEO, thoughtful measurement, and GEO foundations that help people and AI-powered search understand what you do.",
      cls: "si-seo-intro",
      aside: `<img class="si-seo-intro__photo" src="https://static.wixstatic.com/media/2fde66_51b53ce2d237485facd3a320f6209e13~mv2.png" alt="Blake Snowden reviewing a document at a wooden desk beside windows overlooking a mountain landscape" width="1024" height="1024" decoding="async">`,
    }) },
    { id: "si-seo-dashboard", label: "SEO & GEO — Original analytics graphics", html: analyticsShowcase(ctx) },
    { id: "si-seo-split", label: "SEO & GEO — Two disciplines", html: `<section class="sd-sec si-split" id="si-seo-split" aria-labelledby="si-seo-split-h"><div class="sd-wrap">
    <h2 class="sd-h sd-h2 sd-r" id="si-seo-split-h">Related, but not the same job</h2>
    <div class="si-split__grid">
      <article class="si-split__col sd-r"><h3 class="sd-h">Search engine optimization</h3>
        <p>Helping search engines crawl, index and rank the right pages for the right searches.</p>
        <ul><li><b>Technical</b> Crawlability, page speed, mobile behavior, redirects and indexing.</li><li><b>Local</b> Accurate business details, service areas and a Google Business Profile that matches the site.</li><li><b>On-page</b> Titles, headings and copy written around what people actually search for.</li></ul></article>
      <article class="si-split__col si-split__col--alt sd-r" style="--d:.1s"><h3 class="sd-h">Generative engine optimization</h3>
        <p>Helping AI-assisted search tools describe your business accurately when they summarize it.</p>
        <ul><li><b>Clarity</b> Plain statements of who you serve, what you do and where.</li><li><b>Structure</b> Headings, lists and structured data that make facts easy to extract.</li><li><b>Consistency</b> The same facts across your site, profiles and listings.</li></ul></article>
    </div></div></section>` },
    { id: "si-seo-audit", label: "SEO & GEO — Audits and measurement", html: `<section class="si-band si-seo-measure" id="si-seo-audit" aria-labelledby="si-seo-audit-h"><div class="sd-wrap si-band__in">
    <h2 class="sd-h sd-h2 sd-r" id="si-seo-audit-h">A practical loop from question to improvement.</h2>
    <div class="sd-r" style="--d:.1s"><p>An audit reviews how pages are crawled and indexed, whether each has a clear purpose, and where content is thin, duplicated or hard to follow. It can also surface practical fixes to titles and descriptions, mobile performance, canonical URLs, image descriptions, internal links and structured data where it fits. The useful output is a prioritized set of fixes—not a score dressed up as a strategy.</p>
    <p>Then use tools such as Google Search Console and your site analytics to understand which queries surface your pages, where visitors arrive, and what they do next. Traffic and engagement need context: a spike is a question to explore, not proof of business impact.</p>
    <p>GEO is an emerging set of practices, not a switch or a guaranteed citation. Clear, accurate, well-structured information gives search systems a better chance of understanding your work. Results still depend on systems Snowden Design does not control.</p>
    <div class="si-seo-measure__steps"><span><b>Step 01</b> Check the foundations</span><span><b>Step 02</b> Find the useful signal</span><span><b>Step 03</b> Make one thoughtful change</span></div></div>
    </div></section>` },
    { id: "si-seo-faq", label: "SEO & GEO — Questions", html: `<section class="sd-sec si-faq" id="si-seo-faq" aria-labelledby="si-seo-faq-h"><div class="sd-wrap si-faq__in">
    <h2 class="sd-h sd-h2 sd-r" id="si-seo-faq-h">Before you decide</h2><div class="sd-r" style="--d:.1s">${qs}</div></div></section>` },
    { id: "si-seo-close", label: "SEO & GEO — Next step", html: closer("si-seo-close", ctx, {
      h: "Want to know where your site stands?", p: "Send the URL and the kind of customer you want to reach. Blake will suggest whether an audit, a content pass or ongoing work fits.",
      secondary: textLink("website-growth", ctx, "Ongoing support", "link-seo-growth"),
    }) },
  ];
}

/* ---------------- GROWTH ---------------- */
function growthSections(ctx) {
  return buildGrowthSections(ctx, { intro, closer, metal, textLink, arrow });
}

/* ---------------- MEDIA ---------------- */
function mediaGallery(media) {
  for (const kind of ["photography", "aerial", "video"]) {
    if (!Array.isArray(media[kind])) throw new Error(`Media inventory requires a ${kind} list.`);
    for (const item of media[kind]) {
      if (!/^https:\/\//.test(item.src || "")) throw new Error(`${kind} media requires a durable HTTPS source.`);
      if (kind === "video" && (!item.title || !/^https:\/\//.test(item.poster || ""))) throw new Error("Video requires a title and HTTPS poster.");
      if (kind !== "video" && !item.alt?.trim()) throw new Error(`${kind} media requires descriptive alt text.`);
      if (item.captionsVtt && !/^https:\/\//.test(item.captionsVtt)) throw new Error("Captions require a durable HTTPS URL.");
    }
  }
  const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const stills = (list, kind) => list.length ? `<div class="si-gal" data-testid="gallery-${kind}">${list.map(m => `<figure class="si-gal__item sd-r"><img src="${esc(m.src)}" alt="${esc(m.alt)}" width="${m.width || 1600}" height="${m.height || 1067}" loading="lazy" decoding="async">${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : "";
  const videos = media.video.length ? `<div class="si-vid">${media.video.map(v => `<figure class="si-vid__item sd-r"><video controls playsinline preload="none" poster="${esc(v.poster)}" aria-label="${esc(v.title)}"><source src="${esc(v.src)}" type="video/mp4">${v.captionsVtt ? `<track kind="captions" src="${esc(v.captionsVtt)}" srclang="en" label="English" default>` : ""}</video><figcaption><b>${esc(v.title)}</b>${v.caption ? ` ${esc(v.caption)}` : ""}</figcaption></figure>`).join("")}</div>` : "";
  const any = media.photography.length + media.video.length + media.aerial.length;
  const body = any
    ? `${media.photography.length ? `<h3 class="sd-h si-gal__h">Photography</h3>${stills(media.photography, "photo")}` : ""}${media.video.length ? `<h3 class="sd-h si-gal__h">Video</h3>${videos}` : ""}${media.aerial.length ? `<h3 class="sd-h si-gal__h">Aerial</h3>${stills(media.aerial, "aerial")}` : ""}`
    : `<p class="si-empty sd-r" data-testid="status-media-empty">New photography, video and aerial work will appear here as projects are completed and cleared for sharing.</p>`;
  return `<section class="sd-sec si-media" id="si-media-gallery" aria-labelledby="si-media-gallery-h"><div class="sd-wrap">
    <h2 class="sd-h sd-h2 sd-r" id="si-media-gallery-h">Recent media</h2>${body}</div></section>`;
}
function mediaSections(ctx) {
  const a = ctx.assets;
  const disc = [
    ["Photography", "Spaces, products, people at work and the details that make a business recognizable, composed for the pages they will appear on."],
    ["Business and marketing video", "Short films that explain what you do, show the place or process, and give website visitors useful context before they get in touch."],
    ["Aerial storytelling", "Elevated views that show scale, terrain and setting, for properties, venues and outdoor experiences where the landscape is part of the story."],
  ].map(([t, p], i) => `<article class="si-disc sd-r" style="--d:${i * 0.08}s"><h3 class="sd-h">${t}</h3><p>${p}</p></article>`).join("");
  return [
    { id: "si-media-intro", label: "Media — Introduction", html: intro("si-media-intro", {
      h1: "A closer look. <em>A wider view.</em>",
      lede: "Photography, business video and aerial imagery planned alongside the website, so every frame has a job when it gets there.",
      aside: `<figure class="si-detail"><img src="${a.leica}" alt="Leica camera on a desk in the Snowden Design studio" width="1200" height="1600" loading="eager" decoding="async"></figure>`,
    }) },
    { id: "si-media-disc", label: "Media — Disciplines", html: `<section class="sd-sec si-discs" id="si-media-disc" aria-labelledby="si-media-disc-h"><div class="sd-wrap">
    <h2 class="sd-h sd-h2 sd-r" id="si-media-disc-h">Made for the page it lives on</h2>
    <div class="si-discs__grid">${disc}</div></div></section>` },
    { id: "si-media-gallery", label: "Media — Gallery", html: mediaGallery(ctx.media || MEDIA_INVENTORY) },
    { id: "si-media-close", label: "Media — Next step", html: closer("si-media-close", ctx, {
      h: "Planning a shoot?", p: "Describe the location, the story and where the images or video will be used. Blake will discuss what is practical, including any aerial requirements for the site.",
    }) },
  ];
}

/* ---------------- ABOUT ---------------- */
function aboutSections(ctx) {
  const a = ctx.assets;
  return [
    { id: "si-about-intro", label: "About — Introduction", html: intro("si-about-intro", {
      h1: "Direct collaboration. <em>Thoughtful design.</em>",
      lede: "Snowden Design is Blake Snowden’s independent studio in Denver, Colorado.",
      body: `<p class="si-body">When you work with Snowden Design, you work with Blake: the person who listens to the brief, designs the pages, builds the site and answers the email afterward. Nothing gets lost between departments because there are none.</p>`,
      aside: `<figure class="si-portrait"><img src="${a.blake}" alt="Blake Snowden, founder of Snowden Design" loading="eager" decoding="async"></figure>`,
    }) },
    { id: "si-about-approach", label: "About — Approach", html: `<section class="sd-sec si-approach" id="si-about-approach" aria-labelledby="si-about-approach-h"><div class="sd-wrap si-approach__in">
    <h2 class="sd-h sd-h2 sd-r" id="si-about-approach-h">Art and technology at one desk</h2>
    <div class="sd-r" style="--d:.1s"><p>Blake’s work moves between website design and development, UX, brand and graphic design, illustration, 3D rendering, photography and video. Keeping those disciplines together means the visual idea survives the trip from first sketch to live site.</p>
    <p>Every project starts with strategy: what the business needs, who it needs to reach and what will help them decide. Design, build and content follow from that, along with SEO, GEO and a plan for how the site keeps working after launch.</p></div>
    </div></section>` },
    { id: "si-about-evidence", label: "About — Evidence", html: `<section class="si-band si-band--stone" id="si-about-evidence" aria-labelledby="si-about-evidence-h"><div class="sd-wrap si-band__in">
    <h2 class="sd-h sd-h2 sd-r" id="si-about-evidence-h">See how that plays out</h2>
    <div class="sd-r" style="--d:.1s"><p>Helen Falls Lodge, Shadow Creek Ranch, Edge Internet, Harbour View Cottages and Trout Extravaganza show the range in websites; MONGRAIN shows the dimensional side of the studio.</p>
    <p class="si-links">${textLink("work", ctx, "Browse the work", "link-about-work")}${textLink("3d-interactive", ctx, "Explore MONGRAIN", "link-about-3d")}</p></div>
    </div></section>` },
    { id: "si-about-close", label: "About — Next step", html: closer("si-about-close", ctx, {
      h: "Talk to the person doing the work.", p: "Questions, a project or just an idea worth testing. Blake reads every message himself.",
    }) },
  ];
}

/* ---------------- CONTACT ---------------- */
function contactSections(ctx) {
  const a = ctx.assets;
  return [
    { id: "si-contact-intro", label: "Contact — Introduction and details", html: `<section class="si-contact" id="si-contact-intro" aria-labelledby="si-contact-intro-h"><div class="sd-wrap si-contact__in">
    <figure class="si-contact__img sd-in"><img src="${a.portrait}" alt="Blake Snowden seated in the Snowden Design studio in Denver" width="1400" height="933" loading="eager" decoding="async"></figure>
    <div class="si-contact__copy">
      <h1 class="sd-h si-h1 sd-in" id="si-contact-intro-h" style="--d:.08s">Tell me what you’re <em>working on.</em></h1>
      <p class="si-lede sd-in" style="--d:.16s">A new website, a redesign, a brand, a 3D idea or a question about search. A few sentences are enough to start.</p>
      <ul class="si-reach sd-in" style="--d:.24s">
        <li><span>Email</span><a href="${MAIL}" data-testid="link-contact-email">blake@snowden-design.com</a></li>
        <li><span>Phone</span><a href="${TEL}" data-testid="link-contact-phone">(720) 340-2611</a></li>
        <li><span>Studio</span><b>Denver, Colorado</b></li>
      </ul>
    </div></div></section>` },
    { id: "si-contact-brief", label: "Contact — What to include", html: `<section class="sd-sec si-brief" id="si-contact-brief" aria-labelledby="si-contact-brief-h"><div class="sd-wrap si-brief__in">
    <h2 class="sd-h sd-h2 sd-r" id="si-contact-brief-h">Helpful to mention</h2>
    <ul class="sd-r" style="--d:.1s"><li>Your business and who you serve</li><li>Your current website, if there is one</li><li>What you want to change, add or fix</li><li>Any timing you are working toward</li></ul>
    </div></section>` },
  ];
}

const BUILDERS = {
  "work": [workSections, "Work", "Portfolio | Snowden Design, Denver"],
  "services": [servicesSections, "Services", "Web Design & Branding Services | Snowden Design"],
  "3d-interactive": [threeDSections, "3D & Rendering", "3D Rendering & Interactive Visualization | Snowden Design"],
  "seo-geo": [seoSections, "SEO & GEO", "Denver SEO & GEO | Snowden Design"],
  "website-growth": [growthSections, "Website & Growth Plans", "Website Care & Growth Support | Snowden Design"],
  "drone-photograph-video": [mediaSections, "Photography, Video & Aerial", "Photography, Video & Aerial | Snowden Design"],
  "about": [aboutSections, "About", "About Blake Snowden | Snowden Design"],
  "contact": [contactSections, "Contact", "Contact Snowden Design, Denver"],
};

export function interiorPage(slug, ctx) {
  const b = BUILDERS[slug];
  if (!b) throw new Error("Unknown interior page: " + slug);
  return { slug, name: b[1], ...INTERIOR_METADATA[slug], sections: b[0](ctx) };
}
