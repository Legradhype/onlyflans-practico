import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Avatar from './Avatar'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-dark-900/90 backdrop-blur-sm border-b border-dark-700 flex items-center px-4 gap-4">
      <Link to="/" className="flex items-center gap-2 font-black text-xl mr-4">
        <span className="text-2xl">🥞</span>
        <span className="gradient-text">OnlyFlans</span>
      </Link>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-700 border border-dark-600">
              <Avatar name={user.name} size="sm" />
              <div className="leading-tight">
                <p className="text-sm font-medium text-white truncate max-w-24" title={user.name}>
                  {user.name}
                </p>
                <p className="text-xs text-brand-400">
                  {user.role === 'CREATOR' ? 'Creador' : 'Seguidor'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-ghost text-sm transition-colors hover:text-white text-gray-300"
              id="logout-btn"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  )
}