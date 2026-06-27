import { Link } from 'react-router-dom'
import Panel from '../../../components/ui/Panel'

export default function Ticket({ mission, progress, nextSection }) {
  return (
    <section className="mission-frame">
      <Panel title="New Ticket">
        <div className="section-body">
          <p><strong>{mission.npc}:</strong> {mission.ticket}</p>
          <p>Easy difficulty. About {mission.estimatedMinutes} minutes. Opening the ticket gives +10 XP.</p>
          <div className="button-row">
            <button className="button" type="button" onClick={() => progress.awardTicketOpen(mission.id)}>Open Ticket</button>
            <Link className="button" to={`/missions/${mission.id}/${nextSection}`}>Next</Link>
          </div>
        </div>
      </Panel>
    </section>
  )
}
