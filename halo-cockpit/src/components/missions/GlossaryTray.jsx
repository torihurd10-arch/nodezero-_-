import { useState } from 'react'
import Modal from '../ui/Modal'

export default function GlossaryTray({ terms = [] }) {
  const [selected, setSelected] = useState(null)

  if (!terms.length) {
    return null
  }

  return (
    <>
      <div className="chip-row glossary-tray">
        {terms.map((term) => (
          <button key={term.word} className="term-chip" type="button" onClick={() => setSelected(term)}>
            {term.word}
          </button>
        ))}
      </div>
      <Modal open={Boolean(selected)} title={selected?.word || 'Glossary'} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="section-body">
            <p><strong>Plain English:</strong> {selected.plain}</p>
            <p><strong>Where you see it:</strong> {selected.where}</p>
            <p><strong>Why it matters:</strong> {selected.why}</p>
            <p><strong>Example:</strong> {selected.example}</p>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
