import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { sendEmailNotification, formatContactEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create contact submission
        const submission = await prisma.contactSubmission.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject,
                message,
                status: 'NEW',
            },
        });

        // Send email notification to admin
        const emailHtml = formatContactEmail({ name, email, phone, subject, message });
        await sendEmailNotification({
            to: 'info@swisscleanmove.ch',
            subject: `New Contact Form: ${subject}`,
            html: emailHtml,
            text: `New contact form submission from ${name} (${email})\n\nSubject: ${subject}\n\nMessage: ${message}`
        });

        return NextResponse.json(
            { success: true, id: submission.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating contact submission:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
