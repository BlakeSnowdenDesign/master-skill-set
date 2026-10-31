import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent } from '../src/lib/analytics.ts';

test('analytics is safe without a browser or tracker, and forwards fixed properties when present', async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'window');
  try {
    delete globalThis.window;
    assert.doesNotThrow(() => trackEvent('envelope_section_selected', { section: 'roof' }));
    globalThis.window = {};
    assert.doesNotThrow(() => trackEvent('envelope_section_selected', { section: 'foundation' }));

    const calls = [];
    globalThis.window.umami = {
      track(name, data) {
        assert.equal(this, globalThis.window.umami);
        calls.push({ name, data });
      },
    };
    const events = [
      ['envelope_section_selected', { section: 'walls' }],
      ['envelope_layer_selected', { section: 'foundation', layer: 5, method: 'previous' }],
      ['envelope_assembly_toggled', { section: 'building', action: 'explode' }],
      ['envelope_building_returned', { section: 'roof' }],
    ];
    for (const [name, data] of events) trackEvent(name, data);
    assert.deepEqual(calls, events.map(([name, data]) => ({ name, data })));

    globalThis.window.umami.track = () => { throw new Error('Tracker unavailable'); };
    assert.doesNotThrow(() => trackEvent('envelope_assembly_toggled', { section: 'walls', action: 'reassemble' }));
    globalThis.window.umami.track = () => Promise.reject(new Error('Network unavailable'));
    trackEvent('envelope_building_returned', { section: 'foundation' });
    await new Promise(resolve => setImmediate(resolve));
    Object.defineProperty(globalThis.window, 'umami', { get() { throw new Error('Blocked tracker'); } });
    assert.doesNotThrow(() => trackEvent('envelope_section_selected', { section: 'roof' }));
  } finally {
    if (original) Object.defineProperty(globalThis, 'window', original);
    else delete globalThis.window;
  }
});
