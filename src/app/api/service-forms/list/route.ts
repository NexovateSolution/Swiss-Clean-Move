import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const submissions = await prisma.serviceFormSubmission.findMany({
      orderBy: {
        submissionDate: 'desc'
      }
    })

    // Safely serialize to avoid circular or unexpected type crashes in NextResponse.json
    const safeSubmissions = JSON.parse(JSON.stringify(submissions));

    return NextResponse.json({
      success: true,
      submissions: safeSubmissions,
      total: safeSubmissions.length
    })

  } catch (error) {
    console.error('Error fetching submissions from database. This usually means the Prisma Client needs to be regenerated (npx prisma generate) after stopping the dev server.', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Try stopping the dev server and running "npx prisma generate"'
      },
      { status: 500 }
    )
  }
}
