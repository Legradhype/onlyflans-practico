export default function ErrorMessage({ message, className = '' }) {
  if (!message) return null
  return (
    <div
      className={`flex items-center gap-2 bg-red-900/20 border border-red-700/50 text-red-400 rounded-xl px-4 py-3 text-sm ${className}`}
      role="alert"
    >
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  )
}
