import { useHUD } from "../../context/HUDContext"

export default function MissionControl() {
  const { activeModule, missionPercent, xp } = useHUD()

  return (
    <div className="w-full bg-[#0d141c]/70 border-b border-haloBlue/20 p-4 flex justify-between items-center halo-card">
      <div>
        <h2 className="halo-title halo-glow text-xl">Current Mission</h2>
        <p className="text-gray-400 text-sm">Active module: {activeModule}</p>
      </div>

      <div className="w-1/3">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-haloBlueSoft" style={{ width: `${missionPercent}%` }}></div>
        </div>
        <p className="text-gray-400 text-xs mt-1">Mission Progress: {missionPercent}% • XP: {xp}</p>
      </div>
    </div>
  )
}
