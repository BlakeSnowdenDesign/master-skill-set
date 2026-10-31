import { lazy, Suspense, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, Check, ChevronDown, Copy, Layers3, Pause, Play, RotateCcw, RotateCw, Shield, Waves } from 'lucide-react';
import { FOUNDATION_LAYERS } from './layers';
import SubGradeBuild2D from './SubGradeBuild2D';
import './foundation-systems.css';

type Section = 'hero' | 'sequence' | 'assembly' | 'brief';
// Set by the Wix export to build one section per embed; unset, the whole page renders.
declare const __FOUNDATION_SECTION__: Section | '';
const onlySection = __FOUNDATION_SECTION__;
const SHOW_HERO = !__FOUNDATION_SECTION__ || __FOUNDATION_SECTION__ === 'hero';
const SHOW_SEQUENCE = !__FOUNDATION_SECTION__ || __FOUNDATION_SECTION__ === 'sequence';
const SHOW_ASSEMBLY = !__FOUNDATION_SECTION__ || __FOUNDATION_SECTION__ === 'assembly';
const SHOW_BRIEF = !__FOUNDATION_SECTION__ || __FOUNDATION_SECTION__ === 'brief';
// Section builds drop the 3D bundles they never render.
const FoundationSystemsModel = SHOW_HERO ? lazy(() => import('./FoundationSystemsModel')) : () => null;
const SubGradeModel3D = SHOW_ASSEMBLY ? lazy(() => import('./SubGradeModel3D')) : () => null;
type Mode = 'positive' | 'blindside';
declare const __EMBEDDED_ASSETS__: Record<string, string> | undefined;
declare const __WIX_EMBED__: boolean | undefined;
const isWixEmbed = typeof __WIX_EMBED__ !== 'undefined' && __WIX_EMBED__;
const explorerHref = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const asset = (name: string) => {
  const base = import.meta.env.BASE_URL;
  return (typeof __EMBEDDED_ASSETS__ !== 'undefined' && __EMBEDDED_ASSETS__?.[name]) || `${base}assets/${name}`.replace(/\/{2,}/g, '/');
};
const modes: Record<Mode, { title: string; eyebrow: string; copy: string; order: string[] }> = {
  positive: { title: 'Positive-side', eyebrow: 'Applied from the accessible exterior', copy: 'After concrete placement and suitable substrate preparation, sheet or fluid-applied waterproofing is installed on the outside face. Protection, insulation and drainage follow as specified.', order: ['Concrete wall / footing', 'Waterproofing membrane', 'Protection & insulation', 'Drainage composite', 'Filter fabric / backfill'] },
  blindside: { title: 'Blindside · pre-applied', eyebrow: 'Membrane placed before the concrete', copy: 'Where excavation support or a property line prevents exterior access, a compatible pre-applied membrane is secured to the blindside substrate first. Reinforcement and concrete are then placed against it; adjacent drainage and collector design remain project-specific.', order: ['Prepared blindside substrate', 'Pre-applied waterproofing', 'Reinforcement & concrete', 'Interior-side protection as designed', 'Collector / drainage outlet'] },
};
const layerNotes = [
  'Wall and strip footing form the structural substrate. Reinforcement, concrete strength, thickness and hydrostatic design loads are project-engineered.',
  'Choose a compatible sheet or fluid-applied system for positive-side access, or a pre-applied blindside approach when concrete is cast against the membrane. Not interchangeable sequences.',
  'Rigid, moisture-resistant insulation can be positioned outside the barrier where the selected assembly and detailing allow.',
  'A composite creates a vertical water path. It only works as a drainage strategy when connected to a designed, serviceable outlet.',
  'Geotextile separation limits soil-fines migration while allowing water to reach the drainage path.',
];

function SectionLabel({ title }: { title: ReactNode }) {
  return <div className="fs-section-label"><h2>{title}</h2></div>;
}

function makeBrief(mode: Mode, selected: number[]) {
  return `MONGRAIN · FOUNDATION SYSTEM ENQUIRY BRIEF\n\nIllustrative system type: ${modes[mode].title}\nLayers of interest: ${selected.map((i) => FOUNDATION_LAYERS[i].name).join(', ') || 'Not selected'}\n\nProject team: ______________________________\nProject / location: _________________________\nDesign phase: ______________________________\nBelow-grade conditions / groundwater information: ______________________________\nFoundation type and access constraints: ______________________________\nPreferred next discussion: ______________________________\n\nCoordination note: System selection, hydrostatic resistance, structural loads, drainage outlet, interfaces and installation sequencing require project-specific design and review. This brief is generated locally; Mongrain has not received it.`;
}

export default function FoundationSystemsPage() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(1);
  const [exploded, setExploded] = useState(true);
  const [paused, setPaused] = useState(false);
  const [mode] = useState<Mode>('positive');
  const [selected, setSelected] = useState<number[]>([1, 3]);
  const [briefState, setBriefState] = useState('');
  const [webglFailed, setWebglFailed] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [motionVisible, setMotionVisible] = useState(false);
  const [rotated, setRotated] = useState(false);
  const modelViewport = useRef<HTMLDivElement>(null);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  useEffect(() => {
    const oldTitle = document.title;
    const title = 'Mongrain — Foundation Systems';
    const description = 'Explore below-grade protection through an interactive foundation assembly and layer callouts.';
    const entries = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ];
    const previous = entries.map(([selector, value]) => {
      const element = document.querySelector(selector);
      const content = element?.getAttribute('content');
      element?.setAttribute('content', value);
      return { element, content };
    });
    document.title = title;
    return () => {
      document.title = oldTitle;
      previous.forEach(({ element, content }) => {
        if (content === null || content === undefined) element?.removeAttribute('content');
        else element?.setAttribute('content', content);
      });
    };
  }, []);
  useEffect(() => {
    try { const probe = document.createElement('canvas'); setWebglAvailable(!!(probe.getContext('webgl2') || probe.getContext('webgl'))); }
    catch { setWebglAvailable(false); }
  }, []);
  useEffect(() => {
    const element = modelViewport.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setMotionVisible(entry.isIntersecting && document.visibilityState === 'visible'), { threshold: 0.02 });
    observer.observe(element);
    const onVisibility = () => setMotionVisible(document.visibilityState === 'visible' && !!element.getBoundingClientRect().height && element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  const toggleSelected = (i: number) => setSelected((current) => current.includes(i) ? current.filter((n) => n !== i) : [...current, i].sort());
  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(makeBrief(mode, selected)); setBriefState('Brief copied. It has not been sent.'); }
    catch { setBriefState('Clipboard unavailable. Use Download brief instead; nothing has been sent.'); }
  };
  const downloadBrief = () => {
    const blob = new Blob([makeBrief(mode, selected)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'mongrain-foundation-enquiry-brief.txt'; a.click(); URL.revokeObjectURL(url);
    setBriefState('Brief downloaded locally. Mongrain has not received it.');
  };
  const reveal = reducedMotion ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.22 }, transition: { duration: 0.75, ease: [0.2, 0.7, 0.2, 1] as const } };

  // In its own embed the hero cannot scroll the Wix page itself; it asks the page (see wix-setup-notes) to jump to the assembly anchor.
  const exploreAssembly = (e: MouseEvent) => {
    if (!onlySection || window.parent === window) return;
    e.preventDefault();
    window.parent.postMessage({ type: 'mongrain:scrollTo', target: 'assembly' }, '*');
  };

  return <main className={`foundation-systems${onlySection ? ' is-section' : ''}`} data-testid="page-foundation-systems">
    {SHOW_HERO && <section className="fs-hero" aria-labelledby="fs-title">
      <div className="fs-hero-copy">
        <h1 id="fs-title">The building’s<br /><em>first</em> line<br />of defense.</h1>
        <p className="fs-intro">A foundation is more than a wall against soil. It is a designed transition between structure, water, thermal control and the ground around it.</p>
        <a className="fs-hero-link" href="#approaches" onClick={exploreAssembly}>Explore the assembly <ArrowDown size={16} /></a>
      </div>
      <div className="fs-model-stage">
        <div className="fs-model-caption"><span>DRAG TO ORBIT · SCROLL TO ZOOM</span></div>
        <div className="fs-model-canvas" data-testid="canvas-foundation-system" ref={modelViewport}>
          {!webglFailed && webglAvailable ? <Suspense fallback={<div className="fs-model-loading"><span /><span /><span />Preparing the assembly</div>}><FoundationSystemsModel active={active} exploded={exploded} paused={paused || !!reducedMotion || !motionVisible} rotated={rotated} mode={mode} onPick={setActive} onFail={() => setWebglFailed(true)} /></Suspense> : <div className={`fs-static-model ${mode}`} role="img" aria-label={mode === 'blindside' ? 'Static blindside cutaway: pre-applied waterproofing against a prepared substrate, concrete cast against membrane; no insulation or drainage layers are assumed' : 'Static positive-side cutaway showing concrete foundation wall and footing, waterproofing membrane, insulation, drainage path, soil and collector outlet'}><div className="fs-static-ground" /><div className="fs-static-footing" /><div className="fs-static-wall" /><div className="fs-static-membrane" />{mode === 'positive' ? <><div className="fs-static-insulation" /><div className="fs-static-drain" /></> : <div className="fs-static-support" />}<div className="fs-static-labels">{mode === 'positive' ? <><span>CONCRETE WALL</span><span>MEMBRANE</span><span>INSULATION</span><span>DRAIN + OUTLET</span></> : <><span>CAST CONCRETE</span><span>PRE-APPLIED MEMBRANE</span><span>BLINDSIDE SUBSTRATE</span></>}</div><p>WebGL is unavailable, so this is a static illustrative view. Select a numbered layer below for material details.</p></div>}
          {mode === 'positive' && <div className="fs-water-mark"><Waves size={14} /> WATER PATH → OUTLET</div>}
        </div>
        <div className="fs-stage-controls" aria-label="Assembly controls">
          <button disabled={!webglAvailable || webglFailed} onClick={() => setExploded(!exploded)} data-testid="button-explode"><Layers3 size={15} />{exploded ? 'Assemble' : 'Explode layers'}</button>
          <button disabled={!webglAvailable || webglFailed} onClick={() => setRotated(!rotated)} aria-label="Rotate assembly view" data-testid="button-rotate"><RotateCw size={15} />Rotate</button>
          <button disabled={!webglAvailable || webglFailed || !!reducedMotion} onClick={() => setPaused(!paused)} aria-label={reducedMotion ? 'Automatic motion is off due to reduced-motion preferences' : paused ? 'Resume motion' : 'Pause motion'} data-testid="button-pause">{paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}{reducedMotion ? 'Motion off' : paused ? 'Resume' : 'Pause'}</button>
          <button disabled={!webglAvailable || webglFailed} onClick={() => { setActive(1); setExploded(false); setPaused(true); setRotated(false); }} data-testid="button-reset"><RotateCcw size={15} />Reset</button>
        </div>
      </div>
    </section>}

    {SHOW_SEQUENCE && <section className="fs-intention" id="assembly">
      <motion.div {...reveal}><SectionLabel title={<>Protection is<br />a sequence.</>} /></motion.div>
      <motion.div className="fs-intention-text" {...reveal}>
        <p className="fs-large-copy">Each layer has a job.</p>
        <p>Illustrative wall-and-footing section. Select a material in the model or use the numbered callouts.</p>
      </motion.div>
      <SubGradeBuild2D />
      <div className="fs-layer-explorer">
        <div className="fs-layer-list" role="tablist" aria-label="Foundation assembly layers">{FOUNDATION_LAYERS.map((layer, i) => <button role="tab" aria-selected={active === i} className={active === i ? 'is-active' : ''} key={layer.id} onClick={() => { setActive(i); setExploded(true); }} data-testid={`button-layer-${layer.id}`}><span>0{layer.n}</span><strong>{layer.name}</strong><ArrowRight size={16} /></button>)}</div>
        <AnimatePresence mode="wait"><motion.article key={`${mode}-${active}`} className="fs-layer-detail" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}><span>SELECTED ELEMENT / 0{active + 1}</span><h3>{FOUNDATION_LAYERS[active].name}</h3><p className="fs-layer-material">{FOUNDATION_LAYERS[active].material}</p><p>{mode === 'blindside' && active === 2 ? 'Insulation is omitted from this illustrative blindside interface. Its location and thermal continuity are project-specific; it is not placed between pre-applied membrane and cast concrete.' : mode === 'blindside' && active >= 3 ? 'Drainage and filter components are not shown in this blindside interface. Their location, collector and outlet must be designed for the access condition; they are not placed between pre-applied membrane and cast concrete.' : layerNotes[active]}</p></motion.article></AnimatePresence>
      </div>
      <p className="fs-void-note"><span className="fs-dash" /> The open drainage path is a void, not a numbered layer. Its outlet and termination are essential design decisions.</p>
    </section>}

    {SHOW_ASSEMBLY && <section className="fs-approaches" id="approaches">
      <div className="fs-approach-heading"><motion.div {...reveal}><SectionLabel title={<>Built from<br /><i>the ground up.</i></>} /></motion.div><motion.p {...reveal}>Follow the sub-grade assembly in the order it goes together. Select a step and that layer pulls out of the model, or click a layer in the model to read about it.</motion.p></div>
      <Suspense fallback={<div className="fs-model3d"><div className="fs-model3d-stage"><div className="fs-model-loading"><span /><span /><span />Loading 3D model</div></div></div>}><SubGradeModel3D /></Suspense>
    </section>}



    {SHOW_BRIEF && <section className="fs-brief" id="brief">
      <motion.div {...reveal}><h2>Bring the ground<br />conditions into focus.</h2><p className="fs-brief-copy">Select the assembly topics to carry forward. Build a concise enquiry brief for your project team—right here, on your device.</p></motion.div>
      <div className="fs-brief-builder"><p className="fs-brief-label">INCLUDE TOPICS</p>{FOUNDATION_LAYERS.map((layer, i) => <label key={layer.id}><input type="checkbox" checked={selectedSet.has(i)} onChange={() => toggleSelected(i)} /><span className="fs-check"><Check size={12} /></span><span>{layer.name}</span></label>)}<div className="fs-brief-mode"><span>System approach</span><strong>{modes[mode].title}</strong></div><div className="fs-brief-buttons"><button onClick={downloadBrief}><ArrowDownToLine size={16} />Download brief</button><button onClick={copyBrief}><Copy size={16} />Copy text</button></div><p className="fs-local-note" role="status" aria-live="polite">{briefState || 'Created locally only. No information is sent to Mongrain.'}</p></div>
      {!onlySection && <div className="fs-footer"><a href="#fs-title">Back to top <ChevronDown size={14} /></a></div>}
    </section>}
    {!onlySection && <div className="fs-page-progress" aria-hidden="true"><span /></div>}
  </main>;
}
