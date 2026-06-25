import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import { useAppState } from '../context/AppState'

export default function SettingsPage() {
  const { settings, setSetting, resetProgress } = useAppState()

  return (
    <div className="space-y-4">
      <HaloCard title="Appearance">
        <div className="flex flex-wrap gap-2">
          <HaloButton onClick={() => setSetting('darkMode', true)} variant={settings.darkMode ? 'primary' : 'subtle'}>Dark Mode</HaloButton>
          <HaloButton onClick={() => setSetting('darkMode', false)} variant={!settings.darkMode ? 'primary' : 'subtle'}>Light Mode</HaloButton>
        </div>
      </HaloCard>
      <HaloCard title="Progress Controls">
        <HaloButton variant="danger" onClick={resetProgress}>Reset Progress</HaloButton>
      </HaloCard>
    </div>
  )
}
