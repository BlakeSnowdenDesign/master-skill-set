export interface FoundationLayer {
  n: number;
  id: string;
  name: string;
  material: string;
  role: string;
}

/** Interior to exterior. Illustrative assembly. Drainage void is not a layer. */
export const FOUNDATION_LAYERS: FoundationLayer[] = [
  { n: 1, id: 'structure', name: 'Structural support', material: 'Reinforced concrete footing and foundation wall', role: 'Carries building loads into the ground and forms the wall every protective layer is applied against.' },
  { n: 2, id: 'waterproofing', name: 'Waterproofing', material: 'Below-grade membrane, sheet or fluid applied', role: 'Forms the continuous barrier that keeps groundwater and moisture out of the concrete and the interior.' },
  { n: 3, id: 'insulation', name: 'Insulation', material: 'Rigid moisture-resistant foundation insulation boards', role: 'Limits heat loss through the foundation wall and protects the membrane from temperature swings.' },
  { n: 4, id: 'drainage', name: 'Drainage board', material: 'Studded or dimpled drainage composite', role: 'The solid studs hold the filter fabric off the insulation, keeping a clear vertical path open for water. The path itself is the void, not this layer.' },
  { n: 5, id: 'filter', name: 'Filter fabric', material: 'Non-woven geotextile', role: 'Lets water through to the drainage path while keeping soil fines from clogging it.' },
];
