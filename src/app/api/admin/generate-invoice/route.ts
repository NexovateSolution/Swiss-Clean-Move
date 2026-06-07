import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'
import { join } from 'path'
import { readFileSync } from 'fs'

import { createTranslator } from '@/lib/translations';

export async function POST(request: NextRequest) {
    try {
        const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
        const logoBuffer = readFileSync(logoPath);
        const LOGO_BASE64 = logoBuffer.toString('base64');

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
                remarks: 'Bemerkungen:',
                invoiceRef: 'Referenz',
                invoiceDate: 'Rechnungsdatum',
                paymentDeadline: 'Zahlungsfrist',
                acceptancePoint: 'Annahmestelle',
                additionalInfoQr: 'Zusätzliche Informationen',
                invoiceLabel: 'Rechnung'
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
                remarks: 'Remarques:',
                invoiceRef: 'Référence',
                invoiceDate: 'Date de facture',
                paymentDeadline: 'Délai de paiement',
                acceptancePoint: 'Point de dépôt',
                additionalInfoQr: 'Informations supplémentaires',
                invoiceLabel: 'Facture'
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
                remarks: 'Remarks:',
                invoiceRef: 'Reference',
                invoiceDate: 'Invoice Date',
                paymentDeadline: 'Payment Deadline',
                acceptancePoint: 'Acceptance point',
                additionalInfoQr: 'Additional information',
                invoiceLabel: 'Invoice'
            }
        }[language as 'en' | 'de' | 'fr'] || { /* fallback */ };

        const orderNumber = `#FE-${String(Date.now()).slice(-6)}`
        const currentDate = new Date().toLocaleDateString()

        // Name formatting with prefix logic
        const clientName = `${client.prefix ? client.prefix + ' ' : ''}${client.firstName} ${client.lastName}`

        const translator = createTranslator(language as string);
        const { tKey, tVal } = translator;

        let formattedRemarks: string[] = [];
        const SKIP_KEYS = new Set(['totalPrice', 'paidAmount', 'fromDate', 'untilDate', 'nameFirstName', 'emailAddress', 'telephone', 'streetNo', 'zipCity', 'address', 'urgency', 'frequency', 'serviceTimes', 'startDate', 'handoverDate', 'desiredStart', 'handoverTime', 'company']);

        if ((client as any).data && typeof (client as any).data === 'object' && Object.keys((client as any).data).length > 0) {
            const clientData = (client as any).data as Record<string, any>;
            Object.entries(clientData).forEach(([key, val]) => {
                if (SKIP_KEYS.has(key) || !val || (Array.isArray(val) && val.length === 0)) return;
                
                let displayVal = '';
                if (Array.isArray(val)) {
                    displayVal = val.map(v => tVal(String(v))).join(', ');
                } else if (typeof val === 'boolean') {
                    displayVal = val ? tVal('yes') : tVal('no');
                } else {
                    displayVal = isNaN(Number(val)) ? tVal(String(val)) : String(val);
                }
                
                formattedRemarks.push(`${tKey(key)}: ${displayVal}`);
            });
        } else if (client.remarks1) {
            const parts = client.remarks1.split(' | ');
            parts.forEach((p: string) => {
                const [k, ...v] = p.split(': ');
                if (!k || v.length === 0) {
                    formattedRemarks.push(p); return;
                }
                const rawKey = k.trim();
                const rawVal = v.join(': ').trim();
                const vals = rawVal.split(', ').map((rv: string) => tVal(rv));
                formattedRemarks.push(`${tKey(rawKey)}: ${vals.join(', ')}`);
            });
        }

        let invoiceAddr = client.address || '';
        let invoiceZip = client.postalCode || '';
        let invoiceCity = client.location || '';
        if (invoiceAddr && !invoiceZip && !invoiceCity) {
            const match = invoiceAddr.match(/(.+?)(?:,\s*|\s+)(\d{4})\s+(.+)/);
            if (match) {
                invoiceAddr = match[1].trim();
                invoiceZip = match[2];
                invoiceCity = match[3].trim();
            }
        }

        const serviceMap: Record<string, Record<string, string>> = {
            'House Cleaning': { en: 'House Cleaning', de: 'Hausreinigung', fr: 'Nettoyage de maison' },
            'Apartment Cleaning': { en: 'Apartment Cleaning', de: 'Wohnungsreinigung', fr: "Nettoyage d'appartement" },
            'Stairwell Cleaning': { en: 'Stairwell Cleaning', de: 'Treppenhausreinigung', fr: "Nettoyage de cage d'escalier" },
            'Office Cleaning': { en: 'Office Cleaning', de: 'Büroreinigung', fr: 'Nettoyage de bureau' },
            'Final Cleaning': { en: 'Final Cleaning', de: 'Endreinigung / Umzugsreinigung', fr: 'Nettoyage de fin de bail' },
            'Window Cleaning': { en: 'Window Cleaning', de: 'Fensterreinigung', fr: 'Nettoyage de vitres' },
            'Relocation': { en: 'Relocation', de: 'Umzug', fr: 'Déménagement' },
            'Combo Service': { en: 'Combo Service', de: 'Kombi-Angebot', fr: 'Offre combinée' },
            'Disposal': { en: 'Disposal', de: 'Räumung / Entsorgung', fr: 'Débarras / Élimination' },
            'Gastronomy Cleaning': { en: 'Gastronomy Cleaning', de: 'Gastronomiereinigung', fr: 'Nettoyage gastronomique' },
            'Medical Cleaning': { en: 'Medical Cleaning', de: 'Praxisreinigung', fr: 'Nettoyage de cabinet médical' },
            'Construction Cleaning': { en: 'Construction Cleaning', de: 'Baureinigung', fr: 'Nettoyage de fin de chantier' },
            'Property Maintenance': { en: 'Property Maintenance', de: 'Hauswartung', fr: 'Conciergerie / Entretien' },
            'Special Cleaning': { en: 'Special Cleaning', de: 'Spezialreinigung', fr: 'Nettoyage spécial' },
            'Household Helping': { en: 'Household Helping', de: 'Haushaltshilfe', fr: 'Aide ménagère' },
            'Maintenance Cleaning': { en: 'Maintenance Cleaning', de: 'Unterhaltsreinigung', fr: "Nettoyage d'entretien" }
        };

        const floorMap: Record<string, Record<string, string>> = {
            'Ground floor': { en: 'Ground floor', de: 'Erdgeschoss', fr: 'Rez-de-chaussée' },
            '1st floor': { en: '1st floor', de: '1. Stockwerk', fr: '1er étage' },
            '2nd floor': { en: '2nd floor', de: '2. Stockwerk', fr: '2ème étage' },
            '3rd floor': { en: '3rd floor', de: '3. Stockwerk', fr: '3ème étage' },
            '4th floor': { en: '4th floor', de: '4. Stockwerk', fr: '4ème étage' },
            '5th floor': { en: '5th floor', de: '5. Stockwerk', fr: '5ème étage' },
            '6+ floor': { en: '6+ floor', de: '6+ Stockwerk', fr: '6ème étage et plus' }
        };

        const translatedService = client.serviceType ? (serviceMap[client.serviceType]?.[language as string] || client.serviceType) : '';
        const translatedFloor = client.floor ? (floorMap[client.floor]?.[language as string] || client.floor) : '';

        if (translatedService) {
            t.title = {
                de: `${translatedService} Auftragsbestätigung`,
                fr: `Confirmation de commande de ${translatedService.toLowerCase()}`,
                en: `${translatedService} Order Confirmation`
            }[language as 'en' | 'de' | 'fr'] || t.title;
        }

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
        <style>${cssStyles}</style>
    </head>
    <body>
        <!-- Header -->
        <div class="header-top">
            <div class="header-logo">
                <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove">
                <div class="header-tagline">Reinigung &middot; Umzug &middot; Facility Service</div>
            </div>
            <div class="header-contact">
                <div class="contact-line"><span class="contact-icon">📞</span> +41 78 215 80 30</div>
                <div class="contact-line"><span class="contact-icon">✉</span> info@swisscleanmove.ch</div>
                <div class="contact-line"><span class="contact-icon">🌐</span> www.swisscleanmove.ch</div>
                <div class="contact-line"><span class="contact-icon">📍</span> Orpundstrasse 31, 2504 Biel</div>
            </div>
        </div>

        <!-- Top Cards -->
        <div class="top-cards">
            <div class="customer-card">
                <div class="customer-card-header">
                    <div class="customer-card-icon">👤</div>
                    <div class="customer-card-title">KUNDE</div>
                </div>
                <div class="customer-address">
                    ${clientName}<br>
                    <span>${invoiceAddr ? invoiceAddr + '<br>' : ''}${invoiceZip} ${invoiceCity}</span>
                </div>
            </div>
            <div class="order-card">
                <div class="order-card-header">${t.orderNumber?.toUpperCase() || 'AUFTRAGSNUMMER'}</div>
                <div class="order-card-body">
                    <div class="order-number">${orderNumber}</div>
                    <div class="order-ref-title">${t.invoiceRef?.toUpperCase() || 'KUNDENREFERENZ'}</div>
                    <div class="order-ref-val">-</div>
                </div>
            </div>
        </div>

        <!-- Title -->
        <div class="main-title">${t.title}</div>
        <div class="sub-title">Professionelle Reinigungs- und Umzugsdienstleistungen nach Schweizer Qualitätsstandard.</div>

        <!-- Info Columns -->
        <div class="info-columns">
            <!-- KUNDE -->
            <div class="info-col">
                <div class="info-col-title">KUNDE</div>
                <div class="info-row"><span class="info-icon">👤</span><span class="info-val"><span>${clientName}</span></span></div>
                <div class="info-row"><span class="info-icon">📍</span><span class="info-val"><span>${invoiceAddr}<br>${invoiceZip} ${invoiceCity}</span></span></div>
                <div class="info-row"><span class="info-icon">📞</span><span class="info-val"><span>${client.phone || '-'}</span></span></div>
                <div class="info-row"><span class="info-icon">✉</span><span class="info-val"><span>${client.email || '-'}</span></span></div>
            </div>
            <!-- AUFTRAGSDATEN -->
            <div class="info-col">
                <div class="info-col-title">AUFTRAGSDATEN</div>
                <div class="info-row"><span class="info-icon">📅</span><span class="info-label">Leistungsdatum:</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleDateString()}</span></div>
                <div class="info-row"><span class="info-icon">🕒</span><span class="info-label">Startzeit:</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</span></div>
                <div class="info-row"><span class="info-icon">🕛</span><span class="info-label">Abgabezeit:</span><span class="info-val">${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</span></div>
                <div class="info-row"><span class="info-icon">👤</span><span class="info-label">Ansprechpartner:</span><span class="info-val">${clientName}</span></div>
                <div class="info-row"><span class="info-icon">💳</span><span class="info-label">Zahlungsart:</span><span class="info-val">Rechnung (QR)</span></div>
            </div>
            <!-- OBJEKT -->
            <div class="info-col">
                <div class="info-col-title">OBJEKT</div>
                <div class="info-row" style="margin-bottom: 15px;"><span class="info-icon">🏢</span><span class="info-val"><span>${client.address || '-'}<br>${client.postalCode || ''} ${client.location || ''}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">Objekttyp:</span><span class="info-val"><span>${client.propertyType || '-'}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">Stockwerk:</span><span class="info-val"><span>${translatedFloor || client.floor || '-'}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">Fläche:</span><span class="info-val"><span>${client.squareMeters ? 'ca. ' + client.squareMeters + ' m²' : '-'}</span></span></div>
            </div>
        </div>

        <!-- Service Table -->
        <div class="service-section">
            <table class="service-table">
                <thead>
                    <tr>
                        <th class="col-nr">NR.</th>
                        <th class="col-le">LEISTUNG</th>
                        <th class="col-desc">BESCHREIBUNG</th>
                        <th class="col-qty">MENGE</th>
                        <th class="col-price">EINZELPREIS</th>
                        <th class="col-total">GESAMTPREIS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="col-nr">1</td>
                        <td class="col-le">${translatedService}</td>
                        <td class="col-desc">${formattedRemarks.length > 0 ? formattedRemarks.join(', ') : 'Professionelle Dienstleistung gemäss Schweizer Standard.'}</td>
                        <td class="col-qty">1</td>
                        <td class="col-price">CHF ${(client.totalPrice || 0).toFixed(2)}</td>
                        <td class="col-total">CHF ${(client.totalPrice || 0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div class="table-bottom-row">
                <div class="scope-box">
                    <div class="scope-icon">ℹ️</div>
                    <div class="scope-text">
                        <strong>LEISTUNGSUMFANG</strong>
                        Alle Arbeiten werden nach höchsten Schweizer Qualitätsstandards ausgeführt. ${t.guarantee}
                    </div>
                </div>
                <div class="total-box">
                    <div class="total-box-title">TOTAL FESTPREIS INKL. MWST.</div>
                    <div class="total-box-amount">CHF ${(client.totalPrice || 0).toFixed(2)}</div>
                    <div class="total-box-sub">Festpreis - keine zusätzlichen Kosten</div>
                </div>
            </div>
        </div>

        <!-- Badges -->
        <div class="badges-row">
            <div class="badge">
                <div class="badge-icon">🛡️</div>
                <div class="badge-text"><strong>ABNAHMEGARANTIE</strong>Zufriedenheitsgarantie bei Übergabe. Mängel werden kostenlos nachgebessert.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">✅</div>
                <div class="badge-text"><strong>HAFTPFLICHTVERSICHERT</strong>Vollständig versichert für Ihre Sicherheit und maximalen Schutz.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">⭐</div>
                <div class="badge-text"><strong>SCHWEIZER QUALITÄT</strong>Professionell, zuverlässig und pünktlich - dafür stehen wir ein.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">🌿</div>
                <div class="badge-text"><strong>UMWELTFREUNDLICH</strong>Wir verwenden umweltfreundliche Reinigungsmittel und nachhaltige Methoden.</div>
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures-row">
            <div class="sig-box">
                <div class="sig-title">SWISSCLEANMOVE</div>
                <div class="sig-name">Dawit Gebrekristos</div>
                <div class="sig-details">
                    Dawit Gebrekristos<br>Geschäftsführer<br>
                    <table>
                        <tr><td>Datum:</td><td>${new Date().toLocaleDateString()}</td></tr>
                        <tr><td>Ort:</td><td>Biel</td></tr>
                    </table>
                </div>
            </div>
            <div class="sig-box">
                <div class="sig-title">KUNDE</div>
                <div class="sig-details" style="margin-top: 15px;">
                    <table>
                        <tr><td>Name:</td><td><span class="sig-line"></span></td></tr>
                        <tr><td>Datum:</td><td><span class="sig-line"></span></td></tr>
                        <tr><td>Unterschrift:</td><td><span class="sig-line"></span></td></tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Timing & Comm -->
        <div class="timing-row">
            <div class="timing-box">
                <div class="timing-icon">📅</div>
                <div class="timing-text">
                    <div><strong>LEISTUNGSZEITRAUM</strong>Leistungsbeginn:<br>Leistungsende:</div>
                    <div><br>${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr<br>${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</div>
                </div>
            </div>
            <div class="timing-box">
                <div class="timing-icon">👤</div>
                <div class="timing-text">
                    <div><strong>KOMMUNIKATION</strong>Für Fragen oder Änderungen kontaktieren Sie uns bitte rechtzeitig.</div>
                </div>
            </div>
        </div>

        <!-- Footer Banner -->
        <div class="footer-banner">
            <div class="footer-banner-title">🏦 KONTOINFORMATIONEN</div>
            <div class="footer-banner-items">
                <div class="footer-item"><span>Bankname</span>PostFinance AG</div>
                <div class="footer-item"><span>IBAN</span>CH86 0900 0000 1636 3866 5</div>
                <div class="footer-item"><span>Kontoinhaber</span>Dawit Gebrekristos / SwissCleanMove</div>
                <div class="footer-item"><span>Konto-Nr.</span>16-363866-5</div>
                <div class="footer-item"><span>Clearing-Nr.</span>09000</div>
            </div>
        </div>

        <div style="page-break-before: always;"></div>

        <!-- Payment Slip Header -->
        <div class="header-top" style="margin-bottom: 20px;">
            <div class="header-logo">
                <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove">
                <div class="header-tagline">Reinigung &middot; Umzug &middot; Facility Service</div>
            </div>
            <div class="header-contact">
                <div class="contact-line"><span class="contact-icon">📞</span> +41 78 215 80 30</div>
                <div class="contact-line"><span class="contact-icon">✉</span> info@swisscleanmove.ch</div>
                <div class="contact-line"><span class="contact-icon">🌐</span> www.swisscleanmove.ch</div>
                <div class="contact-line"><span class="contact-icon">📍</span> Orpundstrasse 31, 2504 Biel</div>
            </div>
        </div>

        <div class="payment-slip">
            <div class="scissors-line-horizontal">
                <span class="scissors-icon">✂</span>
                <span style="background: #fff; padding: 0 10px; font-size: 10px; color: #666;">Vor der Einzahlung abzutrennen / A détacher avant le versement / Da staccare prima del versamento</span>
            </div>
            
            <table class="payment-slip-table">
                <tr>
                    <td class="payment-slip-left pt-receipt">
                        <div class="scissors-line-vertical">
                            <span class="scissors-icon-v">✂</span>
                        </div>
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

                        <div class="payment-slip-block" style="margin-top: 15px;">
                            <span class="payment-slip-label">${t.payableBy}</span>
                            <div class="payment-slip-value">${clientName}</div>
                            <div class="payment-slip-value">${invoiceAddr}<br>${invoiceZip} ${invoiceCity}</div>
                        </div>

                        <div class="amount-area-receipt">
                            <div class="amount-col">
                                <span class="payment-slip-label">${t.currency}</span>
                                <div class="payment-slip-value">CHF</div>
                            </div>
                            <div class="amount-col">
                                <span class="payment-slip-label">${t.amount}</span>
                                <div class="payment-slip-value">${(client.totalPrice || 0).toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <div style="font-size: 8px; color: #111; margin-top: 15px; text-align: right;">${t.acceptancePoint}</div>
                    </td>
                    <td class="payment-slip-right pt-payment">
                        <div class="payment-slip-title">${t.paymentPart}</div>
                        
                        <div class="payment-part-content">
                            <!-- Left Column of Payment Part -->
                            <div class="payment-col-left">
                                <div class="qr-code-wrapper">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=174x174&data=https%3A%2F%2Fswisscleanmove.ch&margin=0" alt="QR Code">
                                    <!-- Swiss Cross Overlay -->
                                    <div class="qr-cross">
                                        <div style="width: 28px; height: 28px; background: #000; border: 2px solid #fff; position: relative;">
                                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 18px; height: 4px; background: #fff;"></div>
                                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 18px; background: #fff;"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="amount-area-payment">
                                    <div class="amount-col">
                                        <span class="payment-slip-label">${t.currency}</span>
                                        <div class="payment-slip-value">CHF</div>
                                    </div>
                                    <div class="amount-col">
                                        <span class="payment-slip-label">${t.amount}</span>
                                        <div class="payment-slip-value">${(client.totalPrice || 0).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column of Payment Part -->
                            <div class="payment-col-right">
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
                                    <span class="payment-slip-label">${t.additionalInfoQr}</span>
                                    <div class="payment-slip-value">${t.invoiceLabel} ${orderNumber}</div>
                                </div>

                                <div class="payment-slip-block" style="margin-top: 15px;">
                                    <span class="payment-slip-label">${t.payableBy}</span>
                                    <div class="payment-slip-value">${clientName}</div>
                                    <div class="payment-slip-value">${client.address || ''}<br>${client.postalCode || ''} ${client.location || ''}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>`

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
