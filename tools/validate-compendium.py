#!/usr/bin/env python3
"""Validate collected bytes, portable skill metadata and authored-library links."""
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import unquote

base = Path(__file__).resolve().parents[1]
manifest = json.loads((base / "audit/current-source-manifest.json").read_text())
errors = []
for item in manifest["files"]:
    path = base / item["stored_path"]
    if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != item["sha256"]:
        errors.append(f"Missing or changed source: {item['stored_path']}")
prompt_manifest = json.loads((base / "audit/prompt-source-manifest.json").read_text())
for item in prompt_manifest["files"]:
    path = (base / item["stored_path"]).resolve()
    if not path.is_relative_to(base.resolve()) or not path.is_file():
        errors.append(f"Missing or invalid prompt path: {item['stored_path']}")
        continue
    blob = path.read_bytes()
    if len(blob) != item["bytes"] or hashlib.sha256(blob).hexdigest() != item["sha256"]:
        errors.append(f"Changed prompt source: {item['stored_path']}")
for path in base.glob("skills/*/SKILL.md"):
    text = path.read_text()
    match = re.match(r"---\nname: ([a-z0-9-]+)\ndescription: .+\n---\n", text)
    if not match or match[1] != path.parent.name:
        errors.append(f"Invalid skill metadata: {path.relative_to(base)}")
authored = ["README.md", "START-HERE.md", "AGENTS.md", "CLAUDE.md", "SKILLS.md",
            "SECTION-INDEX.md", "audit/CURRENT-AUDIT.md", "prompts/README.md",
            "projects/snowden-design-prompts.md",
            "skills/accessibility-seo/SKILL.md", "skills/background-motion/SKILL.md"]
for name in authored:
    path = base / name
    text = re.sub(r"```.*?```", "", path.read_text(), flags=re.S)
    for link in re.findall(r"(?<!!)\[[^\]]*\]\(([^)]+)\)", text):
        if re.match(r"[a-z][a-z0-9+.-]*:", link, re.I):
            continue
        target = (path.parent / unquote(link.split("#")[0])).resolve()
        if not target.is_relative_to(base.resolve()) or not target.is_file():
            errors.append(f"Broken library link: {name}: {link}")
print(json.dumps({"source_records": len(manifest["files"]),
                  "unique_source_files": len({r["stored_path"] for r in manifest["files"]}),
                  "prompt_sources": len(prompt_manifest["files"]),
                  "skills": len(list(base.glob("skills/*/SKILL.md"))),
                  "errors": errors}, indent=2))
raise SystemExit(bool(errors))
