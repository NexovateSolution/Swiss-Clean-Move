'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
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
  Search,
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

export default function CalendarPage() {
  const t = useTranslations('admin.calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceType: '',
    address: '',
    startTime: '09:00',
    endTime: '12:00',
    date: new Date().toISOString().split('T')[0],
    status: 'scheduled',
    notes: ''
  })

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
      toast.error(t('errors.loadAppointments'))
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

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return t('status.scheduled')
      case 'in-progress':
        return t('status.inProgress')
      case 'completed':
        return t('status.completed')
      case 'cancelled':
        return t('status.cancelled')
      default:
        return status
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

  const resetNewAppointment = () => {
    setNewAppointment({
      title: '',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      serviceType: '',
      address: '',
      startTime: '09:00',
      endTime: '12:00',
      date: new Date().toISOString().split('T')[0],
      status: 'scheduled',
      notes: ''
    })
  }

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredMissing =
      !newAppointment.title.trim() ||
      !newAppointment.clientName.trim() ||
      !newAppointment.serviceType.trim() ||
      !newAppointment.address.trim() ||
      !newAppointment.date ||
      !newAppointment.startTime ||
      !newAppointment.endTime

    if (requiredMissing) {
      toast.error('Please fill in all required fields')
      return
    }

    const created: Appointment = {
      id: `${Date.now()}`,
      ...newAppointment,
      notes: newAppointment.notes?.trim() || undefined
    }

    setAppointments(prev => [...prev, created])
    toast.success('Appointment created')
    setShowAppointmentModal(false)
    resetNewAppointment()
  }

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
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('actions.newAppointment')}</span>
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
                  {t(`months.${currentDate.getMonth()}` as any)} {currentDate.getFullYear()}
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
                    {t(`viewModes.${mode}` as any)}
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
                  placeholder={t('search.placeholder')}
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
                <option value="all">{t('filters.allStatus')}</option>
                <option value="scheduled">{t('status.scheduled')}</option>
                <option value="in-progress">{t('status.inProgress')}</option>
                <option value="completed">{t('status.completed')}</option>
                <option value="cancelled">{t('status.cancelled')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {[
              t('days.sun'),
              t('days.mon'),
              t('days.tue'),
              t('days.wed'),
              t('days.thu'),
              t('days.fri'),
              t('days.sat')
            ].map((day) => (
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
                    <h3 className="text-2xl font-bold text-gray-900">{t('modal.title')}</h3>
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
                        {getStatusLabel(selectedAppointment.status)}
                      </span>
                      <span className="text-gray-500">{selectedAppointment.date}</span>
                    </div>

                    {/* Service Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">{t('modal.serviceDetails')}</h4>
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
                        <h4 className="font-medium text-gray-900 mb-3">{t('modal.clientInformation')}</h4>
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
                        <h4 className="font-medium text-gray-900 mb-2">{t('modal.notes')}</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>{t('actions.edit')}</span>
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                        <Trash2 className="w-4 h-4" />
                        <span>{t('actions.cancel')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Appointment Modal */}
        <AnimatePresence>
          {showAppointmentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowAppointmentModal(false)
                resetNewAppointment()
              }}
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
                    <h3 className="text-2xl font-bold text-gray-900">{t('actions.newAppointment')}</h3>
                    <button
                      onClick={() => {
                        setShowAppointmentModal(false)
                        resetNewAppointment()
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateAppointment} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                          value={newAppointment.title}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. Apartment Cleaning"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                        <input
                          value={newAppointment.serviceType}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, serviceType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. Apartment cleaning"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                        <input
                          value={newAppointment.clientName}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, clientName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Client name"
                          list="clientNames"
                        />
                        <datalist id="clientNames">
                          {clients.map((c) => (
                            <option key={c.id} value={`${c.firstName} ${c.lastName}`} />
                          ))}
                        </datalist>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <input
                          value={newAppointment.address}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Street, postal code, city"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start *</label>
                        <input
                          type="time"
                          value={newAppointment.startTime}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, startTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End *</label>
                        <input
                          type="time"
                          value={newAppointment.endTime}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, endTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          value={newAppointment.clientPhone}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newAppointment.clientEmail}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newAppointment.status}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, status: e.target.value as Appointment['status'] }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="scheduled">{t('status.scheduled')}</option>
                          <option value="in-progress">{t('status.inProgress')}</option>
                          <option value="completed">{t('status.completed')}</option>
                          <option value="cancelled">{t('status.cancelled')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={newAppointment.notes ?? ''}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Optional notes"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAppointmentModal(false)
                          resetNewAppointment()
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        {t('actions.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {t('actions.newAppointment')}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
