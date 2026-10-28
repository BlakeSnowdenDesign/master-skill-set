#!/usr/bin/env bash
# Zips the skill folder for upload to claude.ai (Settings > Capabilities > Skills).
set -euo pipefail
cd "$(dirname "$0")/../skills"
mkdir -p ../dist
rm -f ../dist/snowden-design-studio.zip
zip -rq ../dist/snowden-design-studio.zip snowden-design-studio
echo "Wrote dist/snowden-design-studio.zip"
