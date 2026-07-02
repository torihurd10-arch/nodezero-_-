import { useHUD } from "../../context/HUDContext"

export default function QuickActions() {
  const { setLastAction, setActiveModule, addXP, startMission, resetMission } = useHUD()

  const actions = [
    {
      id: "mission",
      label: "Launch Mission",
      note: "Mission queue initialized. Start with Learning module.",
      run: () => startMission(),
    },
    {
      id: "lab",
      label: "Open Practice Lab",
      note: "Practice sandbox online. Timer set to 20 minutes.",
      run: () => setActiveModule("Practice"),
    },
    {
      id: "career",
      label: "Career Pulse",
      note: "Career tracker updated with one new measurable skill.",
      run: () => addXP(10),
    },
  ]

  return (
    <div className="halo-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="halo-title halo-glow text-lg">Quick Actions</h2>
        <button className="text-xs text-haloBlue hover:text-haloBlueSoft transition">Learn how this works</button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              action.run()
              setLastAction(action.note)
            }}
            className="px-3 py-2 rounded-lg border border-haloBlue/30 text-sm text-haloBlue hover:bg-haloBlue/10 transition"
          >
            {action.label}
          </button>
        ))}
        <button
          onClick={resetMission}
          className="px-3 py-2 rounded-lg border border-white/20 text-sm text-gray-300 hover:bg-white/5 transition"
        >
          Reset Run
        </button>
      </div>
    </div>
  )
}
