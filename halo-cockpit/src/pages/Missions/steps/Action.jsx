import Panel from '../../../components/ui/Panel'

export default function Action({ mission, progress }) {
  return (
    <section className="mission-frame">
      <Panel title="Fix The Issue">
        <div className="section-body">
          <p>{mission.actionTask.instructions}</p>
          <p><strong>Expected result:</strong> {mission.actionTask.expectedResult}</p>
          <div className="media-wrap">
            <img src={mission.imageUrl} alt={mission.actionTask.screenshotExample} />
          </div>
          <button
            className="button"
            type="button"
            onClick={() => {
              progress.markSectionDone(mission.id, 'do')
              progress.markSectionDone(mission.id, 'action')
            }}
          >
            Mark Action Done
          </button>
        </div>
      </Panel>
    </section>
  )
}
