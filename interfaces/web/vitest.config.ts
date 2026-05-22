import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      'http://localhost:8000/api/v1'
    ),
    'import.meta.env.VITE_APP_ENV': JSON.stringify('test'),
    'import.meta.env.BASE_URL': JSON.stringify('/'),
  },
});
