import type { ReactNode, RefObject } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface Layer {
  id: string;
  n: number;
  name: string;
}
type ElementRefs<T> = RefObject<(T | null)[]>;
interface LayerProps {
  layers: readonly Layer[];
  active: number;
  onPick(i: number): void;
}

export function ProjectedCallouts({
  layers, active, onPick, lines, dots, shown = layers.length,
}: LayerProps & {
  lines: ElementRefs<SVGLineElement>;
  dots: ElementRefs<HTMLButtonElement>;
  shown?: number;
}) {
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        {layers.map((layer, i) => (
          <line
            key={layer.id}
            ref={(element) => { lines.current[i] = element; }}
            stroke={active === i ? '#0f9db5' : '#52666e'}
            strokeOpacity={i >= shown ? 0 : active === i ? 1 : 0.55}
            strokeWidth={active === i ? 1.6 : 1}
          />
        ))}
      </svg>
      {layers.map((layer, i) => (
        <button
          key={layer.id}
          ref={(element) => { dots.current[i] = element; }}
          tabIndex={-1}
          aria-hidden
          onClick={() => onPick(i)}
          className={`${i >= shown ? 'hidden ' : ''}font-data absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full border text-[11px] ${
            active === i ? 'border-primary bg-primary text-white' : 'border-foreground/40 bg-white/90 text-foreground'
          }`}
        >
          {layer.n}
        </button>
      ))}
    </>
  );
}

export function LayerNavigation({
  layers, active, onPick, chips, label, className, testIdPrefix, truncateNames = false,
}: LayerProps & {
  chips: ElementRefs<HTMLButtonElement>;
  label: string;
  className: string;
  testIdPrefix: string;
  truncateNames?: boolean;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex justify-between gap-1 md:flex-col md:gap-1.5">
        {layers.map((layer, i) => (
          <li key={layer.id} className="flex-1 md:flex-none">
            <button
              ref={(element) => { chips.current[i] = element; }}
              onClick={() => onPick(i)}
              aria-current={active === i ? 'true' : undefined}
              data-testid={`${testIdPrefix}${layer.id}`}
              aria-label={`Layer ${layer.n}, ${layer.name}`}
              className={`focus-ring glass flex h-11 w-full items-center justify-center gap-3 rounded-full text-[13px] font-medium transition-colors md:justify-start md:px-2.5 ${
                active === i ? '!bg-foreground text-white' : 'hover:bg-white/90'
              }`}
            >
              <span className={`font-data grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] ${active === i ? 'border-primary text-primary' : 'border-foreground/40'}`}>{layer.n}</span>
              <span className={truncateNames ? 'hidden truncate text-left md:inline' : 'hidden md:inline'}>{layer.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LayerControls({
  active, count, exploded, go, onToggleExploded, label, prevTestId, nextTestId,
  explodeTestId, compactExplode = false, children,
}: {
  active: number;
  count: number;
  exploded: boolean;
  go(delta: number): void;
  onToggleExploded(): void;
  label: string;
  prevTestId: string;
  nextTestId: string;
  explodeTestId: string;
  compactExplode?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="glass absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full p-1.5 md:bottom-6" role="group" aria-label={label}>
      <button onClick={() => go(-1)} data-testid={prevTestId} aria-label="Previous layer" className="focus-ring flex min-h-12 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium hover:bg-white/80 active:scale-95">
        <ChevronLeft className="h-[18px] w-[18px]" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <span className="font-data min-w-12 text-center text-[12px]" aria-hidden>{active + 1} / {count}</span>
      <button onClick={() => go(1)} data-testid={nextTestId} aria-label="Next layer" className="focus-ring flex min-h-12 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium hover:bg-white/80 active:scale-95">
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-[18px] w-[18px]" />
      </button>
      <span className="mx-1 h-6 w-px bg-foreground/10" />
      <button
        onClick={onToggleExploded}
        aria-pressed={exploded}
        aria-label={exploded ? 'Reassemble' : compactExplode ? 'Explode' : 'Explode all'}
        data-testid={explodeTestId}
        className="focus-ring flex min-h-12 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium hover:bg-white/80 active:scale-95 aria-pressed:bg-primary aria-pressed:text-primary-foreground"
      >
        <Layers className="h-[18px] w-[18px]" />
        <span className={compactExplode ? 'hidden sm:inline' : undefined}>{exploded ? 'Reassemble' : compactExplode ? 'Explode' : 'Explode all'}</span>
      </button>
      {children}
    </div>
  );
}
