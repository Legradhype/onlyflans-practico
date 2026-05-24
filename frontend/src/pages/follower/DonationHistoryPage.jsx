import { useEffect, useState } from 'react'
import { donationsApi } from '../../api/donations.api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage' 
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DonationHistoryPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ start_date: '', end_date: '', creator_name: '' })

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.start_date) params.start_date = filters.start_date
      if (filters.end_date) params.end_date = filters.end_date
      if (filters.creator_name) params.creator_name = filters.creator_name
      const res = await donationsApi.getHistory(params)
      setData(res.data.data)
    } catch {
      setError('Error al cargar el historial de donaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const items = data?.items || []

  return (
    <div className="animate-fade-in">
      <h1 className="section-title">🥞 Historial de Donaciones</h1>
      <div className="card mb-6 space-y-4">
        <h3 className="font-semibold text-white">Filtros</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label" htmlFor="hist-start">Desde</label>
            <input
              id="hist-start"
              type="date"
              className="input"
              value={filters.start_date}
              onChange={(e) => setFilters((f) => ({ ...f, start_date: e.target.value }))}
            />
          </div>
          <div>
            <label className="label" htmlFor="hist-end">Hasta</label>
            <input
              id="hist-end"
              type="date"
              className="input"
              value={filters.end_date}
              onChange={(e) => setFilters((f) => ({ ...f, end_date: e.target.value }))}
            />
          </div>
          <div>
            <label className="label" htmlFor="hist-creator">Creador</label>
            <input
              id="hist-creator"
              type="text"
              className="input"
              placeholder="Buscar por nombre..."
              value={filters.creator_name}
              onChange={(e) => setFilters((f) => ({ ...f, creator_name: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="btn-primary" id="apply-hist-filters">Aplicar Filtros</button>
          <button
            onClick={() => {
              setFilters({ start_date: '', end_date: '', creator_name: '' })
              setTimeout(() => document.getElementById('apply-hist-filters').click(), 0)
            }}
            className="btn-secondary"
            id="clear-hist-filters"
          >Limpiar</button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : items.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">🥞</p>
          <p className="text-gray-400 text-lg">Aún no has hecho donaciones.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="px-6 py-4 border-b border-dark-600">
            <p className="text-sm text-gray-400">{data.pagination?.total ?? items.length} donaciones encontradas</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Creador</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Flanes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-6 py-3 text-sm text-white">{d.creator?.name ?? '—'}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="text-brand-400 font-bold">🥞 {d.quantity}</span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-400">{formatDate(d.created_at || d.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}