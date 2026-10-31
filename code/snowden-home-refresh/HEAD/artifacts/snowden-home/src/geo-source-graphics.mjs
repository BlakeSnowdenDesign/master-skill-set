// Supplied PNGs are the source of truth. Regions use the companion SVG's
// original 1680 × 1050 coordinates; no chart marks or values are recreated.
export const geoSourceGraphics = [
  {
    file: "01-ai-visibility-overview.png",
    title: "AI visibility overview",
    alt: "Supplied AI visibility overview dashboard showing answer visibility, tracked mentions, citation rate, platform trends and prompt topics. Illustrative demo data, not live results.",
    bars: [
      ...[163.8, 136.5, 107.1, 67.2, 39.9].map((w, i) => [1300, 385 + i * 45, w, 10]),
      ...[249, 207, 162, 126].map((w, i) => [470, 739 + i * 49, w, 13]),
    ],
  },
  {
    file: "02-prompt-citation-intelligence.png",
    title: "Prompt & citation intelligence",
    alt: "Supplied prompt and citation intelligence dashboard with citation trends, source mix, content opportunities and a coverage matrix. Illustrative demo data, not live results.",
    bars: [48.36, 38.44, 52.08, 30.38].flatMap((w, i) => [
      [1372, 790 + i * 40, w, 7],
      [1484, 790 + i * 40, [35.96, 19.22, 44.64, 17.36][i], 7],
    ]),
    ring: [1157, 392, 180, 180],
  },
  {
    file: "03-ai-referral-performance.png",
    title: "AI referral performance",
    alt: "Supplied AI referral performance dashboard showing sessions, engagement, referral sources, discovery-to-action bars and landing pages. Illustrative demo data, not live results.",
    bars: [
      ...[176.4, 123.9, 86.1, 60.9, 35.7].map((w, i) => [1300, 385 + i * 45, w, 10]),
      ...[285, 188.1, 88.35, 34.2].map((w, i) => [448, 761 + i * 47, w, 14]),
    ],
  },
];

const region = ([x, y, w, h]) => `left:${x / 1680 * 100}%;top:${y / 1050 * 100}%;width:${w / 1680 * 100}%;height:${h / 1050 * 100}%`;

export function geoSourceSlides(ctx) {
  return geoSourceGraphics.map((graphic, index) => {
    const src = ctx.assets?.geoDashboards?.[index] || `${(ctx.previewBase || "").replace(/\/$/, "")}/assets/geo-originals/${graphic.file}`;
    const masks = [
      `<span class="si-analytics__mask" data-sd-analytics-mask style="${region([316, 377, 756, 224])}" aria-hidden="true"></span>`,
      ...graphic.bars.map(box => `<span class="si-analytics__mask" data-sd-analytics-mask style="${region(box)};background:#eef1f6" aria-hidden="true"></span>`),
      ...(graphic.ring ? [`<span class="si-analytics__mask si-analytics__mask--ring" data-sd-analytics-mask data-sd-mask-mode="fade" style="${region(graphic.ring)}" aria-hidden="true"></span>`] : []),
    ].join("");
    return `<article class="si-analytics__slide" data-sd-analytics-slide data-sd-geo-source-slide aria-label="Slide ${index + 7} of nine" hidden>
      <h3 class="si-analytics__slide-title">Slide ${String(index + 7).padStart(2, "0")} <span>/</span> ${graphic.title}</h3>
      <p class="si-analytics__source-note">SUPPLIED GEO GRAPHIC · ILLUSTRATIVE DEMO DATA · NOT LIVE RESULTS</p>
      <figure class="si-analytics__figure">
        <img src="${src}" alt="${graphic.alt}" width="1680" height="1050" decoding="async" loading="eager" data-sd-analytics-image data-sd-geo-source>
        ${masks}
        <figcaption class="si-analytics__image-error" data-sd-analytics-error hidden>Supplied GEO image unavailable. Use the navigation to view another supplied graphic.</figcaption>
      </figure>
    </article>`;
  });
}
