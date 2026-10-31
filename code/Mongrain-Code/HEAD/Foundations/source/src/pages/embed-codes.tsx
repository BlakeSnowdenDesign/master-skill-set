import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Check, Copy, Download } from "lucide-react";
import { TITLE } from "@/lib/layers";

type View = { id: "2d" | "3d"; label: string; path: string; file: string };

const VIEWS: View[] = [
  { id: "2d", label: "Animated 2D", path: "", file: "foundation-assembly-2d.html" },
  { id: "3d", label: "Interactive 3D", path: "3d", file: "foundation-assembly-3d.html" },
];

const base = import.meta.env.BASE_URL;

function pageUrl(path: string) {
  return new URL(`${base}${path}`, window.location.origin).toString();
}

function iframeSnippet(path: string) {
  return `<iframe src="${pageUrl(path)}?embed=1" title="${TITLE}" style="width:100%;height:700px;border:0;" loading="lazy" allowfullscreen></iframe>`;
}

// navigator.clipboard is blocked in some embedded/preview contexts, so fall
// back to a hidden textarea + execCommand.
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    if (!ok) throw new Error("Copy failed");
  }
}

function CopyButton({ getText, label, testId }: { getText: () => string | null; label: string; testId: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const onClick = async () => {
    const text = getText();
    if (!text) return;
    try {
      await copyText(text);
      setState("done");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2000);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!getText()}
      data-testid={testId}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
    >
      {state === "done" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {state === "done" ? "Copied" : state === "error" ? "Copy failed" : label}
    </button>
  );
}

function ViewCard({ view }: { view: View }) {
  const snippet = iframeSnippet(view.path);
  const fileUrl = `${base}export/${view.file}`;
  const [html, setHtml] = useState<string | null>(null);
  const [htmlError, setHtmlError] = useState(false);

  // Fetch ahead of time so the copy happens directly inside the click.
  useEffect(() => {
    fetch(fileUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setHtml)
      .catch(() => setHtmlError(true));
  }, [fileUrl]);

  const sizeMb = html ? (new Blob([html]).size / 1024 / 1024).toFixed(1) : null;

  return (
    <section className="rounded-xl border bg-white/70 p-5 sm:p-6" data-testid={`card-embed-${view.id}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">{view.label}</h2>
        <a href={pageUrl(view.path)} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">
          Preview
        </a>
      </div>

      <div className="mt-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Option A · Embed code (recommended)</div>
        <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-all rounded-lg border bg-muted/60 p-3 font-mono text-[12px] leading-relaxed">{snippet}</pre>
        <div className="mt-3">
          <CopyButton getText={() => snippet} label="Copy embed code" testId={`button-copy-iframe-${view.id}`} />
        </div>
      </div>

      <div className="mt-6 border-t pt-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Option B · Full standalone HTML</div>
        <p className="mt-2 text-sm text-muted-foreground">
          {htmlError
            ? "The standalone file hasn't been generated yet."
            : html
              ? `The whole animation in one file (${sizeMb} MB). Works without the live site.`
              : "Loading…"}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CopyButton getText={() => html} label="Copy full HTML" testId={`button-copy-html-${view.id}`} />
          <a
            href={fileUrl}
            download={view.file}
            data-testid={`link-download-${view.id}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </div>
    </section>
  );
}

export default function EmbedCodes() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <h1 className="font-semibold tracking-[-0.025em] leading-[1.05] text-[clamp(1.5rem,3.2vw,2.6rem)]">{TITLE}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Copy and paste into Wix: add an <strong className="text-foreground">Embed Code &gt; Embed HTML</strong> element, choose <strong className="text-foreground">Code</strong>, paste, and set the element height to about 600–800px.
          Use the embed code if you can. It's short and stays up to date. If the full HTML is too large for Wix's code box, use the embed code instead.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {VIEWS.map((v) => (
            <ViewCard key={v.id} view={v} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Note: the embed code uses this page's address. Open this page on your published site so the code points to the live address.{" "}
          <Link href="/" className="underline hover:text-primary">Back to the animation</Link>
        </p>
      </div>
    </div>
  );
}
