import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import ProgressBar from '../components/ui/ProgressBar'
import { useAppState } from '../context/AppState'
import { LEVELS, ROOM_DETAILS } from '../data/content'

const PHASES = [
  { id: 'learn', label: 'Learn' },
  { id: 'do', label: 'Do' },
  { id: 'repeat', label: 'Repeat' },
  { id: 'explain', label: 'Explain' },
  { id: 'verify', label: 'Verify' },
]

const allRooms = LEVELS.flatMap((l) => l.rooms)

function PhaseTab({ phase, current, done, onClick }) {
  const isActive = phase.id === current
  const base = 'rounded-lg border px-3 py-1.5 text-xs font-semibold transition flex items-center gap-1.5'
  const style = isActive
    ? 'border-haloBlue bg-haloBlue/20 text-haloBlueSoft'
    : done
      ? 'border-green-500/40 bg-green-500/10 text-green-300'
      : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'

  return (
    <button className={`${base} ${style}`} onClick={onClick}>
      {done && !isActive && <span>✓</span>}
      {phase.label}
    </button>
  )
}

function CheckItem({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 accent-haloBlue"
      />
      <span className="text-sm text-gray-200">{label}</span>
    </label>
  )
}

export default function LessonPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { progress, completeRoom } = useAppState()

  const room = allRooms.find((r) => r.id === roomId)
  const details = ROOM_DETAILS[roomId]
  const isComplete = Boolean(progress[roomId])

  const [phase, setPhase] = useState('learn')
  const [taskChecks, setTaskChecks] = useState([])
  const [repeatChecks, setRepeatChecks] = useState([])
  const [verifyChecks, setVerifyChecks] = useState([])
  const [explanation, setExplanation] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [completedPhases, setCompletedPhases] = useState(new Set())

  useEffect(() => {
    setPhase('learn')
    setTaskChecks(details?.tasks?.map(() => false) ?? [])
    setRepeatChecks(details?.repeatTasks?.map(() => false) ?? [])
    setVerifyChecks(details?.verifyChecklist?.map(() => false) ?? [])
    setExplanation('')
    setShowHints(false)
    setCompletedPhases(new Set())
  }, [roomId, details])

  if (!room || !details) {
    return (
      <HaloCard title="Lesson Not Found">
        <p className="text-sm text-gray-300">No lesson data found for this room.</p>
        <div className="mt-3">
          <Link to="/missions">
            <HaloButton variant="subtle">← Back to Missions</HaloButton>
          </Link>
        </div>
      </HaloCard>
    )
  }

  const phaseIndex = PHASES.findIndex((p) => p.id === phase)
  const progressPercent = ((phaseIndex + 1) / PHASES.length) * 100

  const allVerifyDone = verifyChecks.every(Boolean)

  function markPhaseComplete(phaseId) {
    setCompletedPhases((prev) => new Set([...prev, phaseId]))
  }

  function goToNextPhase() {
    markPhaseComplete(phase)
    const next = PHASES[phaseIndex + 1]
    if (next) setPhase(next.id)
  }

  function toggleTask(index, checks, setChecks) {
    const next = [...checks]
    next[index] = !next[index]
    setChecks(next)
  }

  function handleComplete() {
    completeRoom(roomId)
    markPhaseComplete('verify')
  }

  function handleNavigateToNext() {
    const currentIndex = allRooms.findIndex((r) => r.id === roomId)
    const nextRoom = allRooms[currentIndex + 1]
    if (nextRoom) {
      navigate(`/lesson/${nextRoom.id}`)
    } else {
      navigate('/missions')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/missions">
          <HaloButton variant="subtle">← Back to Missions</HaloButton>
        </Link>
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
              ✓ Complete
            </span>
          )}
          <span className="rounded-full border border-haloBlue/40 bg-haloBlue/10 px-3 py-1 text-xs font-semibold text-haloBlue">
            +{details.xpReward} XP
          </span>
          <span className="text-xs text-gray-400">{room.difficulty}</span>
        </div>
      </div>

      <HaloCard title={room.title}>
        <p className="text-sm text-gray-300">{room.description}</p>
      </HaloCard>

      <div className="space-y-2">
        <ProgressBar value={progressPercent} />
        <div className="flex flex-wrap gap-2">
          {PHASES.map((p) => (
            <PhaseTab
              key={p.id}
              phase={p}
              current={phase}
              done={completedPhases.has(p.id)}
              onClick={() => setPhase(p.id)}
            />
          ))}
        </div>
      </div>

      {phase === 'learn' && (
        <div className="space-y-3">
          <HaloCard title="Simple Explanation">
            <p className="text-sm leading-relaxed text-gray-200">{details.explanation}</p>
          </HaloCard>
          <HaloCard title="Why It Matters">
            <p className="text-sm leading-relaxed text-gray-300">{details.whyItMatters}</p>
          </HaloCard>
          <HaloCard title="Career Connection">
            <p className="text-sm leading-relaxed text-gray-300">{details.careerConnection}</p>
          </HaloCard>
          <div className="flex justify-end">
            <HaloButton onClick={goToNextPhase}>I Got It — Do It →</HaloButton>
          </div>
        </div>
      )}

      {phase === 'do' && (
        <div className="space-y-3">
          <HaloCard title="Your Tasks">
            <p className="mb-3 text-xs text-gray-400">Check each task as you complete it. Take your time.</p>
            <div className="space-y-2">
              {details.tasks.map((task, i) => (
                <CheckItem
                  key={task}
                  label={task}
                  checked={taskChecks[i] ?? false}
                  onChange={() => toggleTask(i, taskChecks, setTaskChecks)}
                />
              ))}
            </div>
          </HaloCard>
          <HaloCard title="Hints">
            <button
              className="mb-2 text-xs text-haloBlue underline underline-offset-2"
              onClick={() => setShowHints((prev) => !prev)}
            >
              {showHints ? 'Hide hints' : 'Show hints'}
            </button>
            {showHints && (
              <ul className="space-y-1 text-sm text-gray-300">
                {details.hints.map((hint) => (
                  <li key={hint} className="flex gap-2">
                    <span className="shrink-0 text-haloBlue">›</span>
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </HaloCard>
          <div className="flex justify-between">
            <HaloButton variant="subtle" onClick={() => setPhase('learn')}>← Learn</HaloButton>
            <HaloButton onClick={goToNextPhase}>Done — Repeat It →</HaloButton>
          </div>
        </div>
      )}

      {phase === 'repeat' && (
        <div className="space-y-3">
          <HaloCard title="Repeat Challenge">
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3">
              <span className="text-amber-300">⚡</span>
              <p className="text-xs text-amber-200">No hints this time. Do it from memory. You got this.</p>
            </div>
            <div className="space-y-2">
              {details.repeatTasks.map((task, i) => (
                <CheckItem
                  key={task}
                  label={task}
                  checked={repeatChecks[i] ?? false}
                  onChange={() => toggleTask(i, repeatChecks, setRepeatChecks)}
                />
              ))}
            </div>
          </HaloCard>
          <div className="flex justify-between">
            <HaloButton variant="subtle" onClick={() => setPhase('do')}>← Do</HaloButton>
            <HaloButton onClick={goToNextPhase}>Done — Explain It →</HaloButton>
          </div>
        </div>
      )}

      {phase === 'explain' && (
        <div className="space-y-3">
          <HaloCard title="Explain It">
            <p className="mb-3 text-sm text-gray-200">{details.explainPrompt}</p>
            <p className="mb-2 text-xs text-gray-400">Write in your own words. No copying — just what you understand.</p>
            <textarea
              className="min-h-32 w-full rounded-lg border border-white/20 bg-black/30 p-3 text-sm text-gray-200 placeholder-gray-500 focus:border-haloBlue/60 focus:outline-none"
              placeholder="Type your explanation here..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
            <p className="mt-1 text-right text-xs text-gray-500">{explanation.length} characters</p>
          </HaloCard>
          <div className="flex justify-between">
            <HaloButton variant="subtle" onClick={() => setPhase('repeat')}>← Repeat</HaloButton>
            <HaloButton onClick={goToNextPhase}>Done — Verify →</HaloButton>
          </div>
        </div>
      )}

      {phase === 'verify' && (
        <div className="space-y-3">
          <HaloCard title="Proof of Learning">
            <p className="mb-3 text-xs text-gray-400">
              Check every box honestly. Only mark it if you can actually do it right now without help.
            </p>
            <div className="space-y-2">
              {details.verifyChecklist.map((item, i) => (
                <CheckItem
                  key={item}
                  label={item}
                  checked={verifyChecks[i] ?? false}
                  onChange={() => toggleTask(i, verifyChecks, setVerifyChecks)}
                />
              ))}
            </div>
          </HaloCard>

          {isComplete ? (
            <HaloCard title="Lesson Complete ✓">
              <p className="mb-3 text-sm text-green-300">You completed this lesson and earned {details.xpReward} XP.</p>
              <HaloButton onClick={handleNavigateToNext}>Next Lesson →</HaloButton>
            </HaloCard>
          ) : (
            <HaloCard title="Complete This Lesson">
              {allVerifyDone ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-200">All items checked. You are ready to claim your XP.</p>
                  <HaloButton onClick={handleComplete}>Claim +{details.xpReward} XP →</HaloButton>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Check all items above to complete this lesson. Be honest — only check what you can actually do.
                </p>
              )}
            </HaloCard>
          )}

          <div className="flex justify-start">
            <HaloButton variant="subtle" onClick={() => setPhase('explain')}>← Explain</HaloButton>
          </div>
        </div>
      )}
    </div>
  )
}
