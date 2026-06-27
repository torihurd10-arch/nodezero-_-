import { Link } from 'react-router-dom'
import GlossaryTray from '../../../components/missions/GlossaryTray'
import NpcDialogue from '../../../components/missions/NpcDialogue'
import Panel from '../../../components/ui/Panel'

export default function Ticket({ mission, progress, nextSection }) {
  return (
    <section className="mission-frame">
      <Panel title="New Ticket">
        <div className="section-body">
          <NpcDialogue mission={mission} />
          <p><strong>Clue:</strong> {mission.clue}</p>
          <p>Easy difficulty. About {mission.estimatedMinutes} minutes. Opening the ticket gives +10 XP.</p>
          <GlossaryTray terms={mission.translationTerms} />
          <div className="button-row">
            <button className="button" type="button" onClick={() => progress.awardTicketOpen(mission.id)}>Open Ticket</button>
            <Link className="button" to={`/missions/${mission.id}/${nextSection}`}>Next</Link>
          </div>
        </div>
      </Panel>
    </section>
  )
}
