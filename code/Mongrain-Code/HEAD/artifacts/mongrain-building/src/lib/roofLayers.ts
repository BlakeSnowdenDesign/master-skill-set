export interface RoofLayer {
  n: number;
  id: string;
  name: string;
  material: string;
  role: string;
  /** guided assembly narration for this step */
  guide: string;
  note?: string;
  /** anchor in the layer's local space, on a camera-visible exposed edge */
  anchor: [number, number, number];
}

export const ROOF_COUNT = 4;

export const ROOF_NOTICE = 'Illustrative conventional roof. Not verified hospital construction. Thicknesses exaggerated.';

/** Structure to exterior, conventional roof: waterproofing sits ABOVE the insulation. */
export const ROOF_LAYERS: RoofLayer[] = [
  {
    n: 1,
    id: 'deck',
    name: 'Structural steel deck',
    material: 'Corrugated steel roof deck',
    role: 'Spans between structural supports and gives every layer above a firm, continuous base.',
    guide: 'First, the corrugated steel deck spans the structure and carries the roof loads.',
    anchor: [2.06, 0.165, 2.2],
  },
  {
    n: 2,
    id: 'vapour',
    name: 'Air / vapour control layer',
    material: 'Thin sheet membrane over the deck',
    role: 'Sits on the warm side of the insulation to stop indoor air and moisture from reaching colder layers above.',
    guide: 'Next, the air and vapour control layer is laid over the deck, on the warm side.',
    anchor: [-1.5, 0, 2.2],
  },
  {
    n: 3,
    id: 'insulation',
    name: 'Rigid polyiso insulation',
    material: 'Rigid polyisocyanurate boards in staggered courses',
    role: 'Continuous thermal resistance above the deck. Board joints are staggered between courses so heat has no straight path through.',
    guide: 'Then rigid polyisocyanurate boards go down in staggered courses, so joints never line up.',
    anchor: [0.5, -0.15, 2.2],
  },
  {
    n: 4,
    id: 'membrane',
    name: 'TPO waterproofing membrane',
    material: 'Generic fully adhered TPO sheets with joined seams',
    role: 'The watertight skin goes on top of the insulation, so rain stays outside everything below. Sheets are joined at the seams.',
    guide: 'Finally the waterproofing goes above the insulation: fully adhered TPO sheets, joined at seams.',
    anchor: [0.75, 0, 2.2],
  },
];
