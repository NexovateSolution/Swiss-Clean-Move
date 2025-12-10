import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { clientId, amount, dueDate } = await request.json()

    // Generate invoice number
    const invoiceCount = await prisma.invoice.count()
    const invoiceNumber = `INV-${String(invoiceCount + 1).padStart(4, '0')}`

    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        invoiceNumber,
        amount,
        dueDate: new Date(dueDate),
        status: 'PENDING'
      },
      include: {
        client: true
      }
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')

    const where = clientId ? { clientId } : {}

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        client: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
