'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Client {
  id?: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  address: string
  postalCode: string
  location: string
  squareMeters: number
  serviceType: string
  buildingType: string
  fromDate: string
  untilDate: string
  totalPrice: number
  paidAmount: number
  balance: number
  status: string
}

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function ClientModal({ isOpen, onClose, client, onSuccess }: ClientModalProps) {
  const [loading, setLoading] = useState(false)
  const isEdit = !!client

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Client>()

  const totalPrice = watch('totalPrice') || 0
  const paidAmount = watch('paidAmount') || 0

  useEffect(() => {
    if (client) {
      reset({
        ...client,
        fromDate: client.fromDate ? new Date(client.fromDate).toISOString().slice(0, 16) : '',
        untilDate: client.untilDate ? new Date(client.untilDate).toISOString().slice(0, 16) : ''
      })
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        location: '',
        squareMeters: 0,
        serviceType: 'Apartment cleaning',
        buildingType: 'Apartment',
        fromDate: '',
        untilDate: '',
        totalPrice: 0,
        paidAmount: 0,
        balance: 0,
        status: 'UNPAID'
      })
    }
  }, [client, reset])

  // Auto-calculate balance
  useEffect(() => {
    const balance = totalPrice - paidAmount
    setValue('balance', balance)
  }, [totalPrice, paidAmount, setValue])

  const onSubmit = async (data: Client) => {
    try {
      setLoading(true)
      
      const url = isEdit ? `/api/admin/clients/${client.id}` : '/api/admin/clients'
      const method = isEdit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to save client')
      }

      toast.success(isEdit ? 'Client updated successfully' : 'Client created successfully')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Failed to save client')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEdit ? 'Edit Client' : 'New Client'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6 space-y-8">
                  {/* Project Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          From Date *
                        </label>
                        <input
                          type="datetime-local"
                          {...register('fromDate', { required: 'From date is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.fromDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.fromDate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Until Date *
                        </label>
                        <input
                          type="datetime-local"
                          {...register('untilDate', { required: 'Until date is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.untilDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.untilDate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile *
                        </label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Square Meters *
                        </label>
                        <input
                          type="number"
                          {...register('squareMeters', { required: 'Square meters is required', min: 1 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Square meters"
                        />
                        {errors.squareMeters && (
                          <p className="mt-1 text-sm text-red-600">{errors.squareMeters.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          {...register('address', { required: 'Address is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Street address"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <input
                          {...register('location', { required: 'Location is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City"
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code *
                        </label>
                        <input
                          {...register('postalCode', { required: 'Postal code is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Postal code"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Type *
                        </label>
                        <select
                          {...register('serviceType', { required: 'Service type is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Apartment cleaning">Apartment cleaning</option>
                          <option value="House cleaning">House cleaning</option>
                          <option value="Office cleaning">Office cleaning</option>
                          <option value="Restaurant cleaning">Restaurant cleaning</option>
                          <option value="Move-out cleaning">Move-out cleaning</option>
                          <option value="Deep cleaning">Deep cleaning</option>
                        </select>
                        {errors.serviceType && (
                          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Building Type *
                        </label>
                        <select
                          {...register('buildingType', { required: 'Building type is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="House">House</option>
                          <option value="Office">Office</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.buildingType && (
                          <p className="mt-1 text-sm text-red-600">{errors.buildingType.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('totalPrice', { required: 'Total price is required', min: 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                        {errors.totalPrice && (
                          <p className="mt-1 text-sm text-red-600">{errors.totalPrice.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paid Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('paidAmount', { min: 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Balance
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('balance')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
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
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Saving...' : 'Save'}</span>
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
