import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/db'
import { PRICING_RULES } from '@/lib/pricingRules'

/**
 * GET /api/service-forms/[id]/quote
 * Retrieve the quote data for a specific submission
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const submission = await prisma.serviceFormSubmission.findUnique({
            where: { id: params.id }
        })

        if (!submission) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
        }

        const data = submission.data as any
        const quoteResult = data?.quoteResult || null

        return NextResponse.json({
            success: true,
            submissionId: submission.id,
            serviceName: submission.serviceName,
            quoteResult
        })
    } catch (error) {
        console.error('Error fetching quote:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

/**
 * PATCH /api/service-forms/[id]/quote
 * Admin override: update line items, recalculate totals, save
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { lineItems, adminNotes } = body

        if (!lineItems || !Array.isArray(lineItems)) {
            return NextResponse.json({ error: 'lineItems array is required' }, { status: 400 })
        }

        const submission = await prisma.serviceFormSubmission.findUnique({
            where: { id: params.id }
        })

        if (!submission) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
        }

        const existingData = (submission.data as any) || {}
        const oldQuote = existingData.quoteResult || {}

        // Recalculate totals from the admin-edited line items
        const totalPrice = lineItems.reduce((sum: number, item: any) => sum + (Number(item.price) || 0), 0)

        const updatedQuoteResult = {
            ...oldQuote,
            lineItems,
            totalPrice,
            adminOverride: true,
            adminOverrideDate: new Date().toISOString(),
            adminNotes: adminNotes || oldQuote.adminNotes || ''
        }

        const updatedData = {
            ...existingData,
            quoteResult: updatedQuoteResult
        }

        await prisma.serviceFormSubmission.update({
            where: { id: params.id },
            data: { data: updatedData }
        })

        return NextResponse.json({
            success: true,
            quoteResult: updatedQuoteResult
        })
    } catch (error) {
        console.error('Error updating quote:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
