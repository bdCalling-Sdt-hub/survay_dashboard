import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '209.97.150.2',
    port: '3002',
  },
  plugins: [react()],
});
