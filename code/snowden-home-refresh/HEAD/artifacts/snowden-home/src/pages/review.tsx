import { useEffect, useState } from "react";

const src = `${import.meta.env.BASE_URL}delivery/snowden-home.html`;

export default function Review() {
  const [code, setCode] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    fetch(src).then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setCode)
      .catch((e) => setMsg({ ok: false, text: `Could not load export file (${e.message}).` }));
  }, []);
  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setMsg({ ok: true, text: "Copied. Paste into the Wix Embed HTML element." });
    } catch (e) {
      setMsg({ ok: false, text: `Clipboard blocked: ${(e as Error).message}. Use Download instead.` });
    }
  };
  return (
    <div className="sd-root" style={{ minHeight: "100dvh", padding: "40px 0" }}>
      <div className="sd-wrap">
        <div className="sd-eyebrow sd-mono">Owner review · development draft</div>
        <h1 className="sd-h sd-h2">Wix Home embed</h1>
        <p><a href={`${import.meta.env.BASE_URL}review/hero`}><b>New: Section 1 — standalone hero from the reworked design</b></a></p>
        <p><a href={`${import.meta.env.BASE_URL}review/photography`}><b>Photography &amp; Drone — separate section embed</b></a></p>
        <p>This review route is separate from the visitor page, but is not password-protected. Do not add it to your Wix menu.</p>
        <ol style={{ color: "var(--sd-slate)", margin: "18px 0 24px" }}>
          <li>Copy the code or download the HTML file.</li>
          <li>In Wix Studio, add an Embed HTML element below the native header and hero intro, set to full width.</li>
          <li>Paste the code, preview each breakpoint, and set height to fit. Publish only after your approval.</li>
        </ol>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <button className="sd-btn sd-btn--teal" onClick={copy} disabled={!code} data-testid="button-copy">Copy code</button>
          <a className="sd-btn sd-btn--line" href={src} download="snowden-home.html" data-testid="link-download">Download</a>
          <a className="sd-btn sd-btn--line" href={`${import.meta.env.BASE_URL}delivery/WIX-HOME-SETUP.md`} download>Wix &amp; SEO setup notes</a>
          <a className="sd-btn sd-btn--line" href={`${import.meta.env.BASE_URL}delivery/KEYWORD-STRATEGY.md`} download>50-keyword strategy</a>
          <a className="sd-btn sd-btn--line" href={import.meta.env.BASE_URL}>Back to Home preview</a>
        </div>
        {msg && (
          <p role="status" data-testid="status-copy" style={{ color: msg.ok ? "#0E7F76" : "#9A3412", fontWeight: 700 }}>{msg.text}</p>
        )}
        <iframe title="Export preview" src={src} style={{ width: "100%", height: "80vh", border: "1px solid var(--sd-line)", borderRadius: 18, background: "#FAFCFC" }} />
        <details style={{ marginTop: 24 }}>
          <summary style={{ cursor: "pointer", padding: "14px 0" }}>View full visitor code</summary>
          <textarea aria-label="Full Wix HTML code" value={code ?? ""} readOnly spellCheck={false} style={{ width: "100%", minHeight: 320, background: "#0A1D26", color: "#FAFCFC", padding: 20, fontFamily: "monospace", fontSize: 12, borderRadius: 16 }} />
        </details>
      </div>
    </div>
  );
}
