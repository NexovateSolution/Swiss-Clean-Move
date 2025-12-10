import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const where = search ? {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          payments: true,
          photos: true,
          invoices: true
        }
      }),
      prisma.client.count({ where })
    ])

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Calculate balance
    const balance = data.totalPrice - (data.paidAmount || 0)
    
    // Determine status
    let status = 'UNPAID'
    if (data.paidAmount > 0 && data.paidAmount < data.totalPrice) {
      status = 'PARTIAL'
    } else if (data.paidAmount >= data.totalPrice) {
      status = 'PAID'
    }

    const client = await prisma.client.create({
      data: {
        ...data,
        balance,
        status,
        fromDate: new Date(data.fromDate),
        untilDate: new Date(data.untilDate)
      },
      include: {
        payments: true,
        photos: true,
        invoices: true
      }
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
