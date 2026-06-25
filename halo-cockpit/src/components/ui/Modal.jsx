import HaloButton from './HaloButton'

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-lg rounded-xl border border-haloBlue/40 bg-[#08121b] p-4 shadow-halo">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="halo-title text-sm">{title}</h3>
          <HaloButton variant="subtle" onClick={onClose}>
            Close
          </HaloButton>
        </div>
        {children}
      </div>
    </div>
  )
}
