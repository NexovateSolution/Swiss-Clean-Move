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

        // Build customer object for PDF generator
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
            cleaningAppointment: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
            numberOfRooms: client.numberOfRooms,
            elevator: client.elevator,
            floor: client.floor,
            locale: language,
            ...subData,
            ...(subData.data || {})
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
        const invoiceHtml = generateQuoteHtml(quoteRes, customer, 'invoice');

        const pdfFilename = `invoice-${client.firstName}-${client.lastName}.pdf`



        // Email subjects and messages
        const subjects: any = {
            en: `Invoice - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            de: `Rechnung - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            fr: `Facture - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            it: `Fattura - SwissCleanMove - ${client.firstName} ${client.lastName}`
        }

        const messages: any = {
            en: `Dear ${client.firstName} ${client.lastName},\n\nPlease find attached your invoice from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${client.firstName} ${client.lastName},\n\nAnbei finden Sie Ihre Rechnung von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${client.firstName} ${client.lastName},\n\nVeuillez trouver ci-joint votre facture de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`,
            it: `Gentile ${client.firstName} ${client.lastName},\n\nIn allegato trova la Sua fattura da SwissCleanMove.\n\nGrazie per la Sua fiducia!\n\nCordiali saluti,\nTeam SwissCleanMove`
        }

        // Send email using shared email utility
        const { sendEmailNotification } = await import('@/lib/email')
        
        const emailResult = await sendEmailNotification({
            to: client.email,
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
      `
        })

        if (typeof emailResult === 'string' && emailResult.startsWith('Error:')) {
            throw new Error(`Email sending failed: ${emailResult}`);
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
        await page.setContent(html, { waitUntil: 'networkidle0' })
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
