import { useHUD } from "../../context/HUDContext"

export default function MissionHistory() {
  const { missionHistory } = useHUD()

  return (
    <div className="halo-card">
      <h3 className="halo-title halo-glow text-base">Mission History</h3>
      <div className="mt-3 space-y-2 max-h-56 overflow-auto pr-1">
        {missionHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No mission events yet.</p>
        ) : (
          missionHistory.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-sm text-gray-200">{entry.text}</p>
              <p className="text-[11px] text-gray-500 mt-1">{entry.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
