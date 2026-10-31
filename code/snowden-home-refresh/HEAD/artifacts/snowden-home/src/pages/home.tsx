import { useEffect, useMemo, useRef, useState } from "react";
import WixCopyBar from "@/components/wix-copy-bar";
import StudioHeader from "@/components/studio-header";
// @ts-ignore shared plain-JS module also used by the Wix export generator
import { homeBody, initHome, CAPTIONS, LINKS, OFFICE_IMAGE_URL } from "@/home-shared.mjs";

const base = import.meta.env.BASE_URL;
const WIXIMG = "https://static.wixstatic.com/media/";

export default function Home() {
  const [headerReplay, setHeaderReplay] = useState(0);
  const root = useRef<HTMLElement>(null);
  const html = useMemo(
    () =>
      homeBody({
        analytics: `${base}assets/wix-analytics-report.png`,
        office: OFFICE_IMAGE_URL,
        mongrain: `${base}assets/mongrain.webp`,
        mongrainViewerUrl: `${base}delivery/mongrain-viewer-source.html`,
        edge: `${base}assets/edge-internet.webp`,
        harbour: `${base}assets/harbour-view.webp`,
        trout: `${base}assets/trout-extravaganza.webp`,
        helen: `${base}assets/helen-falls.jpg`,
        shadow: `${base}assets/shadow-creek.webp`,
        camera: "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png",
        blake: `${WIXIMG}2fde66_8ae605c421084ad9b842ab1a21440ec3~mv2.png`,
      }, { previewBase: base }),
    [],
  );
  const workStart = html.indexOf('<section class="sd-sec" id="sd-work"');
  const mongrainStart = html.indexOf('<section class="sd-mg sd-dark" id="sd-mongrain"');
  const remainingSections = [
    { id: "sd-photography", label: "Section 4 — Photography, Video & Aerial", file: "photography-drone.html" },
    { id: "sd-services", label: "Section 5 — Capabilities", file: "05-capabilities.html" },
    { id: "sd-care", label: "Section 6 — Care plans & Analytics you can read", file: "06-care-analytics.html" },
    { id: "sd-about", label: "Section 7 — Hi, I’m Blake", file: "07-about.html" },
    { id: "sd-contact", label: "Section 8 — Contact", file: "08-contact.html" },
  ].map(section => ({ ...section, start: html.lastIndexOf("<section", html.indexOf(`id="${section.id}"`)) }));
  useEffect(() => {
    if (!root.current) return;
    return initHome(root.current, CAPTIONS);
  }, []);
  useEffect(() => {
    document.title = "Denver Web Design, 3D & SEO | Snowden Design";
  }, []);

  return (
    <div className="sd-root">
      {import.meta.env.DEV ? (
        <section aria-label="Header preview and Wix code">
          <WixCopyBar section="Header" source={`${base}delivery/sections/00-header.html`} title="snowden-design-header.html" description="Copy the dark-blue Snowden header here: a thin bar with the rook and SNOWDEN DESIGN linked home, and the gold hamburger at right. Opening rolls the blue sheet down, then nine links arrive top to bottom with a rotating-gradient rook preview. The Wix iframe cannot grow past its own height. Preview controls are not included in the Wix code." setup={`${base}review/header`} />
          <StudioHeader previewBase={base} />
          <details style={{ padding: "12px 24px", background: "#F3EDE3" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>Standalone header embed preview (starts closed)</summary>
            <button type="button" className="sd-btn sd-btn--teal" style={{ marginTop: 12 }} onClick={() => setHeaderReplay(value => value + 1)}>{headerReplay ? "Replay opening" : "Open menu in preview"}</button>
            <iframe
              key={headerReplay}
              className="sd-header-preview-frame"
              title="Snowden dark-blue header embed preview"
              src={`${base}delivery/sections/00-header.html${headerReplay ? `?menu=open&replay=${headerReplay}` : ""}`}
              style={{ display: "block", width: "100%", marginTop: 12, border: "1px solid #b8bbb9", borderRadius: 14, background: "linear-gradient(135deg, #f3ede3, #c4ccce)" }}
            />
            <a href={`${base}review/header`} style={{ display: "inline-block", marginTop: 10, textDecoration: "underline" }}>Open dedicated header preview and copy code</a>
          </details>
        </section>
      ) : <StudioHeader previewBase={base} />}
      {import.meta.env.DEV && <WixCopyBar />}
      <main ref={root} className="sd-root">
        {import.meta.env.DEV && workStart >= 0 && mongrainStart > workStart ? <>
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html.slice(0, workStart) }} />
          <div id="copy-work-code" style={{ scrollMarginTop: 16 }}><WixCopyBar
            section="Section 2 — Selected work"
            source={`${base}delivery/sections/selected-work.html`}
            title="snowden-selected-work.html"
            description="Copy only the second section: the portfolio cards with your updated videos. This toolbar is not included in the Wix HTML."
            setup={`${base}review/work`}
          /></div>
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html.slice(workStart, mongrainStart) }} />
          <div id="copy-mongrain-code" style={{ scrollMarginTop: 16 }}>
            <WixCopyBar
              section="Section 3 — MONGRAIN"
              source={`${base}delivery/sections/03-mongrain.html`}
              title="snowden-mongrain.html"
              description="Copy only section 3: the complete interactive MONGRAIN viewer and project-in-development notice. This toolbar is excluded."
              setup={`${base}delivery/sections/03-mongrain.html`}
            />
          </div>
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html.slice(mongrainStart, remainingSections[0].start) }} />
          {remainingSections.map((section, index) => <div key={section.id} style={{ display: "contents" }}>
            <div id={`copy-${section.id}-code`} style={{ scrollMarginTop: 16 }}>
              <WixCopyBar
                section={section.label}
                source={`${base}delivery/sections/${section.file}`}
                title={`snowden-${section.file}`}
                description="Copy only this section for its own Wix HTML embed. This toolbar is not included in the copied code."
                setup={`${base}delivery/sections/${section.file}`}
              />
            </div>
            <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html.slice(section.start, remainingSections[index + 1]?.start ?? html.length) }} />
          </div>)}
        </> : <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />}
      </main>
      <footer className="sd-foot" aria-label="Wix native footer (preview mock)">
        <div className="sd-wrap">
          <span>Snowden Design, Denver, Colorado</span>
          <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href={LINKS.mail} data-testid="link-foot-email">blake@snowden-design.com</a>
            <a href={LINKS.tel} data-testid="link-foot-phone">(720) 340-2611</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
