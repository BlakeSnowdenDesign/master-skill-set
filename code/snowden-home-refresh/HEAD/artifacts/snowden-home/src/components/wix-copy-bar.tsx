import { useEffect, useRef, useState } from "react";

/** Development-only controls. Never included in visitor builds or Wix HTML. */
export default function WixCopyBar({
  section = "Home hero",
  source = `${import.meta.env.BASE_URL}delivery/sections/01-hero.html`,
  title = "snowden-home-hero.html",
  description = "Copies only the first section—not this toolbar, navigation, or footer.",
  setup = `${import.meta.env.BASE_URL}review/hero`,
}: {
  section?: string; source?: string; title?: string; description?: string; setup?: string;
}) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState(false);
  const [copying, setCopying] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(source, { signal: controller.signal, cache: "no-store" })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(setCode)
      .catch(e => {
        if (e.name !== "AbortError") setStatus("HTML could not load. Use the download link or reload.");
      });
    return () => controller.abort();
  }, [source]);

  useEffect(() => {
    if (fallback) {
      field.current?.focus();
      field.current?.select();
    }
  }, [fallback]);

  async function copy() {
    setCopying(true);
    setFallback(false);
    setStatus("Fetching the latest HTML…");
    let latest: string;
    try {
      const freshUrl = new URL(source, window.location.href);
      freshUrl.searchParams.set("_copy", String(Date.now()));
      const response = await fetch(freshUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      latest = await response.text();
      setCode(latest);
    } catch {
      setStatus("Could not fetch the latest HTML. Nothing was copied. Please try again.");
      setCopying(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(latest);
      setStatus("Copied! Paste into Wix → Embed Code → Enter Code.");
      setFallback(false);
    } catch {
      setFallback(true);
      setStatus("Browser blocked clipboard access. Select the HTML below and press Ctrl+C or ⌘C, or download it.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <aside aria-label="Wix delivery controls — preview only" style={{ background: "#F3EDE3", color: "#0A1D26", padding: "16px 24px", borderBottom: "1px solid #CFCDC4" }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
         <strong>Preview only · {section} HTML</strong>
        <button type="button" className="sd-btn sd-btn--teal" onClick={copy} disabled={!code || copying} data-testid="copy-html-for-wix">
          {copying ? "Fetching latest HTML…" : code ? "Copy HTML for Wix" : "Loading HTML…"}
        </button>
         <a href={source} download={title} style={{ textDecoration: "underline" }}>Download HTML</a>
         <a href={setup} style={{ textDecoration: "underline" }}>Wix setup &amp; sizes</a>
      </div>
       <p style={{ margin: "8px 0 0", fontSize: 14 }}>{description}</p>
      <p role="status" aria-live="polite" style={{ margin: status ? "8px 0 0" : 0 }}>{status}</p>
      {fallback && <textarea ref={field} aria-label="Hero HTML — select all and copy" readOnly value={code} onFocus={e => e.currentTarget.select()} style={{ width: "100%", height: 160, marginTop: 12, background: "#fff", color: "#0A1D26" }} />}
    </aside>
  );
}
