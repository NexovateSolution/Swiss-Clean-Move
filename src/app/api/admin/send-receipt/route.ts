import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'

import { generateQuotePdf } from '@/utils/pdfGenerator'

export async function POST(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request)
        if (!auth) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { clientId, submissionId, language = 'de' } = await request.json()
        const targetId = clientId || submissionId

        if (!targetId) {
            return NextResponse.json({ error: 'Client or Submission ID is required' }, { status: 400 })
        }

        // Fetch client details
        let client = await prisma.client.findUnique({
            where: { id: targetId },
            include: {
                payments: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        let clientInfo: { id: string; firstName: string; lastName: string; email: string };
        let subData: any = {};
        let customer: any = {};
        let quoteRes: any = null;

        if (client) {
            if (!client.email) {
                return NextResponse.json({ error: 'Client has no email address' }, { status: 400 })
            }

            clientInfo = {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email
            };

            // Build customer object for PDF generator
            if (client.data && typeof client.data === 'object') {
               subData = client.data;
            }

            const cleanServiceType = (client.serviceType ? client.serviceType.trim() : '');
            const isPureCleaning = Boolean(
                cleanServiceType &&
                (cleanServiceType.toLowerCase().includes('reinigung') || cleanServiceType.toLowerCase().includes('clean')) &&
                !cleanServiceType.toLowerCase().includes('umzug') &&
                !cleanServiceType.toLowerCase().includes('transport') &&
                !cleanServiceType.toLowerCase().includes('entsorgung') &&
                !cleanServiceType.toLowerCase().includes('disposal')
            );

            customer = {
                ...subData,
                ...(subData.data || {}),
                serviceType: cleanServiceType,
                serviceName: cleanServiceType,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email || '',
                phone: client.phone || '',
                streetAndNumber: client.address || '',
                postalCodeAndCity: `${client.postalCode || ''} ${client.location || ''}`.trim(),
                propertyType: client.buildingType,
                apartmentType: client.buildingType,
                cleaningAreaInM2: client.squareMeters,
                areaInM2: client.squareMeters,
                livingSpaceInM2: client.squareMeters,
                cleaningApartmentType: client.buildingType,
                cleaningTypes: isPureCleaning ? cleanServiceType : (subData.cleaningTypes || undefined),
                cleaningAppointment: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                movingDate: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                numberOfRooms: client.numberOfRooms,
                elevator: client.elevator,
                floor: client.floor,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: client.totalPrice || 0,
                  isFallback: false,
                  lineItems: [
                     { id: cleanServiceType || 'Service', price: client.totalPrice || 0 }
                  ]
               };
            }
        } else {
            // Check in ServiceFormSubmission table
            const submission = await prisma.serviceFormSubmission.findUnique({
                where: { id: targetId }
            });

            if (!submission) {
                return NextResponse.json({ error: 'Client or submission not found' }, { status: 404 })
            }

            if (!submission.emailAddress) {
                return NextResponse.json({ error: 'Client has no email address' }, { status: 400 })
            }

            clientInfo = {
               id: submission.id,
               firstName: submission.firstName,
               lastName: submission.name,
               email: submission.emailAddress
            };

            if (submission.data && typeof submission.data === 'object') {
               subData = submission.data;
            }

            const cleanSubService = (submission.serviceName ? submission.serviceName.trim() : '');
            const isSubCleaning = Boolean(
                cleanSubService &&
                (cleanSubService.toLowerCase().includes('reinigung') || cleanSubService.toLowerCase().includes('clean')) &&
                !cleanSubService.toLowerCase().includes('umzug') &&
                !cleanSubService.toLowerCase().includes('transport') &&
                !cleanSubService.toLowerCase().includes('entsorgung') &&
                !cleanSubService.toLowerCase().includes('disposal')
            );

            customer = {
                ...submission,
                ...subData,
                ...(subData.data || {}),
                serviceType: cleanSubService,
                serviceName: cleanSubService,
                firstName: submission.firstName,
                lastName: submission.name,
                email: submission.emailAddress || '',
                phone: submission.telephone || '',
                streetAndNumber: submission.streetAndNumber || '',
                postalCodeAndCity: submission.postalCodeAndCity || '',
                cleaningTypes: isSubCleaning ? cleanSubService : (subData.cleaningTypes || undefined),
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: submission.estimatedPrice || subData.estimatedPrice || 0,
                  isFallback: false,
                  quoteNumber: 'Q-000',
                  lineItems: Array.isArray(subData.lineItems) ? subData.lineItems : [
                     { id: cleanSubService || 'Service', price: submission.estimatedPrice || subData.estimatedPrice || 0 }
                  ]
               };
            }
        }

        // Generate invoice PDF using the shared generator
        let invoicePdf: Buffer | undefined;
        try {
            const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('PDF Generation timed out')), 30000);
            });
            invoicePdf = await Promise.race([
                generateQuotePdf(quoteRes, customer, 'invoice'),
                timeoutPromise
            ]);
        } catch (pdfErr) {
            console.error('PDF Generation failed or timed out:', pdfErr);
        }

        const pdfFilename = `invoice-${clientInfo.firstName}-${clientInfo.lastName}.pdf`

        // Email subjects and messages
        const subjects: any = {
            en: `Invoice - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            de: `Rechnung - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            fr: `Facture - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            it: `Fattura - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`
        }

        const messages: any = {
            en: `Dear ${clientInfo.firstName} ${clientInfo.lastName},\n\nPlease find attached your invoice from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${clientInfo.firstName} ${clientInfo.lastName},\n\nAnbei finden Sie Ihre Rechnung von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${clientInfo.firstName} ${clientInfo.lastName},\n\nVeuillez trouver ci-joint votre facture de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`,
            it: `Gentile ${clientInfo.firstName} ${clientInfo.lastName},\n\nIn allegato trova la Sua fattura da SwissCleanMove.\n\nGrazie per la Sua fiducia!\n\nCordiali saluti,\nTeam SwissCleanMove`
        }

        // Send email using shared email utility
        const { sendEmailNotification } = await import('@/lib/email')
        
        const emailResult = await sendEmailNotification({
            to: clientInfo.email,
            subject: subjects[language] || subjects.en,
            text: messages[language] || messages.en,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://swisscleanmove.ch/images/logo.png" alt="SwissCleanMove" style="height: 100px; width: auto;">
          </div>
          <h2 style="color: #555;">Rechnung / Invoice</h2>
          <p>${(messages[language] || messages.en).replace(/\n/g, '<br>')}</p>
          <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #666;">
            <strong>SwissCleanMove</strong><br>
            Orpundstrasse 31, 2504 Biel/Bienne<br>
            info@swisscleanmove.ch
          </div>
        </div>
      `,
            attachments: invoicePdf ? [
                {
                    filename: pdfFilename,
                    content: invoicePdf,
                    contentType: 'application/pdf'
                }
            ] : []
        })

        if (!emailResult.success) {
            const errorDetails = emailResult.error || 'Unknown email error';
            const isAuthError = errorDetails.includes('535') || errorDetails.includes('BadCredentials') || errorDetails.includes('Invalid login');
            const message = isAuthError
                ? 'Gmail App Password is invalid or revoked. Please create a new App Password at myaccount.google.com/apppasswords and update GMAIL_APP_PASSWORD.'
                : `Email sending failed: ${errorDetails}`;
            return NextResponse.json({
                error: 'Failed to send invoice email',
                details: message
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Invoice sent successfully'
        })
    } catch (error: any) {
        console.error('Error sending invoice:', error)
        return NextResponse.json({
            error: 'Failed to send invoice',
            details: error.message
        }, { status: 500 })
    }
}
