import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Edges, OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers3 } from 'lucide-react';
import * as THREE from 'three';
import { SUB_GRADE_LAYERS, type SubGradeId } from './subGradeLayers';

// Explodable model of the sub-grade assembly (ported from Foundations/source assembly-3d).
type Part = { pos: [number, number, number]; size: [number, number, number] };
// x: out from retained soil toward excavation, y: up, z: along wall
const PARTS: Record<SubGradeId, Part[]> = {
  soil: [
    { pos: [-1.2, -0.3, 0], size: [5.6, 0.6, 5.2] },
    { pos: [-2.6, 1.6, 0], size: [2.8, 3.2, 4.6] },
  ],
  footing: [{ pos: [0.6, 0.2, 0], size: [2.2, 0.4, 4.4] }],
  wall: [{ pos: [-0.75, 2.2, 0], size: [0.5, 3.6, 4.2] }],
  membrane: [{ pos: [-0.47, 2.2, 0], size: [0.06, 3.6, 4.2] }],
  insulation: [
    { pos: [-0.33, 2.0, -1.4], size: [0.22, 3.2, 1.36] },
    { pos: [-0.33, 2.0, 0], size: [0.22, 3.2, 1.36] },
    { pos: [-0.33, 1.6, 1.4], size: [0.22, 2.4, 1.36] },
  ],
  drainage: [{ pos: [-0.19, 1.9, -0.6], size: [0.06, 3.0, 3.0] }],
};
const EXPLODE: Record<SubGradeId, [number, number, number]> = {
  soil: [-1.2, -0.6, 0], footing: [0, -0.4, 0], wall: [-0.4, 0.2, 0], membrane: [0.6, 0.3, 0], insulation: [1.4, 0.35, 0], drainage: [2.3, 0.4, 0],
};
const ACCENT = '#087c91';

function canvasTexture(size: number, repeat: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function LayerMesh({ index, exploded, selected, onPick, startAt, maps }: {
  index: number; exploded: boolean; selected: SubGradeId | null; onPick: (id: SubGradeId) => void; startAt: number; maps: Partial<Record<SubGradeId, THREE.Texture>>;
}) {
  const info = SUB_GRADE_LAYERS[index];
  const { id } = info;
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const isSel = selected === id;
  const dim = selected !== null && !isSel;
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime - startAt - index * 0.7;
    const arrive = Math.min(Math.max(t / 0.9, 0), 1);
    const e = 1 - Math.pow(1 - arrive, 3);
    const out = exploded || isSel ? EXPLODE[id] : [0, 0, 0];
    const target = new THREE.Vector3(out[0], out[1] + (1 - e) * 3, out[2]);
    g.current.position.lerp(target, arrive < 1 ? 1 : 1 - Math.exp(-dt * 6));
    g.current.visible = arrive > 0;
    g.current.children.forEach((m) => {
      const mat = (m as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) { mat.opacity = e * (dim ? 0.28 : 1); mat.transparent = true; }
    });
  });
  const map = maps[id] ?? null;
  return <group ref={g}>
    {PARTS[id].map((p, i) => <mesh key={i} position={p.pos} castShadow receiveShadow
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onPick(id); }}>
      <boxGeometry args={p.size} />
      <meshStandardMaterial color={map ? '#ffffff' : info.side} map={map} roughness={id === 'membrane' ? 0.45 : 0.85} metalness={0} emissive={hover || isSel ? ACCENT : '#000000'} emissiveIntensity={isSel ? 0.2 : hover ? 0.1 : 0} />
      <Edges threshold={15} color={isSel ? ACCENT : '#33494e'} />
    </mesh>)}
    {hover && <HoverCursor />}
  </group>;
}

function HoverCursor() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.fs-model3d canvas');
    if (el) el.style.cursor = 'pointer';
    return () => { if (el) el.style.cursor = ''; };
  }, []);
  return null;
}

function Scene({ exploded, selected, onPick, startAt, touch }: { exploded: boolean; selected: SubGradeId | null; onPick: (id: SubGradeId | null) => void; startAt: number; touch: boolean }) {
  const maps = useMemo(() => ({
    drainage: canvasTexture(128, 3, (g) => {
      g.fillStyle = '#c3ccd0'; g.fillRect(0, 0, 128, 128);
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
        g.beginPath(); g.arc(x * 16 + (y % 2) * 8 + 4, y * 16 + 8, 4.5, 0, Math.PI * 2);
        g.fillStyle = '#eef2f4'; g.fill(); g.strokeStyle = '#7a8b91'; g.lineWidth = 1; g.stroke();
      }
    }),
    soil: canvasTexture(64, 4, (g) => {
      g.fillStyle = '#e6e3dc'; g.fillRect(0, 0, 64, 64);
      g.strokeStyle = '#a9a49a'; g.lineWidth = 1.2;
      for (let i = -64; i < 128; i += 10) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); }
    }),
  }), []);
  return <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[6, 9, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
    <directionalLight position={[-5, 4, -3]} intensity={0.35} />
    <group position={[0.4, -1.15, 0]} onPointerMissed={() => onPick(null)}>
      {SUB_GRADE_LAYERS.map((l, i) => <LayerMesh key={l.id} index={i} exploded={exploded} selected={selected} onPick={(id) => onPick(selected === id ? null : id)} startAt={startAt} maps={maps} />)}
    </group>
    <ContactShadows position={[0, -2.15, 0]} opacity={0.22} scale={14} blur={2.6} far={4} />
    {/* On touch screens the model turns by itself; CSS restores touch scrolling so a swipe still scrolls the page in the Wix frame. */}
    <OrbitControls enablePan={false} enableZoom={false} enableRotate={!touch} autoRotate={touch && !selected} autoRotateSpeed={0.7}
      maxPolarAngle={Math.PI * 0.49} enableDamping dampingFactor={0.08} />
  </>;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {}
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const NoWebGL = () => <div className="fs-model3d-fallback" data-testid="status-subgrade-no-webgl">This browser can’t show the 3D model. The steps beside it and the animated section above cover the same layers.</div>;

export default function SubGradeModel3D() {
  const [glOk] = useState(() => hasWebGL());
  const [touch] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(hover: none) and (pointer: coarse)').matches);
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState<SubGradeId | null>(null);
  const [startAt, setStartAt] = useState(0.3);
  const [visible, setVisible] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    setNarrow(el.clientWidth < 560);
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const index = SUB_GRADE_LAYERS.findIndex((l) => l.id === selected);
  const step = (by: number) => setSelected(SUB_GRADE_LAYERS[(index + by + SUB_GRADE_LAYERS.length) % SUB_GRADE_LAYERS.length].id);

  return <div className="fs-model3d" data-testid="figure-subgrade-model">
    <div className="fs-model3d-steps">
      <ol aria-label="Sub-grade assembly, in build order">
        {SUB_GRADE_LAYERS.map((l) => <li key={l.id} className={selected === l.id ? 'is-active' : ''}>
          <button aria-expanded={selected === l.id} onClick={() => setSelected(selected === l.id ? null : l.id)} data-testid={`button-subgrade-${l.id}`}>
            <span>{l.step}</span><i style={{ background: l.side }} /><strong>{l.title}</strong>
          </button>
          <AnimatePresence initial={false}>
            {selected === l.id && <motion.p key="detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <span>{l.detail}</span>
            </motion.p>}
          </AnimatePresence>
        </li>)}
      </ol>
      <div className="fs-model3d-actions">
        <button onClick={() => step(-1)} aria-label="Previous layer" data-testid="button-subgrade-prev"><ArrowLeft size={15} /></button>
        <button onClick={() => step(1)} data-testid="button-subgrade-next">{index < 0 ? 'Start with the excavation' : 'Next layer'} <ArrowRight size={15} /></button>
        <button className={exploded ? 'is-active' : ''} onClick={() => setExploded((v) => !v)} aria-pressed={exploded} data-testid="button-subgrade-explode"><Layers3 size={15} />{exploded ? 'Assemble' : 'Explode all'}</button>
      </div>
    </div>
    <div className={`fs-model3d-stage${touch ? ' is-touch' : ''}`} ref={wrap} aria-label="Interactive 3D model of the sub-grade assembly. The selected step is pulled out of the model.">
      {!glOk && <NoWebGL />}
      {glOk && visible && <GLBoundary fallback={<NoWebGL />}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: narrow ? [12.2, 8.4, 13] : [9.6, 6.6, 10.1], fov: 32 }} gl={{ alpha: true, antialias: true }}
          onCreated={({ clock }) => setStartAt(clock.elapsedTime + 0.3)}>
          <Suspense fallback={null}>
            <Scene exploded={exploded} selected={selected} onPick={setSelected} startAt={startAt} touch={touch} />
          </Suspense>
        </Canvas>
      </GLBoundary>}
      <p className="fs-model3d-hint">{touch ? 'Tap a layer' : 'Drag to turn · Click a layer'}</p>
    </div>
  </div>;
}
