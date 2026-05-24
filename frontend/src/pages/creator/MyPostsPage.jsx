import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsApi } from '../../api/posts.api'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import CommentSection from '../../components/CommentSection'

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function MyPostsPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    postsApi.getMine()
      .then((res) => setPosts(res.data.data.items || []))
      .catch(() => setError('Error al cargar las publicaciones'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner size="lg" className="py-20" />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title mb-0">Mis Publicaciones</h1>
        <Link to="/creator/posts/new" className="btn-primary py-2 px-4 text-sm">
          + Nueva Publicación
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-gray-400 text-lg">Aún no has publicado nada.</p>
          <Link to="/creator/posts/new" className="btn-primary mt-4 inline-flex">
            Crea tu primera publicación
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="card animate-slide-up">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  {post.text_content && (
                    <p className="text-gray-200 line-clamp-3 whitespace-pre-line">{post.text_content}</p>
                  )}
                  {post.image_url && !post.text_content && (
                    <p className="text-gray-400 text-sm">📷 Publicación con imagen</p>
                  )}
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Publicación"
                      className="w-full rounded-xl object-cover max-h-48 mt-3"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-4 pt-3 border-t border-dark-600 gap-4">
                <span className="text-xs text-gray-500">
                  {formatDate(post.created_at || post.createdAt)}
                </span>
                <div className="pt-2 border-t border-dark-600/50">
                  <h3 className="text-sm font-semibold text-white mb-3">Comentarios de Seguidores</h3>
                  <CommentSection postId={post.id} currentUser={user} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}