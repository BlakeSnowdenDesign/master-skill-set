import { useCallback, useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { Zone } from '@/lib/spec';

export interface ProjectedPoint {
  x: number;
  y: number;
}

/** Shared manual state; sections may cancel their own playback before a manual action. */
export function useLayerControls(count: number, section: Zone, onManual?: () => void) {
  const [active, setActive] = useState(0);
  const [exploded, setExploded] = useState(true);
  const pick = useCallback((i: number) => {
    onManual?.();
    setActive(i);
    if (i !== active) trackEvent('envelope_layer_selected', { section, layer: i + 1, method: 'pick' });
  }, [active, section, onManual]);
  const go = useCallback((delta: number) => {
    onManual?.();
    setActive((i) => ((i + delta) % count + count) % count);
    const next = ((active + delta) % count + count) % count;
    if (next !== active) trackEvent('envelope_layer_selected', {
      section, layer: next + 1, method: delta < 0 ? 'previous' : 'next',
    });
  }, [active, count, section, onManual]);
  const toggleExploded = useCallback(() => {
    onManual?.();
    setExploded((value) => !value);
    trackEvent('envelope_assembly_toggled', { section, action: exploded ? 'reassemble' : 'explode' });
  }, [exploded, section, onManual]);
  return { active, setActive, exploded, setExploded, pick, go, toggleExploded };
}

/** Escape remains owned by Explorer, including its section-specific return actions. */
export function useDetailDialog(go: (delta: number) => void) {
  const back = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    back.current?.focus();
    return () => previous?.focus();
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.startsWith('Arrow')) event.preventDefault();
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(-1);
      if (event.key !== 'Tab') return;
      const buttons = [...(dialog.current?.querySelectorAll<HTMLButtonElement>('button:not([tabindex="-1"]):not(:disabled)') ?? [])]
        .filter((button) => button.offsetParent !== null);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);
  return { back, dialog };
}

/** Update projected overlays without introducing React renders on every 3D frame. */
export function useProjectedCallouts() {
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const project = useCallback((points: ProjectedPoint[]) => {
    const mobile = window.innerWidth < 768;
    points.forEach((point, i) => {
      const chip = chips.current[i];
      const line = lines.current[i];
      const dot = dots.current[i];
      if (dot) dot.style.transform = `translate(${point.x - 14}px, ${point.y - 14}px)`;
      if (!chip || !line) return;
      const rect = chip.getBoundingClientRect();
      line.setAttribute('x1', String(point.x));
      line.setAttribute('y1', String(point.y));
      line.setAttribute('x2', String(mobile ? rect.left + rect.width / 2 : rect.left));
      line.setAttribute('y2', String(mobile ? rect.top : rect.top + rect.height / 2));
    });
  }, []);
  return { lines, dots, chips, project };
}
