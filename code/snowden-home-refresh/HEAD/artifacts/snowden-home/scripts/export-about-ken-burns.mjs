import { readFileSync, writeFileSync } from "node:fs";

// Preserve the supplied section; reveal the full portrait and add restrained motion.
const source = readFileSync("references/about-ken-burns.html", "utf8");
const motion = `
/* Intrinsic 3:2 image frame: the complete supplied photograph is visible at rest. */
.sd-root #sd-about {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.sd-root #sd-about > .sd-wrap {
  position: relative;
  z-index: 1;
}
.sd-root #sd-about::before,
.sd-root #sd-about::after {
  content: "";
  position: absolute;
  z-index: 0;
  display: block;
  pointer-events: none;
  will-change: transform;
}
.sd-root #sd-about::before {
  width: min(78vw, 1040px);
  height: min(52vw, 650px);
  top: -14%;
  right: -24%;
  border: 1px solid rgba(9, 110, 102, .095);
  border-radius: 44% 56% 61% 39% / 59% 39% 61% 41%;
  box-shadow: inset 0 0 0 24px rgba(9, 110, 102, .018);
  transform: rotate(-13deg);
}
.sd-root #sd-about::after {
  width: min(57vw, 760px);
  height: min(35vw, 440px);
  right: -10%;
  bottom: 2%;
  border: 1px solid rgba(183, 104, 53, .09);
  border-radius: 62% 38% 47% 53% / 43% 58% 42% 57%;
  box-shadow: inset 0 0 0 18px rgba(183, 104, 53, .016);
  transform: rotate(12deg);
}
.sd-root #sd-about .sd-about__img {
  aspect-ratio: 3 / 2;
  height: auto;
}
@media (min-width: 981px) {
  /* Original image column was .85fr of 2fr: 1.105fr is 30% wider. */
  .sd-root #sd-about .sd-about {
    grid-template-columns: minmax(0, 1.105fr) minmax(0, .895fr);
  }
}
.sd-root #sd-about .sd-about > * { min-width: 0; }
.sd-root #sd-about .sd-about__img img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transform-origin: 50% 50%;
}
@media (prefers-reduced-motion: no-preference) {
  .sd-root #sd-about .sd-about__img img {
    animation: sd-about-portrait-drift 28.293s ease-in-out infinite alternate both;
  }
  .sd-root #sd-about::before {
    animation: sd-about-curve-one 46s ease-in-out infinite alternate;
  }
  .sd-root #sd-about::after {
    animation: sd-about-curve-two 54s ease-in-out infinite alternate;
  }
}
@keyframes sd-about-portrait-drift {
  from { transform: scale(1.35); }
  to { transform: scale(1); }
}
@keyframes sd-about-curve-one {
  from { transform: rotate(-13deg) translate3d(0, 0, 0); }
  to { transform: rotate(-8deg) translate3d(-1.5%, 2%, 0); }
}
@keyframes sd-about-curve-two {
  from { transform: rotate(12deg) translate3d(0, 0, 0); }
  to { transform: rotate(7deg) translate3d(1.5%, -2%, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .sd-root #sd-about .sd-about__img img,
  .sd-root #sd-about::before,
  .sd-root #sd-about::after { animation: none; transform: none; }
}
`;
if (!source.includes('id="sd-about"') || !source.includes("</style>")) {
  throw new Error("The supplied About section is incomplete.");
}
// This is the section's primary image: don't defer it in Wix's nested iframe.
// Explicit intrinsic dimensions also prevent a zero-height lazy image.
const imageTag = /(<img\b[^>]*alt="Blake Snowden, founder of Snowden Design"[^>]*)(>)/;
if (!imageTag.test(source)) throw new Error("About portrait image tag not found.");
const eagerSource = source.replace(imageTag, (_, attributes, end) =>
  `${attributes.replace(/\sloading="lazy"/, "")} loading="eager" fetchpriority="high" decoding="async" width="1536" height="1024"${end}`
);
writeFileSync("public/delivery/sections/about-ken-burns.html", eagerSource.replace("</style>", `${motion}</style>`));
console.log("Exported About section with full-frame portrait, slow zoom, and curved backdrop.");
