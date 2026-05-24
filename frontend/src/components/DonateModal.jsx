import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { donationsApi } from '../api/donations.api'
import ErrorMessage from './ErrorMessage'

export default function DonateModal({ creator, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { quantity: 1 },
  })

  const onSubmit = async ({ quantity }) => {
    setSubmitting(true)
    setError('')
    try {
      await donationsApi.donate({ creator_id: creator.id, quantity: parseInt(quantity, 10) })
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Donation failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      id="donate-modal"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative card max-w-sm w-full animate-slide-up shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Send Flans 🥞</h2>
            <p className="text-sm text-gray-400 mt-0.5">Supporting {creator.name}</p>
          </div>
          <button onClick={onClose} className="btn-ghost p-2 text-xl" aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="label" htmlFor="donate-quantity">Number of Flans</label>
            <input
              id="donate-quantity"
              type="number"
              min="1"
              max="999"
              className="input text-center text-2xl font-bold"
              {...register('quantity', {
                required: 'Please enter a quantity',
                min: { value: 1, message: 'Minimum 1 flan' },
                max: { value: 999, message: 'Maximum 999 flans' },
              })}
            />
            {errors.quantity && <p className="error-text">{errors.quantity.message}</p>}
          </div>

          <div className="bg-dark-700 rounded-xl p-3 text-center text-sm text-gray-400">
            
          </div>

          <ErrorMessage message={error} />

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1"
              id="donate-submit"
            >
              {submitting ? 'Sending...' : 'Send Flans! 🥞'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
