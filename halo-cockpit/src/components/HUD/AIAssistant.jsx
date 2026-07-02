import { useHUD } from "../../context/HUDContext"

export default function AIAssistant() {
  const { focusMode, lastAction } = useHUD()

  return (
    <div className="w-80 halo-card flex flex-col">
      <h2 className="halo-title halo-glow text-lg">AI Assistant</h2>
      <p className="text-gray-400 text-sm mt-2">
        {focusMode
          ? "Focus Mode is active. I will only show mission-critical guidance."
          : "I'll guide you through each module. Select something from the sidebar."}
      </p>
      <p className="text-xs text-haloBlue mt-3">Last action: {lastAction}</p>
      <button className="mt-3 text-left text-xs text-haloBlue hover:text-haloBlueSoft transition">
        Learn how this works
      </button>
    </div>
  )
}
