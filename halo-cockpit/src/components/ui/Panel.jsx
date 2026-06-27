export default function Panel({ title, children, className = '' }) {
  return (
    <section className={`panel ${className}`.trim()}>
      {title ? <h2 className="panel-title">{title}</h2> : null}
      {children}
    </section>
  )
}
