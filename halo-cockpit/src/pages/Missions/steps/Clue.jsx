import GlossaryTray from '../../../components/missions/GlossaryTray'
import NpcDialogue from '../../../components/missions/NpcDialogue'
import Panel from '../../../components/ui/Panel'

export default function Clue({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Clue">
        <div className="section-body">
          <NpcDialogue mission={mission} />
          <p>{mission.clue}</p>
          <p><strong>Boss Note:</strong> Use the clue before clicking random things.</p>
          <GlossaryTray terms={mission.translationTerms} />
          <button className="button" type="button" onClick={() => progress.markSectionDone(mission.id, 'clue')}>Mark Clue Read</button>
        </div>
      </Panel>
    </section>
  )
}
