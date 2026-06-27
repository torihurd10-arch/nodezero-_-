import GlossaryTray from '../../../components/missions/GlossaryTray'
import Panel from '../../../components/ui/Panel'

export default function ToolTip({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Learn Just Enough">
        <div className="section-body">
          <p>{mission.tooltip}</p>
          <p><strong>Why it matters:</strong> {mission.whyItMatters}</p>
          <p><strong>Career connection:</strong> {mission.careerConnection}</p>
          <GlossaryTray terms={mission.translationTerms} />
          <button className="button" type="button" onClick={() => progress.markSectionDone(mission.id, 'tooltip')}>Mark Tool Tip Done</button>
        </div>
      </Panel>
    </section>
  )
}
