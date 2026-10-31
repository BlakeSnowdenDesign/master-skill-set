import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { photographyBody } from "../src/photography-shared.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const image = "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png";
const css = readFileSync(`${root}src/photography.css`, "utf8").replace(/^@import[^\n]+\n/gm, "")
  + "\n" + readFileSync(`${root}src/studio-theme.css`, "utf8");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Snowden Design — Photography &amp; Drone Section</title>
<meta name="robots" content="noindex,nofollow"><link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#F3EDE3}${css}</style></head>
<body>${photographyBody(image)}</body></html>`;
if (html.includes("/__mockup/") || html.includes("undefined")) throw new Error("Incomplete photography export.");
mkdirSync(`${root}public/delivery/sections`, { recursive: true });
writeFileSync(`${root}public/delivery/sections/photography-drone.html`, html);
console.log(`Exported standalone photography and drone section: ${Buffer.byteLength(html)} bytes`);
