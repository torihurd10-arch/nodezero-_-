import { createContext, useContext, useMemo } from 'react'
import glossaryTerms from '../data/glossary.json'
import { missions as missionsRaw } from '../data/missions/index.js'
import npcs from '../data/npc.json'
import { skillLibrary } from '../data/skillLibrary'
import { generateMissionPackage } from '../utils/missionGenerator'

const MissionContext = createContext(null)

function npcForMission(mission) {
  const npcPool = Array.isArray(npcs?.npc) ? npcs.npc : []
  const missionNpc = (mission.npc || '').toLowerCase().trim()
  return npcPool.find((entry) => entry.name.toLowerCase() === missionNpc) || npcPool[0] || { name: 'Boss', favoritePhrases: ['Good morning, IT Intern.'] }
}

export function MissionProvider({ children }) {
  const missions = useMemo(() => {
    return missionsRaw.map((mission, index) => {
      const skill = skillLibrary[index % skillLibrary.length] || skillLibrary[0]
      return generateMissionPackage(mission, skill, npcForMission(mission))
    })
  }, [])

  const glossary = useMemo(() => {
    const generated = missions.flatMap((mission) =>
      mission.translationTerms.map((term) => ({
        word: term.word,
        plain: term.plain,
        where: term.where,
        why: term.why,
        example: term.example,
      })),
    )

    return [...glossaryTerms, ...generated]
  }, [missions])

  const value = useMemo(
    () => ({
      missions,
      glossary,
      npcs: Array.isArray(npcs?.npc) ? npcs.npc : [],
      skillLibrary,
      getMissionById: (missionId) => missions.find((mission) => mission.id === missionId) || null,
    }),
    [glossary, missions],
  )

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>
}

export function useMission() {
  const context = useContext(MissionContext)
  if (!context) {
    throw new Error('useMission must be used inside MissionProvider')
  }
  return context
}
