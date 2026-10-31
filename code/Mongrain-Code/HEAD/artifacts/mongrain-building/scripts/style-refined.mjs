import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.resolve(root, '../..');
const originalDir = path.join(workspace, '.local/conversation-workspace/files/attached_assets');
const original = await readFile(path.join(originalDir, 'mongrain-envelope-refined.html'), 'utf8');
const palette = await readFile(path.join(root, 'src/styles/refined-hospital-palette.css'), 'utf8');
const html = original.replace('</head>', () => `<style id="hospital-palette">\n${palette}\n</style></head>`);
const outputDir = path.join(workspace, 'exports');
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'mongrain-envelope-refined.html'), html);
await writeFile(path.join(root, 'public/refined-envelope.html'), html);

// Preserve the existing copy/download wrapper, replacing its embedded source.
const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrapper = await readFile(path.join(originalDir, 'mongrain-envelope-refined-preview.html'), 'utf8');
const preview = wrapper.replace(/(<textarea\b[^>]*>)[\s\S]*?(<\/textarea>)/i,
  (_, open, close) => `${open}${escapeHtml(html)}${close}`)
  .replace('</head>', () => `<style>
body{background:#E8EBEC;color:#132027}
.toolbar{background:rgba(247,250,250,.9);border-color:#C5CED2}
.toolbar small,#status{color:#55646D}
button{background:rgba(247,250,250,.9);border-color:#C5CED2;color:#132027}
button[aria-pressed=true]{background:rgba(18,181,209,.15);border-color:#12B5D1}
.copy{background:#12B5D1;border-color:#12B5D1;color:#06242B}
button:focus-visible{outline-color:#12B5D1}
textarea{background:#F7FAFA;color:#132027;border:1px solid #C5CED2}
</style></head>`);
await writeFile(path.join(outputDir, 'mongrain-envelope-refined-preview.html'), preview);
await writeFile(path.join(root, 'public/refined-envelope-preview.html'), preview);
console.log('Refined explorer exported with hospital palette; animation scripts unchanged.');
