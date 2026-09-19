import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works from any sub-path (GitHub Pages, a firm's own host).
  base: './',
  plugins: [react(), tailwindcss()],
})
