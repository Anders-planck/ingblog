import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {HOME_ROUTE} from "./src/routes";

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  preview:{
    port:3000,
    strictPort:true
  },
  server:{
    port:3000,
    strictPort:true,
    host: true,
    origin: 'http://localhost:3000',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    coverage: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
        ],
        exclude: [
            'node_modules',
            'vitest.setup.mjs',
            '**/*.story.tsx',
            'src/main.tsx',
        ],
        threshold: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    }
  },
});
