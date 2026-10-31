import { build } from 'vite';
import { readFile, readdir, mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const foundationExport = process.argv.includes('--foundation');
// --section=hero|sequence|assembly|brief builds one Foundation Systems section for its own Wix embed.
const SECTIONS = { hero: '01-hero', sequence: '02-sequence', assembly: '03-assembly', brief: '04-brief' };
const section = process.argv.find(a => a.startsWith('--section='))?.slice('--section='.length) ?? '';
if (section && !SECTIONS[section]) throw new Error(`Unknown section "${section}". Use one of: ${Object.keys(SECTIONS).join(', ')}`);
const assetsDir = path.join(root, 'public/assets');
const embedded = {};
const temporary = await mkdtemp(path.join(tmpdir(), 'mongrain-wix-'));
try {
  for (const name of await readdir(assetsDir)) {
    if (!name.endsWith('.png')) continue;
    const optimized = path.join(temporary, `${name}.webp`);
    await promisify(execFile)('magick', [
      path.join(assetsDir, name),
      '-resize', name.startsWith('logo') ? '256x256>' : '1100x750>',
      '-strip', '-quality', '88', optimized,
    ]);
    embedded[name] = `data:image/webp;base64,${(await readFile(optimized)).toString('base64')}`;
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}

// Reuse the app's build so the Wix file always contains the same model and controls.
const result = await build({
  configFile: path.join(root, 'vite.config.ts'),
  base: './',
  define: {
    __EMBEDDED_ASSETS__: JSON.stringify(embedded),
    __WIX_EMBED__: 'true',
    __FOUNDATION_PAGE__: String(foundationExport || !!section),
    __FOUNDATION_SECTION__: JSON.stringify(section),
  },
  build: {
    write: false,
    copyPublicDir: false,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
if (Array.isArray(result)) throw new Error('Expected one standalone build.');
const outputs = result.output;
const htmlAsset = outputs.find(o => o.type === 'asset' && o.fileName === 'index.html');
const js = outputs.filter(o => o.type === 'chunk');
const css = outputs.filter(o => o.type === 'asset' && o.fileName.endsWith('.css'));
if (!htmlAsset || js.length !== 1 || css.length !== 1) {
  throw new Error('Standalone export must contain one HTML, one JavaScript bundle and one stylesheet.');
}
let html = String(htmlAsset.source)
  .replace(/<script\b[^>]*\bsrc="[^"]*"[^>]*><\/script>/g, '')
  .replace(/<link\b[^>]*\b(?:rel="(?:stylesheet|modulepreload)"|href="[^"]*favicon[^"]*")[^>]*>/g, '');
if (foundationExport || section) {
  html = html.replace(/<title>[^<]*<\/title>/i, '<title>Mongrain — Foundation Systems</title>');
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="description" content="Explore illustrative below-grade protection systems, foundation assemblies and critical connections with Mongrain.">');
  html = html.replace(/(<meta\s+(?:property|name)="(?:og:title|twitter:title)"\s+content=")[^"]*(")/gi,
    '$1Mongrain — Foundation Systems$2');
  html = html.replace(/(<meta\s+(?:property|name)="(?:og:description|twitter:description)"\s+content=")[^"]*(")/gi,
    '$1Explore illustrative below-grade protection systems, foundation assemblies and critical connections with Mongrain.$2');
}
// Use replacement callbacks: minified bundles contain "$&" and "$`", which
// String.replace would otherwise interpret as replacement metacharacters.
html = html.replace('</head>', () => `<style>${String(css[0].source).replace(/<\/style/gi, '<\\/style')}</style>\n</head>`);
html = html.replace('</body>', () => `<script type="module">${js[0].code.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`);
// A Wix iframe cannot resolve the workspace's emitted bundle or asset paths.
// Keep fonts external, but fail rather than deliver a partly copyable app.
if (/<script\b[^>]*\bsrc=|<link\b[^>]*\brel="modulepreload"/i.test(html)) {
  throw new Error('Wix export still references an external JavaScript bundle.');
}
const bundledAssets = outputs.filter(o => o.type === 'asset' &&
  o.fileName !== 'index.html' && !o.fileName.endsWith('.css'));
if (bundledAssets.length) {
  throw new Error(`Wix export contains assets that must be embedded: ${bundledAssets.map(o => o.fileName).join(', ')}`);
}
const destination = path.join(root, '../../exports', section ? 'foundation-sections' : '');
await mkdir(destination, { recursive: true });
const file = path.join(destination, section
  ? `foundation-${SECTIONS[section]}-wix.html`
  : foundationExport ? 'mongrain-foundation-systems-wix.html' : 'mongrain-building-wix.html');
await writeFile(file, html);
if (!section) await writeFile(path.join(root, foundationExport ? 'public/foundation-systems-wix.html' : 'public/wix-embed.html'), html);
console.log(`Wix HTML exported: ${file} (${Buffer.byteLength(html).toLocaleString()} bytes)`);
