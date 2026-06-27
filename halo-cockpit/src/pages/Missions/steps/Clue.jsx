import Panel from '../../../components/ui/Panel'

export default function Clue({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Clue">
        <p>{mission.clue}</p>
        <button className="button" type="button" onClick={() => progress.markSectionDone(mission.id, 'clue')}>Mark Clue Read</button>
      </Panel>
    </section>
  )
}
