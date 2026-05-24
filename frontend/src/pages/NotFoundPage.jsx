import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center text-center p-4">
      <div className="animate-slide-up">
        <p className="text-9xl font-black gradient-text mb-4">404</p>
        <p className="text-6xl mb-6">🥞</p>
        <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary text-lg py-3 px-8">
          Go Home
        </Link>
      </div>
    </div>
  )
}
