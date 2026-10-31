// Extract the real reworked hero, not the earlier full-page draft.
// React/TSX are used only at build time; the delivered file is plain HTML/CSS.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { transformSync } from "esbuild";
import { OFFICE_IMAGE_URL } from "../src/home-shared.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const mockup = fileURLToPath(new URL("../../mockup-sandbox/", import.meta.url));
const source = readFileSync(`${mockup}src/components/mockups/snowden-home/WorkFirst.tsx`, "utf8");
const section = source.match(/<section className="wf-hero"[\s\S]*?<\/section>/)?.[0]
  ?.replace("snowden-rook.webp", "studio-office.webp")
  .replace(
    '<a href="#work" className="wf-text-link">Step into the work <Arrow /></a>',
    '<a href="https://www.snowden-design.com/work" target="_top" className="wf-text-link sd-hero-metal"><span className="sd-hero-metal__sweep" aria-hidden="true"></span><span className="sd-hero-metal__label">See the work <Arrow /></span></a>',
  )
  .replace(
    /<figure className="wf-hero__mark">[\s\S]*?<\/figure>/,
    '<figure className="wf-hero__mark"><div className="sd-studio-frame"><img className="sd-studio-photo" src="studio-office.webp" alt="Snowden Design office and creative studio, with a photography workspace, leather seating and outdoor-inspired artwork" width="1800" height="1013" fetchPriority="high" decoding="async" /></div></figure>',
  );
if (!section) throw new Error("The reworked hero section could not be extracted.");
const arrow = source.slice(source.indexOf("function Arrow("), source.indexOf("export default function"));
const compiled = transformSync(
  `${arrow}\nfunction Hero(){return <div className="wf">${section}</div>}`,
  { loader: "tsx", jsx: "transform", target: "es2022" },
).code;
const Hero = new Function("React", "base", `${compiled}; return Hero;`)(React, "");
let body = renderToStaticMarkup(React.createElement(Hero))
  .replace(/<link rel="preload"[^>]*\/>/g, "")
  .replace('href="#work"', 'href="https://www.snowden-design.com/home-1" target="_top"')
  .replace('href="#capabilities"', 'href="https://www.snowden-design.com/home-1-1" target="_top"')
  .replace(/<h1(\s|>)/g, "<h2$1").replaceAll("</h1>", "</h2>")
  .replace(/\bwf\b/g, "sd-first")
  .replaceAll('src="studio-office.webp"', `src="${OFFICE_IMAGE_URL}"`);
const css = readFileSync(`${mockup}src/components/mockups/snowden-home/_work-first.css`, "utf8")
  .replace(/^@import[^\n]+\n/gm, "")
  .replace(/\bwf\b/g, "sd-first")
  .replaceAll(".sd-first-hero h1", ".sd-first-hero h2")
  + "\n" + readFileSync(`${root}src/studio-theme.css`, "utf8");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Snowden Design — Home Section 1: Hero</title>
<link rel="icon" href="data:,">
<meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#F3EDE3} .sd-first h2,.sd-first p,.sd-first figure{margin:0} .sd-first img{height:auto}
${css}
.sd-first a{min-height:44px}
</style></head><body>${body}</body></html>`;
if (html.includes("/__mockup/") || html.includes('href="#work"')) throw new Error("Sandbox reference remains.");
mkdirSync(`${root}public/delivery/sections`, { recursive: true });
writeFileSync(`${root}public/delivery/sections/01-hero.html`, html);
console.log(`Exported standalone reworked hero: ${Buffer.byteLength(html)} bytes`);
