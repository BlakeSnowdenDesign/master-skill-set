import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { headerMarkup, initHeader } from "../src/header-shared.mjs";

const css = readFileSync("src/header.css", "utf8");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Snowden Design — Studio navigation</title><meta name="robots" content="noindex,nofollow">
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,400..700&display=swap" rel="stylesheet"><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;min-height:100dvh;background:transparent;overflow:hidden} ${css}</style></head>
<body>${headerMarkup()}<script>(function(){var initHeader=${initHeader.toString()};initHeader(document.body,{open:new URLSearchParams(location.search).get("menu")==="open"});})();</script></body></html>`;
mkdirSync("public/delivery/sections", { recursive: true });
writeFileSync("public/delivery/sections/00-header.html", html);
console.log("wrote public/delivery/sections/00-header.html", html.length);
