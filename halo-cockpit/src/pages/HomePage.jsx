import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { useAppState } from '../context/AppState'

export default function HomePage() {
  const { nextRoom, unlockedRooms, allRooms } = useAppState()

  return (
    <div className="space-y-4">
      <HaloCard title="Cockpit Status">
        <p className="text-sm text-gray-300">Unlocked rooms: {unlockedRooms.length} / {allRooms.length}</p>
        <p className="mt-2 text-sm text-gray-300">Next room: {nextRoom ? nextRoom.title : 'No pending rooms'}</p>
        <div className="mt-3">
          <LearnHowButton label="This status card combines progress tracking and room unlock logic so you can always see what to do next." />
        </div>
      </HaloCard>
    </div>
  )
}
