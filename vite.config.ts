import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases here
    },
  },
  server: {
    fs: {
      strict: false
    }
  }
}); 