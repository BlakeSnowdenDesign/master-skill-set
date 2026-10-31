import { mergeConfig } from 'vite';
import config from '../vite.config';

export default mergeConfig(config, {
  // The live preview and test server must never invalidate each other's
  // optimized dependencies when they use different modes/plugins.
  cacheDir: 'node_modules/.vite-regression',
  optimizeDeps: { entries: ['index.html'] },
});
