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

    const rawData = await request.json()
    
    // Ensure numeric values are correct
    const totalPrice = parseFloat(rawData.totalPrice) || 0
    const paidAmount = parseFloat(rawData.paidAmount || rawData.advancePayment) || 0
    const balance = totalPrice - paidAmount

    // Determine status
    let status = 'UNPAID'
    if (paidAmount > 0 && paidAmount < totalPrice) {
      status = 'PARTIAL'
    } else if (paidAmount > 0 && paidAmount >= totalPrice) {
      status = 'PAID'
    }

    const fromDate = rawData.fromDate ? new Date(rawData.fromDate) : undefined
    const untilDate = rawData.untilDate ? new Date(rawData.untilDate) : undefined

    const prismaData = {
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      phone: rawData.phone,
      address: rawData.address,
      postalCode: rawData.postalCode,
      location: rawData.location,
      squareMeters: parseInt(rawData.squareMeters) || 0,
      serviceType: rawData.serviceType,
      buildingType: rawData.buildingType,
      fromDate,
      untilDate,
      totalPrice,
      paidAmount,
      balance,
      status,
      prefix: rawData.prefix,
      numberOfRooms: rawData.numberOfRooms?.toString() || '',
      floor: rawData.floor,
      elevator: rawData.elevator,
      remarks1: rawData.remarks1,
      remarks2: rawData.remarks2,
      remarks3: rawData.remarks3,
      deploymentFrequency: rawData.deploymentFrequency,
      data: rawData.data ? rawData.data : undefined
    }

    const client = await prisma.client.update({
      where: { id: params.id },
      data: prismaData,
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
