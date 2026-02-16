import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET(request: Request) {
    try {
        // Check authentication (you can add proper auth check here)
        const contacts = await prisma.contactSubmission.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        const updatedContact = await prisma.contactSubmission.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedContact);
    } catch (error) {
        console.error('Error updating contact:', error);
        return NextResponse.json(
            { error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}
