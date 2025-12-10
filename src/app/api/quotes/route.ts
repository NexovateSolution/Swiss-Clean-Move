import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmailNotification, formatQuoteEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            serviceType,
            propertyType,
            rooms,
            area,
            preferredDate,
            urgency,
            additionalServices,
            message,
            agreement,
            newsletter,
        } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !serviceType) {
            console.error('Missing required fields:', { firstName, lastName, email, phone, serviceType });
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create quote submission
        const submission = await prisma.quoteSubmission.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                phone,
                service: serviceType,
                details: JSON.stringify({
                    address: address || '',
                    city: city || '',
                    postalCode: postalCode || '',
                    propertyType: propertyType || '',
                    rooms: rooms || null,
                    area: area || null,
                    preferredDate: preferredDate || null,
                    urgency: urgency || null,
                    additionalServices: additionalServices || [],
                    message: message || '',
                    newsletter: newsletter || false,
                }),
                status: 'NEW',
            },
        });

        // Send email notification to admin
        const emailHtml = formatQuoteEmail({
            name: `${firstName} ${lastName}`,
            email,
            phone,
            service: serviceType,
            details: submission.details
        });
        await sendEmailNotification({
            to: 'info@swisscleanmove.ch',
            subject: `New Quote Request: ${serviceType}`,
            html: emailHtml,
            text: `New quote request from ${firstName} ${lastName} (${email}) for ${serviceType}`
        });

        return NextResponse.json(
            { success: true, id: submission.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating quote submission:', error);
        return NextResponse.json(
            { error: 'Failed to submit quote request', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
