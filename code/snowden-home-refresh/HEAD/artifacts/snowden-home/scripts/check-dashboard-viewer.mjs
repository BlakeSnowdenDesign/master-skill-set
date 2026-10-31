// Focused behavior checks without a browser or dependencies. Native dialog focus
// containment/Escape and physical touch gestures remain browser responsibilities.
import assert from "node:assert/strict";
import { initHome } from "../src/home-shared.mjs";

class Element extends EventTarget {
  attrs = {};
  style = {};
  hidden = false;
  isConnected = true;
  classList = { add() {}, remove() {}, toggle() {} };
  querySelector() { return null; }
  querySelectorAll() { return []; }
  getBoundingClientRect() { return { top: 500 }; }
  setAttribute(k, v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k]; }
  removeAttribute(k) { delete this.attrs[k]; }
  focus() { document.activeElement = this; }
  click() { this.dispatchEvent(new Event("click")); }
}

for (const reduced of [false, true]) {
  const preference = Object.assign(new EventTarget(), { matches: reduced });
  globalThis.window = { matchMedia: () => preference, location: { search: "" }, Element, self: {}, top: {}, innerHeight: 3100 };
  const doc = Object.assign(new EventTarget(), { body: { style: { overflow: "auto" } }, hidden: false });
  globalThis.document = doc;
  const controls = {};
  for (const name of ["current", "toggle", "toggle-label", "replay", "prev", "next", "expand", "dialog", "close", "full-title", "full-image", "full-scroll", "full-error"]) {
    controls[`[data-sd-analytics-${name}]`] = new Element();
  }
  const get = name => controls[`[data-sd-analytics-${name}]`];
  const dialog = get("dialog");
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; dialog.dispatchEvent(new Event("close")); };
  const slides = Array.from({ length: 9 }, (_, index) => {
    const slide = new Element();
    const image = Object.assign(new Element(), {
      complete: true, naturalWidth: index < 6 ? 1672 : 1680, naturalHeight: index < 6 ? 941 : 1050,
      src: `data:image/png;base64,source-${index}`, alt: `Source ${index}; sample data, not live`,
    });
    image.parentElement = slide;
    slide.image = image;
    slide.querySelector = selector => selector === "[data-sd-analytics-image]" ? image : selector === "h3" ? { textContent: `Dashboard ${index}` } : null;
    slide.contains = target => target === image;
    return slide;
  });
  const analytics = new Element();
  analytics.querySelector = selector => controls[selector] || null;
  analytics.querySelectorAll = selector => selector === "[data-sd-analytics-slide]" ? slides : selector === "[data-sd-analytics-image]" ? slides.map(s => s.image) : [];
  const root = new Element();
  root.querySelector = selector => selector === "[data-sd-original-showcase]" ? analytics : null;
  const dispose = initHome(root, {});
  assert.equal(get("expand").disabled, false);
  for (let i = 0; i < slides.length; i++) {
    get("expand").focus();
    get("expand").click();
    assert.equal(dialog.open, true);
    assert.equal(dialog.style.top, "400px", "Tall Wix iframe opens near the trigger, not its midpoint");
    assert.equal(doc.activeElement, get("close"));
    assert.equal(get("full-image").src, slides[i].image.src, "Uses the exact active source, including portable data URIs");
    assert.equal(get("full-image").alt, slides[i].image.alt);
    assert.equal(get("full-image").style.width, `${slides[i].image.naturalWidth}px`);
    assert.equal(get("full-image").height, slides[i].image.naturalHeight);
    assert.equal(get("toggle").getAttribute("aria-pressed"), "true", "Slideshow stays paused");
    assert.equal(doc.body.style.overflow, "hidden");
    get("full-scroll").scrollLeft = 600;
    get("full-scroll").scrollTop = 400;
    if (i % 2) dialog.close(); // Same close event emitted by native Escape.
    else get("close").click();
    assert.equal(dialog.open, false);
    assert.equal(doc.activeElement, get("expand"));
    assert.equal(doc.body.style.overflow, "auto");
    get("next").click();
  }
  get("expand").click();
  assert.equal(get("full-scroll").scrollLeft, 0);
  assert.equal(get("full-scroll").scrollTop, 0);
  get("full-image").dispatchEvent(new Event("error"));
  assert.equal(get("full-error").hidden, false);
  assert.equal(get("full-image").hidden, true);
  get("close").click();
  slides[0].image.naturalWidth = 0;
  slides[0].image.dispatchEvent(new Event("error"));
  assert.equal(get("expand").disabled, true, "Unavailable sources cannot open a blank viewer");
  get("next").click();
  get("expand").click();
  dispose();
  assert.equal(dialog.open, false);
  assert.equal(doc.body.style.overflow, "auto", "Route cleanup restores scrolling");
  get("expand").click();
  assert.equal(dialog.open, false, "Cleanup removes event handlers");
}
console.log("Dashboard viewer checks passed: nine exact sources, both motion modes, sizing, pause, close/focus, errors, scroll reset and cleanup.");
