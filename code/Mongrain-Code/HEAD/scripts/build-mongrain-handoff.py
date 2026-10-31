#!/usr/bin/env python3
"""Build a document-first, credential-free Mongrain handoff package."""
from pathlib import Path
from html import escape
import base64
import hashlib
import json
import re
import shutil
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "generated-artifacts" / "mongrain-handoff-2026-10-12"
DOC = ROOT / "docs" / "mongrain-website-handoff-2026-10-12.md"
OUT.mkdir(parents=True, exist_ok=True)

root_files = [
    "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml",
    "tsconfig.json", "tsconfig.base.json", "replit.md",
    ".gitignore", ".replitignore", ".gitattributes",
]
prefixes = [
    "artifacts/mongrain-building", "artifacts/api-server",
    "artifacts/mockup-sandbox", "lib", "scripts", "docs",
]
excluded_parts = {
    "node_modules", "dist", ".git", ".cache", "test-results",
    "playwright-report", "__pycache__", ".vite",
}
code_extensions = {".ts", ".tsx", ".js", ".mjs", ".cjs", ".css", ".json", ".yaml", ".yml", ".toml", ".html", ".sh", ".py"}
secret_patterns = [
    re.compile(rb"\bgh[pousr]_[A-Za-z0-9]{30,}\b"),
    re.compile(rb"\bgithub_pat_[A-Za-z0-9_]{30,}\b"),
    re.compile(rb"\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{30,}\b"),
    re.compile(rb"\bAKIA[A-Z0-9]{16}\b"),
    re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    re.compile(rb"(?:postgres(?:ql)?|mysql)://[^/\s:'\"]+:[^@\s'\"]+@"),
]

def permitted(path):
    rel = path.relative_to(ROOT)
    if set(rel.parts) & excluded_parts or path.is_symlink():
        return False
    if path.name.startswith(".env") or path.name.endswith((".tsbuildinfo", ".log")):
        return False
    return path.is_file()

files = set()
for name in root_files:
    path = ROOT / name
    if path.is_file():
        files.add(path)
for prefix in prefixes:
    for path in (ROOT / prefix).rglob("*"):
        if permitted(path):
            files.add(path)
for path in (ROOT / "exports").glob("*.html"):
    files.add(path)

payload = {}
for path in sorted(files):
    data = path.read_bytes()
    if path.suffix.lower() in code_extensions or path.name in root_files:
        if any(pattern.search(data) for pattern in secret_patterns):
            raise RuntimeError(f"Potential credential in {path.relative_to(ROOT)}; packaging stopped without displaying it.")
    payload["source/" + str(path.relative_to(ROOT))] = data

handoff = DOC.read_text()
payload["MONGRAIN_WEBSITE_HANDOFF.md"] = handoff.encode()
prompt = """# Grok — start here

I am sharing the current Mongrain website build, not asking you to restart it.

Read MONGRAIN_WEBSITE_HANDOFF.pdf or .md first, then CODE_FOR_GROK.md and the relevant source files.
The full source and seven standalone animation exports are in source/. File hashes are in FILE_MANIFEST.json.

Latest inspected application checkpoint: 7b2c112. Package prepared 12 October 2026.
The root route is the hospital explorer. /foundation-systems is the latest six-section page.
Hospital wall/roof/foundation overlays remain separate from the new foundation full page.
Models use procedural Three.js / React Three Fiber; they are illustrative, not verified hospital BIM.
Use Mongrain logos and established typography/colours. Make H1 fonts match the hero introduction.
Keep vendor names out of public animations; SOPREMA PDFs are research references only.
Preserve the click/zoom/pullout/exploded-detail journey and independent section geometry.
Complete Wix HTML is essential. Regenerate both affected targets; the normal build does not refresh the foundation target.
The foundation enquiry brief is local only, not delivered to Mongrain.
Do not resume the hospital BIM integration: I explicitly stopped it.
Do not assume the latest local source is on GitHub or already published.
Do not force-push, replace the database or add unsupported construction/performance claims.
No secrets or private profile/conversation history are included.

Summarize your understanding and ask what I want changed next before making unrelated changes.
When I give you a change, make it in the supplied source rather than replacing the approved build with a generic mockup.
"""
payload["GROK_START_HERE.md"] = prompt.encode()

try:
    patch = subprocess.check_output([
        "git", "diff", "18d52e1", "7b2c112", "--",
        "artifacts/mongrain-building/src",
        "artifacts/mongrain-building/scripts/export-wix.mjs",
        "artifacts/mockup-sandbox/src/components/mockups",
    ], cwd=ROOT, stderr=subprocess.DEVNULL)
except subprocess.CalledProcessError:
    patch = b"# Historical comparison unavailable in this extracted/cloned working folder.\n"
payload["LATEST_SOURCE_CHANGES.patch"] = patch

reference_names = [
    "Mongrain-SOPREMA-wall-systems-analysis.html",
    "Mongrain-SOPREMA-wall-systems-analysis.pdf",
    "SOPREMA-wall-technical-drawings.pdf",
]
reference_root = ROOT / ".local/conversation-workspace/files/attached_assets/soprema-wall-research-package"
missing = []
for name in reference_names:
    path = reference_root / name
    if path.is_file():
        payload["references/soprema/" + name] = path.read_bytes()
    else:
        missing.append(name)
hospital_pdf = ROOT / ".local/conversation-workspace/files/attached_assets/Future_Hospital_of_Vaudreuil-Soulanges_1791495761800.pdf"
if hospital_pdf.is_file():
    payload["references/hospital/" + hospital_pdf.name] = hospital_pdf.read_bytes()
wall = ROOT / "attached_assets/wall_layers_1_copy_1791498377383.png"
if wall.is_file():
    payload["references/wall/" + wall.name] = wall.read_bytes()

verification = """# Verification

Prepared 12 October 2026.

Fresh successful checks:
- pnpm run typecheck (shared libraries, API, sandbox, app and scripts).
- pnpm --filter @workspace/mongrain-building test:analytics (one passing Node test; no live events).
- pnpm --filter @workspace/mongrain-building typecheck:regression.
- Hospital Wix exporter built 2,679 transformed modules successfully.
- Foundation Wix exporter built 2,679 transformed modules successfully.

Historical observations, 9 October 2026:
- Desktop/phone layouts and real software-rendered WebGL foundation checked.
- Assembled versus exploded geometry compared.
- Six sections counted; no page errors in the successful foundation capture.
- Blindside brief downloaded with correct mode and explicit not-sent statement.

The full Playwright regression suite and actual target Wix page were NOT rerun for this handoff.
No GitHub upload or publication was performed.
No broad security audit was performed. Packaging screens common embedded credential signatures;
it is not a guarantee equivalent to a complete security review.
"""
payload["VERIFICATION.md"] = verification.encode()

def inline(text):
    text = escape(text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    return text

def markdown_html(markdown):
    lines = markdown.splitlines()
    result, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("```"):
            block = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                block.append(lines[i])
                i += 1
            result.append("<pre><code>" + escape("\n".join(block)) + "</code></pre>")
        elif line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                if not re.match(r"^\|\s*:?-+", lines[i]):
                    rows.append([inline(cell.strip()) for cell in lines[i].strip("|").split("|")])
                i += 1
            result.append("<table><thead><tr>" + "".join("<th>" + cell + "</th>" for cell in rows[0]) + "</tr></thead><tbody>" + "".join("<tr>" + "".join("<td>" + cell + "</td>" for cell in row) + "</tr>" for row in rows[1:]) + "</tbody></table>")
            continue
        elif re.match(r"^#{1,3} ", line):
            level = len(line.split(" ", 1)[0])
            result.append(f"<h{level}>" + inline(line[level + 1:]) + f"</h{level}>")
        elif line.startswith("- ") or re.match(r"^\d+\. ", line):
            numbered = not line.startswith("- ")
            items = []
            while i < len(lines) and (bool(re.match(r"^\d+\. ", lines[i])) if numbered else lines[i].startswith("- ")):
                items.append("<li>" + inline(re.sub(r"^(?:- |\d+\. )", "", lines[i])) + "</li>")
                i += 1
            tag = "ol" if numbered else "ul"
            result.append(f"<{tag}>" + "".join(items) + f"</{tag}>")
            continue
        else:
            result.append("<p>" + inline(line) + "</p>")
        i += 1
    return "\n".join(result)

logo_path = ROOT / ".agents/outputs/mongrain-logo-embed.png"
logo = ""
if logo_path.is_file():
    logo = '<img alt="Mongrain" src="data:image/png;base64,' + base64.b64encode(logo_path.read_bytes()).decode() + '">'
html = """<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Mongrain — Website Build Handoff</title><style>
@page { size:A4; margin:18mm 16mm; }
* { box-sizing:border-box; } body { margin:0; color:#172a31; background:#fff; font:10.5pt/1.5 Arial,sans-serif; }
.brand { display:flex; align-items:center; gap:14px; background:#17353d; color:#fff; padding:20px 25px; margin-bottom:28px; border-bottom:4px solid #12b5d1; }
.brand img { width:48px; height:48px; object-fit:contain; } .brand strong { display:block; font-size:17pt; letter-spacing:.1em; }
.brand span { font-size:9pt; color:#aadddf; }
h1 { font-size:25pt; line-height:1.12; letter-spacing:-.04em; margin:20px 0 10px; }
h2 { font-size:16pt; line-height:1.25; color:#0e788e; border-bottom:1px solid #cfdcde; padding-bottom:8px; margin:26px 0 12px; break-after:avoid; }
h3 { font-size:11.5pt; margin:19px 0 8px; break-after:avoid; } p { margin:9px 0; } li { margin:5px 0; }
table { width:100%; border-collapse:collapse; margin:14px 0; font-size:9pt; } thead { display:table-header-group; }
th { text-align:left; background:#17353d; color:#fff; padding:8px; } td { padding:8px; border-bottom:1px solid #dbe3e4; vertical-align:top; overflow-wrap:anywhere; }
tr { break-inside:avoid; } code { font:8.7pt/1.45 monospace; overflow-wrap:anywhere; } pre { background:#edf3f3; border-left:3px solid #12b5d1; padding:12px; white-space:pre-wrap; overflow-wrap:anywhere; break-inside:avoid; }
pre code { font-size:8.5pt; } .footer { border-top:1px solid #cfdbdd; padding-top:15px; margin-top:30px; font-size:8pt; color:#567077; }
@media screen { body { max-width:960px; margin:40px auto; padding:35px; box-shadow:0 12px 70px #17353d12; } }
</style></head><body><header class="brand">""" + logo + """<div><strong>MONGRAIN</strong><span>Website build · Technical and creative handoff · 12 October 2026</span></div></header>""" + markdown_html(handoff) + """<footer class="footer">Companion source files and export/research references are supplied in the complete handoff ZIP. No credentials or private user profile are included.</footer></body></html>"""
html_path = OUT / "MONGRAIN_WEBSITE_HANDOFF.html"
html_path.write_text(html)
pdf_path = OUT / "MONGRAIN_WEBSITE_HANDOFF.pdf"
chromium = shutil.which("chromium") or "/repl/tools/bin/chromium"
subprocess.run([
    chromium, "--headless", "--no-sandbox", "--disable-gpu",
    "--no-pdf-header-footer", "--print-to-pdf=" + str(pdf_path), html_path.as_uri(),
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
if not pdf_path.is_file() or not pdf_path.read_bytes().startswith(b"%PDF-"):
    raise RuntimeError("PDF generation did not produce a valid PDF.")
payload["MONGRAIN_WEBSITE_HANDOFF.html"] = html.encode()
payload["MONGRAIN_WEBSITE_HANDOFF.pdf"] = pdf_path.read_bytes()

appendix = [
    "# MONGRAIN — COMPLETE CODE CONTEXT FOR GROK\n",
    "Prepared 12 October 2026. Read the handoff first. Original relative paths are preserved below.",
    "Binary assets, duplicated compiled HTML and lockfile bulk are in the ZIP, not repeated here.",
    "This is source context, not permission to resume paused work or deploy/push changes.\n",
]
code_count = 0
for name, data in sorted(payload.items()):
    if not name.startswith("source/"):
        continue
    rel = Path(name.removeprefix("source/"))
    if rel.suffix.lower() not in code_extensions or rel.name == "pnpm-lock.yaml":
        continue
    if "public" in rel.parts or rel.parts[0] == "exports":
        continue
    text = data.decode("utf-8")
    longest = max((len(match.group(0)) for match in re.finditer(r"`+", text)), default=2)
    fence = "`" * max(4, longest + 1)
    appendix.extend(["\n## FILE: " + str(rel), fence, text, fence])
    code_count += 1
payload["CODE_FOR_GROK.md"] = "\n".join(appendix).encode()
payload["README.md"] = (
    "# Mongrain full handoff package\n\nRead MONGRAIN_WEBSITE_HANDOFF.pdf or .md, then GROK_START_HERE.md.\n"
    "The source/ directory mirrors the current workspace application/configuration paths. "
    "Copy its contents into a new working folder to run the supplied pnpm workspace.\n"
    "CODE_FOR_GROK.md consolidates " + str(code_count) + " code/configuration files; exact assets and HTML exports remain separate.\n"
    "Excluded: credentials/.env files, .replit machine configuration, .npmrc, private profiles and internal conversations, "
    "Git internals, dependencies, caches, database dumps, compiled dist/test outputs and duplicated raw media.\n"
    "Research reference PDFs retain manufacturer copyrights and are not public animation branding.\n"
    "Missing selected research files: " + (", ".join(missing) or "none") + ".\n"
    "All files except FILE_MANIFEST.json itself are listed with SHA-256 hashes in FILE_MANIFEST.json.\n"
).encode()
try:
    checkpoint = subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=ROOT, stderr=subprocess.DEVNULL
    ).decode().strip()
except subprocess.CalledProcessError:
    checkpoint = "Git history unavailable in this folder"
manifest = {
    "prepared": "2026-10-12",
    "application_checkpoint": checkpoint,
    "snapshot": "Current working files including refreshed Wix exports; not a claimed GitHub/production snapshot.",
    "files": [{"path": name, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()} for name, data in sorted(payload.items())],
}
payload["FILE_MANIFEST.json"] = json.dumps(manifest, indent=2).encode()
for name in ["MONGRAIN_WEBSITE_HANDOFF.md", "GROK_START_HERE.md", "CODE_FOR_GROK.md", "FILE_MANIFEST.json", "VERIFICATION.md"]:
    (OUT / name).write_bytes(payload[name])
zip_path = OUT / "MONGRAIN_FULL_HANDOFF_2026-10-12.zip"
with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
    for name, data in sorted(payload.items()):
        archive.writestr("MONGRAIN_HANDOFF_2026-10-12/" + name, data)
with zipfile.ZipFile(zip_path) as archive:
    if archive.testzip() is not None:
        raise RuntimeError("ZIP integrity check failed.")
    for item in manifest["files"]:
        actual = archive.read("MONGRAIN_HANDOFF_2026-10-12/" + item["path"])
        if hashlib.sha256(actual).hexdigest() != item["sha256"]:
            raise RuntimeError("Archive hash mismatch.")
print(json.dumps({
    "zip": str(zip_path.relative_to(ROOT)),
    "zip_bytes": zip_path.stat().st_size,
    "files": len(payload),
    "code_appendix_files": code_count,
    "code_appendix_bytes": len(payload["CODE_FOR_GROK.md"]),
    "pdf": str(pdf_path.relative_to(ROOT)),
    "pdf_bytes": pdf_path.stat().st_size,
    "research_files_missing": missing,
    "integrity": "ZIP and all manifest hashes verified",
}, indent=2))
