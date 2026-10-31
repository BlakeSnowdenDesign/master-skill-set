// Generates public/delivery/snowden-home.html from the shared React source.
// Run: node scripts/build-export.mjs  (from artifacts/snowden-home)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homeBody, initHome, CAPTIONS, OFFICE_IMAGE_URL } from "../src/home-shared.mjs";

const uri = (f) => "data:image/webp;base64," + readFileSync("public/assets/" + f).toString("base64");
// Wouter expects a slash-prefixed path; about:srcdoc exposes "srcdoc".
// Adapt only the embedded copy; keep the upstream export unmodified.
const viewerSource = readFileSync("public/delivery/mongrain-viewer-source.html", "utf8");
const locationHook = "()=>location.pathname";
if (!viewerSource.includes(locationHook)) throw new Error("Recheck the MONGRAIN embed's routing adapter.");
const viewerEmbed = viewerSource.replace(locationHook, '()=>location.pathname==="srcdoc"?"/":location.pathname');
const assets = {
  analytics: "data:image/png;base64," + readFileSync("public/assets/wix-analytics-report.png").toString("base64"),
  office: OFFICE_IMAGE_URL,
  mongrain: uri("mongrain.webp"),
  mongrainViewerHtml: viewerEmbed,
  edge: uri("edge-internet.webp"),
  harbour: uri("harbour-view.webp"),
  trout: uri("trout-extravaganza.webp"),
  camera: "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png",
  helen: "https://static.wixstatic.com/media/2fde66_5bab9e8c59f44e64a3f1ace9cb116342~mv2.jpg/v1/fill/w_1400,h_875,al_t,q_85,enc_auto/helen-falls-lodge.jpg",
  shadow: "https://static.wixstatic.com/media/2fde66_c8932db74d9045d4b765f5187c99e67c~mv2.png/v1/fill/w_1000,h_625,al_t,q_85,enc_auto/shadow-creek-ranch.png",
  blake: "https://static.wixstatic.com/media/2fde66_8ae605c421084ad9b842ab1a21440ec3~mv2.png",
};
const css = readFileSync("src/sd-home.css", "utf8").split("/* Preview-only native shell mock */")[0]
  + "\n" + readFileSync("src/photography.css", "utf8").replace(/^@import[^\n]+\n/gm, "")
  + "\n" + readFileSync("src/studio-theme.css", "utf8");
const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Snowden Design | Home section embed</title>
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#F3EDE3}
${css}</style></head>
<body><main class="sd-root">
${homeBody(assets).replace('<h1 ', '<h2 ').replace('</h1>', '</h2>')}
</main>
<script>(function(){var initHome=${initHome.toString()};initHome(document.querySelector(".sd-root"),${JSON.stringify(CAPTIONS)});})();</script>
</body></html>`;
mkdirSync("public/delivery", { recursive: true });
writeFileSync("public/delivery/snowden-home.html", html);
console.log("wrote", html.length);
