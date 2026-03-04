import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'

const LOGO_BASE64 = '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'

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

        const t: any = {
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
                teamSignature: 'Unterschrift Teamleiter'
            },
            fr: {
                title: 'Confirmation de commande de nettoyage',
                orderNumber: 'Numéro de commande',
                date: 'Date de nettoyage',
                clientStartTime: 'Début chez le client',
                cleaningCompleted: 'Remise du nettoyage',
                paymentCondition: 'Condition de paiement',
                thankYou: 'Nous sommes à votre disposition pour répondre à vos questions.',
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
                teamSignature: 'Signature du chef d\'équipe'
            },
            en: {
                title: 'Cleaning Order Confirmation',
                orderNumber: 'Order Number',
                date: 'Cleaning Date',
                clientStartTime: 'Start at Client',
                cleaningCompleted: 'Cleaning Handover',
                paymentCondition: 'Payment Condition',
                thankYou: 'We are at your disposal to answer your questions.',
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
                teamSignature: 'Team Leader Signature'
            }
        }[language as 'en' | 'de' | 'fr'] || { /* fallback */ };

        const orderNumber = `#FE-${String(Date.now()).slice(-6)}`
        const currentDate = new Date().toLocaleDateString()

        // Name formatting with prefix logic
        const clientName = `${client.prefix ? client.prefix + ' ' : ''}${client.firstName} ${client.lastName}`

        const paymentSlip = {
            account: 'CH86 0900 0000 1636 3866 5',
            payableTo: ['SwissCleanMove Gebrekristos', 'Orpundstrasse 31', 'CH-2504 Biel/Bienne'],
            reference: '00 00000 00000 00000 00000 00000'
        }

        const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; font-size: 14px; line-height: 1.5; }
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
            .footer { position: fixed; bottom: 20px; left: 20px; right: 20px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
            .page-number { position: fixed; bottom: 10px; right: 20px; font-size: 10px; color: #666; }
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
                .footer { position: fixed; bottom: 15px; }
                .page-number { position: fixed; bottom: 5px; }
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
                UID: CHE-123.456.789
            </div>
        </div>

        <div class="title">${t.title}</div>

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
                            ${client.floor ? `Stockwerk: ${client.floor}<br>` : ''}
                            ${client.elevator === 'yes' ? 'Mit Lift' : 'Ohne Lift'}<br>
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
            <h4 style="margin-bottom: 5px; color: #333;">Bemerkungen:</h4>
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

        <div class="footer">
            Copyright © ${t.companyName} ${new Date().getFullYear()}<br>
            Designed by Saran Solutions
        </div>

        <div class="page-number">
            ${t.page} 1 of 2
        </div>

        <div style="page-break-before: always;"></div>

        <div class="header">
            <div class="logo-section">
                 <img src="data:image/jpeg;base64,${LOGO_BASE64}" alt="SwissCleanMove" style="height:140px;width:auto;">
            </div>
            <div class="company-info">
                <strong>SwissCleanMove</strong><br>
                Orpundstrasse 31, 2504 Biel/Bienne<br>
                info@swisscleanmove.ch<br>
                📞 +41 76 488 36 89 / +41 78 215 80 30<br>
                UID: CHE-123.456.789
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

        <div class="page-number">
            ${t.page} 2 of 2
        </div>
    </body>
    </html>
    `

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
