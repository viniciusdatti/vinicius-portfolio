// Libraries
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const analyzeBundle = mode === 'analyze' || process.env.ANALYZE === 'true';

  return {
    plugins: [
      react(),
      analyzeBundle && visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        open: false,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    server: {
      port: Number(env.VITE_DEV_PORT ?? 5173),
      strictPort: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
        '/health': {
          target: env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
        '/socket.io': {
          target: env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8000',
          changeOrigin: true,
          ws: true,
        },
      },
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
    },
  };
});
