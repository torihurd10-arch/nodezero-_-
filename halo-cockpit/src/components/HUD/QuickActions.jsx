import { useState } from 'react'
import HaloButton from '../ui/HaloButton'
import Modal from '../ui/Modal'

export default function QuickActions() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <HaloButton onClick={() => setModal('mission')}>New Mission</HaloButton>
        <HaloButton variant="subtle" onClick={() => setModal('note')}>
          New Note
        </HaloButton>
        <HaloButton variant="subtle" onClick={() => setModal('lab')}>
          New Lab
        </HaloButton>
      </div>
      {modal && (
        <Modal title="Quick Action" onClose={() => setModal(null)}>
          <p className="text-sm text-gray-300">
            {modal === 'mission' && 'Create a fresh mission queue and start with one unlocked room.'}
            {modal === 'note' && 'Capture what you learned, what failed, and the exact fix used.'}
            {modal === 'lab' && 'Pick one tool module and run a 20-minute sandbox lab.'}
          </p>
        </Modal>
      )}
    </>
  )
}
