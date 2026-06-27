import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
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

  if (previousSection && !progress.isSectionDone(missionId, previousSection)) {
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
        calls={Math.max(Object.keys(progress.repeatQueue).length, 3)}
        streak={progress.streak}
        promotionProgress={progress.promotionProgress}
        rank={progress.rank}
        onReset={progress.resetAll}
      />
      <main className="layout-stack">
        <StepComponent
          mission={mission}
          progress={progress}
          navigate={navigate}
          previousSection={previousSection}
          nextSection={nextSection}
        />
      </main>
      <Footer />
    </div>
  )
}
