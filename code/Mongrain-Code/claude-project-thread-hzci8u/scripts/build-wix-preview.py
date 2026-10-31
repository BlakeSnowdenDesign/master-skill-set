#!/usr/bin/env python3
"""Wrap a Wix embed HTML file in a preview page with width switcher, full code and Copy code buttons.

Usage: python3 scripts/build-wix-preview.py EMBED.html OUT.html --title "Fire Protection" \
         --url mongrain.ca/en/services/fire --heights "Desktop 5440 px, mobile 7850 px." [--frame-height 900]
"""
from pathlib import Path
from html import escape
import argparse

TEMPLATE = Path(__file__).resolve().parent / "wix-preview-template.html"

parser = argparse.ArgumentParser()
parser.add_argument("embed")
parser.add_argument("out")
parser.add_argument("--title", required=True)
parser.add_argument("--url", default="mongrain.ca")
parser.add_argument("--heights", required=True, help="Text for the 'Set the height' step")
parser.add_argument("--frame-height", type=int, default=860, help="Preview frame height in px (match the embed height)")
args = parser.parse_args()

page = TEMPLATE.read_text()
for key, value in (("TITLE", args.title), ("URL", args.url), ("HEIGHTS", args.heights), ("FRAMEH", str(args.frame_height))):
    page = page.replace(f"%%{key}%%", escape(value))
# Escaped into <pre>; the preview reads it back with textContent, so the copied code is byte-identical.
page = page.replace("%%CODE%%", escape(Path(args.embed).read_text()))
Path(args.out).write_text(page)
print(f"Preview written: {args.out}")
