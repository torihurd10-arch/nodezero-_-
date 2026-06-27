import GlossaryTray from '../../../components/missions/GlossaryTray'
import MissionSimulator from '../../../components/missions/MissionSimulator'
import Panel from '../../../components/ui/Panel'

export default function Action({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Fix The Issue">
        <div className="section-body">
          <p>{mission.actionTask.instructions}</p>
          <p><strong>Expected result:</strong> {mission.actionTask.expectedResult}</p>
          <MissionSimulator
            mission={mission}
            mode="action"
            onComplete={() => {
              progress.markSectionDone(mission.id, 'do')
              progress.markSectionDone(mission.id, 'action')
            }}
          />
          <GlossaryTray terms={mission.translationTerms} />
        </div>
      </Panel>
    </section>
  )
}
