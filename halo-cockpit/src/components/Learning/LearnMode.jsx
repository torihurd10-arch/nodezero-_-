import { useHUD } from "../../context/HUDContext"

export default function LearnMode() {
  const { completeModule, missionProgress } = useHUD()

  return (
    <div className="halo-card">
      <h2 className="halo-title halo-glow text-lg">Learn Mode</h2>
      <p className="text-sm text-gray-300 mt-2">
        Follow the data path: Input devices send signals, CPU processes instructions, RAM holds active data, and storage keeps long-term data.
      </p>

      <ul className="mt-3 text-sm text-gray-400 list-disc pl-5 space-y-1">
        <li>Input to CPU</li>
        <li>CPU to RAM for active operations</li>
        <li>RAM and CPU sync with storage</li>
        <li>Output returns to user</li>
      </ul>

      <button
        onClick={() => completeModule("learn")}
        className="mt-4 px-3 py-2 rounded-lg border border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10 transition"
      >
        {missionProgress.learn ? "Learn Complete" : "Mark Learn Complete (+25 XP)"}
      </button>
    </div>
  )
}
