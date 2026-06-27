import Panel from '../../../components/ui/Panel'

export default function Repeat({ mission, progress }) {
  const count = Number(progress.repetitions[mission.id] || 0)
  return (
    <section className="mission-frame">
      <Panel title="Repeat Challenge">
        <div className="section-body">
          <p>{mission.repeatTask}</p>
          <p><strong>Guided attempt</strong> {'->'} <strong>Hinted attempt</strong> {'->'} <strong>No-hint attempt</strong> {'->'} <strong>Timer challenge</strong> {'->'} <strong>New scenario challenge</strong></p>
          <p><strong>Repeat Count:</strong> {count}/3</p>
          <button className="button" type="button" onClick={() => progress.logRepeat(mission.id)}>Log Repeat</button>
        </div>
      </Panel>
    </section>
  )
}
