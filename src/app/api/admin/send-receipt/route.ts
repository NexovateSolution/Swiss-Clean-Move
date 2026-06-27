import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { authenticateRequest } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'
import puppeteerCore from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { join } from 'path'
import { readFileSync } from 'fs'

import { createTranslator } from '@/lib/translations';

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
        const pdfFilename = `receipt-${client.firstName}-${client.lastName}.pdf`

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
            en: `Receipt - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            de: `Quittung - SwissCleanMove - ${client.firstName} ${client.lastName}`,
            fr: `Reçu - SwissCleanMove - ${client.firstName} ${client.lastName}`
        }

        const messages: any = {
            en: `Dear ${client.firstName} ${client.lastName},\n\nPlease find attached your receipt from SwissCleanMove.\n\nThank you for your business!\n\nBest regards,\nSwissCleanMove Team`,
            de: `Sehr geehrte/r ${client.firstName} ${client.lastName},\n\nAnbei finden Sie Ihre Quittung von SwissCleanMove.\n\nVielen Dank für Ihr Vertrauen!\n\nMit freundlichen Grüßen,\nSwissCleanMove Team`,
            fr: `Cher/Chère ${client.firstName} ${client.lastName},\n\nVeuillez trouver ci-joint votre reçu de SwissCleanMove.\n\nMerci pour votre confiance!\n\nCordialement,\nÉquipe SwissCleanMove`
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
          <h2 style="color: #555;">Quittung / Receipt</h2>
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

function generateInvoiceHTML(client: any, language: string): string {
    const { join } = require('path');
    const { readFileSync } = require('fs');
    const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
    const logoBuffer = readFileSync(logoPath);
    const LOGO_BASE64 = logoBuffer.toString('base64');

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
                invoiceLabel: 'Rechnung',
                tagline: 'Reinigung \u00b7 Umzug \u00b7 Facility Service',
                subTitle: 'Professionelle Reinigungs- und Umzugsdienstleistungen nach Schweizer Qualit\u00e4tsstandard.',
                customer: 'KUNDE',
                orderData: 'AUFTRAGSDATEN',
                object: 'OBJEKT',
                serviceDate: 'Leistungsdatum:',
                startTime: 'Startzeit:',
                handoverTime: 'Abgabezeit:',
                contactPerson: 'Ansprechpartner:',
                paymentMethod: 'Zahlungsart:',
                paymentMethodValue: 'Bar',
                propertyType: 'Objekttyp:',
                floor: 'Stockwerk:',
                area: 'Fl\u00e4che:',
                areaPrefix: 'ca.',
                description: 'BESCHREIBUNG',
                quantity: 'MENGE',
                unitPrice: 'EINZELPREIS',
                totalPrice: 'GESAMTPREIS',
                defaultServiceDesc: 'Professionelle Dienstleistung gem\u00e4ss Schweizer Standard.',
                scopeOfServices: 'LEISTUNGSUMFANG',
                swissStandard: 'Alle Arbeiten werden nach h\u00f6chsten Schweizer Qualit\u00e4tsstandards ausgef\u00fchrt.',
                totalFixedPrice: 'TOTAL FESTPREIS',
                fixedPriceSub: 'Festpreis - keine zus\u00e4tzlichen Kosten',
                acceptanceGuarantee: 'ABNAHMEGARANTIE',
                acceptanceGuaranteeDesc: 'Zufriedenheitsgarantie bei \u00dcbergabe. M\u00e4ngel werden kostenlos nachgebessert.',
                liabilityInsured: 'HAFTPFLICHTVERSICHERT',
                liabilityInsuredDesc: 'Vollst\u00e4ndig versichert f\u00fcr Ihre Sicherheit und maximalen Schutz.',
                swissQuality: 'SCHWEIZER QUALIT\u00c4T',
                swissQualityDesc: 'Professionell, zuverl\u00e4ssig und p\u00fcnktlich - daf\u00fcr stehen wir ein.',
                ecoFriendly: 'UMWELTFREUNDLICH',
                ecoFriendlyDesc: 'Wir verwenden umweltfreundliche Reinigungsmittel und nachhaltige Methoden.',
                nameLabel: 'Name:',
                cleaningDateLabel: 'Reinigungsdatum:',
                signatureLabel: 'Unterschrift:',
                locationLabel: 'Ort:',
                performancePeriod: 'LEISTUNGSZEITRAUM',
                serviceStart: 'Leistungsbeginn:',
                serviceEnd: 'Leistungsende:',
                timeUnit: 'Uhr',
                communication: 'KOMMUNIKATION',
                communicationText: 'F\u00fcr Fragen oder \u00c4nderungen kontaktieren Sie uns bitte rechtzeitig.',
                accountInformation: 'KONTOINFORMATIONEN',
                bankName: 'Bankname',
                accountHolder: 'Kontoinhaber',
                accountNo: 'Konto-Nr.',
                clearingNo: 'Clearing-Nr.'
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
                invoiceLabel: 'Facture',
                tagline: 'Nettoyage \u00b7 D\u00e9m\u00e9nagement \u00b7 Facility Service',
                subTitle: 'Services professionnels de nettoyage et de d\u00e9m\u00e9nagement selon les normes suisses de qualit\u00e9.',
                customer: 'CLIENT',
                orderData: 'DONN\u00c9ES DE COMMANDE',
                object: 'OBJET',
                serviceDate: 'Date de service:',
                startTime: 'Heure de d\u00e9but:',
                handoverTime: 'Heure de remise:',
                contactPerson: 'Personne de contact:',
                paymentMethod: 'Mode de paiement:',
                paymentMethodValue: 'Comptant',
                propertyType: 'Type d\'objet:',
                floor: '\u00c9tage:',
                area: 'Surface:',
                areaPrefix: 'env.',
                description: 'DESCRIPTION',
                quantity: 'QUANTIT\u00c9',
                unitPrice: 'PRIX UNITAIRE',
                totalPrice: 'PRIX TOTAL',
                defaultServiceDesc: 'Service professionnel selon les normes suisses.',
                scopeOfServices: '\u00c9TENDUE DES SERVICES',
                swissStandard: 'Tous les travaux sont ex\u00e9cut\u00e9s selon les normes suisses de qualit\u00e9 les plus \u00e9lev\u00e9es.',
                totalFixedPrice: 'TOTAL PRIX FIXE',
                fixedPriceSub: 'Prix fixe - pas de frais suppl\u00e9mentaires',
                acceptanceGuarantee: 'GARANTIE DE R\u00c9CEPTION',
                acceptanceGuaranteeDesc: 'Garantie de satisfaction \u00e0 la remise. Les d\u00e9fauts sont corrig\u00e9s gratuitement.',
                liabilityInsured: 'ASSURANCE RESPONSABILIT\u00c9',
                liabilityInsuredDesc: 'Enti\u00e8rement assur\u00e9 pour votre s\u00e9curit\u00e9 et une protection maximale.',
                swissQuality: 'QUALIT\u00c9 SUISSE',
                swissQualityDesc: 'Professionnel, fiable et ponctuel \u2013 c\'est notre engagement.',
                ecoFriendly: '\u00c9COLOGIQUE',
                ecoFriendlyDesc: 'Nous utilisons des produits de nettoyage \u00e9cologiques et des m\u00e9thodes durables.',
                nameLabel: 'Nom:',
                cleaningDateLabel: 'Date de nettoyage:',
                signatureLabel: 'Signature:',
                locationLabel: 'Lieu:',
                performancePeriod: 'P\u00c9RIODE DE SERVICE',
                serviceStart: 'D\u00e9but du service:',
                serviceEnd: 'Fin du service:',
                timeUnit: 'h',
                communication: 'COMMUNICATION',
                communicationText: 'Pour toute question ou modification, veuillez nous contacter \u00e0 temps.',
                accountInformation: 'INFORMATIONS BANCAIRES',
                bankName: 'Nom de la banque',
                accountHolder: 'Titulaire du compte',
                accountNo: 'N\u00b0 de compte',
                clearingNo: 'N\u00b0 de clearing'
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
                invoiceLabel: 'Invoice',
                tagline: 'Cleaning \u00b7 Relocation \u00b7 Facility Service',
                subTitle: 'Professional cleaning and relocation services according to Swiss quality standards.',
                customer: 'CUSTOMER',
                orderData: 'ORDER DATA',
                object: 'PROPERTY',
                serviceDate: 'Service Date:',
                startTime: 'Start Time:',
                handoverTime: 'Handover Time:',
                contactPerson: 'Contact Person:',
                paymentMethod: 'Payment Method:',
                paymentMethodValue: 'Cash',
                propertyType: 'Property Type:',
                floor: 'Floor:',
                area: 'Area:',
                areaPrefix: 'approx.',
                description: 'DESCRIPTION',
                quantity: 'QUANTITY',
                unitPrice: 'UNIT PRICE',
                totalPrice: 'TOTAL PRICE',
                defaultServiceDesc: 'Professional service according to Swiss standards.',
                scopeOfServices: 'SCOPE OF SERVICES',
                swissStandard: 'All work is carried out according to the highest Swiss quality standards.',
                totalFixedPrice: 'TOTAL FIXED PRICE',
                fixedPriceSub: 'Fixed price - no additional costs',
                acceptanceGuarantee: 'ACCEPTANCE GUARANTEE',
                acceptanceGuaranteeDesc: 'Satisfaction guarantee at handover. Defects are corrected free of charge.',
                liabilityInsured: 'LIABILITY INSURED',
                liabilityInsuredDesc: 'Fully insured for your safety and maximum protection.',
                swissQuality: 'SWISS QUALITY',
                swissQualityDesc: 'Professional, reliable, and punctual \u2013 that is our commitment.',
                ecoFriendly: 'ECO-FRIENDLY',
                ecoFriendlyDesc: 'We use eco-friendly cleaning products and sustainable methods.',
                nameLabel: 'Name:',
                cleaningDateLabel: 'Cleaning Date:',
                signatureLabel: 'Signature:',
                locationLabel: 'Location:',
                performancePeriod: 'SERVICE PERIOD',
                serviceStart: 'Service Start:',
                serviceEnd: 'Service End:',
                timeUnit: '',
                communication: 'COMMUNICATION',
                communicationText: 'For questions or changes, please contact us in a timely manner.',
                accountInformation: 'ACCOUNT INFORMATION',
                bankName: 'Bank Name',
                accountHolder: 'Account Holder',
                accountNo: 'Account No.',
                clearingNo: 'Clearing No.'
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

        let destStreet = '';
        let destZipCity = '';

        let formattedRemarks: string[] = [];
        const SKIP_KEYS = new Set(['totalPrice', 'paidAmount', 'fromDate', 'untilDate', 'nameFirstName', 'emailAddress', 'telephone', 'streetNo', 'zipCity', 'address', 'urgency', 'frequency', 'serviceTimes', 'startDate', 'handoverDate', 'desiredStart', 'handoverTime', 'company', 'moveFromStreet', 'moveFromZipCity', 'moveToStreet', 'moveToZipCity']);

        if ((client as any).data && typeof (client as any).data === 'object' && Object.keys((client as any).data).length > 0) {
            const clientData = (client as any).data as Record<string, any>;
            // Extract destination fields first
            if (clientData.moveToStreet) destStreet = String(clientData.moveToStreet);
            if (clientData.moveToZipCity) destZipCity = String(clientData.moveToZipCity);
            
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
                
                if (SKIP_KEYS.has(rawKey)) return;
                
                const vals = rawVal.split(', ').map((rv: string) => tVal(rv));
                formattedRemarks.push(`${tKey(rawKey)}: ${vals.join(', ')}`);
            });
        }
        
        let propertyStreet = destStreet || client.address || '-';
        let propertyCity = destZipCity || ((client.postalCode || '') + ' ' + (client.location || '')).trim();

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

        const buildingMap: Record<string, Record<string, string>> = {
            'Apartment': { en: 'Apartment', de: 'Wohnung', fr: 'Appartement' },
            'House': { en: 'House', de: 'Haus', fr: 'Maison' },
            'WG Room': { en: 'WG Room', de: 'WG-Zimmer', fr: 'Chambre en colocation' },
            'Office': { en: 'Office', de: 'Büro', fr: 'Bureau' },
            'Studio': { en: 'Studio', de: 'Studio', fr: 'Studio' },
            'Storage/Cellar': { en: 'Storage/Cellar', de: 'Lager/Keller', fr: 'Cave/Entrepôt' },
            'Restaurant': { en: 'Restaurant', de: 'Restaurant', fr: 'Restaurant' },
            'Commercial': { en: 'Commercial', de: 'Gewerbe', fr: 'Commercial' },
            'Other': { en: 'Other', de: 'Andere', fr: 'Autre' }
        };

        const getBaseKey = (val: string | null | undefined, map: Record<string, Record<string, string>>) => {
            if (!val) return undefined;
            const lowerVal = val.toLowerCase();
            for (const [key, translations] of Object.entries(map)) {
                if (key.toLowerCase() === lowerVal || Object.values(translations).some(t => t.toLowerCase() === lowerVal)) {
                    return key;
                }
            }
            return undefined;
        }

        const serviceKey = getBaseKey(client.serviceType, serviceMap);
        const translatedService = serviceKey ? (serviceMap[serviceKey][language as string] || client.serviceType) : (client.serviceType || '');
        
        const floorKey = getBaseKey(client.floor, floorMap);
        const translatedFloor = floorKey ? (floorMap[floorKey][language as string] || client.floor) : (client.floor || '');
        
        const buildingKey = getBaseKey(client.buildingType, buildingMap);
        const translatedBuilding = buildingKey ? (buildingMap[buildingKey][language as string] || client.buildingType) : (client.buildingType || '');

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



        const serviceTypeStr = (client.serviceType || '').toLowerCase();
        const isUmzug = serviceTypeStr.includes('relocation') || serviceTypeStr.includes('umzug') || serviceTypeStr.includes('combo') ? '■' : '□';
        const isUmzugsreinigung = serviceTypeStr.includes('final cleaning') || serviceTypeStr.includes('combo') || serviceTypeStr.includes('umzugsreinigung') ? '■' : '□';
        const isReinigung = ((serviceTypeStr.includes('cleaning') || serviceTypeStr.includes('reinigung')) && isUmzugsreinigung === '□') ? '■' : '□';
        const isEntsorgung = serviceTypeStr.includes('disposal') || serviceTypeStr.includes('entsorgung') ? '■' : '□';
        const isFacility = serviceTypeStr.includes('facility') || serviceTypeStr.includes('maintenance') || serviceTypeStr.includes('hauswartung') ? '■' : '□';
        const isHaushalt = serviceTypeStr.includes('household') || serviceTypeStr.includes('haushalt') ? '■' : '□';
        
        let checkedCount = [isUmzug, isUmzugsreinigung, isReinigung, isEntsorgung, isFacility, isHaushalt].filter(x => x === '■').length;
        const isSonstiges = (checkedCount === 0) ? '■' : '□';

        const qrPlaceholder = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('https://www.swisscleanmove.ch');

        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; font-size: 13px; color: #000; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .header-qr { width: 120px; height: 120px; }
        .header-qr img { width: 100%; height: 100%; object-fit: contain; }
        .header-info { flex: 1; margin-left: 20px; font-size: 12px; line-height: 1.3; }
        .header-info strong { font-size: 13px; display: block; margin-bottom: 2px; }
        .header-logo { width: 180px; }
        .header-logo img { width: 100%; height: auto; object-fit: contain; }

        /* Title */
        .title { text-align: center; font-size: 22px; font-weight: bold; margin: 30px 0 20px 0; letter-spacing: 0.5px; }

        /* Tables */
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        td { border: 1px solid #000; padding: 5px 8px; vertical-align: top; }
        
        .label { font-size: 11px; color: #000; margin-bottom: 2px; }
        .value { font-size: 13px; font-weight: normal; min-height: 18px; }

        /* Description Box */
        .desc-box td { height: 120px; vertical-align: top; }

        /* Flex helpers */
        .checkbox-row { display: flex; flex-wrap: wrap; gap: 15px; align-items: center; font-size: 12px; }
        .checkbox-item { display: flex; align-items: center; gap: 4px; }
        
        /* Specific widths */
        .col-1 { width: 25%; }
        .col-2 { width: 45%; }
        .col-3 { width: 10%; }
        .col-4 { width: 20%; }
        
        .sign-col { width: 33.33%; height: 60px; }
    </style>
</head>
<body>

    <div class="header">
        <div class="header-qr">
            <img src="${qrPlaceholder}" alt="QR Code" />
        </div>
        <div class="header-info">
            <strong>SWISSCLEANMOVE</strong>
            Orpundstrasse 31, 2504 Biel/Bienne<br>
            UID: CHE-457.949.122<br>
            +41 76 488 36 89 | +41 78 215 80 30<br>
            info@swisscleanmove.ch<br>
            www.swisscleanmove.ch
        </div>
        <div class="header-logo">
            <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove" />
        </div>
    </div>

    <div class="title">QUITTUNG / ZAHLUNGSBESTÄTIGUNG</div>

    <table>
        <tr>
            <td class="col-1"><div class="label">Quittungs-Nr.</div><div class="value">${orderNumber}</div></td>
            <td class="col-2"></td>
            <td class="col-3"><div class="label">Datum</div></td>
            <td class="col-4"><div class="value">${currentDate}</div></td>
        </tr>
        <tr>
            <td><div class="label">Kundenname</div></td>
            <td colspan="3"><div class="value">${clientName}</div></td>
        </tr>
        <tr>
            <td><div class="label">Firma</div></td>
            <td colspan="3"><div class="value">${(client as any).company || ''}</div></td>
        </tr>
        <tr>
            <td><div class="label">Adresse</div></td>
            <td colspan="3"><div class="value">${invoiceAddr}</div></td>
        </tr>
        <tr>
            <td><div class="label">PLZ / Ort</div></td>
            <td colspan="3"><div class="value">${invoiceZip} ${invoiceCity}</div></td>
        </tr>
        <tr>
            <td><div class="label">Telefon</div></td>
            <td><div class="value">${client.phone || ''}</div></td>
            <td><div class="label">E-Mail</div></td>
            <td><div class="value">${client.email || ''}</div></td>
        </tr>
    </table>

    <table>
        <tr>
            <td>
                <div class="label">Dienstleistung</div>
                <div class="checkbox-row" style="margin-top: 5px;">
                    <div class="checkbox-item"><span style="font-size:16px;">${isUmzug}</span> Umzug</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isReinigung}</span> Reinigung</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isUmzugsreinigung}</span> Umzugsreinigung</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isEntsorgung}</span> Entsorgung</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isFacility}</span> Facility Service</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isHaushalt}</span> Haushaltshilfe</div>
                    <div class="checkbox-item"><span style="font-size:16px;">${isSonstiges}</span> Sonstiges</div>
                </div>
            </td>
        </tr>
    </table>

    <table class="desc-box">
        <tr>
            <td>
                <div class="label">Leistungsbeschreibung</div>
                <div class="value" style="margin-top: 5px;">
                    ${formattedRemarks.length > 0 ? '<ul style="margin: 0; padding-left: 15px; font-size: 11px; line-height: 1.8; column-count: 3; column-gap: 20px; list-style-type: disc;">' + formattedRemarks.map(r => '<li>' + r + '</li>').join('') + '</ul>' : (translatedService || t.defaultServiceDesc || '')}
                </div>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td style="width: 33.33%;"><div class="label">Gesamtbetrag CHF</div><div class="value" style="margin-top:10px; border-bottom:1px solid #000; width: 80%;">${(client.totalPrice || 0).toFixed(2)}</div></td>
            <td style="width: 33.33%;"><div class="label">Bezahlter Betrag CHF</div><div class="value" style="margin-top:10px; border-bottom:1px solid #000; width: 80%;">${(client.paidAmount || 0).toFixed(2)}</div></td>
            <td style="width: 33.33%;"><div class="label">Restbetrag CHF</div><div class="value" style="margin-top:10px; border-bottom:1px solid #000; width: 80%;">${((client.totalPrice || 0) - (client.paidAmount || 0)).toFixed(2)}</div></td>
        </tr>
        <tr>
            <td><div class="label">Zahlungsart</div></td>
            <td>
                <div class="checkbox-row">
                    <div class="checkbox-item"><span style="font-size:16px;">□</span> TWINT</div>
                    <div class="checkbox-item"><span style="font-size:16px;">□</span> Bar</div>
                    <div class="checkbox-item"><span style="font-size:16px;">□</span> Bank</div>
                </div>
            </td>
            <td>
                <div class="checkbox-row">
                    <div class="checkbox-item"><span style="font-size:16px;">□</span> Karte</div>
                </div>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="sign-col"><div class="label">Ort / Datum</div><div class="value" style="margin-top:30px; border-bottom:1px solid #000; width: 80%;"></div></td>
            <td class="sign-col"><div class="label">Unterschrift Kunde</div><div class="value" style="margin-top:30px; border-bottom:1px solid #000; width: 80%;"></div></td>
            <td class="sign-col"><div class="label">Unterschrift SwissCleanMove</div><div class="value" style="margin-top:30px; border-bottom:1px solid #000; width: 80%;"></div></td>
        </tr>
    </table>

</body>
</html>`;

}
