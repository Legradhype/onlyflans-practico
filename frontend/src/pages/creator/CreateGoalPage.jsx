import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { creatorsApi } from '../../api/creators.api'
import ErrorMessage from '../../components/ErrorMessage'

export default function CreateGoalPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    try {
      await creatorsApi.createGoal(data)
      navigate('/creator/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la meta. Por favor, intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg animate-fade-in">
      <h1 className="section-title">Crear Meta de Apoyo 🎯</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5" id="create-goal-form">
        <div>
          <label className="label" htmlFor="goal-title">Título de la Meta</label>
          <input
            id="goal-title"
            type="text"
            className="input"
            placeholder="Ej. Comprar mi primera cámara para streams"
            {...register('title', {
              required: 'El título es obligatorio',
              maxLength: { value: 255, message: 'Máximo 255 caracteres' },
            })}
          />
          {errors.title && <p className="error-text text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="goal-desc">Descripción (opcional)</label>
          <textarea
            id="goal-desc"
            rows={4}
            className="input resize-none"
            placeholder="Describe tu meta a detalle..."
            {...register('description')}
          />
        </div>

        <ErrorMessage message={error} />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/creator/dashboard')}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-1"
            id="create-goal-submit"
          >
            {submitting ? 'Creando...' : 'Crear Meta'}
          </button>
        </div>
      </form>
    </div>
  )
}