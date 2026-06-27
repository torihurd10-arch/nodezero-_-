export default function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="section-title">{label}</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
