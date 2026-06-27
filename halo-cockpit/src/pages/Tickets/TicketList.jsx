import { Link } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Card from '../../components/ui/Card'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'

export default function TicketList() {
  const { missions, getMissionById } = useMission()
  const progress = useProgress()
  const currentMission = getMissionById(progress.currentMissionId)
  const level0Missions = missions.filter((mission) => mission.level === 0)

  return (
    <div className="app-shell">
      <Header
        title="Tickets"
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
        <section className="ticket-grid">
          {level0Missions.map((mission) => {
            const open = progress.isTicketUnlocked(mission.id)
            const resolved = Boolean(progress.ticketStatus[mission.id])
            return (
              <Card key={mission.id} className={open ? '' : 'disabled'}>
                <h3 className="section-title">{mission.title}</h3>
                <p><strong>NPC:</strong> {mission.npc}</p>
                <p>{mission.ticket}</p>
                {open ? (
                  <Link className="button" to={`/tickets/${mission.id}`}>{resolved ? 'Review Ticket' : 'Open Ticket'}</Link>
                ) : (
                  <button className="button" type="button" disabled>Locked</button>
                )}
              </Card>
            )
          })}
        </section>
      </main>
      <Footer />
    </div>
  )
}
