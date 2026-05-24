import Badge from './Badge'

export default function GoalCard({ goal, onComplete, isOwner }) {
  return (
    <div className="card animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{goal.title}</h3>
            <Badge variant={goal.status === 'ACTIVE' ? 'active' : 'completed'}>
              {goal.status}
            </Badge>
          </div>
          {goal.description && (
            <p className="text-gray-400 text-sm mt-1">{goal.description}</p>
          )}
        </div>
        {isOwner && goal.status === 'ACTIVE' && onComplete && (
          <button
            onClick={() => onComplete(goal.id)}
            className="btn-secondary text-sm py-1.5 px-3 whitespace-nowrap"
            id={`complete-goal-${goal.id}`}
          >
            ✓ Complete
          </button>
        )}
      </div>
    </div>
  )
}
