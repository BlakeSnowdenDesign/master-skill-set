import type { Zone } from './spec';

type AnalyticsData = Record<string, string | number | boolean>;
type EnvelopeEvents = {
  envelope_section_selected: { section: Zone };
  envelope_layer_selected: { section: Zone; layer: number; method: 'pick' | 'previous' | 'next' };
  envelope_assembly_toggled: { section: Zone | 'building'; action: 'explode' | 'reassemble' };
  envelope_building_returned: { section: Zone };
};

declare global {
  interface Window {
    umami?: {
      track(name: string, data?: AnalyticsData): void | Promise<unknown>;
    };
  }
}

/** Replit injects the tracker only on enabled, published websites. Never load one here. */
export function trackEvent<E extends keyof EnvelopeEvents>(name: E, data: EnvelopeEvents[E]): void {
  if (typeof window === 'undefined') return;
  try {
    // Handle both synchronous throws and rejected network promises without blocking controls.
    const result = window.umami?.track(name, data);
    if (result) void Promise.resolve(result).catch(() => {});
  } catch {
    // Analytics must never break the explorer.
  }
}
