export function missionOrder(missions) {
  return missions.map((mission) => mission.id)
}

export function getUnlockedMissionIds(missions, completedMissions) {
  const order = missionOrder(missions)
  return order.filter((missionId, index) => index === 0 || completedMissions[order[index - 1]])
}

export function getCurrentMissionId(missions, completedMissions) {
  const current = missions.find((mission) => !completedMissions[mission.id])
  return current ? current.id : missions.at(-1)?.id ?? ''
}

export function getLevelLabel(level) {
  return level === 0 ? 'Level 0 - Computer Fundamentals' : 'Level 1 - Windows Fundamentals'
}
