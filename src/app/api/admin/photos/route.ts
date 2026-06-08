import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const clientId = formData.get('clientId') as string

    if (!file || !clientId) {
      return NextResponse.json({ error: 'File and clientId are required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${Math.round(Math.random() * 1E9)}.${extension}`

    let url: string
    let savedFilename: string

    const isVercel = process.env.VERCEL === '1'

    if (isVercel && process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: use Vercel Blob
      const { put } = await import('@vercel/blob')
      const blobPath = `clients/${clientId}/${uniqueFilename}`
      const blob = await put(blobPath, file, {
        access: 'public',
        addRandomSuffix: false,
      })
      url = blob.url
      savedFilename = blobPath
    } else {
      // Local / dev: save to public/uploads/clients
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'clients', clientId)
      if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filepath = join(uploadDir, uniqueFilename)
      await writeFile(filepath, buffer)

      url = `/uploads/clients/${clientId}/${uniqueFilename}`
      savedFilename = uniqueFilename
    }

    // Save to database
    const photo = await prisma.photo.create({
      data: {
        clientId,
        filename: savedFilename,
        originalName: file.name,
        url,
        size: file.size,
        mimeType: file.type
      }
    })

    return NextResponse.json(photo, { status: 201 })
  } catch (error: any) {
    console.error('Error uploading photo:', error?.message || error)
    return NextResponse.json({ error: 'Internal server error', details: error?.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get('id')

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 })
    }

    await prisma.photo.delete({
      where: { id: photoId }
    })

    return NextResponse.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
