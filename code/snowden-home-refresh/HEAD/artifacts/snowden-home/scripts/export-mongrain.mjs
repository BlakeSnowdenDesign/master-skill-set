import { readFileSync, writeFileSync } from "node:fs";

// Reuse the shared home export's styles, embedded image, and interaction code.
const home = readFileSync("public/delivery/snowden-home.html", "utf8");
const section = home.match(/<section class="sd-mg sd-dark" id="sd-mongrain"[\s\S]*?<\/section>/)?.[0];
if (!section || !section.includes('srcdoc="&lt;!DOCTYPE html&gt;') || section.includes('src="undefined"')) {
  throw new Error("MONGRAIN export is incomplete.");
}
const html = home
  .replace(/<title>[\s\S]*?<\/title>/, "<title>Snowden Design — MONGRAIN</title>")
  .replace(/<main class="sd-root">[\s\S]*?<\/main>/, () => `<main class="sd-root">${section}</main>`);
writeFileSync("public/delivery/sections/03-mongrain.html", html);
console.log(`Exported MONGRAIN: ${Buffer.byteLength(html)} bytes`);
