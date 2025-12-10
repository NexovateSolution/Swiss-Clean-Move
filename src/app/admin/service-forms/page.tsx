'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
        toast.error('Failed to fetch submissions')
      }
    } catch (error) {
      toast.error('Error fetching submissions')
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
      toast.success('PDF downloaded successfully')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
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
      'Disposal': 'bg-red-100 text-red-800'
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Form Submissions</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and review service requests</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total: {filteredSubmissions.length} submissions
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
                placeholder="Search by name, email, or service..."
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
                <option value="all">All Services</option>
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
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No submissions found</p>
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
                            title="View Details"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(submission)}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1"
                            title="Download PDF"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF</span>
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
                  Submission Details
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Salutation</label>
                        <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).salutation || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.firstName} {selectedSubmission.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.emailAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.telephone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.streetAndNumber}</p>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.postalCodeAndCity}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.serviceName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Form Type</label>
                        <p className="text-gray-900 dark:text-white capitalize">{selectedSubmission.formType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Submission Date</label>
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
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Preferred Contact</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.contactPreferredVia}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Viewing Welcome</label>
                        <p className="text-gray-900 dark:text-white">{selectedSubmission.viewingIsWelcome === 'And' ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relocation Specific Details */}
                {selectedSubmission.formType === 'relocation' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Relocation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Moving Date</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).movingDate || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Rooms</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).numberOfRooms || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Living Space</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).livingSpaceInM2 || 'Not specified'} m²</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Floors</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).floors || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Unloading Address</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).unloadingStreetAndNumber || 'Not specified'}</p>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).unloadingPostalCodeAndCity || ''}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Services</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).pack && <p className="text-gray-900 dark:text-white">✓ Pack</p>}
                            {(selectedSubmission as any).cellar && <p className="text-gray-900 dark:text-white">✓ Cellar</p>}
                            {(selectedSubmission as any).garage && <p className="text-gray-900 dark:text-white">✓ Garage</p>}
                            {(selectedSubmission as any).screed && <p className="text-gray-900 dark:text-white">✓ Screed</p>}
                            {(selectedSubmission as any).craftRoom && <p className="text-gray-900 dark:text-white">✓ Craft Room</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Services</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).unpacking === 'And' && <p className="text-gray-900 dark:text-white">✓ Unpacking</p>}
                            {(selectedSubmission as any).cleaning === 'And' && <p className="text-gray-900 dark:text-white">✓ Cleaning</p>}
                            {(selectedSubmission as any).disposal === 'And' && <p className="text-gray-900 dark:text-white">✓ Disposal</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Assembly & Lift Details</label>
                          <div className="space-y-1">
                            <p className="text-gray-900 dark:text-white">Assembly: {(selectedSubmission as any).assembly || 'Not specified'}</p>
                            <p className="text-gray-900 dark:text-white">Lift: {(selectedSubmission as any).lift || 'Not specified'}</p>
                            <p className="text-gray-900 dark:text-white">Path to front door: {(selectedSubmission as any).pathToFrontDoor || 'Not specified'}</p>
                            <p className="text-gray-900 dark:text-white">Disassembly: {(selectedSubmission as any).liftDisassembly || 'Not specified'}</p>
                            <p className="text-gray-900 dark:text-white">Path to front door (m): {(selectedSubmission as any).pathToFrontDoorM || 'Not specified'}</p>
                            <p className="text-gray-900 dark:text-white">Heavy load: {(selectedSubmission as any).heavyLoad || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cleaning Specific Details */}
                {selectedSubmission.formType === 'cleaning' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cleaning Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Rooms</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).numberOfRoomsApartment || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Apartment Type</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).apartmentType || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Area</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).areaInM2 || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Awning Type</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).awningType || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Cleaning Date</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).cleaningAppointment || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Submission Deadline</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).submissionDeadline || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Areas</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).cellarCleaning && <p className="text-gray-900 dark:text-white">✓ Cellar</p>}
                            {(selectedSubmission as any).garageCleaning && <p className="text-gray-900 dark:text-white">✓ Garage</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Services</label>
                          <div className="space-y-1">
                            {(selectedSubmission as any).carpetShampooing && <p className="text-gray-900 dark:text-white">✓ Carpet Shampooing</p>}
                            {(selectedSubmission as any).conservatory && <p className="text-gray-900 dark:text-white">✓ Conservatory</p>}
                            {(selectedSubmission as any).outdoorSeating && <p className="text-gray-900 dark:text-white">✓ Outdoor Seating</p>}
                            {(selectedSubmission as any).parquet && <p className="text-gray-900 dark:text-white">✓ Parquet</p>}
                            {(selectedSubmission as any).stairpolish && <p className="text-gray-900 dark:text-white">✓ Stair Polish</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disposal Specific Details */}
                {selectedSubmission.formType === 'disposal' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Disposal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Disposal Type</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).disposalType || 'General disposal'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Volume</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).volume || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Collection Date</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).collectionDate || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Items</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).specialItems || 'None specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Storage Specific Details */}
                {selectedSubmission.formType === 'storage' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage Duration</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageDuration || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage Size</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageSize || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).storageStartDate || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Requirements</label>
                          <p className="text-gray-900 dark:text-white">{(selectedSubmission as any).specialRequirements || 'None specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Form Data Section - Shows all fields in a professional format */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Complete Form Details
                  </h3>
                  <div className="space-y-6">
                    {/* Group fields by category */}
                    {(() => {
                      const formData = selectedSubmission as any;
                      
                      // Define field categories
                      const categories = [
                        {
                          title: 'Basic Information',
                          icon: '👤',
                          fields: [
                            { key: 'serviceName', label: 'Service Name' },
                            { key: 'formType', label: 'Form Type' },
                            { key: 'salutation', label: 'Salutation' },
                            { key: 'name', label: 'Last Name' },
                            { key: 'firstName', label: 'First Name' },
                          ]
                        },
                        {
                          title: 'Contact Details',
                          icon: '📞',
                          fields: [
                            { key: 'emailAddress', label: 'Email Address' },
                            { key: 'telephone', label: 'Telephone' },
                            { key: 'contactPreferredVia', label: 'Preferred Contact Method' },
                          ]
                        },
                        {
                          title: 'Address Information',
                          icon: '📍',
                          fields: [
                            { key: 'streetAndNumber', label: 'Street & Number' },
                            { key: 'postalCodeAndCity', label: 'Postal Code & City' },
                            { key: 'unloadingStreetAndNumber', label: 'Unloading Street & Number' },
                            { key: 'unloadingPostalCodeAndCity', label: 'Unloading Postal Code & City' },
                          ]
                        },
                        {
                          title: 'Service Details',
                          icon: '🏠',
                          fields: [
                            { key: 'movingDate', label: 'Moving Date' },
                            { key: 'viewingIsWelcome', label: 'Viewing Welcome' },
                            { key: 'floors', label: 'Number of Floors' },
                            { key: 'numberOfRooms', label: 'Number of Rooms' },
                            { key: 'livingSpaceInM2', label: 'Living Space (m²)' },
                          ]
                        },
                        {
                          title: 'Additional Services',
                          icon: '✨',
                          fields: [
                            { key: 'assembly', label: 'Assembly Required' },
                            { key: 'lift', label: 'Lift Available' },
                            { key: 'liftDisassembly', label: 'Lift Disassembly' },
                            { key: 'pathToFrontDoor', label: 'Path to Front Door' },
                            { key: 'pathToFrontDoorM', label: 'Path Distance (m)' },
                            { key: 'heavyLoad', label: 'Heavy Load' },
                            { key: 'unpacking', label: 'Unpacking Service' },
                            { key: 'cleaning', label: 'Cleaning Service' },
                            { key: 'disposal', label: 'Disposal Service' },
                            { key: 'pack', label: 'Packing Service' },
                            { key: 'screed', label: 'Screed Protection' },
                            { key: 'garage', label: 'Garage' },
                          ]
                        },
                        {
                          title: 'Notes & Remarks',
                          icon: '📝',
                          fields: [
                            { key: 'remark', label: 'Additional Remarks' },
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
                                    value = value ? '✓ Yes' : '✗ No';
                                  } else if (value === 'yes' || value === 'Yes') {
                                    value = '✓ Yes';
                                  } else if (value === 'no' || value === 'No') {
                                    value = '✗ No';
                                  } else if (value === 'And') {
                                    value = '✓ Included';
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Remarks</h3>
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
                    <span>Download PDF</span>
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
