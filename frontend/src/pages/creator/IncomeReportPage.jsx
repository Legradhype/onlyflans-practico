import { useEffect, useState } from 'react'
import { creatorsApi } from '../../api/creators.api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

function formatDate(d) {
  // Cambiado a formato en español
  return new Date(d).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function IncomeReportPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ start_date: '', end_date: '' })

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.start_date) params.start_date = filters.start_date
      if (filters.end_date) params.end_date = filters.end_date
      const res = await creatorsApi.getIncomeReport(params)
      setReport(res.data.data)
    } catch {
      setError('Error al cargar el reporte de ingresos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="animate-fade-in">
      <h1 className="section-title">💰 Reporte de Ingresos</h1>
      <div className="card mb-6">
        <h3 className="font-semibold text-white mb-4">Filtrar por Fechas</h3>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-32">
            <label className="label" htmlFor="start-date">Desde</label>
            <input
              id="start-date"
              type="date"
              className="input"
              value={filters.start_date}
              onChange={(e) => setFilters((f) => ({ ...f, start_date: e.target.value }))}
            />
          </div>
          <div className="flex-1 min-w-32">
            <label className="label" htmlFor="end-date">Hasta</label>
            <input
              id="end-date"
              type="date"
              className="input"
              value={filters.end_date}
              onChange={(e) => setFilters((f) => ({ ...f, end_date: e.target.value }))}
            />
          </div>
          <button onClick={load} className="btn-primary" id="apply-filters">Aplicar</button>
          <button
            onClick={() => { setFilters({ start_date: '', end_date: '' }) }}
            className="btn-secondary"
            id="clear-filters"
          >Limpiar</button>
        </div>
      </div>

      {loading ? <LoadingSpinner size="lg" className="py-20" /> : error ? <ErrorMessage message={error} /> : report && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <p className="text-5xl font-black gradient-text">{report.totalFlans}</p>
              <p className="text-gray-400 mt-2">🥞 Total de Flanes</p>
            </div>
            <div className="card text-center">
              <p className="text-5xl font-black text-white">{report.donations?.length ?? 0}</p>
              <p className="text-gray-400 mt-2">Donaciones recibidas</p>
            </div>
          </div>

        
          <div className="card overflow-hidden p-0">
            <div className="px-6 py-4 border-b border-dark-600">
              <h3 className="font-semibold text-white">Historial de Donaciones</h3>
            </div>
            {report.donations?.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No hay donaciones en este periodo.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-600">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Seguidor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Flanes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.donations.map((d) => (
                      <tr key={d.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                        <td className="px-6 py-3 text-sm text-white">{d.follower?.name ?? '—'}</td>
                        <td className="px-6 py-3 text-sm">
                          <span className="text-brand-400 font-bold">🥞 {d.quantity}</span>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-400">{formatDate(d.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}