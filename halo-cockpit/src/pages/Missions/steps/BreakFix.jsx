import GlossaryTray from '../../../components/missions/GlossaryTray'
import MissionSimulator from '../../../components/missions/MissionSimulator'
import Panel from '../../../components/ui/Panel'

export default function BreakFix({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Break/Fix Challenge">
        <div className="section-body">
          <p>{mission.breakFixTask}</p>
          <MissionSimulator mission={mission} mode="breakfix" onComplete={() => progress.markSectionDone(mission.id, 'breakfix')} />
          <GlossaryTray terms={mission.translationTerms} />
        </div>
      </Panel>
    </section>
  )
}
