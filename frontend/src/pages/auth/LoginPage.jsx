import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import ErrorMessage from '../../components/ErrorMessage'
import { useState } from 'react'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    try {
      const user = await login(data)

      if (user.role === 'CREATOR') {
        navigate('/creator/dashboard')
      } else {
        navigate('/feed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al ingresar. Por favor, revisa tus credenciales.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Bienvenido de vuelta</h2>
      <p className="text-gray-400 text-sm mb-6">Inicia sesión en tu cuenta de OnlyFlans</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="login-form">
        <div>
          <label className="label" htmlFor="login-email">Correo Electrónico</label>
          <input
            id="login-email"
            type="email"
            className="input"
            placeholder="tu@correo.com"
            {...register('email', { required: 'El correo electrónico es obligatorio' })}
          />
          {errors.email && <p className="error-text text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            className="input"
            placeholder="••••••••"
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />
          {errors.password && <p className="error-text text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <ErrorMessage message={error} />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3"
          id="login-submit"
        >
          {loading ? 'Iniciando sesión...' : 'Ingresar'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        ¿Aún no tienes una cuenta?{' '}
        <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}