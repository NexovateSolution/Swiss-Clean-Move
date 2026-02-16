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
  const translations = {
    en: {
      invoice: 'INVOICE',
      invoiceNumber: 'Invoice Number',
      date: 'Date',
      billTo: 'Bill To',
      service: 'Service',
      totalPrice: 'Total Price',
      paidAmount: 'Paid Amount',
      balance: 'Balance Due',
      paymentHistory: 'Payment History',
      paymentDate: 'Date',
      amount: 'Amount',
      method: 'Method',
      notes: 'Notes',
      thankYou: 'Thank you for your business!',
      contact: 'Contact Us',
      status: 'Status',
      receiptSlip: 'Payment Slip',
      paymentPart: 'Payment Slip',
      accountPayableTo: 'Account / Payable to',
      reference: 'Reference',
      payableBy: 'Payable by',
      currency: 'Currency',
      chf: 'CHF'
    },
    de: {
      invoice: 'RECHNUNG',
      invoiceNumber: 'Rechnungsnummer',
      date: 'Datum',
      billTo: 'Rechnung an',
      service: 'Dienstleistung',
      totalPrice: 'Gesamtpreis',
      paidAmount: 'Bezahlter Betrag',
      balance: 'Offener Betrag',
      paymentHistory: 'Zahlungshistorie',
      paymentDate: 'Datum',
      amount: 'Betrag',
      method: 'Methode',
      notes: 'Notizen',
      thankYou: 'Vielen Dank für Ihr Vertrauen!',
      contact: 'Kontakt',
      status: 'Status',
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
      invoiceNumber: 'Numéro de facture',
      date: 'Date',
      billTo: 'Facturer à',
      service: 'Service',
      totalPrice: 'Prix total',
      paidAmount: 'Montant payé',
      balance: 'Solde dû',
      paymentHistory: 'Historique des paiements',
      paymentDate: 'Date',
      amount: 'Montant',
      method: 'Méthode',
      notes: 'Notes',
      thankYou: 'Merci pour votre confiance!',
      contact: 'Contact',
      status: 'Statut',
      receiptSlip: 'Reçu',
      paymentPart: 'Partie paiement',
      accountPayableTo: 'Compte / Payable à',
      reference: 'Référence',
      payableBy: 'Payable par',
      currency: 'Devise',
      chf: 'CHF'
    }
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const statusColors = {
    PAID: '#10b981',
    PARTIAL: '#f59e0b',
    UNPAID: '#ef4444'
  }

  const statusColor = statusColors[client.status as keyof typeof statusColors] || '#6b7280'

  const paymentSlip = {
    account: 'CH86 0900 0000 1636 3866 5',
    payableTo: ['SwissCleanMove Gebrekristos', 'Orpundstrasse 31', 'CH-2504 Biel/Bienne'],
    reference: '00 00000 00000 00000 00000 00000'
  }

  const slipAmount = typeof client.balance === 'number' ? client.balance : client.totalPrice

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .company-tagline {
          font-size: 14px;
          opacity: 0.9;
        }
        .invoice-title {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
          color: #059669;
        }
        .info-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .info-box {
          flex: 1;
          padding: 15px;
          background: #f9fafb;
          border-radius: 8px;
          margin: 0 10px;
        }
        .info-box h3 {
          margin-top: 0;
          color: #059669;
          font-size: 14px;
          text-transform: uppercase;
        }
        .info-box p {
          margin: 5px 0;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .details-table th {
          background: #059669;
          color: white;
          padding: 12px;
          text-align: left;
        }
        .details-table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .total-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 16px;
        }
        .total-row.grand {
          font-size: 20px;
          font-weight: bold;
          color: #059669;
          border-top: 2px solid #059669;
          padding-top: 15px;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          color: #6b7280;
        }
        .payment-history {
          margin-top: 30px;
        }
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
        .payment-slip-amount {
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 0.2px;
        }
        .payment-slip-currency {
          font-size: 12px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">SwissCleanMove</div>
        <div class="company-tagline">REINIGUNG • UMZUG • ENTSORGUNG</div>
      </div>

      <div class="invoice-title">${t.invoice}</div>

      <div class="info-section">
        <div class="info-box">
          <h3>${t.invoiceNumber}</h3>
          <p><strong>${client.id.substring(0, 8).toUpperCase()}</strong></p>
          <h3 style="margin-top: 15px;">${t.date}</h3>
          <p>${new Date(client.serviceDate || client.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="info-box">
          <h3>${t.billTo}</h3>
          <p><strong>${client.firstName} ${client.lastName}</strong></p>
          <p>${client.email || ''}</p>
          <p>${client.phone}</p>
          <p>${client.address || ''}</p>
        </div>
      </div>

      <table class="details-table">
        <thead>
          <tr>
            <th>${t.service}</th>
            <th>${t.status}</th>
            <th style="text-align: right;">${t.totalPrice}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${client.serviceType}</strong></td>
            <td><span class="status-badge" style="background: ${statusColor};">${client.status}</span></td>
            <td style="text-align: right;"><strong>CHF ${client.totalPrice.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>${t.totalPrice}:</span>
          <span>CHF ${client.totalPrice.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>${t.paidAmount}:</span>
          <span style="color: #10b981;">CHF ${(client.paidAmount || 0).toFixed(2)}</span>
        </div>
        <div class="total-row grand">
          <span>${t.balance}:</span>
          <span>CHF ${(client.balance || 0).toFixed(2)}</span>
        </div>
      </div>

      ${client.payments && client.payments.length > 0 ? `
        <div class="payment-history">
          <h3 style="color: #059669;">${t.paymentHistory}</h3>
          <table class="details-table">
            <thead>
              <tr>
                <th>${t.paymentDate}</th>
                <th>${t.amount}</th>
                <th>${t.method}</th>
                <th>${t.notes}</th>
              </tr>
            </thead>
            <tbody>
              ${client.payments.map((payment: any) => `
                <tr>
                  <td>${new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td>CHF ${payment.amount.toFixed(2)}</td>
                  <td>${payment.method}</td>
                  <td>${payment.notes || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

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
                <div class="payment-slip-value">${t.chf}</div>
              </div>

              <div class="payment-slip-block">
                <span class="payment-slip-label">${t.amount}</span>
                <div class="payment-slip-value">${t.chf} ${Number(slipAmount || 0).toFixed(2)}</div>
              </div>

              <div class="payment-slip-block" style="margin-bottom: 0;">
                <span class="payment-slip-label">${t.payableBy}</span>
                <div class="payment-slip-value">${client.firstName} ${client.lastName}</div>
                <div class="payment-slip-value">${client.address || ''}</div>
                <div class="payment-slip-value">${client.postalCode || ''} ${client.location || ''}</div>
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
                    <div class="payment-slip-value">${client.firstName} ${client.lastName}</div>
                    <div class="payment-slip-value">${client.address || ''}</div>
                    <div class="payment-slip-value">${client.postalCode || ''} ${client.location || ''}</div>
                  </div>
                </div>

                <div>
                  <div class="payment-slip-amount-box">
                    <div class="payment-slip-currency">${t.chf}</div>
                    <div class="payment-slip-amount">${t.chf} ${Number(slipAmount || 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="footer">
        <p style="font-size: 18px; color: #059669; font-weight: bold;">${t.thankYou}</p>
        <p style="margin-top: 20px;">
          <strong>${t.contact}:</strong><br>
          SwissCleanMove<br>
          Orpundstrasse 31, 2504 Biel/Bienne<br>
          Tel: +41 76 488 36 89 / +41 78 215 80 30<br>
          Email: info@swisscleanmove.ch<br>
          UID: CHE-123.456.789
        </p>
      </div>
    </body>
    </html>
  `
}
