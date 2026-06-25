import { Outlet } from 'react-router-dom'
import AIAssistant from '../components/HUD/AIAssistant'
import FocusModeToggle from '../components/HUD/FocusModeToggle'
import MissionControl from '../components/HUD/MissionControl'
import QuickActions from '../components/HUD/QuickActions'
import Sidebar from '../components/HUD/Sidebar'
import ErrorBoundary from '../components/ui/ErrorBoundary'

export default function CockpitLayout() {
  return (
    <div className="mx-auto min-h-screen max-w-[1600px] p-3 md:p-4">
      <div className="flex min-h-[calc(100vh-2rem)] flex-col rounded-2xl border border-haloBlue/30 bg-black/25 md:flex-row">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col p-3 md:p-4">
          <MissionControl />
          <div className="mb-4 flex items-center justify-end">
            <FocusModeToggle />
          </div>
          <QuickActions />
          <div className="flex flex-1 flex-col gap-4 lg:flex-row">
            <main className="min-w-0 flex-1">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </main>
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  )
}
