import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { ProjectedPoint } from './useDetailInteractions';

/** Model-specific anchors stay in the scene; only their screen conversion is shared. */
export function useLayerProjection(count: number) {
  const points = useRef<ProjectedPoint[]>(Array.from({ length: count }, () => ({ x: 0, y: 0 })));
  const vector = useMemo(() => new THREE.Vector3(), []);
  const projectLayer = (
    index: number,
    group: THREE.Group,
    anchor: readonly [number, number, number],
    camera: THREE.Camera,
    size: { width: number; height: number },
  ) => {
    vector.set(...anchor);
    group.localToWorld(vector);
    vector.project(camera);
    points.current[index].x = ((vector.x + 1) / 2) * size.width;
    points.current[index].y = ((1 - vector.y) / 2) * size.height;
  };
  return { points, projectLayer };
}
