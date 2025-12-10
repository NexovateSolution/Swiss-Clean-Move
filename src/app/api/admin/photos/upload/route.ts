import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('photos') as File[];
    const clientId = formData.get('clientId') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const uploadedPhotos = [];

    for (const file of files) {
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `clients/${clientId}/${timestamp}_${originalName}`;

      // Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
      });

      // Create database record
      const photo = await prisma.photo.create({
        data: {
          filename: filename,
          originalName: file.name,
          url: blob.url,
          size: file.size,
          mimeType: file.type,
          clientId: clientId,
        },
      });

      uploadedPhotos.push(photo);
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      photos: uploadedPhotos,
    });
  } catch (error) {
    console.error('Error uploading photos:', error);
    return NextResponse.json(
      { error: 'Failed to upload photos' },
      { status: 500 }
    );
  }
}
