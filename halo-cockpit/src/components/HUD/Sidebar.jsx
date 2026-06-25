import { NavLink } from 'react-router-dom'

const items = [
  ['/', 'Home'],
  ['/missions', 'Missions'],
  ['/learning', 'Learning'],
  ['/tools', 'Tools'],
  ['/career', 'Career'],
  ['/stats', 'Stats'],
  ['/settings', 'Settings'],
]

export default function Sidebar() {
  return (
    <aside className="focus-hide w-full border-b border-haloBlue/20 bg-[#070c12] p-3 md:w-52 md:border-b-0 md:border-r">
      <nav className="grid grid-cols-2 gap-2 md:grid-cols-1" aria-label="Cockpit modules">
        {items.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `rounded-lg border px-3 py-2 text-xs tracking-wide transition ${
                isActive
                  ? 'border-haloBlue bg-haloBlue/20 text-haloBlueSoft'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
