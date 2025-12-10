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
    const clientId = searchParams.get('clientId')

    if (clientId) {
      // Get payments for a specific client
      const payments = await prisma.payment.findMany({
        where: { clientId },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(payments)
    } else {
      // Get all payments
      const payments = await prisma.payment.findMany({
        include: {
          client: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(payments)
    }
  } catch (error: any) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { clientId, amount, method, notes } = body

    if (!clientId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Start a transaction to update both payment and client
    const result = await prisma.$transaction(async (tx) => {
      // Create the payment
      const payment = await tx.payment.create({
        data: {
          clientId,
          amount: parseFloat(amount),
          method: method || 'CASH',
          notes: notes || ''
        }
      })

      // Get current client data
      const client = await tx.client.findUnique({
        where: { id: clientId }
      })

      if (!client) {
        throw new Error('Client not found')
      }

      // Update client's paid amount and balance
      const newPaidAmount = (client.paidAmount || 0) + parseFloat(amount)
      const newBalance = (client.totalPrice || 0) - newPaidAmount
      
      // Determine new status
      let newStatus = 'UNPAID'
      if (newPaidAmount > 0 && newPaidAmount < client.totalPrice) {
        newStatus = 'PARTIAL'
      } else if (newPaidAmount >= client.totalPrice) {
        newStatus = 'PAID'
      }

      // Update the client
      const updatedClient = await tx.client.update({
        where: { id: clientId },
        data: {
          paidAmount: newPaidAmount,
          balance: newBalance,
          status: newStatus
        }
      })

      return { payment, client: updatedClient }
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    console.error('Error creating payment:', error)
    console.error('Error details:', error.message, error.stack)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 })
  }
}
