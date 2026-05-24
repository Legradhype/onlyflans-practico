import { useEffect, useState } from 'react'
import { favoritesApi } from '../../api/favorites.api'
import CreatorCard from '../../components/CreatorCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    favoritesApi.getAll()
      .then((res) => setFavorites(res.data.data || []))
      .catch(() => setError('Error al cargar los favoritos'))
      .finally(() => setLoading(false))
  }, [])

  const handleRemove = async (creatorId) => {
    try {
      await favoritesApi.remove(creatorId)
      setFavorites((prev) => prev.filter((c) => c.id !== creatorId))
    } catch { /* ignorar el error silenciado */ }
  }

  if (loading) return <LoadingSpinner size="lg" className="py-20" />

  return (
    <div className="animate-fade-in">
      <h1 className="section-title">⭐ Favoritos</h1>

      <ErrorMessage message={error} className="mb-4" />

      {favorites.length === 0 && !error ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">⭐</p>
          <p className="text-gray-400 text-lg">Aún no tienes favoritos.</p>
          <p className="text-gray-500 text-sm">Marca a los creadores con una estrella desde la página de Explorar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onFavorite={handleRemove}
              isFavorited
            />
          ))}
        </div>
      )}
    </div>
  )
}