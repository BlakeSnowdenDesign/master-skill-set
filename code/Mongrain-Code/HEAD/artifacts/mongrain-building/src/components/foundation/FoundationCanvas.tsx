import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { FOUNDATION_LAYERS } from './layers';
import type { ProjectedPoint } from '../detail/useDetailInteractions';
import { useLayerProjection } from '../detail/useLayerProjection';
interface Props {
  active: number;
  exploded: boolean;
  reduced: boolean;
  onPick(i: number): void;
  onProject(p: ProjectedPoint[]): void;
  onFail(): void;
}

const W = 3.6;
const H = 4;
const T = [0.6, 0.04, 0.26, 0.1, 0.03];
const BASE_Z = [0, 0.32, 0.47, 0.65, 0.78];
const GAP = 1.3;
const VOID_Z = 0.725;
const VOID_T = 0.07;
/** anchor on the front-top edge of each slab, staggered along x */
const ANCHOR_X = [-1.5, -0.9, -0.3, 0.3, 0.9];

type V3 = [number, number, number];
function Box({ s, p, m }: { s: V3; p: V3; m: THREE.Material }) {
  return (
    <mesh position={p} material={m} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

function body(i: number, m: THREE.Material) {
  switch (i) {
    case 0:
      return (
        <>
          <Box s={[W, H, T[0]]} p={[0, 0, 0]} m={m} />
          <Box s={[W + 0.6, 0.45, 1.3]} p={[0, -H / 2 - 0.225 + 0.0, -0.35]} m={m} />
        </>
      );
    case 3:
      return (
        <>
          <Box s={[W, H, 0.03]} p={[0, 0, -0.035]} m={m} />
          {Array.from({ length: 9 }).flatMap((_, a) =>
            Array.from({ length: 11 }).map((__, b) => (
              <Box key={`${a}-${b}`} s={[0.12, 0.12, 0.07]} p={[-1.5 + a * 0.375, -1.7 + b * 0.34, 0.005]} m={m} />
            )),
          )}
        </>
      );
    default:
      return <Box s={[W, H, T[i]]} p={[0, 0, 0]} m={m} />;
  }
}

function Content({ active, exploded, reduced, onPick, onProject }: Omit<Props, 'onFail'>) {
  const { camera, size } = useThree();
  const voidGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(W, H, VOID_T);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    // Compute after the position attribute exists, before attaching to R3F.
    const temporaryMaterial = new THREE.LineBasicMaterial();
    const outline = new THREE.LineSegments(edges, temporaryMaterial);
    outline.computeLineDistances();
    temporaryMaterial.dispose();
    return edges;
  }, []);
  const mats = useMemo(() => {
    const mk = (o: THREE.MeshStandardMaterialParameters) => {
      const m = new THREE.MeshStandardMaterial(o);
      m.emissive = new THREE.Color('#12b5d1');
      m.emissiveIntensity = 0;
      return m;
    };
    return [
      mk({ color: '#a9b0b3', roughness: 0.95 }),
      mk({ color: '#1f2a30', roughness: 0.55 }),
      mk({ color: '#e9c26a', roughness: 0.9 }),
      mk({ color: '#3d4d55', roughness: 0.6 }),
      mk({ color: '#f3f4ef', roughness: 1, transparent: true, opacity: 0.85 }),
    ];
  }, []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const voidRef = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const controls = useRef<{ update(): void } | null>(null);
  const ex = useRef(0);
  const em = useRef<number[]>(mats.map(() => 0));
  const { points, projectLayer } = useLayerProjection(FOUNDATION_LAYERS.length);
  const p = useRef({ active, exploded, reduced, onProject });
  p.current = { active, exploded, reduced, onProject };
  const aspect = size.width / Math.max(1, size.height);

  useEffect(() => {
    const d = aspect < 0.8 ? 38 : aspect < 1.3 ? 27 : 23;
    camera.position.set(-1.15, 0.35, 0.85).normalize().multiplyScalar(d);
    camera.lookAt(0, 0, 0);
    controls.current?.update();
  }, [aspect, camera]);

  useEffect(() => () => {
    mats.forEach((m) => m.dispose());
    voidGeometry.dispose();
    document.body.style.cursor = '';
  }, [mats, voidGeometry]);

  useFrame((_, dt) => {
    const { active: a, exploded: e, reduced: r } = p.current;
    const sm = r ? 1 : 1 - Math.exp(-dt * 3);
    ex.current += ((e ? 1 : 0) - ex.current) * sm;
    if (root.current) {
      root.current.position.z = -(0.4 + 2.6 * ex.current);
      root.current.position.y = aspect < 0.8 ? 1.5 : 0.2;
      root.current.updateWorldMatrix(true, true);
    }
    FOUNDATION_LAYERS.forEach((_l, i) => {
      const g = refs.current[i];
      if (!g) return;
      g.position.z = BASE_Z[i] + i * GAP * ex.current;
      em.current[i] += ((a === i ? 0.3 : 0) - em.current[i]) * sm;
      mats[i].emissiveIntensity = em.current[i];
      g.updateWorldMatrix(true, false);
      projectLayer(i, g, [ANCHOR_X[i], H / 2, i === 3 ? -0.035 : T[i] / 2], camera, size);
    });
    if (voidRef.current) voidRef.current.position.z = VOID_Z + 3.5 * GAP * ex.current;
    p.current.onProject(points.current);
  });

  return (
    <>
      <hemisphereLight args={['#ffffff', '#c3ccd0', 0.8]} />
      <directionalLight position={[-6, 9, 8]} intensity={2.2} />
      <directionalLight position={[8, 2, 4]} intensity={0.6} color="#dfeaf0" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 6, 6]} scale={[14, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-8, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 6, 1]} color="#f4f8fa" />
      </Environment>
      <group ref={root}>
        {FOUNDATION_LAYERS.map((l, i) => (
          <group
            key={l.id}
            ref={(g) => {
              refs.current[i] = g;
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (e.delta < 6) onPick(i);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => (document.body.style.cursor = '')}
          >
            {body(i, mats[i])}
          </group>
        ))}
        {/* drainage void: outline only, never a solid */}
        <group ref={voidRef}>
          <lineSegments geometry={voidGeometry}>
            <lineDashedMaterial color="#0f9db5" dashSize={0.18} gapSize={0.12} />
          </lineSegments>
        </group>
      </group>
      <OrbitControls
        ref={(c) => {
          controls.current = c as unknown as typeof controls.current;
        }}
        makeDefault
        enableDamping={!reduced}
        enablePan={false}
        minDistance={9}
        maxDistance={60}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.62}
        minAzimuthAngle={-1.3}
        maxAzimuthAngle={0.5}
      />
    </>
  );
}

export default function FoundationCanvas(props: Props) {
  const { onFail, ...rest } = props;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 32, near: 0.1, far: 200, position: [-6, 3, 10] }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => onFail())}
      aria-label="Interactive 3D exploded foundation assembly"
    >
      <Content {...rest} />
    </Canvas>
  );
}
