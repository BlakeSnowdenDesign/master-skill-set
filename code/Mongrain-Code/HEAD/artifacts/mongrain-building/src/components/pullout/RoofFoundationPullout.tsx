import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoofLayerMesh, makeRoofMaterials } from '@/components/roof/RoofModel';
import { ROOF_LAYERS } from '@/lib/roofLayers';
import { FOUNDATION_LAYERS } from '@/components/foundation/layers';
import type { PulloutState } from './transition';

const noop = () => {};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const RS = 2.6;
const ROOF_Y = [0, 0.24, 0.55, 0.92];
const ROOF_GAP = 1.5;

const FS = 2.0;
const FW = 3.6;
const FH = 4;
const FT = [0.6, 0.04, 0.26, 0.1, 0.03];
const F_BASE_Z = [0, 0.32, 0.47, 0.65, 0.78];
const F_GAP = 1.3;
const VOID_Z = 0.725;

type V3 = [number, number, number];
function Box({ s, p, m }: { s: V3; p: V3; m: THREE.Material }) {
  return (
    <mesh position={p} material={m} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

function fbody(i: number, m: THREE.Material) {
  if (i === 0)
    return (
      <>
        <Box s={[FW, FH, FT[0]]} p={[0, 0, 0]} m={m} />
        <Box s={[FW + 0.6, 0.45, 1.3]} p={[0, -FH / 2 - 0.225, -0.35]} m={m} />
      </>
    );
  if (i === 3)
    return (
      <>
        <Box s={[FW, FH, 0.03]} p={[0, 0, -0.035]} m={m} />
        {Array.from({ length: 9 }).flatMap((_, a) =>
          Array.from({ length: 11 }).map((__, b) => <Box key={`${a}-${b}`} s={[0.12, 0.12, 0.07]} p={[-1.5 + a * 0.375, -1.7 + b * 0.34, 0.005]} m={m} />),
        )}
      </>
    );
  return <Box s={[FW, FH, FT[i]]} p={[0, 0, 0]} m={m} />;
}

export default function RoofFoundationPullout({ state }: { state: MutableRefObject<PulloutState> }) {
  const roofMats = useMemo(() => makeRoofMaterials(), []);
  const fMats = useMemo(
    () =>
      [
        { color: '#a9b0b3', roughness: 0.95 },
        { color: '#1f2a30', roughness: 0.55 },
        { color: '#e9c26a', roughness: 0.9 },
        { color: '#3d4d55', roughness: 0.6 },
        { color: '#f3f4ef', roughness: 1, transparent: true, opacity: 0.85 },
      ].map((o) => new THREE.MeshStandardMaterial(o)),
    [],
  );
  const voidGeo = useMemo(() => {
    const b = new THREE.BoxGeometry(FW, FH, 0.07);
    const e = new THREE.EdgesGeometry(b);
    b.dispose();
    return e;
  }, []);
  const roofCue = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(6 * RS, 4.4 * RS)), []);
  const fCue = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(FW * FS, FH * FS)), []);
  useEffect(
    () => () => {
      roofMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      fMats.forEach((m) => m.dispose());
      voidGeo.dispose();
      roofCue.dispose();
      fCue.dispose();
    },
    [roofMats, fMats, voidGeo, roofCue, fCue],
  );

  const rg = useRef<THREE.Group>(null);
  const fg = useRef<THREE.Group>(null);
  const rl = useRef<(THREE.Group | null)[]>([]);
  const fl = useRef<(THREE.Group | null)[]>([]);
  const vg = useRef<THREE.Group>(null);

  useFrame(() => {
    const s = state.current;
    const on = s.kind !== null && s.p > 0.001;
    const e = ease(s.p);
    if (rg.current) {
      rg.current.visible = on && s.kind === 'roof';
      rg.current.position.set(s.origin.x, s.origin.y + e * 3, s.origin.z);
      rl.current.forEach((g, i) => g && (g.position.y = ROOF_Y[i] + ROOF_GAP * i * e));
      roofMats.forEach((m, i) => (m.emissiveIntensity = i === 3 ? 0.12 * e : 0));
    }
    if (fg.current) {
      fg.current.visible = on && s.kind === 'foundation';
      fg.current.position.set(s.origin.x, s.origin.y, s.origin.z + e * 3);
      fl.current.forEach((g, i) => g && (g.position.z = F_BASE_Z[i] + F_GAP * i * e));
      if (vg.current) vg.current.position.z = VOID_Z + 3.5 * F_GAP * e;
    }
  });

  return (
    <>
      {/* origin cue stays seated in the building while layers lift away */}
      <group ref={rg} visible={false}>
        <group scale={RS}>
          {ROOF_LAYERS.map((l, i) => (
            <RoofLayerMesh key={l.id} ref={(g) => { rl.current[i] = g; }} mat={roofMats[i]} index={i} onPick={noop} />
          ))}
        </group>
      </group>
      <group ref={fg} visible={false}>
        <group scale={FS}>
          {FOUNDATION_LAYERS.map((l, i) => (
            <group key={l.id} ref={(g) => { fl.current[i] = g; }}>
              {fbody(i, fMats[i])}
            </group>
          ))}
          <group ref={vg}>
            <lineSegments geometry={voidGeo}>
              <lineBasicMaterial color="#0f9db5" transparent opacity={0.8} />
            </lineSegments>
          </group>
        </group>
      </group>
      <PulloutCue state={state} roofCue={roofCue} fCue={fCue} />
    </>
  );
}

function PulloutCue({ state, roofCue, fCue }: { state: MutableRefObject<PulloutState>; roofCue: THREE.BufferGeometry; fCue: THREE.BufferGeometry }) {
  const r = useRef<THREE.Group>(null);
  const f = useRef<THREE.Group>(null);
  useFrame(() => {
    const s = state.current;
    const on = s.kind !== null && s.p > 0.001;
    if (r.current) {
      r.current.visible = on && s.kind === 'roof';
      r.current.position.set(s.origin.x, s.origin.y + 0.06, s.origin.z);
    }
    if (f.current) {
      f.current.visible = on && s.kind === 'foundation';
      f.current.position.set(s.origin.x, s.origin.y, s.origin.z - 0.05);
    }
  });
  return (
    <>
      <group ref={r} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[6 * RS, 4.4 * RS]} />
          <meshBasicMaterial color="#0c6f80" transparent opacity={0.4} depthWrite={false} />
        </mesh>
        <lineSegments geometry={roofCue}>
          <lineBasicMaterial color="#12b5d1" />
        </lineSegments>
      </group>
      <group ref={f} visible={false}>
        <mesh>
          <planeGeometry args={[FW * FS, FH * FS]} />
          <meshBasicMaterial color="#0c6f80" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <lineSegments geometry={fCue}>
          <lineBasicMaterial color="#12b5d1" />
        </lineSegments>
      </group>
    </>
  );
}
