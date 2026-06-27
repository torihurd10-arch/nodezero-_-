export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function readNumber(key, fallback = 0) {
  const raw = Number(localStorage.getItem(key))
  return Number.isFinite(raw) ? raw : fallback
}

export function writeNumber(key, value) {
  localStorage.setItem(key, String(Math.max(0, Number(value) || 0)))
}

export function removeKeys(keys) {
  keys.forEach((key) => localStorage.removeItem(key))
}
