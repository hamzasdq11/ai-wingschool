import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.tsx'
import { captureAttribution } from './lib/analytics'

// Vercel Web Analytics (pageviews/referrers in the Vercel dashboard —
// enable Analytics on the project there) + our own attribution capture
// for the Supabase funnel events and per-registration source columns.
inject()
captureAttribution()

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered routes ship with their HTML already in #root — hydrate those.
// Any other URL is served the home template as a fallback, which won't match
// the 404 route's tree, so render from scratch instead.
const PRERENDERED = ['/', '/register', '/privacy', '/terms']
const path = window.location.pathname.replace(/\/+$/, '') || '/'

if (container.firstElementChild && PRERENDERED.includes(path)) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
