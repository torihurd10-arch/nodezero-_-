import HaloCard from '../components/ui/HaloCard'
import ProgressBar from '../components/ui/ProgressBar'
import { LEVELS } from '../data/content'
import { useAppState } from '../context/AppState'

function Ring({ label, value }) {
  const degree = Math.max(0, Math.min(100, value)) * 3.6
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20 rounded-full" style={{ background: `conic-gradient(#4cc9f0 ${degree}deg, rgba(255,255,255,0.1) ${degree}deg)` }}>
        <div className="absolute inset-2 rounded-full bg-[#09131c]" />
        <span className="absolute inset-0 grid place-items-center text-xs">{Math.round(value)}%</span>
      </div>
      <p className="text-xs text-gray-300">{label}</p>
    </div>
  )
}

export default function StatsPage() {
  const { xp, allRooms, progress } = useAppState()
  const completeCount = Object.keys(progress).length

  return (
    <div className="space-y-4">
      <HaloCard title="Skill Rings">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Ring label="Knowledge" value={(xp / 400) * 100} />
          <Ring label="Skill" value={((xp - 100) / 400) * 100} />
          <Ring label="Troubleshooting" value={((xp - 200) / 400) * 100} />
          <Ring label="Readiness" value={((xp - 300) / 400) * 100} />
        </div>
      </HaloCard>

      <HaloCard title="XP Tracker">
        <p className="mb-2 text-sm text-gray-300">Total XP: {xp}</p>
        <ProgressBar value={(xp % 100)} />
      </HaloCard>

      <HaloCard title="Activity Heatmap">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => {
            const active = i < completeCount
            return <div key={i} className={`h-5 rounded ${active ? 'bg-haloBlue/70' : 'bg-white/10'}`} />
          })}
        </div>
      </HaloCard>

      <HaloCard title="Progress by Level">
        <div className="space-y-2 text-sm text-gray-300">
          {LEVELS.map((level) => {
            const done = level.rooms.filter((room) => progress[room.id]).length
            const percent = level.rooms.length ? (done / level.rooms.length) * 100 : 0
            return (
              <div key={level.id}>
                <p className="mb-1">{level.name}: {done}/{level.rooms.length}</p>
                <ProgressBar value={percent} />
              </div>
            )
          })}
          <p className="pt-2 text-xs text-gray-400">Global rooms complete: {completeCount}/{allRooms.length}</p>
        </div>
      </HaloCard>
    </div>
  )
}
