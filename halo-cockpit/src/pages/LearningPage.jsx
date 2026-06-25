import { useMemo, useState } from 'react'
import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { EmptyState } from '../components/ui/PanelState'
import { GLOSSARY, LEARNING_MODES, ROOM_DETAILS } from '../data/content'

export default function LearningPage() {
  const [activeMode, setActiveMode] = useState('learn')
  const [selectedRoom, setSelectedRoom] = useState('room0_1')
  const details = ROOM_DETAILS[selectedRoom]

  const mode = useMemo(() => LEARNING_MODES.find((item) => item.id === activeMode), [activeMode])

  return (
    <div className="space-y-4">
      <HaloCard title="Learning System">
        <div className="mb-3 flex flex-wrap gap-2">
          {LEARNING_MODES.map((item) => (
            <HaloButton key={item.id} variant={item.id === activeMode ? 'primary' : 'subtle'} onClick={() => setActiveMode(item.id)}>
              {item.title}
            </HaloButton>
          ))}
        </div>
        <p className="text-sm text-gray-300">{mode?.description}</p>
        <div className="mt-3">
          <LearnHowButton label="Every learning mode separates reading, guided observation, and active practice so your learning flow stays predictable." />
        </div>
      </HaloCard>

      <HaloCard title="Room Learning Content">
        <label className="mb-2 block text-xs text-gray-300" htmlFor="room-picker">Select Room</label>
        <select
          id="room-picker"
          value={selectedRoom}
          onChange={(event) => setSelectedRoom(event.target.value)}
          className="mb-3 w-full rounded border border-white/20 bg-black/30 px-3 py-2 text-sm"
        >
          {Object.keys(ROOM_DETAILS).map((roomId) => (
            <option key={roomId} value={roomId}>{roomId}</option>
          ))}
        </select>

        {!details ? (
          <EmptyState message="No resources configured for this room yet." />
        ) : (
          <div className="space-y-3 text-sm text-gray-300">
            <div>
              <p className="mb-1 text-xs uppercase text-haloBlue">Practice tasks</p>
              <ul className="list-disc space-y-1 pl-5">
                {details.tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase text-haloBlue">Hints</p>
              <ul className="list-disc space-y-1 pl-5">
                {details.hints.map((hint) => <li key={hint}>{hint}</li>)}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase text-haloBlue">Source files</p>
              <ul className="list-disc space-y-1 pl-5">
                {details.resources.map((resource) => <li key={resource}>{resource}</li>)}
              </ul>
            </div>
          </div>
        )}
      </HaloCard>

      <HaloCard title="Glossary Resources">
        <ul className="space-y-2 text-sm text-gray-300">
          {GLOSSARY.map((term) => (
            <li key={term.word}><span className="font-semibold text-haloBlueSoft">{term.word}:</span> {term.plain} ({term.miniLab})</li>
          ))}
        </ul>
      </HaloCard>
    </div>
  )
}
