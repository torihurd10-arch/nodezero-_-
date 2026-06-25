import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LEVELS } from '../data/content'

const STORAGE_KEYS = {
  progress: 'nodezero_progress',
  xp: 'nodezero_xp',
  streak: 'nodezero_streak',
  settings: 'nodezero_settings',
}

const allRooms = LEVELS.flatMap((level) => level.rooms)

const AppStateContext = createContext(null)

function parseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function getInitialState() {
  if (typeof window === 'undefined') {
    return { progress: {}, xp: 0, streak: 0, settings: { darkMode: true, focusMode: false } }
  }

  return {
    progress: parseJSON(window.localStorage.getItem(STORAGE_KEYS.progress), {}),
    xp: Number.parseInt(window.localStorage.getItem(STORAGE_KEYS.xp) || '0', 10),
    streak: Number.parseInt(window.localStorage.getItem(STORAGE_KEYS.streak) || '0', 10),
    settings: parseJSON(window.localStorage.getItem(STORAGE_KEYS.settings), { darkMode: true, focusMode: false }),
  }
}

function getUnlockedRooms(progress) {
  return allRooms.filter((room) => {
    if (room.level === 0 || progress[room.id]) {
      return true
    }

    const levelRoomCount = LEVELS.find((l) => l.id === room.level)?.rooms.length ?? 0
    const previousLevelComplete = Object.keys(progress).filter((id) => id.startsWith(`room${room.level - 1}_`)).length
    return previousLevelComplete >= levelRoomCount
  })
}

export function AppStateProvider({ children }) {
  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress))
    window.localStorage.setItem(STORAGE_KEYS.xp, String(state.xp))
    window.localStorage.setItem(STORAGE_KEYS.streak, String(state.streak))
    window.localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings))

    document.documentElement.classList.toggle('dark', state.settings.darkMode)
    document.body.classList.toggle('focus-mode', state.settings.focusMode)
  }, [state])

  const completeRoom = (roomId) => {
    setState((prev) => {
      if (prev.progress[roomId]) {
        return prev
      }

      return {
        ...prev,
        progress: { ...prev.progress, [roomId]: true },
        xp: prev.xp + 50,
        streak: prev.streak + 1,
      }
    })
  }

  const resetProgress = () => {
    setState((prev) => ({ ...prev, progress: {}, xp: 0, streak: 0 }))
  }

  const setSetting = (key, value) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }))
  }

  const value = useMemo(() => {
    const unlockedRooms = getUnlockedRooms(state.progress)
    const level = Math.floor(state.xp / 100)
    const nextRoom = allRooms.find((room) => !state.progress[room.id]) || null

    return {
      ...state,
      unlockedRooms,
      level,
      nextRoom,
      completeRoom,
      resetProgress,
      setSetting,
      allRooms,
    }
  }, [state])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }
  return context
}
