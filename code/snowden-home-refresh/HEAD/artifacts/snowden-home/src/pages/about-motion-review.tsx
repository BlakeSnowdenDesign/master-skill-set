import WixCopyBar from "@/components/wix-copy-bar";

const base = import.meta.env.BASE_URL;
const source = `${base}delivery/sections/about-ken-burns.html`;

export default function AboutMotionReview() {
  return (
    <main className="sd-root" style={{ minHeight: "100dvh", padding: "28px 0" }}>
      <div className="sd-wrap">
        <div className="sd-eyebrow">Standalone section · owner review</div>
        <h1 className="sd-h sd-h2">Hi, I’m Blake · full-frame portrait</h1>
        <p>The photo is 30% larger on desktop and loads immediately inside Wix. The Ken Burns loop starts at a much closer 1.35× view, then zooms out to reveal the full photo and computer before smoothly zooming back in. Each direction lasts about 28.3 seconds—13% slower than the previous version. The curved backdrop remains subtle, and reduced-motion preferences keep everything still.</p>
        <WixCopyBar section="About portrait" source={source} title="snowden-about-ken-burns.html" description="Copies your standalone section with the portrait animation—not these review controls." setup={`${base}delivery/sections/ABOUT-KEN-BURNS-SETUP.md`} />
      </div>
      <iframe title="About Blake section with full-frame portrait and subtle motion" src={source} style={{ width: "100%", height: "max(1000px, 110dvh)", border: 0, display: "block", marginTop: 24 }} />
    </main>
  );
}
