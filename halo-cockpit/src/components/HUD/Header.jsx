import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import TitleBadge from './TitleBadge'
import XPBar from './XPBar'

export default function Header({ title, xp, confidence, mission, calls, streak, promotionProgress, rank, onReset }) {
  return (
    <header className="hud-header">
      <div className="hud-top">
        <div>
          <div className="hud-title">Good Morning, {rank}.</div>
          <p className="hero-line">Solve a problem. Learn something. Gain confidence.</p>
        </div>
        <TitleBadge title={title || rank} />
      </div>
      <div className="hud-stats">
        <span className="stat-pill">XP: {xp}</span>
        <span className="stat-pill">Confidence: {confidence}</span>
        <span className="stat-pill">Current Mission: {mission}</span>
        <span className="stat-pill">Today's Calls: {calls}</span>
        <span className="stat-pill">Streak: {streak}</span>
      </div>
      <div className="layout-stack">
        <XPBar value={xp} />
        <ProgressBar label="Promotion Progress" value={promotionProgress} />
      </div>
      <nav className="hud-nav">
        <Link className="nav-link" to="/">Dashboard</Link>
        <Link className="nav-link" to="/missions">Missions</Link>
        <Link className="nav-link" to="/glossary">Glossary</Link>
        <Link className="nav-link" to="/calls">Today's Calls</Link>
        <Link className="nav-link" to="/tickets">Tickets</Link>
        <button className="button" type="button" onClick={onReset}>Reset</button>
      </nav>
    </header>
  )
}
