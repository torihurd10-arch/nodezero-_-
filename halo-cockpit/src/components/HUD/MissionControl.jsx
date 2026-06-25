import { useAppState } from '../../context/AppState'
import ProgressBar from '../ui/ProgressBar'

export default function MissionControl() {
  const { level, xp, streak, allRooms, progress, nextRoom } = useAppState()
  const completion = allRooms.length ? (Object.keys(progress).length / allRooms.length) * 100 : 0

  return (
    <header className="halo-card mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="halo-title halo-glow text-lg">Mission Control</h1>
          <p className="text-xs text-gray-300">Next room: {nextRoom ? nextRoom.title : 'All available rooms complete'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <p className="rounded border border-white/10 px-2 py-1">Level {level}</p>
          <p className="rounded border border-white/10 px-2 py-1">{xp} XP</p>
          <p className="rounded border border-white/10 px-2 py-1">{streak} streak</p>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar value={completion} />
        <p className="mt-1 text-xs text-gray-400">Global progress: {Math.round(completion)}%</p>
      </div>
    </header>
  )
}
