import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { clientId, language } = await request.json()

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

    // Email subject based on language
    const subjects = {
      en: `Invoice - SwissCleanMove - ${client.firstName} ${client.lastName}`,
      de: `Rechnung - SwissCleanMove - ${client.firstName} ${client.lastName}`,
      fr: `Facture - SwissCleanMove - ${client.firstName} ${client.lastName}`
    }

    const messages = {
      en: `Dear ${client.firstName} ${client.lastName},\n\nPlease find attached your invoice from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
      de: `Sehr geehrte/r ${client.firstName} ${client.lastName},\n\nAnbei finden Sie Ihre Rechnung von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
      fr: `Cher/Chère ${client.firstName} ${client.lastName},\n\nVeuillez trouver ci-joint votre facture de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`
    }

    // Send email
    await transporter.sendMail({
      from: `"SwissCleanMove" <${process.env.GMAIL_USER}>`,
      to: client.email,
      subject: subjects[language as keyof typeof subjects] || subjects.en,
      text: messages[language as keyof typeof messages] || messages.en,
      html: invoiceHtml,
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
      margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' }
    })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}

function generateInvoiceHTML(client: any, language: string): string {
  const translations: any = {
    en: {
      invoice: 'INVOICE',
      orderNumber: 'Order Number',
      date: 'Date',
      billTo: 'Bill To',
      service: 'Service',
      details: 'Details',
      amount: 'Amount',
      subtotal: 'Subtotal (excl. VAT)',
      vat: 'VAT (8.1%)',
      total: 'Total Amount',
      paymentCondition: 'Payment Condition',
      cashPayment: 'Payable by cash upon completion of work',
      clientStartTime: 'Client Start Time',
      cleaningCompleted: 'Work Completed',
      thankYou: 'Thank you for your business and for your trust!',
      regards: 'With best regards',
      companyName: 'SwissCleanMove',
      customerSignature: 'Customer Signature',
      teamSignature: 'Team Signature',
      page: 'Page',
      guarantee: 'With handover guarantee Incl. 8.1% VAT flat rate',
      location: 'Location/Address',
      room: 'Rooms',
      additionalInfo: 'Additional Information',
      receiptSlip: 'Receipt Slip',
      paymentPart: 'Payment Part',
      accountPayableTo: 'Account / Payable to',
      reference: 'Reference',
      payableBy: 'Payable by',
      currency: 'Currency',
      chf: 'CHF'
    },
    de: {
      invoice: 'RECHNUNG',
      orderNumber: 'Auftragsnummer',
      date: 'Datum',
      billTo: 'Rechnung an',
      service: 'Dienstleistung',
      details: 'Details',
      amount: 'Betrag',
      subtotal: 'Zwischensumme (exkl. MwSt)',
      vat: 'MwSt (8.1%)',
      total: 'Gesamtbetrag',
      paymentCondition: 'Zahlungskonditionen',
      cashPayment: 'Zahlbar in bar nach Abschluss der Arbeiten',
      clientStartTime: 'Startzeit beim Kunden',
      cleaningCompleted: 'Reinigung abgeschlossen',
      thankYou: 'Vielen Dank für Ihren Auftrag und für Ihr Vertrauen!',
      regards: 'Mit freundlichen Grüßen',
      companyName: 'SwissCleanMove',
      customerSignature: 'Unterschrift Kunde',
      teamSignature: 'Unterschrift Team',
      page: 'Seite',
      guarantee: 'Mit Abnahmegarantie Inkl. 8.1% MwSt Pauschal',
      location: 'Ort / Adresse',
      room: 'Zimmer',
      additionalInfo: 'Zusätzliche Informationen',
      receiptSlip: 'Empfangsschein',
      paymentPart: 'Zahlteil',
      accountPayableTo: 'Konto / Zahlbar an',
      reference: 'Referenz',
      payableBy: 'Zahlbar durch',
      currency: 'Währung',
      chf: 'CHF'
    },
    fr: {
      invoice: 'FACTURE',
      orderNumber: 'Numéro de commande',
      date: 'Date',
      billTo: 'Facturer à',
      service: 'Service',
      details: 'Détails',
      amount: 'Montant',
      subtotal: 'Sous-total (hors TVA)',
      vat: 'TVA (8.1%)',
      total: 'Montant total',
      paymentCondition: 'Conditions de paiement',
      cashPayment: 'Payable au comptant à la fin des travaux',
      clientStartTime: 'Heure de début chez le client',
      cleaningCompleted: 'Nettoyage terminé',
      thankYou: 'Merci pour votre commande et pour votre confiance !',
      regards: 'Avec nos meilleures salutations',
      companyName: 'SwissCleanMove',
      customerSignature: 'Signature du client',
      teamSignature: 'Signature de l\'équipe',
      page: 'Page',
      guarantee: 'Avec garantie de remise incl. 8.1% TVA forfaitaire',
      location: 'Lieu / Adresse',
      room: 'Pièces',
      additionalInfo: 'Informations complémentaires',
      receiptSlip: 'Récépissé',
      paymentPart: 'Partie paiement',
      accountPayableTo: 'Compte / Payable à',
      reference: 'Référence',
      payableBy: 'Payable par',
      currency: 'Monnaie',
      chf: 'CHF'
    }
  }

  const t = translations[language] || translations.en
  const orderNumber = `#FE-${client.id.substring(0, 6).toUpperCase()}`
  const currentDate = new Date().toLocaleDateString()

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 40px;
                background-color: white;
                color: #333;
                font-size: 14px;
                line-height: 1.5;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #0066CC;
                padding-bottom: 15px;
            }
            .logo-section {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .company-info {
                text-align: right;
                font-size: 13px;
                color: #333;
                line-height: 1.8;
            }
            .title {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #333;
                margin: 30px 0;
            }
            .order-info {
                margin: 20px 0;
                font-size: 15px;
            }
            .client-info {
                margin: 30px 0;
                font-size: 16px;
                line-height: 1.6;
            }
            .service-details {
                margin: 30px 0;
            }
            .service-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .service-table th {
                background: #0066CC;
                color: white;
                padding: 12px;
                text-align: left;
            }
            .service-table td {
                padding: 12px;
                border: 1px solid #eee;
            }
            .total-section {
                float: right;
                width: 300px;
                margin-top: 20px;
            }
            .total-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }
            .total-row.final {
                font-weight: bold;
                font-size: 14px;
                border-bottom: 2px solid #0066CC;
                color: #0066CC;
            }
            .payment-info {
                clear: both;
                margin-top: 40px;
                padding: 15px;
                background: #f0f8ff;
                border-left: 4px solid #0066CC;
            }
            .signatures {
                display: flex;
                justify-content: space-between;
                margin-top: 80px;
            }
            .signature-box {
                width: 250px;
                text-align: center;
            }
            .signature-line {
                border-bottom: 1px solid #000;
                margin-bottom: 10px;
            }
            .footer {
                margin-top: 100px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
            .page-number {
                text-align: center;
                font-size: 10px;
                color: #999;
                margin-top: 10px;
            }

            /* Payment Slip Styles */
            .payment-slip {
                margin-top: 40px;
                border: 2px solid #111;
                border-radius: 8px;
                overflow: hidden;
            }
            .payment-slip-table {
                width: 100%;
                border-collapse: collapse;
            }
            .payment-slip-table td {
                vertical-align: top;
                padding: 16px;
            }
            .payment-slip-left {
                width: 35%;
                border-right: 1px solid #111;
            }
            .payment-slip-right {
                width: 65%;
            }
            .payment-slip-title {
                margin: 0 0 14px 0;
                font-size: 14px;
                font-weight: bold;
                letter-spacing: 0.2px;
            }
            .payment-slip-label {
                display: block;
                font-size: 11px;
                font-weight: bold;
                color: #111;
                margin-bottom: 3px;
                text-transform: none;
            }
            .payment-slip-value {
                font-size: 11px;
                color: #111;
            }
            .payment-slip-block {
                margin-bottom: 14px;
            }
            .payment-slip-amount-box {
                border: 1px solid #111;
                border-radius: 6px;
                padding: 10px;
                text-align: left;
                width: 170px;
            }
            .payment-slip-amount-row {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                align-items: flex-start;
            }
            @media print {
                body {
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .total-row.final {
                    background-color: #f0f8ff !important;
                    padding: 15px;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .header {
                    margin-bottom: 20px;
                }
                .service-table th {
                    background: #0066CC !important;
                    color: white !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo-section">
                <img src="/images/logo.jpg" alt="SwissCleanMove" style="height:160px;width:auto;" onerror="this.style.display='none'">
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Orpundstrasse 31<br>
                2504 Biel/Bienne<br>
                info@swisscleanmove.ch<br>
                📞 +41 76 488 36 89 / +41 78 215 80 30<br>
                UID: CHE-123.456.789
            </div>
        </div>

        <div class="title">${t.invoice}</div>

        <div class="order-info">
            <strong>${t.orderNumber}:</strong> ${orderNumber}<br>
            <strong>Datum:</strong> ${currentDate}
        </div>

        <div class="client-info">
            <strong>Herr ${client.firstName} ${client.lastName}</strong><br>
            ${client.address}<br>
            ${client.postalCode} ${client.location}
        </div>

        <div class="service-details">
            <h3>Service Details</h3>
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
                            ${t.guarantee}
                        </td>
                        <td><strong>${client.totalPrice || 0} CHF</strong></td>
                    </tr>
                </tbody>
            </table>

            <table class="service-table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th colspan="2">${t.additionalInfo}</th>
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
                    ${(client as any).numberOfRooms ? `<tr><td><strong>${t.room}</strong></td><td>${(client as any).numberOfRooms}</td></tr>` : ''}
                    ${(client as any).notes ? `<tr><td><strong>${t.additionalInfo}</strong></td><td>${(client as any).notes}</td></tr>` : ''}
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
            <strong>${t.clientStartTime}:</strong> ${new Date(client.fromDate || Date.now()).toLocaleTimeString()}<br>
            <strong>${t.cleaningCompleted}:</strong> ${new Date(client.untilDate || Date.now()).toLocaleTimeString()}
        </div>

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

        <div class="footer">
            Copyright © ${t.companyName} ${new Date().getFullYear()}<br>
            Designed by Saran Solutions
        </div>

        <div class="page-number">
            ${t.page} 1 of 2
        </div>

        <!-- Page Break -->
        <div style="page-break-before: always;"></div>

        <!-- Second Page - Swiss Payment Slip Format -->
        <div class="header">
            <div class="logo-section">
                <img src="/images/logo.jpg" alt="SwissCleanMove" style="height:160px;width:auto;" onerror="this.style.display='none'">
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Orpundstrasse 31<br>
                2504 Biel/Bienne<br>
                info@swisscleanmove.ch<br>
                📞 +41 76 488 36 89 / +41 78 215 80 30<br>
                UID: CHE-123.456.789
            </div>
        </div>

        <!-- Swiss Payment Slip Layout -->
        <div class="payment-slip">
            <table class="payment-slip-table">
                <tr>
                    <td class="payment-slip-left">
                        <div class="payment-slip-title">${t.receiptSlip}</div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.accountPayableTo}</span>
                            <div class="payment-slip-value">CH86 0900 0000 1636 3866 5</div>
                            <div class="payment-slip-value">SwissCleanMove Gebrekristos<br>Orpundstrasse 31<br>CH-2504 Biel/Bienne</div>
                        </div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.reference}</span>
                            <div class="payment-slip-value">00 00000 00000 00000 00000 00000</div>
                        </div>
                        <div class="payment-slip-block">
                            <span class="payment-slip-label">${t.payableBy}</span>
                            <div class="payment-slip-value">${client.firstName} ${client.lastName}<br>${client.address || ''}<br>${client.postalCode || ''} ${client.location || ''}</div>
                        </div>
                    </td>
                    <td class="payment-slip-right">
                        <div class="payment-slip-title">${t.paymentPart}</div>
                        <div class="payment-slip-amount-row">
                            <div style="flex: 1;">
                                <div class="payment-slip-block">
                                    <span class="payment-slip-label">${t.accountPayableTo}</span>
                                    <div class="payment-slip-value">CH86 0900 0000 1636 3866 5</div>
                                    <div class="payment-slip-value">SwissCleanMove Gebrekristos<br>Orpundstrasse 31<br>CH-2504 Biel/Bienne</div>
                                </div>
                                <div class="payment-slip-block">
                                    <span class="payment-slip-label">${t.reference}</span>
                                    <div class="payment-slip-value">00 00000 00000 00000 00000 00000</div>
                                </div>
                                <div class="payment-slip-block">
                                    <span class="payment-slip-label">${t.payableBy}</span>
                                    <div class="payment-slip-value">${client.firstName} ${client.lastName}<br>${client.address || ''}<br>${client.postalCode || ''} ${client.location || ''}</div>
                                </div>
                            </div>
                            <div class="payment-slip-amount-box">
                                <div class="payment-slip-currency">${t.chf}</div>
                                <div class="payment-slip-amount">${client.totalPrice.toFixed(2)}</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>
  `
}
