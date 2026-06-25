import { useAppState } from '../../context/AppState'
import HaloButton from '../ui/HaloButton'

export default function FocusModeToggle() {
  const { settings, setSetting } = useAppState()

  return (
    <HaloButton variant="subtle" onClick={() => setSetting('focusMode', !settings.focusMode)}>
      {settings.focusMode ? 'Disable Focus Mode' : 'Enable Focus Mode'}
    </HaloButton>
  )
}
