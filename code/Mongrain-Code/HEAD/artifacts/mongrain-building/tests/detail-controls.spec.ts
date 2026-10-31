import { test, expect } from '@playwright/test';

const sections = [
  { zone: 'walls', detail: 'wall', label: 'Wall', count: 7 },
  { zone: 'foundation', detail: 'foundation', label: 'Foundation', count: 5 },
  { zone: 'roof', detail: 'roof', label: 'Roof', count: 4 },
] as const;

for (const viewport of [{ width: 1280, height: 800 }, { width: 375, height: 812 }]) {
  test(`shared controls preserve focus, selection and return at ${viewport.width}px`, async ({ page, baseURL }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().startsWith('Failed to load resource:')) errors.push(message.text());
    });
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      return ['127.0.0.1', 'localhost'].includes(url.hostname) ? route.continue() : route.abort();
    });
    await page.setViewportSize(viewport);
    await page.goto(baseURL!);
    await expect(page.getByTestId('splash-loading')).toHaveCount(0);
    await expect(page.getByTestId('canvas-building').locator('canvas')).toBeVisible();
    for (const section of sections) {
      const opener = page.getByTestId(`button-zone-${section.zone}`);
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByTestId(`panel-${section.detail}-detail`);
      const back = page.getByTestId(`button-${section.detail}-back`);
      const toggle = page.getByTestId(`button-${section.detail}-explode`);
      const nav = dialog.getByRole('navigation', { name: `${section.label} layers` });
      const chips = nav.getByRole('button');
      const lastControl = section.detail === 'roof' ? page.getByTestId('button-roof-guide') : toggle;
      await expect(dialog).toBeVisible();
      await expect(back).toBeFocused();
      await expect(chips).toHaveCount(section.count);
      await page.keyboard.press('Shift+Tab');
      await expect(lastControl).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(back).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect(chips.last()).toHaveAttribute('aria-current', 'true');
      await page.keyboard.press('ArrowDown');
      await expect(chips.first()).toHaveAttribute('aria-current', 'true');
      for (let i = 0; i < section.count; i++) {
        await chips.nth(i).click();
        await expect(chips.nth(i)).toHaveAttribute('aria-current', 'true');
        const bounds = await chips.nth(i).boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
        expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
      }
      await expect.poll(() => dialog.locator(':scope > svg > line').evaluateAll(lines =>
        lines.every(line => ['x1', 'y1', 'x2', 'y2'].every(attribute =>
          line.hasAttribute(attribute) && Number.isFinite(Number(line.getAttribute(attribute))),
        )),
      )).toBe(true);
      await expect(toggle).toHaveAttribute('aria-pressed', 'true');
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-pressed', 'false');
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-pressed', 'true');
      if (section.detail === 'roof') {
        await page.getByTestId('button-roof-guide').click();
        await expect(page.getByTestId('button-roof-guide-stop')).toBeVisible();
        await expect(dialog.locator(':scope > svg > line').nth(1)).toHaveAttribute('stroke-opacity', '0');
        await page.keyboard.press('ArrowRight');
        await expect(page.getByTestId('button-roof-guide-stop')).toHaveCount(0);
        await expect(chips.nth(1)).toHaveAttribute('aria-current', 'true');
        await expect(dialog.locator(':scope > svg > line').nth(1)).toHaveAttribute('stroke-opacity', '1');
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await opener.click();
      await expect(dialog).toBeVisible();
      await expect(chips.first()).toHaveAttribute('aria-current', 'true');
      if (section.detail === 'foundation') {
        await dialog.getByTestId('button-overview-return').filter({ visible: true }).click();
      } else {
        await back.click();
      }
      await expect(dialog).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}
