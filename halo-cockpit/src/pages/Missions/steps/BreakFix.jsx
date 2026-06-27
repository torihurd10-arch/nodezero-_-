import Panel from '../../../components/ui/Panel'

export default function BreakFix({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Break/Fix Challenge">
        <div className="section-body">
          <p>{mission.breakFixTask}</p>
          <button className="button" type="button" onClick={() => progress.markSectionDone(mission.id, 'breakfix')}>Mark Break/Fix Done</button>
        </div>
      </Panel>
    </section>
  )
}
