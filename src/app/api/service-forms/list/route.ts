import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const submissions = await prisma.serviceFormSubmission.findMany({
      orderBy: {
        submissionDate: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length
    })

  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
