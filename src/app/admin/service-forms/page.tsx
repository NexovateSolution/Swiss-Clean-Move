'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Edit3,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Loader2
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { exportServiceFormToPDF } from '@/utils/pdfExport'
import { translateValue } from '@/utils/formTranslations'
import { PRICING_RULES } from '@/lib/pricingRules'

interface ServiceFormSubmission {
  id: string
  serviceName: string
  formType: string
  name: string
  firstName: string
  emailAddress: string
  telephone: string
  streetAndNumber: string
  postalCodeAndCity: string
  submissionDate: string
  pdfPath: string
  contactPreferredVia: string
  viewingIsWelcome: string
  remark?: string
  data?: Record<string, any>
}

// Pretty-print camelCase or snake_case keys into readable labels
function prettifyKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim()
}

// Internal fields to skip (already displayed elsewhere or meta)
const SKIP_KEYS = new Set([
  'id', 'serviceName', 'formType', 'status', 'pdfPath', 'submissionDate',
  'createdAt', 'updatedAt', 'data'
])

export default function ServiceFormsPage() {
  const t = useTranslations('admin.serviceForms')
  const locale = useLocale()
  const [submissions, setSubmissions] = useState<ServiceFormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ServiceFormSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Quote editing state
  const [quoteLineItems, setQuoteLineItems] = useState<any[]>([])
  const [quoteNumber, setQuoteNumber] = useState('')
  const [isEditingQuote, setIsEditingQuote] = useState(false)
  const [quoteSaving, setQuoteSaving] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/service-forms/list?t=' + Date.now(), { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } else {
        toast.error(t('errors.fetchSubmissions'))
      }
    } catch (error) {
      toast.error(t('errors.fetchSubmissions'))
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.serviceName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesService = serviceFilter === 'all' || submission.serviceName === serviceFilter

    return matchesSearch && matchesService
  })
  const handleViewDetails = (submission: ServiceFormSubmission) => {
    setSelectedSubmission(submission)
    setShowDetails(true)
    setIsEditingQuote(false)

    // Extract quote data from the submission's data payload
    const data = (submission as any).data || {}
    const qr = data.quoteResult
    if (qr) {
      setQuoteLineItems(qr.lineItems || [])
      setQuoteNumber(qr.quoteNumber || '')
      setAdminNotes(qr.adminNotes || '')
    } else {
      setQuoteLineItems([])
      setQuoteNumber('')
      setAdminNotes('')
    }
  }

  const handleDownloadPDF = (submission: ServiceFormSubmission) => {
    try {
      exportServiceFormToPDF(submission, locale)
      toast.success(t('toast.pdfDownloaded'))
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error(t('errors.generatePdf'))
    }
  }

  const getServiceColor = (serviceName: string) => {
    const colors: { [key: string]: string } = {
      'House Cleaning': 'bg-blue-100 text-blue-800',
      'Window Cleaning': 'bg-cyan-100 text-cyan-800',
      'Relocation': 'bg-indigo-100 text-indigo-800',
      'Disposal': 'bg-red-100 text-red-800',
      'Household Helping': 'bg-emerald-100 text-emerald-800',
      'Facility Services': 'bg-purple-100 text-purple-800',
    }
    return colors[serviceName] || 'bg-gray-100 text-gray-800'
  }

  // --- Quote Editing Helpers ---
  const calculateTotal = () => quoteLineItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0)

  const handleLineItemChange = (index: number, field: string, value: string | number) => {
    setQuoteLineItems(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: field === 'price' ? Number(value) : value }
      return updated
    })
  }

  const handleAddLineItem = () => {
    setQuoteLineItems(prev => [...prev, { description: '', descriptionDe: '', descriptionFr: '', price: 0 }])
  }

  const handleRemoveLineItem = (index: number) => {
    setQuoteLineItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveQuote = async () => {
    if (!selectedSubmission) return
    setQuoteSaving(true)
    try {
      const res = await fetch(`/api/service-forms/${selectedSubmission.id}/quote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems: quoteLineItems, adminNotes })
      })
      if (res.ok) {
        const data = await res.json()
        toast.success('Quote updated successfully')
        setIsEditingQuote(false)
        
        // Update selectedSubmission locally so UI updates immediately
        const updatedData = { ...((selectedSubmission as any).data || {}), quoteResult: data.quoteResult }
        setSelectedSubmission({ ...selectedSubmission, data: updatedData } as any)
        
        fetchSubmissions() // Refresh list
      } else {
        toast.error('Failed to save quote')
      }
    } catch {
      toast.error('Network error saving quote')
    } finally {
      setQuoteSaving(false)
    }
  }

  const uniqueServices = Array.from(new Set(submissions.map(s => s.serviceName)))

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('totalSubmissions', { count: filteredSubmissions.length })}
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('filters.allServices')}</option>
                {uniqueServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('table.customer')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('table.service')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('table.contact')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('table.submitted')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estimate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">{t('empty')}</p>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {submission.firstName} {submission.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {submission.postalCodeAndCity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceColor(submission.serviceName)}`}>
                          {submission.serviceName}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {submission.formType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {submission.emailAddress}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {submission.telephone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(submission.submissionDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(submission.submissionDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const qr = (submission as any).data?.quoteResult
                          if (qr && qr.totalPrice) {
                            return (
                              <div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">CHF {Number(qr.totalPrice).toFixed(2)}</span>
                                {qr.adminOverride && (
                                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-700">edited</span>
                                )}
                              </div>
                            )
                          }
                          return <span className="text-xs text-gray-400 italic">—</span>
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(submission)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1"
                            title={t('actions.viewDetails')}
                          >
                            <Eye className="w-3 h-3" />
                            <span>{t('actions.view')}</span>
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(submission)}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1"
                            title={t('actions.downloadPdf')}
                          >
                            <Download className="w-3 h-3" />
                            <span>{t('actions.pdf')}</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('modal.title')}
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.customerInformation')}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.salutation')}</label>
                        <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).salutation || t('common.notSpecified')}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.name')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.firstName} {selectedSubmission.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.email')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.emailAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.phone')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.telephone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.address')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.streetAndNumber}</p>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.postalCodeAndCity}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.serviceDetails')}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.service')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.serviceName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.formType')}</label>
                        <p className="text-gray-900 dark:text-white capitalize">{selectedSubmission.formType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.submissionDate')}</label>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(selectedSubmission.submissionDate).toLocaleString('en-CH', {
                            timeZone: 'Europe/Zurich',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.preferredContact')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.contactPreferredVia}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.viewingWelcome')}</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.viewingIsWelcome === 'And' ? t('common.yes') : t('common.no')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== QUOTE BREAKDOWN SECTION ===== */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Quotation Estimate
                      {quoteNumber && <span className="text-sm font-normal text-gray-500 ml-2">({quoteNumber})</span>}
                    </h3>
                    <div className="flex items-center gap-2">
                      {!isEditingQuote ? (
                        <button
                          onClick={() => setIsEditingQuote(true)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit Quote
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsEditingQuote(false)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveQuote}
                            disabled={quoteSaving}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
                          >
                            {quoteSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {quoteLineItems.length > 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-600">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">Description</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase w-32">Price (CHF)</th>
                            {isEditingQuote && <th className="px-2 py-2 w-10"></th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {quoteLineItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-650">
                              <td className="px-4 py-2">
                                {isEditingQuote ? (
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-500"
                                  />
                                ) : (
                                  <span className="text-gray-900 dark:text-white">{item.description}</span>
                                )}
                              </td>
                              <td className="px-4 py-2 text-right">
                                {isEditingQuote ? (
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) => handleLineItemChange(idx, 'price', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right bg-white dark:bg-gray-800 dark:text-white dark:border-gray-500"
                                  />
                                ) : (
                                  <span className="text-gray-900 dark:text-white font-medium">CHF {Number(item.price).toFixed(2)}</span>
                                )}
                              </td>
                              {isEditingQuote && (
                                <td className="px-2 py-2 text-center">
                                  <button
                                    onClick={() => handleRemoveLineItem(idx)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Remove line item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          {isEditingQuote && (
                            <tr>
                              <td colSpan={3} className="px-4 py-2">
                                <button
                                  onClick={handleAddLineItem}
                                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  <Plus className="w-3 h-3" /> Add line item
                                </button>
                              </td>
                            </tr>
                          )}

                          <tr className="bg-gray-100 dark:bg-gray-600">
                            <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Total Estimate:</td>
                            <td className="px-4 py-3 text-right font-bold text-lg text-red-600 dark:text-red-400">CHF {calculateTotal().toFixed(2)}</td>
                            {isEditingQuote && <td></td>}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
                      <AlertCircle className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">No automated quote was generated for this submission.</p>
                      <button
                        onClick={() => { setIsEditingQuote(true); handleAddLineItem(); }}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Create manual quote
                      </button>
                    </div>
                  )}

                  {/* Admin notes */}
                  {isEditingQuote && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Admin Notes</label>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={2}
                        placeholder="Internal notes about price adjustments..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                  {!isEditingQuote && adminNotes && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Admin Notes:</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">{adminNotes}</p>
                    </div>
                  )}

                  {/* Admin override indicator */}
                  {((selectedSubmission as any).data?.quoteResult?.adminOverride) && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                      <Edit3 className="w-3 h-3" />
                      Manually adjusted on {new Date((selectedSubmission as any).data.quoteResult.adminOverrideDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Dynamic: ALL submitted form data */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Additional Submitted Data
                  </h3>
                  {(() => {
                    // Merge selectedSubmission and its internal data payload
                    const raw: Record<string, any> = { ...selectedSubmission, ...((selectedSubmission as any).data || {}) }

                    const DEDUPLICATED_KEYS = new Set([
                      ...Array.from(SKIP_KEYS),
                      'firstName', 'name', 'emailAddress', 'telephone', 'streetAndNumber',
                      'postalCodeAndCity', 'contactPreferredVia', 'viewingIsWelcome', 'salutation'
                    ])

                    const allKeys = Object.keys(raw).filter(
                      k => !DEDUPLICATED_KEYS.has(k) && raw[k] !== null && raw[k] !== undefined && raw[k] !== ''
                    )

                    if (allKeys.length === 0) {
                      return <p className="text-gray-500 dark:text-gray-400 italic">No additional data submitted.</p>
                    }
                    return (
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {allKeys.map(key => {
                            const val = raw[key]
                            let display: React.ReactNode

                            if (key === 'imagePaths' && Array.isArray(val)) {
                              display = (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                  {val.map((img: string, i: number) => (
                                    <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="block outline-none ring-2 ring-transparent focus:ring-blue-500 rounded">
                                      {img.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                        <img src={img} alt="Uploaded form attachment" className="w-full h-24 object-cover rounded shadow-sm border border-gray-200" />
                                      ) : (
                                        <div className="w-full h-24 bg-gray-100 flex items-center justify-center text-xs text-blue-600 underline rounded border border-gray-200">
                                          View File
                                        </div>
                                      )}
                                    </a>
                                  ))}
                                </div>
                              )
                            } else if (Array.isArray(val)) {
                              if (val.length === 0) return null
                              display = (
                                <div className="flex flex-wrap gap-1.5">
                                  {val.map((item: any, i: number) => (
                                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                      ✓ {translateValue(typeof item === 'string' ? prettifyKey(item) : String(item), locale)}
                                    </span>
                                  ))}
                                </div>
                              )
                            } else if (typeof val === 'boolean') {
                              display = val ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ {t('common.yes')}</span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">✗ {t('common.no')}</span>
                              )
                            } else if (val === 'And' || val === 'yes' || val === 'Yes') {
                              display = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ {t('common.yes')}</span>
                            } else if (val === 'no' || val === 'No') {
                              display = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">✗ {t('common.no')}</span>
                            } else if (typeof val === 'object') {
                              display = <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded p-2 overflow-x-auto">{JSON.stringify(val, null, 2)}</pre>
                            } else {
                              display = <span className="text-gray-900 dark:text-white font-medium break-words whitespace-pre-wrap">{translateValue(typeof val === 'string' ? prettifyKey(val) : String(val), locale)}</span>
                            }

                            return (
                              <div key={key} className="flex flex-col sm:flex-row items-start px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                                <dt className="sm:w-1/3 min-w-[200px] flex-shrink-0 text-sm font-semibold text-gray-500 dark:text-gray-400 capitalize pt-0.5 mb-1 sm:mb-0">
                                  {translateValue(prettifyKey(key), locale)}
                                </dt>
                                <dd className="flex-1 w-full sm:ml-4">
                                  {display}
                                </dd>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {selectedSubmission.remark && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.additionalRemarks')}</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{selectedSubmission.remark}</p>
                    </div>
                  </div>
                )}

                {((selectedSubmission as any).data?.imagePaths?.length > 0) && (
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                      </svg>
                      Attached Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(selectedSubmission as any).data.imagePaths.map((img: string, i: number) => (
                        <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="block relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <img src={img} alt={`Attached ${i + 1}`} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDownloadPDF(selectedSubmission)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('actions.downloadPdfButton')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
