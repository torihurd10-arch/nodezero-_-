import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Card from '../../components/ui/Card'
import Panel from '../../components/ui/Panel'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import { useRepeat } from '../../context/RepeatContext'

export default function Dashboard() {
  const { getMissionById } = useMission()
  const { resetAll, xp, confidence, currentMissionId, rank, streak, promotionProgress, repeatQueue } = useProgress()
  const { calls } = useRepeat()
  const currentMission = getMissionById(currentMissionId)

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
          <Panel title="Good Morning, IT Intern.">
            <p>Today starts with realistic support work, not textbook reading.</p>
            <div className="ticket-banner">
              <p><strong>Current Mission:</strong> {currentMission?.title}</p>
              <p><strong>Daily Goal:</strong> Finish one mission section, one repeat, and one verification step.</p>
              <p><strong>Promotion Progress:</strong> {promotionProgress}%</p>
            </div>
          </Panel>
          <Panel title="Today's Calls">
            <ul className="list-clean">
              {(calls.length ? calls.slice(0, 4).map((entry) => entry.mission?.title || entry.items[0]?.reason) : [
                'Sarah cannot find Downloads',
                'Mike cannot install Chrome',
                'Printer offline',
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>
        <div className="dashboard-grid">
          <Card>
            <h2 className="section-title">Confidence System</h2>
            <p>🟢 I can teach this</p>
            <p>🟡 I need a reminder</p>
            <p>🔴 I still don't get it</p>
            <p>Low confidence adds more calls. High confidence unlocks harder tickets.</p>
          </Card>
          <Card>
            <h2 className="section-title">Repeat Queue</h2>
            <p>{Object.keys(repeatQueue).length} active mission reviews scheduled.</p>
            <p>Tomorrow, 3 days, 1 week, 2 weeks, 1 month.</p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
