import * as THREE from 'three';
import { VOLUMES, type Zone } from '@/lib/spec';

export type PulloutKind = 'roof' | 'foundation';

/** Mutable state shared between Scene (owner of timing) and RoofFoundationPullout (renderer). */
export interface PulloutState {
  kind: PulloutKind | null;
  /** 0 = layers seated in the building, 1 = fully separated */
  p: number;
  origin: THREE.Vector3;
}

export const makePulloutState = (): PulloutState => ({ kind: null, p: 0, origin: new THREE.Vector3() });

export const isPulloutZone = (z: Zone): z is PulloutKind => z === 'roof' || z === 'foundation';

/** Visible real locations on Pavilion A (front block pav-a1, front edge z = 38). Local to each zone group. */
const pavilion = VOLUMES.find((v) => v.id === 'pav-a1')!;
// The visible envelope deck extends 0.5 above the volume's structural top.
const ROOF_LOCAL = new THREE.Vector3(31, pavilion.base + pavilion.height + 0.5, 27);
const FOUNDATION_LOCAL = new THREE.Vector3(41, -1.6, 37.6);

export function pulloutOrigin(kind: PulloutKind, groupY: number, out = new THREE.Vector3()) {
  return out.copy(kind === 'roof' ? ROOF_LOCAL : FOUNDATION_LOCAL).add(new THREE.Vector3(0, groupY, 0));
}

/** Camera pose for a zone: roof from above-front, foundation from slightly above and to the side. */
export function pulloutCamera(kind: PulloutKind, origin: THREE.Vector3, aspect: number) {
  const fit = aspect < 0.8 ? 1.9 : aspect < 1.2 ? 1.4 : 1;
  if (kind === 'roof') {
    const tgt = origin.clone().add(new THREE.Vector3(0, 8, 0));
    return { tgt, pos: tgt.clone().add(new THREE.Vector3(22, 30, 58).multiplyScalar(fit)) };
  }
  const tgt = origin.clone().add(new THREE.Vector3(0, 0, 6));
  return { tgt, pos: tgt.clone().add(new THREE.Vector3(26, 15, 54).multiplyScalar(fit)) };
}

/** Roof/foundation separation duration; the existing wall keeps its original timing. */
export const PULLOUT_PULL_SECONDS = 1.6;
