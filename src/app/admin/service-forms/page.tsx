'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
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
  AlertCircle
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { exportServiceFormToPDF } from '@/utils/pdfExport'

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
  const [submissions, setSubmissions] = useState<ServiceFormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ServiceFormSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/service-forms/list')
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
  }

  const handleDownloadPDF = (submission: ServiceFormSubmission) => {
    try {
      exportServiceFormToPDF(submission)
      toast.success(t('toast.pdfDownloaded'))
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error(t('errors.generatePdf'))
    }
  }

  const getServiceColor = (serviceName: string) => {
    const colors: { [key: string]: string } = {
      'House Cleaning': 'bg-blue-100 text-blue-800',
      'Apartment Cleaning': 'bg-green-100 text-green-800',
      'Stairwell Cleaning': 'bg-purple-100 text-purple-800',
      'Office Cleaning': 'bg-orange-100 text-orange-800',
      'Final Cleaning': 'bg-teal-100 text-teal-800',
      'Window Cleaning': 'bg-cyan-100 text-cyan-800',
      'Relocation': 'bg-indigo-100 text-indigo-800',
      'Disposal': 'bg-red-100 text-red-800',
      'Maintenance Cleaning': 'bg-sky-100 text-sky-800',
      'Gastronomy Cleaning': 'bg-rose-100 text-rose-800',
      'Medical Cleaning': 'bg-emerald-100 text-emerald-800',
      'Construction Cleaning': 'bg-yellow-100 text-yellow-800',
      'Property Maintenance': 'bg-teal-100 text-teal-800',
      'Special Cleaning': 'bg-fuchsia-100 text-fuchsia-800',
      'Combo Service': 'bg-indigo-100 text-indigo-800'
    }
    return colors[serviceName] || 'bg-gray-100 text-gray-800'
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
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

                {/* Dynamic: ALL submitted form data */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    All Submitted Form Data
                  </h3>
                  {(() => {
                    // Merge: prefer the rich `data` JSON, fall back to top-level DB columns
                    const raw: Record<string, any> = (selectedSubmission as any).data || selectedSubmission
                    const allKeys = Object.keys(raw).filter(
                      k => !SKIP_KEYS.has(k) && raw[k] !== null && raw[k] !== undefined && raw[k] !== ''
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

                            if (Array.isArray(val)) {
                              if (val.length === 0) return null
                              display = (
                                <div className="flex flex-wrap gap-1.5">
                                  {val.map((item: any, i: number) => (
                                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                      ✓ {String(item)}
                                    </span>
                                  ))}
                                </div>
                              )
                            } else if (typeof val === 'boolean') {
                              display = val ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ Yes</span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">✗ No</span>
                              )
                            } else if (val === 'And' || val === 'yes' || val === 'Yes') {
                              display = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ Yes</span>
                            } else if (val === 'no' || val === 'No') {
                              display = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">✗ No</span>
                            } else if (typeof val === 'object') {
                              display = <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded p-2 overflow-x-auto">{JSON.stringify(val, null, 2)}</pre>
                            } else {
                              display = <span className="text-gray-900 dark:text-white font-medium break-words">{String(val)}</span>
                            }

                            return (
                              <div key={key} className="flex items-start px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                <dt className="w-1/3 min-w-[160px] flex-shrink-0 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pt-0.5">
                                  {prettifyKey(key)}
                                </dt>
                                <dd className="flex-1 ml-4">
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

      <Toaster position="top-right" />
    </AdminLayout>
  )
}
