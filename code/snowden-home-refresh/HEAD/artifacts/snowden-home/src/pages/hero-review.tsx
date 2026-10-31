import { useEffect, useState } from "react";

const base = import.meta.env.BASE_URL;
const widths = [1280, 980, 390, 320];

export default function HeroReview({ kind = "hero" }: { kind?: "hero" | "photography" }) {
  const photo = kind === "photography";
  const label = photo ? "Photography & Drone" : "Home hero";
  const filename = photo ? "photography-drone" : "01-hero";
  const source = `${base}delivery/sections/${filename}.html`;
  const setup = photo ? "PHOTOGRAPHY-WIX-SETUP.md" : "01-HERO-WIX-SETUP.md";
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [width, setWidth] = useState(1280);
  const [heights, setHeights] = useState<Record<number, number>>({});
  useEffect(() => {
    const controller = new AbortController();
    fetch(source, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(setCode)
      .catch((e) => { if (e.name !== "AbortError") setStatus(`Cannot load code: ${e.message}`); });
    return () => controller.abort();
  }, [source]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus(`${label} code copied. Paste it into Wix Studio’s Embed Code element.`);
    } catch {
      setStatus("Clipboard unavailable. Download the HTML or select the code below.");
    }
  }
  async function measure(frame: HTMLIFrameElement, measuredWidth: number) {
    const doc = frame.contentDocument;
    if (!doc) return;
    try {
      await doc.fonts.ready;
      await Promise.all(Array.from(doc.images).map(img => img.decode().catch(() => {})));
      const hero = doc.querySelector(".sd-first-hero, #sd-photography");
      if (hero) setHeights(h => ({ ...h, [measuredWidth]: Math.ceil(hero.getBoundingClientRect().height) }));
    } catch {
      setStatus("Height measurement unavailable. Check the section height in Wix Preview.");
    }
  }
  return (
    <main className="sd-root" style={{ minHeight: "100vh", padding: "32px 0" }}>
      <div className="sd-wrap">
        <div className="sd-eyebrow">Standalone Wix delivery · {photo ? "Photography & Drone" : "Section 1"}</div>
        <h1 className="sd-h sd-h2">{label} — ready to paste</h1>
        <p style={{ margin: "18px 0" }}>{photo ? "This is only the new Photography & Drone section, with your Leica image as a studio detail." : "This is only the hero from the reworked design—not the old full-page embed."} It has not been placed in Wix or published.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button className="sd-btn sd-btn--teal" onClick={copy} disabled={!code}>Copy {photo ? "section" : "hero"} code</button>
          <a className="sd-btn sd-btn--line" href={source} download={`snowden-home-${filename}.html`}>Download {photo ? "section" : "hero"} HTML</a>
          <a className="sd-btn sd-btn--line" href={`${base}delivery/sections/${setup}`} download>Wix placement instructions</a>
        </div>
        <p role="status" style={{ margin: "12px 0" }}>{status}</p>
        <ol style={{ lineHeight: 1.8, paddingLeft: 24 }}>
          <li>Open Home in Wix Studio. Add a section {photo ? "after the 3D showcase" : "below the native header"}.</li>
          <li>Choose <b>Add Elements → Embed &amp; Social → Embed Code → Enter Code</b>. Paste the section code, then Apply.</li>
          <li>Stretch the element to the section width, remove outer section padding, and use the measured heights below as starting values. Preview each breakpoint before you publish.</li>
        </ol>
        <p>Keep the Wix header and footer. Add the main H1 and essential introductory text natively in Wix for the parent page’s SEO. This embed’s visual headline is an H2.{photo ? " Photography and drone-flight examples can be added when you supply them; the equipment image is not presented as a client project." : ""}</p>
        <h2 style={{ fontSize: 22, margin: "24px 0 12px" }}>Measured standalone content heights</h2>
        <p>Measured in this browser after fonts and images load—not yet verified inside Wix. Actual Wix element width, fonts, and breakpoint settings may require adjustment.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "14px 0 24px" }}>
          {widths.map(w => <button key={w} className={`sd-btn ${width === w ? "sd-btn--teal" : "sd-btn--line"}`} onClick={() => setWidth(w)} aria-pressed={width === w}>
            {w}px · {heights[w] ? `${heights[w]}px high` : "measuring…"}
          </button>)}
        </div>
        {widths.map(w => <iframe key={w} src={source} title={`Measure ${w}px`} tabIndex={-1} aria-hidden="true" onLoad={e => { void measure(e.currentTarget, w); }} style={{ position: "absolute", left: -20000, top: 0, width: w, height: 1, border: 0, visibility: "hidden" }} />)}
        <div style={{ overflowX: "auto", border: "1px solid #4A5F68", background: "#0A1D26" }}>
          <iframe key={width} title={`${label} preview at ${width}px`} src={source} style={{ display: "block", width, minWidth: width, height: heights[width] ?? 1000, border: 0 }} />
        </div>
        <details style={{ marginTop: 24 }}>
          <summary style={{ cursor: "pointer", padding: 14 }}>View full section code</summary>
          <textarea aria-label="Standalone section HTML code" readOnly value={code} spellCheck={false} style={{ width: "100%", height: 300, padding: 20, background: "#0A1D26", color: "#FAFCFC", fontFamily: "monospace", fontSize: 12 }} />
        </details>
        <p><a href={`${base}review`}>Earlier full-page delivery</a></p>
      </div>
    </main>
  );
}
