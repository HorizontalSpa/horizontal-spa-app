import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173,
    proxy: {
      // Во время разработки (npm run dev) фронтенд на 5173 проксирует
      // запросы /api на бэкенд-сервер (npm run dev:server, порт из .env / 3000)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
