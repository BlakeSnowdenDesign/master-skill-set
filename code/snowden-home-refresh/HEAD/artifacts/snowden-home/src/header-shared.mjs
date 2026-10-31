import { ROOK, CLOSE_X } from "./header-assets.mjs";

const HAMBURGER = "https://static.wixstatic.com/media/2fde66_a47f9a9c6ccb47d794646c7ae110cca2~mv2.png";

export const HEADER_LINKS = [
  ["Work", "https://www.snowden-design.com/work"],
  ["Services", "https://www.snowden-design.com/services"],
  ["3D & Rendering", "https://www.snowden-design.com/3d-interactive"],
  ["Digital Art", "https://www.snowden-design.com/digitalart"],
  ["SEO & GEO", "https://www.snowden-design.com/seo-geo"],
  ["Website & Growth Plans", "https://www.snowden-design.com/website-growth"],
  ["Photography, Video & Aerial", "https://www.snowden-design.com/drone-photograph-video"],
  ["About", "https://www.snowden-design.com/about"],
  ["Contact", "https://www.snowden-design.com/contact"],
];

const LIVE_HOME = "https://www.snowden-design.com/";

// Hover-preview copy, taken from the supplied menu concept (Digital Art added).
const PREVIEW = [
  ["work", "A sharper digital presence.", "Web design, visual identity, and digital craft."],
  ["services", "Creative meets technical.", "A connected set of skills, shaped around your business."],
  ["3d", "See it from every angle.", "Interactive 3D, visualization, and polished rendering."],
  ["art", "Made for the wall and the screen.", "Original digital artwork, studies, and prints."],
  ["seo", "Make your expertise easier to find.", "Technical SEO, local search, and GEO foundations."],
  ["growth", "Keep building momentum.", "Website updates, search improvements, and ongoing marketing."],
  ["media", "Show the story in motion.", "Photography, video, and drone imagery with a point of view."],
  ["about", "Independent by design.", "A hands-on studio led by Blake Snowden."],
  ["contact", "Your next idea starts here.", "Denver-based. Working everywhere."],
];

const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// previewBase: explicit local-preview mode. Exports omit it and keep live URLs (target=_top).
export function headerMarkup({ previewBase } = {}) {
  const base = previewBase !== undefined ? previewBase.replace(/\/$/, "") : null;
  const homeHref = base !== null ? base + "/" : LIVE_HOME;
  const homeTarget = base !== null ? "" : ' target="_top"';
  const links = HEADER_LINKS.map(([label, live], i) => {
    // Digital Art is maintained in Wix, not duplicated by a local preview route.
    const path = new URL(live).pathname;
    const localPreview = base !== null && path !== "/digitalart";
    const href = localPreview ? base + path : live;
    const [view, title, desc] = PREVIEW[i];
    const num = String(i + 1).padStart(2, "0");
    return `<a class="sd-header__link" href="${href}"${localPreview ? "" : ' target="_top"'} style="--i:${i};--exit-i:${HEADER_LINKS.length - 1 - i}" data-view="${view}" data-overline="${esc(label)} · ${num}" data-title="${esc(title)}" data-desc="${esc(desc)}" data-testid="link-nav-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}"><small aria-hidden="true">${num}</small><span class="sd-header__label">${esc(label)}</span><span class="sd-header__arrow" aria-hidden="true">&#8599;</span></a>`;
  }).join("");
  const [v0, t0, d0] = PREVIEW[0];
  return `<header class="sd-header" data-sd-header style="--sd-count:${HEADER_LINKS.length}">
    <div class="sd-header__sheet" aria-hidden="true"></div>
    <div class="sd-header__bar">
      <a class="sd-header__brand" href="${homeHref}"${homeTarget} data-testid="link-home-brand"><img class="sd-header__brand-logo" src="${ROOK}" alt="" aria-hidden="true"><span>SNOWDEN DESIGN</span></a>
      <button class="sd-header__toggle" type="button" aria-label="Open site menu" aria-expanded="false" aria-controls="sd-header-navigation" data-sd-toggle data-testid="button-menu">
        <img class="sd-header__hamburger" src="${HAMBURGER}" alt="" aria-hidden="true">
        <img class="sd-header__close" src="${CLOSE_X}" alt="" aria-hidden="true">
      </button>
    </div>
    <div class="sd-header__panel" id="sd-header-navigation" aria-hidden="true" inert>
      <nav class="sd-header__nav" aria-label="Main navigation">
        <p class="sd-header__kicker">Explore Snowden Design</p>
        <div class="sd-header__list">${links}</div>
      </nav>
      <aside class="sd-header__preview" aria-label="Menu preview">
        <div class="sd-header__ambient" aria-hidden="true"></div>
        <div class="sd-header__card" data-sd-card data-view="${v0}">
          <a class="sd-header__stage" href="${homeHref}"${homeTarget} aria-label="Snowden Design home" data-testid="link-home-rook">
            <span class="sd-header__grad-rect" aria-hidden="true"></span><span class="sd-header__line-rect" aria-hidden="true"></span>
            <img class="sd-header__rook" src="${ROOK}" alt="Snowden Design metallic chess rook logo">
          </a>
        </div>
        <div class="sd-header__copy" aria-live="off">
          <div class="sd-header__overline" data-sd-overline>Work · 01</div>
          <p class="sd-header__title" data-sd-title>${t0}</p>
          <p class="sd-header__desc" data-sd-desc>${d0}</p>
        </div>
      </aside>
    </div>
  </header>`;
}

// Retained for exporter compatibility; the blue header no longer paints grain.
export function paintGrain() { return () => {}; }

// Self-contained: the exporter embeds this function via toString().
export function initHeader(root, { open: openInitially = false } = {}) {
  const header = root.matches?.("[data-sd-header]") ? root : root.querySelector("[data-sd-header]");
  if (!header) return () => {};
  const button = header.querySelector("[data-sd-toggle]");
  const panel = header.querySelector(".sd-header__panel");
  const links = [...header.querySelectorAll(".sd-header__link")];
  const card = header.querySelector("[data-sd-card]");
  const overline = header.querySelector("[data-sd-overline]");
  const title = header.querySelector("[data-sd-title]");
  const desc = header.querySelector("[data-sd-desc]");
  let isOpen = false;
  let settleTimer = null;
  let autoOpenTimer = null;
  let initialFrame = null;
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setOpen(next, focus = false) {
    clearTimeout(autoOpenTimer);
    if (next === isOpen) return;
    isOpen = next;
    clearTimeout(settleTimer);
    // CSS transitions carry per-state delays, so rapid toggles reverse from
    // the current pose. is-active keeps the overlay mounted until exits finish.
    header.classList.add("is-active");
    header.classList.toggle("is-open", next);
    if (!next) {
      const total = reduced() ? 0 : (links.length - 1) * 125 + 420 + 560;
      settleTimer = setTimeout(() => { if (!isOpen) header.classList.remove("is-active"); }, total);
    } else {
      panel.scrollTop = 0;
    }
    button.setAttribute("aria-expanded", String(next));
    button.setAttribute("aria-label", next ? "Close site menu" : "Open site menu");
    panel.setAttribute("aria-hidden", String(!next));
    panel.toggleAttribute("inert", !next);
    if (!next && focus) button.focus();
  }
  function update(link) {
    card.dataset.view = link.dataset.view;
    overline.textContent = link.dataset.overline;
    title.textContent = link.dataset.title;
    desc.textContent = link.dataset.desc;
  }
  function keydown(event) {
    if (event.key === "Escape" && isOpen) { event.preventDefault(); setOpen(false, true); }
    if (event.key === "Tab" && isOpen) {
      const focusable = [...header.querySelectorAll(".sd-header__bar a[href], [data-sd-toggle], .sd-header__panel a[href]")];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
  const onToggle = () => setOpen(!isOpen, true);
  const onLink = () => setOpen(false);
  const onEnter = event => update(event.currentTarget);
  button.addEventListener("click", onToggle);
  header.addEventListener("keydown", keydown);
  links.forEach(link => {
    link.addEventListener("click", onLink);
    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("focus", onEnter);
  });
  if (openInitially) initialFrame = requestAnimationFrame(() => setOpen(true));
  else autoOpenTimer = setTimeout(() => setOpen(true), 5500);
  return () => {
    clearTimeout(settleTimer);
    clearTimeout(autoOpenTimer);
    if (initialFrame !== null) cancelAnimationFrame(initialFrame);
    button.removeEventListener("click", onToggle);
    header.removeEventListener("keydown", keydown);
    links.forEach(link => {
      link.removeEventListener("click", onLink);
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("focus", onEnter);
    });
  };
}
