'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, Loader2, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { format, addDays } from 'date-fns'

interface Client {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  address: string
  postalCode: string
  location: string
  serviceType: string
  totalPrice: number
  balance: number
}

interface InvoiceData {
  amount: number
  dueDate: string
}

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function InvoiceModal({ isOpen, onClose, client, onSuccess }: InvoiceModalProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InvoiceData>({
    defaultValues: {
      amount: client?.balance || 0,
      dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd')
    }
  })

  const onSubmit = async (data: InvoiceData) => {
    if (!client) return

    try {
      setLoading(true)

      const response = await fetch('/api/admin/invoices', {
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
        throw new Error('Failed to create invoice')
      }

      const invoice = await response.json()
      toast.success('Invoice created successfully')

      // Generate and download PDF
      generateInvoicePDF(invoice)

      onSuccess()
      onClose()
      reset()
    } catch (error) {
      toast.error('Failed to create invoice')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const generateInvoicePDF = async (invoice: any) => {
    if (!client) return

    try {
      const response = await fetch('/api/admin/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: client.id,
          language: 'de'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice template');
      }

      const htmlContent = await response.text();

      // Open in new window for printing/saving as PDF
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
        }, 500)
      }
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast.error('Failed to generate PDF preview');
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
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Create Invoice</h2>
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
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
                    <span className="text-gray-500">Service:</span>
                    <p className="font-medium text-gray-900">{client.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>
                    <p className="font-medium text-gray-900">{client.address}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium text-gray-900">{client.postalCode} {client.location}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Invoice Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('amount', {
                        required: 'Amount is required',
                        min: { value: 0.01, message: 'Amount must be greater than 0' }
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
                      Due Date *
                    </label>
                    <input
                      type="date"
                      {...register('dueDate', { required: 'Due date is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Invoice Preview */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Invoice Preview</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Service:</span>
                      <span className="font-medium text-blue-900">{client.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Subtotal:</span>
                      <span className="font-medium text-blue-900">CHF {client.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">VAT (7.7%):</span>
                      <span className="font-medium text-blue-900">CHF {(client.balance * 0.077).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-1">
                      <span className="text-blue-700 font-medium">Total:</span>
                      <span className="font-bold text-blue-900">CHF {(client.balance * 1.077).toLocaleString()}</span>
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
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Creating...' : 'Create & Download'}</span>
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
