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


        return `

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
                padding: 15px; 
                margin-left: 90px; /* Adjust to window pos */
                margin-top: 25px;
            }
            .customer-address { font-size: 14px; line-height: 1.6; color: #000; font-weight: normal; }
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
            .main-title { font-size: 18px; font-weight: bold; color: #00205B; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
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
            .col-nr { width: 5%; text-align: center; }
            .col-le { width: 20%; font-weight: bold; }
            .col-desc { width: 45%; color: #666; }
            .col-qty { width: 10%; text-align: center; }
            .col-price { width: 10%; text-align: right; }
            .col-total { width: 10%; text-align: right; font-weight: bold; }

            /* -- Bottom of Table Info -- */
            .table-bottom-row { display: flex; justify-content: flex-end; align-items: stretch; margin-top: 15px; gap: 15px; }
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
            .badge { flex: 1; display: flex; gap: 10px; align-items: flex-start; border: 1px solid #eee; padding: 12px; border-radius: 8px; }
            .badge-icon { font-size: 22px; color: #00205B; margin-top: 2px; }
            .badge-text strong { display: block; font-size: 12px; color: #00205B; font-weight: bold; margin-bottom: 3px; letter-spacing: 0.5px; }
            .badge-text { font-size: 11px; color: #555; line-height: 1.4; }

            /* -- Signatures -- */
            .signatures-row { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .sig-box { width: 45%; }
            .sig-title { font-size: 12px; font-weight: bold; color: #00205B; margin-bottom: 15px; letter-spacing: 1px; }
            .sig-name { font-size: 16px; font-family: 'Brush Script MT', cursive; color: #555; margin-bottom: 5px; }
            .sig-details { font-size: 12px; color: #555; }
            .sig-details table { border-collapse: collapse; margin-top: 10px; }
            .sig-details td { padding: 5px 0; }
            .sig-details td:first-child { padding-right: 15px; color: #555; }
            .sig-line { border-bottom: 1px solid #333; display: inline-block; width: 150px; height: 14px; }

            /* -- Timing & Comm -- */
            .timing-row { display: flex; gap: 15px; margin-bottom: 40px; }
            .timing-box { flex: 1; border: 1px solid #eee; padding: 14px; border-radius: 8px; display: flex; gap: 14px; align-items: center; }
            .timing-icon { font-size: 24px; color: #00205B; }
            .timing-text strong { display: block; font-size: 12px; color: #00205B; font-weight: bold; margin-bottom: 4px; letter-spacing: 0.5px; }
            .timing-text { font-size: 12px; color: #555; display: flex; gap: 12px; }
            .timing-text div { display: flex; flex-direction: column; gap: 4px; }

            /* -- Footer -- */
            .footer-banner { background: #00205B; color: white; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; font-size: 10px; margin-top: auto; }
            .footer-banner-title { font-weight: bold; display: flex; align-items: center; gap: 8px; letter-spacing: 1px; }
            .footer-banner-items { display: flex; gap: 20px; }
            .footer-item { display: flex; flex-direction: column; gap: 3px; }
            .footer-item span { color: #ccc; font-size: 9px; }
            
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
                <div class="header-tagline">${t.tagline}</div>
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
                <div class="customer-address">
                    ${clientName}<br>
                    <span>${invoiceAddr ? invoiceAddr + '<br>' : ''}${invoiceZip} ${invoiceCity}</span>
                </div>
            </div>
            <div class="order-card">
                <div class="order-card-header">${t.orderNumber?.toUpperCase()}</div>
                <div class="order-card-body">
                    <div class="order-number">${orderNumber}</div>
                    <div class="order-ref-title">${t.invoiceRef?.toUpperCase()}</div>
                    <div class="order-ref-val">-</div>
                </div>
            </div>
        </div>

        <!-- Title -->
        <div class="main-title">${t.title}</div>
        <div class="sub-title">${t.subTitle}</div>

        <!-- Info Columns -->
        <div class="info-columns">
            <!-- AUFTRAGSDATEN -->
            <div class="info-col">
                <div class="info-col-title">${t.orderData}</div>
                <div class="info-row"><span class="info-icon">📅</span><span class="info-label">${t.serviceDate}</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleDateString()}</span></div>
                <div class="info-row"><span class="info-icon">🕒</span><span class="info-label">${t.startTime}</span><span class="info-val">${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${t.timeUnit}</span></div>
                <div class="info-row"><span class="info-icon">🕛</span><span class="info-label">${t.handoverTime}</span><span class="info-val">${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${t.timeUnit}</span></div>
                <div class="info-row"><span class="info-icon">👤</span><span class="info-label">${t.contactPerson}</span><span class="info-val">${clientName}</span></div>
                <div class="info-row"><span class="info-icon">💳</span><span class="info-label">${t.paymentMethod}</span><span class="info-val">${t.paymentMethodValue}</span></div>
            </div>
            <!-- OBJEKT -->
            <div class="info-col">
                <div class="info-col-title">${t.object}</div>
                <div class="info-row" style="margin-bottom: 15px;"><span class="info-icon">🏢</span><span class="info-val"><span>${client.address || '-'}<br>${client.postalCode || ''} ${client.location || ''}</span></span></div>
                <div class="info-row"><span class="info-label" style="width: 70px;">${t.propertyType}</span><span class="info-val"><span>${translatedBuilding || '-'}</span></span></div>
                ${translatedFloor ? `<div class="info-row"><span class="info-label" style="width: 70px;">${t.floor}</span><span class="info-val"><span>${translatedFloor}</span></span></div>` : ''}
                <div class="info-row"><span class="info-label" style="width: 70px;">${t.area}</span><span class="info-val"><span>${client.squareMeters ? t.areaPrefix + ' ' + client.squareMeters + ' m²' : '-'}</span></span></div>
            </div>
            <!-- KONTAKT -->
            <div class="info-col" style="display: flex; flex-direction: column; justify-content: center; padding-top: 40px; gap: 15px;">
                ${client.phone ? `<div class="info-row"><span class="info-icon" style="font-size: 16px;">📞</span><span class="info-val" style="display: flex; align-items: center;"><span>${client.phone}</span></span></div>` : ''}
                ${client.email ? `<div class="info-row"><span class="info-icon" style="font-size: 16px;">✉</span><span class="info-val" style="display: flex; align-items: center;"><span>${client.email}</span></span></div>` : ''}
            </div>
        </div>

        <!-- Service Table -->
        <div class="service-section">
            <table class="service-table">
                <thead>
                    <tr>
                        <th class="col-nr">NR.</th>
                        <th class="col-le">${t.service}</th>
                        <th class="col-desc">${t.description}</th>
                        <th class="col-qty">${t.quantity}</th>
                        <th class="col-price">${t.unitPrice}</th>
                        <th class="col-total">${t.totalPrice}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="col-nr">1</td>
                        <td class="col-le">${translatedService}</td>
                        <td class="col-desc">${formattedRemarks.length > 0 ? '<ul style="margin: 0; padding-left: 15px; list-style-type: none; font-size: 11px; line-height: 1.6; column-count: 2; column-gap: 15px;"><li style="position: relative; padding-left: 8px; margin-bottom: 2px;"><span style="position: absolute; left: -2px; top: 0;">&bull;</span>' + formattedRemarks.join('</li><li style="position: relative; padding-left: 8px; margin-bottom: 2px;"><span style="position: absolute; left: -2px; top: 0;">&bull;</span>') + '</li></ul>' : t.defaultServiceDesc}</td>
                        <td class="col-qty">1</td>
                        <td class="col-price">CHF ${(client.totalPrice || 0).toFixed(2)}</td>
                        <td class="col-total">CHF ${(client.totalPrice || 0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div class="table-bottom-row">

                <div class="total-box">
                    <div class="total-box-title">${t.totalFixedPrice}</div>
                    <div class="total-box-amount">CHF ${(client.totalPrice || 0).toFixed(2)}</div>
                </div>
            </div>
        </div>

        <!-- Badges -->
        <div class="badges-row">
            <div class="badge">
                <div class="badge-icon">🛡️</div>
                <div class="badge-text"><strong>${t.acceptanceGuarantee}</strong>${t.acceptanceGuaranteeDesc}</div>
            </div>
            <div class="badge">
                <div class="badge-icon">✅</div>
                <div class="badge-text"><strong>${t.liabilityInsured}</strong>${t.liabilityInsuredDesc}</div>
            </div>
            <div class="badge">
                <div class="badge-icon">⭐</div>
                <div class="badge-text"><strong>${t.swissQuality}</strong>${t.swissQualityDesc}</div>
            </div>
            <div class="badge">
                <div class="badge-icon">🌿</div>
                <div class="badge-text"><strong>${t.ecoFriendly}</strong>${t.ecoFriendlyDesc}</div>
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures-row" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px;">
            <div class="sig-box" style="width: 30%;">
                <div class="sig-title">SWISSCLEANMOVE</div>
                <div class="sig-details">
                    <table style="width: 100%;">
                        <tr><td style="width: 80px;">${t.nameLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>${t.cleaningDateLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>${t.signatureLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                    </table>
                </div>
            </div>

            <!-- Middle Section for Date & Ort -->
            <div class="sig-box" style="width: 30%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; margin-bottom: 15px;">
                <div class="sig-details" style="text-align: center; font-size: 11px; color: #333;">
                    <strong>${t.cleaningDateLabel}</strong> ${new Date().toLocaleDateString()}<br><br>
                    <strong>${t.locationLabel}</strong> Biel
                </div>
            </div>

            <div class="sig-box" style="width: 30%;">
                <div class="sig-title"></div>
                <div class="sig-details">
                    <table style="width: 100%;">
                        <tr><td style="width: 80px;">${t.nameLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>${t.cleaningDateLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                        <tr><td>${t.signatureLabel}</td><td><span class="sig-line" style="width: 100%;"></span></td></tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Timing & Comm -->
        <div class="timing-row">
            <div class="timing-box">
                <div class="timing-icon">📅</div>
                <div class="timing-text">
                    <div><strong>${t.performancePeriod}</strong>${t.serviceStart}<br>${t.serviceEnd}</div>
                    <div><br>${new Date(client.fromDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${t.timeUnit}<br>${new Date(client.untilDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${t.timeUnit}</div>
                </div>
            </div>
            <div class="timing-box">
                <div class="timing-icon">👤</div>
                <div class="timing-text">
                    <div><strong>${t.communication}</strong>${t.communicationText}</div>
                </div>
            </div>
        </div>

        <!-- Footer Banner -->
        <div class="footer-banner">
            <div class="footer-banner-title">🏦 ${t.accountInformation}</div>
            <div class="footer-banner-items">
                <div class="footer-item"><span>${t.bankName}</span>PostFinance AG</div>
                <div class="footer-item"><span>IBAN</span>CH86 0900 0000 1636 3866 5</div>
                <div class="footer-item"><span>${t.accountHolder}</span>Dawit Gebrekristos / SwissCleanMove</div>
                <div class="footer-item"><span>${t.accountNo}</span>16-363866-5</div>
                <div class="footer-item"><span>${t.clearingNo}</span>09000</div>
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
}
