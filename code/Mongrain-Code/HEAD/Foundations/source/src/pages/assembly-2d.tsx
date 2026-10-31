import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { LAYERS, type LayerId } from "@/lib/layers";

const K = 4.6;
const OX = 600;
const OY = 375;
type V = [number, number, number];
const P = ([x, y, z]: V): [number, number] => [OX + (x - y) * K * 0.866, OY + (x + y) * K * 0.5 - z * K];
const pts = (vs: V[]) => vs.map((v) => P(v).map((n) => n.toFixed(1)).join(",")).join(" ");

function Box({ b, top, front, side, stroke = "#3a4048", sw = 0.9, frontFill, sideFill, topFill }: {
  b: [number, number, number, number, number, number]; top: string; front: string; side: string; stroke?: string; sw?: number; frontFill?: string; sideFill?: string; topFill?: string;
}) {
  const [x0, x1, y0, y1, z0, z1] = b;
  return (
    <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      <polygon points={pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])} fill={front} />
      {frontFill && <polygon points={pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])} fill={frontFill} stroke="none" />}
      <polygon points={pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]])} fill={side} />
      {sideFill && <polygon points={pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]])} fill={sideFill} stroke="none" />}
      <polygon points={pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]])} fill={top} />
      {topFill && <polygon points={pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]])} fill={topFill} stroke="none" />}
    </g>
  );
}

const ORDER: LayerId[] = ["soil", "footing", "wall", "membrane", "insulation", "drainage"];
const STEP = 1.05;
const delayOf = (id: LayerId) => 0.25 + ORDER.indexOf(id) * STEP;
const EASE = [0.22, 1, 0.36, 1] as const;

function Layer({ id, children, play }: { id: LayerId; children: React.ReactNode; play: boolean }) {
  const d = delayOf(id);
  return (
    <motion.g
      data-testid={`layer-${id}`}
      initial={{ opacity: 0, y: -46 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: -46 }}
      transition={{ duration: 0.95, delay: play ? d : 0, ease: EASE }}
    >
      {children}
    </motion.g>
  );
}

interface Callout { id: LayerId; anchor: V; side: "l" | "r"; ty: number }
const CALLOUTS: Callout[] = [
  { id: "wall", anchor: [27, 60, 88], side: "l", ty: 118 },
  { id: "footing", anchor: [24, 74, 16], side: "l", ty: 520 },
  { id: "membrane", anchor: [33.4, 66, 82], side: "r", ty: 118 },
  { id: "insulation", anchor: [37.6, 22, 62], side: "r", ty: 300 },
  { id: "drainage", anchor: [38.8, 52, 50], side: "r", ty: 470 },
];

function CalloutSvg({ c, play }: { c: Callout; play: boolean }) {
  const info = LAYERS.find((l) => l.id === c.id)!;
  const [ax, ay] = P(c.anchor);
  const tx = c.side === "l" ? 300 : 900;
  const textX = c.side === "l" ? 40 : 912;
  const d = delayOf(c.id) + 0.75;
  const words = info.body.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 27) { lines.push(cur.trim()); cur = w; } else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  const textBlock = (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={{ duration: 0.6, delay: play ? d + 0.45 : 0 }}>
      <text x={textX} y={c.ty - 6} fontSize={19} fontWeight={600} fill="#121820" style={{ letterSpacing: "-0.01em" }}>{info.title}:</text>
      {lines.map((l, i) => (
        <text key={i} x={textX} y={c.ty + 18 + i * 22} fontSize={17} fill="#2a313a">{l}</text>
      ))}
    </motion.g>
  );
  return (
    <g data-testid={`callout-${c.id}`}>
      <motion.path
        d={`M ${tx} ${c.ty} L ${c.side === "l" ? tx + 30 : tx - 30} ${c.ty} L ${ax} ${ay}`}
        fill="none" stroke="#1a3d7a" strokeWidth={1.1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: play ? d : 0, ease: EASE }}
      />
      <motion.circle cx={ax} cy={ay} r={3.6} fill="#fff" stroke="#1a3d7a" strokeWidth={1.4}
        initial={{ scale: 0 }} animate={{ scale: play ? 1 : 0 }} transition={{ delay: play ? d : 0, duration: 0.35 }} style={{ transformOrigin: `${ax}px ${ay}px` }} />
      {textBlock}
    </g>
  );
}

export default function Assembly2D() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [run, setRun] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    const ro = new ResizeObserver(() => setNarrow(el.clientWidth < 760));
    ro.observe(el);
    return () => { io.disconnect(); ro.disconnect(); };
  }, []);

  useEffect(() => {
    if (!play) { setDone(false); return; }
    const t = setTimeout(() => setDone(true), (delayOf("drainage") + 2) * 1000);
    return () => clearTimeout(t);
  }, [play, run]);

  const replay = () => {
    setPlay(false);
    setTimeout(() => { setRun((r) => r + 1); setPlay(true); }, 450);
  };

  // geometry
  const panels: [number, number][] = [[12, 30], [30.5, 49], [49.5, 68]];
  const hatch = "url(#hatch)";

  return (
    <PageFrame alt="/3d" altLabel="Interactive 3D">
      <div ref={ref} className="absolute inset-0 flex flex-col">
        <svg viewBox={narrow ? "310 40 600 680" : "0 30 1200 690"} className="flex-1 min-h-0 w-full" preserveAspectRatio="xMidYMid meet" style={{ fontFamily: "var(--app-font-sans)" }}>
          <defs>
            <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <path d="M0 0 L0 7 M3.5 0 L3.5 7" stroke="#8e8a82" strokeWidth="0.55" opacity="0.55" />
            </pattern>
            <pattern id="hatch2" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
              <path d="M0 0 L9 9 M9 0 L0 9" stroke="#8e8a82" strokeWidth="0.5" opacity="0.45" />
            </pattern>
            <pattern id="concrete" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="5" r="0.7" fill="#7d8186" opacity="0.5" />
              <circle cx="15" cy="11" r="0.5" fill="#7d8186" opacity="0.5" />
              <circle cx="9" cy="18" r="0.9" fill="#7d8186" opacity="0.35" />
            </pattern>
            <pattern id="dimple" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="skewY(30)">
              <circle cx="3" cy="3" r="1.4" fill="#e9eef2" stroke="#7e8a94" strokeWidth="0.4" />
            </pattern>
          </defs>

          <g key={run}>
            <Layer id="soil" play={play}>
              <Box b={[-6, 78, 0, 84, 0, 12]} top="#ecebe7" front="#e3e1db" side="#d7d4cc" topFill={hatch} frontFill="url(#hatch2)" sideFill="url(#hatch2)" />
              <Box b={[-6, 22, 4, 76, 12, 62]} top="#efeeea" front="#e4e2dc" side="#dad7cf" topFill={hatch} frontFill="url(#hatch2)" sideFill="url(#hatch2)" />
            </Layer>
            <Layer id="footing" play={play}>
              <Box b={[18, 58, 6, 74, 12, 20]} top="#d9dadb" front="#c2c4c6" side="#b3b6b9" topFill="url(#concrete)" frontFill="url(#concrete)" sideFill="url(#concrete)" />
              {[14, 26, 38, 50, 62].map((y) => { const [x1, y1] = P([45, y, 20]); return <ellipse key={y} cx={x1} cy={y1} rx={3.2} ry={1.8} fill="none" stroke="#1a3d7a" strokeWidth={1} />; })}
            </Layer>
            <Layer id="wall" play={play}>
              <Box b={[22, 32, 8, 72, 20, 88]} top="#dcddde" front="#c6c8ca" side="#d4d6d8" topFill="url(#concrete)" frontFill="url(#concrete)" sideFill="url(#concrete)" />
              {[24, 40, 56].map((y) => { const a = P([32, y, 20]); const b = P([32, y, 88]); return <line key={y} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#9a9ea2" strokeWidth={0.6} />; })}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const [x, y] = P([27, 10 + i * 0.2, 28 + i * 8]); return <circle key={i} cx={x} cy={y} r={1.3} fill="#4a5058" />; })}
              {[0, 1].map((i) => { const a = P([26 + i * 3, 12, 88]); return <line key={i} x1={a[0]} y1={a[1]} x2={a[0]} y2={a[1] - 14} stroke="#3a4048" strokeWidth={1.6} />; })}
            </Layer>
            <Layer id="membrane" play={play}>
              <Box b={[32, 33.4, 8, 72, 14, 86]} top="#2d5fc4" front="#123a8a" side="#1747a6" stroke="#0c2a66" sw={0.7} />
              <Box b={[32, 50, 4, 76, 12, 13.2]} top="#1d4fb0" front="#123a8a" side="#123a8a" stroke="#0c2a66" sw={0.6} />
            </Layer>
            <Layer id="insulation" play={play}>
              {panels.map(([y0, y1], i) => (
                <Box key={i} b={[33.4, 37.6, y0, y1, 20, i === 2 ? 58 : 80]} top="#5fd086" front="#1f9a4c" side="#2fb35e" stroke="#13612f" sw={0.8} />
              ))}
            </Layer>
            <Layer id="drainage" play={play}>
              <Box b={[37.6, 38.8, 34, 72, 20, 74]} top="#d7dde2" front="#a8b1b8" side="#c6cdd3" sideFill="url(#dimple)" stroke="#5f6b75" sw={0.7} />
              <Box b={[38.8, 58, 34, 72, 20, 21]} top="#d7dde2" front="#a8b1b8" side="#c6cdd3" topFill="url(#dimple)" stroke="#5f6b75" sw={0.6} />
              {[42, 52, 62].map((y) => { const [x, yy] = P([48, y, 21]); return <ellipse key={y} cx={x} cy={yy} rx={6} ry={3} fill="#bfe2f5" stroke="#3b7fae" strokeWidth={0.8} opacity={0.85} />; })}
            </Layer>
            {!narrow && CALLOUTS.map((c) => <CalloutSvg key={c.id} c={c} play={play} />)}
          </g>
        </svg>

        {narrow && (
          <ol className="shrink-0 px-4 pb-14 grid grid-cols-1 gap-1.5 max-h-[42%] overflow-y-auto">
            {LAYERS.slice(1).map((l) => (
              <motion.li key={l.id + run} initial={{ opacity: 0, y: 6 }} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 6 }} transition={{ delay: play ? delayOf(l.id) + 0.7 : 0, duration: 0.5 }} className="flex gap-2.5 text-[12.5px] leading-snug">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ background: l.color }} />
                <span><b className="font-semibold">{l.title}:</b> <span className="text-muted-foreground">{l.body}</span></span>
              </motion.li>
            ))}
          </ol>
        )}

        <button
          data-testid="button-replay"
          onClick={replay}
          aria-label="Replay assembly"
          className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-6 flex items-center gap-1.5 rounded-full border bg-background/80 backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-500 ${done ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <RotateCcw className="h-3 w-3" /> Replay
        </button>
      </div>
    </PageFrame>
  );
}
