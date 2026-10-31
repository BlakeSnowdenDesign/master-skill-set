import WixCopyBar from "@/components/wix-copy-bar";

const base = import.meta.env.BASE_URL;
export default function WorkReview() {
  return <div className="sd-root">
    <WixCopyBar section="Selected work" source={`${base}delivery/sections/selected-work.html`} title="snowden-selected-work.html"
      description="Copies the portfolio section, including Harbour View Cottages and Trout Extravaganza. Preview controls are excluded."
      setup={`${base}delivery/sections/WORK-WIX-SETUP.md`} />
    <iframe title="Snowden Design selected portfolio" src={`${base}delivery/sections/selected-work.html`}
      style={{ display: "block", width: "100%", height: "calc(100dvh - 120px)", minHeight: 600, border: 0 }} />
  </div>;
}
