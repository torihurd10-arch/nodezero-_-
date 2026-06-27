export default function XPBar({ value }) {
  const normalized = Math.min(100, value % 100)
  return (
    <div>
      <div className="section-title">XP Bar</div>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  )
}
