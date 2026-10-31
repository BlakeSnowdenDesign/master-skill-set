import { useEffect, useMemo, useRef } from "react";
import WixCopyBar from "@/components/wix-copy-bar";
import StudioHeader from "@/components/studio-header";
import limeTreeLookbookHtml from "@assets/limetree-lookbook_1793053839308.html?raw";
// @ts-ignore shared plain-JS modules also used by the Wix export generator
import { interiorPage } from "@/interior-shared.mjs";
// @ts-ignore
import { initHome, CAPTIONS } from "@/home-shared.mjs";

const base = import.meta.env.BASE_URL;
const WIXIMG = "https://static.wixstatic.com/media/";

type Section = { id: string; label: string; html: string };

export default function InteriorPage({ slug }: { slug: string }) {
  const root = useRef<HTMLElement>(null);
  const page = useMemo(
    () =>
      interiorPage(slug, {
        previewBase: base,
        assets: {
          analytics: `${base}assets/wix-analytics-report.png`,
          analyticsDashboards: [
            "01-traffic-overview.png",
            "02-traffic-acquisition.png",
            "03-search-performance.png",
            "04-global-traffic-map.png",
            "05-landing-page-performance.png",
            "06-device-technology.png",
          ].map(file => `${base}assets/analytics-originals/${file}`),
          office: "",
          mongrain: `${base}assets/mongrain.webp`,
          mongrainViewerUrl: `${base}delivery/mongrain-viewer-source.html`,
          edge: `${base}assets/edge-internet.webp`,
          harbour: `${base}assets/harbour-view.webp`,
          trout: `${base}assets/trout-extravaganza.webp`,
          helen: `${base}assets/helen-falls.jpg`,
          shadow: `${base}assets/shadow-creek.webp`,
          camera: "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png",
          blake: `${WIXIMG}2fde66_8ae605c421084ad9b842ab1a21440ec3~mv2.png`,
          leica: `${base}assets/leica-studio.webp`,
          portrait: `${base}assets/blake-seated-portrait.webp`,
          limetreeLookbookHtml: limeTreeLookbookHtml,
        },
      }) as { title: string; description: string; name: string; sections: Section[] },
    [slug],
  );

  useEffect(() => {
    const previousTitle = document.title;
    const selectors = ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]'];
    const previous = selectors.map(selector => {
      const node = document.querySelector(selector);
      const old = node?.getAttribute("content");
      node?.setAttribute("content", selector.includes("title") ? page.title : page.description);
      return { node, old };
    });
    document.title = page.title;
    window.scrollTo(0, 0);
    const dispose = root.current ? initHome(root.current, CAPTIONS) : undefined;
    return () => {
      dispose?.();
      document.title = previousTitle;
      previous.forEach(({ node, old }) => { if (old != null) node?.setAttribute("content", old); });
    };
  }, [page]);

  return (
    <div className="sd-root">
      <StudioHeader previewBase={base} />
      <main ref={root} className="sd-root si-page" key={slug}>
        {page.sections.map(section => (
          <div key={section.id} style={{ display: "contents" }}>
            {import.meta.env.DEV && (
              <div id={`copy-${section.id}-code`} style={{ scrollMarginTop: 16 }}>
                <WixCopyBar
                  section={section.label}
                  source={`${base}delivery/interiors/${slug}/${section.id}.html`}
                  title={`snowden-${slug}-${section.id}.html`}
                  description="Copy only this section for its own Wix HTML embed. This toolbar is not included in the copied code. Run the export command after editing the shared source."
                  setup={`${base}delivery/interiors/${slug}/WIX-SETUP.md`}
                />
              </div>
            )}
            <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: section.html }} />
          </div>
        ))}
      </main>
      <footer className="sd-foot" aria-label="Wix native footer (preview mock)">
        <div className="sd-wrap">
          <span>Snowden Design, Denver, Colorado</span>
          <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="mailto:blake@snowden-design.com" data-testid="link-foot-email">blake@snowden-design.com</a>
            <a href="tel:+17203402611" data-testid="link-foot-phone">(720) 340-2611</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
