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
    console.error('Error fetching submissions from database:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
        submissions: []
      },
      { status: 200 } // Return 200 to allow the frontend to gracefully read the error instead of blocking it
    )
  }
}
