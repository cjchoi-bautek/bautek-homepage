// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  // 🚨 이 부분을 추가합니다.
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});