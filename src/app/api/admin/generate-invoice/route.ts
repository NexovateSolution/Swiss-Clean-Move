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
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; padding-bottom: 80px; font-size: 14px; line-height: 1.5; }
            
            /* ── New Premium Header ── */
            .header-new {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding-bottom: 20px;
                margin-bottom: 5px;
            }
            .header-logo {
                display: flex;
                flex-direction: column;
            }
            .header-logo img {
                height: 140px;
                width: auto;
                margin-bottom: 4px;
            }
            .header-tagline {
                font-size: 12px;
                color: #555;
                font-style: italic;
                letter-spacing: 1px;
                margin-left: 5px;
            }
            .header-contact {
                text-align: left;
                font-size: 12px;
                color: #333;
                line-height: 1.8;
                margin-top: 10px;
            }
            .header-contact-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 2px;
            }
            .header-contact-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 22px;
                height: 22px;
                background: #555;
                color: #fff;
                border-radius: 50%;
                font-size: 11px;
                flex-shrink: 0;
            }
            .header-contact-text {
                font-size: 12px;
                color: #333;
            }
            .header-contact-text strong {
                font-weight: 600;
            }
            .header-divider {
                height: 3px;
                background: linear-gradient(90deg, #555 0%, #888 50%, #bbb 100%);
                border: none;
                margin: 0 0 20px 0;
            }

            /* ── Client & Order Number Cards ── */
            .client-order-row {
                display: flex;
                justify-content: space-between;
                align-items: stretch;
                gap: 20px;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .client-card {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 10px;
                padding: 18px 20px;
                display: flex;
                align-items: flex-start;
                gap: 14px;
                background: #fff;
            }
            .client-avatar {
                width: 38px;
                height: 38px;
                background: #eee;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                margin-top: 2px;
            }
            .client-avatar svg {
                width: 20px;
                height: 20px;
                fill: #555;
            }
            .client-card-label {
                font-size: 10px;
                font-weight: 700;
                color: #555;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 4px;
                text-decoration: underline;
                text-underline-offset: 3px;
            }
            .client-card-name {
                font-size: 14px;
                font-weight: 600;
                color: #111;
                margin-bottom: 2px;
            }
            .client-card-address {
                font-size: 12px;
                color: #555;
                line-height: 1.5;
            }
            .order-card {
                width: 260px;
                flex-shrink: 0;
                border: 2px solid #555;
                border-radius: 10px;
                overflow: hidden;
                text-align: center;
            }
            .order-card-header {
                background: #f5f5f5;
                padding: 8px 16px;
                font-size: 10px;
                font-weight: 700;
                color: #555;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                border-bottom: 1px solid #ddd;
            }
            .order-card-number {
                font-size: 17px;
                font-weight: 700;
                color: #111;
                padding: 14px 16px 10px;
                letter-spacing: 0.5px;
            }
            .order-card-ref-label {
                font-size: 10px;
                font-weight: 700;
                color: #555;
                text-transform: uppercase;
                letter-spacing: 1px;
                text-decoration: underline;
                text-underline-offset: 3px;
            }
            .order-card-ref-value {
                font-size: 12px;
                color: #333;
                padding: 4px 0 12px;
            }
            .invoice-meta-row {
                display: flex;
                justify-content: flex-end;
                gap: 30px;
                margin-bottom: 10px;
                font-size: 12px;
                color: #555;
            }
            .invoice-meta-item {
                display: flex;
                gap: 8px;
            }
            .invoice-meta-item strong {
                color: #333;
            }

            .title { text-align: center; font-size: 20px; font-weight: bold; color: #333; margin: 20px 0; }
            .order-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .client-info { display: none; }
            .service-details { clear: both; margin-top: 20px; }
            .service-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .service-table th, .service-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .service-table th { background: #555; color: white; font-weight: bold; }
            .total-section { float: right; width: 300px; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .total-row.final { font-weight: bold; font-size: 14px; border-bottom: 2px solid #555; color: #555; }
            .payment-info { clear: both; margin-top: 40px; padding: 15px; background: #f4f4f4; border-left: 4px solid #555; }
            .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding-top: 20px; border-top: 1px solid #ddd; }
            .signature-box { width: 45%; text-align: center; }
            .signature-line { border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px; }
            .footer-wrapper { margin-top: 40px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
            .page-number { text-align: right; font-size: 10px; color: #666; padding-top: 5px; }
            .payment-slip { 
                margin-top: 40px; 
                position: relative;
                width: 100%;
                height: 396px; 
            }
            .scissors-line-horizontal {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                border-top: 1px dashed #666;
                text-align: center;
                height: 0;
            }
            .scissors-icon {
                position: absolute;
                left: 10px;
                top: -10px;
                font-size: 14px;
                color: #666;
                background: #fff;
            }
            .payment-slip-table { width: 100%; height: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed; }
            .payment-slip-table td { vertical-align: top; }
            .payment-slip-left { 
                width: 62mm;
                position: relative;
            }
            .payment-slip-right { 
                width: 148mm;
                padding-left: 5mm;
            }
            .scissors-line-vertical {
                position: absolute;
                right: -1px;
                top: -10px;
                height: 100%;
                border-right: 1px dashed #666;
            }
            .scissors-icon-v {
                position: absolute;
                top: 20px;
                right: -6px;
                font-size: 14px;
                color: #666;
                background: #fff;
                transform: rotate(-90deg);
            }
            .pt-receipt { padding-top: 5mm; padding-right: 5mm; }
            .pt-payment { padding-top: 5mm; }
            .payment-slip-title { margin: 0 0 14px 0; font-size: 11pt; font-weight: bold; letter-spacing: 0.2px; font-family: Helvetica, Arial, sans-serif; }
            
            .payment-slip-label { display: block; font-size: 6pt; font-weight: bold; color: #111; margin-bottom: 2px; line-height: 1.1; }
            .payment-slip-value { font-size: 8pt; color: #111; line-height: 1.2; }
            .payment-slip-block { margin-bottom: 3mm; }
            
            .payment-part-content { display: flex; gap: 5mm; }
            .payment-col-left { width: 46mm; }
            .payment-col-right { flex: 1; }
            
            .qr-code-wrapper {
                width: 46mm;
                height: 46mm;
                position: relative;
                margin-bottom: 5mm;
            }
            .qr-code-wrapper img { width: 100%; height: 100%; object-fit: contain; }
            .qr-cross {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 7mm;
                height: 7mm;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .amount-area-receipt, .amount-area-payment {
                display: flex;
                margin-top: 5mm;
            }
            .amount-area-receipt { gap: 10px; }
            .amount-area-payment { gap: 15px; }
            .amount-col { display: flex; flex-direction: column; }
            .amount-col .payment-slip-value { font-size: 10pt; margin-top: 4px; }
            
            .remarks-section { margin-top: 20px; font-size: 12px; color: #555; }
            @media print {
                body { margin: 0; padding: 15px; -webkit-print-color-adjust: exact; }
                .service-table th { background: #555 !important; color: white !important; }
            }
        </style>
    </head>
    <body>
        <!-- ── Premium Header ── -->
        <div class="header-new">
            <div class="header-logo">
                <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove">
                <div class="header-tagline">Reinigung &middot; Umzug &middot; Facility Service</div>
            </div>
            <div class="header-contact">
                <div class="header-contact-row">
                    <span class="header-contact-icon">✆</span>
                    <span class="header-contact-text">+41 78 215 80 30 / +41 76 488 36 89</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">✉</span>
                    <span class="header-contact-text">info@swisscleanmove.ch</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">⊕</span>
                    <span class="header-contact-text">www.swisscleanmove.ch</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">⌂</span>
                    <span class="header-contact-text">Orpundstrasse 31, 2504 Biel/Bienne</span>
                </div>
                <div class="header-contact-row" style="margin-top: 4px;">
                    <span class="header-contact-icon">★</span>
                    <span class="header-contact-text"><strong>UID:</strong> CHE-457.949.122</span>
                </div>
            </div>
        </div>
        <hr class="header-divider">

        <!-- ── Client Card + Order Number ── -->
        <div class="client-order-row">
            <div class="client-card">
                <div class="client-avatar">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div>
                <div>
                    <div class="client-card-label">${language === 'fr' ? 'CLIENT' : language === 'en' ? 'CUSTOMER' : 'KUNDE'}</div>
                    <div class="client-card-name">${clientName}</div>
                    <div class="client-card-address">
                        <span style="font-size: 10px; color: #888; display: block; margin-bottom: 2px;">SwissCleanMove - Orpundstrasse 31 - 2504 Biel/Bienne</span>
                        ${invoiceAddr ? invoiceAddr + '<br>' : ''}${invoiceZip} ${invoiceCity}
                    </div>
                </div>
            </div>
            <div class="order-card">
                <div class="order-card-header">${language === 'fr' ? 'NUMÉRO DE COMMANDE' : language === 'en' ? 'ORDER NUMBER' : 'AUFTRAGSNUMMER'}</div>
                <div class="order-card-number">${orderNumber}</div>
                <div class="order-card-ref-label">${language === 'fr' ? 'RÉFÉRENCE CLIENT' : language === 'en' ? 'CUSTOMER REFERENCE' : 'KUNDENREFERENZ'}</div>
                <div class="order-card-ref-value">–</div>
            </div>
        </div>

        <!-- ── Invoice Meta (Date / Deadline) ── -->
        <div class="invoice-meta-row">
            <div class="invoice-meta-item">
                <span>${t.invoiceDate}:</span>
                <strong>${currentDate}</strong>
            </div>
            <div class="invoice-meta-item">
                <span>${t.paymentDeadline}:</span>
                <strong>${(() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toLocaleDateString(); })()}</strong>
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

        <div class="service-details">
            <h3 style="color: #555; border-bottom: 1px solid #555; padding-bottom: 5px;">${t.serviceDetails}</h3>
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
                        <td><strong>${translatedService}</strong></td>
                        <td>
                            ${formattedRemarks.length > 0 ? `${formattedRemarks.join('<br>')}<br><br>` : ''}
                            ${t.guarantee}
                        </td>
                        <td><strong>${client.totalPrice || 0} CHF</strong></td>
                    </tr>
                </tbody>
            </table>

            <table class="service-table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th colspan="2" style="background: #444;">${t.additionalInfo}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width:40%;"><strong>${t.location}</strong></td>
                        <td>${invoiceAddr}, ${invoiceZip} ${invoiceCity}</td>
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
            <strong>${t.date}:</strong> ${new Date(client.fromDate || Date.now()).toLocaleDateString()}<br>
            <strong>${t.clientStartTime}:</strong> ${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>
            <strong>${t.cleaningCompleted}:</strong> ${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        ${(client.remarks2 || client.remarks3) ? `
        <div class="remarks-section">
            <h4 style="margin-bottom: 5px; color: #333;">${t.remarks}</h4>
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

        <div class="header-new">
            <div class="header-logo">
                <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove">
                <div class="header-tagline">Reinigung &middot; Umzug &middot; Facility Service</div>
            </div>
            <div class="header-contact">
                <div class="header-contact-row">
                    <span class="header-contact-icon">✆</span>
                    <span class="header-contact-text">+41 78 215 80 30 / +41 76 488 36 89</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">✉</span>
                    <span class="header-contact-text">info@swisscleanmove.ch</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">⊕</span>
                    <span class="header-contact-text">www.swisscleanmove.ch</span>
                </div>
                <div class="header-contact-row">
                    <span class="header-contact-icon">⌂</span>
                    <span class="header-contact-text">Orpundstrasse 31, 2504 Biel/Bienne</span>
                </div>
                <div class="header-contact-row" style="margin-top: 4px;">
                    <span class="header-contact-icon">★</span>
                    <span class="header-contact-text"><strong>UID:</strong> CHE-457.949.122</span>
                </div>
            </div>
        </div>
        <hr class="header-divider">

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
                                    <div class="payment-slip-value">${client.address}<br>${client.postalCode} ${client.location}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
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
