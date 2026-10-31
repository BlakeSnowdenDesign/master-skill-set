import { readFileSync, writeFileSync } from "node:fs";
import { homeBody, initHome, CAPTIONS } from "../src/home-shared.mjs";

const image = file => "data:image/webp;base64," + readFileSync(`public/assets/${file}`).toString("base64");
const section = homeBody({
  helen: "https://static.wixstatic.com/media/2fde66_5bab9e8c59f44e64a3f1ace9cb116342~mv2.jpg/v1/fill/w_1400,h_875,al_t,q_85,enc_auto/helen-falls-lodge.jpg",
  shadow: "https://static.wixstatic.com/media/2fde66_c8932db74d9045d4b765f5187c99e67c~mv2.png/v1/fill/w_1000,h_625,al_t,q_85,enc_auto/shadow-creek-ranch.png",
  edge: image("edge-internet.webp"),
  harbour: image("harbour-view.webp"),
  trout: image("trout-extravaganza.webp"),
}, { includeWork: true }).match(/<section class="sd-sec" id="sd-work"[\s\S]*?<\/section>/)?.[0];
if (!section || section.includes("undefined")) throw new Error("Portfolio export is incomplete.");
const css = readFileSync("src/sd-home.css", "utf8").split("/* Preview-only native shell mock */")[0]
  + "\n" + readFileSync("src/studio-theme.css", "utf8");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Snowden Design — Selected Work</title><meta name="robots" content="noindex,nofollow"><link rel="icon" href="data:,">
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:#F3EDE3}${css}
.sd-root .sd-r{opacity:1;transform:none}
 .sd-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
 </style></head><body><main class="sd-root">${section}</main>
 <script>(function(){var initHome=${initHome.toString()};initHome(document.querySelector(".sd-root"),${JSON.stringify(CAPTIONS)});})();</script>
 </body></html>`;
writeFileSync("public/delivery/sections/selected-work.html", html);
console.log(`Exported selected work: ${Buffer.byteLength(html)} bytes`);
