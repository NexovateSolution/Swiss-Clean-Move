import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer'
import { LOGO_BASE64 } from '@/lib/logo-base64'

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

        // Generate invoice HTML
        const invoiceHtml = generateInvoiceHTML(client, language)

        const invoicePdf = await renderPdfFromHtml(invoiceHtml)
        const pdfFilename = `invoice-${client.firstName}-${client.lastName}.pdf`

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
            en: `Invoice - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            de: `Rechnung - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            fr: `Facture - SwissCleanMove - ${client.firstName} ${client.lastName}`
        }

        const messages: any = {
            en: `Dear ${client.firstName} ${client.lastName},\n\nPlease find attached your invoice from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${client.firstName} ${client.lastName},\n\nAnbei finden Sie Ihre Rechnung von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${client.firstName} ${client.lastName},\n\nVeuillez trouver ci-joint votre facture de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`
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
            <img src="data:image/jpeg;base64,${LOGO_BASE64}" alt="SwissCleanMove" style="height: 100px; width: auto;">
          </div>
          <h2 style="color: #0066CC;">Rechnung / Invoice</h2>
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
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

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

function generateInvoiceHTML(client: any, language: string): string {
    const t: any = {
        de: {
            title: 'Reinigung Auftragsbestätigung',
            orderNumber: 'Bestellnummer',
            date: 'Reinigungsdatum',
            clientStartTime: 'Beginn beim Kunden',
            cleaningCompleted: 'Reinigung Übergabe',
            paymentCondition: 'Zahlungsbedingung',
            thankYou: 'Vielen Dank für Ihren Auftrag. Gerne bestätigen wir Ihnen folgendes Angebot.',
            greeting: 'Sehr geehrte(r)',
            regards: 'Mit freundlichen Grüßen',
            companyName: 'SwissCleanMove',
            service: 'Leistung',
            details: 'Details',
            amount: 'Betrag',
            subtotal: 'Zwischensumme',
            vat: 'MwSt 8.1%',
            total: 'Gesamtbetrag',
            cashPayment: 'Barzahlung nach Übergabedatum beim Teamleiter',
            serviceDetails: 'Leistungsdetails',
            additionalInfo: 'Zusätzliche Informationen',
            location: 'Ort',
            receiptSlip: 'Empfangsschein',
            paymentPart: 'Zahlteil',
            accountPayableTo: 'Konto / Zahlbar an',
            reference: 'Referenz',
            payableBy: 'Zahlbar durch',
            currency: 'Währung',
            chf: 'CHF',
            room: 'Zimmer',
            page: 'Seite',
            guarantee: 'Übergabegarantie Inkl. 8.1% MwSt Pauschal',
            customerSignature: 'Unterschrift Kunde',
            teamSignature: 'Unterschrift Teamleiter',
            type: 'Typ',
            livingArea: 'Wohnfläche',
            floorLabel: 'Stockwerk',
            elevatorLabel: 'Aufzug',
            withElevator: 'Mit Lift',
            withoutElevator: 'Ohne Lift',
            remarks: 'Bemerkungen:'
        },
        fr: {
            title: 'Confirmation de commande de nettoyage',
            orderNumber: 'Numéro de commande',
            date: 'Date de nettoyage',
            clientStartTime: 'Début chez le client',
            cleaningCompleted: 'Remise du nettoyage',
            paymentCondition: 'Condition de paiement',
            thankYou: 'Merci pour votre commande. Nous avons le plaisir de vous confirmer l offre suivante.',
            greeting: 'Cher/Chère',
            regards: 'Cordialement',
            companyName: 'SwissCleanMove',
            service: 'Service',
            details: 'Détails',
            amount: 'Montant',
            subtotal: 'Sous-total',
            vat: 'TVA 8.1%',
            total: 'Total',
            cashPayment: 'Paiement en espèces après la remise',
            serviceDetails: 'Détails du service',
            additionalInfo: 'Informations supplémentaires',
            location: 'Lieu',
            receiptSlip: 'Reçu',
            paymentPart: 'Partie paiement',
            accountPayableTo: 'Compte / Payable à',
            reference: 'Référence',
            payableBy: 'Payable par',
            currency: 'Devise',
            chf: 'CHF',
            room: 'Pièces',
            page: 'Page',
            guarantee: 'Garantie de remise incl. 8.1% TVA forfaitaire',
            customerSignature: 'Signature du client',
            teamSignature: 'Signature du chef d\'équipe',
            type: 'Type',
            livingArea: 'Surface habitable',
            floorLabel: 'Étage',
            elevatorLabel: 'Ascenseur',
            withElevator: 'Avec ascenseur',
            withoutElevator: 'Sans ascenseur',
            remarks: 'Remarques:'
        },
        en: {
            title: 'Cleaning Order Confirmation',
            orderNumber: 'Order Number',
            date: 'Cleaning Date',
            clientStartTime: 'Start at Client',
            cleaningCompleted: 'Cleaning Handover',
            paymentCondition: 'Payment Condition',
            thankYou: 'Thank you for your order. We are pleased to confirm the following offer.',
            greeting: 'Dear',
            regards: 'Best regards',
            companyName: 'SwissCleanMove',
            service: 'Service',
            details: 'Details',
            amount: 'Amount',
            subtotal: 'Subtotal',
            vat: 'VAT 8.1%',
            total: 'Total Amount',
            cashPayment: 'Cash payment after handover',
            serviceDetails: 'Service Details',
            additionalInfo: 'Additional Information',
            location: 'Location',
            receiptSlip: 'Receipt',
            paymentPart: 'Payment Part',
            accountPayableTo: 'Account / Payable to',
            reference: 'Reference',
            payableBy: 'Payable by',
            currency: 'Currency',
            chf: 'CHF',
            room: 'Rooms',
            page: 'Page',
            guarantee: 'Handover guarantee Incl. 8.1% VAT flat rate',
            customerSignature: 'Customer Signature',
            teamSignature: 'Team Leader Signature',
            type: 'Type',
            livingArea: 'Living area',
            floorLabel: 'Floor',
            elevatorLabel: 'Elevator',
            withElevator: 'With elevator',
            withoutElevator: 'Without elevator',
            remarks: 'Remarks:'
        }
    }[language] || { /* fallback */ };

    const orderNumber = `#FE-${client.id.substring(client.id.length - 6).toUpperCase()}`
    const currentDate = new Date().toLocaleDateString()
    const clientName = `${client.prefix ? client.prefix + ' ' : ''}${client.firstName} ${client.lastName}`

    const paymentSlip = {
        account: 'CH86 0900 0000 1636 3866 5',
        payableTo: ['SwissCleanMove Gebrekristos', 'Orpundstrasse 31', 'CH-2504 Biel/Bienne'],
        reference: '00 00000 00000 00000 00000 00000'
    }

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; padding-bottom: 80px; font-size: 14px; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #0066CC; padding-bottom: 15px; }
            .logo-section { display: flex; align-items: center; gap: 15px; }
            .company-info { text-align: right; font-size: 13px; color: #333; line-height: 1.8; }
            .company-info strong { font-size: 15px; color: #000; }
            .title { text-align: center; font-size: 20px; font-weight: bold; color: #333; margin: 30px 0; }
            .order-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .client-info { float: right; width: 45%; background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .service-details { clear: both; margin-top: 20px; }
            .service-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .service-table th, .service-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .service-table th { background: #0066CC; color: white; font-weight: bold; }
            .total-section { float: right; width: 300px; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .total-row.final { font-weight: bold; font-size: 14px; border-bottom: 2px solid #0066CC; color: #0066CC; }
            .payment-info { clear: both; margin-top: 40px; padding: 15px; background: #f0f8ff; border-left: 4px solid #0066CC; }
            .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding-top: 20px; border-top: 1px solid #ddd; }
            .signature-box { width: 45%; text-align: center; }
            .signature-line { border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px; }
            .footer-wrapper { margin-top: 40px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
            .page-number { text-align: right; font-size: 10px; color: #666; padding-top: 5px; }
            .payment-slip { margin-top: 40px; border: 2px solid #111; border-radius: 8px; overflow: hidden; }
            .payment-slip-table { width: 100%; border-collapse: collapse; }
            .payment-slip-table td { vertical-align: top; padding: 16px; }
            .payment-slip-left { width: 35%; border-right: 1px solid #111; }
            .payment-slip-right { width: 65%; }
            .payment-slip-title { margin: 0 0 14px 0; font-size: 14px; font-weight: bold; letter-spacing: 0.2px; }
            .payment-slip-label { display: block; font-size: 11px; font-weight: bold; color: #111; margin-bottom: 3px; }
            .payment-slip-value { font-size: 11px; color: #111; }
            .payment-slip-block { margin-bottom: 14px; }
            .payment-slip-amount-box { border: 1px solid #111; border-radius: 6px; padding: 10px; text-align: left; width: 170px; }
            .payment-slip-amount-row { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
            .payment-slip-amount { font-size: 14px; font-weight: bold; }
            .payment-slip-currency { font-size: 12px; font-weight: bold; }
            .remarks-section { margin-top: 20px; font-size: 12px; color: #555; }
            @media print {
                body { margin: 0; padding: 15px; -webkit-print-color-adjust: exact; }
                .service-table th { background: #0066CC !important; color: white !important; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo-section">
                <img src="data:image/jpeg;base64,${LOGO_BASE64}" alt="SwissCleanMove" style="height:140px;width:auto;">
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Orpundstrasse 31, 2504 Biel/Bienne<br>
                info@swisscleanmove.ch<br>
                📞 +41 76 488 36 89 / +41 78 215 80 30<br>
                UID: CHE-457.949.122
            </div>
        </div>

        <div class="title">${t.title}</div>

        <div style="margin: 15px 0 25px 0; font-size: 15px; line-height: 1.8;">
            <strong>${t.greeting} ${clientName}</strong><br>
            ${t.thankYou}
        </div>

        <div class="order-info">
            <strong>${t.orderNumber}:</strong> ${orderNumber}<br>
            <strong>Datum:</strong> ${currentDate}
        </div>

        <div class="client-info">
            <strong>${clientName}</strong><br>
            ${client.address}<br>
            ${client.postalCode} ${client.location}
        </div>

        <div class="service-details">
            <h3 style="color: #0066CC; border-bottom: 1px solid #0066CC; padding-bottom: 5px;">${t.serviceDetails}</h3>
            <table class="service-table">
                <thead>
                    <tr>
                        <th>${t.service}</th>
                        <th>${t.details}</th>
                        <th>${t.amount}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>${client.serviceType}</strong></td>
                        <td>
                            ${client.buildingType || 'N/A'} • ${client.squareMeters || 0}m²<br>
                            ${client.numberOfRooms ? `${client.numberOfRooms} ${t.room}<br>` : ''}
                            ${client.floor ? `${t.floorLabel}: ${client.floor}<br>` : ''}
                            ${client.elevator === 'yes' ? t.withElevator : t.withoutElevator}<br>
                            ${t.guarantee}
                        </td>
                        <td><strong>${client.totalPrice || 0} CHF</strong></td>
                    </tr>
                </tbody>
            </table>

            <table class="service-table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th colspan="2" style="background: #004C99;">${t.additionalInfo}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width:40%;"><strong>${t.location}</strong></td>
                        <td>${client.address}, ${client.postalCode} ${client.location}</td>
                    </tr>
                    <tr>
                        <td><strong>Tel</strong></td>
                        <td>${client.phone || 'N/A'}</td>
                    </tr>
                    ${client.email ? `<tr><td><strong>Email</strong></td><td>${client.email}</td></tr>` : ''}
                    <tr>
                        <td><strong>${t.date}</strong></td>
                        <td>${new Date(client.fromDate || Date.now()).toLocaleDateString()} - ${new Date(client.untilDate || Date.now()).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="total-section">
            <div class="total-row">
                <span>${t.subtotal}:</span>
                <span>${((client.totalPrice || 0) / 1.081).toFixed(2)} CHF</span>
            </div>
            <div class="total-row">
                <span>${t.vat}:</span>
                <span>${((client.totalPrice || 0) - ((client.totalPrice || 0) / 1.081)).toFixed(2)} CHF</span>
            </div>
            <div class="total-row final">
                <span>${t.total}:</span>
                <span>${client.totalPrice || 0} CHF</span>
            </div>
        </div>

        <div class="payment-info">
            <strong>${t.paymentCondition}:</strong> ${t.cashPayment}<br><br>
            <strong>${t.date}:</strong> ${new Date(client.fromDate || Date.now()).toLocaleDateString()}<br>
            <strong>${t.clientStartTime}:</strong> ${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>
            <strong>${t.cleaningCompleted}:</strong> ${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        ${(client.remarks1 || client.remarks2 || client.remarks3) ? `
        <div class="remarks-section">
            <h4 style="margin-bottom: 5px; color: #333;">${t.remarks}</h4>
            ${client.remarks1 ? `<p style="margin: 2px 0;">• ${client.remarks1}</p>` : ''}
            ${client.remarks2 ? `<p style="margin: 2px 0;">• ${client.remarks2}</p>` : ''}
            ${client.remarks3 ? `<p style="margin: 2px 0;">• ${client.remarks3}</p>` : ''}
        </div>
        ` : ''}

        <div style="margin-top: 30px;">
            <p>${t.thankYou}</p>
            <p><strong>${t.regards}<br>${t.companyName}</strong></p>
        </div>

        <div class="signatures">
            <div class="signature-box">
                <div class="signature-line"></div>
                <div>${t.customerSignature}</div>
            </div>
            <div class="signature-box">
                <div class="signature-line"></div>
                <div>${t.teamSignature}</div>
            </div>
        </div>

        <div class="footer-wrapper">
            Copyright © ${t.companyName} ${new Date().getFullYear()}<br>
            Designed by SwissCleanMove
            <div class="page-number">${t.page} 1 of 2</div>
        </div>

        <div style="page-break-before: always;"></div>

        <div class="header">
            <div class="logo-section">
                 <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove" style="height:140px;width:auto;">
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Orpundstrasse 31, 2504 Biel/Bienne<br>
                info@swisscleanmove.ch<br>
                📞 +41 76 488 36 89 / +41 78 215 80 30<br>
                UID: CHE-457.949.122
            </div>
        </div>

        <div class="payment-slip">
            <table class="payment-slip-table">
                <tr>
                    <td class="payment-slip-left">
                        <div class="payment-slip-title">${t.receiptSlip}</div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.accountPayableTo}</span>
                            <div class="payment-slip-value">${paymentSlip.account}</div>
                            <div class="payment-slip-value">${paymentSlip.payableTo.join('<br>')}</div>
                        </div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.reference}</span>
                            <div class="payment-slip-value">${paymentSlip.reference}</div>
                        </div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.currency}</span>
                            <div class="payment-slip-value">CHF</div>
                        </div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.amount}</span>
                            <div class="payment-slip-value">CHF ${(client.totalPrice || 0).toFixed(2)}</div>
                        </div>
                        <div class="payment-slip-block" style="margin-bottom: 0;">
                            <span class="payment-slip-label">${t.payableBy}</span>
                            <div class="payment-slip-value">${clientName}</div>
                            <div class="payment-slip-value">${client.address}<br>${client.postalCode} ${client.location}</div>
                        </div>
                    </td>
                    <td class="payment-slip-right">
                        <div class="payment-slip-title">${t.paymentPart}</div>
                        <div class="payment-slip-amount-row">
                            <div style="flex: 1;">
                                <div class="payment-slip-block">
                                    <span class="payment-slip-label">${t.accountPayableTo}</span>
                                    <div class="payment-slip-value">${paymentSlip.account}</div>
                                    <div class="payment-slip-value">${paymentSlip.payableTo.join('<br>')}</div>
                                </div>
                                <div class="payment-slip-block">
                                    <span class="payment-slip-label">${t.reference}</span>
                                    <div class="payment-slip-value">${paymentSlip.reference}</div>
                                </div>
                                <div class="payment-slip-block" style="margin-bottom: 0;">
                                    <span class="payment-slip-label">${t.payableBy}</span>
                                    <div class="payment-slip-value">${clientName}</div>
                                    <div class="payment-slip-value">${client.address}<br>${client.postalCode} ${client.location}</div>
                                </div>
                            </div>
                            <div>
                                <div class="payment-slip-amount-box">
                                    <div class="payment-slip-currency">CHF</div>
                                    <div class="payment-slip-amount">${(client.totalPrice || 0).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer-wrapper" style="margin-top: 60px;">
            Copyright © ${t.companyName} ${new Date().getFullYear()}<br>
            Designed by SwissCleanMove
            <div class="page-number">${t.page} 2 of 2</div>
        </div>
    </body>
    </html>
  `
}
