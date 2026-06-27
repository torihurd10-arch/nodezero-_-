import { Navigate, useParams } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Panel from '../../components/ui/Panel'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'

export default function TicketPage() {
  const { missionId = '' } = useParams()
  const { getMissionById } = useMission()
  const progress = useProgress()
  const mission = getMissionById(missionId)
  const currentMission = getMissionById(progress.currentMissionId)

  if (!mission) {
    return <Navigate to="/tickets" replace />
  }

  if (!progress.isTicketUnlocked(mission.id)) {
    return <Navigate to={`/missions/${mission.id}/verification`} replace />
  }

  const resolved = Boolean(progress.ticketStatus[mission.id])

  return (
    <div className="app-shell">
      <Header
        title="Ticket"
        xp={progress.xp}
        confidence={progress.confidence}
        mission={currentMission?.title || 'No mission'}
        calls={Math.max(Object.keys(progress.repeatQueue).length, 3)}
        streak={progress.streak}
        promotionProgress={progress.promotionProgress}
        rank={progress.rank}
        onReset={progress.resetAll}
      />
      <main className="layout-stack">
        <Panel title={mission.title}>
          <p><strong>{mission.npc} says:</strong> {mission.ticket}</p>
          <p>{mission.ticketCompletion}</p>
          <div className="button-row">
            <button className="button" type="button" disabled={resolved} onClick={() => progress.resolveTicket(mission.id)}>
              {resolved ? 'Resolved' : 'Resolve Ticket'}
            </button>
          </div>
        </Panel>
      </main>
      <Footer />
    </div>
  )
}
