import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'
import puppeteerCore from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { generateQuoteHtml } from '@/utils/pdfGenerator'

export async function POST(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request)
        if (!auth) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { clientId, language = 'de' } = await request.json()

        // Fetch client details
        const client = await prisma.client.findUnique({
            where: { id: clientId },
            include: {
                payments: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 })
        }

        if (!client.email) {
            return NextResponse.json({ error: 'Client has no email address' }, { status: 400 })
        }

        // Map Client Data to Quote HTML Format
        let subData: any = {};
        if (client.data && typeof client.data === 'object') {
           subData = client.data;
        }

        const customer = {
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
            ...subData
        };

        let quoteRes = subData.quoteResult;
        if (!quoteRes || !quoteRes.lineItems) {
           quoteRes = {
              totalEstimatedPrice: client.totalPrice || 0,
              isFallback: false,
              lineItems: [
                 { id: client.serviceType || 'Reinigung', price: client.totalPrice || 0 }
              ]
           };
        }

        // Generate invoice HTML using the shared Contract template
        const invoiceHtml = generateQuoteHtml(quoteRes, customer, 'contract');

        const invoicePdf = await renderPdfFromHtml(invoiceHtml)
        const pdfFilename = `contract-${client.firstName}-${client.lastName}.pdf`

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        // Email subjects and messages
        const subjects: any = {
            en: `Contract - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            de: `Vertrag - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            fr: `Contrat - SwissCleanMove - ${client.firstName} ${client.lastName}`
        }

        const messages: any = {
            en: `Dear ${client.firstName} ${client.lastName},\n\nPlease find attached your contract from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${client.firstName} ${client.lastName},\n\nAnbei finden Sie Ihren Vertrag von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${client.firstName} ${client.lastName},\n\nVeuillez trouver ci-joint votre contrat de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`
        }

        // Send email
        await transporter.sendMail({
            from: `"SwissCleanMove" <${process.env.GMAIL_USER}>`,
            to: client.email,
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
            attachments: [
                {
                    filename: pdfFilename,
                    content: invoicePdf,
                    contentType: 'application/pdf'
                }
            ]
        })

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
        browser = await puppeteerCore.launch({
            args: chromium.args,
            // @ts-ignore
            defaultViewport: chromium.defaultViewport || { width: 1920, height: 1080 },
            executablePath: await chromium.executablePath(),
            // @ts-ignore
            headless: chromium.headless === false ? false : true,
        })
    }

    try {
        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'networkidle0' })
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', right: '12mm', bottom: '30mm', left: '12mm' }
        })
        return Buffer.from(pdf)
    } finally {
        await browser.close()
    }
}
