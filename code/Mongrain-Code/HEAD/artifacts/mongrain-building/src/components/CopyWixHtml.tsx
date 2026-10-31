import { useEffect, useRef, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const htmlUrl = `${import.meta.env.BASE_URL}wix-embed.html`;

export default function CopyWixHtml() {
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(htmlUrl, { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('The Wix HTML file could not be loaded.');
        const content = await response.text();
        if (!/<!doctype html>/i.test(content) || !content.includes('data:image/webp;base64,')) {
          throw new Error('The Wix HTML file is not available yet.');
        }
        setHtml(content);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (manual) {
      textarea.current?.focus();
      textarea.current?.select();
    }
  }, [manual]);

  async function copy() {
    try {
      if (!html) throw new Error('HTML is not loaded.');
      await navigator.clipboard.writeText(html);
      setCopied(true);
    } catch {
      // Clipboard access may be blocked inside the preview iframe.
      // Provide the actual complete code instead of pretending it was copied.
      setManual(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={error ? () => setManual(true) : copy}
        disabled={!html && !error}
        aria-label={copied ? 'HTML copied' : 'Copy HTML for Wix'}
        title={copied ? 'HTML copied — paste into Wix' : 'Copy HTML for Wix'}
        data-testid="button-copy-wix-html"
        className="focus-ring flex min-h-12 min-w-12 shrink-0 items-center justify-center gap-2 rounded-full px-3.5 text-[13px] font-medium text-foreground hover:bg-white/80 disabled:opacity-50"
      >
        {copied ? <Check className="h-[18px] w-[18px] text-primary" /> : <Copy className="h-[18px] w-[18px]" />}
        <span className="hidden lg:inline">{copied ? 'Copied!' : 'Copy HTML for Wix'}</span>
      </button>
      <span className="sr-only" role="status">{copied ? 'Complete HTML copied. Paste it into the Wix HTML embed code field.' : ''}</span>
      {manual && createPortal(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onKeyDown={(e) => e.key === 'Escape' && setManual(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="copy-wix-title" className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 id="copy-wix-title" className="text-xl font-semibold">Copy HTML for Wix</h2>
              <button onClick={() => setManual(false)} aria-label="Close HTML dialog" className="focus-ring grid h-11 w-11 place-items-center rounded-full"><X className="h-5 w-5" /></button>
            </div>
            {error ? <p role="alert" className="mt-3">{error}</p> : (
              <>
                <p className="my-3 text-sm text-muted-foreground">Automatic clipboard access is blocked by this browser. The complete HTML is selected below. Press Ctrl+C or Command+C, then paste into Wix’s HTML embed code field.</p>
                <textarea ref={textarea} readOnly value={html} aria-label="Complete Wix HTML code" className="focus-ring h-52 w-full resize-none rounded-lg border border-foreground/20 p-3 font-mono text-xs" />
                <button onClick={() => { textarea.current?.focus(); textarea.current?.select(); }} className="focus-ring mt-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Select all HTML</button>
              </>
            )}
            <a href={htmlUrl} download="mongrain-building-wix.html" className="focus-ring ml-4 inline-block text-sm underline">Download HTML</a>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
