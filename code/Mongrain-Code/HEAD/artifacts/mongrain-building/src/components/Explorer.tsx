import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Focus, Images, Layers, Play, X, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { ZONES, type Zone } from '@/lib/spec';
import { trackEvent } from '@/lib/analytics';
import type { SceneApi } from './Scene';
import CopyWixHtml from './CopyWixHtml';

declare const __WIX_EMBED__: boolean | undefined;
const isWixEmbed = typeof __WIX_EMBED__ !== 'undefined' && __WIX_EMBED__;

const Scene = lazy(() => import('./Scene'));

const WallDetail = lazy(() => import('./wall/WallDetail'));
const FoundationDetail = lazy(() => import('./foundation/FoundationDetail'));

const RoofDetail = lazy(() => import('./roof/RoofDetail'));
const BASE = import.meta.env.BASE_URL;
declare const __EMBEDDED_ASSETS__: Record<string, string> | undefined;
const asset = (n: string) =>
  (typeof __EMBEDDED_ASSETS__ !== 'undefined' && __EMBEDDED_ASSETS__?.[n]) ||
  `${BASE}assets/${n}`.replace(/\/{2,}/g, '/');

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [r, setR] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const f = () => setR(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return r;
}

class Boundary extends Component<{ onError(): void; children: ReactNode }, { bad: boolean }> {
  state = { bad: false };
  static getDerivedStateFromError() {
    return { bad: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.bad ? null : this.props.children;
  }
}

function Fallback({ onRetry }: { onRetry(): void }) {
  return (
    <div className="absolute inset-0 z-30 grid place-items-center bg-[#0d1a1f] p-6" role="alert" data-testid="status-webgl-error">
      <div className="max-w-xl text-center text-[#d8e6ea]">
        <img src={asset('logo-white.png')} alt="Mongrain" className="mx-auto h-24 w-auto object-contain" />
        <h1 className="font-display mt-6 text-4xl">The 3D view could not start</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#9db3ba]">
          This explorer needs WebGL, which is unavailable or was interrupted in this browser. Enable hardware acceleration or try another browser. The supplied reference rendering is shown below.
        </p>
        <img src={asset('ref-a.png')} alt="Reference rendering of the hospital, Pavillon A highlighted" className="mx-auto mt-6 w-full rounded-lg opacity-95" />
        <button
          onClick={onRetry}
          data-testid="button-retry-webgl"
          className="focus-ring mt-6 min-h-12 rounded-full bg-[#12b5d1] px-7 text-sm font-semibold text-[#06242b] hover:brightness-110"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function ToolButton(props: { label: string; icon: ReactNode; onClick(): void; id: string; wide?: boolean; active?: boolean }) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.label}
      aria-pressed={props.active}
      title={props.label}
      data-testid={`button-${props.id}`}
      className="focus-ring group flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3.5 text-[13px] font-medium text-foreground transition-colors hover:bg-white/80 active:scale-95 aria-pressed:bg-primary aria-pressed:text-primary-foreground"
    >
      {props.icon}
      {props.wide && <span className="hidden lg:inline">{props.label}</span>}
    </button>
  );
}

export default function Explorer() {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(() => hasWebGL());
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState<Zone | null>(null);
  const [hovered, setHovered] = useState<Zone | null>(null);
  const [stage, setStage] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [compare, setCompare] = useState(false);
  const [refTab, setRefTab] = useState<'a' | 'b'>('a');
  const [phase, setPhaseState] = useState<'idle' | 'in' | 'detail' | 'out'>('idle');
  const phaseRef = useRef<'idle' | 'in' | 'detail' | 'out'>('idle');
  const token = useRef(0);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const fdetail = phase === 'detail' && activeZone === 'foundation';
  const rdetail = phase === 'detail' && activeZone === 'roof';
  const wdetail = phase === 'detail' && activeZone === 'walls';
  const [ready, setReady] = useState(false);
  const [minWait, setMinWait] = useState(false);
  const api = useRef<SceneApi | null>(null);
  const setPhase = useCallback((p: 'idle' | 'in' | 'detail' | 'out') => {
    phaseRef.current = p;
    setPhaseState(p);
  }, []);
  const exitDetail = useCallback((reason: 'user' | 'recovery' = 'user') => {
    const ph = phaseRef.current;
    if (ph !== 'in' && ph !== 'detail') return;
    if (reason === 'user' && activeZone) trackEvent('envelope_building_returned', { section: activeZone });
    const tok = ++token.current;
    setPhase('out');
    const finish = () => {
      if (token.current !== tok) return;
      setPhase('idle');
      setSelected(null);
      setActiveZone(null);
    };
    if (api.current) api.current.exitZone(finish);
    else finish();
  }, [setPhase, activeZone]);
  const closeDetail = useCallback(() => exitDetail(), [exitDetail]);
  const detailFailed = useCallback(() => exitDetail('recovery'), [exitDetail]);
  const exitRef = useRef(exitDetail);
  exitRef.current = exitDetail;

  useEffect(() => {
    document.title = 'Mongrain | Building Envelope Explorer';
    const t = window.setTimeout(() => setMinWait(true), 1300);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (phaseRef.current !== 'idle') {
        exitRef.current();
        return;
      }
      setSelected(null);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const fail = useCallback(() => {
    token.current++;
    phaseRef.current = 'idle';
    setPhaseState('idle');
    setSelected(null);
    setActiveZone(null);
    setOk(false);
  }, []);
  const select = useCallback((z: Zone | null) => {
    if (phaseRef.current !== 'idle') {
      if (z === null) exitRef.current();
      return;
    }
    setSelected(z);
    if (!z) return;
    trackEvent('envelope_section_selected', { section: z });
    setHovered(null);
    setActiveZone(z);
    const a = api.current;
    if (!a) {
      setPhase('detail');
      return;
    }
    const tok = ++token.current;
    setPhase('in');
    a.enterZone(z, () => {
      if (token.current === tok) setPhase('detail');
    });
  }, [setPhase]);
  const hover = useCallback((z: Zone | null) => setHovered(z), []);
  const onReady = useCallback(() => setReady(true), []);

  const assemblingZone = stage > 0 && stage < 4
    ? ZONES.find((z) => z.order === stage) ?? null
    : null;
  const sel = ZONES.find((z) => z.id === selected) ?? assemblingZone;
  const automaticCallout = !selected && !!assemblingZone;
  const statusText = stage === 4 ? 'Envelope complete' : stage === 0 ? (exploded ? 'Envelope exploded' : 'Exploded envelope') : ['', 'Placing foundation', 'Raising walls', 'Setting roof'][stage];

  return (
    <div data-transition-phase={phase} data-active-section={activeZone ?? ''} className="relative h-[100dvh] w-full overflow-hidden bg-[#E8EBEC] select-none">
      {ok ? (
        <Boundary key={attempt} onError={fail}>
          <div className="absolute inset-0" data-testid="canvas-building">
            <Suspense fallback={null}>
              <Scene
                selected={selected}
                hovered={hovered}
                reduced={reduced}
                apiRef={api}
                onSelect={select}
                onHover={hover}
                onStage={setStage}
                onExploded={setExploded}
                onReady={onReady}
                onFail={fail}
                paused={phase === 'detail'}
                locked={phase !== 'idle'}
              />
            </Suspense>
          </div>
        </Boundary>
      ) : (
        <Fallback
          onRetry={() => {
            const g = hasWebGL();
            setOk(g);
            setAttempt((a) => a + 1);
          }}
        />
      )}

      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_55%,rgba(150,170,178,0.28)_100%)]" />

      {/* header */}
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 p-4 md:p-7">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-4"
        >
          <img src={asset('logo-cyan.png')} alt="Mongrain" className="h-12 w-auto object-contain md:h-16" data-testid="img-logo" />
          <div className="border-l border-foreground/15 pl-4">
            <p className="font-data text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Building envelope</p>
            <h1 className="font-display text-2xl leading-none md:text-4xl">Building envelope</h1>
          </div>
        </motion.div>
        <div className="pointer-events-auto">
          <button
            onClick={() => setCompare((c) => !c)}
            aria-pressed={compare}
            data-testid="button-compare"
            className="focus-ring glass flex min-h-12 items-center gap-2 rounded-full px-4 text-[13px] font-medium aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <Images className="h-4 w-4" />
            <span className="hidden sm:inline">Reference images</span>
          </button>
        </div>
      </header>

      {/* status */}
      <div className="pointer-events-none absolute left-1/2 top-5 z-10 hidden -translate-x-1/2 md:block" aria-live="polite">
        <div className="glass font-data flex items-center gap-3 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em]" data-testid="text-status">
          <span className={`h-1.5 w-1.5 rounded-full ${stage > 0 && stage < 4 ? 'animate-pulse bg-primary' : 'bg-foreground/30'}`} />
          {statusText}
        </div>
      </div>

      {/* zones */}
      <aside className="absolute inset-x-3 bottom-[88px] z-10 md:inset-x-auto md:bottom-auto md:right-7 md:top-[104px] md:w-[352px]" aria-label="Envelope zones">
        <div className="glass rounded-2xl p-2">
          <p className="font-data px-3 pb-2 pt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Envelope layers</p>
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-1">
            {ZONES.map((z) => {
              const active = selected === z.id;
              const placing = assemblingZone?.id === z.id;
              const placed = stage > z.order;
              return (
                <button
                  key={z.id}
                  onClick={() => select(active ? null : z.id)}
                  onMouseEnter={() => hover(z.id)}
                  onMouseLeave={() => hover(null)}
                  aria-pressed={active}
                  data-testid={`button-zone-${z.id}`}
                  className={`focus-ring relative flex min-h-14 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 ${
                    active ? 'bg-foreground text-white' : placing ? 'bg-primary/15 ring-1 ring-primary/40' : hovered === z.id ? 'bg-white/90' : 'hover:bg-white/70'
                  }`}
                >
                  <span className={`font-data text-[11px] ${active ? 'text-primary' : 'text-muted-foreground'}`}>0{z.order}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-tight">{z.label}</span>
                    <span className={`hidden text-xs md:block ${active ? 'text-white/60' : 'text-muted-foreground'}`}>{z.tag}</span>
                  </span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-500 ${placed ? 'bg-primary text-white' : 'border border-foreground/20'}`}
                    aria-hidden
                  >
                    {placed ? <Check className="h-3 w-3" /> : placing ? <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {sel && (
            <motion.div
              key={sel.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass mt-2 hidden rounded-2xl p-5 md:block"
              data-testid={`card-zone-${sel.id}`}
              role="status"
              aria-live="polite"
            >
              {automaticCallout && <p className="font-data mb-3 text-[10px] uppercase tracking-[0.16em] text-primary">Assembly 0{sel.order} / 03</p>}
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-3xl leading-none">{sel.label} system</h2>
                {!automaticCallout && (
                <button
                  onClick={() => select(null)}
                  aria-label="Clear selection"
                  data-testid="button-clear-selection"
                  className="focus-ring -mr-2 -mt-2 grid h-11 w-11 place-items-center rounded-full hover:bg-white/80"
                >
                  <X className="h-4 w-4" />
                </button>
                )}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-foreground/80">{sel.summary}</p>
              <ul className="mt-4 space-y-1.5 border-t border-foreground/10 pt-4">
                {sel.parts.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[13px]">
                    <span className="h-px w-4 bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              {sel.id === 'roof' && <button
                onClick={() => select('roof')}
                data-testid="button-explore-roof"
                className="focus-ring mt-4 min-h-11 w-full rounded-full bg-foreground px-4 text-[13px] font-semibold text-white hover:brightness-125"
              >
                Explore conventional roof
              </button>
              }
              <p className="font-data mt-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Generic system overview. Simplified.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* mobile selection note */}
      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass absolute inset-x-3 top-[84px] z-10 rounded-2xl p-3.5 md:hidden"
            role="status"
            aria-live="polite"
            data-testid={`mobile-callout-${sel.id}`}
          >
            <p className="text-[13px] leading-snug">
              <span className="font-semibold">{automaticCallout ? `0${sel.order} / 03 · ` : ''}{sel.label} system. </span>
              {sel.summary}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{sel.parts.join(' · ')}</p>
            {sel.id === 'roof' && (
              <button onClick={() => select('roof')} data-testid="button-explore-roof-mobile" className="focus-ring mt-2 min-h-11 w-full rounded-full bg-foreground px-4 text-[13px] font-semibold text-white">
                Explore conventional roof
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* compare */}
      <AnimatePresence>
        {compare && (
          <motion.section
            initial={reduced ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="glass absolute bottom-[150px] left-3 right-3 z-20 rounded-2xl p-3 md:bottom-[84px] md:left-7 md:right-auto md:w-[min(600px,46vw)] md:p-4"
            aria-label="Reference comparison"
            data-testid="panel-compare"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex gap-1 rounded-full bg-black/5 p-1" role="tablist">
                {(['a', 'b'] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={refTab === t}
                    onClick={() => setRefTab(t)}
                    data-testid={`tab-ref-${t}`}
                    className={`focus-ring min-h-10 rounded-full px-4 text-[13px] font-medium transition-colors ${refTab === t ? 'bg-foreground text-white' : 'hover:bg-white/70'}`}
                  >
                    Pavillon {t.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCompare(false)}
                aria-label="Close reference images"
                data-testid="button-close-compare"
                className="focus-ring grid h-11 w-11 place-items-center rounded-full hover:bg-white/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={asset(refTab === 'a' ? 'ref-a.png' : 'ref-b.png')}
              alt={`Project reference rendering, Pavillon ${refTab.toUpperCase()}`}
              className="w-full rounded-xl bg-white"
              data-testid="img-reference"
            />
            <p className="font-data mt-2.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Project reference rendering, for comparison with the model</p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* caption */}
      <p className="font-data pointer-events-none absolute bottom-3 left-4 z-10 hidden max-w-[300px] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground md:bottom-7 md:left-7 md:block" data-testid="text-disclaimer">
        {!compare && (
          <>
            Illustrative architectural representation.
            <br />
            Not an as-built BIM model.
          </>
        )}
      </p>

      {/* toolbar */}
      <motion.nav
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="glass absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-full p-1.5 md:bottom-6"
        aria-label="Model controls"
        inert={phase !== 'idle'}
      >
        <ToolButton id="replay" label="Replay assembly" icon={<Play className="h-[18px] w-[18px]" />} onClick={() => api.current?.replay()} wide />
        <ToolButton
          id="explode"
          label={exploded ? 'Reassemble' : 'Explode'}
          icon={<Layers className="h-[18px] w-[18px]" />}
          onClick={() => {
            if (!api.current || phaseRef.current !== 'idle') return;
            api.current.toggleExplode();
            trackEvent('envelope_assembly_toggled', { section: 'building', action: exploded ? 'reassemble' : 'explode' });
          }}
          wide
          active={exploded}
        />
        <span className="mx-1 h-6 w-px bg-foreground/10" />
        <ToolButton id="zoom-in" label="Zoom in" icon={<ZoomIn className="h-[18px] w-[18px]" />} onClick={() => api.current?.zoom(0.78)} />
        <ToolButton id="zoom-out" label="Zoom out" icon={<ZoomOut className="h-[18px] w-[18px]" />} onClick={() => api.current?.zoom(1.28)} />
        <ToolButton id="reset" label="Reset view" icon={<Focus className="h-[18px] w-[18px]" />} onClick={() => api.current?.reset()} wide />
        {!isWixEmbed && <CopyWixHtml />}
      </motion.nav>

      {/* hint */}
      <p className="font-data pointer-events-none absolute bottom-7 right-7 z-0 hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground xl:block">
        Drag to orbit. Scroll to zoom. Click a layer to isolate.
      </p>

      {/* wall detail */}
      <AnimatePresence>
        {wdetail && (
          <Boundary key="wall-detail" onError={detailFailed}>
            <Suspense fallback={null}>
              <WallDetail reduced={reduced} onClose={closeDetail} onFail={detailFailed} />
            </Suspense>
          </Boundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fdetail && (
          <Boundary key="foundation-detail" onError={detailFailed}>
            <Suspense fallback={null}>
              <FoundationDetail reduced={reduced} onClose={closeDetail} onFail={detailFailed} />
            </Suspense>
          </Boundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {rdetail && (
          <Boundary key="roof-detail" onError={detailFailed}>
            <Suspense fallback={null}>
              <RoofDetail reduced={reduced} onClose={closeDetail} onFail={detailFailed} />
            </Suspense>
          </Boundary>
        )}
      </AnimatePresence>

      {/* intro splash */}
      <AnimatePresence>
        {ok && !(ready && minWait) && (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 z-40 grid place-items-center bg-[#0d1a1f]"
            data-testid="splash-loading"
          >
            <div className="text-center">
              <img src={asset('logo-white.png')} alt="Mongrain" className="mx-auto h-40 w-auto object-contain md:h-56" />
              <div className="mx-auto mt-4 h-px w-40 overflow-hidden bg-white/15">
                <div className={`h-full bg-[#12b5d1] ${reduced ? '' : 'animate-pulse'}`} style={{ width: ready ? '100%' : '40%', transition: 'width 1.2s ease' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
