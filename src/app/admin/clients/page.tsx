'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Camera,
  Download,
  Users,
  Building,
  DollarSign,
  MoreHorizontal,
  Settings
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'
import ClientModal from '@/components/admin/ClientModal'
import PaymentModal from '@/components/admin/PaymentModal'
import DeleteModal from '@/components/admin/DeleteModal'
import PhotoModal from '@/components/admin/PhotoModal'

interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  location: string
  serviceType: string
  buildingType: string
  squareMeters: number
  fromDate: string
  untilDate: string
  totalPrice: number
  paidAmount: number
  balance: number
  status: string
  createdAt: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  
  // Modal states
  const [editModal, setEditModal] = useState<{ open: boolean; client?: Client }>({ open: false })
  const [paymentModal, setPaymentModal] = useState<{ open: boolean; client?: Client }>({ open: false })
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; client?: Client }>({ open: false })
  const [photoModal, setPhotoModal] = useState<{ open: boolean; client?: Client }>({ open: false })
  const [languageModal, setLanguageModal] = useState<{ open: boolean; client?: Client }>({ open: false })
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search: searchTerm,
        status: statusFilter !== 'all' ? statusFilter : '',
        service: serviceFilter !== 'all' ? serviceFilter : ''
      })
      
      const response = await fetch(`/api/admin/clients?${params}`)
      if (response.ok) {
        const data = await response.json()
        setClients(data.clients || [])
        setTotalPages(data.totalPages || 1)
      } else {
        toast.error('Failed to fetch clients')
      }
    } catch (error) {
      toast.error('Error fetching clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [currentPage, searchTerm, statusFilter, serviceFilter])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showExportMenu && !target.closest('.export-dropdown')) {
        setShowExportMenu(false)
      }
      if (activeActionMenu && !target.closest('.action-dropdown')) {
        setActiveActionMenu(null)
      }
    }

    if (showExportMenu || activeActionMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showExportMenu, activeActionMenu])

  const handleEdit = (client: Client) => {
    setEditModal({ open: true, client })
  }

  const handlePay = (client: Client) => {
    setPaymentModal({ open: true, client })
  }

  const handleDelete = (client: Client) => {
    setDeleteModal({ open: true, client })
  }

  const handleInvoice = (client: Client) => {
    setLanguageModal({ open: true, client })
  }

  const handlePhoto = (client: Client) => {
    setPhotoModal({ open: true, client })
  }

  const generatePDFInvoice = async (client: Client, language: 'en' | 'de' | 'fr') => {
    try {
      // Generate and display invoice
      const response = await fetch('/api/admin/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: client.id,
          language: language
        })
      })

      if (response.ok) {
        const html = await response.text()
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(html)
          printWindow.document.close()
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print()
            }, 500)
          }
        }
        
        // Send invoice via email
        if (client.email) {
          toast.loading('Sending invoice to client...')
          const emailResponse = await fetch('/api/admin/send-invoice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clientId: client.id,
              language: language
            })
          })

          if (emailResponse.ok) {
            toast.dismiss()
            toast.success('Invoice opened and sent to client via email!')
          } else {
            toast.dismiss()
            toast.success('Invoice opened for printing!')
            toast.error('Failed to send email to client', { duration: 3000 })
          }
        } else {
          toast.success('Invoice opened for printing!')
          toast('Client has no email address', { icon: '⚠️' })
        }
      } else {
        toast.error('Failed to generate invoice')
      }
    } catch (error) {
      toast.error('Error generating invoice')
    }
    setLanguageModal({ open: false })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800'
      case 'PARTIAL': return 'bg-yellow-100 text-yellow-800'
      case 'UNPAID': return 'bg-red-100 text-red-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportToExcel = () => {
    try {
      if (filteredClients.length === 0) {
        toast.error('No clients to export')
        return
      }

      const headers = [
        'Name',
        'Email',
        'Phone',
        'Address',
        'Location',
        'Service Type',
        'Building Type',
        'Square Meters',
        'From Date',
        'Until Date',
        'Total Price (CHF)',
        'Paid Amount (CHF)',
        'Balance (CHF)',
        'Status',
        'Created Date'
      ]

      const excelData = filteredClients.map(client => [
        `${client.firstName} ${client.lastName}`,
        client.email || '',
        client.phone || '',
        client.address || '',
        client.location || '',
        client.serviceType || '',
        client.buildingType || '',
        client.squareMeters || 0,
        client.fromDate ? new Date(client.fromDate).toLocaleDateString() : '',
        client.untilDate ? new Date(client.untilDate).toLocaleDateString() : '',
        client.totalPrice || 0,
        client.paidAmount || 0,
        client.balance || 0,
        client.status || '',
        client.createdAt ? new Date(client.createdAt).toLocaleDateString() : ''
      ])

      // Create Excel-compatible CSV with proper formatting
      const csvRows = [
        headers.map(h => `"${h}"`).join(','),
        ...excelData.map(row => 
          row.map((cell, index) => {
            // Format numbers properly for Excel
            if (index >= 10 && index <= 12) { // Price columns
              return typeof cell === 'number' ? cell.toString() : `"${cell}"`
            }
            // Escape quotes and wrap in quotes for text
            return `"${String(cell).replace(/"/g, '""')}"`
          }).join(',')
        )
      ]
      
      const csvContent = csvRows.join('\r\n')
      
      // Add BOM for UTF-8 Excel compatibility
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
      })
      
      // Create download link
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.href = url
      link.download = `clients-${new Date().toISOString().split('T')[0]}.csv`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100)
      
      toast.success(`Excel file exported successfully! (${filteredClients.length} clients)`)
    } catch (error) {
      console.error('Excel Export Error:', error)
      toast.error('Failed to export Excel file')
    }
  }

  const exportToPDF = () => {
    try {
      if (filteredClients.length === 0) {
        toast.error('No clients to export')
        return
      }

      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        toast.error('Please allow popups to export PDF')
        return
      }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Clients Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
          .report-title { font-size: 18px; margin: 10px 0; }
          .report-date { color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .status-paid { color: #059669; }
          .status-partial { color: #d97706; }
          .status-unpaid { color: #dc2626; }
          .status-completed { color: #2563eb; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">SwissClean Move</div>
          <div class="report-title">Clients Report</div>
          <div class="report-date">Generated on ${new Date().toLocaleDateString()}</div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Schedule</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredClients.map(client => `
              <tr>
                <td>
                  <strong>${client.firstName} ${client.lastName}</strong><br>
                  <small>${client.location}</small>
                </td>
                <td>
                  ${client.phone}<br>
                  <small>${client.email}</small>
                </td>
                <td>
                  ${client.serviceType}<br>
                  <small>${client.buildingType} • ${client.squareMeters}m²</small>
                </td>
                <td>
                  ${new Date(client.fromDate).toLocaleDateString()}<br>
                  <small>to ${new Date(client.untilDate).toLocaleDateString()}</small>
                </td>
                <td>
                  CHF ${client.totalPrice}<br>
                  <small>Paid: CHF ${client.paidAmount} • Balance: CHF ${client.balance}</small>
                </td>
                <td>
                  <span class="status-${client.status.toLowerCase()}">${client.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer">
          <p>Total Clients: ${filteredClients.length} | Total Revenue: CHF ${filteredClients.reduce((sum, c) => sum + c.totalPrice, 0).toLocaleString()}</p>
          <p>SwissClean Move - Professional Cleaning Services</p>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `

      printWindow.document.write(html)
      printWindow.document.close()
      toast.success(`PDF report opened for printing! (${filteredClients.length} clients)`)
    } catch (error) {
      console.error('PDF Export Error:', error)
      toast.error('Failed to export PDF')
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const stats = {
    total: clients.length,
    paid: clients.filter(c => c.status === 'PAID').length,
    pending: clients.filter(c => c.status === 'UNPAID' || c.status === 'PARTIAL').length,
    revenue: clients.reduce((sum, c) => sum + c.totalPrice, 0)
  }

  return (
    <AdminLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage all your cleaning service clients</p>
          </div>
          <button
            onClick={() => setEditModal({ open: true })}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>


        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients by name, email, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="PAID">Paid</option>
                <option value="PARTIAL">Partial</option>
                <option value="UNPAID">Unpaid</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Services</option>
                <option value="Maintenance cleaning">Maintenance cleaning</option>
                <option value="Catering cleaning">Catering cleaning</option>
                <option value="House cleaning">House cleaning</option>
                <option value="Apartment cleaning">Apartment cleaning</option>
                <option value="Staircase cleaning">Staircase cleaning</option>
                <option value="Office Cleaning">Office Cleaning</option>
                <option value="Window cleaning">Window cleaning</option>
                <option value="Relocation">Relocation</option>
                <option value="Moving during cleaning">Moving during cleaning</option>
              </select>

              <div className="relative export-dropdown">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowExportMenu(!showExportMenu)
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={(e) => { 
                          e.stopPropagation()
                          exportToExcel(); 
                          setShowExportMenu(false); 
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center space-x-2">
                          <span>📊</span>
                          <span>Export as Excel</span>
                        </span>
                      </button>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation()
                          exportToPDF(); 
                          setShowExportMenu(false); 
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center space-x-2">
                          <span>📋</span>
                          <span>Export as PDF</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No clients found
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {client.firstName[0]}{client.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {client.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {client.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {client.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.serviceType}</div>
                        <div className="text-sm text-gray-500">{client.buildingType} • {client.squareMeters}m²</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(client.fromDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          to {new Date(client.untilDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">CHF {client.totalPrice}</div>
                        <div className="text-sm text-gray-500">
                          Paid: CHF {client.paidAmount} • Balance: CHF {client.balance}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="relative action-dropdown">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveActionMenu(activeActionMenu === client.id ? null : client.id)
                            }}
                            className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors text-xs font-medium"
                            title="Client actions"
                          >
                            <Settings className="w-3 h-3" />
                            <span>Actions</span>
                          </button>
                          
                          {activeActionMenu === client.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200">
                              <div className="py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(client)
                                    setActiveActionMenu(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <Edit className="w-4 h-4 mr-3 text-blue-500" />
                                  Edit Client
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePay(client)
                                    setActiveActionMenu(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <CreditCard className="w-4 h-4 mr-3 text-green-500" />
                                  Add Payment
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleInvoice(client)
                                    setActiveActionMenu(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <FileText className="w-4 h-4 mr-3 text-purple-500" />
                                  Create Invoice
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePhoto(client)
                                    setActiveActionMenu(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <Camera className="w-4 h-4 mr-3 text-yellow-500" />
                                  Add Photos
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(client)
                                    setActiveActionMenu(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                                  Delete Client
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ClientModal
        isOpen={editModal.open}
        onClose={() => setEditModal({ open: false })}
        client={editModal.client}
        onSuccess={fetchClients}
      />
      
      <PaymentModal
        isOpen={paymentModal.open}
        onClose={() => setPaymentModal({ open: false })}
        client={paymentModal.client}
        onSuccess={fetchClients}
      />
      
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        client={deleteModal.client}
        onSuccess={fetchClients}
      />
      
      <PhotoModal
        isOpen={photoModal.open}
        onClose={() => setPhotoModal({ open: false })}
        client={photoModal.client}
        onSuccess={fetchClients}
      />

      {/* Language Selection Modal */}
      {languageModal.open && languageModal.client && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Invoice Language</h3>
              <p className="text-gray-600">Choose the language for the invoice</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => generatePDFInvoice(languageModal.client!, 'de')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>🇩🇪</span>
                <span>German</span>
              </button>
              
              <button
                onClick={() => generatePDFInvoice(languageModal.client!, 'fr')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>🇫🇷</span>
                <span>French</span>
              </button>
              
              <button
                onClick={() => generatePDFInvoice(languageModal.client!, 'en')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
            
            <button
              onClick={() => setLanguageModal({ open: false })}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </AdminLayout>
  )
}
