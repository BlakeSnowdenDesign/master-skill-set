import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Pause, Play, RotateCcw, Square } from 'lucide-react';
import { ROOF_COUNT, ROOF_LAYERS, ROOF_NOTICE } from '@/lib/roofLayers';
import RoofLocator from './RoofLocator';
import { useDetailDialog, useLayerControls, useProjectedCallouts } from '../detail/useDetailInteractions';
import { LayerControls, LayerNavigation, ProjectedCallouts } from '../detail/LayerInteractions';

const RoofCanvas = lazy(() => import('./RoofCanvas'));

interface Props {
  reduced: boolean;
  onClose(): void;
  onFail(): void;
}

function LayerCard({ i, compact, guide }: { i: number; compact?: boolean; guide: boolean }) {
  const l = ROOF_LAYERS[i];
  return (
    <div className="glass rounded-2xl p-4 md:p-5" role="status" aria-live="polite" data-testid={compact ? 'card-layer-mobile' : 'card-layer'}>
      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-primary">
        {guide ? `Guided assembly, step ${l.n} of ${ROOF_COUNT}` : `Layer ${l.n} of ${ROOF_COUNT}`}
      </p>
      <h2 className="font-display mt-1 text-2xl leading-none md:text-3xl">{l.name}</h2>
      <p className="mt-2 text-[13px] font-semibold md:mt-3">{l.material}</p>
      <p className={`mt-1.5 text-[13px] leading-relaxed text-foreground/80 ${compact ? 'line-clamp-3' : ''}`}>{guide ? l.guide : l.role}</p>
      {!compact && <p className="font-data mt-3 border-t border-foreground/10 pt-2.5 text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">Waterproofing is above the insulation. Small fixed parapet shown for context only.</p>}
    </div>
  );
}

export default function RoofDetail({ reduced, onClose, onFail }: Props) {
  const [mode, setMode] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const guided = mode !== 'idle';
  const shown = guided ? step + 1 : ROOF_COUNT;
  const stopGuide = useCallback(() => setMode('idle'), []);
  const { active, setActive, exploded, setExploded, pick, go, toggleExploded } = useLayerControls(ROOF_COUNT, 'roof', stopGuide);
  const { back, dialog } = useDetailDialog(go);
  const { lines, dots, chips, project } = useProjectedCallouts();

  useEffect(() => {
    if (mode !== 'playing') return;
    const id = window.setTimeout(() => {
      if (step < ROOF_COUNT - 1) {
        setStep(step + 1);
        setActive(step + 1);
      } else {
        setMode('idle');
        setDone(true);
        setExploded(false);
      }
    }, 3400);
    return () => window.clearTimeout(id);
  }, [mode, step, setActive, setExploded]);

  const toggleGuide = () => {
    if (mode === 'playing') setMode('paused');
    else if (mode === 'paused') setMode('playing');
    else {
      setStep(0);
      setActive(0);
      setDone(false);
      setExploded(false);
      setMode('playing');
    }
  };

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Conventional roof detail"
      data-testid="panel-roof-detail"
      className="fixed inset-0 z-30 overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#f3f6f6_0%,#dfe5e7_70%,#cdd6d9_100%)]"
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="absolute inset-0" data-testid="canvas-roof">
        <Suspense fallback={<p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-sm" role="status">Loading roof detail…</p>}>
          <RoofCanvas active={active} exploded={exploded} shown={shown} guidePaused={mode === 'paused'} reduced={reduced} onPick={pick} onProject={project} onFail={onFail} />
        </Suspense>
      </div>

      <ProjectedCallouts layers={ROOF_LAYERS} active={active} onPick={pick} lines={lines} dots={dots} shown={shown} />

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-7">
        <button
          ref={back}
          onClick={onClose}
          data-testid="button-roof-back"
          className="focus-ring glass pointer-events-auto flex min-h-12 items-center gap-2 rounded-full px-4 text-[13px] font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to building
        </button>
        <div className="pointer-events-none max-w-[52%] text-right md:max-w-sm">
          <p className="font-data text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Roof</p>
          <h1 className="font-display text-2xl leading-none md:text-4xl">Conventional roof</h1>
          <p className="font-data mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-muted-foreground" data-testid="text-roof-disclaimer">
            {ROOF_NOTICE}
          </p>
        </div>
      </header>

      <div className="absolute left-7 top-32 hidden w-[320px] md:block">
        <LayerCard i={active} guide={guided} />
      </div>
      <div className="absolute bottom-24 left-7 hidden w-[230px] md:block">
        <RoofLocator />
      </div>
      <div className="absolute right-3 top-[130px] w-[104px] md:hidden">
        <RoofLocator />
      </div>

      <LayerNavigation
        layers={ROOF_LAYERS} active={active} onPick={pick} chips={chips}
        label="Roof layers" testIdPrefix="button-layer-" truncateNames
        className="absolute inset-x-3 bottom-[88px] md:inset-x-auto md:right-7 md:top-32 md:bottom-auto md:w-[250px]"
      />

      <div className="absolute inset-x-3 bottom-[148px] md:hidden">
        <LayerCard i={active} compact guide={guided} />
      </div>

      <LayerControls active={active} count={ROOF_COUNT} exploded={exploded} go={go} onToggleExploded={toggleExploded}
        label="Roof controls" prevTestId="button-layer-prev" nextTestId="button-layer-next" explodeTestId="button-roof-explode" compactExplode>
        <button
          onClick={toggleGuide}
          data-testid="button-roof-guide"
          aria-label={mode === 'playing' ? 'Pause guided assembly' : mode === 'paused' ? 'Resume guided assembly' : done ? 'Replay guided assembly' : 'Play guided assembly'}
          className="focus-ring flex min-h-12 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium hover:bg-white/80 active:scale-95"
        >
          {mode === 'playing' ? <Pause className="h-[18px] w-[18px]" /> : done && mode === 'idle' ? <RotateCcw className="h-[18px] w-[18px]" /> : <Play className="h-[18px] w-[18px]" />}
          <span className="hidden lg:inline">{mode === 'playing' ? 'Pause' : mode === 'paused' ? 'Resume' : done ? 'Replay' : 'Guided assembly'}</span>
        </button>
        {guided && (
          <button onClick={stopGuide} data-testid="button-roof-guide-stop" aria-label="Stop guided assembly" className="focus-ring flex min-h-12 items-center gap-2 rounded-full px-3 text-[13px] font-medium hover:bg-white/80 active:scale-95">
            <Square className="h-4 w-4" />
            <span className="hidden lg:inline">Stop</span>
          </button>
        )}
      </LayerControls>
    </motion.div>
  );
}
