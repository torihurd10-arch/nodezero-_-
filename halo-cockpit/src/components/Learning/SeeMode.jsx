import { useHUD } from "../../context/HUDContext"

export default function SeeMode() {
  const { completeModule, missionProgress } = useHUD()

  return (
    <div className="halo-card">
      <h2 className="halo-title halo-glow text-lg">See Mode</h2>
      <p className="text-sm text-gray-300 mt-2">
        Watch the system states as load changes. CPU spikes mean processing demand, RAM pressure shows active working set limits, and storage waits indicate I/O bottlenecks.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <p className="rounded border border-white/10 px-2 py-1">CPU: 68%</p>
        <p className="rounded border border-white/10 px-2 py-1">RAM: 74%</p>
        <p className="rounded border border-white/10 px-2 py-1">Disk: 32%</p>
      </div>

      <button
        onClick={() => completeModule("see")}
        className="mt-4 px-3 py-2 rounded-lg border border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10 transition"
      >
        {missionProgress.see ? "See Complete" : "Mark See Complete (+25 XP)"}
      </button>
    </div>
  )
}
