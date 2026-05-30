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
        filename: path.resolve(rootDir, 'dist/stats.html'),
        gzipSize: true,
        brotliSize: true,
        open: false,
        emitFile: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    optimizeDeps: {
      include: [
        'react-hook-form',
        'zod',
        '@hookform/resolvers/zod',
        'use-sync-external-store/shim/with-selector',
      ],
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
          /** Align WS Origin with API host — prevents 403 upgrade via Vite proxy (RFC 6455). */
          rewriteWsOrigin: true,
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
      rollupOptions: {
        output: {
          manualChunks: (id: string): string | undefined => {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('recharts') || id.includes('d3-')) return 'vendor-recharts';
            if (
              id.includes('three')
              || id.includes('@react-three')
              || id.includes('postprocessing')
            ) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('socket.io-client')) return 'vendor-socket';
            return undefined;
          },
        },
      },
    },
  };
});
