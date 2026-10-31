import { useEffect, useMemo, useRef, type ElementRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { Foundation, Walls, Roof } from './Envelope';
import { WallLayerMesh, makeWallMaterials } from './wall/WallModel';
import { WALL_LAYERS } from '@/lib/wallLayers';
import { VOLUMES, type Zone } from '@/lib/spec';
import RoofFoundationPullout from './pullout/RoofFoundationPullout';
import { makePulloutState, isPulloutZone, pulloutOrigin, pulloutCamera, PULLOUT_PULL_SECONDS } from './pullout/transition';

export interface SceneApi {
  replay(): void;
  toggleExplode(): void;
  reset(): void;
  zoom(factor: number): void;
  exportGLB(): Promise<void>;
  enterWall(done: () => void): void;
  exitWall(done: () => void): void;
  /** shared flow for walls, roof and foundation */
  enterZone(zone: Zone, done: () => void): void;
  exitZone(done: () => void): void;
}

interface SceneProps {
  selected: Zone | null;
  hovered: Zone | null;
  reduced: boolean;
  apiRef: MutableRefObject<SceneApi | null>;
  onSelect(z: Zone | null): void;
  onHover(z: Zone | null): void;
  onStage(s: number): void;
  onExploded(e: boolean): void;
  onReady(): void;
  onFail(): void;
  /** true while a section detail covers the scene: stop rendering, keep camera */
  paused?: boolean;
  /** true while a wall transition or detail owns the camera */
  locked?: boolean;
}

const ZONE_KEYS: Zone[] = ['foundation', 'walls', 'roof'];
const EXPLODE: Record<Zone, number> = { foundation: -22, walls: 10, roof: 48 };
const SELECT_EXTRA: Record<Zone | 'none', Record<Zone, number>> = {
  none: { foundation: 0, walls: 0, roof: 0 },
  roof: { foundation: 0, walls: 0, roof: 18 },
  walls: { foundation: -14, walls: 0, roof: 22 },
  foundation: { foundation: -8, walls: 16, roof: 26 },
};
const ASSEMBLE_DELAY: Record<Zone, number> = { foundation: 0, walls: 4, roof: 8 };
const EXPLODE_DELAY: Record<Zone, number> = { roof: 0, walls: 0.6, foundation: 1.2 };
const TARGET = new THREE.Vector3(26, 16, 6);
const SECTION_SCALE = 2.6;
const SECTION_BASE_Z = [0, 0.2, 0.29, 0.38, 0.72, 1.15, 1.3];
const SECTION_GAP = 1.1;
const noop = () => {};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function homeOffset(aspect: number) {
  const fit = aspect < 0.8 ? 2.2 : aspect < 1.2 ? 1.6 : aspect < 1.6 ? 1.2 : 1;
  return new THREE.Vector3(0.28, 0.3, 0.91).normalize().multiplyScalar(215 * fit);
}

function collect(g: THREE.Object3D) {
  const set = new Set<THREE.MeshStandardMaterial>();
  g.traverse((o) => {
    const m = (o as THREE.Mesh).material;
    if (m) (Array.isArray(m) ? m : [m]).forEach((x) => set.add(x as THREE.MeshStandardMaterial));
  });
  const arr = [...set];
  arr.forEach((m) => {
    m.emissive.set('#12b5d1');
    m.emissiveIntensity = 0;
  });
  return arr;
}

interface Run {
  start?: number;
  wait: number;
  to: number;
  from: Record<Zone, number>;
  dur: number;
  delay: Record<Zone, number>;
}

function Content(p: SceneProps) {
  const { camera, size, gl } = useThree();
  const controls = useRef<ElementRef<typeof OrbitControls>>(null);
  const root = useRef<THREE.Group>(null);
  const refs: Record<Zone, MutableRefObject<THREE.Group | null>> = {
    foundation: useRef<THREE.Group>(null),
    walls: useRef<THREE.Group>(null),
    roof: useRef<THREE.Group>(null),
  };
  const props = useRef(p);
  props.current = p;
  const ex = useRef<Record<Zone, number>>({ foundation: 1, walls: 1, roof: 1 });
  const extra = useRef<Record<Zone, number>>({ foundation: 0, walls: 0, roof: 0 });
  const ghost = useRef<Record<Zone, number>>({ foundation: 0, walls: 0, roof: 0 });
  const glow = useRef<Record<Zone, number>>({ foundation: 0, walls: 0, roof: 0 });
  const last = useRef<Record<Zone, string>>({ foundation: '', walls: '', roof: '' });
  const mats = useRef<Record<Zone, THREE.MeshStandardMaterial[] | null>>({ foundation: null, walls: null, roof: null });
  const run = useRef<Run | null>(null);
  const exploded = useRef(true);
  const stage = useRef(0);
  const animationTime = useRef(0);
  const tween = useRef<null | { p0: THREE.Vector3; p1: THREE.Vector3; t0: THREE.Vector3; t1: THREE.Vector3; dur: number; start?: number; onDone?: () => void }>(null);
  const saved = useRef<{ p: THREE.Vector3; t: THREE.Vector3 } | null>(null);
  const pull = useRef(0);
  const pullout = useRef(makePulloutState());
  const activeZone = useRef<Zone | null>(null);
  const busy = useRef(false);
  const frozen = useRef(false);
  const simTime = useRef(0);
  const pullDir = useRef(0);
  const onPull = useRef<(() => void) | null>(null);
  const slab = useRef<THREE.Group>(null);
  const slabLayers = useRef<(THREE.Group | null)[]>([]);
  const cue = useRef<THREE.Group>(null);
  const sectionMats = useMemo(() => makeWallMaterials(), []);
  useEffect(
    () => () => {
      sectionMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    },
    [sectionMats],
  );
  const cueGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.4 * SECTION_SCALE, 4.4 * SECTION_SCALE)), []);
  useEffect(() => () => cueGeo.dispose(), [cueGeo]);
  const facade = useMemo(() => {
    // Front face of Pavilion A (block 1): a flat, fully visible wall facing the visitor.
    const v = VOLUMES.find((q) => q.id === 'pav-a1') ?? VOLUMES[0];
    const xs = v.poly.map((q) => q[0]);
    const zs = v.poly.map((q) => q[1]);
    const x = (Math.min(...xs) + Math.max(...xs)) / 2;
    return new THREE.Vector3(x, v.base + v.height / 2, Math.max(...zs));
  }, []);
  const exporting = useRef(false);
  const lines = useRef<THREE.LineSegments>(null);
  const aspect = size.width / Math.max(1, size.height);
  const aspectRef = useRef(aspect);
  aspectRef.current = aspect;

  const corners = useMemo(() => {
    const out: { x: number; z: number; top: number }[] = [];
    VOLUMES.filter((v) => ['podium', 'tower', 'pav-a1', 'pav-a2'].includes(v.id)).forEach((v) =>
      v.poly.forEach(([x, z]) => out.push({ x, z, top: v.base + v.height })),
    );
    return out;
  }, []);
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(corners.length * 6), 3));
    return g;
  }, [corners]);

  const startRun = (to: number, wait = 0) => {
    const reduced = props.current.reduced;
    const delays = to === 0 ? ASSEMBLE_DELAY : EXPLODE_DELAY;
    run.current = {
      wait: reduced ? 0 : wait,
      to,
      from: { ...ex.current },
      dur: reduced ? 0.001 : to === 0 ? 3.6 : 1.5,
      delay: reduced ? { foundation: 0, walls: 0, roof: 0 } : delays,
    };
    exploded.current = to === 1;
    props.current.onExploded(to === 1);
    if (to === 1 && stage.current !== 0) {
      stage.current = 0;
      props.current.onStage(0);
    }
  };

  const poseTween = (pos: THREE.Vector3, tgt: THREE.Vector3, dur: number, onDone?: () => void) => {
    const c = controls.current as unknown as { target: THREE.Vector3 } | null;
    if (!c) return;
    if (props.current.reduced && onDone) {
      camera.position.copy(pos);
      c.target.copy(tgt);
      onDone();
      return;
    }
    tween.current = {
      onDone,
      p0: camera.position.clone(),
      p1: pos,
      t0: c.target.clone(),
      t1: tgt,
      dur: props.current.reduced ? 0.01 : dur,
    };
  };

  const introPose = () => {
    const off = homeOffset(aspectRef.current);
    const start = off.clone().multiplyScalar(1.3).applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.75);
    start.y += 30;
    camera.position.copy(TARGET).add(start);
    (controls.current as unknown as { target: THREE.Vector3 }).target.copy(TARGET);
    camera.lookAt(TARGET);
    poseTween(TARGET.clone().add(off), TARGET.clone(), 6.2);
  };

  useEffect(() => {
    introPose();
    startRun(0, 2.2);
    p.onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    p.apiRef.current = {
      replay() {
        if (busy.current) return;
        ex.current = { foundation: 1, walls: 1, roof: 1 };
        stage.current = 0;
        props.current.onStage(0);
        props.current.onSelect(null);
        introPose();
        startRun(0, 0.5);
      },
      toggleExplode() {
        if (busy.current) return;
        startRun(exploded.current ? 0 : 1);
      },
      reset() {
        if (busy.current) return;
        poseTween(TARGET.clone().add(homeOffset(aspectRef.current)), TARGET.clone(), 1.1);
      },
      zoom(f: number) {
        if (busy.current) return;
        const c = controls.current as unknown as { target: THREE.Vector3 };
        const v = camera.position.clone().sub(c.target);
        const len = THREE.MathUtils.clamp(v.length() * f, 45, 460);
        v.setLength(len);
        poseTween(c.target.clone().add(v), c.target.clone(), 0.5);
      },
      enterWall(done: () => void) {
        this.enterZone('walls', done);
      },
      exitWall(done: () => void) {
        this.exitZone(done);
      },
      enterZone(zone: Zone, done: () => void) {
        const c = controls.current as unknown as { target: THREE.Vector3 } | null;
        if (!c || busy.current) return;
        busy.current = true;
        activeZone.current = zone;
        frozen.current = true;
        if (isPulloutZone(zone)) {
          const origin = pulloutOrigin(zone, refs[zone].current?.position.y ?? 0);
          pullout.current.kind = zone;
          pullout.current.origin.copy(origin);
        }
        const tw = tween.current;
        saved.current = tw ? { p: tw.p1.clone(), t: tw.t1.clone() } : { p: camera.position.clone(), t: c.target.clone() };
        tween.current = null;
        pullDir.current = 0;
        onPull.current = null;
        if (props.current.reduced) {
          pull.current = 1;
          done();
          return;
        }
        if (isPulloutZone(zone)) {
          const cam = pulloutCamera(zone, pullout.current.origin, aspectRef.current);
          poseTween(cam.pos, cam.tgt, 1.7, () => {
            pullDir.current = 1;
            onPull.current = done;
          });
          return;
        }
        const wy = refs.walls.current?.position.y ?? 0;
        const tgt = facade.clone().add(new THREE.Vector3(0, wy, 0));
        const pos = tgt.clone().add(new THREE.Vector3(16, 5, 72));
        poseTween(pos, tgt, 1.7, () => {
          pullDir.current = 1;
          onPull.current = done;
        });
      },
      exitZone(fin: () => void) {
        const s = saved.current ?? { p: TARGET.clone().add(homeOffset(aspectRef.current)), t: TARGET.clone() };
        tween.current = null;
        const done = () => {
          busy.current = false;
          frozen.current = false;
          activeZone.current = null;
          pullout.current.kind = null;
          pullout.current.p = 0;
          fin();
        };
        const back = () => poseTween(s.p.clone(), s.t.clone(), 1.5, done);
        if (props.current.reduced) {
          pull.current = 0;
          pullDir.current = 0;
          back();
          return;
        }
        if (pull.current <= 0.001) {
          pullDir.current = 0;
          back();
          return;
        }
        pullDir.current = -1;
        onPull.current = back;
      },
      async exportGLB() {
        if (!root.current) return;
        exporting.current = true;
        const saved = ZONE_KEYS.map((k) => refs[k].current!.position.y);
        ZONE_KEYS.forEach((k) => {
          refs[k].current!.position.y = 0;
          (mats.current[k] ?? collect(refs[k].current!)).forEach((m) => {
            m.opacity = 1;
            m.transparent = false;
            m.emissiveIntensity = 0;
            m.needsUpdate = true;
          });
        });
        root.current.userData = {
          title: 'Mongrain - illustrative building envelope',
          note: 'Illustrative architectural representation. Not an as-built BIM model.',
          author: 'Mongrain',
        };
        try {
          const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');
          const res = await new GLTFExporter().parseAsync(root.current, { binary: true });
          const blob = new Blob([res as ArrayBuffer], { type: 'model/gltf-binary' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'mongrain-building-envelope.glb';
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        } finally {
          ZONE_KEYS.forEach((k, i) => (refs[k].current!.position.y = saved[i]));
          last.current = { foundation: '', walls: '', roof: '' };
          exporting.current = false;
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    // Detail views pause the render loop. Keep our own time so resuming cannot
    // reset or advance an in-progress assembly by time spent in the detail.
    // These are time-based visual tweens, not physics. A 100 ms cap made
    // transitions run many times slower on low-frame-rate WebGL devices.
    // Still cap long background-tab gaps to avoid skipping the entire return.
    const dt = Math.min(Math.max(delta, 0), 0.5);
    animationTime.current += dt;
    if (!frozen.current) simTime.current += dt;
    const now = animationTime.current;
    const reduced = props.current.reduced;

    const r = run.current;
    if (r) {
      const sim = simTime.current;
      if (r.start === undefined) r.start = sim + r.wait;
      let done = true;
      ZONE_KEYS.forEach((k) => {
        const pr = clamp01((sim - r.start! - r.delay[k]) / r.dur);
        if (pr < 1) done = false;
        ex.current[k] = r.from[k] + (r.to - r.from[k]) * (reduced ? Math.round(pr) : ease(pr));
      });
      if (r.to === 0) {
        const el = sim - r.start;
        const s = done ? 4 : el < 0 ? 0 : el < ASSEMBLE_DELAY.walls ? 1 : el < ASSEMBLE_DELAY.roof ? 2 : 3;
        if (s !== stage.current) {
          stage.current = s;
          props.current.onStage(s);
        }
      }
      if (done) run.current = null;
    }

    const tw = tween.current;
    const c = controls.current as unknown as { target: THREE.Vector3; update(): void } | null;
    if (tw && c) {
      if (tw.start === undefined) tw.start = now;
      const k = ease(clamp01((now - tw.start) / tw.dur));
      camera.position.lerpVectors(tw.p0, tw.p1, k);
      c.target.lerpVectors(tw.t0, tw.t1, k);
      c.update();
      if (k >= 1) {
        tween.current = null;
        tw.onDone?.();
      }
    }

    if (pullDir.current !== 0) {
      const duration = activeZone.current && isPulloutZone(activeZone.current) ? PULLOUT_PULL_SECONDS : 1;
      pull.current = clamp01(pull.current + (pullDir.current * dt) / duration);
      if ((pullDir.current > 0 && pull.current >= 1) || (pullDir.current < 0 && pull.current <= 0)) {
        pullDir.current = 0;
        const cb = onPull.current;
        onPull.current = null;
        cb?.();
      }
    }
    pullout.current.p = activeZone.current && isPulloutZone(activeZone.current) ? pull.current : 0;
    gl.domElement.dataset.sectionProgress = pull.current.toFixed(3);
    gl.domElement.dataset.cameraTween = tween.current ? 'true' : 'false';
    const sg = slab.current;
    if (sg) {
      const e = ease(pull.current);
      const wy = refs.walls.current?.position.y ?? 0;
      sg.visible = pull.current > 0.001 && activeZone.current === 'walls';
      sg.position.set(facade.x, wy + facade.y, facade.z + 0.1 + e * 6);
      slabLayers.current.forEach((g, i) => {
        if (g) g.position.z = SECTION_BASE_Z[i] + SECTION_GAP * i * e;
      });
      sectionMats.forEach((m, i) => (m.emissiveIntensity = i === 6 ? 0.12 * e : 0));
      const cg = cue.current;
      if (cg) {
        cg.visible = pull.current > 0.001 && activeZone.current === 'walls';
        cg.position.set(facade.x, wy + facade.y, facade.z + 0.08);
      }
    }

    const sel = props.current.selected;
    const hov = props.current.hovered;
    const sm = reduced ? 1 : 1 - Math.exp(-dt * 6);
    const ext = SELECT_EXTRA[sel ?? 'none'];
    ZONE_KEYS.forEach((k) => {
      if (!frozen.current) extra.current[k] += (ext[k] - extra.current[k]) * sm;
      ghost.current[k] += ((sel && sel !== k ? 1 : 0) - ghost.current[k]) * sm;
      glow.current[k] += ((sel === k ? 1 : hov === k ? 0.45 : 0) - glow.current[k]) * sm;
      const g = refs[k].current;
      if (!g) return;
      g.position.y = EXPLODE[k] * ex.current[k] + extra.current[k];
      if (exporting.current) return;
      if (!mats.current[k]) mats.current[k] = collect(g);
      const key = `${ghost.current[k].toFixed(3)}|${glow.current[k].toFixed(3)}`;
      if (key === last.current[k]) return;
      last.current[k] = key;
      const op = 1 - 0.8 * ghost.current[k];
      const tr = ghost.current[k] > 0.01;
      mats.current[k]!.forEach((m) => {
        if (m.transparent !== tr) {
          m.transparent = tr;
          m.needsUpdate = true;
        }
        m.depthWrite = ghost.current[k] < 0.5;
        m.opacity = op;
        m.emissiveIntensity = 0.32 * glow.current[k];
      });
    });

    const l = lines.current;
    if (l) {
      const pos = lineGeo.getAttribute('position') as THREE.BufferAttribute;
      const fy = EXPLODE.foundation * ex.current.foundation + extra.current.foundation;
      const ry = EXPLODE.roof * ex.current.roof + extra.current.roof;
      corners.forEach((cn, i) => {
        pos.setXYZ(i * 2, cn.x, fy, cn.z);
        pos.setXYZ(i * 2 + 1, cn.x, cn.top + ry + 1.5, cn.z);
      });
      pos.needsUpdate = true;
      const amt = clamp01(Math.max(ex.current.foundation, ex.current.walls, ex.current.roof, Math.abs(ry) / 30));
      (l.material as THREE.LineBasicMaterial).opacity = 0.5 * amt;
      l.visible = amt > 0.01;
    }
  });

  useEffect(
    () => () => {
      tween.current = null;
      onPull.current = null;
      pullDir.current = 0;
      document.body.style.cursor = '';
    },
    [],
  );

  const handlers = (zone: Zone) => ({
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (e.delta > 6) return;
      props.current.onSelect(props.current.selected === zone ? null : zone);
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = 'pointer';
      props.current.onHover(zone);
    },
    onPointerOut: () => {
      document.body.style.cursor = '';
      props.current.onHover(null);
    },
  });

  return (
    <>
      <color attach="background" args={['#E8EBEC']} />
      <fog attach="fog" args={['#E8EBEC', 380, 820]} />
      <hemisphereLight args={['#ffffff', '#cfd6d9', 0.7]} />
      <directionalLight
        position={[-70, 170, 130]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-170}
        shadow-camera-right={170}
        shadow-camera-top={170}
        shadow-camera-bottom={-170}
        shadow-camera-near={10}
        shadow-camera-far={500}
        shadow-bias={-0.0004}
        shadow-normalBias={0.35}
      />
      <directionalLight position={[160, 60, 60]} intensity={0.55} color="#dfeaf0" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 40, 40]} scale={[80, 30, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-60, 20, -20]} rotation-y={Math.PI / 2} scale={[60, 30, 1]} color="#f4f8fa" />
        <Lightformer form="rect" intensity={0.8} position={[60, 20, -20]} rotation-y={-Math.PI / 2} scale={[60, 30, 1]} color="#e6f4f8" />
        <Lightformer form="rect" intensity={0.6} position={[0, -30, 0]} rotation-x={Math.PI / 2} scale={[100, 100, 1]} color="#dfe5e8" />
      </Environment>

      <group ref={root} name="Hospital envelope">
        <Foundation ref={refs.foundation} {...handlers('foundation')} />
        <Walls ref={refs.walls} {...handlers('walls')} />
        <Roof ref={refs.roof} {...handlers('roof')} />
      </group>

      <lineSegments ref={lines} geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial color="#0f9db5" transparent opacity={0} depthWrite={false} />
      </lineSegments>

      <group ref={cue} visible={false}>
        <mesh>
          <planeGeometry args={[3.4 * SECTION_SCALE, 4.4 * SECTION_SCALE]} />
          <meshBasicMaterial color="#0c6f80" transparent opacity={0.45} depthWrite={false} />
        </mesh>
        <lineSegments geometry={cueGeo}>
          <lineBasicMaterial color="#12b5d1" />
        </lineSegments>
      </group>
      <group ref={slab} visible={false} scale={SECTION_SCALE}>
        {WALL_LAYERS.map((l, i) => (
          <WallLayerMesh
            key={l.id}
            ref={(g) => {
              slabLayers.current[i] = g;
            }}
            mat={sectionMats[i]}
            index={i}
            onPick={noop}
          />
        ))}
      </group>

      <RoofFoundationPullout state={pullout} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[26, -0.05, 0]} receiveShadow>
        <planeGeometry args={[900, 900]} />
        <shadowMaterial opacity={0.16} depthWrite={false} />
      </mesh>

      <OrbitControls
        ref={controls}
        makeDefault
        enabled={!p.paused && !p.locked}
        enableDamping={!p.reduced}
        dampingFactor={0.07}
        minDistance={45}
        maxDistance={460}
        maxPolarAngle={Math.PI * 0.495}
        rotateSpeed={0.7}
        zoomSpeed={0.8}
        onStart={() => {
          tween.current = null;
        }}
        onEnd={() => {
        }}
      />
    </>
  );
}

export default function Scene(props: SceneProps) {
  const missRef = useRef({ down: [0, 0] as [number, number] });
  return (
    <Canvas
      shadows
      frameloop={props.paused ? 'never' : 'always'}
      dpr={[1, 2]}
      camera={{ fov: 30, near: 1, far: 1800, position: [90, 80, 220] }}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          props.onFail();
        });
      }}
      onPointerDown={(e) => (missRef.current.down = [e.clientX, e.clientY])}
      onPointerMissed={(e) => {
        const [x, y] = missRef.current.down;
        if (Math.hypot(e.clientX - x, e.clientY - y) < 6) props.onSelect(null);
      }}
      aria-label="Interactive 3D building envelope model"
    >
      <Content {...props} />
    </Canvas>
  );
}
