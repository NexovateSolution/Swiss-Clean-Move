import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'

import { generateQuoteHtml, addPageNumbersToPdf } from '@/utils/pdfGenerator'

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

            // Map Client Data to Quote HTML Format
            if (client.data && typeof client.data === 'object') {
               subData = client.data;
            }

            customer = {
                ...subData,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email || '',
                phone: client.phone || '',
                streetAndNumber: client.address || '',
                postalCodeAndCity: `${client.postalCode || ''} ${client.location || ''}`.trim(),
                cleaningAreaInM2: client.squareMeters,
                cleaningApartmentType: client.buildingType,
                cleaningTypes: client.serviceType,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: client.totalPrice || 0,
                  isFallback: false,
                  lineItems: [
                     { id: client.serviceType || 'Reinigung', price: client.totalPrice || 0 }
                  ]
               };
            } else {
               // If admin edited the price in the DB, enforce it in the PDF
               quoteRes.adminOverride = true;
               quoteRes.totalPrice = client.totalPrice || quoteRes.totalEstimatedPrice;
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

            customer = {
                ...submission,
                ...subData,
                ...(subData.data || {}),
                firstName: submission.firstName,
                lastName: submission.name,
                email: submission.emailAddress || '',
                phone: submission.telephone || '',
                streetAndNumber: submission.streetAndNumber || '',
                postalCodeAndCity: submission.postalCodeAndCity || '',
                cleaningTypes: submission.serviceName,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: submission.estimatedPrice || subData.estimatedPrice || 0,
                  isFallback: false,
                  quoteNumber: 'Q-000',
                  lineItems: Array.isArray(subData.lineItems) ? subData.lineItems : [
                     { id: submission.serviceName || 'Reinigung', price: submission.estimatedPrice || subData.estimatedPrice || 0 }
                  ]
               };
            }
        }

        // Generate invoice HTML using the shared Contract template
        const invoiceHtml = generateQuoteHtml(quoteRes, customer, 'contract');

        let invoicePdf: Buffer | undefined;
        try {
            const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('PDF Generation timed out')), 30000);
            });
            invoicePdf = await Promise.race([
                renderPdfFromHtml(invoiceHtml),
                timeoutPromise
            ]);
        } catch (pdfErr) {
            console.error('PDF Generation failed or timed out:', pdfErr);
        }

        const pdfFilename = `contract-${clientInfo.firstName}-${clientInfo.lastName}.pdf`

        // Email subjects and messages
        const subjects: any = {
            en: `Contract - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            de: `Vertrag - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            fr: `Contrat - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`,
            it: `Contratto - SwissCleanMove - ${clientInfo.firstName} ${clientInfo.lastName}`
        }

        const messages: any = {
            en: `Dear ${clientInfo.firstName} ${clientInfo.lastName},\n\nPlease find attached your contract from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${clientInfo.firstName} ${clientInfo.lastName},\n\nAnbei finden Sie Ihren Vertrag von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${clientInfo.firstName} ${clientInfo.lastName},\n\nVeuillez trouver ci-joint votre contrat de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`,
            it: `Gentile ${clientInfo.firstName} ${clientInfo.lastName},\n\nIn allegato trova il Suo contratto da SwissCleanMove.\n\nGrazie per la Sua fiducia!\n\nCordiali saluti,\nTeam SwissCleanMove`
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
          <h2 style="color: #555;">Vertrag / Contract</h2>
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

        if (typeof emailResult === 'string' && emailResult.startsWith('Error:')) {
            throw new Error(`Email sending failed: ${emailResult}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Contract sent successfully'
        })
    } catch (error: any) {
        console.error('Error sending contract:', error)
        return NextResponse.json({
            error: 'Failed to send contract',
            details: error.message
        }, { status: 500 })
    }
}


async function renderPdfFromHtml(html: string): Promise<Buffer> {
    const isLocal = !!!process.env.VERCEL
    let browser

    if (isLocal) {
        const puppeteerLocal = require('puppeteer')
        browser = await puppeteerLocal.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
    } else {
        const puppeteerCore = require('puppeteer-core')
        const chromium = require('@sparticuz/chromium')
        // Fix for Sparticuz chromium pack on Vercel
        const executablePath = await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar')
        browser = await puppeteerCore.launch({
            args: chromium.args,
            // @ts-ignore
            defaultViewport: chromium.defaultViewport || { width: 1920, height: 1080 },
            executablePath: executablePath,
            // @ts-ignore
            headless: chromium.headless === false ? false : true,
        })
    }

    try {
        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'load', timeout: 20000 })
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: false,
            margin: { top: '20mm', right: '12mm', bottom: '20mm', left: '12mm' }
        })
        const finalPdf = await addPageNumbersToPdf(Buffer.from(pdf))
        return finalPdf
    } finally {
        await browser.close()
    }
}
