import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
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

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'clients', clientId);
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadedPhotos = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}_${originalName}`;
      const filepath = join(uploadsDir, filename);

      // Save file
      await writeFile(filepath, buffer);

      // Create database record
      const photo = await prisma.photo.create({
        data: {
          filename: filename,
          originalName: file.name,
          url: `/uploads/clients/${clientId}/${filename}`,
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
