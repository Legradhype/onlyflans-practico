import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl" />
      </div>

      <Link to="/" className="flex items-center gap-3 mb-8 relative z-10">
        <span className="text-5xl">🥞</span>
        <div>
          <h1 className="text-3xl font-black gradient-text">OnlyFlans</h1>
          <p className="text-gray-400 text-sm">Support your favorite creators</p>
        </div>
      </Link>
      <div className="card w-full max-w-md relative z-10 shadow-2xl shadow-black/50 animate-slide-up">
        <Outlet />
      </div>
    </div>
  )
}
