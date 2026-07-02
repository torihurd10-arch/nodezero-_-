import { createContext, useContext, useEffect, useMemo, useState } from "react"

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
      recentXpGain: 0,
      missionHistory: [],
      achievements: [],
      recentXpGain: 0,
      missionHistory: [],
      achievements: [],
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
      recentXpGain: Number(parsed.recentXpGain || 0),
      missionHistory: Array.isArray(parsed.missionHistory) ? parsed.missionHistory : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    }
  } catch {
    return {
      focusMode: false,
      lastAction: "Awaiting command",
      xp: 0,
      activeModule: "Learn",
      missionProgress: { learn: false, see: false, practice: false },
      recentXpGain: 0,
      missionHistory: [],
      achievements: [],
    }
  }
}

export function HUDProvider({ children }) {
  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    if (!state.recentXpGain) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setState((prev) => ({ ...prev, recentXpGain: 0 }))
    }, 900)

    return () => window.clearTimeout(timer)
  }, [state.recentXpGain])

  const setFocusMode = (value) => {
    setState((prev) => ({ ...prev, focusMode: value }))
  }

  const setLastAction = (value) => {
    setState((prev) => ({ ...prev, lastAction: value }))
  }

  const addMissionHistory = (text) => {
    setState((prev) => ({
      ...prev,
      missionHistory: [
        { id: crypto.randomUUID?.() || String(Date.now()), text, time: new Date().toLocaleTimeString() },
        ...prev.missionHistory,
      ].slice(0, 8),
    }))
  }

  const setActiveModule = (module) => {
    setState((prev) => ({
      ...prev,
      activeModule: module,
      lastAction: `Switched to ${module} mode.`,
    }))
    addMissionHistory(`Module switched to ${module}.`)
  }

  const addXP = (amount) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + amount,
      recentXpGain: amount,
    }))
    addMissionHistory(`XP gained: +${amount}.`)
  }

  const startMission = () => {
    setState((prev) => ({
      ...prev,
      activeModule: "Learn",
      lastAction: "Mission launched. Begin with Learn mode.",
    }))
    addMissionHistory("Mission launched. Training sequence started.")
  }

  const completeModule = (moduleKey) => {
    setState((prev) => {
      if (prev.missionProgress[moduleKey]) {
        addMissionHistory(`${moduleKey.toUpperCase()} checkpoint already complete.`)
        return {
          ...prev,
          lastAction: `${moduleKey.toUpperCase()} already completed.`,
        }
      }

      const achievement = `${moduleKey}_complete`
      const nextAchievements = prev.achievements.includes(achievement)
        ? prev.achievements
        : [...prev.achievements, achievement]

      return {
        ...prev,
        xp: prev.xp + 25,
        recentXpGain: 25,
        missionProgress: {
          ...prev.missionProgress,
          [moduleKey]: true,
        },
        achievements: nextAchievements,
        lastAction: `${moduleKey.toUpperCase()} checkpoint complete. +25 XP`,
      }
    })
    addMissionHistory(`${moduleKey.toUpperCase()} checkpoint complete. +25 XP.`)
  }

  const resetMission = () => {
    setState((prev) => ({
      ...prev,
      activeModule: "Learn",
      missionProgress: { learn: false, see: false, practice: false },
      lastAction: "Mission progress reset. Ready to run again.",
      recentXpGain: 0,
    }))
    addMissionHistory("Mission progress reset.")
  }

  const unlockedAchievementLabels = useMemo(() => {
    const labels = []
    if (state.xp >= 10) labels.push("First Run")
    if (state.missionProgress.learn) labels.push("Learning Locked")
    if (state.missionProgress.see) labels.push("See Locked")
    if (state.missionProgress.practice) labels.push("Practice Locked")
    if (state.xp >= 100) labels.push("Overdrive")
    return labels
  }, [state.xp, state.missionProgress])

  const value = useMemo(
    () => ({
      focusMode: state.focusMode,
      setFocusMode,
      lastAction: state.lastAction,
      setLastAction,
      xp: state.xp,
      activeModule: state.activeModule,
      missionProgress: state.missionProgress,
      recentXpGain: state.recentXpGain,
      missionHistory: state.missionHistory,
      achievements: unlockedAchievementLabels,
      setActiveModule,
      addXP,
      startMission,
      completeModule,
      resetMission,
      missionPercent: Math.round(
        (Object.values(state.missionProgress).filter(Boolean).length / 3) * 100,
      ),
    }),
    [state, unlockedAchievementLabels],
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
