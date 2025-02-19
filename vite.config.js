import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // or another path if necessary
  },
  base: './',  // Ensures proper asset linking
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
