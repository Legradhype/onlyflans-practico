import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { commentsApi } from '../api/comments.api'
import Avatar from './Avatar'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'


function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-ES', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default function CommentSection({ postId, currentUser }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [canViewComments, setCanViewComments] = useState(true)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    setLoading(true)
    commentsApi.getByPost(postId)
      .then((res) => {
        setComments(res.data.data.items || [])
        setCanViewComments(true)
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          setCanViewComments(false)
        } else {
          setError('Error al cargar los comentarios')
        }
      })
      .finally(() => setLoading(false))
  }, [postId])

  const onSubmit = async ({ content }) => {
    setSubmitting(true)
    setError('')
    try {
      const res = await commentsApi.create({ post_id: postId, content })
      
      if (canViewComments) {
        const newComment = {
          ...res.data.data,
          author: { id: currentUser.id, name: currentUser.name },
        }
        setComments((prev) => [newComment, ...prev])
      }
      reset()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al publicar el comentario')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
    
      {currentUser?.role !== 'CREATOR' && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <Avatar name={currentUser?.name} size="sm" className="flex-shrink-0 mt-1" />
          <div className="flex-1">
            <input
              {...register('content', { required: 'El comentario no puede estar vacío' })}
              placeholder="Añade un comentario..."
              className="input text-sm py-2"
              id={`comment-input-${postId}`}
            />
            {errors.content && <p className="error-text">{errors.content.message}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary py-2 px-4 text-sm"
            id={`comment-submit-${postId}`}
          >
            {submitting ? '...' : 'Enviar'}
          </button>
        </form>
      )}

      <ErrorMessage message={error} />

      {!canViewComments ? (
        <div className="bg-dark-700/50 rounded-xl px-4 py-3 text-center border border-dark-600">
          <p className="text-gray-400 text-sm">🔒 Los comentarios son privados. Solo el creador puede leerlos.</p>
        </div>
      ) : loading ? (
        <LoadingSpinner size="sm" className="py-4" />
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">Aún no hay comentarios.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2 animate-fade-in">
              <Avatar name={c.author?.name} size="sm" className="flex-shrink-0 mt-0.5" />
              <div className="bg-dark-700 rounded-xl px-3 py-2 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm text-white">{c.author?.name}</span>
                  <span className="text-xs text-gray-500">{formatDate(c.created_at || c.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-300 mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}