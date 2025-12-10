'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Client {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  totalPrice: number
  paidAmount: number
  balance: number
}

interface PaymentData {
  amount: number
  method: 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'PAYPAL'
  notes?: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function PaymentModal({ isOpen, onClose, client, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<PaymentData>({
    defaultValues: {
      amount: client?.balance || 0,
      method: 'CASH',
      notes: ''
    }
  })

  const paymentAmount = watch('amount') || 0

  const onSubmit = async (data: PaymentData) => {
    if (!client) return

    try {
      setLoading(true)
      
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: client.id,
          ...data
        })
      })

      if (!response.ok) {
        throw new Error('Failed to process payment')
      }

      toast.success('Payment added successfully')
      onSuccess()
      onClose()
      reset()
    } catch (error) {
      toast.error('Failed to process payment')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!client) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Add Payment</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Client Info */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Client:</span>
                    <p className="font-medium text-gray-900">{client.firstName} {client.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium text-gray-900">{client.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium text-gray-900">{client.email || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Price:</span>
                    <p className="font-medium text-gray-900">CHF {client.totalPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Paid Amount:</span>
                    <p className="font-medium text-gray-900">CHF {client.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Balance:</span>
                    <p className="font-medium text-red-600">CHF {client.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      max={client.balance}
                      {...register('amount', { 
                        required: 'Amount is required',
                        min: { value: 0.01, message: 'Amount must be greater than 0' },
                        max: { value: client.balance, message: 'Amount cannot exceed balance' }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method *
                    </label>
                    <select
                      {...register('method', { required: 'Payment method is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="CASH">Cash</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="PAYPAL">PayPal</option>
                    </select>
                    {errors.method && (
                      <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any notes about this payment..."
                  />
                </div>

                {/* Payment Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Payment Amount:</span>
                      <span className="font-medium text-blue-900">CHF {paymentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Remaining Balance:</span>
                      <span className="font-medium text-blue-900">
                        CHF {(client.balance - paymentAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CreditCard className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Processing...' : 'Add Payment'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
