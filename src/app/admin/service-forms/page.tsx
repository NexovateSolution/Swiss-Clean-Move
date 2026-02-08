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
}

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

                {/* Relocation Specific Details */}
                {selectedSubmission.formType === 'relocation' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.relocationDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.movingDate')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).movingDate || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.numberOfRooms')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).numberOfRooms || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.livingSpace')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).livingSpaceInM2 || t('common.notSpecified')} m²</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.floors')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).floors || t('common.notSpecified')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.unloadingAddress')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).unloadingStreetAndNumber || t('common.notSpecified')}</p>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).unloadingPostalCodeAndCity || ''}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.additionalServices')}</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).pack && <p className="text-gray-900 dark:text-white">✓ {t('services.pack')}</p>}
                            {(selectedSubmission as any).cellar && <p className="text-gray-900 dark:text-white">✓ {t('services.cellar')}</p>}
                            {(selectedSubmission as any).garage && <p className="text-gray-900 dark:text-white">✓ {t('services.garage')}</p>}
                            {(selectedSubmission as any).screed && <p className="text-gray-900 dark:text-white">✓ {t('services.screed')}</p>}
                            {(selectedSubmission as any).craftRoom && <p className="text-gray-900 dark:text-white">✓ {t('services.craftRoom')}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.services')}</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).unpacking === 'And' && <p className="text-gray-900 dark:text-white">✓ {t('services.unpacking')}</p>}
                            {(selectedSubmission as any).cleaning === 'And' && <p className="text-gray-900 dark:text-white">✓ {t('services.cleaning')}</p>}
                            {(selectedSubmission as any).disposal === 'And' && <p className="text-gray-900 dark:text-white">✓ {t('services.disposal')}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.assemblyLiftDetails')}</label>
                          <div className="space-y-1">
                            <p className="text-gray-900 dark:text-white">{t('fields.assembly')}: {(selectedSubmission as any).assembly || t('common.notSpecified')}</p>
                            <p className="text-gray-900 dark:text-white">{t('fields.lift')}: {(selectedSubmission as any).lift || t('common.notSpecified')}</p>
                            <p className="text-gray-900 dark:text-white">{t('fields.pathToFrontDoor')}: {(selectedSubmission as any).pathToFrontDoor || t('common.notSpecified')}</p>
                            <p className="text-gray-900 dark:text-white">{t('fields.liftDisassembly')}: {(selectedSubmission as any).liftDisassembly || t('common.notSpecified')}</p>
                            <p className="text-gray-900 dark:text-white">{t('fields.pathDistanceM')}: {(selectedSubmission as any).pathToFrontDoorM || t('common.notSpecified')}</p>
                            <p className="text-gray-900 dark:text-white">{t('fields.heavyLoad')}: {(selectedSubmission as any).heavyLoad || t('common.notSpecified')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cleaning Specific Details */}
                {selectedSubmission.formType === 'cleaning' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.cleaningDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.numberOfRooms')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).numberOfRoomsApartment || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.apartmentType')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).apartmentType || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.area')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).areaInM2 || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.awningType')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).awningType || t('common.notSpecified')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.cleaningDate')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).cleaningAppointment || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.submissionDeadline')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).submissionDeadline || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.additionalAreas')}</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).cellarCleaning && <p className="text-gray-900 dark:text-white">✓ {t('services.cellar')}</p>}
                            {(selectedSubmission as any).garageCleaning && <p className="text-gray-900 dark:text-white">✓ {t('services.garage')}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.specialServices')}</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).carpetShampooing && <p className="text-gray-900 dark:text-white">✓ {t('services.carpetShampooing')}</p>}
                            {(selectedSubmission as any).conservatory && <p className="text-gray-900 dark:text-white">✓ {t('services.conservatory')}</p>}
                            {(selectedSubmission as any).outdoorSeating && <p className="text-gray-900 dark:text-white">✓ {t('services.outdoorSeating')}</p>}
                            {(selectedSubmission as any).parquet && <p className="text-gray-900 dark:text-white">✓ {t('services.parquet')}</p>}
                            {(selectedSubmission as any).stairpolish && <p className="text-gray-900 dark:text-white">✓ {t('services.stairPolish')}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disposal Specific Details */}
                {selectedSubmission.formType === 'disposal' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.disposalDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.disposalType')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).disposalType || t('common.generalDisposal')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.volume')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).volume || t('common.notSpecified')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.collectionDate')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).collectionDate || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.specialItems')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).specialItems || t('common.noneSpecified')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Storage Specific Details */}
                {selectedSubmission.formType === 'storage' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('modal.storageDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.storageDuration')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageDuration || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.storageSize')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageSize || t('common.notSpecified')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.startDate')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageStartDate || t('common.notSpecified')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('fields.specialRequirements')}</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).specialRequirements || t('common.noneSpecified')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Form Data Section - Shows all fields in a professional format */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    {t('modal.completeFormDetails')}
                  </h3>
                  <div className="space-y-6">
                    {/* Group fields by category */}
                    {(() => {
                      const formData = selectedSubmission as any;
                      
                      // Define field categories
                      const categories = [
                        {
                          title: t('categories.basicInformation'),
                          icon: '👤',
                          fields: [
                            { key: 'serviceName', label: t('allFields.serviceName') },
                            { key: 'formType', label: t('allFields.formType') },
                            { key: 'salutation', label: t('allFields.salutation') },
                            { key: 'name', label: t('allFields.lastName') },
                            { key: 'firstName', label: t('allFields.firstName') },
                          ]
                        },
                        {
                          title: t('categories.contactDetails'),
                          icon: '📞',
                          fields: [
                            { key: 'emailAddress', label: t('allFields.emailAddress') },
                            { key: 'telephone', label: t('allFields.telephone') },
                            { key: 'contactPreferredVia', label: t('allFields.preferredContactMethod') },
                          ]
                        },
                        {
                          title: t('categories.addressInformation'),
                          icon: '📍',
                          fields: [
                            { key: 'streetAndNumber', label: t('allFields.streetAndNumber') },
                            { key: 'postalCodeAndCity', label: t('allFields.postalCodeAndCity') },
                            { key: 'unloadingStreetAndNumber', label: t('allFields.unloadingStreetAndNumber') },
                            { key: 'unloadingPostalCodeAndCity', label: t('allFields.unloadingPostalCodeAndCity') },
                          ]
                        },
                        {
                          title: t('categories.serviceDetails'),
                          icon: '🏠',
                          fields: [
                            { key: 'movingDate', label: t('allFields.movingDate') },
                            { key: 'viewingIsWelcome', label: t('allFields.viewingWelcome') },
                            { key: 'floors', label: t('allFields.numberOfFloors') },
                            { key: 'numberOfRooms', label: t('allFields.numberOfRooms') },
                            { key: 'livingSpaceInM2', label: t('allFields.livingSpaceM2') },
                          ]
                        },
                        {
                          title: t('categories.additionalServices'),
                          icon: '✨',
                          fields: [
                            { key: 'assembly', label: t('allFields.assemblyRequired') },
                            { key: 'lift', label: t('allFields.liftAvailable') },
                            { key: 'liftDisassembly', label: t('allFields.liftDisassembly') },
                            { key: 'pathToFrontDoor', label: t('allFields.pathToFrontDoor') },
                            { key: 'pathToFrontDoorM', label: t('allFields.pathDistanceM') },
                            { key: 'heavyLoad', label: t('allFields.heavyLoad') },
                            { key: 'unpacking', label: t('allFields.unpackingService') },
                            { key: 'cleaning', label: t('allFields.cleaningService') },
                            { key: 'disposal', label: t('allFields.disposalService') },
                            { key: 'pack', label: t('allFields.packingService') },
                            { key: 'screed', label: t('allFields.screedProtection') },
                            { key: 'garage', label: t('allFields.garage') },
                          ]
                        },
                        {
                          title: t('categories.notesRemarks'),
                          icon: '📝',
                          fields: [
                            { key: 'remark', label: t('allFields.additionalRemarks') },
                          ]
                        }
                      ];

                      return categories.map((category, idx) => {
                        // Filter out fields that don't exist or are empty
                        const existingFields = category.fields.filter(
                          field => formData[field.key] !== null && 
                                  formData[field.key] !== undefined && 
                                  formData[field.key] !== ''
                        );

                        if (existingFields.length === 0) return null;

                        return (
                          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="text-xl">{category.icon}</span>
                                {category.title}
                              </h4>
                            </div>
                            <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {existingFields.map(field => {
                                  let value = formData[field.key];
                                  
                                  // Format boolean values
                                  if (typeof value === 'boolean') {
                                    value = value ? `✓ ${t('common.yes')}` : `✗ ${t('common.no')}`;
                                  } else if (value === 'yes' || value === 'Yes') {
                                    value = `✓ ${t('common.yes')}`;
                                  } else if (value === 'no' || value === 'No') {
                                    value = `✗ ${t('common.no')}`;
                                  } else if (value === 'And') {
                                    value = `✓ ${t('common.included')}`;
                                  }
                                  
                                  return (
                                    <div key={field.key} className="space-y-2">
                                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {field.label}
                                      </label>
                                      <p className="text-base text-gray-900 dark:text-white font-medium break-words">
                                        {value}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
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
