import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMission } from './MissionContext'
import { getCurrentMissionId, getUnlockedMissionIds } from '../utils/progression'
import { clearRepeatEntry, normalizeRepeatQueue, scheduleRepeatEntry } from '../utils/repeatQueue'
import { CONFIDENCE_GAIN, COMPLETION_XP, TICKET_OPEN_XP, getPromotionProgress, getRankTitle } from '../utils/xp'
import { readJson, readNumber, removeKeys, writeJson, writeNumber } from '../utils/storage'

const STORAGE = {
  xp: 'nodezero_react_xp',
  confidence: 'nodezero_react_confidence',
  completed: 'nodezero_react_completed',
  repetitions: 'nodezero_react_repetitions',
  weakAreas: 'nodezero_react_weak_areas',
  unlocked: 'nodezero_react_unlocked',
  badges: 'nodezero_react_badges',
  rank: 'nodezero_react_rank',
  sectionProgress: 'nodezero_react_section_progress',
  tickets: 'nodezero_react_tickets',
  explain: 'nodezero_react_explain',
  verify: 'nodezero_react_verify',
  reflection: 'nodezero_react_reflection',
  repeatQueue: 'nodezero_react_repeat_queue',
  streak: 'nodezero_react_streak',
  lastVisit: 'nodezero_react_last_visit',
}

const ProgressContext = createContext(null)

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10)
  const lastVisit = localStorage.getItem(STORAGE.lastVisit) || ''
  const saved = readNumber(STORAGE.streak, 0)

  if (lastVisit === today) {
    return saved
  }

  let next = 1
  if (lastVisit) {
    const previous = new Date(lastVisit + 'T00:00:00')
    const current = new Date(today + 'T00:00:00')
    const diff = Math.floor((current - previous) / (1000 * 60 * 60 * 24))
    next = diff === 1 ? saved + 1 : 1
  }

  localStorage.setItem(STORAGE.lastVisit, today)
  writeNumber(STORAGE.streak, next)
  return next
}

export function ProgressProvider({ children }) {
  const { missions } = useMission()
  const [xp, setXp] = useState(() => readNumber(STORAGE.xp))
  const [confidence, setConfidence] = useState(() => readNumber(STORAGE.confidence))
  const [completedMissions, setCompletedMissions] = useState(() => readJson(STORAGE.completed, {}))
  const [repetitions, setRepetitions] = useState(() => readJson(STORAGE.repetitions, {}))
  const [weakAreas, setWeakAreas] = useState(() => readJson(STORAGE.weakAreas, {}))
  const [badges, setBadges] = useState(() => readJson(STORAGE.badges, []))
  const [sectionProgress, setSectionProgress] = useState(() => readJson(STORAGE.sectionProgress, {}))
  const [ticketStatus, setTicketStatus] = useState(() => readJson(STORAGE.tickets, {}))
  const [explainState, setExplainState] = useState(() => readJson(STORAGE.explain, {}))
  const [verifyState, setVerifyState] = useState(() => readJson(STORAGE.verify, {}))
  const [reflectionState, setReflectionState] = useState(() => readJson(STORAGE.reflection, {}))
  const [repeatQueue, setRepeatQueue] = useState(() => normalizeRepeatQueue(readJson(STORAGE.repeatQueue, [])))
  const [streak, setStreak] = useState(() => updateStreak())

  const unlockedMissions = useMemo(() => getUnlockedMissionIds(missions, completedMissions), [completedMissions, missions])
  const currentMissionId = useMemo(() => getCurrentMissionId(missions, completedMissions), [completedMissions, missions])
  const currentRank = useMemo(() => getRankTitle(Object.keys(completedMissions).length, [
    'New Computer User',
    'IT Explorer',
    'IT Intern',
    'Junior Technician',
    'Help Desk Technician',
    'Desktop Support',
    'Endpoint Specialist',
    'Endpoint Administrator',
    'Endpoint Engineer',
  ]), [completedMissions])
  const promotionProgress = useMemo(() => getPromotionProgress(Object.keys(completedMissions).length), [completedMissions])

  useEffect(() => writeNumber(STORAGE.xp, xp), [xp])
  useEffect(() => writeNumber(STORAGE.confidence, confidence), [confidence])
  useEffect(() => writeJson(STORAGE.completed, completedMissions), [completedMissions])
  useEffect(() => writeJson(STORAGE.repetitions, repetitions), [repetitions])
  useEffect(() => writeJson(STORAGE.weakAreas, weakAreas), [weakAreas])
  useEffect(() => writeJson(STORAGE.unlocked, unlockedMissions), [unlockedMissions])
  useEffect(() => writeJson(STORAGE.badges, badges), [badges])
  useEffect(() => writeJson(STORAGE.sectionProgress, sectionProgress), [sectionProgress])
  useEffect(() => writeJson(STORAGE.tickets, ticketStatus), [ticketStatus])
  useEffect(() => writeJson(STORAGE.explain, explainState), [explainState])
  useEffect(() => writeJson(STORAGE.verify, verifyState), [verifyState])
  useEffect(() => writeJson(STORAGE.reflection, reflectionState), [reflectionState])
  useEffect(() => writeJson(STORAGE.repeatQueue, repeatQueue), [repeatQueue])
  useEffect(() => writeJson(STORAGE.rank, currentRank), [currentRank])
  useEffect(() => setStreak(updateStreak()), [])

  function resetAll() {
    removeKeys(Object.values(STORAGE))
    window.location.hash = '#/'
    window.location.reload()
  }

  function awardTicketOpen(missionId) {
    if (!isSectionDone(missionId, 'ticket')) {
      setXp((value) => value + TICKET_OPEN_XP)
    }
    markSectionDone(missionId, 'ticket')
  }

  function markSectionDone(missionId, section) {
    setSectionProgress((current) => ({
      ...current,
      [missionId]: {
        ...(current[missionId] || {}),
        [section]: true,
      },
    }))
  }

  function isSectionDone(missionId, section) {
    return Boolean(sectionProgress[missionId] && sectionProgress[missionId][section])
  }

  function logRepeat(missionId) {
    setRepetitions((current) => {
      const nextCount = Number(current[missionId] || 0) + 1
      if (nextCount >= 3) {
        markSectionDone(missionId, 'repeat')
      }
      return {
        ...current,
        [missionId]: nextCount,
      }
    })
  }

  function saveExplain(missionId, answers) {
    setExplainState((current) => ({
      ...current,
      [missionId]: answers,
    }))

    const total = Object.values(answers).join(' ').trim().length
    if (total >= 30) {
      markSectionDone(missionId, 'explain')
      return true
    }
    return false
  }

  function saveVerify(missionId, answers) {
    setVerifyState((current) => ({
      ...current,
      [missionId]: answers,
    }))

    const ready = answers.explain && answers.perform && answers.troubleshoot && answers.repeat && answers.withoutHints
    if (ready) {
      markSectionDone(missionId, 'verification')
      setConfidence((value) => value + 1)
    } else {
      setConfidence((value) => Math.max(0, value - 1))
      scheduleRepeat(missionId, 'red', false)
    }
    return ready
  }

  function resolveTicket(missionId) {
    setTicketStatus((current) => ({
      ...current,
      [missionId]: true,
    }))
    markSectionDone(missionId, 'completion')
  }

  function claimRewards(missionId) {
    if (isSectionDone(missionId, 'rewards')) {
      return
    }
    setXp((value) => value + COMPLETION_XP)
    setConfidence((value) => value + CONFIDENCE_GAIN)
    setBadges((current) => (current.includes(`${missionId}-complete`) ? current : [...current, `${missionId}-complete`]))
    markSectionDone(missionId, 'rewards')
  }

  function scheduleRepeat(missionId, confidence = 'red', shouldEscalate = false) {
    setRepeatQueue((current) => scheduleRepeatEntry(current, missionId, confidence, shouldEscalate))
  }

  function clearRepeat(missionId) {
    setRepeatQueue((current) => clearRepeatEntry(current, missionId))
  }

  function markWeakAreas(missionId, areas) {
    setWeakAreas((current) => ({
      ...current,
      [missionId]: [...new Set(areas)],
    }))
  }

  function clearMissionWeakAreas(missionId) {
    setWeakAreas((current) => {
      const next = { ...current }
      delete next[missionId]
      return next
    })
  }

  function completeMission(missionId, reflectionText) {
    if (!reflectionText.trim()) {
      return { ok: false, missing: ['reflection'] }
    }

    setReflectionState((current) => ({
      ...current,
      [missionId]: reflectionText,
    }))

    const missing = []
    const missionRepeats = Number(repetitions[missionId] || 0)
    const explainEntry = explainState[missionId] || { q1: '', q2: '', q3: '' }
    const verifyEntry = verifyState[missionId] || {}

    if (!isSectionDone(missionId, 'do')) missing.push('do')
    if (!isSectionDone(missionId, 'breakfix')) missing.push('breakfix')
    if (missionRepeats < 3) missing.push('repeat')
    if (Object.values(explainEntry).join(' ').trim().length < 30) missing.push('explain')
    if (!(verifyEntry.explain && verifyEntry.perform && verifyEntry.troubleshoot && verifyEntry.repeat && verifyEntry.withoutHints)) missing.push('verification')
    if (!ticketStatus[missionId]) missing.push('ticket')

    if (missing.length) {
      scheduleRepeat(missionId, 'red', true)
      markWeakAreas(missionId, missing)
      return { ok: false, missing }
    }

    setCompletedMissions((current) => ({
      ...current,
      [missionId]: true,
    }))
    clearRepeat(missionId)
    clearMissionWeakAreas(missionId)
    return { ok: true, missing: [] }
  }

  function isTicketUnlocked(missionId) {
    const missionRepeats = Number(repetitions[missionId] || 0)
    const explainEntry = explainState[missionId] || { q1: '', q2: '', q3: '' }
    const verifyEntry = verifyState[missionId] || {}

    return Boolean(
      isSectionDone(missionId, 'do')
      && isSectionDone(missionId, 'breakfix')
      && missionRepeats >= 3
      && Object.values(explainEntry).join(' ').trim().length >= 30
      && verifyEntry.explain
      && verifyEntry.perform
      && verifyEntry.troubleshoot
      && verifyEntry.repeat
      && verifyEntry.withoutHints,
    )
  }

  const value = useMemo(
    () => ({
      xp,
      confidence,
      completedMissions,
      repetitions,
      weakAreas,
      unlockedMissions,
      badges,
      rank: currentRank,
      promotionProgress,
      sectionProgress,
      ticketStatus,
      explainState,
      verifyState,
      reflectionState,
      repeatQueue,
      streak,
      currentMissionId,
      isTicketUnlocked,
      resetAll,
      awardTicketOpen,
      markSectionDone,
      isSectionDone,
      logRepeat,
      saveExplain,
      saveVerify,
      resolveTicket,
      claimRewards,
      scheduleRepeat,
      completeMission,
      setConfidence,
    }),
    [
      badges,
      completedMissions,
      confidence,
      currentMissionId,
      currentRank,
      explainState,
      promotionProgress,
      repeatQueue,
      repetitions,
      sectionProgress,
      streak,
      ticketStatus,
      unlockedMissions,
      verifyState,
      weakAreas,
      xp,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used inside ProgressProvider')
  }
  return context
}
