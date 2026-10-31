export interface WallLayer {
  n: number;
  id: string;
  name: string;
  material: string;
  role: string;
  /** anchor point in the layer's local space, for the leader line */
  anchor: [number, number, number];
}

/** Interior to exterior. Illustrative assembly. */
export const WALL_LAYERS: WallLayer[] = [
  {
    n: 1,
    id: 'frame',
    name: 'Steel frame',
    material: 'Light-gauge galvanized steel studs and tracks',
    role: 'Carries the wall loads back to the primary structure and gives every layer outside it a straight, stable plane to attach to.',
    anchor: [-1.4, 1.3, 0.1],
  },
  {
    n: 2,
    id: 'gypsum',
    name: 'Exterior gypsum',
    material: 'Glass-mat exterior gypsum sheathing',
    role: 'A rigid, moisture-tolerant substrate that stiffens the frame and receives the air barrier.',
    anchor: [-1.7, 0.7, 0.06],
  },
  {
    n: 3,
    id: 'barrier',
    name: 'Air barrier',
    material: 'Sheet-applied vapour-permeable membrane',
    role: 'Stops uncontrolled air leakage and keeps bulk water out, so insulation can perform as intended.',
    anchor: [-1.7, 0.2, 0.01],
  },
  {
    n: 4,
    id: 'clips',
    name: 'Thermal clips',
    material: 'Low-conductivity bracket clips with fasteners',
    role: 'Hold the exterior rails off the structure while limiting heat flow through the insulation layer.',
    anchor: [-1.2, 0, 0.08],
  },
  {
    n: 5,
    id: 'insulation',
    name: 'Insulation',
    material: 'Semi-rigid mineral wool boards',
    role: 'Slows heat transfer, adds acoustic absorption and resists fire. Fitted tightly between the clips.',
    anchor: [-1.6, -0.6, 0.25],
  },
  {
    n: 6,
    id: 'omega',
    name: 'Omega bar',
    material: 'Formed galvanized steel hat channels',
    role: 'Vertical rails fixed to the clips. They carry the cladding and keep a drained, ventilated gap behind it.',
    anchor: [-1.2, -1.1, 0.06],
  },
  {
    n: 7,
    id: 'cladding',
    name: 'Metal cladding',
    material: 'Pre-finished aluminum or steel panels',
    role: 'The visible skin. It sheds rain and sun, and sets the colour, joints and character of the facade.',
    anchor: [-1.7, 0.9, 0.02],
  },
];
