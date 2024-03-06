import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 8080,
    host: true,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:8000', // Your Express server URL. TODO: pull from .env
        ws: true,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
