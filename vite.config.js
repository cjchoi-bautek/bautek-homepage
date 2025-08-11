// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // React 프로젝트라면 이 플러그인이 필요합니다.

export default defineConfig({
  plugins: [react()], // React 프로젝트라면 이 플러그인을 포함해야 합니다.
  server: {
    host: true, // 외부 접속을 허용합니다. '0.0.0.0'으로 설정해도 동일합니다.
    port: 5173, // 현재 사용하고 계신 포트 번호를 명시적으로 지정합니다.
  }
});