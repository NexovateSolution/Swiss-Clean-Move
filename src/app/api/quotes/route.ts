import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../../lib/db';
import { sendEmailNotification, formatQuoteEmail } from '@/lib/email';
import { authenticateRequest } from '../../../../lib/auth';

export async function POST(request: Request) {
    try {
        let body: any;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'Malformed JSON payload' },
                { status: 400 }
            );
        }

        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return NextResponse.json(
                { success: false, error: 'Invalid payload structure' },
                { status: 400 }
            );
        }

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
            startDate,
            finishDate,
            urgency,
            additionalServices,
            message,
            agreement,
            newsletter,
        } = body;

        const validationErrors: string[] = [];

        // 1. Customer Names
        const cleanFirstName = String(firstName || '').trim();
        const cleanLastName = String(lastName || '').trim();
        if (!cleanFirstName || cleanFirstName.length > 100) {
            validationErrors.push('Please provide a valid first name (max 100 characters)');
        }
        if (!cleanLastName || cleanLastName.length > 100) {
            validationErrors.push('Please provide a valid last name (max 100 characters)');
        }

        // 2. Email
        const cleanEmail = String(email || '').trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!cleanEmail || cleanEmail.length > 120 || !emailRegex.test(cleanEmail)) {
            validationErrors.push('Please provide a valid email address');
        }

        // 3. Phone
        const cleanPhone = String(phone || '').trim();
        const digitsOnly = cleanPhone.replace(/\D/g, '');
        const phoneValidChars = /^[\d\s+\-()./]{6,40}$/;
        if (!cleanPhone || digitsOnly.length < 6 || digitsOnly.length > 20 || !phoneValidChars.test(cleanPhone)) {
            validationErrors.push('Please provide a valid telephone number (minimum 6 digits)');
        }

        // 4. Service Selection
        const cleanServiceType = String(serviceType || '').trim();
        if (!cleanServiceType || cleanServiceType.length > 100) {
            validationErrors.push('Please select a valid service type');
        }

        // 5. Consent Enforcement (Client-supplied isAdmin flag is strictly ignored)
        // Only verified users with the actual privileged 'ADMIN' role in the database may bypass consent
        const authUser = await authenticateRequest(request as unknown as NextRequest).catch(() => null);
        const isServerAuthenticatedAdmin = Boolean(authUser && authUser.role === 'ADMIN');
        const termsAccepted = agreement === true || agreement === 'true';

        if (!isServerAuthenticatedAdmin && !termsAccepted) {
            validationErrors.push('Please confirm acceptance of privacy terms and conditions');
        }

        // 6. Optional text fields length checks
        if (address && String(address).length > 250) {
            validationErrors.push('Address exceeds maximum length of 250 characters');
        }
        if (city && String(city).length > 200) {
            validationErrors.push('City exceeds maximum length of 200 characters');
        }
        if (message && String(message).length > 3000) {
            validationErrors.push('Message exceeds maximum length of 3000 characters');
        }

        if (validationErrors.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Validation failed', details: validationErrors },
                { status: 400 }
            );
        }

        // 7. Database Persistence
        let dbPersisted = false;
        let submissionId: string | null = null;
        let dbErrorMessage: string | null = null;

        try {
            const submission = await prisma.quoteSubmission.create({
                data: {
                    name: `${cleanFirstName} ${cleanLastName}`.trim(),
                    email: cleanEmail,
                    phone: cleanPhone,
                    service: cleanServiceType,
                    details: JSON.stringify({
                        address: address || '',
                        city: city || '',
                        postalCode: postalCode || '',
                        propertyType: propertyType || '',
                        rooms: rooms || null,
                        area: area || null,
                        preferredDate: preferredDate || null,
                        startDate: startDate || null,
                        finishDate: finishDate || null,
                        urgency: urgency || null,
                        additionalServices: Array.isArray(additionalServices) ? additionalServices : [],
                        message: message || '',
                        newsletter: newsletter || false,
                    }),
                    status: 'NEW',
                },
            });
            dbPersisted = true;
            submissionId = submission.id;
        } catch (dbErr: any) {
            dbErrorMessage = dbErr instanceof Error ? dbErr.message : String(dbErr);
            console.error('Database persistence error in quote submission:', dbErrorMessage);
        }

        // 8. Admin Email Notification
        let emailHtml = formatQuoteEmail({
            name: `${cleanFirstName} ${cleanLastName}`.trim(),
            email: cleanEmail,
            phone: cleanPhone,
            service: cleanServiceType,
            details: {
                address,
                city,
                postalCode,
                propertyType,
                rooms,
                area,
                preferredDate,
                urgency,
                message
            }
        });

        if (!dbPersisted) {
            emailHtml = `<div style="background: #fff3cd; color: #856404; padding: 12px; margin-bottom: 20px; border: 1px solid #ffeeba;">
                <strong>⚠️ DATABASE WARNING:</strong> This quote submission could not be saved to the database (${dbErrorMessage || 'Database error'}). All customer data is preserved in this email.
            </div>` + emailHtml;
        }

        const emailResult = await sendEmailNotification({
            to: 'info@swisscleanmove.ch, swisscleanmove.ch@gmail.com',
            subject: `New Quote Request: ${cleanServiceType}`,
            html: emailHtml,
            text: `New quote request from ${cleanFirstName} ${cleanLastName} (${cleanEmail}) for ${cleanServiceType}`
        });

        // 9. Delivery Verification Contract
        if (!emailResult.success) {
            console.error('❌ Quote request admin notification email failed:', emailResult.error);
            const userMessage = dbPersisted
                ? 'Your quote request was saved in our system, but administrative notification delivery encountered a temporary issue. Please do not submit repeatedly; our team will review your request.'
                : 'Failed to deliver quote request. Please contact us directly by phone or WhatsApp.';

            return NextResponse.json({
                success: false,
                delivered: false,
                persisted: dbPersisted,
                id: submissionId,
                error: userMessage
            }, { status: 502 });
        }

        return NextResponse.json(
            { success: true, delivered: true, persisted: dbPersisted, id: submissionId },
            { status: dbPersisted ? 201 : 200 }
        );
    } catch (error) {
        console.error('Error creating quote submission:', error);
        return NextResponse.json(
            { success: false, delivered: false, persisted: false, error: 'An unexpected server error occurred while processing your quote request.' },
            { status: 500 }
        );
    }
}
