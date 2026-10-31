import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { WALL_LAYERS } from '@/lib/wallLayers';
import SectionOverview from './SectionOverview';
import { useDetailDialog, useLayerControls, useProjectedCallouts } from '../detail/useDetailInteractions';
import { LayerControls, LayerNavigation, ProjectedCallouts } from '../detail/LayerInteractions';

const WallCanvas = lazy(() => import('./WallCanvas'));

interface Props {
  reduced: boolean;
  onClose(): void;
  onFail(): void;
}

function LayerCard({ i, compact }: { i: number; compact?: boolean }) {
  const l = WALL_LAYERS[i];
  return (
    <div className="glass rounded-2xl p-4 md:p-5" role="status" aria-live="polite" data-testid={compact ? 'card-layer-mobile' : 'card-layer'}>
      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-primary">
        Layer {l.n} of {WALL_LAYERS.length}
      </p>
      <h2 className="font-display mt-1 text-2xl leading-none md:text-3xl">{l.name}</h2>
      <p className="mt-2 text-[13px] font-semibold md:mt-3">{l.material}</p>
      <p className={`mt-1.5 text-[13px] leading-relaxed text-foreground/80 ${compact ? 'line-clamp-3' : ''}`}>{l.role}</p>
    </div>
  );
}

export default function WallDetail({ reduced, onClose, onFail }: Props) {
  const { active, exploded, pick, go, toggleExploded } = useLayerControls(WALL_LAYERS.length, 'walls');
  const { back, dialog } = useDetailDialog(go);
  const { lines, dots, chips, project } = useProjectedCallouts();

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Wall assembly detail"
      data-testid="panel-wall-detail"
      className="fixed inset-0 z-30 overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#f3f6f6_0%,#dfe5e7_70%,#cdd6d9_100%)]"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="absolute inset-0" data-testid="canvas-wall">
        <Suspense fallback={<p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-sm" role="status">Loading wall detail…</p>}>
          <WallCanvas active={active} exploded={exploded} reduced={reduced} onPick={pick} onProject={project} onFail={onFail} />
        </Suspense>
      </div>

      <ProjectedCallouts layers={WALL_LAYERS} active={active} onPick={pick} lines={lines} dots={dots} />

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-7">
        <button
          ref={back}
          onClick={onClose}
          data-testid="button-wall-back"
          className="focus-ring glass pointer-events-auto flex min-h-12 items-center gap-2 rounded-full px-4 text-[13px] font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to building
        </button>
        <div className="pointer-events-none max-w-[52%] text-right md:max-w-sm">
          <p className="font-data text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Walls</p>
          <h1 className="font-display text-2xl leading-none md:text-4xl">Wall assembly</h1>
          <p className="font-data mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-muted-foreground" data-testid="text-wall-disclaimer">
            Illustrative assembly. Not verified hospital construction.
          </p>
        </div>
      </header>

      <div className="absolute left-7 top-32 hidden w-[340px] md:block">
        <LayerCard i={active} />
      </div>
      <div className="absolute bottom-24 left-7 hidden w-[270px] md:block">
        <SectionOverview />
      </div>
      <div className="absolute right-3 top-[104px] w-[104px] md:hidden">
        <SectionOverview />
      </div>

      <LayerNavigation
        layers={WALL_LAYERS} active={active} onPick={pick} chips={chips}
        label="Wall layers" testIdPrefix="button-layer-"
        className="absolute inset-x-3 bottom-[88px] md:inset-x-auto md:right-7 md:top-32 md:bottom-auto md:w-[230px]"
      />

      <div className="absolute inset-x-3 bottom-[148px] md:hidden">
        <LayerCard i={active} compact />
      </div>

      <LayerControls active={active} count={WALL_LAYERS.length} exploded={exploded} go={go} onToggleExploded={toggleExploded}
        label="Wall controls" prevTestId="button-layer-prev" nextTestId="button-layer-next" explodeTestId="button-wall-explode" />
    </motion.div>
  );
}
