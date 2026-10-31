import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { VOLUMES } from '@/lib/spec';
import { FOUNDATION_LAYERS } from './layers';
import { useDetailDialog, useLayerControls, useProjectedCallouts } from '../detail/useDetailInteractions';
import { LayerControls, LayerNavigation, ProjectedCallouts } from '../detail/LayerInteractions';

const FoundationCanvas = lazy(() => import('./FoundationCanvas'));
const N = FOUNDATION_LAYERS.length;

function Overview({ onReturn }: { onReturn(): void }) {
  const rects = VOLUMES.map((v) => {
    const xs = v.poly.map((p) => p[0]);
    const x0 = Math.min(...xs);
    return { id: v.id, x: x0, w: Math.max(...xs) - x0, top: v.base + v.height };
  }).sort((a, b) => b.top - a.top);
  return (
    <figure className="glass rounded-2xl p-3" data-testid="figure-foundation-overview">
      <button onClick={onReturn} aria-label="Return to the full building" data-testid="button-overview-return" className="focus-ring block w-full rounded-lg">
        <svg viewBox="-52 -6 160 62" className="h-auto w-full" role="img" aria-label="Building elevation with the foundation highlighted below grade.">
          <rect x="-52" y="45" width="160" height="10" fill="#0f9db5" fillOpacity="0.14" />
          <line x1="-52" x2="108" y1="45" y2="45" stroke="currentColor" strokeOpacity="0.3" />
          {rects.map((r) => (
            <rect key={r.id} x={r.x} y={45 - r.top} width={r.w} height={r.top} fill="#d3dbde" stroke="#6b7d85" strokeWidth="0.4" />
          ))}
          <rect x="-30" y="45" width="108" height="5" fill="#0f9db5" fillOpacity="0.55" stroke="#0f9db5" strokeWidth="0.8" />
          <text x="-50" y="54" fontSize="5" fill="#0f7a8e" fontFamily="DM Mono, monospace">FOUNDATION</text>
        </svg>
      </button>
      <figcaption className="font-data mt-1 hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:block">Foundation, below grade. Select to return.</figcaption>
    </figure>
  );
}

function Card({ i, compact }: { i: number; compact?: boolean }) {
  const l = FOUNDATION_LAYERS[i];
  return (
    <div className="glass rounded-2xl p-4 md:p-5" role="status" aria-live="polite" data-testid={compact ? 'card-foundation-mobile' : 'card-foundation-layer'}>
      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-primary">Layer {l.n} of {N}</p>
      <h2 className="font-display mt-1 text-2xl leading-none md:text-3xl">{l.name}</h2>
      <p className="mt-2 text-[13px] font-semibold md:mt-3">{l.material}</p>
      <p className={`mt-1.5 text-[13px] leading-relaxed text-foreground/80 ${compact ? 'line-clamp-3' : ''}`}>{l.role}</p>
    </div>
  );
}

interface Props {
  reduced: boolean;
  onClose(): void;
  onFail(): void;
}

export default function FoundationDetail({ reduced, onClose, onFail }: Props) {
  const { active, exploded, pick, go, toggleExploded } = useLayerControls(N, 'foundation');
  const { back, dialog } = useDetailDialog(go);
  const { lines, dots, chips, project } = useProjectedCallouts();

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Foundation assembly detail"
      data-testid="panel-foundation-detail"
      className="fixed inset-0 z-30 overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#f3f6f6_0%,#dfe5e7_70%,#cdd6d9_100%)]"
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="absolute inset-0" data-testid="canvas-foundation">
        <Suspense fallback={<p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-sm" role="status">Loading foundation detail…</p>}>
          <FoundationCanvas active={active} exploded={exploded} reduced={reduced} onPick={pick} onProject={project} onFail={onFail} />
        </Suspense>
      </div>

      <ProjectedCallouts layers={FOUNDATION_LAYERS} active={active} onPick={pick} lines={lines} dots={dots} />

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-7">
        <button ref={back} onClick={onClose} data-testid="button-foundation-back" className="focus-ring glass pointer-events-auto flex min-h-12 items-center gap-2 rounded-full px-4 text-[13px] font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to building
        </button>
        <div className="pointer-events-none max-w-[52%] text-right md:max-w-sm">
          <p className="font-data text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Foundation</p>
          <h1 className="font-display text-2xl leading-none md:text-4xl">Foundation assembly</h1>
          <p className="font-data mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-muted-foreground" data-testid="text-foundation-disclaimer">
            Illustrative assembly. Not verified hospital construction.
          </p>
        </div>
      </header>

      <div className="absolute left-7 top-32 hidden w-[340px] md:block">
        <Card i={active} />
        <p className="font-data mt-2 rounded-xl border border-dashed border-primary/60 px-3 py-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-foreground/70" data-testid="text-drainage-void-note">
          Dashed outline: drainage void. An open water path, not a material, so it has no layer number.
        </p>
      </div>
      <div className="absolute bottom-24 left-7 hidden w-[270px] md:block">
        <Overview onReturn={onClose} />
      </div>
      <div className="absolute right-3 top-[152px] w-[104px] md:hidden">
        <Overview onReturn={onClose} />
      </div>

      <LayerNavigation layers={FOUNDATION_LAYERS} active={active} onPick={pick} chips={chips}
        label="Foundation layers" testIdPrefix="button-foundation-layer-"
        className="absolute inset-x-3 bottom-[88px] md:inset-x-auto md:bottom-auto md:right-7 md:top-32 md:w-[250px]" />

      <div className="absolute inset-x-3 bottom-[148px] md:hidden">
        <Card i={active} compact />
        <p className="font-data mt-1.5 text-[9px] uppercase tracking-[0.1em] text-foreground/70">Dashed outline: drainage void, not a material.</p>
      </div>

      <LayerControls active={active} count={N} exploded={exploded} go={go} onToggleExploded={toggleExploded}
        label="Foundation controls" prevTestId="button-foundation-prev" nextTestId="button-foundation-next" explodeTestId="button-foundation-explode" />
    </motion.div>
  );
}
