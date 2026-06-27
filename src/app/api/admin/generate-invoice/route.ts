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

                const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const randomNum = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        const orderNumber = `SCM-${year}-${month}${day}-${randomNum}`
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
            'Cleaning & Property Maintenance': { en: 'Cleaning & Property Maintenance', de: 'Reinigung & Hauswartung', fr: 'Nettoyage & Conciergerie' },
            'Cleaning and Property Maintenance': { en: 'Cleaning and Property Maintenance', de: 'Reinigung & Hauswartung', fr: 'Nettoyage & Conciergerie' },
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
            * { box-sizing: border-box; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; padding-bottom: 80px; font-size: 13px; line-height: 1.4; color: #333; }
            
            /* -- Header -- */
            .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
            .header-logo img { height: 130px; width: auto; }
            .header-tagline { font-size: 11px; color: #00205B; font-weight: bold; margin-top: -10px; letter-spacing: 0.5px; }
            
            .header-contact { width: 280px; text-align: left; font-size: 13px; color: #333; border-left: 2px solid #ddd; padding-left: 20px; align-items: flex-start; display: flex; flex-direction: column; justify-content: center; gap: 5px; }
            .contact-line { display: flex; align-items: center; gap: 15px; font-size: 14px; margin-bottom: 5px; }
            .contact-icon { font-size: 16px; color: #555; width: 16px; text-align: center; }

            /* -- Top Cards (Address & Order Num) -- */
            .top-cards { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
            
            /* Window Envelope position (Left) */
            .customer-card { 
                width: 90mm; /* Fit window envelope */
                border: 1px solid #ddd; 
                border-radius: 8px; 
                padding: 15px; 
                margin-left: 20px; /* Adjust to window pos */
                margin-top: 10px;
            }
            .customer-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
            .customer-card-icon { background: #00205B; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; }
            .customer-card-title { font-size: 11px; font-weight: bold; color: #00205B; letter-spacing: 1px; }
            .customer-address { font-size: 13px; line-height: 1.6; color: #000; font-weight: normal; }
            .customer-address span { font-weight: normal; }

            /* Order Card (Right) */
            .order-card { 
                width: 280px; 
                border: 1px solid #555; 
                border-radius: 8px; 
                overflow: hidden; 
                text-align: center;
            }
            .order-card-header { background: #00205B; color: white; padding: 8px; font-size: 11px; font-weight: bold; letter-spacing: 1px; }
            .order-card-body { padding: 15px; background: #fff; }
            .order-number { font-size: 16px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px; }
            .order-ref-title { font-size: 10px; color: #555; font-weight: bold; }
            .order-ref-val { font-size: 13px; color: #000; margin-top: 3px; }

            /* -- Title Section -- */
            .main-title { font-size: 32px; font-weight: bold; color: #00205B; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
            .sub-title { font-size: 13px; color: #555; margin-bottom: 30px; }

            /* -- 3 Columns Info -- */
            .info-columns { display: flex; gap: 15px; margin-bottom: 30px; }
            .info-col { flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 15px; background: #fafafa; }
            .info-col-title { font-size: 11px; font-weight: bold; color: #00205B; margin-bottom: 12px; letter-spacing: 1px; }
            .info-row { display: flex; margin-bottom: 8px; align-items: flex-start; }
            .info-icon { font-size: 14px; color: #00205B; width: 22px; margin-top: 1px; }
            .info-label { width: 100px; color: #00205B; font-size: 12px; font-weight: bold; }
            .info-val { flex: 1; color: #000; font-weight: bold; font-size: 12px; }
            .info-val span { font-weight: normal; }

            /* -- Service Table -- */
            .service-section { margin-bottom: 20px; }
            .service-table { width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #ddd; }
            .service-table th { background: #00205B; color: white; padding: 10px; text-align: left; font-size: 10px; letter-spacing: 1px; }
            .service-table td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 11px; color: #333; vertical-align: top; }
            .service-table tr:last-child td { border-bottom: none; }
            
            /* Table Columns Widths */
            .col-nr { width: 5%; }
            .col-le { width: 25%; font-weight: bold; }
            .col-desc { width: 40%; color: #666; }
            .col-qty { width: 10%; text-align: center; }
            .col-price { width: 10%; text-align: right; }
            .col-total { width: 10%; text-align: right; font-weight: bold; }

            /* -- Bottom of Table Info -- */
            .table-bottom-row { display: flex; justify-content: space-between; align-items: stretch; margin-top: 15px; gap: 15px; }
            .scope-box { flex: 1; display: flex; gap: 10px; align-items: center; border: 1px solid #eee; padding: 12px; border-radius: 8px; background: #fafafa; }
            .scope-icon { font-size: 20px; color: #555; }
            .scope-text strong { display: block; font-size: 11px; color: #555; margin-bottom: 3px; }
            .scope-text { font-size: 10px; color: #666; }

            .total-box { background: #00205B; color: white; padding: 15px 25px; border-radius: 8px; text-align: center; width: 250px; }
            .total-box-title { font-size: 10px; font-weight: bold; letter-spacing: 1px; margin-bottom: 5px; text-transform: uppercase; }
            .total-box-amount { font-size: 22px; font-weight: bold; margin-bottom: 5px; }
            .total-box-sub { font-size: 10px; color: #ccc; }

            /* -- Badges -- */
            .badges-row { display: flex; gap: 10px; margin-top: 30px; margin-bottom: 30px; }
            .badge { flex: 1; display: flex; gap: 8px; align-items: flex-start; border: 1px solid #eee; padding: 10px; border-radius: 8px; }
            .badge-icon { font-size: 16px; color: #555; margin-top: 2px; }
            .badge-text strong { display: block; font-size: 10px; color: #555; margin-bottom: 2px; }
            .badge-text { font-size: 9px; color: #666; line-height: 1.3; }

            /* -- Signatures -- */
            .signatures-row { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .sig-box { width: 45%; }
            .sig-title { font-size: 10px; font-weight: bold; color: #555; margin-bottom: 15px; letter-spacing: 1px; }
            .sig-name { font-size: 14px; font-family: 'Brush Script MT', cursive; color: #555; margin-bottom: 5px; }
            .sig-details { font-size: 10px; color: #666; }
            .sig-details table { border-collapse: collapse; margin-top: 10px; }
            .sig-details td { padding: 4px 0; }
            .sig-details td:first-child { padding-right: 15px; color: #555; }
            .sig-line { border-bottom: 1px solid #333; display: inline-block; width: 150px; height: 12px; }

            /* -- Timing & Comm -- */
            .timing-row { display: flex; gap: 15px; margin-bottom: 40px; }
            .timing-box { flex: 1; border: 1px solid #eee; padding: 12px; border-radius: 8px; display: flex; gap: 12px; align-items: center; }
            .timing-icon { font-size: 20px; color: #555; }
            .timing-text strong { display: block; font-size: 10px; color: #555; margin-bottom: 3px; }
            .timing-text { font-size: 10px; color: #666; display: flex; gap: 10px; }
            .timing-text div { display: flex; flex-direction: column; gap: 3px; }

            /* -- Footer -- */
            .footer-banner { background: transparent; padding: 10px 0; display: flex; align-items: center; margin-top: auto; border-top: 1px solid #eee; margin-bottom: 20px; }
            .footer-banner-title { display: none; }
            .footer-banner-items { display: flex; gap: 40px; width: 100%; justify-content: flex-start; }
            .footer-item { display: flex; flex-direction: column; gap: 5px; color: #0055A4; font-size: 12px; font-weight: normal; }
            .footer-item span { color: #999; font-size: 10px; font-weight: normal; }
            
            /* -- Payment Slip Styles -- */
            .payment-slip { 
                margin-top: 40px; 
                position: relative;
                width: 100%;
                height: 396px; 
            }
            .scissors-line-horizontal { position: absolute; top: 0; left: 0; width: 100%; border-top: 1px dashed #666; text-align: center; height: 0; }
            .scissors-icon { position: absolute; left: 10px; top: -10px; font-size: 14px; color: #666; background: #fff; }
            .payment-slip-table { width: 100%; height: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed; }
            .payment-slip-table td { vertical-align: top; }
            .payment-slip-left { width: 62mm; position: relative; }
            .payment-slip-right { width: 148mm; padding-left: 5mm; }
            .scissors-line-vertical { position: absolute; right: -1px; top: -10px; height: 100%; border-right: 1px dashed #666; }
            .scissors-icon-v { position: absolute; top: 20px; right: -6px; font-size: 14px; color: #666; background: #fff; transform: rotate(-90deg); }
            .pt-receipt { padding-top: 5mm; padding-right: 5mm; }
            .pt-payment { padding-top: 5mm; }
            .payment-slip-title { margin: 0 0 14px 0; font-size: 11pt; font-weight: bold; letter-spacing: 0.2px; font-family: Helvetica, Arial, sans-serif; }
            .payment-slip-label { display: block; font-size: 6pt; font-weight: bold; color: #111; margin-bottom: 2px; line-height: 1.1; }
            .payment-slip-value { font-size: 8pt; color: #111; line-height: 1.2; }
            .payment-slip-block { margin-bottom: 3mm; }
            .payment-part-content { display: flex; gap: 5mm; }
            .payment-col-left { width: 46mm; }
            .payment-col-right { flex: 1; }
            .qr-code-wrapper { width: 46mm; height: 46mm; position: relative; margin-bottom: 5mm; }
            .qr-code-wrapper img { width: 100%; height: 100%; object-fit: contain; }
            .qr-cross { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 7mm; height: 7mm; background: #000; display: flex; align-items: center; justify-content: center; }
            .amount-area-receipt, .amount-area-payment { display: flex; margin-top: 5mm; }
            .amount-area-receipt { gap: 10px; }
            .amount-area-payment { gap: 15px; }
            .amount-col { display: flex; flex-direction: column; }
            .amount-col .payment-slip-value { font-size: 10pt; margin-top: 4px; }
</style>
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
                <div class="contact-line"><span class="contact-icon">🏢</span> UID: CHE-457.949.122 MWST</div>
            </div>
        </div>

        <!-- Top Cards -->
        <div class="top-cards">
            <div class="customer-card">
                <div class="customer-card-header">
                    <div class="customer-card-icon">👤</div>
                    <div class="customer-card-title">${t.customer || 'KUNDE'}</div>
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
                <div class="info-col-title">${t.customer || 'KUNDE'}</div>
                <div class="info-row"><span class="info-icon">👤</span><span class="info-val"><span>${clientName}</span></span></div>
                <div class="info-row"><span class="info-icon">📍</span><span class="info-val"><span>${invoiceAddr}<br>${invoiceZip} ${invoiceCity}</span></span></div>
                <div class="info-row"><span class="info-icon">📞</span><span class="info-val"><span>${client.phone || '-'}</span></span></div>
                <div class="info-row"><span class="info-icon">✉</span><span class="info-val"><span>${client.email || '-'}</span></span></div>
            </div>
            <!-- AUFTRAGSDATEN -->
            <div class="info-col">
                <div class="info-col-title">${t.orderData || 'AUFTRAGSDATEN'}</div>
                <div class="info-row"><span class="info-icon">📅</span><span class="info-label">${t.serviceDate || 'Leistungsdatum:'}</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleDateString()}</span></div>
                <div class="info-row"><span class="info-icon">🕒</span><span class="info-label">${t.startTime || 'Startzeit:'}</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</span></div>
                <div class="info-row"><span class="info-icon">🕛</span><span class="info-label">${t.handoverTime || 'Abgabezeit:'}</span><span class="info-val">${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</span></div>
                <div class="info-row"><span class="info-icon">👤</span><span class="info-label">${t.contactPerson || 'Ansprechpartner:'}</span><span class="info-val">${clientName}</span></div>
                <div class="info-row"><span class="info-icon">💳</span><span class="info-label">${t.paymentMethod || 'Zahlungsart:'}</span><span class="info-val">Rechnung (QR)</span></div>
            </div>
            <!-- OBJEKT -->
            <div class="info-col">
                <div class="info-col-title">${t.object || 'OBJEKT'}</div>
                <div class="info-row" style="margin-bottom: 15px;"><span class="info-icon">🏢</span><span class="info-val"><span>${client.address || '-'}<br>${client.postalCode || ''} ${client.location || ''}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">${t.propertyType || 'Objekttyp:'}</span><span class="info-val"><span>${client.propertyType || '-'}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">${t.floor || 'Stockwerk:'}</span><span class="info-val"><span>${translatedFloor || client.floor || '-'}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">${t.area || 'Fläche:'}</span><span class="info-val"><span>${client.squareMeters ? 'ca. ' + client.squareMeters + ' m²' : '-'}</span></span></div>
            </div>
        </div>

        <!-- Service Table -->
        <div class="service-section">
            <table class="service-table">
                <thead>
                    <tr>
                        <th class="col-nr">NR.</th>
                        <th class="col-le">${t.service || 'LEISTUNG'}</th>
                        <th class="col-desc">${t.description || 'BESCHREIBUNG'}</th>
                        <th class="col-qty">${t.quantity || 'MENGE'}</th>
                        <th class="col-price">${t.unitPrice || 'EINZELPREIS'}</th>
                        <th class="col-total">${t.totalPrice || 'GESAMTPREIS'}</th>
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
                        <strong>${t.scopeOfServices || 'LEISTUNGSUMFANG'}</strong>
                        ${t.swissStandard || 'Alle Arbeiten werden nach höchsten Schweizer Qualitätsstandards ausgeführt.'} ${t.guarantee}
                    </div>
                </div>
                <div class="total-box">
                    <div class="total-box-title">${t.totalFixedPrice || 'TOTAL FESTPREIS INKL. MWST.'}</div>
                    <div class="total-box-amount">CHF ${(client.totalPrice || 0).toFixed(2)}</div>
                    <div class="total-box-sub">${t.fixedPriceSub || 'Festpreis - keine zusätzlichen Kosten'}</div>
                </div>
            </div>
        </div>

        <!-- Badges -->
        <div class="badges-row">
            <div class="badge">
                <div class="badge-icon">🛡️</div>
                <div class="badge-text"><strong>${t.acceptanceGuarantee || 'ABNAHMEGARANTIE'}</strong>Zufriedenheitsgarantie bei Übergabe. Mängel werden kostenlos nachgebessert.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">✅</div>
                <div class="badge-text"><strong>${t.liabilityInsured || 'HAFTPFLICHTVERSICHERT'}</strong>Vollständig versichert für Ihre Sicherheit und maximalen Schutz.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">⭐</div>
                <div class="badge-text"><strong>${t.swissQuality || 'SCHWEIZER QUALITÄT'}</strong>Professionell, zuverlässig und pünktlich - dafür stehen wir ein.</div>
            </div>
            <div class="badge">
                <div class="badge-icon">🌿</div>
                <div class="badge-text"><strong>${t.ecoFriendly || 'UMWELTFREUNDLICH'}</strong>Wir verwenden umweltfreundliche Reinigungsmittel und nachhaltige Methoden.</div>
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures-row" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px;">
            <div class="sig-box" style="width: 30%;">
                <div class="sig-title">SWISSCLEANMOVE</div>
                <div class="sig-details">
                    <table style="width: 100%;">
                        <tr><td style="width: 80px;">Name:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>Cleaning Date:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>Unterschrift:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                    </table>
                </div>
            </div>

            <!-- Middle Section for Date & Ort -->
            <div class="sig-box" style="width: 30%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; margin-bottom: 15px;">
                <div class="sig-details" style="text-align: center; font-size: 11px; color: #333;">
                    <strong>Cleaning Date</strong> ${new Date().toLocaleDateString()}<br><br>
                    <strong>Ort:</strong> Biel
                </div>
            </div>

            <div class="sig-box" style="width: 30%;">
                <div class="sig-title">${t.customer || 'KUNDE'}</div>
                <div class="sig-details">
                    <table style="width: 100%;">
                        <tr><td style="width: 80px;">Name:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>Cleaning Date:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>Unterschrift:</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Timing & Comm -->
        <div class="timing-row">
            <div class="timing-box">
                <div class="timing-icon">📅</div>
                <div class="timing-text">
                    <div><strong>${t.performancePeriod || 'LEISTUNGSZEITRAUM'}</strong>${t.serviceStart || 'Leistungsbeginn:'}<br>${t.serviceEnd || 'Leistungsende:'}</div>
                    <div><br>${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr<br>${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</div>
                </div>
            </div>
            <div class="timing-box">
                <div class="timing-icon">👤</div>
                <div class="timing-text">
                    <div><strong>${t.communication || 'KOMMUNIKATION'}</strong>${t.communicationText || 'Für Fragen oder Änderungen kontaktieren Sie uns bitte rechtzeitig.'}</div>
                </div>
            </div>
        </div>

        <!-- Footer Banner -->
        <div class="footer-banner">
            <div class="footer-banner-title">🏦 ${t.accountInformation || 'KONTOINFORMATIONEN'}</div>
            <div class="footer-banner-items">
                <div class="footer-item"><span>${t.bankName || 'Bankname'}</span>PostFinance AG</div>
                <div class="footer-item"><span>IBAN</span>CH86 0900 0000 1636 3866 5</div>
                <div class="footer-item"><span>${t.accountHolder || 'Kontoinhaber'}</span>Dawit Gebrekristos / SwissCleanMove</div>
                <div class="footer-item"><span>${t.accountNo || 'Konto-Nr.'}</span>16-363866-5</div>
                <div class="footer-item"><span>${t.clearingNo || 'Clearing-Nr.'}</span>09000</div>
            </div>
        </div>

        <div style="page-break-before: always;"></div>

        <!-- Payment Slip Header Removed -->
        <div class="payment-slip">
            <div class="scissors-line-horizontal">
                <span class="scissors-icon">✂</span>
                <span style="background: #fff; padding: 0 10px; font-size: 11px; color: #666;">Vor der Einzahlung abzutrennen / A détacher avant le versement / Da staccare prima del versamento</span>
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
                        
                        <div style="font-size: 9px; color: #111; margin-top: 15px; text-align: right;">${t.acceptancePoint}</div>
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
