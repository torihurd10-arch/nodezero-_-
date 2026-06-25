import { Link } from 'react-router-dom'
import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { EmptyState } from '../components/ui/PanelState'
import ProgressBar from '../components/ui/ProgressBar'
import { LEVELS } from '../data/content'
import { useAppState } from '../context/AppState'

export default function MissionsPage() {
  const { unlockedRooms, progress } = useAppState()

  return (
    <div className="space-y-3">
      <HaloCard title="Mission Queue">
        <LearnHowButton label="Missions unlock in order. Complete a section to unlock the next. Only move on when you can do it without notes." />
      </HaloCard>

      {LEVELS.map((level) => {
        const levelRooms = unlockedRooms.filter((r) => r.level === level.id)
        if (levelRooms.length === 0) return null

        const done = levelRooms.filter((r) => progress[r.id]).length
        const percent = levelRooms.length ? (done / levelRooms.length) * 100 : 0

        return (
          <div key={level.id} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-haloBlue">{level.name}</h3>
              <span className="text-xs text-gray-400">{done}/{levelRooms.length} complete</span>
            </div>
            <ProgressBar value={percent} />
            {levelRooms.map((room) => {
              const isComplete = Boolean(progress[room.id])
              return (
                <HaloCard key={room.id} title={room.title}>
                  <p className="text-sm text-gray-300">{room.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link to={`/lesson/${room.id}`}>
                      <HaloButton variant={isComplete ? 'subtle' : 'primary'}>
                        {isComplete ? '✓ Review Lesson' : 'Start Lesson →'}
                      </HaloButton>
                    </Link>
                    <span className="text-xs text-gray-400">Difficulty: {room.difficulty}</span>
                    {isComplete && (
                      <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-xs text-green-300">
                        Complete
                      </span>
                    )}
                  </div>
                </HaloCard>
              )
            })}
          </div>
        )
      })}

      {unlockedRooms.length === 0 && (
        <HaloCard title="No missions">
          <EmptyState message="Complete prerequisite training to unlock rooms." />
        </HaloCard>
      )}
    </div>
  )
}
