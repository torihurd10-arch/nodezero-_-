import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Card from '../../components/ui/Card'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import { useRepeat } from '../../context/RepeatContext'

export default function RepeatQueuePage() {
  const { getMissionById } = useMission()
  const progress = useProgress()
  const { calls } = useRepeat()
  const currentMission = getMissionById(progress.currentMissionId)

  return (
    <div className="app-shell">
      <Header
        title="Today's Calls"
        xp={progress.xp}
        confidence={progress.confidence}
        mission={currentMission?.title || 'No mission'}
        calls={Math.max(calls.length, 3)}
        streak={progress.streak}
        promotionProgress={progress.promotionProgress}
        rank={progress.rank}
        onReset={progress.resetAll}
      />
      <main className="layout-stack">
        <section className="calls-grid">
          {(calls.length ? calls : []).map((call) => (
            <Card key={call.mission.id}>
              <h3 className="section-title">{call.mission.title}</h3>
              <p><strong>Weak Areas:</strong> {call.weakAreas.join(', ') || 'None listed'}</p>
              <p><strong>Repetitions:</strong> {call.repetitions}</p>
              <ul className="list-clean">
                {call.items.map((item) => (
                  <li key={`${call.mission.id}-${item.label}`}>{item.label} - {item.date}</li>
                ))}
              </ul>
            </Card>
          ))}
          {!calls.length ? <Card><h3 className="section-title">Today's Calls</h3><p>Sarah forgot password again</p><p>Install Chrome</p><p>Find Downloads folder</p><p>Computer won't shut down</p></Card> : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}
