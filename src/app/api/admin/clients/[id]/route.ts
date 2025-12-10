import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/db'
import { authenticateRequest } from '../../../../../../lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        payments: { orderBy: { createdAt: 'desc' } },
        photos: { orderBy: { createdAt: 'desc' } },
        invoices: { orderBy: { createdAt: 'desc' } }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const client = await prisma.client.update({
      where: { id: params.id },
      data: {
        ...data,
        balance,
        status,
        fromDate: data.fromDate ? new Date(data.fromDate) : undefined,
        untilDate: data.untilDate ? new Date(data.untilDate) : undefined
      },
      include: {
        payments: true,
        photos: true,
        invoices: true
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.client.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Client deleted successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
