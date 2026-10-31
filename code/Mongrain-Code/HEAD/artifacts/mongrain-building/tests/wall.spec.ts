import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

// Independent expectations: changing/deleting a source layer must fail tests.
const layers = [
  ['frame', 'Steel frame'],
  ['gypsum', 'Exterior gypsum'],
  ['barrier', 'Air barrier'],
  ['clips', 'Thermal clips'],
  ['insulation', 'Insulation'],
  ['omega', 'Omega bar'],
  ['cladding', 'Metal cladding'],
] as const;

test.beforeEach(async ({ page, baseURL }) => {
  const errors: string[] = [];
  (page as Page & { regressionErrors: string[] }).regressionErrors = errors;
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    // React error boundaries report to the console without a pageerror.
    // Aborted optional fonts emit resource errors, covered separately for
    // local HTTP failures, and must not hide actual component exceptions.
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource:')) {
      errors.push(message.text());
    }
  });
  page.on('response', response => {
    if (response.url().startsWith(baseURL!) && response.status() >= 400) {
      errors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });
  // Fonts are the only intentional external dependency. Block them to prove
  // all model, image, CSS and script resources work without third-party hosts.
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort();
    return route.continue();
  });
  await page.goto(baseURL!);
  await expect(page.getByTestId('splash-loading')).toHaveCount(0);
  await expect(page.getByTestId('status-webgl-error')).toHaveCount(0);
  await expect(page.getByTestId('canvas-building').locator('canvas')).toBeVisible();
  // This is a WebGL regression suite: unsupported WebGL is a failure, not a skip.
  expect(await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'))).toBe(true);
});

test.afterEach(async ({ page }) => {
  expect((page as Page & { regressionErrors: string[] }).regressionErrors).toEqual([]);
});

async function openWall(page: Page) {
  await page.getByTestId('button-zone-walls').click();
  await expect(page.getByRole('dialog', { name: 'Wall assembly detail' })).toBeVisible();
  await expect(page.getByTestId('canvas-wall').locator('canvas')).toBeVisible();
}

async function selected(page: Page, index: number) {
  await expect(page.getByTestId(`button-layer-${layers[index][0]}`)).toHaveAttribute('aria-current', 'true');
  const card = page.getByTestId((await page.viewportSize())!.width < 768 ? 'card-layer-mobile' : 'card-layer');
  await expect(card).toContainText(`Layer ${index + 1} of 7`);
  await expect(card.getByRole('heading')).toHaveText(layers[index][1]);
}

async function buildingUsable(page: Page) {
  await expect(page.getByTestId('panel-wall-detail')).toHaveCount(0);
  await expect(page.getByTestId('button-zone-walls')).toHaveAttribute('aria-pressed', 'false');
  await page.getByTestId('button-explode').click();
  await expect(page.getByTestId('button-explode')).toHaveAttribute('aria-pressed', 'true');
  await page.getByTestId('button-explode').click();
  await expect(page.getByTestId('button-explode')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('text-status')).toHaveText('Envelope complete');
  await page.getByTestId('button-zone-roof').click();
  await expect(page.getByRole('dialog', { name: 'Conventional roof detail' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
}

async function projectedPoints(page: Page) {
  return page.getByTestId('panel-wall-detail').locator(':scope > svg > line').evaluateAll(lines =>
    lines.map(line => ({
      x: Number(line.getAttribute('x1')),
      y: Number(line.getAttribute('y1')),
    })),
  );
}

test('all seven labels, wraparound, explosion geometry, Back and resumed building', async ({ page }) => {
  await openWall(page);
  const nav = page.getByRole('navigation', { name: 'Wall layers' });
  await expect(nav.getByRole('button')).toHaveCount(7);
  for (const [index, [id, name]] of layers.entries()) {
    await expect(nav.getByRole('button', { name: `Layer ${index + 1}, ${name}`, exact: true })).toBeVisible();
    await page.getByTestId(`button-layer-${id}`).click();
    await selected(page, index);
  }
  await page.getByTestId('button-layer-next').click();
  await selected(page, 0);
  await page.getByTestId('button-layer-prev').click();
  await selected(page, 6);
  await page.keyboard.press('ArrowRight');
  await selected(page, 0);
  await page.keyboard.press('ArrowLeft');
  await selected(page, 6);

  const toggle = page.getByTestId('button-wall-explode');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(async () => (await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x).toBeGreaterThan(250);
  const spread = (await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x;
  await toggle.click();
  await expect(toggle).toHaveText('Explode all');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(async () => Math.abs((await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x)).toBeLessThan(spread / 2);
  await toggle.click();
  await expect(toggle).toHaveText('Reassemble');
  await expect.poll(async () => (await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x).toBeGreaterThan(250);
  await page.getByTestId('button-wall-back').click();
  await buildingUsable(page);
});

test('keyboard focus stays in the detail and Escape restores its opener', async ({ page }) => {
  const opener = page.getByTestId('button-zone-walls');
  await opener.focus();
  await page.keyboard.press('Enter');
  const back = page.getByTestId('button-wall-back');
  const last = page.getByTestId('button-wall-explode');
  await expect(back).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(last).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(back).toBeFocused();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.getByRole('dialog').evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  await buildingUsable(page);
});

test('real building mesh selection opens wall detail; wall meshes select layers', async ({ page }) => {
  await expect(page.getByTestId('text-status')).toHaveText('Envelope complete');
  // Home camera exposes the podium facade below the roof. These are real
  // pointer events on the canvas, not synthetic calls to selection handlers.
  await page.getByTestId('canvas-building').locator('canvas').click({ position: { x: 600, y: 490 } });
  await expect(page.getByRole('dialog', { name: 'Wall assembly detail' })).toBeVisible();
  await expect.poll(async () => (await projectedPoints(page))[6].x).toBeGreaterThan(0);
  await page.getByTestId('button-layer-frame').click();
  const points = await projectedPoints(page);
  // Cladding is a continuous outer panel. Click above its projected anchor,
  // away from the overlaid numbered marker and UI, so WallModel handles it.
  await page.mouse.click(points[6].x + 35, points[6].y + 50);
  await selected(page, 6);
  await page.getByTestId('button-wall-back').click();
  await buildingUsable(page);
});

test('narrow reduced-motion view keeps all labels and controls reachable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await openWall(page);
  for (const [index, [id]] of layers.entries()) {
    const button = page.getByTestId(`button-layer-${id}`);
    await button.click();
    await selected(page, index);
    const box = await button.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(375);
    expect(box!.y + box!.height).toBeLessThanOrEqual(812);
  }
  await expect.poll(async () => (await projectedPoints(page)).every(p =>
    Number.isFinite(p.x) && Number.isFinite(p.y) && p.x > 0 && p.x < 375 && p.y > 100 && p.y < 812 - 270,
  )).toBe(true);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  await page.getByTestId('button-wall-explode').click();
  await expect(page.getByTestId('button-wall-explode')).toHaveText('Explode all');
  await page.getByTestId('button-wall-back').click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByTestId('button-zone-walls').click();
  await selected(page, 0);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('normal-motion detail finishes reassembly and returns cleanly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openWall(page);
  await expect.poll(async () => (await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x).toBeGreaterThan(250);
  await page.getByTestId('button-wall-explode').click();
  await expect(page.getByTestId('button-wall-explode')).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(async () => Math.abs((await projectedPoints(page))[6].x - (await projectedPoints(page))[0].x)).toBeLessThan(125);
  await page.getByTestId('button-layer-next').click();
  await selected(page, 1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await openWall(page);
  await selected(page, 0);
});

test('Wix file has no workspace bundles and loads without workspace resources', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'standalone-wix', 'Export-only contract');
  const html = await readFile(new URL('../../../exports/mongrain-building-wix.html', import.meta.url), 'utf8');
  expect(html).not.toMatch(/<script\b[^>]*\bsrc\s*=|<link\b[^>]*rel=["'](?:modulepreload|stylesheet)["'][^>]*href=["'](?!https:\/\/fonts\.)/i);
  expect(html).not.toMatch(/(?:src|href)=["'](?:\/src\/|\/@vite\/|\/@fs\/|\/artifacts\/|\.\.?\/assets\/)/i);
  expect(html).not.toContain('import("/assets/');
  expect(await page.locator('img').evaluateAll(imgs => imgs.every(img => img instanceof HTMLImageElement && img.src.startsWith('data:') && img.complete && img.naturalWidth > 0))).toBe(true);
  await expect(page.getByTestId('button-copy-wix-html')).toHaveCount(0);
  const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => entry.name));
  // Chromium may request /favicon.ico even with no icon link in the HTML.
  // That browser-generated tab icon is not an application dependency.
  expect(resources.filter(url => url.startsWith('http://127.0.0.1:5191/') && new URL(url).pathname !== '/favicon.ico')).toEqual([]);
  await openWall(page);
  await page.getByTestId('button-wall-back').click();
  await buildingUsable(page);
  const finalResources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => entry.name));
  expect(finalResources.filter(url => url.startsWith('http://127.0.0.1:5191/') && new URL(url).pathname !== '/favicon.ico')).toEqual([]);
});

test('sandboxed Wix iframe supports wall navigation and resumes the building', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'standalone-wix', 'Export-only contract');
  await page.goto('http://127.0.0.1:5191/frame.html');
  const frame = page.frameLocator('iframe[title="Wix animation"]');
  await expect(frame.getByTestId('splash-loading')).toHaveCount(0);
  await expect(frame.getByTestId('status-webgl-error')).toHaveCount(0);
  await frame.getByTestId('button-zone-walls').click();
  await expect(frame.getByRole('dialog', { name: 'Wall assembly detail' })).toBeVisible();
  await frame.getByTestId('button-layer-prev').click();
  await expect(frame.getByTestId('button-layer-cladding')).toHaveAttribute('aria-current', 'true');
  await frame.getByTestId('button-wall-explode').click();
  await expect(frame.getByTestId('button-wall-explode')).toHaveText('Explode all');
  await frame.getByTestId('button-wall-back').click();
  await expect(frame.getByRole('dialog')).toHaveCount(0);
  await frame.getByTestId('button-explode').click();
  await expect(frame.getByTestId('button-explode')).toHaveAttribute('aria-pressed', 'true');
  await frame.getByTestId('button-zone-walls').click();
  await expect(frame.getByTestId('button-wall-back')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(frame.getByRole('dialog')).toHaveCount(0);
  await expect(frame.getByTestId('button-zone-walls')).toBeFocused();
  await expect(frame.getByTestId('button-copy-wix-html')).toHaveCount(0);
});
