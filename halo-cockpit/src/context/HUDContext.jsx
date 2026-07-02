import { createContext, useContext, useMemo, useState } from "react"

const HUDContext = createContext(null)

const STORAGE_KEY = "halo_cockpit_hud"

function getInitialState() {
  if (typeof window === "undefined") {
    return {
      focusMode: false,
      lastAction: "Awaiting command",
      xp: 0,
      activeModule: "Learn",
      missionProgress: { learn: false, see: false, practice: false },
    }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        focusMode: false,
        lastAction: "Awaiting command",
        xp: 0,
        activeModule: "Learn",
        missionProgress: { learn: false, see: false, practice: false },
      }
    }
    const parsed = JSON.parse(raw)
    return {
      focusMode: Boolean(parsed.focusMode),
      lastAction: parsed.lastAction || "Awaiting command",
      xp: Number(parsed.xp || 0),
      activeModule: parsed.activeModule || "Learn",
      missionProgress: parsed.missionProgress || { learn: false, see: false, practice: false },
    }
  } catch {
    return {
      focusMode: false,
      lastAction: "Awaiting command",
      xp: 0,
      activeModule: "Learn",
      missionProgress: { learn: false, see: false, practice: false },
    }
  }
}

export function HUDProvider({ children }) {
  const [state, setState] = useState(getInitialState)

  const setFocusMode = (value) => {
    setState((prev) => ({ ...prev, focusMode: value }))
  }

  const setLastAction = (value) => {
    setState((prev) => ({ ...prev, lastAction: value }))
  }

  const setActiveModule = (module) => {
    setState((prev) => ({
      ...prev,
      activeModule: module,
      lastAction: `Switched to ${module} mode.`,
    }))
  }

  const addXP = (amount) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }))
  }

  const startMission = () => {
    setState((prev) => ({
      ...prev,
      activeModule: "Learn",
      lastAction: "Mission launched. Begin with Learn mode.",
    }))
  }

  const completeModule = (moduleKey) => {
    setState((prev) => {
      if (prev.missionProgress[moduleKey]) {
        return {
          ...prev,
          lastAction: `${moduleKey.toUpperCase()} already completed.`,
        }
      }

      return {
        ...prev,
        xp: prev.xp + 25,
        missionProgress: {
          ...prev.missionProgress,
          [moduleKey]: true,
        },
        lastAction: `${moduleKey.toUpperCase()} checkpoint complete. +25 XP`,
      }
    })
  }

  const resetMission = () => {
    setState((prev) => ({
      ...prev,
      activeModule: "Learn",
      missionProgress: { learn: false, see: false, practice: false },
      lastAction: "Mission progress reset. Ready to run again.",
    }))
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  const value = useMemo(
    () => ({
      focusMode: state.focusMode,
      setFocusMode,
      lastAction: state.lastAction,
      setLastAction,
      xp: state.xp,
      activeModule: state.activeModule,
      missionProgress: state.missionProgress,
      setActiveModule,
      addXP,
      startMission,
      completeModule,
      resetMission,
      missionPercent: Math.round(
        (Object.values(state.missionProgress).filter(Boolean).length / 3) * 100,
      ),
    }),
    [state],
  )

  return <HUDContext.Provider value={value}>{children}</HUDContext.Provider>
}

export function useHUD() {
  const context = useContext(HUDContext)
  if (!context) {
    throw new Error("useHUD must be used within HUDProvider")
  }
  return context
}
