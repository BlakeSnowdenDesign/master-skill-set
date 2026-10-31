import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

// Replit supplies Chromium; elsewhere use Playwright's installed Chromium or
// explicitly select a browser with PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync('/repl/tools/bin/chromium') ? '/repl/tools/bin/chromium' : undefined);

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 20_000 },
  workers: 1, // Multiple software-rendered scenes can exhaust GPU contexts.
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
    launchOptions: {
      executablePath,
      args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'PORT=5190 BASE_PATH=/ NODE_ENV=production pnpm exec vite --config tests/vite.config.ts --host 127.0.0.1',
      url: 'http://127.0.0.1:5190',
      reuseExistingServer: false,
    },
    {
      command: 'PORT=5190 BASE_PATH=/ NODE_ENV=production pnpm run export:wix && node tests/standalone-server.mjs',
      url: 'http://127.0.0.1:5191/embed.html',
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
  projects: [
    { name: 'workspace', use: { baseURL: 'http://127.0.0.1:5190' } },
    { name: 'standalone-wix', use: { baseURL: 'http://127.0.0.1:5191/embed.html' } },
  ],
});
