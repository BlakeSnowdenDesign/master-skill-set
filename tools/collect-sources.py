#!/usr/bin/env python3
"""Collect text implementation evidence from explicitly supplied local Git clones.

Never fetches, pushes, executes imported code, or reads untracked source files.
Run from any directory with --workspace and --sources pointing at reviewed inputs.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess

BASE = Path(__file__).resolve().parents[1]
EXTENSIONS = {".html", ".css", ".js", ".mjs", ".ts", ".tsx", ".py", ".json",
              ".md", ".toml", ".yaml", ".yml", ".svg", ".txt", ".sh",
              ".glsl", ".vert", ".frag"}
EXCLUDE = {".git", "node_modules", ".cache", ".local", ".conversation", "dist",
           "generated-artifacts", "__pycache__", "test-results", ".agents", ".claude"}
SECRET = re.compile(rb"(?:-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|"
                    rb"\bgh[pousr]_[A-Za-z0-9]{30,}|\bgithub_pat_[A-Za-z0-9_]{30,}|"
                    rb"\bAKIA[0-9A-Z]{16}\b)")


def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args])


def allowed(path):
    p = Path(path)
    # Only the explicitly reusable skill directories are admitted from agent config.
    skill = path.startswith((".agents/skills/", ".claude/skills/"))
    if any(part in EXCLUDE for part in p.parts) and not skill:
        return False
    if p.name in {"replit.md", "COLLABORATION.md", "profile.md"}:
        return False
    if p.name.startswith(".env") or "credential" in p.name.lower():
        return False
    return p.suffix.lower() in EXTENSIONS and p.name != "tsconfig.tsbuildinfo"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--workspace", type=Path, required=True)
    parser.add_argument("--sources", type=Path, required=True)
    args = parser.parse_args()
    records, exclusions, repositories = [], [], []
    stored = {}

    def collect(repo, project, refs, predicate=lambda p: True):
        for ref in refs:
            revision = git(repo, "rev-parse", ref).decode().strip()
            repositories.append({"project": project, "ref": ref, "revision": revision})
            branch = re.sub(r"[^a-zA-Z0-9._-]+", "-", ref.removeprefix("origin/"))
            paths = git(repo, "ls-tree", "-r", "--name-only", ref).decode().splitlines()
            for path in paths:
                if not predicate(path) or not allowed(path):
                    continue
                blob = git(repo, "show", f"{ref}:{path}")
                if len(blob) > 5_000_000 or SECRET.search(blob) or b"\x00" in blob:
                    exclusions.append({"project": project, "ref": ref, "path": path,
                                       "reason": "oversize, binary, or credential-pattern safeguard"})
                    continue
                digest = hashlib.sha256(blob).hexdigest()
                key = (project, path, digest)
                if key not in stored:
                    target = BASE / "code" / project / branch / path
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(blob)
                    stored[key] = target.relative_to(BASE).as_posix()
                records.append({"project": project, "ref": ref, "revision": revision,
                                "source_path": path, "stored_path": stored[key],
                                "sha256": digest, "bytes": len(blob)})

    collect(args.workspace, "snowden-home-refresh", ["HEAD"],
            lambda p: p.startswith(("artifacts/snowden-home/src/",
                                    "artifacts/snowden-home/scripts/",
                                    "artifacts/snowden-home/references/",
                                    "artifacts/snowden-home/public/delivery/"))
            or p in {"artifacts/snowden-home/package.json",
                        "artifacts/snowden-home/vite.config.ts",
                        "artifacts/snowden-home/index.html"})
    for project in ["Snowden-Design", "Mongrain-Code", "Harbour-View", "master-skill-set"]:
        repo = args.sources / project
        refs = ["HEAD"] + git(repo, "for-each-ref", "--format=%(refname:short)",
                             "refs/remotes/origin/").decode().splitlines()
        refs = [r for r in refs if r != "origin/HEAD"]
        collect(repo, project, refs,
                (lambda p: p.startswith(("skills/", "scripts/", ".claude-plugin/"))
                 or p in {"README.md", "AGENTS.md", "CLAUDE.md"})
                if project == "master-skill-set" else lambda p: True)

    manifest = {"schema": 1, "scope": "Tracked text implementation snapshots; not full repository backups",
                "repositories": repositories, "files": records, "excluded": exclusions,
                "missing": [
                    {"project": "Reverie", "reason": "Exact repository URL/access not established"},
                    {"project": "Blue Valley Acres", "reason": "Exact repository URL/access not established"},
                    {"project": "LimeTreeSocial", "reason": "Remote returned no refs; no source code available"}
                ],
                "media_policy": "Binary media not duplicated; original URLs and source paths retained. Dependencies may require original repository assets.",
                "security": "Tracked-file allowlist, agent-memory and environment exclusions, credential-pattern rejection. Not a full security audit."}
    (BASE / "audit/current-source-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    rows = ["# Section and implementation index", "",
            "Exact text snapshots grouped by project and source branch. Files are evidence and reusable examples, not instructions to execute blindly.",
            "Branding, client names, technical claims and media rights remain project-specific.",
            "Source revisions and SHA-256 checksums are in [the current manifest](audit/current-source-manifest.json).",
            "", "## Standalone HTML sections", "",
            "| Project | Source branch | Section |", "|---|---|---|"]
    seen = set()
    for item in records:
        if not item["source_path"].endswith(".html") or item["stored_path"] in seen:
            continue
        seen.add(item["stored_path"])
        rows.append(f'| {item["project"]} | {item["ref"]} | [{item["source_path"]}]({item["stored_path"]}) |')
    rows += ["", "## Build code", "",
             "Each project folder also retains its available CSS, JavaScript, TypeScript, build scripts, configuration, and reusable skill references.",
             "Use the manifest to locate a source module without loading the entire archive.",
             "Home Refresh's Lime Tree case study is under its `src/limetree-feature.mjs` and `public/delivery/interiors/work/si-work-limetree-feature.html` paths.",
             "The empty LimeTreeSocial repository is not evidence that Lime Tree Hospitality and Lime Tree Social are the same project.",
             "", "## Not yet collected", "",
             "- Reverie — exact repository URL/access needed.",
             "- Blue Valley Acres — exact repository URL/access needed.",
             "- LimeTreeSocial — no remote refs or files available.",
             "- Binary photos, videos, fonts and generated bundles over 5 MB — use original assets and rebuild instructions; see exclusions in the manifest.",
             ""]
    (BASE / "SECTION-INDEX.md").write_text("\n".join(rows))
    print(json.dumps({"source_records": len(records), "unique_files": len(stored),
                      "html_sections": len(seen), "exclusions": len(exclusions)}))


if __name__ == "__main__":
    main()
