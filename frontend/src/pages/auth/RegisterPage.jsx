import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import ErrorMessage from '../../components/ErrorMessage'

export default function RegisterPage() {
  const { register: registerUser, loading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    try {
      const user = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      })
      if (user.role === 'CREATOR') navigate('/creator/dashboard')
      else navigate('/feed')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse. Por favor, intenta de nuevo.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Únete a OnlyFlans</h2>
      <p className="text-gray-400 text-sm mb-6">Crea tu cuenta nueva</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="register-form">
        <div>
          <label className="label" htmlFor="reg-name">Nombre Completo</label>
          <input
            id="reg-name"
            type="text"
            className="input"
            placeholder="Tu nombre"
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <p className="error-text text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="reg-email">Correo Electrónico</label>
          <input
            id="reg-email"
            type="email"
            className="input"
            placeholder="tu@correo.com"
            {...register('email', { required: 'El correo electrónico es obligatorio' })}
          />
          {errors.email && <p className="error-text text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="reg-password">Contraseña</label>
          <input
            id="reg-password"
            type="password"
            className="input"
            placeholder="Mínimo 8 caracteres"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
            })}
          />
          {errors.password && <p className="error-text text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="label">Me quiero registrar como...</label>
          <div className="grid grid-cols-2 gap-3" id="role-selector">
            {['CREATOR', 'FOLLOWER'].map((role) => (
              <label
                key={role}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  watch('role') === role
                    ? 'border-brand-500 bg-brand-900/30 text-white'
                    : 'border-dark-500 bg-dark-700 text-gray-400 hover:border-dark-400'
                }`}
              >
                <input
                  type="radio"
                  value={role}
                  {...register('role', { required: 'Por favor, selecciona un rol' })}
                  className="sr-only"
                />
                <span className="text-2xl">{role === 'CREATOR' ? '🎨' : '🌟'}</span>
                <span className="font-medium text-sm">{role === 'CREATOR' ? 'Creador' : 'Seguidor'}</span>
                <span className="text-xs opacity-60 text-center">
                  {role === 'CREATOR' ? 'Publicar y recibir flanes' : 'Apoyar a creadores'}
                </span>
              </label>
            ))}
          </div>
          {errors.role && <p className="error-text text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <ErrorMessage message={error} />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3"
          id="register-submit"
        >
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}