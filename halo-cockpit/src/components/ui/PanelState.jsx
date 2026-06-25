export function LoadingState() {
  return <p className="text-xs text-gray-400">Loading module data…</p>
}

export function EmptyState({ message }) {
  return <p className="text-xs text-gray-400">{message}</p>
}

export function ErrorState({ message }) {
  return <p className="text-xs text-rose-300">{message}</p>
}
