import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { resolve } from 'path';

// Get renderer from command line arguments or environment
const getRenderer = () => {
  const envRenderer = process.env.RENDERER;
  if (envRenderer && ['unreal', 'omniverse'].includes(envRenderer.toLowerCase())) {
    return envRenderer.toLowerCase();
  }
  return 'unreal';
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.ts',
      },
    ]),
    renderer(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.RENDERER': JSON.stringify(getRenderer()),
  },
});
