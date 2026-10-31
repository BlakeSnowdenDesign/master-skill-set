import { geoSourceSlides, geoSourceGraphics } from "./geo-source-graphics.mjs";

const dashboards = [
  ["01-traffic-overview.png", "Traffic overview", "18.1%", "41%", "45.3%", "18.2%"],
  ["02-traffic-acquisition.png", "Traffic acquisition", "17.9%", "38.4%", "52.9%", "19.2%"],
  ["03-search-performance.png", "Search performance", "23.2%", "40%", "70.8%", "18.8%"],
  ["04-global-traffic-map.png", "Global traffic map", "", "", "", ""],
  ["05-landing-page-performance.png", "Landing page performance", "5.65%", "33.2%", "91.4%", "13.9%"],
  ["06-device-technology.png", "Device & technology", "44.1%", "37.5%", "27.8%", "13.5%"],
];

export function analyticsShowcase(ctx) {
  const supplied = Array.isArray(ctx.assets?.analyticsDashboards) ? ctx.assets.analyticsDashboards : [];
  const slides = dashboards.map(([file, title, left, top, width, height], index) => {
    const src = supplied[index] || (ctx.previewBase
      ? `${ctx.previewBase.replace(/\/$/, "")}/assets/analytics-originals/${file}`
      : `assets/analytics-originals/${file}`);
    const mapRings = index === 3
      ? [[17.1053, 44.6334], [24.701, 43.8895], [35.4067, 41.0202], [57.4761, 46.44], [59.2105, 63.9745]]
          .map(([x, y], ring) => `<span class="si-analytics__pulse" style="--x:${x}%;--y:${y}%;--delay:${ring * 120}ms" aria-hidden="true"></span>`).join("")
      : "";
    const mask = index !== 3
      ? `<span class="si-analytics__mask" data-sd-analytics-mask style="left:${left};top:${top};width:${width};height:${height}" aria-hidden="true"></span>`
      : "";
    const deviceRing = index === 5
      ? `<span class="si-analytics__mask si-analytics__mask--ring" data-sd-analytics-mask data-sd-mask-mode="fade" style="left:14.05%;top:35.35%;width:10.4%;height:18.5%" aria-hidden="true"></span>`
      : "";
    return `<article class="si-analytics__slide${index === 0 ? " is-current" : ""}" data-sd-analytics-slide aria-label="Slide ${String(index + 1).padStart(2, "0")} of nine" ${index ? "hidden" : ""}>
      <h3 class="si-analytics__slide-title">Slide ${String(index + 1).padStart(2, "0")} <span>/</span> ${title}</h3>
      <figure class="si-analytics__figure">
        <img src="${src}" alt="${title}: original supplied analytics reference with all displayed figures and labels preserved; not live data" width="1672" height="941" decoding="async" loading="eager" data-sd-analytics-image>
        ${mask}${deviceRing}${mapRings}
        <figcaption class="si-analytics__image-error" data-sd-analytics-error hidden>Original image unavailable. Use the navigation to view another supplied graphic.</figcaption>
      </figure>
    </article>`;
  }).join("");
  const allSlides = slides + geoSourceSlides(ctx).join("");
  const allTitles = [...dashboards.map(([, title]) => title), ...geoSourceGraphics.map(graphic => graphic.title)];

  return `<section class="si-analytics" id="si-seo-dashboard" aria-labelledby="si-seo-dashboard-h" data-sd-original-showcase>
    <div class="sd-wrap">
      <header class="si-analytics__heading">
        <div><p class="si-analytics__eyebrow sd-mono">SUPPLIED ANALYTICS + GEO GRAPHICS / NINE VIEWS</p><h2 class="sd-h sd-h2" id="si-seo-dashboard-h">A clearer view of what your site is doing.</h2></div>
        <p>Nine supplied dashboard graphics, preserved as supplied. Each graphic completes its reveal before a 0.1-second wipe/fade brings in the next view, stopping after slide nine. The three GEO views show illustrative demo data, not live results; dashboard labels and figures stay still.</p>
      </header>
      <div class="si-analytics__viewer">
        <div class="si-analytics__stage" data-sd-analytics-stage aria-live="polite">
          ${allSlides}
        </div>
        <div class="si-analytics__expand">
          <button class="si-analytics__button" type="button" data-sd-analytics-expand aria-haspopup="dialog" aria-controls="si-dashboard-full-size" disabled>View full size</button>
          <span>Read small labels at original size. Scroll to explore.</span>
        </div>
        <dialog class="si-analytics__dialog" id="si-dashboard-full-size" data-sd-analytics-dialog aria-labelledby="si-dashboard-full-title" aria-describedby="si-dashboard-full-help si-dashboard-full-notice">
          <header class="si-analytics__dialog-head">
            <h3 id="si-dashboard-full-title" data-sd-analytics-full-title>Dashboard at full size</h3>
            <button class="si-analytics__button" type="button" data-sd-analytics-close autofocus>Close full-size view</button>
          </header>
          <p id="si-dashboard-full-help">Original resolution · Swipe or scroll in any direction to read the entire graphic. Keyboard: Tab to the image area, then use arrow keys. Escape or Close returns to the gallery.</p>
          <p id="si-dashboard-full-notice">Supplied reference graphic · illustrative/sample data, not live results. Slideshow paused; choose Play after closing to continue.</p>
          <div class="si-analytics__full-scroll" data-sd-analytics-full-scroll tabindex="0" role="region" aria-label="Full-resolution dashboard; scroll horizontally and vertically" aria-describedby="si-dashboard-full-help">
            <img data-sd-analytics-full-image alt="" decoding="async" draggable="false">
            <p data-sd-analytics-full-error role="status" hidden>Original image unavailable. Close this view and choose another dashboard.</p>
          </div>
        </dialog>
        <div class="si-analytics__controls" aria-label="Dashboard graphic controls">
          <button class="si-analytics__button si-analytics__button--step" type="button" data-sd-analytics-prev aria-label="Previous dashboard graphic" data-testid="button-analytics-previous"><span aria-hidden="true">←</span><span>Previous</span></button>
          <div class="si-analytics__position">
            <span class="si-analytics__current" data-sd-analytics-current aria-live="polite">Slide 01</span>
            <span class="si-analytics__divider">/</span>
            <span>09 slides</span>
          </div>
          <div class="si-analytics__actions">
            <button class="si-analytics__button" type="button" data-sd-analytics-replay data-testid="button-analytics-replay">Replay slideshow</button>
            <button class="si-analytics__button" type="button" data-sd-analytics-toggle aria-pressed="false" data-testid="button-analytics-play"><span data-sd-analytics-toggle-label>Pause</span></button>
          </div>
          <button class="si-analytics__button si-analytics__button--step" type="button" data-sd-analytics-next aria-label="Next dashboard graphic" data-testid="button-analytics-next"><span>Next</span><span aria-hidden="true">→</span></button>
        </div>
        <nav class="si-analytics__index" aria-label="Choose a dashboard graphic">
          ${allTitles.map((title, index) => `<button class="si-analytics__dot${index === 0 ? " is-current" : ""}" type="button" data-sd-analytics-select="${index}" aria-label="Show ${title}" aria-current="${index === 0 ? "true" : "false"}" data-testid="button-analytics-slide-${index + 1}"><span>View ${String(index + 1).padStart(2, "0")}</span></button>`).join("")}
        </nav>
        <p class="si-analytics__note">Views 01–06: supplied analytics PNGs · 1672 × 941 &nbsp; / &nbsp; Views 07–09: supplied GEO PNGs · 1680 × 1050 · illustrative demo data</p>
      </div>
    </div>
  </section>`;
}
