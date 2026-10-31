#!/usr/bin/env bash
# Builds self-contained single-file HTML exports for pasting into Wix
# ("Embed HTML" > Code). Output: public/export/ (served for the /embed
# copy-code page) and generated-artifacts/wix/.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT_ROOT="../../generated-artifacts/wix"
mkdir -p "$OUT_ROOT" public/export
for view in 2d 3d; do
  tmp="$(mktemp -d)"
  SINGLEFILE=1 SINGLEFILE_OUT="$tmp" VITE_EMBED_START="$view" PORT=1 BASE_PATH=./ NODE_ENV=production \
    pnpm exec vite build --config vite.config.ts --logLevel warn
  cp "$tmp/index.html" "$OUT_ROOT/foundation-assembly-$view.html"
  cp "$tmp/index.html" "public/export/foundation-assembly-$view.html"
  rm -rf "$tmp"
done
ls -la "$OUT_ROOT"
