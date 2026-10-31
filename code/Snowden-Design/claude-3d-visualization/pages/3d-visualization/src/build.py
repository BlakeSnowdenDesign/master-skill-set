#!/usr/bin/env python3
"""Builds the 3D Visualization page from src/ and assets/.

Outputs, next to this folder:
  snowden-3d-visualization.html  the Wix Embed HTML (paste this)
  preview.html                   browser-window preview with a copy-code panel
  SEO.md                         native Wix copy, SEO panel fields and JSON-LD

The FAQ and schema come from the data below, so the visible answers, the
embed and the JSON-LD always match word for word.

Run: python3 pages/3d-visualization/src/build.py
"""
import base64, html, json, pathlib, re

SRC = pathlib.Path(__file__).resolve().parent
PAGE = SRC.parent
ASSETS = PAGE / "assets"
SITE = "https://www.snowden-design.com"
URL = SITE + "/3d-visualization"
TITLE = "3D Architectural Visualization Denver | Snowden Design"
DESCRIPTION = ("Interactive 3D building models, exploded assembly animations and BIM-style renders "
               "by Snowden Design in Denver. See the live Mongrain envelope explorer.")

IMAGES = {
    "envelope": "mongrain-building-envelope-exploded-3d-model.webp",
    "wall": "mongrain-exploded-wall-assembly-3d-render.webp",
    "foundation": "mongrain-foundation-systems-3d-cutaway.webp",
    "bim": "mongrain-bim-style-envelope-section-3d.webp",
}
MODEL = "mongrain-bim-section-live.html"

FAQ = [
    ("What is 3D architectural visualization?",
     "3D architectural visualization turns drawings, CAD files or photos of a building into a 3D model "
     "people can see from any angle. Snowden Design builds them as interactive web scenes, so visitors can "
     "rotate a building, open its layers and understand how it goes together without reading a spec sheet."),
    ("Can an interactive 3D model run on a Wix website?",
     "Yes. Snowden Design delivers each model as one self-contained HTML file that pastes into a Wix Embed "
     "HTML element. It needs no apps, plugins or Velo code, runs in any modern browser with WebGL, and falls "
     "back to still images and plain text when 3D or motion is turned off."),
    ("What did Snowden Design build for Mongrain?",
     "For Mongrain, a building-envelope contractor, Snowden Design built an interactive 3D explorer of a "
     "hospital project. Visitors watch the building assemble from foundation to roof, click a wall, roof or "
     "foundation zone to explode its layers, and explore a 24-component BIM-style section and a six-section "
     "foundation systems page."),
    ("What files do I need to start a 3D project?",
     "Whatever you already have is usually enough: CAD or BIM exports, architectural drawings, product spec "
     "sheets, PDFs or clear photos. Mongrain's models started from system drawings and photos of the finished "
     "building. Snowden Design simplifies that reference into a model that reads clearly on a phone or "
     "desktop screen."),
    ("How much does 3D visualization cost?",
     "Every 3D project is quoted after a free consultation, because cost depends on how many assemblies the "
     "model shows, how much animation and interaction it needs, and where it will be published. Call "
     "720-340-2611 or email blake@snowden-design.com with your drawings or photos for a fixed quote."),
    ("Does interactive 3D content help SEO?",
     "It helps indirectly. A model keeps visitors engaged longer and earns links, but search engines and AI "
     "answer engines read text, not WebGL. That's why Snowden Design pairs every model with crawlable page "
     "copy, descriptive image alt text, FAQ content and schema markup, so the page around the model ranks "
     "and gets cited."),
]

# Alt text for the native Wix gallery (and the embed's figures)
ALTS = {
    "envelope": "Exploded 3D model of a hospital building envelope separating into roof, wall and foundation layers",
    "wall": "Exploded 3D wall assembly render showing steel frame, gypsum, air barrier, clips, insulation and metal cladding",
    "foundation": "Interactive 3D cutaway of a below-grade foundation wall with waterproofing, insulation and drainage layers",
    "bim": "BIM-style 3D building envelope section with 24 labeled components from footing to parapet",
}


def schema(image_urls=None):
    """One @graph tying page, case study, service and FAQ to the site-wide business and founder ids."""
    biz = {"@id": SITE + "/#business"}
    blake = {"@id": SITE + "/about#blake"}
    study = {
        "@type": "CreativeWork",
        "@id": URL + "#mongrain",
        "name": "Mongrain interactive 3D building envelope explorer",
        "description": ("Interactive 3D architectural visualization of a hospital building envelope for Mongrain, "
                        "with an assembly animation, exploded wall, roof and foundation details, a 24-component "
                        "BIM-style section and a six-section foundation systems page."),
        "creator": blake,
        "provider": biz,
        "about": {"@type": "Organization", "name": "Mongrain"},
        "genre": "3D architectural visualization",
        "keywords": ("3D architectural visualization, interactive 3D building model, exploded assembly animation, "
                     "BIM-style visualization, building envelope, Three.js, WebGL, Wix"),
        "dateCreated": "2026",
        "inLanguage": "en-US",
    }
    if image_urls:
        study["image"] = image_urls
    graph = [
        {
            "@type": "WebPage",
            "@id": URL + "#webpage",
            "url": URL,
            "name": TITLE,
            "description": DESCRIPTION,
            "isPartOf": {"@id": SITE + "/#website"},
            "about": {"@id": URL + "#service"},
            "mainEntity": {"@id": URL + "#mongrain"},
            "author": blake,
            "publisher": biz,
            "inLanguage": "en-US",
            "dateModified": "2026-10-25",
            "breadcrumb": {"@id": URL + "#breadcrumb"},
        },
        {
            "@type": "BreadcrumbList",
            "@id": URL + "#breadcrumb",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "3D Visualization", "item": URL},
            ],
        },
        {
            "@type": "Service",
            "@id": URL + "#service",
            "name": "3D architectural visualization",
            "serviceType": "3D modeling and interactive 3D visualization",
            "description": ("Interactive 3D building models, exploded assembly animations and BIM-style renders, "
                            "delivered as Wix-ready HTML with SEO and GEO copy and schema."),
            "provider": biz,
            "areaServed": [{"@type": "City", "name": "Denver"}, {"@type": "State", "name": "Colorado"},
                           {"@type": "Country", "name": "United States"}],
            "url": URL,
        },
        study,
        {
            "@type": "FAQPage",
            "@id": URL + "#faq",
            "mainEntity": [{"@type": "Question", "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ],
        },
    ]
    return {"@context": "https://schema.org", "@graph": graph}


def data_uri(name):
    return "data:image/webp;base64," + base64.b64encode((ASSETS / name).read_bytes()).decode()


def faq_html():
    out = []
    for i, (q, a) in enumerate(FAQ):
        opened = " open" if i == 0 else ""
        out.append(f'      <details class="sd-q sd-r"{opened}><summary><h3>{html.escape(q)}</h3><i aria-hidden="true"></i></summary>'
                   f'<p>{html.escape(a)}</p></details>')
    return "\n".join(out)


def build_embed():
    t = (SRC / "template.html").read_text()
    # Each render is inlined once; repeat uses copy its src at load to keep the file small
    for key, name in IMAGES.items():
        token = 'src="{{IMG:%s}}"' % key
        t = t.replace(token, 'src="%s" data-sd-img="%s"' % (data_uri(name), key), 1)
        t = t.replace(token, 'data-sd-copy="%s"' % key)
    t = t.replace("{{FAQ_HTML}}", faq_html())
    t = t.replace("{{JSONLD}}", json.dumps(schema(), indent=1, ensure_ascii=False).replace("</", "<\\/"))
    t = t.replace("{{MODEL_B64}}", base64.b64encode((ASSETS / MODEL).read_bytes()).decode())
    left = re.findall(r"\{\{[^}]+\}\}", t)
    assert not left, left
    return t


def build_preview(code, heights):
    p = (SRC / "preview-template.html").read_text()
    p = p.replace("{{B64}}", base64.b64encode(code.encode()).decode())
    p = p.replace("{{KB}}", str(round(len(code.encode()) / 1024)))
    for k, v in heights.items():
        p = p.replace("{{H_%s}}" % k, f"{v:,}")
    return p


def build_seo(heights):
    s = (SRC / "seo-template.md").read_text()
    faq_md = "\n\n".join(f"**{q}** (H3)\n\n{a}" for q, a in FAQ)
    alt_md = "\n".join(f"| `{IMAGES[k]}` | {ALTS[k]} |" for k in IMAGES)
    img_urls = [f"<Wix URL of {IMAGES[k]}>" for k in IMAGES]
    s = s.replace("{{TITLE}}", TITLE).replace("{{DESCRIPTION}}", DESCRIPTION).replace("{{URL}}", URL)
    s = s.replace("{{FAQ_MD}}", faq_md).replace("{{ALT_TABLE}}", alt_md)
    s = s.replace("{{JSONLD}}", json.dumps(schema(img_urls), indent=2, ensure_ascii=False))
    for k, v in heights.items():
        s = s.replace("{{H_%s}}" % k, f"{v:,}")
    return s


if __name__ == "__main__":
    heights = json.loads((SRC / "heights.json").read_text())
    code = build_embed()
    (PAGE / "snowden-3d-visualization.html").write_text(code)
    (PAGE / "preview.html").write_text(build_preview(code, heights))
    (PAGE / "SEO.md").write_text(build_seo(heights))
    print("embed", round(len(code.encode()) / 1024), "KB; title", len(TITLE), "chars; description", len(DESCRIPTION), "chars")
    for q, a in FAQ:
        print(len(a.split()), "words:", q)
