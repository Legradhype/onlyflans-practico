export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-dark-600 text-gray-300',
    creator: 'bg-brand-900/60 text-brand-300 border border-brand-700/50',
    follower: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
    success: 'bg-green-900/60 text-green-300 border border-green-700/50',
    warning: 'bg-yellow-900/60 text-yellow-300 border border-yellow-700/50',
    active: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
    completed: 'bg-gray-800 text-gray-400 border border-gray-700/50',
  }

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
