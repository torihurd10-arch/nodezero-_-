const gameLibrary = [
  'Mission Ticket',
  'Desktop Simulation',
  'Windows Simulation',
  'File Explorer Simulation',
  'Drag & Drop',
  'Matching',
  'Ordering Steps',
  'Spot the Mistake',
  'Break/Fix',
  'Scenario Quiz',
  'Choose the Correct Tool',
  'Speed Run',
  'Timed Ticket',
  'Daily Review Ticket',
  'Boss Challenge',
  'Final Certification Mission',
]

export function generateSkillExperiences(skill) {
  return {
    gameTemplates: skill.supportedGameTypes.filter((type) => gameLibrary.includes(type)),
    generatedExperiences: [
      'Mission/Ticket',
      'Interactive Simulation',
      'Guided Practice',
      'Unguided Practice',
      'Break/Fix Challenge',
      'Drag-and-Drop Activity',
      'Matching Game',
      'Scenario Quiz',
      'Explain Challenge',
      'Daily Review Version',
      'Speed Challenge',
      'Mastery Challenge',
      'Glossary Entry',
      'XP Reward',
      'NPC Dialogue',
      'Progress Tracking',
      'Automation Preview',
    ],
  }
}
