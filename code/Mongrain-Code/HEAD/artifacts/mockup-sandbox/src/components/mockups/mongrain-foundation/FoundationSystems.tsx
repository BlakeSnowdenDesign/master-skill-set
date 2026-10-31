/**
 * Canvas preview of the actual standalone foundation page, not a visual approximation.
 * Refresh public/images/mongrain-foundation-systems-wix.html after rebuilding the export.
 */
export function FoundationSystems() {
  return (
    <iframe
      title="Mongrain — Foundation Systems"
      src={`${import.meta.env.BASE_URL}images/mongrain-foundation-systems-wix.html`}
      allow="clipboard-write; fullscreen"
      style={{ width: '100%', height: '100dvh', display: 'block', border: 0 }}
    />
  );
}
