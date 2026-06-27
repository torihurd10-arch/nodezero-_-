import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { MissionProvider } from './context/MissionContext'
import { ProgressProvider } from './context/ProgressContext'
import { RepeatProvider } from './context/RepeatContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <MissionProvider>
        <ProgressProvider>
          <RepeatProvider>
            <App />
          </RepeatProvider>
        </ProgressProvider>
      </MissionProvider>
    </HashRouter>
  </StrictMode>,
)
