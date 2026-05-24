import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Badge from './Badge'

export default function CreatorCard({ creator, onFollow, onFavorite, isFollowing, isFavorited }) {
  const profile = creator.creatorProfile

  return (
    <div className="card-hover group animate-fade-in">
      <div className="h-20 rounded-xl overflow-hidden mb-4 -mx-2">
        {profile?.banner_url ? (
          <img
            src={profile.banner_url}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-brand-900 via-brand-800 to-dark-700" />
        )}
      </div>

      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={profile?.profile_picture_url}
          name={creator.name}
          size="lg"
          className="-mt-8 ring-4 ring-dark-800 flex-shrink-0"
        />
        <div className="flex-1 min-w-0 pt-1">
          <Link
            to={`/creators/${creator.id}`}
            className="font-bold text-white hover:text-brand-400 transition-colors truncate block"
          >
            {creator.name}
          </Link>
          <Badge variant="creator">Creator</Badge>
        </div>
      </div>

      {profile?.bio && (
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{profile.bio}</p>
      )}
      {(onFollow || onFavorite) && (
        <div className="flex gap-2 mt-3">
          {onFollow && (
            <button
              onClick={() => onFollow(creator.id)}
              id={`follow-btn-${creator.id}`}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isFollowing
                  ? 'bg-dark-600 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-dark-500'
                  : 'bg-brand-600 hover:bg-brand-500 text-white'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
          {onFavorite && (
            <button
              onClick={() => onFavorite(creator.id)}
              id={`fav-btn-${creator.id}`}
              className={`px-3 py-1.5 rounded-lg text-lg transition-all duration-200 ${
                isFavorited ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
              }`}
              title={isFavorited ? 'Remove favorite' : 'Add to favorites'}
            >
              {isFavorited ? '⭐' : '☆'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
