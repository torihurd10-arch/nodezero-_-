export default function GlossaryTerm({ term, onSelect }) {
  return (
    <article className="glossary-card">
      <h3 className="section-title">{term.word}</h3>
      <p>{term.plain}</p>
      <button className="button" type="button" onClick={() => onSelect(term)}>Open Popup</button>
    </article>
  )
}
