import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { creatorsApi } from '../../api/creators.api'
import { postsApi } from '../../api/posts.api'
import { followsApi } from '../../api/follows.api'
import { favoritesApi } from '../../api/favorites.api'
import { useAuth } from '../../hooks/useAuth'
import Avatar from '../../components/Avatar'
import Badge from '../../components/Badge'
import PostCard from '../../components/PostCard'
import CommentSection from '../../components/CommentSection'
import DonateModal from '../../components/DonateModal'
import GoalCard from '../../components/GoalCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

export default function CreatorProfilePage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [creator, setCreator] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [postsLoading, setPostsLoading] = useState(false)
  const [error, setError] = useState('')
  const [postsError, setPostsError] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [donateSuccess, setDonateSuccess] = useState(false)

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // 1. Cargamos los datos del creador
        const res = await creatorsApi.getById(id)
        setCreator(res.data.data)

        // 2. Si el usuario es un seguidor, verificamos su estado de follows y favoritos
        if (user?.role === 'FOLLOWER') {
          const [followsRes, favoritesRes] = await Promise.all([
            followsApi.getMyFollows(),
            favoritesApi.getAll()
          ])

          const followsList = followsRes.data.data || []
          const isFoll = followsList.some(f => f.creator_id === id || f.id === id)
          setIsFollowing(isFoll)

          const favsList = favoritesRes.data.data || []
          const isFav = favsList.some(f => f.creator_id === id || f.id === id)
          setIsFavorited(isFav)
        }
      } catch (err) {
        setError('Creador no encontrado')
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [id, user])

  const loadPosts = () => {
    setPostsLoading(true)
    setPostsError('')
    postsApi.getByCreator(id)
      .then((res) => setPosts(res.data.data.items || []))
      .catch((err) => setPostsError(err.response?.data?.message || 'Error al cargar las publicaciones'))
      .finally(() => setPostsLoading(false))
  }

  const handleFollow = async () => {
    try {
      if (isFollowing) { 
        await followsApi.unfollow(id)
        setIsFollowing(false) 
      } else { 
        await followsApi.follow(id)
        setIsFollowing(true) 
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setIsFollowing(true) // Autocorrección visual si el backend dice que ya lo sigue
      } else {
        setError(err.response?.data?.message || 'Error al ejecutar la acción')
      }
    }
  }

  const handleFavorite = async () => {
    try {
      if (isFavorited) { 
        await favoritesApi.remove(id)
        setIsFavorited(false) 
      } else { 
        await favoritesApi.add(id)
        setIsFavorited(true) 
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setIsFavorited(true) // Autocorrección visual
      } else {
        setError(err.response?.data?.message || 'Error al ejecutar la acción')
      }
    }
  }

  const handleDonateSuccess = () => {
    setDonateSuccess(true)
    loadPosts()
    setTimeout(() => setDonateSuccess(false), 4000)
  }

  if (loading) return <LoadingSpinner size="lg" className="py-20" />
  if (error) return <ErrorMessage message={error} />
  if (!creator) return null

  const cp = creator.creatorProfile

  return (
    <div className="animate-fade-in space-y-6">
      <div className="card overflow-hidden p-0">
        <div className="h-36 bg-gradient-to-r from-brand-900 via-brand-800 to-dark-700">
          {cp?.banner_url && (
            <img src={cp.banner_url} alt="Banner" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between gap-4 -mt-10 mb-4 flex-wrap">
            <Avatar src={cp?.profile_picture_url} name={creator.name} size="xl" className="ring-4 ring-dark-800" />
            {user?.role === 'FOLLOWER' && (
              <div className="flex gap-2 flex-wrap mb-2">
                <button
                  onClick={handleFollow}
                  className={isFollowing ? 'btn-secondary' : 'btn-primary'}
                  id="follow-creator-btn"
                >
                  {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                </button>
                <button
                  onClick={handleFavorite}
                  className="btn-secondary"
                  id="favorite-creator-btn"
                  title={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                  {isFavorited ? '⭐' : '☆'} Favorito
                </button>
                <button
                  onClick={() => setShowDonate(true)}
                  className="btn-primary"
                  id="donate-creator-btn"
                >
                  🥞 Enviar Flanes
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-white">{creator.name}</h1>
            <Badge variant="creator">Creador</Badge>
          </div>
          {cp?.bio && <p className="text-gray-300">{cp.bio}</p>}
        </div>
      </div>

      {donateSuccess && (
        <div className="bg-green-900/20 border border-green-700/50 text-green-400 rounded-xl px-4 py-3 animate-fade-in">
          ✅ ¡Flanes enviados! Ahora puedes ver las publicaciones de este creador y dejar comentarios.
        </div>
      )}
      {creator.goals?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-3">🎯 Metas de Apoyo</h2>
          <div className="space-y-3">
            {creator.goals.filter(g => g.status === 'ACTIVE').map((goal) => (
              <GoalCard key={goal.id} goal={goal} isOwner={false} />
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Publicaciones</h2>
          {user?.role === 'FOLLOWER' && (
            <button onClick={loadPosts} className="btn-ghost text-sm" id="load-posts-btn">
              Cargar Publicaciones
            </button>
          )}
        </div>

        {postsLoading ? (
          <LoadingSpinner size="md" className="py-8" />
        ) : postsError ? (
          <div className="card text-center py-8">
            <p className="text-gray-400 text-sm mb-3">{postsError}</p>
            {user?.role === 'FOLLOWER' && (
              <button onClick={() => setShowDonate(true)} className="btn-primary" id="donate-to-unlock">
                🥞 Envía Flanes para desbloquear las publicaciones
              </button>
            )}
          </div>
        ) : posts.length === 0 ? (
          <div className="card text-center py-10">
            <p className="text-gray-400">Aún no hay publicaciones.</p>
          </div>
        ) : (
          <div className="space-y-5">
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

      {showDonate && (
        <DonateModal
          creator={creator}
          onClose={() => setShowDonate(false)}
          onSuccess={handleDonateSuccess}
        />
      )}
    </div>
  )
}