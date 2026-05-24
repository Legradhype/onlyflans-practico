import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { postsApi } from '../../api/posts.api'
import ErrorMessage from '../../components/ErrorMessage'

export default function CreatePostPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const textContent = watch('text_content', '')

  const onSubmit = async (data) => {
    if (!data.text_content?.trim() && !data.image?.[0]) {
      setError('La publicación debe tener texto o una imagen')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const formData = new FormData()
      if (data.text_content?.trim()) formData.append('text_content', data.text_content.trim())
      if (data.image?.[0]) formData.append('image', data.image[0])
      await postsApi.create(formData)
      navigate('/creator/posts')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la publicación. Por favor, intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <h1 className="section-title">Crear Nueva Publicación 📝</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5" id="create-post-form">
        <div>
          <label className="label" htmlFor="post-text">Contenido de texto</label>
          <textarea
            id="post-text"
            rows={6}
            className="input resize-none"
            placeholder="Comparte algo con tus seguidores..."
            {...register('text_content')}
          />
          <p className="text-xs text-gray-500 mt-1">{textContent.length} caracteres</p>
        </div>

        <div className="relative flex items-center">
          <div className="flex-1 h-px bg-dark-500" />
          <span className="mx-4 text-gray-500 text-sm">o adjunta una imagen</span>
          <div className="flex-1 h-px bg-dark-500" />
        </div>

        <div>
          <label className="label" htmlFor="post-image">Imagen</label>
          {imagePreview && (
            <img src={imagePreview} alt="Vista previa" className="w-full rounded-xl object-cover max-h-60 mb-3" />
          )}
          <input
            id="post-image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-brand-600 file:text-white hover:file:bg-brand-500 cursor-pointer"
            {...register('image')}
            onChange={(e) => {
              register('image').onChange(e)
              const file = e.target.files?.[0]
              if (file) setImagePreview(URL.createObjectURL(file))
            }}
          />
        </div>

        <ErrorMessage message={error} />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/creator/posts')}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-1"
            id="create-post-submit"
          >
            {submitting ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}