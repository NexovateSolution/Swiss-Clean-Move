import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { sendEmailNotification, formatContactEmail } from '@/lib/email';

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

        const name = String(body.name || '').trim();
        const email = String(body.email || '').trim().toLowerCase();
        const phone = body.phone ? String(body.phone).trim() : null;
        const subject = String(body.subject || '').trim();
        const message = String(body.message || '').trim();

        // 1. Validation
        const validationErrors: string[] = [];
        if (!name || name.length > 100) {
            validationErrors.push('Please provide a valid name (max 100 characters)');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.length > 120 || !emailRegex.test(email)) {
            validationErrors.push('Please provide a valid email address');
        }

        if (phone) {
            const digitsOnly = phone.replace(/\D/g, '');
            const phoneValidChars = /^[\d\s+\-()./]{6,40}$/;
            if (digitsOnly.length < 6 || digitsOnly.length > 20 || !phoneValidChars.test(phone)) {
                validationErrors.push('Please provide a valid telephone number (minimum 6 digits)');
            }
        }

        if (!subject || subject.length > 200) {
            validationErrors.push('Please provide a subject (max 200 characters)');
        }

        if (!message || message.length > 3000) {
            validationErrors.push('Please provide a message (max 3000 characters)');
        }

        if (validationErrors.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Validation failed', details: validationErrors },
                { status: 400 }
            );
        }

        // 2. Database Persistence
        let dbPersisted = false;
        let submissionId: string | null = null;
        let dbErrorMessage: string | null = null;

        try {
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
            dbPersisted = true;
            submissionId = submission.id;
        } catch (dbErr: any) {
            dbErrorMessage = dbErr instanceof Error ? dbErr.message : String(dbErr);
            console.error('Database persistence error in contact submission:', dbErrorMessage);
        }

        // 3. Admin Email Notification
        let emailHtml = formatContactEmail({ name, email, phone: phone || undefined, subject, message });
        if (!dbPersisted) {
            emailHtml = `<div style="background: #fff3cd; color: #856404; padding: 12px; margin-bottom: 20px; border: 1px solid #ffeeba;">
                <strong>⚠️ DATABASE WARNING:</strong> This contact submission could not be saved to the database (${dbErrorMessage || 'Database error'}). All message data is preserved in this email.
            </div>` + emailHtml;
        }

        const emailResult = await sendEmailNotification({
            to: 'info@swisscleanmove.ch, swisscleanmove.ch@gmail.com',
            subject: `New Contact Form: ${subject}`,
            html: emailHtml,
            text: `New contact form submission from ${name} (${email})\n\nSubject: ${subject}\n\nMessage: ${message}`
        });

        // 4. Verification of Delivery Contract
        if (!emailResult.success) {
            console.error('❌ Contact form admin notification email failed:', emailResult.error);
            const userMessage = dbPersisted
                ? 'Your message was saved in our database, but notification delivery encountered a temporary issue. Please do not submit repeatedly; our team will review your message.'
                : 'Failed to deliver your message. Please contact us directly by telephone or email.';

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
        console.error('Error in contact form submission route:', error);
        return NextResponse.json(
            { success: false, delivered: false, persisted: false, error: 'An unexpected server error occurred while processing your message.' },
            { status: 500 }
        );
    }
}
