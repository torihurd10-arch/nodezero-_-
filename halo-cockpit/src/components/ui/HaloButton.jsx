export default function HaloButton({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-lg border px-3 py-2 text-xs font-semibold transition'
  const variants = {
    primary: 'border-haloBlue bg-haloBlue/15 text-haloBlue hover:bg-haloBlue/25',
    subtle: 'border-white/20 bg-white/5 text-gray-200 hover:bg-white/10',
    danger: 'border-rose-400/60 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
