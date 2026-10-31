export type SubGradeId = 'soil' | 'footing' | 'wall' | 'membrane' | 'insulation' | 'drainage';

export interface SubGradeLayer {
  id: SubGradeId;
  step: string;
  title: string;
  body: string;
  /** Longer copy for the 3D model's step list. */
  detail: string;
  /** Face colours for the isometric drawing and the 3D model: top, front, side. */
  top: string;
  front: string;
  side: string;
  stroke: string;
}

/**
 * Sub-grade assembly, built from Mongrain's foundation diagram (repo Foundations/).
 * Kept out until Mongrain confirms them: the membrane thickness and the
 * "Berlin Wall/Blindside" name from the original diagram.
 */
export const SUB_GRADE_LAYERS: SubGradeLayer[] = [
  { id: 'soil', step: '00', title: 'Excavation', body: 'Earth cut and retained soil at sub-grade', detail: 'The cut and the retained soil set the working space. Every layer that follows is built against this face.', top: '#ecebe7', front: '#e3e1db', side: '#d7d4cc', stroke: '#566a6e' },
  { id: 'footing', step: '01', title: 'Conventional footing', body: 'Cast-in-place concrete with tieback locations marked', detail: "Cast-in-place concrete spreads the wall's load into the ground. Tieback locations are marked before the wall goes up.", top: '#d9dcdc', front: '#c2c7c8', side: '#b1b8ba', stroke: '#4d6165' },
  { id: 'wall', step: '02', title: 'Shoring wall / blindside', body: 'Shotcrete retaining wall with a pre-applied HDPE composite or bentonite panel', detail: 'A shotcrete retaining wall holds the soil back, faced with a pre-applied HDPE composite or bentonite panel.', top: '#dcdfdf', front: '#c6cbcc', side: '#d2d7d8', stroke: '#4d6165' },
  { id: 'membrane', step: '03', title: 'Membrane assembly', body: 'Hot-applied, torch-applied or cold spray-applied coating', detail: 'A continuous hot-applied, torch-applied or cold spray-applied coating keeps groundwater away from the concrete.', top: '#4fc6d8', front: '#087c91', side: '#11a8be', stroke: '#05576a' },
  { id: 'insulation', step: '04', title: 'Protection & insulation', body: 'Rigid EPS or XPS foam adhered over the membrane', detail: 'Rigid EPS or XPS boards are adhered over the membrane. They shield it during backfill and limit heat loss through the wall.', top: '#f1dcab', front: '#c9a45e', side: '#e2c27f', stroke: '#8a6a2c' },
  { id: 'drainage', step: '05', title: 'Drainage', body: 'Dimple mat composite directing water to perimeter drains', detail: 'A dimple mat composite keeps a clear path open so water runs down the wall to the perimeter drains.', top: '#d7dde0', front: '#9fadb2', side: '#c3ccd0', stroke: '#566a6e' },
];

export const subGradeLayer = (id: SubGradeId) => SUB_GRADE_LAYERS.find((layer) => layer.id === id)!;
