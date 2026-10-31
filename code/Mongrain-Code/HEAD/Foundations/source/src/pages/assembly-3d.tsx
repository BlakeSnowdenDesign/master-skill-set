import { Component, type ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Edges } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { PageFrame } from "@/components/page-frame";
import { LAYERS, type LayerId } from "@/lib/layers";

type Part = { pos: [number, number, number]; size: [number, number, number] };
// x: out from retained soil toward excavation, y: up, z: along wall
const PARTS: Record<LayerId, Part[]> = {
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
const EXPLODE: Record<LayerId, [number, number, number]> = {
  soil: [-1.2, -0.6, 0], footing: [0, -0.4, 0], wall: [-0.4, 0.2, 0], membrane: [0.6, 0.3, 0], insulation: [1.4, 0.35, 0], drainage: [2.3, 0.4, 0],
};

function useDimpleTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = "#c3cad0"; g.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      g.beginPath(); g.arc(x * 16 + (y % 2) * 8 + 4, y * 16 + 8, 4.5, 0, Math.PI * 2);
      g.fillStyle = "#eef2f5"; g.fill(); g.strokeStyle = "#7e8a94"; g.lineWidth = 1; g.stroke();
    }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}
function useHatchTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = "#e6e3dc"; g.fillRect(0, 0, 64, 64);
    g.strokeStyle = "#a9a49a"; g.lineWidth = 1.2;
    for (let i = -64; i < 128; i += 10) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function LayerMesh({ id, index, exploded, selected, onPick, startAt, maps }: {
  id: LayerId; index: number; exploded: boolean; selected: LayerId | null; onPick: (id: LayerId) => void; startAt: number; maps: { dimple: THREE.Texture; hatch: THREE.Texture };
}) {
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const info = LAYERS[index];
  const isSel = selected === id;
  const dim = selected !== null && !isSel;
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime - startAt - index * 0.7;
    const arrive = Math.min(Math.max(t / 0.9, 0), 1);
    const e = 1 - Math.pow(1 - arrive, 3);
    const out = exploded || isSel ? EXPLODE[id] : [0, 0, 0];
    const k = 1 - Math.exp(-dt * 6);
    const tgt = new THREE.Vector3(out[0], out[1] + (1 - e) * 3, out[2]);
    g.current.position.lerp(tgt, arrive < 1 ? 1 : k);
    g.current.visible = arrive > 0;
    g.current.children.forEach((m) => {
      const mat = (m as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) { mat.opacity = e * (dim ? 0.28 : 1); mat.transparent = true; }
    });
  });
  const color = id === "drainage" || id === "soil" ? "#ffffff" : info.color;
  const map = id === "drainage" ? maps.dimple : id === "soil" ? maps.hatch : null;
  return (
    <group ref={g}>
      {PARTS[id].map((p, i) => (
        <mesh key={i} position={p.pos} castShadow receiveShadow
          onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
          onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onPick(id); }}>
          <boxGeometry args={p.size} />
          <meshStandardMaterial color={color} map={map} roughness={id === "membrane" ? 0.45 : 0.85} metalness={0} emissive={hover || isSel ? "#1a3d7a" : "#000000"} emissiveIntensity={isSel ? 0.18 : hover ? 0.1 : 0} />
          <Edges threshold={15} color={isSel ? "#1a3d7a" : "#3a4048"} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ exploded, selected, onPick, startAt }: { exploded: boolean; selected: LayerId | null; onPick: (id: LayerId | null) => void; startAt: number }) {
  const dimple = useDimpleTexture();
  const hatch = useHatchTexture();
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 9, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 4, -3]} intensity={0.35} />
      <group position={[0.4, -1.5, 0]} onPointerMissed={() => onPick(null)}>
        {LAYERS.map((l, i) => (
          <LayerMesh key={l.id} id={l.id} index={i} exploded={exploded} selected={selected} onPick={(id) => onPick(selected === id ? null : id)} startAt={startAt} maps={{ dimple, hatch }} />
        ))}
      </group>
      <ContactShadows position={[0, -2.15, 0]} opacity={0.25} scale={14} blur={2.6} far={4} />
      <OrbitControls enablePan={false} minDistance={7} maxDistance={16} maxPolarAngle={Math.PI * 0.49} enableDamping dampingFactor={0.08} zoomSpeed={0.5} />
    </>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
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

function NoWebGL() {
  return (
    <div data-testid="status-no-webgl" className="absolute inset-0 flex items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-2">3D unavailable</div>
        <p className="text-[15px] leading-snug">This browser can't display the interactive 3D view.</p>
        <Link href="/" data-testid="link-fallback-2d" className="mt-4 inline-block rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-primary hover:text-primary transition-colors">View the animated 2D version</Link>
      </div>
    </div>
  );
}

export default function Assembly3D() {
  const [glOk] = useState(() => hasWebGL());
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState<LayerId | null>(null);
  const [startAt, setStartAt] = useState(0.3);
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const sel = LAYERS.find((l) => l.id === selected);

  return (
    <PageFrame alt="/" altLabel="Animated 2D"
      right={
        <button data-testid="button-explode" onClick={() => { setExploded((v) => !v); }} className="rounded-full border px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] hover:border-primary hover:text-primary transition-colors">
          {exploded ? "Assemble" : "Explode all"}
        </button>
      }>
      <div ref={wrap} className="absolute inset-0">
        {!glOk && <NoWebGL />}
        {glOk && visible && (
          <GLBoundary fallback={<NoWebGL />}>
          <Canvas shadows dpr={[1, 2]} camera={{ position: [8, 5.5, 8.5], fov: 32 }} gl={{ alpha: true, antialias: true }}
            onCreated={({ clock }) => setStartAt(clock.elapsedTime + 0.3)}>
            <Suspense fallback={null}>
              <Scene exploded={exploded} selected={selected} onPick={setSelected} startAt={startAt} />
            </Suspense>
          </Canvas>
          </GLBoundary>
        )}

        <nav className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex flex-col gap-0.5 bg-background/85 backdrop-blur rounded-md border p-1.5">
          {LAYERS.map((l) => (
            <button key={l.id} data-testid={`button-legend-${l.id}`} onClick={() => setSelected(selected === l.id ? null : l.id)}
              className={`flex items-center gap-2 rounded px-2 py-1 text-left text-[11.5px] sm:text-[12.5px] transition-colors ${selected === l.id ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}>
              <span className="font-mono text-[9.5px] text-muted-foreground w-4">{l.step}</span>
              <span className="h-2.5 w-2.5 rounded-[2px] border border-black/15" style={{ background: l.color }} />
              {l.title}
            </button>
          ))}
        </nav>

        <AnimatePresence>
          {sel && (
            <motion.div key={sel.id} data-testid="panel-callout"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-3 top-3 sm:right-6 sm:top-6 max-w-[260px] sm:max-w-[300px] bg-background/90 backdrop-blur border rounded-md p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-0.5 w-6" style={{ background: sel.color }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Layer {sel.step}</span>
              </div>
              <div className="font-semibold text-[15px] sm:text-[17px] leading-tight">{sel.title}</div>
              <p className="mt-1 text-[13px] sm:text-[14px] text-muted-foreground leading-snug">{sel.body}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="absolute right-3 bottom-3 sm:right-6 sm:bottom-6 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground pointer-events-none hidden sm:block">
          Drag to orbit · Scroll to zoom · Click a layer
        </p>
      </div>
    </PageFrame>
  );
}
