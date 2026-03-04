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
