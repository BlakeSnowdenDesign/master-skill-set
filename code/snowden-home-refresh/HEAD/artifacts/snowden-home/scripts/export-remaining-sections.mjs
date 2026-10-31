import { readFileSync, writeFileSync } from "node:fs";

// Export the existing shared sections, not a separately maintained copy.
const home = readFileSync("public/delivery/snowden-home.html", "utf8");
const sections = [
  ["sd-services", "05-capabilities.html", "Capabilities"],
  ["sd-care", "06-care-analytics.html", "Care plans &amp; analytics"],
  ["sd-about", "07-about.html", "About Blake"],
  ["sd-contact", "08-contact.html", "Contact"],
];
for (const [id, file, title] of sections) {
  const section = home.match(new RegExp(`<section[^>]* id="${id}"[\\s\\S]*?<\\/section>`))?.[0];
  if (!section || section.includes('src="undefined"')) throw new Error(`Incomplete section: ${id}`);
  if (id === "sd-care" && !section.includes("data:image/png;base64,")) throw new Error("Analytics screenshot is missing.");
  const html = home
    .replace(/<title>[\s\S]*?<\/title>/, `<title>Snowden Design — ${title}</title>`)
    .replace(/<main class="sd-root">[\s\S]*?<\/main>/, () => `<main class="sd-root">${section}</main>`);
  writeFileSync(`public/delivery/sections/${file}`, html);
  console.log(`Exported ${file}: ${Buffer.byteLength(html)} bytes`);
}
