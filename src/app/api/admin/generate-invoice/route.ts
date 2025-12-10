import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'

interface InvoiceTranslations {
  [key: string]: {
    title: string
    orderNumber: string
    date: string
    clientStartTime: string
    cleaningCompleted: string
    paymentCondition: string
    thankYou: string
    regards: string
    companyName: string
    address: string
    phone: string
    email: string
    uid: string
    room: string
    guarantee: string
    receiptInfo: string
    customerSignature: string
    teamSignature: string
    page: string
    service: string
    details: string
    amount: string
    subtotal: string
    vat: string
    total: string
    paymentMethod: string
    cashPayment: string
    serviceDetails: string
    additionalInfo: string
    location: string
    ort: string
    datum: string
    receiptSlip: string
    paymentPart: string
    accountPayableTo: string
    reference: string
    payableBy: string
    currency: string
    additionalInformation: string
    billingAccount: string
    month: string
    payableUntil: string
  }
}

const translations: InvoiceTranslations = {
  de: {
    title: 'Reinigung Auftragsbestätigung',
    orderNumber: 'Bestellnummer',
    date: 'Reinigungsdatum',
    clientStartTime: 'Beginn beim Kunden',
    cleaningCompleted: 'Reinigung Übergabe',
    paymentCondition: 'Zahlungsbedingung',
    thankYou: 'Wir stehen Ihnen gerne für Fragen zur Verfügung.',
    regards: 'Mit freundlichen Grüßen',
    companyName: 'SwissCleanMove',
    address: 'Musterstrasse 123, 8000 Zürich',
    phone: '076 488 36 89',
    email: 'info@swisscleanmove.ch',
    uid: 'UID: CHE-123.456.789',
    room: 'Zimmer',
    guarantee: 'Übergabegarantie Inkl. 8.1% MwSt Pauschal',
    receiptInfo: 'Empfangsschein',
    customerSignature: 'Unterschrift Kunde',
    teamSignature: 'Unterschrift Teamleiter',
    page: 'Seite',
    service: 'Leistung',
    details: 'Details',
    amount: 'Betrag',
    subtotal: 'Zwischensumme',
    vat: 'MwSt 8.1%',
    total: 'Gesamtbetrag',
    paymentMethod: 'Zahlungsart',
    cashPayment: 'Barzahlung nach Übergabedatum beim Teamleiter',
    serviceDetails: 'Leistungsdetails',
    additionalInfo: 'Zusätzliche Informationen',
    location: 'Ort',
    ort: 'Ort',
    datum: 'Datum',
    receiptSlip: 'Empfangsschein',
    paymentPart: 'Zahlteil',
    accountPayableTo: 'Konto / Zahlbar an',
    reference: 'Referenz',
    payableBy: 'Zahlbar durch',
    currency: 'Währung CHF',
    additionalInformation: 'Zusätzliche Informationen',
    billingAccount: 'Rechnungskonto',
    month: 'Monat',
    payableUntil: 'Zahlbar bis'
  },
  fr: {
    title: 'Confirmation de commande de nettoyage',
    orderNumber: 'Numéro de commande',
    date: 'Date de nettoyage',
    clientStartTime: 'Début chez le client',
    cleaningCompleted: 'Remise du nettoyage',
    paymentCondition: 'Condition de paiement',
    thankYou: 'Nous sommes à votre disposition pour répondre à vos questions.',
    regards: 'Cordialement, merci',
    companyName: 'SwissCleanMove',
    address: 'Musterstrasse 123, 8000 Zürich',
    phone: '076 488 36 89',
    email: 'info@swisscleanmove.ch',
    uid: 'UID: CHE-123.456.789',
    room: 'Chambre',
    guarantee: 'Garantie de remise Incl. 8.1% TVA forfaitaire',
    receiptInfo: 'Informations de réception',
    customerSignature: 'Signature du client',
    teamSignature: 'Signature du chef d\'équipe',
    page: 'Page',
    service: 'Service',
    details: 'Détails',
    amount: 'Montant',
    subtotal: 'Sous-total',
    vat: 'TVA 8.1%',
    total: 'Total',
    paymentMethod: 'Mode de paiement',
    cashPayment: 'Paiement en espèces après la date de remise au chef des équipes',
    serviceDetails: 'Détails du service',
    additionalInfo: 'Informations supplémentaires',
    location: 'Lieu',
    ort: 'Lieu',
    datum: 'Date',
    receiptSlip: 'Reçu',
    paymentPart: 'Partie paiement',
    accountPayableTo: 'Compte / Payable à',
    reference: 'Référence',
    payableBy: 'Payable par',
    currency: 'Devise CHF',
    additionalInformation: 'Informations supplémentaires',
    billingAccount: 'Compte de facturation',
    month: 'Mois',
    payableUntil: 'Payable jusqu\'au'
  },
  en: {
    title: 'Cleaning Order Confirmation',
    orderNumber: 'Order Number',
    date: 'Cleaning Date',
    clientStartTime: 'Start at Client',
    cleaningCompleted: 'Cleaning Handover',
    paymentCondition: 'Payment Condition',
    thankYou: 'We are at your disposal to answer your questions.',
    regards: 'Best regards, thank you',
    companyName: 'SwissCleanMove',
    address: 'Musterstrasse 123, 8000 Zürich',
    phone: '076 488 36 89',
    email: 'info@swisscleanmove.ch',
    uid: 'UID: CHE-123.456.789',
    room: 'Room',
    guarantee: 'Handover guarantee Incl. 8.1% VAT flat rate',
    receiptInfo: 'Receipt Information',
    customerSignature: 'Customer Signature',
    teamSignature: 'Team Leader Signature',
    page: 'Page',
    service: 'Service',
    details: 'Details',
    amount: 'Amount',
    subtotal: 'Subtotal',
    vat: 'VAT 8.1%',
    total: 'Total',
    paymentMethod: 'Payment Method',
    cashPayment: 'Cash payment after handover date to team leader',
    serviceDetails: 'Service Details',
    additionalInfo: 'Additional Information',
    location: 'Location',
    ort: 'Location',
    datum: 'Date',
    receiptSlip: 'Receipt',
    paymentPart: 'Payment Part',
    accountPayableTo: 'Account / Payable to',
    reference: 'Reference',
    payableBy: 'Payable by',
    currency: 'Currency CHF',
    additionalInformation: 'Additional Information',
    billingAccount: 'Billing Account',
    month: 'Month',
    payableUntil: 'Payable until'
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { clientId, language = 'de' } = await request.json()

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 })
    }

    // Fetch client data
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const t = translations[language] || translations.de
    const orderNumber = `#FE-${String(Date.now()).slice(-6)}`
    const currentDate = new Date().toLocaleDateString()

    // Generate HTML for PDF
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                font-size: 14px;
                line-height: 1.5;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #999;
                padding-bottom: 15px;
            }
            .logo-section {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .house-logo {
                width: 80px;
                height: 80px;
                position: relative;
            }
            .house-roof {
                width: 0;
                height: 0;
                border-left: 40px solid transparent;
                border-right: 40px solid transparent;
                border-bottom: 35px solid #00CC00;
                position: absolute;
                top: 0;
                left: 0;
            }
            .house-body {
                width: 70px;
                height: 45px;
                background: #00CC00;
                position: absolute;
                bottom: 0;
                left: 5px;
            }
            .house-door {
                width: 20px;
                height: 25px;
                background: white;
                position: absolute;
                bottom: 0;
                left: 25px;
            }
            .company-name {
                display: flex;
                flex-direction: column;
            }
            .company-name h1 {
                margin: 0;
                font-size: 36px;
                color: #0066CC;
                font-weight: bold;
                font-family: 'Times New Roman', serif;
            }
            .company-name p {
                margin: 5px 0 0 0;
                font-size: 16px;
                color: #0066CC;
                font-weight: 500;
            }
            .company-info {
                text-align: right;
                font-size: 13px;
                color: #333;
                line-height: 1.8;
            }
            .company-info strong {
                font-size: 15px;
                color: #000;
            }
            .title {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #333;
                margin: 30px 0;
            }
            .order-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .client-info {
                float: right;
                width: 45%;
                background: #fff;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .service-details {
                clear: both;
                margin-top: 20px;
            }
            .service-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .service-table th,
            .service-table td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
            }
            .service-table th {
                background: #4CAF50;
                color: white;
                font-weight: bold;
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
                border-bottom: 2px solid #4CAF50;
                color: #4CAF50;
            }
            .payment-info {
                clear: both;
                margin-top: 40px;
                padding: 15px;
                background: #f0f8ff;
                border-left: 4px solid #4CAF50;
            }
            .signatures {
                display: flex;
                justify-content: space-between;
                margin-top: 60px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
            }
            .signature-box {
                width: 45%;
                text-align: center;
            }
            .signature-line {
                border-bottom: 1px solid #333;
                margin-bottom: 5px;
                height: 40px;
            }
            .footer {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                text-align: center;
                font-size: 10px;
                color: #666;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            }
            .page-number {
                position: fixed;
                bottom: 10px;
                right: 20px;
                font-size: 10px;
                color: #666;
            }
            @media print {
                body {
                    margin: 0;
                    padding: 15px;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .footer {
                    position: fixed;
                    bottom: 15px;
                }
                .page-number {
                    position: fixed;
                    bottom: 5px;
                }
                .header {
                    margin-bottom: 20px;
                }
                .service-table th {
                    background: #4CAF50 !important;
                    color: white !important;
                }
                .logo {
                    background: linear-gradient(135deg, #4CAF50, #45a049) !important;
                    color: white !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo-section">
                <div class="house-logo">
                    <div class="house-roof"></div>
                    <div class="house-body">
                        <div class="house-door"></div>
                    </div>
                </div>
                <div class="company-name">
                    <h1>SwissCleanMove</h1>
                    <p>Umzug&Reinigung</p>
                </div>
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Musterstrasse 123<br>
                8000 Zürich<br>
                info@swisscleanmove.ch<br>
                📞 +41 12 345 67 89<br>
                UID: CHE-123.456.789
            </div>
        </div>

        <div class="title">${t.title}</div>

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
                <div class="house-logo">
                    <div class="house-roof"></div>
                    <div class="house-body">
                        <div class="house-door"></div>
                    </div>
                </div>
                <div class="company-name">
                    <h1>SwissCleanMove</h1>
                    <p>Umzug&Reinigung</p>
                </div>
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Musterstrasse 123<br>
                8000 Zürich<br>
                info@swisscleanmove.ch<br>
                📞 +41 12 345 67 89<br>
                UID: CHE-123.456.789
            </div>
        </div>

        <!-- Swiss Payment Slip Layout -->
        <div style="margin-top: 50px; border: 2px solid #000; height: 400px;">
            <table style="width: 100%; height: 100%; border-collapse: collapse;">
                <tr>
                    <!-- Receipt Section -->
                    <td style="width: 35%; border-right: 1px solid #000; padding: 15px; vertical-align: top;">
                        <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold;">${t.receiptSlip}</h3>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="font-size: 11px;">${t.accountPayableTo}</strong><br>
                            <span style="font-size: 11px;">CH86 0900 0000 1636 3866 5</span><br>
                            <span style="font-size: 11px;">${t.companyName}</span><br>
                            <span style="font-size: 11px;">Musterstrasse 123</span><br>
                            <span style="font-size: 11px;">8000 Zürich</span>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <strong style="font-size: 11px;">${t.reference}</strong><br>
                            <span style="font-size: 11px;">${orderNumber}</span>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <strong style="font-size: 11px;">${t.payableBy}</strong><br>
                            <span style="font-size: 11px;">${client.firstName} ${client.lastName}</span><br>
                            <span style="font-size: 11px;">${client.address}</span>
                        </div>

                        <div style="position: absolute; bottom: 20px;">
                            <strong style="font-size: 12px;">CHF ${client.totalPrice || 900}</strong>
                        </div>
                    </td>

                    <!-- Payment Section -->
                    <td style="width: 65%; padding: 15px; vertical-align: top;">
                        <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold;">${t.paymentPart}</h3>
                        
                        <div style="display: flex; justify-content: space-between;">
                            <div style="width: 60%;">
                                <div style="margin-bottom: 15px;">
                                    <strong style="font-size: 11px;">${t.accountPayableTo}</strong><br>
                                    <span style="font-size: 11px;">CH86 0900 0000 1636 3866 5</span><br>
                                    <span style="font-size: 11px;">${t.companyName}</span><br>
                                    <span style="font-size: 11px;">Musterstrasse 123</span><br>
                                    <span style="font-size: 11px;">8000 Zürich</span>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <strong style="font-size: 11px;">${t.additionalInformation}</strong><br>
                                    <span style="font-size: 11px;">${t.billingAccount}: ${orderNumber}</span><br>
                                    <span style="font-size: 11px;">${t.month}:</span><br>
                                    <span style="font-size: 11px;">${t.payableUntil}:</span>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <strong style="font-size: 11px;">${t.reference}</strong><br>
                                    <span style="font-size: 11px;">${orderNumber}</span>
                                </div>

                                <div>
                                    <strong style="font-size: 11px;">${t.payableBy}</strong><br>
                                    <span style="font-size: 11px;">${client.firstName} ${client.lastName}</span><br>
                                    <span style="font-size: 11px;">${client.address}</span>
                                </div>
                            </div>

                            <div style="width: 35%; text-align: right;">
                                <div style="border: 1px solid #000; padding: 10px; text-align: center; margin-bottom: 20px;">
                                    <strong style="font-size: 14px;">${t.currency}</strong><br>
                                    <strong style="font-size: 16px;">${t.amount} ${client.totalPrice || 900}</strong>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="page-number">
            ${t.page} 2 of 2
        </div>
    </body>
    </html>
    `

    // Return HTML that can be printed to PDF by browser
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="invoice-${client.firstName}-${client.lastName}.html"`
      }
    })

  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 })
  }
}
