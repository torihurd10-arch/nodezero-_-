import { useHUD } from "../../context/HUDContext"

export default function AIGuide() {
  const { aiBriefing, lastAction, focusMode } = useHUD()

  return (
    <div className="halo-card">
      <h3 className="halo-title halo-glow text-base">AI Briefing</h3>
      <p className="mt-2 text-sm text-gray-300">{aiBriefing}</p>
      <p className="mt-2 text-xs text-gray-400">Latest signal: {lastAction}</p>
      <p className="mt-1 text-xs text-gray-500">{focusMode ? "Noise reduction active." : "Normal guidance active."}</p>
      <button className="mt-3 text-xs text-haloBlue hover:text-haloBlueSoft transition">
        Learn how this works
      </button>
    </div>
  )
}
