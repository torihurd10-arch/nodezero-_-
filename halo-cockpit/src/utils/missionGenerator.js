import { buildTeachingPlan } from './educationRules'
import { generateSkillExperiences } from './skillToGame'

export function generateMissionPackage(mission, skill, npc) {
  return {
    ...mission,
    skill,
    npcProfile: npc,
    aiRules: buildTeachingPlan(skill),
    gameEngine: generateSkillExperiences(skill),
    automationPreview: skill.automationOpportunities[0],
    workplaceDialog: `${npc.name}: ${mission.ticket}`,
  }
}
