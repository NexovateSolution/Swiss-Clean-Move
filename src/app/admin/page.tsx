'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  TrendingUp, 
  TrendingDown, 
  Users,
  DollarSign,
  Calendar,
  Building,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Client {
  id: string
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
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'COMPLETED' | 'CANCELLED'
  payments: any[]
  photos: any[]
  invoices: any[]
  createdAt: string
}

interface AnalyticsData {
  clients: Client[]
  monthlyData: any[]
  serviceData: any[]
  statusData: { status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'COMPLETED' | 'CANCELLED' | 'UNKNOWN'; value: number; color: string }[]
  metrics: {
    totalClients: number
    totalRevenue: number
    totalPaid: number
    pendingAmount: number
    completionRate: string
    revenueGrowth: number
    clientGrowth: number
    averageProjectValue: number
  }
}

export default function AdminDashboard() {
  const t = useTranslations('admin.dashboard')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'monthly' | 'annual'>('monthly')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const currentYear = new Date().getFullYear()

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        timeRange,
        year: currentYear.toString(),
        month: selectedMonth.toString()
      })
      
      const response = await fetch(`/api/admin/analytics?${params}`)
      if (!response.ok) throw new Error(t('errors.fetchAnalytics'))
      
      const result = await response.json()
      if (result.success) {
        setAnalyticsData(result.data)
      } else {
        throw new Error(result.error || t('errors.fetchAnalytics'))
      }
    } catch (error) {
      toast.error(t('errors.fetchAnalyticsToast'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange, selectedMonth])

  // Use real analytics data or fallback to empty data
  const monthlyData = analyticsData?.monthlyData || []
  const serviceData = analyticsData?.serviceData || []
  const statusData = analyticsData?.statusData || []
  const metrics = analyticsData?.metrics || {
    totalClients: 0,
    totalRevenue: 0,
    totalPaid: 0,
    pendingAmount: 0,
    completionRate: '0',
    revenueGrowth: 0,
    clientGrowth: 0,
    averageProjectValue: 0
  }

  const getPaymentStatusLabel = (
    status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'COMPLETED' | 'CANCELLED' | 'UNKNOWN'
  ) => {
    switch (status) {
      case 'PAID':
        return t('charts.paymentStatus.status.paid')
      case 'PARTIAL':
        return t('charts.paymentStatus.status.partial')
      case 'UNPAID':
        return t('charts.paymentStatus.status.unpaid')
      case 'COMPLETED':
        return t('charts.paymentStatus.status.completed')
      case 'CANCELLED':
        return t('charts.paymentStatus.status.cancelled')
      default:
        return t('charts.paymentStatus.status.unknown')
    }
  }

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
            <p className="text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'monthly' | 'annual')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="monthly">{t('filters.monthlyView')}</option>
              <option value="annual">{t('filters.annualView')}</option>
            </select>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('kpi.totalRevenue')}</p>
                <p className="text-2xl font-bold text-gray-900">CHF {metrics.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {metrics.revenueGrowth >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.revenueGrowth >= 0 ? '+' : ''}{metrics.revenueGrowth}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{t('kpi.vsLastMonth')}</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('kpi.totalClients')}</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalClients}</p>
                <div className="flex items-center mt-2">
                  {metrics.clientGrowth >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metrics.clientGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.clientGrowth >= 0 ? '+' : ''}{metrics.clientGrowth}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{t('kpi.vsLastMonth')}</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('kpi.completionRate')}</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.completionRate}%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{t('kpi.excellent')}</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('kpi.pendingAmount')}</p>
                <p className="text-2xl font-bold text-gray-900">CHF {metrics.pendingAmount.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600 font-medium">{t('kpi.needsAttention')}</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revenue Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('charts.revenueTrend.title')}</h3>
                <p className="text-sm text-gray-600">{t('charts.revenueTrend.subtitle')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`CHF ${value}`, t('charts.revenueTrend.revenue')]} />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('charts.paymentStatus.title')}</h3>
                <p className="text-sm text-gray-600">{t('charts.paymentStatus.subtitle')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="45%"
                    nameKey="status"
                    labelLine={true}
                    label={({ status, percent }: { status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'COMPLETED' | 'CANCELLED' | 'UNKNOWN'; percent: number }) =>
                      percent > 0 ? `${getPaymentStatusLabel(status)}: ${(percent * 100).toFixed(0)}%` : ''
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, t('charts.paymentStatus.clients')]} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => {
                      if (typeof value !== 'string') return value
                      return getPaymentStatusLabel(value as any)
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Service Analytics and Client Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('sections.serviceDistribution.title')}</h3>
                <p className="text-sm text-gray-600">{t('sections.serviceDistribution.subtitle')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="space-y-4">
              {serviceData.slice(0, 5).map((service, index) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-blue-${(index + 1) * 100}`}></div>
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{t('sections.serviceDistribution.clientsCount', { count: service.value })}</span>
                    <span className="text-xs text-gray-500">({service.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('sections.clientGrowth.title')}</h3>
                <p className="text-sm text-gray-600">{t('sections.clientGrowth.subtitle')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, t('sections.clientGrowth.newClients')]} />
                  <Bar dataKey="clients" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Monthly/Annual Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {timeRange === 'monthly' ? t('report.monthly') : t('report.annual')} {t('report.performanceReport')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('report.subtitle')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">{t('report.revenueGrowth')}</p>
                  <p className="text-2xl font-bold text-blue-900">{metrics.revenueGrowth >= 0 ? '+' : ''}{metrics.revenueGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">{t('report.clientGrowth')}</p>
                  <p className="text-2xl font-bold text-green-900">{metrics.clientGrowth >= 0 ? '+' : ''}{metrics.clientGrowth}%</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">{t('report.avgProjectValue')}</p>
                  <p className="text-2xl font-bold text-purple-900">CHF {metrics.averageProjectValue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Toaster position="top-right" />
    </AdminLayout>
  )
}
