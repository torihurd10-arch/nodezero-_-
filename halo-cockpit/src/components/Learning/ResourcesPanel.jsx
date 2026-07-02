import { useHUD } from "../../context/HUDContext"

const resources = {
  Learn: ["CPU fundamentals", "Memory hierarchy", "Data path map"],
  See: ["Task manager patterns", "CPU vs RAM bottlenecks", "I/O wait signals"],
  Practice: ["Performance triage checklist", "First-response workflow", "Fix verification log"],
}

export default function ResourcesPanel() {
  const { activeModule } = useHUD()

  return (
    <div className="halo-card">
      <h3 className="halo-title halo-glow text-base">Resources</h3>
      <p className="text-xs text-gray-400 mt-1">Targeted for {activeModule} mode</p>

      <ul className="mt-3 list-disc pl-5 text-sm text-gray-300 space-y-1">
        {resources[activeModule].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button className="mt-4 text-xs text-haloBlue hover:text-haloBlueSoft transition">
        Learn how this works
      </button>
    </div>
  )
}
