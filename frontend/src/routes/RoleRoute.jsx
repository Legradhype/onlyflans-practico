import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RoleRoute({ role }) {
  const { user } = useAuth()

  if (!user || user.role !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
