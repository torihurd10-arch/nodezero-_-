import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { TOOL_MODULES } from '../data/content'

export default function ToolsPage() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {TOOL_MODULES.map((module) => (
        <HaloCard key={module} title={module}>
          <p className="text-sm text-gray-300">Practice this module in a controlled sandbox before using it in real tickets.</p>
          <div className="mt-3">
            <LearnHowButton label={`${module} is designed as a focused simulator panel for repeat drills and confidence-building.`} />
          </div>
        </HaloCard>
      ))}
    </div>
  )
}
