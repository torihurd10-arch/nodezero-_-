export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="section-nav">
          <h3 className="section-title">{title}</h3>
          <button className="button" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
