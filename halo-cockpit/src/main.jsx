import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HUDProvider } from './context/HUDContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HUDProvider>
      <App />
    </HUDProvider>
  </StrictMode>,
)
