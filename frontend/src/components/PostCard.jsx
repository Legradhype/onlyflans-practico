import { useState } from 'react'
import Avatar from './Avatar'

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-BO', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function PostCard({ post, onComment, currentUser }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <article className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <Avatar
          src={post.creator?.creatorProfile?.profile_picture_url}
          name={post.creator?.name}
          size="md"
        />
        <div>
          <p className="font-semibold text-white">{post.creator?.name}</p>
          <p className="text-xs text-gray-500">{formatDate(post.created_at || post.createdAt)}</p>
        </div>
      </div>
      
      {post.text_content && (
        <p className="text-gray-200 leading-relaxed mb-4 whitespace-pre-line">{post.text_content}</p>
      )}

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Publicación"
          className="w-full rounded-xl object-cover max-h-96 mb-4"
        />
      )}
      
      <div className="flex items-center gap-4 pt-3 border-t border-dark-600">
        {onComment && (
          <button
            onClick={() => setShowComments((v) => !v)}
            className="btn-ghost text-sm text-gray-300 hover:text-white transition-colors"
            id={`comments-toggle-${post.id}`}
          >
            💬 {showComments ? 'Ocultar' : 'Dejar un comentario'}
          </button>
        )}
      </div>
      
      {showComments && onComment && (
        <div className="mt-4 animate-fade-in">
          {onComment(post.id, showComments)}
        </div>
      )}
    </article>
  )
}