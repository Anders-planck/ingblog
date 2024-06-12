import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig( {
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
});
