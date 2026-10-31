export type Pt = [number, number];
export type Zone = 'roof' | 'walls' | 'foundation';

export interface Volume {
  id: string;
  kind: 'tower' | 'podium' | 'pavilion';
  poly: Pt[];
  base: number;
  height: number;
  court?: Pt[];
}

export const PODIUM_H = 9.5;
const FL = 3.4;

/** Simplified massing, metres. x = along the long axis, z = towards the visitor. */
export const VOLUMES: Volume[] = [
  {
    id: 'podium',
    kind: 'podium',
    poly: [[-46, -18], [74, -18], [74, 12], [-46, 12]],
    base: 0,
    height: PODIUM_H,
    court: [[-38, -8], [-16, -8], [-16, 4], [-38, 4]],
  },
  {
    id: 'tower-west',
    kind: 'tower',
    poly: [[0, -6.3], [14, -6.3], [14, 8.4], [0, 8.4]],
    base: PODIUM_H,
    height: FL * 10,
  },
  {
    id: 'tower',
    kind: 'tower',
    poly: [[14, -6.3], [40, -7.6], [60, -7.6], [74, -5], [74, 7], [60, 10], [40, 10], [14, 8.4]],
    base: PODIUM_H,
    height: FL * 11,
  },
  {
    id: 'wing-a',
    kind: 'tower',
    poly: [[4, -17], [22, -17], [22, -7], [4, -7]],
    base: PODIUM_H,
    height: FL * 11,
  },
  {
    id: 'wing-b',
    kind: 'tower',
    poly: [[50, -17], [70, -17], [70, -6], [50, -6]],
    base: PODIUM_H,
    height: FL * 11,
  },
  {
    id: 'rear-mid',
    kind: 'tower',
    poly: [[28, -14], [42, -14], [42, -7.6], [28, -7.6]],
    base: PODIUM_H,
    height: FL * 4,
  },
  {
    id: 'link',
    kind: 'podium',
    poly: [[30, 12], [44, 12], [44, 16.5], [30, 16.5]],
    base: 0,
    height: 6.5,
  },
  {
    id: 'pav-a1',
    kind: 'pavilion',
    poly: [[22, 16], [60, 16], [60, 38], [22, 38]],
    base: 0,
    height: 16.5,
  },
  {
    id: 'pav-a2',
    kind: 'pavilion',
    poly: [[60, 16], [102, 10], [102, 28], [60, 38]],
    base: 0,
    height: 16.5,
  },
];

export interface RoofItem {
  kind: 'mech' | 'glass' | 'stack' | 'strip';
  c: [number, number, number];
  s: [number, number, number];
}

const TOWER_TOP = PODIUM_H + FL * 11 + 0.5;
const WEST_TOP = PODIUM_H + FL * 10 + 0.5;
const PAV_TOP = 16.5 + 0.5;

export const ROOF_ITEMS: RoofItem[] = [
  { kind: 'mech', c: [26, TOWER_TOP + 2.3, 1], s: [14, 4.6, 8] },
  { kind: 'mech', c: [52, TOWER_TOP + 1.6, 1.2], s: [12, 3.2, 10] },
  { kind: 'mech', c: [36, TOWER_TOP + 0.9, 1], s: [6, 1.8, 6] },
  { kind: 'mech', c: [7, WEST_TOP + 1.2, 1], s: [8, 2.4, 8] },
  { kind: 'stack', c: [70, TOWER_TOP + 4, -1], s: [0.8, 8, 0.8] },
  { kind: 'stack', c: [67.5, TOWER_TOP + 2.6, -2.6], s: [0.6, 5.2, 0.6] },
  { kind: 'mech', c: [13, TOWER_TOP + 0.9, -12], s: [6, 1.8, 4] },
  { kind: 'mech', c: [60, TOWER_TOP + 0.9, -12], s: [7, 1.8, 4] },
  { kind: 'mech', c: [35, PODIUM_H + FL * 4 + 0.5 + 0.8, -11], s: [6, 1.6, 3] },
  { kind: 'mech', c: [-6, PODIUM_H + 0.5 + 1, -13], s: [8, 2, 4] },
  { kind: 'mech', c: [-30, PODIUM_H + 0.5 + 0.9, 8], s: [6, 1.8, 3] },
  { kind: 'glass', c: [45, PAV_TOP + 0.5, 29], s: [15, 1, 3.4] },
  { kind: 'strip', c: [88, PAV_TOP + 0.2, 19], s: [15, 0.4, 0.9] },
];

export interface ZoneInfo {
  id: Zone;
  order: number;
  label: string;
  tag: string;
  summary: string;
  parts: string[];
}

export const ZONES: ZoneInfo[] = [
  {
    id: 'roof',
    order: 3,
    label: 'Roof',
    tag: 'Top enclosure',
    summary:
      'A continuous protective enclosure above the building: the deck supports the insulation and waterproofing, with careful transitions at roof edges and openings.',
    parts: ['Corrugated steel deck', 'Air / vapour control layer', 'Staggered rigid insulation', 'TPO waterproofing above the insulation'],
  },
  {
    id: 'walls',
    order: 2,
    label: 'Walls',
    tag: 'Vertical enclosure',
    summary:
      'A layered enclosure that manages air, moisture and heat behind the visible façade. Cladding and glazing form the exterior finish; the protective layers work together beneath it.',
    parts: ['Structure and exterior sheathing', 'Air barrier and insulation', 'Thermal clips and support rails', 'Exterior cladding and glazing'],
  },
  {
    id: 'foundation',
    order: 1,
    label: 'Foundation',
    tag: 'Base and anchorage',
    summary:
      'Protection begins below grade. Structural support, waterproofing, insulation and drainage work together at the base of the building.',
    parts: ['Footings, slabs and structural support', 'Below-grade waterproofing', 'Foundation insulation', 'Drainage and protective layers'],
  },
];

export function signedArea(p: Pt[]): number {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, z1] = p[i];
    const [x2, z2] = p[(i + 1) % p.length];
    a += x1 * z2 - x2 * z1;
  }
  return a / 2;
}

/** Positive d insets the polygon, negative d grows it. */
export function offsetPoly(poly: Pt[], d: number): Pt[] {
  const p = signedArea(poly) < 0 ? [...poly].reverse() : poly;
  const n = p.length;
  const lines = p.map((a, i) => {
    const b = p[(i + 1) % n];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const L = Math.hypot(dx, dz);
    const nx = -dz / L;
    const nz = dx / L;
    return { px: a[0] + nx * d, pz: a[1] + nz * d, dx: dx / L, dz: dz / L };
  });
  return p.map((_, i) => {
    const l1 = lines[(i - 1 + n) % n];
    const l2 = lines[i];
    const cross = l1.dx * l2.dz - l1.dz * l2.dx;
    if (Math.abs(cross) < 1e-6) return [l2.px, l2.pz] as Pt;
    const t = ((l2.px - l1.px) * l2.dz - (l2.pz - l1.pz) * l2.dx) / cross;
    return [l1.px + l1.dx * t, l1.pz + l1.dz * t] as Pt;
  });
}

export function insidePoly(pt: Pt, poly: Pt[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > pt[1] !== zj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}
