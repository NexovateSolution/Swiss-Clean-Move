import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET(request: Request) {
    try {
        // Check authentication (you can add proper auth check here)
        const quotes = await prisma.quoteSubmission.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch quotes' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        const updatedQuote = await prisma.quoteSubmission.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedQuote);
    } catch (error) {
        console.error('Error updating quote:', error);
        return NextResponse.json(
            { error: 'Failed to update quote' },
            { status: 500 }
        );
    }
}
