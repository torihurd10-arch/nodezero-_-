import { Link } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Card from '../../components/ui/Card'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import { getLevelLabel } from '../../utils/progression'

export default function MissionList() {
  const { missions } = useMission()
  const { resetAll, xp, confidence, currentMissionId, rank, streak, promotionProgress, unlockedMissions, currentMissionId: activeMissionId } = useProgress()
  const currentMission = missions.find((mission) => mission.id === activeMissionId)
  const level0Missions = missions.filter((mission) => mission.level === 0)
  const levels = [...new Set(level0Missions.map((mission) => mission.level))]

  return (
    <div className="app-shell">
      <Header
        title="Mission System"
        xp={xp}
        confidence={confidence}
        mission={currentMission?.title || 'No mission'}
        calls={4}
        streak={streak}
        promotionProgress={promotionProgress}
        rank={rank}
        onReset={resetAll}
      />
      <main className="layout-stack">
        {levels.map((level) => (
          <section key={level} className="panel">
            <h2 className="panel-title">{getLevelLabel(level)}</h2>
            <div className="mission-grid">
              {level0Missions.filter((mission) => mission.level === level).map((mission) => {
                const open = unlockedMissions.includes(mission.id)
                return (
                  <Card key={mission.id} className={open ? '' : 'disabled'}>
                    <h3 className="section-title">{mission.title}</h3>
                    <p><strong>NPC:</strong> {mission.npc}</p>
                    <p>{mission.ticket}</p>
                    {open ? (
                      <Link className="button" to={`/missions/${mission.id}/ticket`}>
                        Enter Mission
                      </Link>
                    ) : (
                      <button className="button" type="button" disabled>
                        Locked
                      </button>
                    )}
                  </Card>
                )
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
