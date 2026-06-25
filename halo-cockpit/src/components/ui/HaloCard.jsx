export default function HaloCard({ title, children, actions, className = '' }) {
  return (
    <section className={`halo-card ${className}`.trim()}>
      {title && (
        <header className="mb-3 flex items-center justify-between gap-2">
          <h2 className="halo-title text-sm uppercase">{title}</h2>
          {actions}
        </header>
      )}
      {children}
    </section>
  )
}
