'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

interface Appointment {
  id: string
  title: string
  clientName: string
  clientPhone: string
  clientEmail: string
  serviceType: string
  address: string
  startTime: string
  endTime: string
  date: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes?: string
}

interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  serviceType: string
  fromDate: string
  untilDate: string
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchAppointments()
    fetchClients()
  }, [])

  const fetchAppointments = async () => {
    try {
      // Mock data - in real app, fetch from API
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          title: 'Apartment Cleaning',
          clientName: 'Steinegger Michel',
          clientPhone: '079 586 88 66',
          clientEmail: 'michel.steinegger@hotmail.ch',
          serviceType: 'Apartment cleaning',
          address: 'Hauptstrasse 91, 2552 Orpund',
          startTime: '09:00',
          endTime: '12:00',
          date: '2025-11-27',
          status: 'scheduled',
          notes: 'Deep cleaning required for kitchen and bathrooms'
        }
      ]
      setAppointments(mockAppointments)
    } catch (error) {
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data.clients || [])
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true })
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false })
    }
    
    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === dateStr)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'completed': return 'bg-green-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-1">Manage cleaning appointments and schedules</p>
          </div>
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Calendar Navigation */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                {['month', 'week', 'day'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      viewMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {DAYS.map((day) => (
              <div key={day} className="p-4 text-center font-medium text-gray-700 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7">
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day.date)
              const isToday = day.date.toDateString() === new Date().toDateString()
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b border-gray-100 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                  } ${isToday ? 'bg-blue-50' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    !day.isCurrentMonth ? 'text-gray-400' : 
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayAppointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedAppointment(appointment)}
                        className={`p-2 rounded text-xs text-white cursor-pointer ${getStatusColor(appointment.status)}`}
                      >
                        <div className="font-medium truncate">{appointment.startTime} - {appointment.endTime}</div>
                        <div className="truncate opacity-90">{appointment.clientName}</div>
                        <div className="truncate opacity-75">{appointment.serviceType}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Appointment Details Modal */}
        <AnimatePresence>
          {selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAppointment(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Appointment Details</h3>
                    <button
                      onClick={() => setSelectedAppointment(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedAppointment.status)}`}>
                        {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                      </span>
                      <span className="text-gray-500">{selectedAppointment.date}</span>
                    </div>

                    {/* Service Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Service Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.serviceType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.startTime} - {selectedAppointment.endTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.address}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Client Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.clientName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.clientPhone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{selectedAppointment.clientEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedAppointment.notes && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                        <Trash2 className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
