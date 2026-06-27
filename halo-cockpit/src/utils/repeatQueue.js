const repeatIntervals = [1, 3, 7, 30]

function toDateString(value = new Date()) {
  return new Date(value).toISOString().slice(0, 10)
}

function addDays(baseDate, days) {
  const next = new Date(baseDate)
  next.setDate(next.getDate() + days)
  return toDateString(next)
}

function normalizeConfidence(confidence) {
  if (confidence === 'green' || confidence === 'yellow' || confidence === 'red') {
    return confidence
  }
  return 'red'
}

function nextStage(currentEntry, shouldEscalate) {
  const previous = Number(currentEntry?._stage || 0)
  if (!shouldEscalate) {
    return 0
  }
  return Math.min(previous + 1, repeatIntervals.length - 1)
}

export function normalizeRepeatQueue(queue) {
  if (!Array.isArray(queue)) {
    return []
  }

  return queue
    .filter((entry) => entry && typeof entry.missionId === 'string')
    .map((entry) => ({
      missionId: entry.missionId,
      nextDueDate: entry.nextDueDate || toDateString(),
      confidence: normalizeConfidence(entry.confidence),
      _stage: Number(entry._stage || 0),
    }))
}

export function scheduleRepeatEntry(queue, missionId, confidence = 'red', shouldEscalate = false) {
  const normalized = normalizeRepeatQueue(queue)
  const existing = normalized.find((entry) => entry.missionId === missionId)
  const stage = nextStage(existing, shouldEscalate || confidence === 'red')
  const nextDueDate = addDays(new Date(), repeatIntervals[stage])

  const nextEntry = {
    missionId,
    nextDueDate,
    confidence: normalizeConfidence(confidence),
    _stage: stage,
  }

  return [...normalized.filter((entry) => entry.missionId !== missionId), nextEntry]
}

export function clearRepeatEntry(queue, missionId) {
  return normalizeRepeatQueue(queue).filter((entry) => entry.missionId !== missionId)
}

export function getDueRepeatEntries(queue) {
  const today = toDateString()
  return normalizeRepeatQueue(queue).filter((entry) => entry.nextDueDate <= today)
}
