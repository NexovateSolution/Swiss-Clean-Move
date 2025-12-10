'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  totalPrice: number
  balance: number
}

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function DeleteModal({ isOpen, onClose, client, onSuccess }: DeleteModalProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!client) return

    try {
      setLoading(true)
      
      const response = await fetch(`/api/admin/clients/${client.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete client')
      }

      toast.success('Client deleted successfully')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Failed to delete client')
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
                  <div className="bg-red-100 p-2 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Delete Client</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this client? This action cannot be undone and will permanently remove:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
                    <li>Client information and project details</li>
                    <li>All payment records</li>
                    <li>All uploaded photos</li>
                    <li>All invoices</li>
                  </ul>
                </div>

                {/* Client Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Project Details</h3>
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
                    <div className="col-span-2">
                      <span className="text-gray-500">Outstanding Balance:</span>
                      <p className="font-medium text-red-600">CHF {client.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {client.balance > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Outstanding Balance Warning</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          This client has an outstanding balance of CHF {client.balance.toLocaleString()}. 
                          Deleting this client will permanently remove all payment records.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Deleting...' : 'Delete Client'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
