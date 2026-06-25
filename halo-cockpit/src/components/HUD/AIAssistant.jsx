import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import HaloCard from '../ui/HaloCard'

const coaching = {
  '/': 'Start with the next mission and finish one room before opening other modules.',
  '/learning': 'Use Learn → See → Practice sequence to lock in memory.',
  '/tools': 'Practice one tool panel at a time and log what broke/what worked.',
  '/career': 'Translate completed missions into resume bullet points weekly.',
  '/stats': 'Review trends and choose your next improvement target.',
}

export default function AIAssistant() {
  const location = useLocation()
  const advice = useMemo(() => coaching[location.pathname] || 'Keep momentum and complete the next room.', [location.pathname])

  return (
    <aside className="focus-hide w-full lg:w-72">
      <HaloCard title="AI Assistant">
        <p className="text-sm text-gray-200">{advice}</p>
        <p className="mt-3 text-xs text-gray-400">Tip: open “Learn how this works” in each panel whenever something feels unclear.</p>
      </HaloCard>
    </aside>
  )
}
