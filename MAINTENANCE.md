# Current collection tools

For the current repository-backed compendium, run from the workspace root:

```sh
python3 "master skillet/tools/collect-sources.py" --workspace "$PWD" --sources /path/to/reviewed-clones
python3 "master skillet/tools/validate-compendium.py"
```

Prepare reviewed clones named `Snowden-Design`, `Mongrain-Code`, and `Harbour-View`, including the remote feature branches you intend to collect. The collector does not fetch or push. It reads tracked files, preserves revisions and hashes, and rejects common credential patterns. Recollect into a fresh staging directory when removing or renaming sources so stale snapshots are not retained.

Do not execute imported build scripts merely to index them. Check project-specific dependencies and original asset paths before reusing code. Publish only after inspecting the destination diff and preserving upstream commits; never force-push as part of routine collection.

The earlier draft-maintenance procedure follows.

# Maintenance and update procedure

## Local-first review

1. Keep the requested working name `master skillet`. Do not infer a GitHub destination from this directory.
2. Confirm target identities, authorized scope and redistribution rights. Recheck [open questions](audit/CONFLICTS.md).
3. For each update, pin source repository, canonical branch, SHA, file path and line range. For local-only evidence, record local SHA, file hash and limitations. Do not imply hashes establish authorship or approval.
4. Preserve documented attribution, never infer author from a branch name, model mention or hosting provider. Record current tests separately from historical reports.
5. Keep reusable methods in skill modules; keep branding, assets, copy, exact timing and publication rules in project profiles. Resolve only evidenced supersession; otherwise log a conflict.
6. Update curated excerpts and claim map, then run the validator and fresh-session walkthroughs. Review added text manually for private data and rights, not only pattern matches.
7. Regenerate the self-contained reader and ZIP with the export script. These are local files only.

## Integrating assistant-authored review packages

Treat an uploaded review as a secondary source until its underlying repository evidence is inspected. Record the user's attribution, original archive/member hashes and excerpt line ranges; keep reported review date distinct from archive timestamp. Do not convert branch pointers, claimed “verified” headings or reported empty repositories into current verified facts. Preserve local newer approved intent when an older summary conflicts, and log unresolved approval/identity questions.

The integrated ChatGPT upload uses U01–U05. The collector needs the original upload in the workspace to regenerate those hashes/excerpts; raw archive/private-profile-like sections are deliberately absent from the distributable. Recipients without original source files may read the bundled excerpts but must report that they cannot revalidate original source hashes. The full validator is a maintainer-workspace check, not proof from an offline ZIP alone.

## Completing the missing GitHub audit

Use authorized read-only access. Record actual authenticated identity, memberships/organizations and repository visibility limits. Exhaust pagination for each account/org repository listing and relevant branch listing. A first page or shortlist is not full coverage. For every excluded repository, state a concrete reason; for unknown/inaccessible sources, say so.

Map named products to actual repositories with owner confirmation for uncertain aliases. Inspect README, collaboration/agent files, handoffs, user-authored skills, referenced implementation and newer branch handoffs where canonical docs say work is incomplete. Pin approved canonical source separately from unmerged draft evidence. Do not treat draft work as accepted behavior.

Until this happens, keep the PARTIAL banners. Imports from an owner-provided export should include original revision metadata; an undated archive alone does not establish canonical state.

## Packaging boundaries

Never include secrets, credentials, customer datasets, private profile files, managed skill libraries, platform-internal instructions, full third-party bundles or assets without redistribution rights. Prefer small original examples, curated excerpts and source pointers. Recheck source references after line changes. Hashes should change when files change.

A pattern-based privacy scan is a guard, not a proof. Manually review permitted source slices and every newly added file, especially contact details, signed URLs and analytics/client evidence. Do not access secret values in order to scan.

## Optional publication — separate approval

Confirm exact name/folder, GitHub owner, new repository versus existing folder, visibility, rights and explicit write approval. The current task does not permit publication even if the connection has write scopes. No scheduled synchronization or installation into providers is configured.

GitHub storage makes a package retrievable where authorized; it does not train models, synchronize private chats, or guarantee identical outcomes. Assistants without retrieval access need an uploaded archive or pasted index/modules.
