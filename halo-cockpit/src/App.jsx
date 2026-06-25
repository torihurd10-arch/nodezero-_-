import { Navigate, Route, Routes } from 'react-router-dom'
import CockpitLayout from './layout/CockpitLayout'
import CareerPage from './pages/CareerPage'
import HomePage from './pages/HomePage'
import LearningPage from './pages/LearningPage'
import LessonPage from './pages/LessonPage'
import MissionsPage from './pages/MissionsPage'
import SettingsPage from './pages/SettingsPage'
import StatsPage from './pages/StatsPage'
import ToolsPage from './pages/ToolsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<CockpitLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/lesson/:roomId" element={<LessonPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
