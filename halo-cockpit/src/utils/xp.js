export const TICKET_OPEN_XP = 10
export const COMPLETION_XP = 10
export const CONFIDENCE_GAIN = 1

export function titleThresholds() {
  return [0, 1, 2, 3, 4, 6, 8, 10, 12]
}

export function getRankTitle(completedMissionCount, titles) {
  const thresholds = titleThresholds()
  let index = 0

  thresholds.forEach((threshold, currentIndex) => {
    if (completedMissionCount >= threshold) {
      index = currentIndex
    }
  })

  return titles[Math.min(index, titles.length - 1)]
}

export function getPromotionProgress(completedMissionCount) {
  const thresholds = titleThresholds()
  let currentIndex = 0

  thresholds.forEach((threshold, index) => {
    if (completedMissionCount >= threshold) {
      currentIndex = index
    }
  })

  const current = thresholds[currentIndex]
  const next = thresholds[Math.min(currentIndex + 1, thresholds.length - 1)]

  if (next === current) {
    return 100
  }

  return Math.floor(((completedMissionCount - current) / (next - current)) * 100)
}
