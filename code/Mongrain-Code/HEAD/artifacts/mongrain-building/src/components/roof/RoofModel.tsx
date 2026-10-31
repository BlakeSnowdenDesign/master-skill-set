import { forwardRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { ROOF_LAYERS } from '@/lib/roofLayers';

export const ROOF_W = 6;
export const ROOF_D = 4.4;

function tex(base: [number, number, number], vary: number, rep = 3) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const img = g.createImageData(128, 128);
  for (let i = 0; i < 128 * 128; i++) {
    const v = (Math.random() - 0.5) * vary;
    img.data[i * 4] = base[0] + v;
    img.data[i * 4 + 1] = base[1] + v;
    img.data[i * 4 + 2] = base[2] + v * 0.8;
    img.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rep, rep);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function makeRoofMaterials(): THREE.MeshStandardMaterial[] {
  const std = (o: THREE.MeshStandardMaterialParameters) => {
    const m = new THREE.MeshStandardMaterial(o);
    m.emissive = new THREE.Color('#12b5d1');
    m.emissiveIntensity = 0;
    return m;
  };
  return [
    std({ color: '#aab4b8', metalness: 0.65, roughness: 0.45, side: THREE.DoubleSide }),
    std({ color: '#4a6f86', roughness: 0.6 }),
    std({ map: tex([214, 188, 112], 60, 4), color: '#ffffff', roughness: 1 }),
    std({ color: '#dfe6e6', roughness: 0.55 }),
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

/** corrugated deck cross-section (x,y), extruded along the roof depth */
const DECK = (() => {
  const hi = 0.2;
  const lo = -0.2;
  const th = 0.07;
  const top: [number, number][] = [];
  for (let k = 0; k < 12; k++) {
    const x = -ROOF_W / 2 + k * 0.5;
    top.push([x, hi], [x + 0.12, hi], [x + 0.2, lo], [x + 0.32, lo], [x + 0.4, hi]);
  }
  top.push([ROOF_W / 2, hi]);
  const s = new THREE.Shape();
  top.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  [...top].reverse().forEach(([x, y]) => s.lineTo(x, y - th));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: ROOF_D, bevelEnabled: false });
  g.translate(0, 0, -ROOF_D / 2);
  return g;
})();

/** small fixed parapet, behind the roof edge, for context only */
function Parapet() {
  const m = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c3ccd0', roughness: 0.9 }), []);
  useEffect(() => () => m.dispose(), [m]);
  return <Box s={[ROOF_W + 0.4, 1.15, 0.22]} p={[0, 0.4, -ROOF_D / 2 - 0.13]} m={m} />;
}

function Course({ xs, zs, y, h, m }: { xs: number[]; zs: number[]; y: number; h: number; m: THREE.Material }) {
  const out = [];
  for (let i = 0; i < xs.length - 1; i++)
    for (let j = 0; j < zs.length - 1; j++)
      out.push(<Box key={`${i}-${j}`} s={[xs[i + 1] - xs[i] - 0.04, h, zs[j + 1] - zs[j] - 0.04]} p={[(xs[i] + xs[i + 1]) / 2, y, (zs[j] + zs[j + 1]) / 2]} m={m} />);
  return <>{out}</>;
}

function Membrane({ m }: { m: THREE.Material }) {
  const seam = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f7fafa', roughness: 0.4 }), []);
  useEffect(() => () => seam.dispose(), [seam]);
  const centers = [-2.25, -0.75, 0.75, 2.25];
  return (
    <>
      {centers.map((x) => (
        <Box key={x} s={[1.48, 0.06, ROOF_D]} p={[x, 0, 0]} m={m} />
      ))}
      {[-1.5, 0, 1.5].map((x) => (
        <Box key={x} s={[0.14, 0.018, ROOF_D]} p={[x, 0.036, 0]} m={seam} />
      ))}
    </>
  );
}

function body(i: number, m: THREE.Material) {
  const W = ROOF_W;
  const D = ROOF_D;
  switch (i) {
    case 0:
      return (
        <>
          <mesh geometry={DECK} material={m} castShadow receiveShadow />
          <Parapet />
        </>
      );
    case 1:
      return <Box s={[W, 0.04, D]} p={[0, 0, 0]} m={m} />;
    case 2:
      return (
        <>
          <Course xs={[-3, -1, 1, 3]} zs={[-D / 2, 0, D / 2]} y={-0.15} h={0.28} m={m} />
          <Course xs={[-3, -2, 0, 2, 3]} zs={[-D / 2, 0.9, D / 2]} y={0.15} h={0.28} m={m} />
        </>
      );
    default:
      return <Membrane m={m} />;
  }
}

interface Props {
  mat: THREE.Material;
  index: number;
  onPick(i: number): void;
}

export const RoofLayerMesh = forwardRef<THREE.Group, Props>(function RoofLayerMesh({ mat, index, onPick }, ref) {
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
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
      name={ROOF_LAYERS[index].id}
    >
      {body(index, mat)}
    </group>
  );
});
