import { useEffect, useState, useCallback } from 'react'
import { creatorsApi } from '../../api/creators.api'
import { followsApi } from '../../api/follows.api'
import { favoritesApi } from '../../api/favorites.api'
import CreatorCard from '../../components/CreatorCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

export default function CreatorsListPage() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [following, setFollowing] = useState(new Set())
  const [favorites, setFavorites] = useState(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [creatorsRes, followsRes, favsRes] = await Promise.all([
        creatorsApi.getAll({ search, limit: 20 }),
        followsApi.getMyFollows(),
        favoritesApi.getAll()
      ])
      
      setCreators(creatorsRes.data.data.items || [])
      const followedIds = (followsRes.data.data || []).map(f => f.creator_id || f.id)
      const favoritedIds = (favsRes.data.data || []).map(f => f.creator_id || f.id)
      setFollowing(new Set(followedIds))
      setFavorites(new Set(favoritedIds))

    } catch {
      setError('Error al cargar la lista de creadores')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const t = setTimeout(load, 400)
    return () => clearTimeout(t)
  }, [load])

  const handleFollow = async (creatorId) => {
    try {
      if (following.has(creatorId)) {
        await followsApi.unfollow(creatorId)
        setFollowing((prev) => { const s = new Set(prev); s.delete(creatorId); return s })
      } else {
        await followsApi.follow(creatorId)
        setFollowing((prev) => new Set([...prev, creatorId]))
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setFollowing((prev) => new Set([...prev, creatorId]))
      } else {
        setError(err.response?.data?.message || 'Error al ejecutar la acción')
      }
    }
  }

  const handleFavorite = async (creatorId) => {
    try {
      if (favorites.has(creatorId)) {
        await favoritesApi.remove(creatorId)
        setFavorites((prev) => { const s = new Set(prev); s.delete(creatorId); return s })
      } else {
        await favoritesApi.add(creatorId)
        setFavorites((prev) => new Set([...prev, creatorId]))
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setFavorites((prev) => new Set([...prev, creatorId]))
      } else {
        setError(err.response?.data?.message || 'Error al ejecutar la acción')
      }
    }
  }

  return (
    <div className="animate-fade-in">
      <h1 className="section-title">🌟 Explorar Creadores</h1>
      <div className="mb-6">
        <input
          type="text"
          className="input"
          placeholder="Buscar creadores por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="creator-search"
        />
      </div>

      <ErrorMessage message={error} className="mb-4" />

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : creators.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-400">No se encontraron creadores{search ? ` para "${search}"` : ''}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onFollow={handleFollow}
              onFavorite={handleFavorite}
              isFollowing={following.has(creator.id)}
              isFavorited={favorites.has(creator.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}