import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { ROOF_LAYERS } from '@/lib/roofLayers';
import { RoofLayerMesh, makeRoofMaterials } from './RoofModel';
import type { ProjectedPoint } from '../detail/useDetailInteractions';
import { useLayerProjection } from '../detail/useLayerProjection';
interface Props {
  active: number;
  exploded: boolean;
  /** number of layers currently placed (guided assembly) */
  shown: number;
  guidePaused: boolean;
  reduced: boolean;
  onPick(i: number): void;
  onProject(p: ProjectedPoint[]): void;
  onFail(): void;
}

/** layer origin heights; the edge group origin is the flange top */
const BASE_Y = [0.27, 0.49, 0.81, 1.14];
const GAP = 1.25;
const N = ROOF_LAYERS.length;

function Content({ active, exploded, shown, guidePaused, reduced, onPick, onProject }: Omit<Props, 'onFail'>) {
  const { camera, size } = useThree();
  const mats = useMemo(() => makeRoofMaterials(), []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const controls = useRef<{ update(): void } | null>(null);
  const ex = useRef(0);
  const em = useRef<number[]>(ROOF_LAYERS.map(() => 0));
  const placement = useRef<number[]>(ROOF_LAYERS.map(() => 0));
  const { points, projectLayer } = useLayerProjection(ROOF_LAYERS.length);
  const p = useRef({ active, exploded, shown, guidePaused, reduced, onProject });
  p.current = { active, exploded, shown, guidePaused, reduced, onProject };
  
  useEffect(() => {
    // fit the FULLY exploded stack into the area not covered by cards, nav and header
    const w = size.width;
    const h = size.height;
    const t = Math.tan((32 * Math.PI) / 360);
    const mobile = w < 768;
    const top = mobile ? 185 : 112;
    const bottom = mobile ? 345 : 112;
    const left = mobile ? 12 : 350;
    const right = mobile ? 12 : 280;
    const availW = Math.max(200, w - left - right);
    const availH = Math.max(200, h - top - bottom);
    const direction = new THREE.Vector3(-0.95, 0.62, 1).normalize();
    const rightAxis = new THREE.Vector3(0, 1, 0).cross(direction).normalize();
    const upAxis = direction.clone().cross(rightAxis).normalize();
    // Perspective-fit all eight corners of the exploded assembly. Oblique
    // panels have more projected height than the sum of their thicknesses.
    let d = 5;
    for (const x of [-3.2, 3.2])
      for (const y of [-2.9, 2.7])
        for (const z of [-2.45, 2.25]) {
          const corner = new THREE.Vector3(x, y, z);
          const projected = Math.max(
            Math.abs(corner.dot(rightAxis)) * h / (availW * t),
            Math.abs(corner.dot(upAxis)) * h / (availH * t),
          );
          d = Math.max(d, corner.dot(direction) + projected * 1.08);
        }
    camera.position.copy(direction).multiplyScalar(d);
    camera.lookAt(0, 0, 0);
    const cam = camera as THREE.PerspectiveCamera;
    cam.setViewOffset(w, h, -(left - right) / 2, -((top + h - bottom) / 2 - h / 2), w, h);
    controls.current?.update();
  }, [size.width, size.height, camera]);

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
    const { active: a, exploded: e, shown: sh, guidePaused: paused, reduced: r } = p.current;
    const sm = paused ? 0 : r ? 1 : 1 - Math.exp(-dt * 3.2);
    ex.current += ((e ? 1 : 0) - ex.current) * sm;
    if (root.current) {
      root.current.position.y = -(0.55 + ((N - 1) * GAP * 0.5) * ex.current);
      root.current.updateWorldMatrix(true, true);
    }
    ROOF_LAYERS.forEach((l, i) => {
      const g = refs.current[i];
      if (!g) return;
      if (i >= sh) placement.current[i] = 1;
      g.visible = i < sh;
      if (g.visible) placement.current[i] *= 1 - sm;
      g.position.y = BASE_Y[i] + i * GAP * ex.current + placement.current[i] * GAP;
      em.current[i] += ((a === i ? 0.32 : 0) - em.current[i]) * sm;
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
      <group ref={root}>
        {ROOF_LAYERS.map((l, i) => (
          <RoofLayerMesh
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
        minDistance={5}
        maxDistance={64}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.5}
        minAzimuthAngle={-1.3}
        maxAzimuthAngle={0.6}
      />
    </>
  );
}

export default function RoofCanvas(props: Props) {
  const { onFail, ...rest } = props;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 32, near: 0.1, far: 300, position: [-8, 8, 12] }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => onFail())}
      aria-label="Interactive 3D exploded roof assembly"
    >
      <Content {...rest} />
    </Canvas>
  );
}
