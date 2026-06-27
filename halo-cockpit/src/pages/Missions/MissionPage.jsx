import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Panel from '../../components/ui/Panel'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import Action from './steps/Action'
import BreakFix from './steps/BreakFix'
import Clue from './steps/Clue'
import Completion from './steps/Completion'
import Explain from './steps/Explain'
import Investigation from './steps/Investigation'
import Reflection from './steps/Reflection'
import Repeat from './steps/Repeat'
import Ticket from './steps/Ticket'
import ToolTip from './steps/ToolTip'
import Verification from './steps/Verification'

const sectionOrder = ['ticket', 'clue', 'tooltip', 'investigation', 'action', 'repeat', 'breakfix', 'explain', 'verification', 'completion', 'reflection']
const sectionMap = {
  ticket: Ticket,
  clue: Clue,
  tooltip: ToolTip,
  investigation: Investigation,
  action: Action,
  repeat: Repeat,
  breakfix: BreakFix,
  explain: Explain,
  verification: Verification,
  completion: Completion,
  reflection: Reflection,
}

export default function MissionPage() {
  const navigate = useNavigate()
  const { missionId = '', section = 'ticket' } = useParams()
  const { getMissionById } = useMission()
  const progress = useProgress()
  const mission = getMissionById(missionId)

  if (!mission) {
    return <Navigate to="/missions" replace />
  }

  if (!progress.unlockedMissions.includes(missionId)) {
    return <Navigate to="/missions" replace />
  }

  if (!sectionMap[section]) {
    return <Navigate to={`/missions/${missionId}/ticket`} replace />
  }

  const index = sectionOrder.indexOf(section)
  const previousSection = index > 0 ? sectionOrder[index - 1] : null
  const nextSection = index < sectionOrder.length - 1 ? sectionOrder[index + 1] : null
  const totalSteps = sectionOrder.length
  const stepIndex = Math.min(index + 1, totalSteps)
  const previousDone = previousSection === 'action'
    ? progress.isSectionDone(missionId, 'action') || progress.isSectionDone(missionId, 'do')
    : previousSection ? progress.isSectionDone(missionId, previousSection) : true

  if (previousSection && !previousDone) {
    return <Navigate to={`/missions/${missionId}/${previousSection}`} replace />
  }

  const StepComponent = sectionMap[section]

  return (
    <div className="app-shell">
      <Header
        title={mission.title}
        xp={progress.xp}
        confidence={progress.confidence}
        mission={mission.title}
        calls={Math.max(progress.repeatQueue.length, 3)}
        streak={progress.streak}
        promotionProgress={progress.promotionProgress}
        rank={progress.rank}
        onReset={progress.resetAll}
      />
      <main className="layout-stack">
        <Panel className="bg-hudPanel shadow-halo mission-step-banner">
          <p className="hero-line"><strong>{mission.title}</strong> - Step {stepIndex} of {totalSteps}</p>
        </Panel>
        <StepComponent
          mission={mission}
          progress={progress}
          navigate={navigate}
          previousSection={previousSection}
          nextSection={nextSection}
        />
        <Panel className="bg-hudPanel shadow-halo">
          <div className="section-nav">
            {previousSection ? <Link className="button" to={`/missions/${mission.id}/${previousSection}`}>Back</Link> : <button className="button" type="button" disabled>Back</button>}
            <Link className="button" to="/">Home</Link>
            {nextSection ? <Link className="button" to={`/missions/${mission.id}/${nextSection}`}>Next</Link> : <button className="button" type="button" disabled>Next</button>}
          </div>
        </Panel>
      </main>
      <Footer />
    </div>
  )
}
