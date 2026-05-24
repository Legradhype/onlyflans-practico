import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { creatorsApi } from '../../api/creators.api'
import ErrorMessage from '../../components/ErrorMessage'

export default function EditProfilePage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [profilePreview, setProfilePreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    setSuccess(false)
    try {
      const formData = new FormData()
      if (data.bio) formData.append('bio', data.bio)
      if (data.profile_picture?.[0]) formData.append('profile_picture', data.profile_picture[0])
      if (data.banner?.[0]) formData.append('banner', data.banner[0])

      await creatorsApi.updateProfile(formData)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil. Por favor, intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleImagePreview = (e, setter) => {
    const file = e.target.files?.[0]
    if (file) setter(URL.createObjectURL(file))
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <h1 className="section-title">Editar Perfil</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="edit-profile-form">
        <div className="card">
          <h3 className="font-semibold text-white mb-3">Foto de Perfil</h3>
          {profilePreview && (
            <img src={profilePreview} alt="Vista previa" className="w-20 h-20 rounded-full object-cover mb-3" />
          )}
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-brand-600 file:text-white hover:file:bg-brand-500 cursor-pointer"
            {...register('profile_picture')}
            onChange={(e) => { register('profile_picture').onChange(e); handleImagePreview(e, setProfilePreview) }}
          />
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-3">Imagen de Portada</h3>
          {bannerPreview && (
            <img src={bannerPreview} alt="Vista previa de portada" className="w-full h-24 rounded-xl object-cover mb-3" />
          )}
          <input
            id="banner"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-dark-600 file:text-white hover:file:bg-dark-500 cursor-pointer"
            {...register('banner')}
            onChange={(e) => { register('banner').onChange(e); handleImagePreview(e, setBannerPreview) }}
          />
        </div>

        <div>
          <label className="label" htmlFor="bio">Biografía</label>
          <textarea
            id="bio"
            rows={4}
            className="input resize-none"
            placeholder="Cuéntale a tus seguidores un poco sobre ti..."
            {...register('bio')}
          />
        </div>

        {success && (
          <div className="bg-green-900/20 border border-green-700/50 text-green-400 rounded-xl px-4 py-3 text-sm">
            ✅ ¡Perfil actualizado con éxito!
          </div>
        )}
        <ErrorMessage message={error} />

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-3"
          id="save-profile"
        >
          {submitting ? 'Guardando...' : 'Guardar Perfil'}
        </button>
      </form>
    </div>
  )
}