// Shared source for the React preview AND the Wix single-file export.
import { photographyBody } from "./photography-shared.mjs";
export const WIX = "https://www.snowden-design.com";
export const OFFICE_IMAGE_URL = "https://static.wixstatic.com/media/2fde66_43ece87cc34f489fa517863e80fbf668~mv2.png";
export const LINKS = {
  home: WIX,
  work: WIX + "/work",
  harbourDock: "https://snowden-design.wixstudio.com/harbourviewcottages/dock",
  services: WIX + "/services",
  threeD: WIX + "/3d-interactive",
  seo: WIX + "/seo-geo",
  plans: WIX + "/website-growth",
  about: WIX + "/about",
  contact: WIX + "/contact",
  mail: "mailto:blake@snowden-design.com",
  tel: "tel:+17203402611",
};

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
// previewBase: explicit local-preview mode (internal links stay in the app, no target).
// Exports omit it and keep verified live Wix URLs with target="_top".
export function localLinks(previewBase) {
  const b = previewBase.replace(/\/$/, "");
  const out = { ...LINKS };
  for (const k of ["work", "services", "threeD", "seo", "plans", "about", "contact"]) out[k] = b + new URL(LINKS[k]).pathname;
  out.home = b + "/";
  return out;
}

export function homeBody(a, { includeWork = true, previewBase } = {}) {
  const L = previewBase ? localLinks(previewBase) : LINKS;
  const T = previewBase ? "" : ' target="_top"';
  const ext = (href, cls, label, testid) =>
    `<a class="${cls}" href="${href}"${T} data-testid="${testid}">${label}</a>`;
  const viewer = a.mongrainViewerHtml
    ? `srcdoc="${a.mongrainViewerHtml.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}"`
    : `src="${a.mongrainViewerUrl || "about:blank"}"`;
  return `
<section class="sd-hero sd-dark" id="sd-top" aria-labelledby="sd-hero-h">
  <div class="sd-hero__grid" aria-hidden="true"></div>
  <div class="sd-wrap sd-hero__in">
    <div>
      <div class="sd-hero__tag sd-mono sd-in"><span class="sd-dot" aria-hidden="true"></span>Denver studio / Blake Snowden</div>
      <h1 class="sd-h sd-hero__title sd-in" id="sd-hero-h" style="--d:.1s">Denver web design. <em>Full-spectrum strategy.</em></h1>
      <p class="sd-hero__sub sd-in" style="--d:.2s">Blake Snowden combines custom website design and development, UX, branding and interactive 3D visualization. Based in Denver, Colorado, Snowden Design builds responsive Wix Studio websites with SEO, GEO and a plan for growth after launch.</p>
      <div class="sd-hero__ctas sd-in" style="--d:.3s">
        <a class="sd-btn sd-hero-metal" href="${L.work}"${T} data-testid="link-hero-work"><span class="sd-hero-metal__sweep" aria-hidden="true"></span><span class="sd-hero-metal__label">See the work ${arrow}</span></a>
      </div>
    </div>
    <div class="sd-hero__office sd-in" style="--d:.25s">
      <div class="sd-studio-frame"><img class="sd-studio-photo" src="${a.office}" alt="Snowden Design office and creative studio, with a photography workspace, leather seating and outdoor-inspired artwork" width="1800" height="1013" fetchpriority="high" decoding="async"></div>
    </div>
  </div>
  <nav class="sd-wrap" aria-label="Capabilities">
    <div class="sd-hero__caps">
      <a href="${L.services}"${T} data-testid="link-cap-web">Web design</a>
      <a href="${L.services}"${T} data-testid="link-cap-brand">Brand</a>
      <a href="#sd-mongrain" data-testid="link-cap-3d">3D visualization</a>
      <a href="${L.seo}"${T} data-testid="link-cap-seo">SEO / GEO</a>
      <a href="#sd-care" data-testid="link-cap-care">Site care</a>
      <a href="#sd-care" data-testid="link-cap-ai">AI-informed marketing</a>
    </div>
  </nav>
</section>

${includeWork ? `<section class="sd-sec" id="sd-work" aria-labelledby="sd-work-h">
  <div class="sd-wrap">
    <div class="sd-head sd-r">
      <div><div class="sd-eyebrow sd-mono">Selected work</div><h2 class="sd-h sd-h2" id="sd-work-h">Current sites and development projects</h2></div>
      <p>Hospitality, outdoor experiences and regional businesses. Distinct websites shaped around each brand and its audience.</p>
    </div>
    <div class="sd-work">
      <article class="sd-proj sd-proj--wide sd-r" data-testid="card-work-helen">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/11062b_c03c18107aa741d0b13a2c8df3318228f000.jpg" aria-label="Helen Falls Lodge video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_f2e168501b00401ebc86268b0d582a7c/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta"><span class="sd-mono">Hospitality / Website</span><h3 class="sd-h">Helen Falls Lodge</h3><p style="font-weight:600;margin-bottom:8px">Helicopter fly-fishing eco-tourism lodge</p><p>A lodge site that sells the setting first: large-format imagery, calm pacing and a clear path to booking.</p><p class="sd-dock__fallback" data-sd-video-status>If the film does not load, <a href="https://video.wixstatic.com/video/2fde66_f2e168501b00401ebc86268b0d582a7c/720p/mp4/file.mp4" target="_blank" rel="noopener noreferrer">open the lodge video directly</a>.</p><a class="sd-dock__visit sd-mono" href="https://www.helenfalls.com/" target="_blank" rel="noopener noreferrer">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a></div>
      </article>
      <article class="sd-proj sd-proj--side sd-r" style="--d:.1s" data-testid="card-work-shadow">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://images.squarespace-cdn.com/content/v1/63652eb406ab3052274f9d87/d9388c8e-3eca-4e6e-9dd9-bf36c0b26b92/colors1.png?format=1500w" aria-label="Shadow Creek Ranch video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_1321b0fab13042f6a6182391d76cd773/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta"><span class="sd-mono">Ranch / Website</span><h3 class="sd-h">Shadow Creek Ranch</h3><p>Western character, modern build.</p><p class="sd-dock__fallback" data-sd-video-status>If the film does not load, <a href="https://video.wixstatic.com/video/2fde66_1321b0fab13042f6a6182391d76cd773/720p/mp4/file.mp4" target="_blank" rel="noopener noreferrer">open the ranch video directly</a>.</p><a class="sd-dock__visit sd-mono" href="https://www.shadowcreekranch.co/" target="_blank" rel="noopener noreferrer">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a></div>
      </article>
      <article class="sd-proj sd-r" data-testid="card-work-edge">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/87eb36_882dce2320e34252adf91728748e649bf000.jpg" aria-label="Edge Internet video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_d886db2c5c854f33b4082add08836e7f/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta"><span class="sd-mono">Broadband / Website</span><h3 class="sd-h">Edge Internet</h3><p>A broadband provider site organized around what customers actually come to do: check service, compare plans and get connected.</p><p class="sd-dock__fallback" data-sd-video-status>If the film does not load, <a href="https://video.wixstatic.com/video/2fde66_d886db2c5c854f33b4082add08836e7f/720p/mp4/file.mp4" target="_blank" rel="noopener noreferrer">open the Edge video directly</a>.</p><a class="sd-dock__visit sd-mono" href="https://www.edgeinternet.co/" target="_blank" rel="noopener noreferrer">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a></div>
      </article>
      <a class="sd-proj sd-r" href="https://snowden-design.wixstudio.com/harbourviewcottages/cottages" target="_blank" rel="noopener noreferrer" data-testid="card-work-harbour">
        <div class="sd-proj__img"><img src="${a.harbour}" alt="Harbour View Cottages website showing the High Tide and Low Tide cottages on Harbour Island" loading="lazy" width="1200" height="675"></div>
        <div class="sd-proj__meta"><span class="sd-mono">Island hospitality / Website</span><h3 class="sd-h">Harbour View Cottages</h3><p>An island retreat presented through immersive photography, two distinct cottages and a relaxed coastal atmosphere.</p><span class="sd-mono">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></span></div>
      </a>
      <article class="sd-proj sd-r" style="--d:.1s" data-testid="card-work-trout">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_5dec8a6bf78d4aeebb6247cd23bedac2f000.jpg" aria-label="Trout Extravaganza video preview">
            <source data-src="https://video.wixstatic.com/video/2fde66_934dbed7c2a349469945735238578cbc/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta"><span class="sd-mono">Fly fishing &amp; outdoor experiences / Website</span><h3 class="sd-h">Trout Extravaganza</h3><p>A landscape-led fly-fishing experience with cinematic imagery and dedicated pages for the gathering, field guide and waters.</p><p class="sd-dock__fallback" data-sd-video-status>If the film does not load, <a href="https://video.wixstatic.com/video/2fde66_934dbed7c2a349469945735238578cbc/720p/mp4/file.mp4" target="_blank" rel="noopener noreferrer">open the river video directly</a>.</p><a class="sd-dock__visit sd-mono" href="https://www.troutextravaganza.com/" target="_blank" rel="noopener noreferrer">Visit website ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a></div>
      </article>
      <article class="sd-proj sd-proj--dock sd-r" style="--d:.16s" data-testid="card-work-harbour-dock">
        <div class="sd-proj__img sd-proj__video">
          <video data-sd-portfolio-video muted loop playsinline controls preload="metadata" poster="https://static.wixstatic.com/media/2fde66_a07f7aa44ef646dd8233075a6292ba43f000.jpg" aria-label="Boat approaching the Harbour Island dock">
            <source data-src="https://video.wixstatic.com/video/2fde66_a07f7aa44ef646dd8233075a6292ba43/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support this video.
          </video>
        </div>
        <div class="sd-proj__meta">
          <span class="sd-mono">Harbour Island / Video &amp; Website</span>
          <h3 class="sd-h">Harbour Island Dock</h3>
          <p>A boat’s-eye arrival at the Harbour View Cottages dock. Play the film here, or visit the dock page for the full setting.</p>
          <p class="sd-dock__fallback" data-sd-video-status>If the film does not load, <a href="https://video.wixstatic.com/video/2fde66_a07f7aa44ef646dd8233075a6292ba43/720p/mp4/file.mp4" target="_blank" rel="noopener noreferrer">open the boat video directly</a>.</p>
          <a class="sd-dock__visit sd-mono" href="${L.harbourDock}" target="_blank" rel="noopener noreferrer" data-testid="link-harbour-dock">Visit dock page ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
    </div>
    <p class="sd-r" style="margin-top:32px">${ext(L.work, "sd-btn sd-btn--line", "Explore the portfolio " + arrow, "link-work-all")}</p>
  </div>
</section>` : ""}

<section class="sd-mg sd-dark" id="sd-mongrain" aria-labelledby="sd-mg-h" data-active="all">
  <div class="sd-wrap">
    <div class="sd-mg__intro">
      <div class="sd-eyebrow sd-mono">3D / Interactive visualization</div>
      <h2 class="sd-h sd-h2" id="sd-mg-h">Mongrain: a building you can take apart.</h2>
      <p class="sd-mg__status sd-mono" data-testid="status-mongrain">Project in development</p>
      <p>Explore the MONGRAIN hospital building in 3D. Rotate the model and select its roof, wall or foundation systems to explore their assemblies.</p>
      <p class="sd-mg__note">In development. This is an illustrative architectural representation, not a completed engineering product, as-built BIM model, or performance analysis.</p>
      <p style="margin-top:26px">${ext(L.threeD, "sd-btn sd-hero-metal", '<span class="sd-hero-metal__sweep" aria-hidden="true"></span><span class="sd-hero-metal__label">Explore 3D work ' + arrow + "</span>", "link-3d")}</p>
    </div>
    <iframe class="sd-mg__viewer" title="MONGRAIN interactive hospital building envelope explorer" ${viewer} loading="${a.mongrainViewerHtml ? "eager" : "lazy"}" allow="fullscreen" sandbox="allow-scripts allow-same-origin"></iframe>
  </div>
</section>

${photographyBody(a.camera, { contactHref: L.contact, target: T })}

<section class="sd-sec" id="sd-services" aria-labelledby="sd-svc-h">
  <div class="sd-wrap">
    <div class="sd-head sd-r">
      <div><div class="sd-eyebrow sd-mono">Capabilities</div><h2 class="sd-h sd-h2" id="sd-svc-h">Art and technology, one desk.</h2></div>
      <p>Strategy, design, build and content handled in one place, so the idea survives all the way to launch.</p>
    </div>
    <div class="sd-svc sd-r">
      <article><h3 class="sd-h">Web design, development and UX</h3><p>Custom website design and website redesign for Denver small businesses, with responsive Wix Studio development and user experience built in from the first sketch.</p></article>
      <article><h3 class="sd-h">Brand strategy and graphic design</h3><p>Branding and web design developed together: visual identity, style guides, illustration and digital art that give a business a consistent voice.</p></article>
      <article><h3 class="sd-h">3D modeling and rendering</h3><p>Product, architectural and brand models, rendered stills and interactive scenes for the web.</p></article>
      <article><h3 class="sd-h">SEO and GEO</h3><p>Search-focused website structure and content, with technical SEO and generative engine optimization to support discoverability in search and AI-assisted answers. Rankings and citations are not guaranteed.</p></article>
      <article><h3 class="sd-h">Business video production</h3><p>Live-action video, drone footage and photography that help explain a business, show its work and give website visitors useful context.</p></article>
      <article><h3 class="sd-h">E-commerce</h3><p>Stores that are pleasant to browse and straightforward to run.</p></article>
    </div>
    <p class="sd-r" style="margin-top:32px">${ext(L.services, "sd-btn sd-btn--line", "All services " + arrow, "link-services")}</p>
  </div>
</section>

<section class="sd-wrap sd-care" id="sd-care" aria-labelledby="sd-care-h">
  <div class="sd-panel sd-panel--dark sd-dark sd-r">
    <div class="sd-eyebrow sd-mono">Ongoing</div>
    <h2 class="sd-h sd-h2" id="sd-care-h">Launch is the start, not the finish.</h2>
    <ul>
      <li><b>Site care</b><span>Updates, content changes, fixes and checks on a recurring schedule.</span></li>
      <li><b>SEO / GEO</b><span>Ongoing search and AI-answer visibility work as your content grows.</span></li>
      <li><b>Ads</b><span>Campaign setup and management, informed by what the site data shows.</span></li>
      <li><b>Social</b><span>Posts and visuals that stay consistent with the brand.</span></li>
    </ul>
    ${ext(L.plans, "sd-btn sd-btn--teal", "See care plans " + arrow, "link-plans")}
  </div>
  <div class="sd-panel sd-r" style="--d:.1s">
    <div class="sd-eyebrow sd-mono">Deliverable</div>
    <h3 class="sd-h sd-h2">Analytics you can read.</h3>
    <p>Care plans include plain-language reporting: what changed, what people did on the site, and what to try next. AI tools help spot patterns; decisions stay human.</p>
    <figure class="sd-report-preview">
      <img src="${a.analytics}" alt="Wix Analytics Traffic Overview showing site sessions, unique visitors, traffic sources, visitor devices and sessions by country" width="790" height="1024" loading="lazy" decoding="async">
      <figcaption>Wix Analytics reporting example. Static screenshot, not live data or a guarantee of future results.</figcaption>
    </figure>
  </div>
</section>

<section class="sd-sec" id="sd-about" aria-labelledby="sd-about-h">
  <div class="sd-wrap">
    <div class="sd-about">
      <div class="sd-about__img sd-r"><img src="${a.blake}" alt="Blake Snowden, founder of Snowden Design" loading="lazy"></div>
      <div class="sd-r" style="--d:.1s">
        <div class="sd-eyebrow sd-mono">The studio</div>
        <h2 class="sd-h sd-h2" id="sd-about-h">Hi, I'm Blake.</h2>
        <p>I'm a web designer and developer in Denver, Colorado, and the founder of Snowden Design. My focus is art, interactive visuals, digital and video production, 3D, and e-commerce.</p>
        <p>Every site starts with a full-spectrum strategy: what the business needs, who it needs to reach, and the content that will move them.</p>
        <ul class="sd-chips" aria-label="Skills"><li>Website design</li><li>UX</li><li>Logo design</li><li>Illustration</li><li>3D rendering</li><li>Video</li><li>Drone</li><li>SEO</li><li>GEO</li><li>Social</li></ul>
        <p style="margin-top:28px">${ext(L.about, "sd-btn sd-btn--line", "About the studio " + arrow, "link-about")}</p>
      </div>
    </div>
    <ol class="sd-steps sd-r" aria-label="Process">
      <li><b>Strategy</b><p>Goals, audience and the content that matters.</p></li>
      <li><b>Design</b><p>Brand, layout, motion and 3D where it helps.</p></li>
      <li><b>Build</b><p>Fast, accessible, search-ready pages.</p></li>
      <li><b>Care</b><p>Recurring updates, SEO/GEO and reporting.</p></li>
    </ol>
  </div>
</section>

<section class="sd-cta sd-dark" id="sd-contact" aria-labelledby="sd-cta-h">
  <div class="sd-wrap sd-r">
    <div class="sd-eyebrow sd-mono">Contact</div>
    <h2 class="sd-h" id="sd-cta-h">Bring the whole brief. <em>Or just the idea.</em></h2>
    <p>Websites, brand, 3D and ongoing care from one Denver studio. Tell Blake what you're building.</p>
    <div class="sd-cta__row">
      <a class="sd-btn sd-btn--teal" href="${L.mail}" data-testid="link-email">blake@snowden-design.com ${arrow}</a>
      <a class="sd-btn sd-btn--ghost" href="${L.tel}" data-testid="link-phone">(720) 340-2611</a>
      ${ext(L.contact, "sd-btn sd-btn--ghost", "Contact page", "link-contact")}
    </div>
  </div>
</section>`;
}

export const CAPTIONS = {
  all: "Three envelope layers, separated in space so each reads on its own.",
  roof: "Roof: the top enclosure, lifted clear of the tower.",
  walls: "Walls: the vertical enclosure, including the podium facade.",
  foundation: "Foundation: base and anchorage, shown at grade.",
};

// Behavior shared by React (called in useEffect) and the export (inlined).
export function initHome(root, captions) {
  var cleanups = [];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rs = root.querySelectorAll(".sd-r");
  if ("IntersectionObserver" in window && !reduce) {
    root.classList.add("sd-js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rs.forEach(function (el) { io.observe(el); });
    var safety = setTimeout(function () { rs.forEach(function (el) { el.classList.add("is-in"); }); }, 4000);
    cleanups.push(function () { io.disconnect(); clearTimeout(safety); });
  }
  var videos = root.querySelectorAll("[data-sd-portfolio-video]");
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(connection && connection.saveData);
  var autoPlayAllowed = !reduce && !saveData;
  videos.forEach(function (video) {
    var source = video.querySelector("source[data-src]");
    var inView = false;
    var manuallyPaused = false;
    var autoStarted = false;
    var suppressPause = false;
    var failed = false;
    var ensureSource = function () {
      if (source && !source.getAttribute("src")) {
        source.setAttribute("src", source.getAttribute("data-src"));
        video.load();
      }
    };
    var setVideoStatus = function () {
      failed = true;
      var card = video.closest(".sd-proj");
      var status = card && card.querySelector("[data-sd-video-status]");
      if (status) status.setAttribute("data-playback", "fallback");
    };
    var onPlay = function () {
      if (!autoStarted) manuallyPaused = false;
    };
    var onPause = function () {
      if (inView && autoStarted && !suppressPause) manuallyPaused = true;
      autoStarted = false;
    };
    var onError = setVideoStatus;
    video.controls = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    video.addEventListener("click", ensureSource);
    var enter = function () {
      inView = true;
      video.preload = "metadata";
      ensureSource();
      if (!autoPlayAllowed || manuallyPaused || failed) return;
      autoStarted = true;
      var attempt;
      try { attempt = video.play(); } catch (err) { autoStarted = false; setVideoStatus(); return; }
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(function () { autoStarted = false; setVideoStatus(); });
      }
    };
    var leave = function () {
      inView = false;
      video.preload = "none";
      if (!video.paused) {
        suppressPause = true;
        video.pause();
        suppressPause = false;
      }
      autoStarted = false;
    };
    var observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) enter(); else leave(); });
      }, { threshold: 0.15, rootMargin: "100px 0px" });
      observer.observe(video);
    } else {
      video.preload = "none";
      ensureSource();
    }
    cleanups.push(function () {
      if (observer) observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
      video.removeEventListener("click", ensureSource);
    });
  });
  var mg = root.querySelector(".sd-mg");
  if (mg) {
    var btns = mg.querySelectorAll("[data-sd-layer]");
    var cap = mg.querySelector("[data-sd-cap]");
    btns.forEach(function (b) {
      var h = function () {
        var l = b.getAttribute("data-sd-layer");
        mg.setAttribute("data-active", l);
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        if (cap) cap.textContent = captions[l];
      };
      b.addEventListener("click", h);
      cleanups.push(function () { b.removeEventListener("click", h); });
    });
  }
  var lookbooks = root.querySelectorAll("[data-sd-lookbook]");
  lookbooks.forEach(function (details) {
    var template = details.querySelector("[data-sd-lookbook-template]");
    var mount = details.querySelector(".si-lime__embed");
    if (!template || !mount) return;
    var frame = null;
    var syncLookbook = function () {
      if (details.open) {
        if (!frame) {
          frame = template.content.firstElementChild.cloneNode(true);
          mount.appendChild(frame);
        }
      } else if (frame) {
        frame.remove();
        frame = null;
      }
    };
    details.addEventListener("toggle", syncLookbook);
    syncLookbook();
    cleanups.push(function () {
      details.removeEventListener("toggle", syncLookbook);
      if (frame) frame.remove();
    });
  });
  var tilt = root.querySelector("[data-sd-tilt]");
  if (tilt && !reduce) {
    var img = tilt.querySelector("img");
    var mv = function (e) {
      var r = tilt.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      img.style.setProperty("--sd-rx", (x * 16).toFixed(2) + "deg");
      img.style.setProperty("--sd-ry", (-y * 12).toFixed(2) + "deg");
    };
    var lv = function () { img.style.setProperty("--sd-rx", "0deg"); img.style.setProperty("--sd-ry", "0deg"); };
    tilt.addEventListener("pointermove", mv); tilt.addEventListener("pointerleave", lv);
    cleanups.push(function () { tilt.removeEventListener("pointermove", mv); tilt.removeEventListener("pointerleave", lv); });
  }
  var analytics = root.querySelector("[data-sd-original-showcase]");
  if (analytics) {
    var slides = Array.prototype.slice.call(analytics.querySelectorAll("[data-sd-analytics-slide]"));
    var selectors = Array.prototype.slice.call(analytics.querySelectorAll("[data-sd-analytics-select]"));
    var currentLabel = analytics.querySelector("[data-sd-analytics-current]");
    var toggle = analytics.querySelector("[data-sd-analytics-toggle]");
    var toggleLabel = analytics.querySelector("[data-sd-analytics-toggle-label]");
    var replay = analytics.querySelector("[data-sd-analytics-replay]");
    var previous = analytics.querySelector("[data-sd-analytics-prev]");
    var next = analytics.querySelector("[data-sd-analytics-next]");
    var expand = analytics.querySelector("[data-sd-analytics-expand]");
    var fullDialog = analytics.querySelector("[data-sd-analytics-dialog]");
    var fullClose = analytics.querySelector("[data-sd-analytics-close]");
    var fullTitle = analytics.querySelector("[data-sd-analytics-full-title]");
    var fullImage = analytics.querySelector("[data-sd-analytics-full-image]");
    var fullScroll = analytics.querySelector("[data-sd-analytics-full-scroll]");
    var fullError = analytics.querySelector("[data-sd-analytics-full-error]");
    var savedBodyOverflow = null;
    var viewerOpener = null;
    var motionPreference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    var showcaseReduced = !!(motionPreference && motionPreference.matches);
    var pageVisible = !document.hidden;
    var inView = false;
    var paused = false;
    var finished = false;
    var started = false;
    var activeIndex = 0;
    var animations = [];
    var motionRun = 0;
    var showcasePlaybackRate = 0.5;
    var advancePending = false;
    var syncExpand = function () {
      var image = slides[activeIndex].querySelector("[data-sd-analytics-image]");
      if (expand) expand.disabled = !fullDialog || !fullDialog.showModal || !image || !image.complete || !image.naturalWidth || image.hidden;
    };
    var syncLabel = function () {
      syncExpand();
      if (toggleLabel) toggleLabel.textContent = showcaseReduced ? "Still image" : (paused || (finished && !advancePending) ? "Play" : "Pause");
      if (toggle) {
        toggle.disabled = showcaseReduced;
        toggle.setAttribute("aria-pressed", String(paused));
      }
      if (replay) replay.disabled = showcaseReduced;
    };
    var cancelMotion = function () {
      motionRun++;
      advancePending = false;
      animations.forEach(function (animation) { animation.cancel(); });
      animations = [];
      slides.forEach(function (slide, i) {
        slide.classList.remove("is-leaving");
        slide.removeAttribute("aria-hidden");
        slide.hidden = i !== activeIndex;
        slide.querySelectorAll("[data-sd-analytics-mask]").forEach(function (mask) {
          mask.style.visibility = "hidden";
          mask.style.transform = "scaleX(0)";
        });
        slide.querySelectorAll(".si-analytics__pulse").forEach(function (ring) {
          ring.style.opacity = "0";
        });
        slide.querySelectorAll("[data-sd-geo-line]").forEach(function (path) {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
        });
        slide.querySelectorAll("[data-sd-geo-bar]").forEach(function (bar) {
          bar.style.transform = "";
          bar.style.transformOrigin = "";
        });
        slide.querySelectorAll("[data-sd-geo-indicator]").forEach(function (indicator) {
          indicator.style.opacity = "";
        });
      });
    };
    var setSlide = function (index, shouldAnimate) {
      var outgoing = slides[activeIndex];
      activeIndex = (index + slides.length) % slides.length;
      cancelMotion();
      started = false;
      finished = showcaseReduced;
      slides.forEach(function (slide, i) {
        slide.hidden = i !== activeIndex;
        slide.classList.toggle("is-current", i === activeIndex);
      });
      selectors.forEach(function (button, i) {
        button.classList.toggle("is-current", i === activeIndex);
        button.setAttribute("aria-current", String(i === activeIndex));
      });
      if (currentLabel) currentLabel.textContent = "Slide " + String(activeIndex + 1).padStart(2, "0");
      syncLabel();
      if (shouldAnimate && inView && pageVisible && !paused && !showcaseReduced) {
        var incoming = slides[activeIndex];
        if (incoming !== outgoing && incoming.animate) {
          // Prepare the chart under the entrance wipe, so a finished chart never flashes first.
          incoming.querySelectorAll("[data-sd-analytics-mask]").forEach(function (mask) {
            mask.style.visibility = "visible";
            mask.style.transform = mask.getAttribute("data-sd-mask-mode") === "fade" ? "none" : "scaleX(1)";
          });
          outgoing.hidden = false;
          outgoing.classList.add("is-leaving");
          outgoing.setAttribute("aria-hidden", "true");
          started = true;
          var transitionRun = motionRun;
          animations = [
            outgoing.animate([
              { opacity: 1, transform: "translateX(0)", clipPath: "inset(0 0 0 0)" },
              { opacity: 0, transform: "translateX(-3%)", clipPath: "inset(0 100% 0 0)" }
            ], { duration: 50, easing: "ease-in-out", fill: "both" }),
            incoming.animate([
              { opacity: 0, transform: "translateX(3%)", clipPath: "inset(0 0 0 100%)" },
              { opacity: 1, transform: "translateX(0)", clipPath: "inset(0 0 0 0)" }
            ], { duration: 50, easing: "ease-in-out", fill: "both" })
          ];
          animations.forEach(function (animation) { animation.playbackRate = showcasePlaybackRate; });
          Promise.all(animations.map(function (animation) { return animation.finished; })).then(function () {
            if (transitionRun !== motionRun) return;
            animations.forEach(function (animation) { animation.cancel(); });
            animations = [];
            outgoing.hidden = true;
            outgoing.classList.remove("is-leaving");
            outgoing.removeAttribute("aria-hidden");
            started = false;
            startMotion();
          }).catch(function () { /* Manual selection, motion preference or cleanup cancelled this transition. */ });
        } else startMotion();
      }
    };
    var advanceIfReady = function () {
      if (!advancePending || paused || showcaseReduced || !inView || !pageVisible || activeIndex >= slides.length - 1) return;
      var image = slides[activeIndex + 1].querySelector("[data-sd-analytics-image]");
      if (image && (!image.complete || !image.naturalWidth)) return;
      setSlide(activeIndex + 1, true);
    };
    var completeMotion = function () {
      finished = true;
      started = false;
      advancePending = activeIndex < slides.length - 1;
      syncLabel();
      advanceIfReady();
    };
    var startMotion = function () {
      if (showcaseReduced || !inView || !pageVisible || paused || started) return;
      var activeImage = slides[activeIndex].querySelector("[data-sd-analytics-image]");
      if (activeImage && (!activeImage.complete || !activeImage.naturalWidth)) return;
      if (!window.Element || !window.Element.prototype.animate) {
        finished = true;
        cancelMotion();
        syncLabel();
        return;
      }
      started = true;
      finished = false;
      var slide = slides[activeIndex];
      var targets = [];
      slide.querySelectorAll("[data-sd-analytics-mask]").forEach(function (mask) {
        mask.style.visibility = "visible";
        var fade = mask.getAttribute("data-sd-mask-mode") === "fade";
        mask.style.transform = fade ? "none" : "scaleX(1)";
        targets.push(mask.animate(fade ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], {
          duration: 3000, easing: "cubic-bezier(.45, 0, .2, 1)", fill: "forwards"
        }));
      });
      slide.querySelectorAll(".si-analytics__pulse").forEach(function (ring) {
        targets.push(ring.animate([
          { transform: "translate(-50%, -50%) scale(.65)", opacity: .48 },
          { transform: "translate(-50%, -50%) scale(1.75)", opacity: 0 }
        ], { duration: 3000, easing: "ease-out", fill: "forwards" }));
      });
      slide.querySelectorAll("[data-sd-geo-line]").forEach(function (path) {
        var length = 0;
        try { length = path.getTotalLength(); } catch (err) { length = 0; }
        if (!length) return;
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        targets.push(path.animate([
          { strokeDashoffset: String(length) },
          { strokeDashoffset: "0" }
        ], { duration: 1500, easing: "cubic-bezier(.45, 0, .2, 1)", fill: "forwards" }));
      });
      slide.querySelectorAll("[data-sd-geo-bar]").forEach(function (bar) {
        bar.style.transformOrigin = "left center";
        targets.push(bar.animate([
          { transform: "scaleX(0)" },
          { transform: "scaleX(1)" }
        ], { duration: 1000, delay: 120, easing: "cubic-bezier(.2, .7, .2, 1)", fill: "forwards" }));
      });
      slide.querySelectorAll("[data-sd-geo-indicator]").forEach(function (indicator) {
        targets.push(indicator.animate([
          { opacity: .48 }, { opacity: 1 }
        ], { duration: 1200, easing: "ease-out", fill: "forwards" }));
      });
      targets.forEach(function (animation) { animation.playbackRate = showcasePlaybackRate; });
      animations = targets;
      if (!targets.length) { completeMotion(); return; }
      var chartRun = motionRun;
      // Wait for every plot reveal, not merely the last animation added to the list.
      Promise.all(targets.map(function (animation) { return animation.finished; })).then(function () {
        if (chartRun !== motionRun) return;
        completeMotion();
      }).catch(function () { /* A cancelled cycle must never advance a later slide. */ });
      if (paused || !pageVisible || !inView) targets.forEach(function (animation) { animation.pause(); });
      syncLabel();
    };
    var onToggle = function () {
      if (showcaseReduced) return;
      if (!paused && (!finished || advancePending)) {
        paused = true;
        animations.forEach(function (animation) { animation.pause(); });
      } else {
        paused = false;
        if (advancePending) { advanceIfReady(); syncLabel(); return; }
        if (finished) {
          setSlide(0, true);
          return;
        }
        if (finished || !started) startMotion();
        else animations.forEach(function (animation) { animation.play(); });
      }
      syncLabel();
    };
    var onReplay = function () {
      if (showcaseReduced) return;
      paused = false;
      setSlide(0, true);
    };
    var onVisibility = function () {
      pageVisible = !document.hidden;
      if (pageVisible && inView && !paused && !showcaseReduced) {
        if (advancePending) advanceIfReady();
        else if (!started && !finished) startMotion();
        else if (started) animations.forEach(function (animation) { animation.play(); });
      } else animations.forEach(function (animation) { animation.pause(); });
    };
    var onPrevious = function () { setSlide(activeIndex - 1, true); };
    var onNext = function () { setSlide(activeIndex + 1, true); };
    var onSelect = function (event) {
      var button = event.target.closest && event.target.closest("[data-sd-analytics-select]");
      if (button && analytics.contains(button)) setSlide(Number(button.getAttribute("data-sd-analytics-select")), true);
    };
    var onMotionPreference = function (event) {
      showcaseReduced = event.matches;
      if (showcaseReduced) {
        cancelMotion();
        paused = !!(fullDialog && fullDialog.open);
        started = false;
        finished = true;
      } else {
        finished = false;
        if (inView && pageVisible) startMotion();
      }
      syncLabel();
    };
    var onImageError = function (event) {
      var image = event.currentTarget;
      var status = image.parentElement.querySelector("[data-sd-analytics-error]");
      if (status) status.hidden = false;
      image.hidden = true;
      if (advancePending && slides[activeIndex + 1] && slides[activeIndex + 1].contains(image)) {
        setSlide(activeIndex + 1, false);
      }
      if (slides[activeIndex].contains(image)) {
        cancelMotion();
        started = false;
        finished = true;
        syncLabel();
      }
    };
    var onImageLoad = function (event) {
      syncExpand();
      if (advancePending) advanceIfReady();
      if (slides[activeIndex].contains(event.currentTarget) && !finished) startMotion();
    };
    var images = analytics.querySelectorAll("[data-sd-analytics-image]");
    var onFullError = function () {
      fullImage.hidden = true;
      fullError.hidden = false;
    };
    var onFullOpen = function () {
      var image = slides[activeIndex].querySelector("[data-sd-analytics-image]");
      if (!image || !image.complete || !image.naturalWidth || image.hidden || fullDialog.open) return;
      viewerOpener = document.activeElement;
      paused = true;
      // Cancel any wipe/reveal and keep this exact active source stationary.
      cancelMotion();
      started = false;
      finished = showcaseReduced;
      syncLabel();
      fullTitle.textContent = slides[activeIndex].querySelector("h3").textContent + " — full size";
      fullImage.alt = image.alt;
      fullImage.width = image.naturalWidth;
      fullImage.height = image.naturalHeight;
      fullImage.style.width = image.naturalWidth + "px";
      fullError.hidden = true;
      fullImage.hidden = false;
      fullImage.src = image.currentSrc || image.src;
      // Wix embeds can be much taller than the phone's visible screen. Do not
      // center the dialog halfway down that iframe, far from the pressed button.
      if (window.self !== window.top) {
        var paneHeight = Math.min(680, window.innerHeight - 24);
        fullDialog.style.height = paneHeight + "px";
        fullDialog.style.margin = "0 auto";
        fullDialog.style.top = Math.max(12, Math.min(expand.getBoundingClientRect().top - 100, window.innerHeight - paneHeight - 12)) + "px";
      }
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      fullDialog.showModal();
      fullScroll.scrollLeft = 0;
      fullScroll.scrollTop = 0;
      fullClose.focus({ preventScroll: true });
    };
    var onFullClosed = function () {
      if (savedBodyOverflow !== null) {
        document.body.style.overflow = savedBodyOverflow;
        savedBodyOverflow = null;
      }
      fullImage.removeAttribute("src");
      if (viewerOpener && viewerOpener.isConnected) viewerOpener.focus({ preventScroll: true });
      viewerOpener = null;
    };
    var onFullClose = function () { fullDialog.close(); };
    if (expand && fullDialog) {
      expand.addEventListener("click", onFullOpen);
      fullClose.addEventListener("click", onFullClose);
      // Native dialog supplies Escape, modal focus containment and inert background.
      fullDialog.addEventListener("close", onFullClosed);
      fullImage.addEventListener("error", onFullError);
    }
    images.forEach(function (image) {
      image.addEventListener("error", onImageError);
      image.addEventListener("load", onImageLoad);
      if (image.complete && image.naturalWidth === 0) onImageError({ currentTarget: image });
    });
    toggle.addEventListener("click", onToggle);
    replay.addEventListener("click", onReplay);
    previous.addEventListener("click", onPrevious);
    next.addEventListener("click", onNext);
    analytics.addEventListener("click", onSelect);
    document.addEventListener("visibilitychange", onVisibility);
    if (motionPreference) {
      if (motionPreference.addEventListener) motionPreference.addEventListener("change", onMotionPreference);
      else if (motionPreference.addListener) motionPreference.addListener(onMotionPreference);
    }
    var showcaseObserver = null;
    var requestedDashboard = Number(new URLSearchParams(window.location.search).get("dashboard"));
    if (Number.isInteger(requestedDashboard) && requestedDashboard >= 1 && requestedDashboard <= slides.length) {
      setSlide(requestedDashboard - 1, false);
    }
    if ("IntersectionObserver" in window) {
      showcaseObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = entry.isIntersecting;
          if (inView && !paused && !showcaseReduced && pageVisible) {
            if (advancePending) advanceIfReady();
            else if (!started && !finished) startMotion();
            else if (started) animations.forEach(function (animation) { animation.play(); });
          } else if (!inView) animations.forEach(function (animation) { animation.pause(); });
        });
      }, { threshold: 0.12 });
      showcaseObserver.observe(analytics);
    } else {
      inView = true;
      if (!showcaseReduced) startMotion();
    }
    syncLabel();
    cleanups.push(function () {
      if (expand && fullDialog) {
        viewerOpener = null;
        if (fullDialog.open) fullDialog.close();
        fullDialog.removeEventListener("close", onFullClosed);
        onFullClosed();
        expand.removeEventListener("click", onFullOpen);
        fullClose.removeEventListener("click", onFullClose);
        fullImage.removeEventListener("error", onFullError);
      }
      cancelMotion();
      if (showcaseObserver) showcaseObserver.disconnect();
      toggle.removeEventListener("click", onToggle);
      replay.removeEventListener("click", onReplay);
      previous.removeEventListener("click", onPrevious);
      next.removeEventListener("click", onNext);
      analytics.removeEventListener("click", onSelect);
      document.removeEventListener("visibilitychange", onVisibility);
      if (motionPreference) {
        if (motionPreference.removeEventListener) motionPreference.removeEventListener("change", onMotionPreference);
        else if (motionPreference.removeListener) motionPreference.removeListener(onMotionPreference);
      }
      images.forEach(function (image) {
        image.removeEventListener("error", onImageError);
        image.removeEventListener("load", onImageLoad);
      });
    });
  }
  return function () { cleanups.forEach(function (f) { f(); }); };
}
