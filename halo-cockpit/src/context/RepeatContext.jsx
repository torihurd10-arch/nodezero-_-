import { createContext, useContext, useMemo } from 'react'
import { useMission } from './MissionContext'
import { useProgress } from './ProgressContext'

const RepeatContext = createContext(null)

export function RepeatProvider({ children }) {
  const { getMissionById } = useMission()
  const { repeatQueue, weakAreas, repetitions, confidence } = useProgress()

  const calls = useMemo(() => {
    return Object.entries(repeatQueue)
      .map(([missionId, items]) => ({
        mission: getMissionById(missionId),
        items,
        weakAreas: weakAreas[missionId] || [],
        repetitions: repetitions[missionId] || 0,
        confidence,
      }))
      .filter((entry) => Boolean(entry.mission))
  }, [confidence, getMissionById, repeatQueue, repetitions, weakAreas])

  return <RepeatContext.Provider value={{ calls }}>{children}</RepeatContext.Provider>
}

export function useRepeat() {
  const context = useContext(RepeatContext)
  if (!context) {
    throw new Error('useRepeat must be used inside RepeatProvider')
  }
  return context
}
