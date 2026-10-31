import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { WALL_LAYERS } from '@/lib/wallLayers';
import { WallLayerMesh, makeWallMaterials } from './WallModel';
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

const BASE_Z = [0, 0.2, 0.29, 0.38, 0.72, 1.15, 1.3];
const GAP = 1.1;

function Content({ active, exploded, reduced, onPick, onProject }: Omit<Props, 'onFail'>) {
  const { camera, size } = useThree();
  const mats = useMemo(() => makeWallMaterials(), []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const controls = useRef<{ target: THREE.Vector3; update(): void } | null>(null);
  const ex = useRef(0);
  const em = useRef<number[]>(WALL_LAYERS.map(() => 0));
  const lift = useRef<number[]>(WALL_LAYERS.map(() => 0));
  const { points, projectLayer } = useLayerProjection(WALL_LAYERS.length);
  const p = useRef({ active, exploded, reduced, onProject });
  p.current = { active, exploded, reduced, onProject };
  const aspect = size.width / Math.max(1, size.height);

  useEffect(() => {
    const d = aspect < 0.8 ? 41 : aspect < 1.3 ? 21 : 18;
    camera.position.set(-1.15, 0.3, 0.85).normalize().multiplyScalar(d);
    camera.lookAt(0, 0, 0);
    controls.current?.update();
  }, [aspect, camera]);

  useEffect(
    () => () => {
      mats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      document.body.style.cursor = '';
    },
    [mats],
  );

  useFrame((_, dt) => {
    const { active: a, exploded: e, reduced: r } = p.current;
    const sm = r ? 1 : 1 - Math.exp(-dt * 3);
    ex.current += ((e ? 1 : 0) - ex.current) * sm;
    if (root.current) {
      root.current.position.z = -(0.65 + 3.3 * ex.current);
      root.current.position.y = aspect < 0.8 ? 1.5 : 0;
      root.current.updateWorldMatrix(true, true);
    }
    WALL_LAYERS.forEach((l, i) => {
      const g = refs.current[i];
      if (!g) return;
      lift.current[i] += ((a === i ? 0.45 * (1 - ex.current) : 0) - lift.current[i]) * sm;
      g.position.z = BASE_Z[i] + i * GAP * ex.current + lift.current[i];
      em.current[i] += ((a === i ? 0.3 : 0) - em.current[i]) * sm;
      mats[i].emissiveIntensity = em.current[i];
      g.updateWorldMatrix(true, false);
      projectLayer(i, g, l.anchor, camera, size);
    });
    p.current.onProject(points.current);
  });

  return (
    <>
      <hemisphereLight args={['#ffffff', '#c3ccd0', 0.8]} />
      <directionalLight position={[-6, 9, 8]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[8, 2, 4]} intensity={0.6} color="#dfeaf0" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 6, 6]} scale={[14, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-8, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 6, 1]} color="#f4f8fa" />
        <Lightformer form="rect" intensity={0.9} position={[8, 2, 0]} rotation-y={-Math.PI / 2} scale={[10, 6, 1]} color="#e6f4f8" />
      </Environment>
      <group ref={root} rotation={[0, 0, 0]}>
        {WALL_LAYERS.map((l, i) => (
          <WallLayerMesh
            key={l.id}
            ref={(g) => {
              refs.current[i] = g;
            }}
            mat={mats[i]}
            index={i}
            onPick={onPick}
          />
        ))}
      </group>
      <OrbitControls
        ref={(c) => {
          controls.current = c as unknown as typeof controls.current;
        }}
        makeDefault
        enableDamping={!reduced}
        enablePan={false}
        minDistance={7}
        maxDistance={48}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.62}
        minAzimuthAngle={-1.3}
        maxAzimuthAngle={0.5}
      />
    </>
  );
}

export default function WallCanvas(props: Props) {
  const { onFail, ...rest } = props;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 32, near: 0.1, far: 200, position: [-6, 3, 10] }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => onFail())}
      aria-label="Interactive 3D exploded wall assembly"
    >
      <Content {...rest} />
    </Canvas>
  );
}
