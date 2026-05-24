import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const creatorLinks = [
  { to: '/creator/dashboard', icon: '📊', label: 'Panel' },
  { to: '/creator/profile', icon: '✏️', label: 'Editar Perfil' },
  { to: '/creator/posts', icon: '📝', label: 'Mis Publicaciones' },
  { to: '/creator/posts/new', icon: '➕', label: 'Nueva Publicación' },
  { to: '/creator/goals/new', icon: '🎯', label: 'Nuevo Objetivo' },
  { to: '/creator/income', icon: '💰', label: 'Informe de Ingresos' },
]

const followerLinks = [
  { to: '/feed', icon: '🏠', label: 'Feed' },
  { to: '/creators', icon: '🌟', label: 'Explorar Creadores' },
  { to: '/favorites', icon: '⭐', label: 'Favoritos' },
  { to: '/donations/history', icon: '🥞', label: 'Historial de Donaciones' },
]

export default function Sidebar() {
  const { isCreator } = useAuth()
  const links = isCreator ? creatorLinks : followerLinks

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-dark-900 border-r border-dark-700 p-4 overflow-y-auto z-30">
      <nav className="space-y-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand-900/50 text-brand-300 border border-brand-700/50'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-6 left-4 right-4">
        <div className="text-xs text-gray-600 text-center">
          <span className="text-lg">🥞</span>
          <br />
        </div>
      </div>
    </aside>
  )
}
