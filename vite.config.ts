import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// VITE_BASE is the path the site is served from: "/" on a root domain,
// "/portfolio/" on GitHub Pages. Set by `npm run deploy`.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
