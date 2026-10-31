import { forwardRef, useMemo, type ReactNode } from 'react';
import * as THREE from 'three';

export const WALL_W = 3.4;
export const WALL_H = 4.4;

function noiseTex(base: [number, number, number], vary: number, streak = false) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const img = g.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    const row = streak ? (Math.random() - 0.5) * vary * 0.8 : 0;
    for (let x = 0; x < 128; x++) {
      const v = (Math.random() - 0.5) * vary + row;
      const i = (y * 128 + x) * 4;
      img.data[i] = base[0] + v;
      img.data[i + 1] = base[1] + v;
      img.data[i + 2] = base[2] + v * 0.8;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 4);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function makeWallMaterials(): THREE.MeshStandardMaterial[] {
  const std = (o: THREE.MeshStandardMaterialParameters) => {
    const m = new THREE.MeshStandardMaterial(o);
    m.emissive = new THREE.Color('#12b5d1');
    m.emissiveIntensity = 0;
    return m;
  };
  return [
    std({ color: '#b9c0c4', metalness: 0.85, roughness: 0.38 }),
    std({ map: noiseTex([150, 156, 150], 40), color: '#ffffff', roughness: 0.95 }),
    std({ color: '#f1f3f2', roughness: 0.55 }),
    std({ color: '#d4d9dc', metalness: 0.9, roughness: 0.25 }),
    std({ map: noiseTex([206, 168, 82], 70, true), color: '#ffffff', roughness: 1 }),
    std({ color: '#8d979d', metalness: 0.8, roughness: 0.45 }),
    std({ color: '#2c3439', metalness: 0.75, roughness: 0.32 }),
  ];
}

type V3 = [number, number, number];
function Box({ s, p, m }: { s: V3; p: V3; m: THREE.Material }) {
  return (
    <mesh position={p} material={m} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

const XS = [-1.4, -0.7, 0, 0.7, 1.4];
const HT = WALL_H - 0.16;

export interface LayerGroupProps {
  mat: THREE.Material;
  index: number;
  onPick(i: number): void;
}

function layerBody(i: number, m: THREE.Material): ReactNode {
  const W = WALL_W;
  const H = WALL_H;
  switch (i) {
    case 0:
      return (
        <>
          <Box s={[W, 0.08, 0.3]} p={[0, H / 2 - 0.04, 0]} m={m} />
          <Box s={[W, 0.08, 0.3]} p={[0, -H / 2 + 0.04, 0]} m={m} />
          {XS.map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <Box s={[0.3, HT, 0.03]} p={[0, 0, -0.135]} m={m} />
              <Box s={[0.03, HT, 0.3]} p={[-0.135, 0, 0]} m={m} />
              <Box s={[0.03, HT, 0.3]} p={[0.135, 0, 0]} m={m} />
            </group>
          ))}
        </>
      );
    case 1:
      return <Box s={[W + 0.1, H + 0.1, 0.12]} p={[0, 0, 0]} m={m} />;
    case 2:
      return <Box s={[W + 0.1, H + 0.1, 0.02]} p={[0, 0, 0]} m={m} />;
    case 3:
      return (
        <>
          {[-1.2, 0, 1.2].flatMap((x) =>
            [-1.4, 0, 1.4].map((y) => (
              <group key={`${x}${y}`} position={[x, y, 0]}>
                <Box s={[0.3, 0.42, 0.03]} p={[0, 0, -0.065]} m={m} />
                <Box s={[0.3, 0.03, 0.16]} p={[0, 0.1, 0.01]} m={m} />
                <Box s={[0.3, 0.03, 0.16]} p={[0, -0.1, 0.01]} m={m} />
              </group>
            )),
          )}
        </>
      );
    case 4:
      return <Box s={[W, H, 0.5]} p={[0, 0, 0]} m={m} />;
    case 5:
      return (
        <>
          {[-1.2, 0, 1.2].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <Box s={[0.05, H, 0.025]} p={[-0.1, 0, -0.045]} m={m} />
              <Box s={[0.05, H, 0.025]} p={[0.1, 0, -0.045]} m={m} />
              <Box s={[0.025, H, 0.12]} p={[-0.06, 0, 0.005]} m={m} />
              <Box s={[0.025, H, 0.12]} p={[0.06, 0, 0.005]} m={m} />
              <Box s={[0.145, H, 0.025]} p={[0, 0, 0.06]} m={m} />
            </group>
          ))}
        </>
      );
    default:
      return (
        <>
          <Box s={[W + 0.2, H / 2 - 0.03, 0.04]} p={[0, H / 4, 0]} m={m} />
          <Box s={[W + 0.2, H / 2 - 0.03, 0.04]} p={[0, -H / 4, 0]} m={m} />
        </>
      );
  }
}

export const WallLayerMesh = forwardRef<THREE.Group, LayerGroupProps>(({ mat, index, onPick }, ref) => {
  const body = useMemo(() => layerBody(index, mat), [index, mat]);
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta < 6) onPick(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      {body}
    </group>
  );
});
WallLayerMesh.displayName = 'WallLayerMesh';
