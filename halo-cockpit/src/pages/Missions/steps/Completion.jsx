import Panel from '../../../components/ui/Panel'

export default function Completion({ mission, progress }) {
  const unlocked = progress.isTicketUnlocked(mission.id)
  const resolved = Boolean(progress.ticketStatus[mission.id])
  const rewarded = progress.isSectionDone(mission.id, 'rewards')

  return (
    <section className="mission-frame">
      <Panel title="Customer Happy + Rewards">
        <div className="section-body">
          <p>{mission.ticketCompletion}</p>
          <p><strong>Ticket Ready:</strong> {unlocked ? 'Yes' : 'No'}</p>
          <p><strong>Rewards:</strong> +{mission.xpReward} XP, +{mission.confidenceReward} Confidence, New Tool Unlocked</p>
          <p><strong>Automation Preview:</strong> {mission.automationPreview}</p>
          <div className="button-row">
            <button className="button" type="button" disabled={!unlocked || resolved} onClick={() => progress.resolveTicket(mission.id)}>
              {resolved ? 'Ticket Resolved' : 'Resolve Ticket'}
            </button>
            <button className="button" type="button" disabled={!resolved || rewarded} onClick={() => progress.claimRewards(mission.id)}>
              {rewarded ? 'Rewards Claimed' : 'Claim Rewards'}
            </button>
          </div>
        </div>
      </Panel>
    </section>
  )
}
