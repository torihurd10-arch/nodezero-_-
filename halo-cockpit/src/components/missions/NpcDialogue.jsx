export default function NpcDialogue({ mission }) {
  const opener = mission.npcProfile?.favoritePhrases?.[0] || mission.workplaceDialog || mission.ticket

  return (
    <div className="npc-dialogue bg-hudPanel shadow-halo">
      <p className="npc-role">{mission.npcProfile?.role || 'Caller'} ticket</p>
      <p><strong>{mission.npc}:</strong> {opener}</p>
      <p>{mission.ticket}</p>
    </div>
  )
}
