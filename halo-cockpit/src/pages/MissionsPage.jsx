import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { EmptyState } from '../components/ui/PanelState'
import { useAppState } from '../context/AppState'

export default function MissionsPage() {
  const { unlockedRooms, progress, completeRoom } = useAppState()

  return (
    <div className="space-y-3">
      <HaloCard title="Mission Queue">
        <LearnHowButton label="Mission completion preserves original NodeZero behavior: +50 XP and room completion state in local storage." />
      </HaloCard>
      {unlockedRooms.length === 0 ? (
        <HaloCard title="No missions">
          <EmptyState message="Complete prerequisite training to unlock rooms." />
        </HaloCard>
      ) : (
        unlockedRooms.map((room) => {
          const done = Boolean(progress[room.id])
          return (
            <HaloCard key={room.id} title={room.title}>
              <p className="text-sm text-gray-300">{room.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <HaloButton onClick={() => completeRoom(room.id)} disabled={done}>
                  {done ? 'Completed' : 'Mark Complete (+50 XP)'}
                </HaloButton>
                <span className="text-xs text-gray-400">Difficulty: {room.difficulty}</span>
              </div>
            </HaloCard>
          )
        })
      )}
    </div>
  )
}
