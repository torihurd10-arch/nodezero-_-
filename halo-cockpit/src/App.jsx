import Sidebar from "./components/HUD/Sidebar"
import MissionControl from "./components/HUD/MissionControl"
import AIAssistant from "./components/HUD/AIAssistant"
import QuickActions from "./components/HUD/QuickActions"
import FocusMode from "./components/HUD/FocusMode"
import LearnMode from "./components/Learning/LearnMode"
import SeeMode from "./components/Learning/SeeMode"
import PracticeMode from "./components/Learning/PracticeMode"
import ResourcesPanel from "./components/Learning/ResourcesPanel"
import { useHUD } from "./context/HUDContext"

export default function App() {
  const { focusMode, activeModule, setActiveModule } = useHUD()

  const modules = ["Learn", "See", "Practice"]

  const renderModule = () => {
    if (activeModule === "Learn") return <LearnMode />
    if (activeModule === "See") return <SeeMode />
    return <PracticeMode />
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <MissionControl />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <QuickActions />
          <FocusMode />
        </div>

        <div className="flex flex-1 p-4 pt-0 gap-4">
          <div className="flex-1 halo-card">
            <div className="flex items-center justify-between gap-3">
              <h1 className="halo-title halo-glow text-2xl">Interactive Learning Core</h1>
              <div className="flex gap-2">
                {modules.map((module) => (
                  <button
                    key={module}
                    onClick={() => setActiveModule(module)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                      activeModule === module
                        ? "border-haloBlue bg-haloBlue/20 text-haloBlueSoft"
                        : "border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10"
                    }`}
                  >
                    {module}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
              {renderModule()}
              <ResourcesPanel />
            </div>
          </div>

          {!focusMode && <AIAssistant />}
        </div>
      </div>
    </div>
  )
}
