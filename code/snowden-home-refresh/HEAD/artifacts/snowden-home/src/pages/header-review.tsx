import { useState } from "react";
import WixCopyBar from "@/components/wix-copy-bar";

const base = import.meta.env.BASE_URL;
const src = `${base}delivery/sections/00-header.html`;

export default function HeaderReview() {
  const [replay, setReplay] = useState(0);
  const previewSrc = replay ? `${src}?replay=${replay}` : src;
  return (
    <div className="sd-root" style={{ minHeight: "100dvh", padding: "28px 0" }}>
      <div className="sd-wrap">
        <div className="sd-eyebrow sd-mono">Owner review · header embed</div>
        <h1 className="sd-h sd-h2">Dark-blue menu · rolls down</h1>
        <p>The header loads closed, then opens automatically after 5.5 seconds. You can also open it immediately with the hamburger. All nine page links slide in top to bottom at 125ms intervals; the green X retracts them in reverse. The menu labels are 20% larger, with another 30% increase in left padding. The translucent background fills the iframe; position the Wix embed over the entire video hero to cover it.</p>
        <WixCopyBar section="Header" source={src} title="snowden-design-header.html" description="Copies the standalone header only. The development toolbar and review controls are not included." setup={`${base}delivery/sections/HEADER-WIX-SETUP.md`} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button type="button" className="sd-btn sd-btn--teal" onClick={() => setReplay(value => value + 1)}>Replay 5.5-second delay</button>
        </div>
        <div style={{ border: "1px solid #a9aaa8", borderRadius: 14, overflow: "visible", marginTop: 12, backgroundColor: "#d3d4d2", backgroundImage: "linear-gradient(45deg,#b7b9b8 25%,transparent 25%),linear-gradient(-45deg,#b7b9b8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#b7b9b8 75%),linear-gradient(-45deg,transparent 75%,#b7b9b8 75%)", backgroundSize: "28px 28px", backgroundPosition: "0 0,0 14px,14px -14px,-14px 0" }}>
          <iframe key={replay} className="sd-header-preview-frame" title="Snowden dark-blue header embed" src={previewSrc} style={{ width: "100%", border: 0, display: "block", background: "transparent" }} />
        </div>
        <p style={{ marginTop: 14 }}><a href={`${base}delivery/sections/HEADER-WIX-SETUP.md`} download>Download Wix setup notes</a></p>
      </div>
    </div>
  );
}
