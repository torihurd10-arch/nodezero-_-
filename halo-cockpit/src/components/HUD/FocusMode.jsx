import { useHUD } from "../../context/HUDContext"

export default function FocusMode() {
  const { focusMode, setFocusMode } = useHUD()

  return (
    <div className="halo-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="halo-title halo-glow text-lg">Focus Mode</h2>
          <p className="text-sm text-gray-400 mt-1">
            {focusMode ? "Distractions reduced. Training priority locked." : "Standard mode active."}
          </p>
        </div>

        <button
          onClick={() => setFocusMode(!focusMode)}
          className={`px-3 py-2 rounded-lg border text-sm transition ${
            focusMode
              ? "border-haloBlue bg-haloBlue/20 text-haloBlueSoft"
              : "border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10"
          }`}
        >
          {focusMode ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  )
}
