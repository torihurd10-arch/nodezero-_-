import { useHUD } from "../../context/HUDContext"

const missionButtons = [
  { key: "Learn", label: "Learn", xp: 25 },
  { key: "See", label: "See", xp: 25 },
  { key: "Practice", label: "Practice", xp: 25 },
]

export default function MissionSelector() {
  const { activeModule, setActiveModule, recommendedModule, aiBriefing, missionProgress } = useHUD()

  return (
    <div className="halo-card">
      <div className="flex items-center justify-between gap-3">
        <h3 className="halo-title halo-glow text-base">AI Mission Selector</h3>
        <p className="text-[11px] text-gray-400">Recommended: {recommendedModule}</p>
      </div>

      <p className="mt-2 text-sm text-gray-300">{aiBriefing}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {missionButtons.map((mission) => (
          <button
            key={mission.key}
            onClick={() => setActiveModule(mission.key)}
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              activeModule === mission.key
                ? "border-haloBlue bg-haloBlue/20 text-haloBlueSoft"
                : "border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10"
            }`}
          >
            {mission.label}
            {missionProgress[mission.key.toLowerCase()] ? " ✓" : ""}
          </button>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500">
        AI notes: select the suggested module to stay on the fastest progression path.
      </div>
    </div>
  )
}
