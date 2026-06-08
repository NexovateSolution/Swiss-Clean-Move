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

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentType = request.headers.get('content-type') || ''
    let rawData: any;
    let images: File[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const dataStr = formData.get('data') as string
      if (!dataStr) {
        return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
      }
      rawData = JSON.parse(dataStr)
      images = formData.getAll('images') as File[]
    } else {
      rawData = await request.json()
    }

    console.log('Creating client with data:', JSON.stringify(rawData, null, 2))

    // Ensure numeric values are correct
    const totalPrice = parseFloat(rawData.totalPrice) || 0
    const paidAmount = parseFloat(rawData.paidAmount || rawData.advancePayment) || 0
    const balance = totalPrice - paidAmount

    // Determine status
    let status = 'UNPAID'
    if (paidAmount > 0 && paidAmount < totalPrice) {
      status = 'PARTIAL'
    } else if (paidAmount >= totalPrice) {
      status = 'PAID'
    }

    // Prepare data for Prisma, ensuring types match schema.prisma
    const fromDate = rawData.fromDate ? new Date(rawData.fromDate) : new Date()
    const untilDate = rawData.untilDate ? new Date(rawData.untilDate) : new Date()

    if (isNaN(fromDate.getTime()) || isNaN(untilDate.getTime())) {
      return NextResponse.json({
        error: 'Invalid dates provided',
        details: `From: ${rawData.fromDate}, Until: ${rawData.untilDate}`
      }, { status: 400 })
    }

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

    // Process images if any
    const photoCreates = [];
    if (images.length > 0) {
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'clients')
      if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

      for (const image of images) {
        if (image instanceof Blob) {
          const bytes = await image.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
          const ext = image.name.split('.').pop() || 'png'
          const filename = `${uniqueSuffix}.${ext}`
          const filepath = join(uploadDir, filename)

          await writeFile(filepath, buffer)
          const url = `/uploads/clients/${filename}`
          
          photoCreates.push({
            filename,
            originalName: image.name,
            url,
            size: image.size,
            mimeType: image.type
          });
        }
      }
    }

    const client = await prisma.client.create({
      data: {
        ...prismaData,
        photos: photoCreates.length > 0 ? { create: photoCreates } : undefined
      },
      include: {
        payments: true,
        photos: true,
        invoices: true
      }
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error: any) {
    const fs = require('fs')
    const logPath = 'prisma_error.log'
    const errorMsg = `[${new Date().toISOString()}] Error: ${error.message}\nStack: ${error.stack}\nData: ${JSON.stringify(error.meta || {})}\n\n`
    fs.appendFileSync(logPath, errorMsg)

    console.error('Detailed error creating client:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 })
  }
}
