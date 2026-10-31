import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers3, RotateCcw } from 'lucide-react';
import { SUB_GRADE_LAYERS, subGradeLayer, type SubGradeId } from './subGradeLayers';

// Isometric section that builds itself layer by layer (ported from Foundations/source assembly-2d).
const K = 4.6;
const OX = 600;
const OY = 375;
type V = [number, number, number];
const P = ([x, y, z]: V): [number, number] => [OX + (x - y) * K * 0.866, OY + (x + y) * K * 0.5 - z * K];
const pts = (vs: V[]) => vs.map((v) => P(v).map((n) => n.toFixed(1)).join(',')).join(' ');

function Box({ b, id, frontFill, sideFill, topFill, sw = 0.9 }: {
  b: [number, number, number, number, number, number]; id: SubGradeId; frontFill?: string; sideFill?: string; topFill?: string; sw?: number;
}) {
  const [x0, x1, y0, y1, z0, z1] = b;
  const { top, front, side, stroke } = subGradeLayer(id);
  const faces: [V[], string, string | undefined][] = [
    [[[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], front, frontFill],
    [[[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], side, sideFill],
    [[[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], top, topFill],
  ];
  return <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
    {faces.map(([face, fill, texture], i) => <g key={i}>
      <polygon points={pts(face)} fill={fill} />
      {texture && <polygon points={pts(face)} fill={texture} stroke="none" />}
    </g>)}
  </g>;
}

const ORDER: SubGradeId[] = ['soil', 'footing', 'wall', 'membrane', 'insulation', 'drainage'];
const STEP = 1.05;
const delayOf = (id: SubGradeId) => 0.25 + ORDER.indexOf(id) * STEP;
const EASE = [0.22, 1, 0.36, 1] as const;

// Separated view: each layer slides out along the wall normal (iso x), the footing drops and the soil steps back.
const SPREAD: Record<SubGradeId, V> = {
  soil: [-12, 0, 0], footing: [0, 0, -7], wall: [0, 0, 0], membrane: [9, 0, 0], insulation: [18, 0, 0], drainage: [27, 0, 0],
};
const offset = (id: SubGradeId, apart: boolean) => {
  if (!apart) return { x: 0, y: 0 };
  const [x, y, z] = SPREAD[id];
  return { x: (x - y) * K * 0.866, y: (x + y) * K * 0.5 - z * K };
};

function Layer({ id, children, play, instant, apart, settled }: { id: SubGradeId; children: ReactNode; play: boolean; instant: boolean; apart: boolean; settled: boolean }) {
  const o = offset(id, apart);
  return <motion.g
    data-testid={`build-layer-${id}`}
    initial={instant ? false : { opacity: 0, x: 0, y: -46 }}
    animate={play ? { opacity: 1, x: o.x, y: o.y } : { opacity: 0, x: 0, y: -46 }}
    transition={instant ? { duration: 0 } : settled ? { duration: 0.8, ease: EASE } : { duration: 0.95, delay: play ? delayOf(id) : 0, ease: EASE }}
  >{children}</motion.g>;
}

interface Callout { id: SubGradeId; anchor: V; side: 'l' | 'r'; ty: number }
const CALLOUTS: Callout[] = [
  { id: 'wall', anchor: [27, 60, 88], side: 'l', ty: 112 },
  { id: 'footing', anchor: [24, 74, 16], side: 'l', ty: 520 },
  { id: 'membrane', anchor: [33.4, 66, 82], side: 'r', ty: 112 },
  { id: 'insulation', anchor: [37.6, 22, 62], side: 'r', ty: 300 },
  { id: 'drainage', anchor: [38.8, 52, 50], side: 'r', ty: 470 },
];

function wrap(text: string, max = 27) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) { lines.push(line.trim()); line = word; } else line += ' ' + word;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function CalloutSvg({ c, play, instant, apart, settled }: { c: Callout; play: boolean; instant: boolean; apart: boolean; settled: boolean }) {
  const info = subGradeLayer(c.id);
  const o = offset(c.id, apart);
  const [ax, ay] = [P(c.anchor)[0] + o.x, P(c.anchor)[1] + o.y];
  const tx = c.side === 'l' ? 300 : 900;
  const textX = c.side === 'l' ? 40 : 912;
  const d = delayOf(c.id) + 0.75;
  const t = (delay: number, duration: number) => instant ? { duration: 0 } : settled ? { duration: 0.8, ease: EASE } : { duration, delay: play ? delay : 0, ease: EASE };
  return <g data-testid={`build-callout-${c.id}`}>
    <motion.path
      fill="none" stroke="#087c91" strokeWidth={1.1}
      initial={instant ? false : { pathLength: 0, opacity: 0, d: `M ${tx} ${c.ty} L ${c.side === 'l' ? tx + 30 : tx - 30} ${c.ty} L ${ax} ${ay}` }}
      animate={{ d: `M ${tx} ${c.ty} L ${c.side === 'l' ? tx + 30 : tx - 30} ${c.ty} L ${ax} ${ay}`, ...(play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }) }}
      transition={t(d, 0.7)}
    />
    <motion.circle r={3.6} fill="#fff" stroke="#087c91" strokeWidth={1.4}
      initial={instant ? false : { scale: 0, cx: ax, cy: ay }} animate={{ scale: play ? 1 : 0, cx: ax, cy: ay }} transition={t(d, 0.35)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
    <motion.g initial={instant ? false : { opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={t(d + 0.45, 0.6)}>
      <text x={textX} y={c.ty - 6} fontSize={19} fontWeight={600} fill="#17323a" style={{ letterSpacing: '-0.01em' }}>{info.title}</text>
      {wrap(info.body).map((line, i) => <text key={i} x={textX} y={c.ty + 18 + i * 22} fontSize={16.5} fill="#486168">{line}</text>)}
    </motion.g>
  </g>;
}

export default function SubGradeBuild2D() {
  const reducedMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [run, setRun] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [done, setDone] = useState(false);
  const [apart, setApart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    const ro = new ResizeObserver(() => setNarrow(el.clientWidth < 700));
    ro.observe(el);
    return () => { io.disconnect(); ro.disconnect(); };
  }, []);

  useEffect(() => {
    if (!play) { setDone(false); return; }
    const timer = setTimeout(() => setDone(true), reducedMotion ? 0 : (delayOf('drainage') + 2) * 1000);
    return () => clearTimeout(timer);
  }, [play, run, reducedMotion]);

  const replay = () => {
    setApart(false);
    setPlay(false);
    setTimeout(() => { setRun((r) => r + 1); setPlay(true); }, 450);
  };

  const panels: [number, number][] = [[12, 30], [30.5, 49], [49.5, 68]];
  const layer = { play, instant: reducedMotion, apart, settled: done };

  return <figure className="fs-build" ref={ref} data-testid="figure-subgrade-build" aria-label="Animated section: the sub-grade assembly builds up layer by layer, from excavation and footing to the shoring wall, membrane, insulation and drainage.">
    <svg viewBox={narrow ? (apart ? '250 20 760 720' : '300 40 610 660') : '0 30 1200 690'} preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
      <defs>
        <pattern id="sg-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <path d="M0 0 L0 7 M3.5 0 L3.5 7" stroke="#8e8a82" strokeWidth="0.55" opacity="0.55" />
        </pattern>
        <pattern id="sg-hatch2" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <path d="M0 0 L9 9 M9 0 L0 9" stroke="#8e8a82" strokeWidth="0.5" opacity="0.45" />
        </pattern>
        <pattern id="sg-concrete" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="5" r="0.7" fill="#6f7f83" opacity="0.5" />
          <circle cx="15" cy="11" r="0.5" fill="#6f7f83" opacity="0.5" />
          <circle cx="9" cy="18" r="0.9" fill="#6f7f83" opacity="0.35" />
        </pattern>
        <pattern id="sg-dimple" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="skewY(30)">
          <circle cx="3" cy="3" r="1.4" fill="#e9eef0" stroke="#7a8b91" strokeWidth="0.4" />
        </pattern>
      </defs>
      <g key={run}>
        <Layer id="soil" {...layer}>
          <Box id="soil" b={[-6, 78, 0, 84, 0, 12]} topFill="url(#sg-hatch)" frontFill="url(#sg-hatch2)" sideFill="url(#sg-hatch2)" />
          <Box id="soil" b={[-6, 22, 4, 76, 12, 62]} topFill="url(#sg-hatch)" frontFill="url(#sg-hatch2)" sideFill="url(#sg-hatch2)" />
        </Layer>
        <Layer id="footing" {...layer}>
          <Box id="footing" b={[18, 58, 6, 74, 12, 20]} topFill="url(#sg-concrete)" frontFill="url(#sg-concrete)" sideFill="url(#sg-concrete)" />
          {[14, 26, 38, 50, 62].map((y) => { const [x1, y1] = P([45, y, 20]); return <ellipse key={y} cx={x1} cy={y1} rx={3.2} ry={1.8} fill="none" stroke="#087c91" strokeWidth={1} />; })}
        </Layer>
        <Layer id="wall" {...layer}>
          <Box id="wall" b={[22, 32, 8, 72, 20, 88]} topFill="url(#sg-concrete)" frontFill="url(#sg-concrete)" sideFill="url(#sg-concrete)" />
          {[24, 40, 56].map((y) => { const a = P([32, y, 20]); const b = P([32, y, 88]); return <line key={y} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#93a0a3" strokeWidth={0.6} />; })}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const [x, y] = P([27, 10 + i * 0.2, 28 + i * 8]); return <circle key={i} cx={x} cy={y} r={1.3} fill="#435a5f" />; })}
          {[0, 1].map((i) => { const a = P([26 + i * 3, 12, 88]); return <line key={i} x1={a[0]} y1={a[1]} x2={a[0]} y2={a[1] - 14} stroke="#33494e" strokeWidth={1.6} />; })}
        </Layer>
        <Layer id="membrane" {...layer}>
          <Box id="membrane" b={[32, 33.4, 8, 72, 14, 86]} sw={0.7} />
          <Box id="membrane" b={[32, 50, 4, 76, 12, 13.2]} sw={0.6} />
        </Layer>
        <Layer id="insulation" {...layer}>
          {panels.map(([y0, y1], i) => <Box key={i} id="insulation" b={[33.4, 37.6, y0, y1, 20, i === 2 ? 58 : 80]} sw={0.8} />)}
        </Layer>
        <Layer id="drainage" {...layer}>
          <Box id="drainage" b={[37.6, 38.8, 34, 72, 20, 74]} sideFill="url(#sg-dimple)" sw={0.7} />
          <Box id="drainage" b={[38.8, 58, 34, 72, 20, 21]} topFill="url(#sg-dimple)" sw={0.6} />
          {[42, 52, 62].map((y) => { const [x, yy] = P([48, y, 21]); return <ellipse key={y} cx={x} cy={yy} rx={6} ry={3} fill="#bfe8f0" stroke="#11a8be" strokeWidth={0.8} opacity={0.85} />; })}
        </Layer>
        {!narrow && CALLOUTS.map((c) => <CalloutSvg key={c.id} c={c} {...layer} />)}
      </g>
    </svg>
    {narrow && <ol className="fs-build-key">
      {SUB_GRADE_LAYERS.slice(1).map((l) => <motion.li key={l.id + run}
        initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 6 }}
        transition={reducedMotion ? { duration: 0 } : { delay: play ? delayOf(l.id) + 0.7 : 0, duration: 0.5 }}>
        <i style={{ background: l.side }} /><span><b>{l.title}</b> {l.body}</span>
      </motion.li>)}
    </ol>}
    <div className={`fs-build-actions${done ? ' is-ready' : ''}`}>
      <button onClick={() => setApart((v) => !v)} aria-pressed={apart} tabIndex={done ? 0 : -1} className={apart ? 'is-active' : ''} data-testid="button-build-separate">
        <Layers3 size={14} /> {apart ? 'Put the layers back' : 'Separate the layers'}
      </button>
      <button onClick={replay} tabIndex={done ? 0 : -1} aria-label="Replay the assembly animation" data-testid="button-build-replay">
        <RotateCcw size={14} /> Replay
      </button>
    </div>
  </figure>;
}
