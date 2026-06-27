import { Link } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Card from '../../components/ui/Card'
import Panel from '../../components/ui/Panel'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import { useRepeat } from '../../context/RepeatContext'

export default function Dashboard() {
  const { getMissionById, npcs } = useMission()
  const { resetAll, xp, confidence, currentMissionId, rank, streak, promotionProgress, repeatQueue } = useProgress()
  const { calls } = useRepeat()
  const currentMission = getMissionById(currentMissionId)
  const boss = npcs.find((entry) => entry.name === 'Boss')
  const bossMessage = boss?.favoritePhrases?.[0] || 'Good morning, IT Intern.'

  return (
    <div className="app-shell">
      <Header
        title="Mission Desk"
        xp={xp}
        confidence={confidence}
        mission={currentMission?.title || 'No mission'}
        calls={Math.max(calls.length, 3)}
        streak={streak}
        promotionProgress={promotionProgress}
        rank={rank}
        onReset={resetAll}
      />
      <main className="layout-stack">
        <div className="dashboard-grid">
          <Panel title="Good Morning, IT Intern." className="bg-hudPanel shadow-halo">
            <p>{bossMessage}</p>
            <div className="ticket-banner">
              <p><strong>Current Mission:</strong> {currentMission?.title}</p>
              <p><strong>Daily Goal:</strong> Clear one mission, one repeat call, and one verification step.</p>
              <p><strong>Manager Note:</strong> Solve real tickets first, then explain what you fixed.</p>
            </div>
          </Panel>
          <Panel title="Today's Calls" className="bg-hudPanel shadow-halo">
            <ul className="list-clean">
              {(calls.length ? calls.map((entry) => `${entry.mission?.title}${entry.nextDueDate ? ` (Due ${entry.nextDueDate})` : ''}`) : [
                'Sarah cannot find Downloads',
                'Mike cannot install Chrome',
                'Printer offline',
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>
        <div className="dashboard-grid dashboard-side-grid">
          <Card className="bg-hudPanel shadow-halo">
            <h2 className="section-title text-haloBlue">XP Bar</h2>
            <p>{xp} XP earned</p>
            <h2 className="section-title text-haloBlue">Confidence Meter</h2>
            <p>{confidence} total confidence</p>
            <h2 className="section-title text-haloBlue">Current Rank</h2>
            <p>{rank}</p>
            <h2 className="section-title text-haloBlue">Streak</h2>
            <p>{streak} day streak</p>
            <h2 className="section-title text-haloBlue">Repeat Queue Count</h2>
            <p>{repeatQueue.length} active repeat calls</p>
            <p><strong>Promotion Progress:</strong> {promotionProgress}%</p>
          </Card>
          <Card className="bg-hudPanel shadow-halo">
            <h2 className="section-title text-haloBlue">Actions</h2>
            <div className="dashboard-actions">
              <Link className="button" to={currentMissionId ? `/missions/${currentMissionId}/ticket` : '/missions'}>Continue Mission</Link>
              <Link className="button" to="/glossary">Glossary</Link>
              <Link className="button" to="/tickets">Tickets</Link>
              <Link className="button" to="/calls">Repeat Queue</Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
