import { createContext, useContext, useMemo } from 'react'
import { useMission } from './MissionContext'
import { useProgress } from './ProgressContext'
import { getDueRepeatEntries } from '../utils/repeatQueue'

const RepeatContext = createContext(null)

export function RepeatProvider({ children }) {
  const { missions, getMissionById } = useMission()
  const { repeatQueue, weakAreas, repetitions, confidence, completedMissions } = useProgress()

  const dueCalls = useMemo(() => {
    return getDueRepeatEntries(repeatQueue)
      .map((entry) => ({
        mission: getMissionById(entry.missionId),
        nextDueDate: entry.nextDueDate,
        confidence: entry.confidence,
        weakAreas: weakAreas[entry.missionId] || [],
        repetitions: repetitions[entry.missionId] || 0,
      }))
      .filter((entry) => Boolean(entry.mission))
  }, [getMissionById, repeatQueue, repetitions, weakAreas])

  const newMissionCalls = useMemo(() => {
    return missions
      .filter((mission) => !completedMissions[mission.id])
      .slice(0, 3)
      .map((mission) => ({
        mission,
        nextDueDate: '',
        confidence: 'yellow',
        weakAreas: [],
        repetitions: repetitions[mission.id] || 0,
      }))
  }, [completedMissions, missions, repetitions])

  const calls = useMemo(() => {
    const merged = [...dueCalls]
    newMissionCalls.forEach((entry) => {
      if (!merged.some((call) => call.mission.id === entry.mission.id)) {
        merged.push(entry)
      }
    })
    return merged.slice(0, 3)
  }, [dueCalls, newMissionCalls])

  return <RepeatContext.Provider value={{ calls, dueCalls }}>{children}</RepeatContext.Provider>
}

export function useRepeat() {
  const context = useContext(RepeatContext)
  if (!context) {
    throw new Error('useRepeat must be used inside RepeatProvider')
  }
  return context
}
