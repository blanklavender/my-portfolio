import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Page titles stay hidden until the web fonts are in, so they fade in once in Inter
// instead of flashing from the fallback font (see .page-title in index.css).
const fontsReady = () => document.documentElement.classList.add('fonts-ready')
document.fonts.ready.then(fontsReady)
setTimeout(fontsReady, 1500) // never hold the title back for a slow font server

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
