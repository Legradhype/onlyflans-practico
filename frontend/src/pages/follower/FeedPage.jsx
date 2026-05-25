import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsApi } from '../../api/posts.api'
import { useAuth } from '../../hooks/useAuth'
import PostCard from '../../components/PostCard'
import CommentSection from '../../components/CommentSection'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

export default function FeedPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFeed = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await postsApi.getFeed()
      setPosts(res.data.data.items || [])
    } catch {
      setError('Error al cargar el feed')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadFeed()
  }, [])

  if (loading) return <LoadingSpinner size="lg" className="py-20" />

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title mb-0">🏠 Tu Feed</h1>
        <button
          onClick={loadFeed}
          className="btn-secondary text-sm py-1.5 px-3 flex items-center gap-1"
          title="Actualizar publicaciones"
        >
          🔄 Actualizar
        </button>
      </div>

      <ErrorMessage message={error} className="mb-4" />

      {posts.length === 0 && !error ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">🌟</p>
          <p className="text-gray-400 text-lg">Tu feed está vacío.</p>
          <p className="text-gray-500 text-sm mb-4">Sigue a algunos creadores para ver sus publicaciones aquí.</p>
          <Link to="/creators" className="btn-primary inline-flex">Explorar Creadores</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onComment={(postId, show) =>
                show ? <CommentSection postId={postId} currentUser={user} /> : null
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}