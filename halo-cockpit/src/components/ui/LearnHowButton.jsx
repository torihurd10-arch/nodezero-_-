import { useState } from 'react'
import HaloButton from './HaloButton'

export default function LearnHowButton({ label }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <HaloButton variant="subtle" onClick={() => setOpen((prev) => !prev)}>
        Learn how this works
      </HaloButton>
      {open && <p className="text-xs text-gray-300">{label}</p>}
    </div>
  )
}
