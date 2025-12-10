import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || 'monthly'
    const selectedYear = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const selectedMonth = parseInt(searchParams.get('month') || new Date().getMonth().toString())

    // Fetch all clients with their data
    const clients = await prisma.client.findMany({
      include: {
        payments: true,
        photos: true,
        invoices: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate analytics data based on time range
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    // Monthly data based on selected year and time range
    const monthlyData = []
    
    if (timeRange === 'monthly') {
      // Show monthly data for selected year
      for (let month = 0; month < 12; month++) {
        const monthClients = clients.filter(client => {
          const clientDate = new Date(client.createdAt)
          return clientDate.getMonth() === month && clientDate.getFullYear() === selectedYear
        })
        
        const monthRevenue = monthClients.reduce((sum: number, client: any) => sum + (client.totalPrice || 0), 0)
        const monthPaid = monthClients.reduce((sum: number, client: any) => sum + (client.paidAmount || 0), 0)
        const monthPending = monthRevenue - monthPaid

        monthlyData.push({
          month: new Date(selectedYear, month).toLocaleDateString('en', { month: 'short' }),
          revenue: monthRevenue,
          clients: monthClients.length,
          paid: monthPaid,
          pending: monthPending
        })
      }
    } else {
      // Show annual data for last 5 years
      const currentYear = new Date().getFullYear()
      for (let yearOffset = 4; yearOffset >= 0; yearOffset--) {
        const year = currentYear - yearOffset
        const yearClients = clients.filter(client => {
          const clientDate = new Date(client.createdAt)
          return clientDate.getFullYear() === year
        })
        
        const yearRevenue = yearClients.reduce((sum: number, client: any) => sum + (client.totalPrice || 0), 0)
        const yearPaid = yearClients.reduce((sum: number, client: any) => sum + (client.paidAmount || 0), 0)
        const yearPending = yearRevenue - yearPaid

        monthlyData.push({
          month: year.toString(),
          revenue: yearRevenue,
          clients: yearClients.length,
          paid: yearPaid,
          pending: yearPending
        })
      }
    }

    // Service type distribution
    const serviceTypes = clients.reduce((acc: Record<string, number>, client: any) => {
      const service = client.serviceType || 'Unknown'
      acc[service] = (acc[service] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const serviceData = Object.entries(serviceTypes).map(([name, value]) => ({
      name,
      value,
      percentage: clients.length > 0 ? ((value / clients.length) * 100).toFixed(1) : '0'
    }))

    // Status distribution
    const statusCounts = clients.reduce((acc: Record<string, number>, client: any) => {
      const status = client.status || 'UNKNOWN'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const statusData = [
      { name: 'Paid', value: statusCounts.PAID || 0, color: '#10B981' },
      { name: 'Partial', value: statusCounts.PARTIAL || 0, color: '#F59E0B' },
      { name: 'Unpaid', value: statusCounts.UNPAID || 0, color: '#EF4444' },
      { name: 'Completed', value: statusCounts.COMPLETED || 0, color: '#3B82F6' },
      { name: 'Cancelled', value: statusCounts.CANCELLED || 0, color: '#6B7280' }
    ]

    // Calculate key metrics
    const totalClients = clients.length
    const totalRevenue = clients.reduce((sum: number, client: any) => sum + (client.totalPrice || 0), 0)
    const totalPaid = clients.reduce((sum: number, client: any) => sum + (client.paidAmount || 0), 0)
    const pendingAmount = totalRevenue - totalPaid
    const completionRate = totalClients > 0 
      ? ((clients.filter((c: any) => c.status === 'COMPLETED' || c.status === 'PAID').length / totalClients) * 100).toFixed(1)
      : '0'

    // Calculate growth (compare with previous month)
    const currentMonthClients = clients.filter((client: any) => {
      const clientDate = new Date(client.createdAt)
      return clientDate.getMonth() === currentMonth && clientDate.getFullYear() === currentYear
    })

    const previousMonthClients = clients.filter((client: any) => {
      const clientDate = new Date(client.createdAt)
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
      return clientDate.getMonth() === prevMonth && clientDate.getFullYear() === prevYear
    })

    const currentMonthRevenue = currentMonthClients.reduce((sum: number, client: any) => sum + (client.totalPrice || 0), 0)
    const previousMonthRevenue = previousMonthClients.reduce((sum: number, client: any) => sum + (client.totalPrice || 0), 0)

    const revenueGrowth = previousMonthRevenue > 0 
      ? (((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1)
      : '0'

    const clientGrowth = previousMonthClients.length > 0
      ? (((currentMonthClients.length - previousMonthClients.length) / previousMonthClients.length) * 100).toFixed(1)
      : '0'

    // Return analytics data
    return NextResponse.json({
      success: true,
      data: {
        clients,
        monthlyData,
        serviceData,
        statusData,
        metrics: {
          totalClients,
          totalRevenue,
          totalPaid,
          pendingAmount,
          completionRate,
          revenueGrowth: parseFloat(revenueGrowth),
          clientGrowth: parseFloat(clientGrowth),
          averageProjectValue: totalClients > 0 ? Math.round(totalRevenue / totalClients) : 0
        }
      }
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
