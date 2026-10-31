import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Props = { active: number; exploded: boolean; paused: boolean; rotated: boolean; mode: 'positive' | 'blindside'; onPick(index: number): void; onFail(): void };
type Vec = [number, number, number];

function Slab({ size, position, color, roughness = 0.8, opacity = 1 }: { size: Vec; position: Vec; color: string; roughness?: number; opacity?: number }) {
  return <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={roughness} transparent={opacity < 1} opacity={opacity} depthWrite={opacity >= 1} />
  </mesh>;
}

function Assembly({ active, exploded, paused, rotated, mode, onPick }: Omit<Props, 'onFail'>) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const spin = useRef(0);
  const colors = ['#aeb8ba', '#11a9c2', '#e6c786', '#61747a', '#dce6e4'];
  const offsets = useMemo(() => [0, 0.035, 0.07, 0.105, 0.14], []);
  useFrame((_, dt) => {
    const interpolation = paused ? 1 : 1 - Math.exp(-Math.max(0, dt) * 3.5);
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const target = offsets[i] + (exploded ? i * 0.42 : 0);
      layer.position.z += (target - layer.position.z) * interpolation;
    });
    if (root.current) {
      const targetRotation = rotated ? 1.08 : -0.22;
      if (paused) root.current.rotation.y = targetRotation;
      else root.current.rotation.y += (targetRotation - root.current.rotation.y) * (1 - Math.exp(-Math.max(0, dt) * 1.6));
      if (!paused && !rotated) root.current.rotation.y += dt * 0.055;
      root.current.position.y = paused ? 0 : Math.sin(spin.current) * 0.025;
      if (!paused) spin.current += dt * 0.65;
    }
  });
  return <group ref={root} rotation={[0.04, -0.22, 0]} scale={1.05}>
    {/* Soil stays to the side as cutaway context; it never occludes the wall or layers. */}
    <Slab size={[1.55, 3.3, 2.15]} position={[2.45, -1.43, 0.92]} color="#9c9e90" roughness={1} opacity={0.22} />
    <Slab size={[1.62, 0.06, 2.2]} position={[2.45, 0.26, 0.92]} color="#737c73" roughness={1} opacity={0.45} />
    {/* Reinforced concrete wall turns into a wide strip footing. */}
    <group ref={(g) => { layers.current[0] = g; }} position={[0, 0, offsets[0]]} onClick={(e) => { e.stopPropagation(); onPick(0); }}>
      <Slab size={[2.5, 2.9, 0.42]} position={[-0.42, -0.63, 0]} color={active === 0 ? '#b5c1c4' : colors[0]} />
      <Slab size={[3.1, 0.34, 1.05]} position={[-0.18, -2.2, -0.24]} color={active === 0 ? '#b5c1c4' : '#9ea9ab'} />
      {[0, 1, 2, 3, 4].map((n) => <Slab key={n} size={[0.055, 0.055, 0.78]} position={[-1.25 + n * 0.49, -0.58, 0.03]} color="#69777a" />)}
    </group>
    {/* Blindside membrane meets the cast concrete face; the substrate is shown beyond it. */}
    <group ref={(g) => { layers.current[1] = g; }} position={[0, 0, offsets[1]]} onClick={(e) => { e.stopPropagation(); onPick(1); }}>
      <Slab size={[2.56, 2.96, 0.045]} position={[-0.42, -0.62, mode === 'blindside' ? 0.175 : 0.24]} color={active === 1 ? '#27c5d9' : colors[1]} roughness={0.28} />
      {mode === 'positive' && <Slab size={[0.18, 2.98, 0.05]} position={[0.78, -0.62, 0.24]} color="#07869d" roughness={0.28} />}
      {mode === 'blindside' && <Slab size={[2.7, 2.98, 0.1]} position={[-0.42, -0.62, 0.34]} color="#65787c" roughness={0.92} opacity={0.68} />}
    </group>
    {mode === 'positive' && <>
      <group ref={(g) => { layers.current[2] = g; }} position={[0, 0, offsets[2]]} onClick={(e) => { e.stopPropagation(); onPick(2); }}>
        <Slab size={[2.58, 2.96, 0.17]} position={[-0.42, -0.62, 0.34]} color={active === 2 ? '#f2d796' : colors[2]} />
      </group>
      <group ref={(g) => { layers.current[3] = g; }} position={[0, 0, offsets[3]]} onClick={(e) => { e.stopPropagation(); onPick(3); }}>
        <Slab size={[2.65, 2.98, 0.06]} position={[-0.42, -0.62, 0.47]} color={active === 3 ? '#82979c' : colors[3]} />
        {Array.from({ length: 22 }, (_, i) => <Slab key={i} size={[0.10, 0.10, 0.17]} position={[-1.66 + (i % 2) * 0.14, -1.91 + Math.floor(i / 2) * 0.12, 0.48]} color="#455a60" />)}
      </group>
      <group ref={(g) => { layers.current[4] = g; }} position={[0, 0, offsets[4]]} onClick={(e) => { e.stopPropagation(); onPick(4); }}>
        <Slab size={[2.72, 3.02, 0.025]} position={[-0.42, -0.62, 0.59]} color={active === 4 ? '#eff5f1' : colors[4]} opacity={0.8} />
      </group>
    </>}
    {/* Drainage void is an open cavity, not a material; perforated collector has an outlet. */}
    {mode === 'positive' && <>
      <mesh position={[1.08, -1.82, 0.18]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.115, 0.115, 2.1, 20]} />
        <meshStandardMaterial color="#263e45" roughness={0.45} />
      </mesh>
      <mesh position={[2.12, -1.83, 0.18]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 1.55, 16]} />
        <meshStandardMaterial color="#119bb0" roughness={0.35} />
      </mesh>
      <Slab size={[0.08, 0.6, 0.14]} position={[1.05, -1.57, 0.42]} color="#d0d4cf" />
    </>}
    {/* Grade-side water traces. */}
    {mode === 'positive' && [-0.45, 0.05, 0.55].map((y, i) => <mesh key={i} position={[1.57, y - 0.55, 1.05]}>
      <sphereGeometry args={[0.035, 12, 12]} /><meshStandardMaterial color="#27b8cb" emissive="#27b8cb" emissiveIntensity={0.12} />
    </mesh>)}
  </group>;
}

export default function FoundationSystemsModel(props: Props) {
  return <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6.3, 3.1, 7.7], fov: 34 }} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', props.onFail)}>
    <color attach="background" args={['#e3e9e8']} />
    <hemisphereLight args={['#f7ffff', '#7c8580', 1.5]} />
    <directionalLight position={[3, 7, 5]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
    <directionalLight position={[-5, 1, -3]} intensity={0.9} color="#8fd7df" />
    <Assembly active={props.active} exploded={props.exploded} paused={props.paused} rotated={props.rotated} mode={props.mode} onPick={props.onPick} />
    <OrbitControls makeDefault target={[0, -0.72, 0]} enablePan={false} enableDamping minDistance={6} maxDistance={13} minPolarAngle={0.42} maxPolarAngle={1.48} />
  </Canvas>;
}
