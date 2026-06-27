import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import GlossaryPage from './pages/Glossary/GlossaryPage'
import MissionList from './pages/Missions/MissionList'
import MissionPage from './pages/Missions/MissionPage'
import RepeatQueuePage from './pages/RepeatQueue/RepeatQueuePage'
import TicketList from './pages/Tickets/TicketList'
import TicketPage from './pages/Tickets/TicketPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/missions" element={<MissionList />} />
      <Route path="/missions/:missionId" element={<MissionPage />} />
      <Route path="/missions/:missionId/:section" element={<MissionPage />} />
      <Route path="/glossary" element={<GlossaryPage />} />
      <Route path="/calls" element={<RepeatQueuePage />} />
      <Route path="/tickets" element={<TicketList />} />
      <Route path="/tickets/:missionId" element={<TicketPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
