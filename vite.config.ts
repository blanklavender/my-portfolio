import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

// GitHub Pages has no server-side routing: a request for /projects looks for a
// file at that path and 404s. Pages serves 404.html for any unmatched path, so
// shipping a copy of index.html under that name boots the SPA and lets
// BrowserRouter resolve the route from the URL.
const spaFallback = {
  name: 'spa-404-fallback',
  apply: 'build' as const,
  closeBundle() {
    const dist = resolve(process.cwd(), 'dist')
    copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback],
})
