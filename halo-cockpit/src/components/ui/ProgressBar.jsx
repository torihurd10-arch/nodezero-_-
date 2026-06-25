export default function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full rounded bg-white/10">
      <div className="h-2 rounded bg-haloBlue transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}
