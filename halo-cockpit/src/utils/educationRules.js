export function buildTeachingPlan(skill) {
  return {
    whatLearnerAlreadyKnows: skill.prerequisites.length ? skill.prerequisites.join(', ') : 'Nothing yet',
    singleNewIdea: skill.learningObjectives[0],
    likelyMisconception: skill.commonMistakes[0],
    realITProblem: skill.ticketIdeas[0],
    bestInteraction: skill.supportedGameTypes[0],
    safeMistake: skill.breakFixTasks[0],
    masteryProof: 'Do it, explain it, troubleshoot it, repeat it, and solve a related ticket.',
    reviewStrategy: 'Guided attempt, hinted attempt, no-hint attempt, timer challenge, and new scenario challenge.',
    endpointAutomationConnection: skill.automationOpportunities[0],
  }
}
