export const repeatIntervals = [1, 3, 7, 14, 30]

function addDays(baseDate, days) {
  const next = new Date(baseDate)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

export function scheduleReview(missionId, reason) {
  const today = new Date()
  return repeatIntervals.map((days) => ({
    missionId,
    label: days === 1 ? 'Tomorrow' : days === 3 ? '3 Days' : days === 7 ? '1 Week' : days === 14 ? '2 Weeks' : '1 Month',
    date: addDays(today, days),
    reason,
  }))
}
