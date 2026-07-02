import { useHUD } from "../../context/HUDContext"

export default function XPTracker() {
  const { xp, recentXpGain } = useHUD()

  return (
    <div className={`halo-card ${recentXpGain > 0 ? 'xp-burst' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="halo-title halo-glow text-base">XP Tracker</h3>
        <p className="text-xs text-gray-400">Live gain: {recentXpGain > 0 ? `+${recentXpGain}` : "0"}</p>
      </div>

      <div className="mt-3 h-3 rounded-full overflow-hidden bg-white/10">
        <div className="h-full bg-gradient-to-r from-haloBlue to-haloBlueSoft transition-all duration-300" style={{ width: `${Math.min(xp % 100, 100)}%` }} />
      </div>

      <p className="mt-2 text-sm text-gray-300">Total XP: {xp}</p>
      <p className="text-xs text-gray-500">Each 100 XP advances your cockpit level.</p>
    </div>
  )
}
