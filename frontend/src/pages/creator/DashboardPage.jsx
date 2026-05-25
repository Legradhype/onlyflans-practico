import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { creatorsApi } from '../../api/creators.api'
import GoalCard from '../../components/GoalCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import Avatar from '../../components/Avatar'
import Badge from '../../components/Badge'

export default function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [goals, setGoals] = useState([])
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [creatorRes, reportRes] = await Promise.all([
          creatorsApi.getById(user.id),
          creatorsApi.getIncomeReport({}),
        ])
        setProfile(creatorRes.data.data.creatorProfile)
        setGoals(creatorRes.data.data.goals || [])
        setReport(reportRes.data.data)
      } catch {
        setError('Error al cargar el panel de control')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user.id])

  const handleComplete = async (goalId) => {
    try {
      await creatorsApi.updateGoal(goalId, { status: 'COMPLETED' })
      setGoals((prev) => prev.map((g) => g.id === goalId ? { ...g, status: 'COMPLETED' } : g))
    } catch { }
  }

  if (loading) return <LoadingSpinner size="lg" className="py-20" />
  if (error) return <ErrorMessage message={error} />

  const cp = profile

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card overflow-hidden p-0">
        <div className="h-32 bg-gradient-to-r from-brand-900 via-brand-800 to-dark-700 relative">
          {cp?.banner_url && (
            <img src={cp.banner_url} alt="Banner" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="px-6 pb-6">
          <div className="relative z-10 flex items-end gap-4 -mt-12 mb-4">
            <Avatar
              src={cp?.profile_picture_url}
              name={user.name}
              size="xl"
              className="ring-4 ring-dark-800 bg-dark-800" 
            />
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <Badge variant="creator">Creador</Badge>
              </div>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          {cp?.bio && <p className="text-gray-300">{cp.bio}</p>}
          <Link to="/creator/profile" className="btn-secondary mt-4 inline-flex">
            ✏️ Editar Perfil
          </Link>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <p className="text-4xl font-black gradient-text">{report.totalFlans}</p>
            <p className="text-gray-400 text-sm mt-1">Total de flanes recibidos</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-black text-white">{report.donations?.length ?? 0}</p>
            <p className="text-gray-400 text-sm mt-1">Donaciones totales</p>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Metas de Apoyo</h2>
          <Link to="/creator/goals/new" className="btn-primary py-1.5 px-4 text-sm">
            + Nueva Meta
          </Link>
        </div>
        {goals.length === 0 ? (
          <div className="card text-center text-gray-400 py-10">
            Aún no hay metas.{' '}
            <Link to="/creator/goals/new" className="text-brand-400 hover:underline">Crea tu primera meta</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((g) => (
              <GoalCard key={g.id} goal={g} isOwner onComplete={handleComplete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}