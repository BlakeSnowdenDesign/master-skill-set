#!/usr/bin/env python3
"""Build a lightweight, named-node GLB study of the WoodTek HQ references.

No third-party packages are required. Dimensions are illustrative proportions
derived from the supplied photographs, floor plans and building section.
"""
from __future__ import annotations

import json
import math
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "woodtek-hq.glb"

materials = [
    {"name": "Concrete • warm grey", "pbrMetallicRoughness": {"baseColorFactor": [0.59, 0.62, 0.61, 1], "metallicFactor": 0.04, "roughnessFactor": 0.92}},
    {"name": "Oxidized amber cladding", "pbrMetallicRoughness": {"baseColorFactor": [0.72, 0.39, 0.075, 1], "metallicFactor": 0.34, "roughnessFactor": 0.64}},
    {"name": "Dark bronze cladding", "pbrMetallicRoughness": {"baseColorFactor": [0.18, 0.16, 0.135, 1], "metallicFactor": 0.45, "roughnessFactor": 0.54}},
    {"name": "Warm soffit timber", "pbrMetallicRoughness": {"baseColorFactor": [0.39, 0.25, 0.13, 1], "metallicFactor": 0, "roughnessFactor": 0.88}},
    {"name": "Charcoal window frame", "pbrMetallicRoughness": {"baseColorFactor": [0.075, 0.09, 0.095, 1], "metallicFactor": 0.62, "roughnessFactor": 0.32}},
    {"name": "Blue grey glazing", "pbrMetallicRoughness": {"baseColorFactor": [0.40, 0.62, 0.68, 0.46], "metallicFactor": 0.12, "roughnessFactor": 0.16}, "alphaMode": "BLEND", "doubleSided": True},
    {"name": "Site • pale stone", "pbrMetallicRoughness": {"baseColorFactor": [0.72, 0.71, 0.66, 1], "metallicFactor": 0, "roughnessFactor": 1}},
    {"name": "Interior shadow", "pbrMetallicRoughness": {"baseColorFactor": [0.095, 0.09, 0.075, 1], "metallicFactor": 0.04, "roughnessFactor": 0.96}},
]
MAT = {"concrete": 0, "amber": 1, "bronze": 2, "wood": 3, "frame": 4, "glass": 5, "site": 6, "shadow": 7}

# Scene nodes are intentionally split into stable, semantic groups. GLTF is Y-up;
# +Z is the photographed street/front elevation. Coordinates use metres.
nodes: list[dict] = []
groups: list[dict] = []
meshes: list[dict] = []
mesh_for_material: dict[int, int] = {}
accessors: list[dict] = []
buffer_views: list[dict] = []
binary = bytearray()


def add_accessor(data: bytes, component: int, count: int, kind: str, target: int, minimum=None, maximum=None):
    while len(binary) % 4:
        binary.append(0)
    offset = len(binary)
    binary.extend(data)
    view_index = len(buffer_views)
    buffer_views.append({"buffer": 0, "byteOffset": offset, "byteLength": len(data), "target": target})
    accessor = {"bufferView": view_index, "componentType": component, "count": count, "type": kind}
    if minimum is not None:
        accessor["min"] = minimum
    if maximum is not None:
        accessor["max"] = maximum
    accessors.append(accessor)
    return len(accessors) - 1


def cube_mesh(material_index: int):
    if material_index in mesh_for_material:
        return mesh_for_material[material_index]
    # Face-separated vertices preserve flat normals on the box edges.
    faces = [
        ((1, 0, 0), [(1,-1,-1),(1,1,-1),(1,1,1),(1,-1,1)]),
        ((-1, 0, 0), [(-1,-1,1),(-1,1,1),(-1,1,-1),(-1,-1,-1)]),
        ((0, 1, 0), [(-1,1,-1),(-1,1,1),(1,1,1),(1,1,-1)]),
        ((0, -1, 0), [(-1,-1,1),(-1,-1,-1),(1,-1,-1),(1,-1,1)]),
        ((0, 0, 1), [(1,-1,1),(1,1,1),(-1,1,1),(-1,-1,1)]),
        ((0, 0, -1), [(-1,-1,-1),(-1,1,-1),(1,1,-1),(1,-1,-1)]),
    ]
    positions, normals, indices = [], [], []
    for normal, quad in faces:
        start = len(positions) // 3
        for vertex in quad:
            positions.extend(vertex)
            normals.extend(normal)
        indices.extend([start, start+1, start+2, start, start+2, start+3])
    pos = struct.pack("<" + "f" * len(positions), *positions)
    nor = struct.pack("<" + "f" * len(normals), *normals)
    idx = struct.pack("<" + "H" * len(indices), *indices)
    p = add_accessor(pos, 5126, 24, "VEC3", 34962, [-1,-1,-1], [1,1,1])
    n = add_accessor(nor, 5126, 24, "VEC3", 34962)
    ix = add_accessor(idx, 5123, 36, "SCALAR", 34963, [0], [23])
    meshes.append({"name": f"Box • {materials[material_index]['name']}", "primitives": [{"attributes": {"POSITION": p, "NORMAL": n}, "indices": ix, "material": material_index, "mode": 4}]})
    mesh_for_material[material_index] = len(meshes) - 1
    return len(meshes) - 1


def group(name: str, y: float = 0.0):
    groups.append({"name": name, "translation": [0, y, 0], "children": []})
    return len(groups) - 1


def box(parent: int, name: str, size: tuple[float,float,float], pos: tuple[float,float,float], mat: str):
    # The reusable cube spans -1..+1, so GLTF node scale is each half-extent.
    node = {"name": name, "mesh": cube_mesh(MAT[mat]), "translation": list(pos), "scale": [v / 2 for v in size]}
    nodes.append(node)
    groups[parent]["children"].append(len(nodes) - 1)


def slab(parent, node_name, y, thickness=0.22, width=6.35, depth=12.2, mat="concrete"):
    box(parent, node_name, (width, thickness, depth), (0, y, -0.1), mat)


def facade_floor(level: int, parent: int):
    h = 2.82
    # Back and side wall planes keep the building legible without closing the
    # front elevation, where the balconies and glazing are the main feature.
    box(parent, f"A-SIDEWALL-L{level:02d}-WEST", (0.20,h,11.85), (-3.08, h/2+0.28, -0.18), "bronze")
    box(parent, f"A-SIDEWALL-L{level:02d}-EAST", (0.20,h,11.85), (3.08, h/2+0.28, -0.18), "amber")
    box(parent, f"A-REARWALL-L{level:02d}", (6.15,h,0.22), (0,h/2+0.28,-5.98), "bronze")
    if level == 0:
        # Ground floor display frontage: glazing with a slim amber canopy band.
        box(parent, "A-GROUND-PIER-L00-W", (0.78,2.28,0.30), (-2.65,1.34,5.88), "amber")
        box(parent, "A-GROUND-PIER-L00-E", (0.78,2.28,0.30), (2.65,1.34,5.88), "amber")
        box(parent, "A-DISPLAY-HEAD-L00", (4.62,0.34,0.36), (0,2.55,5.88), "amber")
        box(parent, "G-DISPLAY-GLASS-L00", (4.42,2.0,0.075), (0,1.32,5.70), "glass")
        for x in (-2.20,-0.74,0.74,2.20):
            box(parent, f"G-DISPLAY-MULLION-L00-{x:+.2f}", (0.045,2.06,0.10), (x,1.32,5.72), "frame")
        box(parent, "G-ENTRY-DOOR-L00", (0.98,2.12,0.085), (0.92,1.27,5.76), "glass")
        box(parent, "A-GROUND-SILL-L00", (4.55,0.10,0.38), (0,0.30,5.88), "bronze")
    elif level == 1:
        # Broad upper window, framed within a solid amber façade volume.
        box(parent, "A-FRONT-PIER-L01-W", (1.15,2.10,0.32), (-2.38,1.48,5.88), "amber")
        box(parent, "A-FRONT-PIER-L01-E", (1.15,2.10,0.32), (2.38,1.48,5.88), "amber")
        box(parent, "A-FRONT-HEAD-L01", (3.75,0.40,0.34), (0,2.55,5.88), "amber")
        box(parent, "G-FRONT-WINDOW-L01", (3.68,1.62,0.07), (0,1.45,5.69), "glass")
        for x in (-1.22,0,1.22):
            box(parent, f"G-MULLION-L01-{x:+.2f}", (0.045,1.68,0.10), (x,1.45,5.72), "frame")
    else:
        # Recessed balcony set into a deep projecting amber portal.
        box(parent, f"A-PORTAL-L{level:02d}-WEST", (0.88,2.52,0.64), (-2.70,1.58,5.92), "amber")
        box(parent, f"A-PORTAL-L{level:02d}-EAST", (0.88,2.52,0.64), (2.70,1.58,5.92), "amber")
        box(parent, f"A-PORTAL-L{level:02d}-HEAD", (5.20,0.40,0.64), (0,2.82,5.92), "amber")
        box(parent, f"A-BALCONY-SLAB-L{level:02d}", (5.25,0.24,1.44), (0,0.34,6.35), "concrete")
        box(parent, f"A-BALCONY-SOFFIT-L{level:02d}", (4.90,0.07,1.31), (0,2.58,6.30), "wood")
        box(parent, f"G-BALCONY-DOOR-L{level:02d}", (3.25,2.08,0.07), (0,1.51,5.71), "glass")
        for x in (-1.08,0,1.08):
            box(parent, f"G-BALCONY-MULLION-L{level:02d}-{x:+.2f}", (0.045,2.14,0.10), (x,1.51,5.73), "frame")
        # Glass guard and metal top rail, all named independently for selection.
        box(parent, f"G-GUARD-L{level:02d}", (4.96,0.86,0.055), (0,0.98,7.02), "glass")
        box(parent, f"A-HANDRAIL-L{level:02d}", (5.03,0.055,0.085), (0,1.43,7.02), "frame")
        for x in (-2.38,-1.20,0,1.20,2.38):
            box(parent, f"A-RAIL-POST-L{level:02d}-{x:+.2f}", (0.04,0.82,0.07), (x,1.38,7.02), "frame")

    # A shaded underside and an amber fascia continue the stacked-frame motif.
    box(parent, f"A-SOFFIT-L{level:02d}", (6.12,0.10,1.36), (0,0.36,6.06), "wood")


# Context: stepped site apron and a restrained retaining edge based on section.
site = group("C-SITE-CONTEXT")
box(site, "C-SITE-STRIP-WEST", (1.85,0.16,17.0), (-4.12,-0.10,-1.15), "site")
box(site, "C-SITE-STRIP-EAST", (1.85,0.16,17.0), (4.12,-0.10,-1.15), "site")
box(site, "C-ENTRY-APRON", (10.1,0.16,2.0), (0,-0.10,7.10), "site")
box(site, "C-RETAINING-WALL-REAR", (9.6,1.0,0.28), (0,0.30,-8.0), "concrete")
box(site, "C-RETAINING-WALL-EAST", (0.28,0.76,8.2), (4.75,0.22,-3.0), "concrete")

# Basement below grade (the section shows a lower level and stepped foundation).
basement = group("S-BASEMENT", -2.75)
box(basement, "S-BASEMENT-RAFT", (6.45,0.34,12.35), (0,-1.44,-0.10), "concrete")
box(basement, "S-BASEMENT-WALL-WEST", (0.30,2.65,12.05), (-3.05,-0.08,-0.10), "concrete")
box(basement, "S-BASEMENT-WALL-EAST", (0.30,2.65,12.05), (3.05,-0.08,-0.10), "concrete")
box(basement, "S-BASEMENT-WALL-REAR", (6.20,2.65,0.30), (0,-0.08,-6.0), "concrete")
box(basement, "S-BASEMENT-WALL-FRONT", (6.20,2.65,0.30), (0,-0.08,5.82), "concrete")
box(basement, "S-BASEMENT-CORE", (1.15,2.55,1.45), (1.65,-0.05,-2.1), "concrete")
box(basement, "A-BASEMENT-ENTRY-SHADOW", (2.25,1.38,0.08), (0,-0.05,5.64), "shadow")

# Four above-grade levels from the section. Each level is independently movable.
floor_groups = []
for level in range(4):
    y = level * 3.12
    g = group(f"S-LEVEL-{level:02d}", y)
    floor_groups.append(g)
    slab(g, f"S-FLOOR-SLAB-L{level:02d}", 0.18, width=6.42, depth=12.3)
    for x in (-2.76, 2.76):
        box(g, f"S-COLUMN-L{level:02d}-{x:+.2f}", (0.24,2.82,0.24), (x,1.67,-4.7), "concrete")
    facade_floor(level, g)

# Roof deck and stair/elevator penthouse, shown as its own group for a clean pull-apart.
roof = group("A-ROOF-PENTHOUSE", 12.48)
slab(roof, "S-ROOF-DECK", 0.12, width=6.55, depth=12.5)
box(roof, "A-ROOF-PARAPET-FRONT", (6.35,0.92,0.20), (0,0.62,6.05), "amber")
box(roof, "A-ROOF-PARAPET-WEST", (0.20,0.92,12.0), (-3.12,0.62,0), "bronze")
box(roof, "A-ROOF-PARAPET-EAST", (0.20,0.92,12.0), (3.12,0.62,0), "amber")
box(roof, "A-PENTHOUSE-VOLUME", (2.7,2.20,3.15), (0.45,1.72,-2.55), "amber")
box(roof, "A-PENTHOUSE-REAR-CLADDING", (2.4,1.95,0.10), (0.45,1.65,-4.18), "bronze")
box(roof, "G-PENTHOUSE-DOOR", (0.82,1.88,0.08), (0.20,1.62,-0.94), "glass")
box(roof, "A-ROOF-COPING", (6.72,0.11,12.7), (0,1.13,-0.1), "frame")

# Convert Python group indices into final GLTF node indices after all mesh nodes exist.
gltf_nodes = []
offset = len(groups)
for idx, g in enumerate(groups):
    children = [offset + c for c in g["children"]]
    gltf_nodes.append({"name": g["name"], "translation": g["translation"], "children": children})
gltf_nodes.extend(nodes)

while len(binary) % 4:
    binary.append(0)
json_doc = {
    "asset": {"version": "2.0", "generator": "WoodTek HQ illustrative GLB builder"},
    "scene": 0,
    "scenes": [{"name": "WoodTek HQ • architectural massing study", "nodes": list(range(len(groups)))}],
    "nodes": gltf_nodes,
    "meshes": meshes,
    "materials": materials,
    "accessors": accessors,
    "bufferViews": buffer_views,
    "buffers": [{"byteLength": len(binary)}],
}
json_bytes = json.dumps(json_doc, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
json_bytes += b" " * ((4 - len(json_bytes) % 4) % 4)
bin_bytes = bytes(binary)
total = 12 + 8 + len(json_bytes) + 8 + len(bin_bytes)
OUT.write_bytes(struct.pack("<4sII", b"glTF", 2, total) + struct.pack("<I4s", len(json_bytes), b"JSON") + json_bytes + struct.pack("<I4s", len(bin_bytes), b"BIN\x00") + bin_bytes)
print(f"Wrote {OUT} ({OUT.stat().st_size:,} bytes); {len(gltf_nodes)} nodes, {len(meshes)} material meshes")
