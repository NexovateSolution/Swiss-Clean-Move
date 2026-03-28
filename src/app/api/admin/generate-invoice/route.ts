import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'
import { LOGO_BASE64 } from '@/lib/logo-base64'
import { join } from 'path'
import { readFileSync } from 'fs'

function getTranslationDict(locale: string = 'en') {
    try {
        const fileContent = readFileSync(join(process.cwd(), 'messages', `${locale}.json`), 'utf-8');
        const msgs = JSON.parse(fileContent);
        const flatten = (obj: any): Record<string, string> => {
            let res: Record<string, string> = {};
            for(let k in obj) {
                if (typeof obj[k] === 'object' && obj[k] !== null) {
                    Object.assign(res, flatten(obj[k]));
                } else if (typeof obj[k] === 'string') {
                    res[k] = obj[k].replace(/[:*]/g, '').trim();
                }
            }
            return res;
        }
        return flatten(msgs?.serviceForm?.wizard || {});
    } catch (e) { 
        return {}; 
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

        // Comprehensive trilingual map for form field labels (keys)
        const keyLabels: Record<string, Record<string, string>> = {
            desiredService: { en: 'Desired Service', de: 'Gewünschte Dienstleistung', fr: 'Service souhaité' },
            cleaningLocation: { en: 'Cleaning Location', de: 'Reinigungsort', fr: 'Lieu de nettoyage' },
            objectType: { en: 'Property Type', de: 'Objekttyp', fr: "Type d'objet" },
            propertyType: { en: 'Property Type', de: 'Objektart', fr: "Type de propriété" },
            floorsLevel: { en: 'Floor', de: 'Stockwerk', fr: 'Étage' },
            numberOfRooms: { en: 'Number of Rooms', de: 'Anzahl Zimmer', fr: 'Nombre de pièces' },
            livingSpace: { en: 'Living Area (m²)', de: 'Wohnfläche (m²)', fr: 'Surface habitable (m²)' },
            livingArea: { en: 'Living Area (m²)', de: 'Wohnfläche (m²)', fr: 'Surface habitable (m²)' },
            rooms: { en: 'Rooms', de: 'Zimmer', fr: 'Pièces' },
            bedrooms: { en: 'Bedrooms', de: 'Schlafzimmer', fr: 'Chambres' },
            livingRooms: { en: 'Living Rooms', de: 'Wohnzimmer', fr: 'Salons' },
            bathrooms: { en: 'Bathrooms', de: 'Badezimmer', fr: 'Salles de bain' },
            separateWc: { en: 'Separate WC', de: 'Separates WC', fr: 'WC séparé' },
            kitchens: { en: 'Kitchens', de: 'Küchen', fr: 'Cuisines' },
            cleaningAreas: { en: 'Cleaning Areas', de: 'Reinigungsbereiche', fr: 'Zones de nettoyage' },
            sanitaryFeatures: { en: 'Sanitary Features', de: 'Sanitärausstattung', fr: 'Équipement sanitaire' },
            kitchenFeatures: { en: 'Kitchen Features', de: 'Küchenausstattung', fr: 'Équipement de cuisine' },
            normalWindows: { en: 'Normal Windows', de: 'Normale Fenster', fr: 'Fenêtres normales' },
            frenchDoors: { en: 'French Doors', de: 'Fenstertüren', fr: 'Portes-fenêtres' },
            otherGlassSurfaces: { en: 'Other Glass Surfaces', de: 'Andere Glasflächen', fr: 'Autres surfaces vitrées' },
            panoramicWindows: { en: 'Panoramic Windows', de: 'Panoramafenster', fr: 'Fenêtres panoramiques' },
            windowsCount: { en: 'Number of Windows', de: 'Anzahl Fenster', fr: 'Nombre de fenêtres' },
            windowType: { en: 'Window Type', de: 'Fenstertyp', fr: 'Type de fenêtre' },
            shadingType: { en: 'Shading Type', de: 'Beschattungsart', fr: "Type d'ombrage" },
            blinds: { en: 'Blinds/Shutters', de: 'Jalousien/Rollläden', fr: 'Stores/Volets' },
            windowSpecialFeatures: { en: 'Window Special Features', de: 'Fenster Besonderheiten', fr: 'Particularités des fenêtres' },
            floorTypes: { en: 'Floor Types', de: 'Bodenarten', fr: 'Types de sol' },
            otherRooms: { en: 'Other Rooms', de: 'Weitere Räume', fr: 'Autres pièces' },
            condition: { en: 'Condition', de: 'Zustand', fr: 'État' },
            pets: { en: 'Pets', de: 'Haustiere', fr: 'Animaux domestiques' },
            handoverDate: { en: 'Handover Date', de: 'Übergabedatum', fr: 'Date de remise' },
            cleaningDate: { en: 'Cleaning Date', de: 'Reinigungsdatum', fr: 'Date de nettoyage' },
            desiredCleaningDate: { en: 'Desired Cleaning Date', de: 'Gewünschter Reinigungstermin', fr: 'Date de nettoyage souhaitée' },
            deliveryHandoverDate: { en: 'Delivery/Handover Date', de: 'Liefer-/Übergabedatum', fr: 'Date de livraison/remise' },
            handoverOptions: { en: 'Handover Options', de: 'Übergabeoptionen', fr: 'Options de remise' },
            managementContact: { en: 'Management Contact', de: 'Verwaltungskontakt', fr: 'Contact de gestion' },
            keyHandover: { en: 'Key Handover', de: 'Schlüsselübergabe', fr: 'Remise des clés' },
            furtherRequests: { en: 'Further Requests', de: 'Weitere Wünsche', fr: 'Autres souhaits' },
            notes: { en: 'Notes', de: 'Bemerkungen', fr: 'Remarques' },
            cleaningServices: { en: 'Cleaning Services', de: 'Reinigungsleistungen', fr: 'Services de nettoyage' },
            outdoorServices: { en: 'Outdoor Services', de: 'Aussendienstleistungen', fr: 'Services extérieurs' },
            winterServices: { en: 'Winter Services', de: 'Winterdienst', fr: "Service d'hiver" },
            techServices: { en: 'Technical Services', de: 'Technische Dienstleistungen', fr: 'Services techniques' },
            wasteServices: { en: 'Waste Services', de: 'Abfallwirtschaft', fr: 'Gestion des déchets' },
            orgServices: { en: 'Organisation', de: 'Organisation', fr: 'Organisation' },
            additional: { en: 'Additional Services', de: 'Zusatzleistungen', fr: 'Services supplémentaires' },
            accessType: { en: 'Access Type', de: 'Zugangsart', fr: "Type d'accès" },
            contractType: { en: 'Contract Type', de: 'Vertragsart', fr: 'Type de contrat' },
            area: { en: 'Area (m²)', de: 'Fläche (m²)', fr: 'Surface (m²)' },
            units: { en: 'Units', de: 'Einheiten', fr: 'Unités' },
            floors: { en: 'Floors', de: 'Stockwerke', fr: 'Étages' },
            staircases: { en: 'Staircases', de: 'Treppenhäuser', fr: 'Cages d\'escalier' },
            elevators: { en: 'Elevators', de: 'Aufzüge', fr: 'Ascenseurs' },
            entrances: { en: 'Entrances', de: 'Eingänge', fr: 'Entrées' },
            parkingSpaces: { en: 'Parking Spaces', de: 'Parkplätze', fr: 'Places de parking' },
            specialReqs: { en: 'Special Requirements', de: 'Besondere Anforderungen', fr: 'Exigences spéciales' },
            desiredDate: { en: 'Desired Date', de: 'Wunschdatum', fr: 'Date souhaitée' },
            currentLiving: { en: 'Current Living', de: 'Aktuelle Wohnsituation', fr: 'Logement actuel' },
            currentFloor: { en: 'Current Floor', de: 'Aktuelles Stockwerk', fr: 'Étage actuel' },
            elevator: { en: 'Elevator', de: 'Aufzug', fr: 'Ascenseur' },
            currentLivingSpace: { en: 'Current Living Area', de: 'Aktuelle Wohnfläche', fr: 'Surface actuelle' },
            currentRooms: { en: 'Current Rooms', de: 'Aktuelle Zimmer', fr: 'Pièces actuelles' },
            movingToAddress: { en: 'Moving To Address', de: 'Umzugsadresse', fr: 'Adresse de déménagement' },
            newLivingSpace: { en: 'New Living Area', de: 'Neue Wohnfläche', fr: 'Nouvelle surface' },
            newRooms: { en: 'New Rooms', de: 'Neue Zimmer', fr: 'Nouvelles pièces' },
            peopleMoving: { en: 'People Moving', de: 'Anzahl Personen', fr: 'Nombre de personnes' },
            movingBoxes: { en: 'Moving Boxes', de: 'Umzugskartons', fr: 'Cartons de déménagement' },
            disposalType: { en: 'Disposal Type', de: 'Art der Entsorgung', fr: "Type d'élimination" },
            estimatedVolume: { en: 'Estimated Volume', de: 'Geschätztes Volumen', fr: 'Volume estimé' },
            materialAmount: { en: 'Material Amount', de: 'Materialmenge', fr: 'Quantité de matériel' },
            materials: { en: 'Materials', de: 'Materialien', fr: 'Matériaux' },
            wasteItems: { en: 'Waste Items', de: 'Entsorgungsartikel', fr: 'Articles à éliminer' },
            heavyItems: { en: 'Heavy Items', de: 'Schwere Gegenstände', fr: 'Objets lourds' },
            disassemblyNeeded: { en: 'Disassembly Needed', de: 'Demontage erforderlich', fr: 'Démontage nécessaire' },
            extraServices: { en: 'Extra Services', de: 'Zusatzleistungen', fr: 'Services supplémentaires' },
            additionalServices: { en: 'Additional Services', de: 'Zusatzleistungen', fr: 'Services supplémentaires' },
            phase: { en: 'Project Phase', de: 'Projektphase', fr: 'Phase du projet' },
            contamination: { en: 'Contamination', de: 'Verunreinigung', fr: 'Contamination' },
            windowIssues: { en: 'Window Issues', de: 'Fensterprobleme', fr: 'Problèmes de fenêtres' },
            siteConditions: { en: 'Site Conditions', de: 'Bedingungen vor Ort', fr: 'Conditions sur site' },
            facilityType: { en: 'Facility Type', de: 'Art der Einrichtung', fr: "Type d'établissement" },
            kitchenArea: { en: 'Kitchen Area', de: 'Küchenfläche', fr: 'Surface cuisine' },
            diningArea: { en: 'Dining Area', de: 'Gastraumfläche', fr: 'Surface salle' },
            seating: { en: 'Seating', de: 'Sitzplätze', fr: 'Places assises' },
            restrooms: { en: 'Restrooms', de: 'Toiletten', fr: 'Toilettes' },
            staffRestrooms: { en: 'Staff Restrooms', de: 'Personaltoiletten', fr: 'Toilettes personnel' },
            kitchenItems: { en: 'Kitchen Items', de: 'Küchengeräte', fr: 'Équipement cuisine' },
            diningItems: { en: 'Dining Items', de: 'Gastraum-Ausstattung', fr: 'Équipement salle' },
            specialAreas: { en: 'Special Areas', de: 'Spezialbereiche', fr: 'Zones spéciales' },
            sanitary: { en: 'Sanitary Rooms', de: 'Sanitärräume', fr: 'Sanitaires' },
            deploymentFrequency: { en: 'Deployment Frequency', de: 'Einsatzhäufigkeit', fr: "Fréquence d'intervention" },
            cleaningDuration: { en: 'Cleaning Duration', de: 'Reinigungsdauer', fr: 'Durée du nettoyage' },
            specialItems: { en: 'Special Items', de: 'Besonderheiten', fr: 'Particularités' },
            usage: { en: 'Usage', de: 'Nutzung', fr: 'Utilisation' },
            movingType: { en: 'Moving Type', de: 'Umzugsart', fr: 'Type de déménagement' },
            inventoryItems: { en: 'Inventory', de: 'Inventar', fr: 'Inventaire' },
            specialTransport: { en: 'Special Transport', de: 'Spezialtransport', fr: 'Transport spécial' },
            access: { en: 'Access', de: 'Zugang', fr: 'Accès' },
            difficultyItems: { en: 'Difficulties', de: 'Erschwernisse', fr: 'Difficultés' },
            materialItems: { en: 'Material', de: 'Material', fr: 'Matériel' },
            desiredHours: { en: 'Desired Hours', de: 'Gewünschte Stunden', fr: 'Heures souhaitées' },
            cleaningType: { en: 'Cleaning Type', de: 'Reinigungsart', fr: 'Type de nettoyage' },
            regularTasks: { en: 'Regular Tasks', de: 'Regelmässige Aufgaben', fr: 'Tâches régulières' },
            extraTasks: { en: 'Extra Tasks', de: 'Zusätzliche Aufgaben', fr: 'Tâches supplémentaires' },
        };

        // Comprehensive trilingual map for form field values  
        const valLabels: Record<string, Record<string, string>> = {
            'cleaning-only': { en: 'Cleaning Only', de: 'Nur Reinigung', fr: 'Nettoyage uniquement' },
            'moving-and-cleaning': { en: 'Moving & Cleaning', de: 'Umzug und Reinigung', fr: 'Déménagement et nettoyage' },
            apartment: { en: 'Apartment', de: 'Wohnung', fr: 'Appartement' },
            house: { en: 'House', de: 'Haus', fr: 'Maison' },
            'wg-room': { en: 'Shared Room (WG)', de: 'WG-Zimmer', fr: 'Chambre en colocation' },
            office: { en: 'Office', de: 'Büro', fr: 'Bureau' },
            'storage-cellar': { en: 'Storage/Cellar', de: 'Lager/Keller', fr: 'Dépôt/Cave' },
            studio: { en: 'Studio', de: 'Studio', fr: 'Studio' },
            storage: { en: 'Storage', de: 'Lager', fr: 'Dépôt' },
            ground: { en: 'Ground Floor', de: 'Erdgeschoss', fr: 'Rez-de-chaussée' },
            yes: { en: 'Yes', de: 'Ja', fr: 'Oui' },
            no: { en: 'No', de: 'Nein', fr: 'Non' },
            completeAll: { en: 'Complete / All', de: 'Komplett / Alles', fr: 'Complet / Tout' },
            cellar: { en: 'Cellar', de: 'Keller', fr: 'Cave' },
            atticScreed: { en: 'Attic', de: 'Estrich/Dachboden', fr: 'Grenier' },
            garage: { en: 'Garage', de: 'Garage', fr: 'Garage' },
            conservatory: { en: 'Conservatory', de: 'Wintergarten', fr: 'Véranda' },
            individualRooms: { en: 'Individual Rooms', de: 'Einzelne Zimmer', fr: 'Pièces individuelles' },
            shower: { en: 'Shower', de: 'Dusche', fr: 'Douche' },
            bathtub: { en: 'Bathtub', de: 'Badewanne', fr: 'Baignoire' },
            doubleSink: { en: 'Double Sink', de: 'Doppelwaschbecken', fr: 'Double lavabo' },
            guestWc: { en: 'Guest WC', de: 'Gäste-WC', fr: 'WC invités' },
            glassShowerWall: { en: 'Glass Shower Wall', de: 'Glasduschwand', fr: 'Paroi de douche en verre' },
            mirrors: { en: 'Mirrors', de: 'Spiegel', fr: 'Miroirs' },
            fittings: { en: 'Fittings', de: 'Armaturen', fr: 'Robinetterie' },
            oven: { en: 'Oven', de: 'Backofen', fr: 'Four' },
            cooktop: { en: 'Cooktop', de: 'Kochfeld', fr: 'Plaque de cuisson' },
            refrigerator: { en: 'Refrigerator', de: 'Kühlschrank', fr: 'Réfrigérateur' },
            freezer: { en: 'Freezer', de: 'Gefrierschrank', fr: 'Congélateur' },
            dishwasher: { en: 'Dishwasher', de: 'Geschirrspüler', fr: 'Lave-vaisselle' },
            extractorHood: { en: 'Extractor Hood', de: 'Dunstabzugshaube', fr: 'Hotte aspirante' },
            venetian: { en: 'Venetian Blinds', de: 'Jalousien', fr: 'Stores vénitiens' },
            rollerShutters: { en: 'Roller Shutters', de: 'Rollläden', fr: 'Volets roulants' },
            shutters: { en: 'Shutters', de: 'Fensterläden', fr: 'Volets' },
            slat: { en: 'Slat Blinds', de: 'Lamellenvorhang', fr: 'Stores à lamelles' },
            adjustable: { en: 'Adjustable', de: 'Verstellbar', fr: 'Réglable' },
            windowShutters: { en: 'Window Shutters', de: 'Fensterläden', fr: 'Volets de fenêtre' },
            otherSpecial: { en: 'Other/Special', de: 'Andere/Spezial', fr: 'Autre/Spécial' },
            heavilySoiled: { en: 'Heavily Soiled', de: 'Stark verschmutzt', fr: 'Très sale' },
            moldFrames: { en: 'Mold on Frames', de: 'Schimmel an Rahmen', fr: 'Moisissure sur les cadres' },
            smallCasement: { en: 'Small Casement', de: 'Kleine Flügel', fr: 'Petit battant' },
            roofWindow: { en: 'Roof Window', de: 'Dachfenster', fr: 'Fenêtre de toit' },
            safetyFilm: { en: 'Safety Film', de: 'Sicherheitsfolie', fr: 'Film de sécurité' },
            noSpecial: { en: 'None', de: 'Keine', fr: 'Aucune' },
            parquet: { en: 'Parquet', de: 'Parkett', fr: 'Parquet' },
            laminate: { en: 'Laminate', de: 'Laminat', fr: 'Stratifié' },
            tiles: { en: 'Tiles', de: 'Fliesen', fr: 'Carrelage' },
            stone: { en: 'Stone', de: 'Stein', fr: 'Pierre' },
            carpet: { en: 'Carpet', de: 'Teppich', fr: 'Moquette' },
            pvc: { en: 'PVC/Vinyl', de: 'PVC/Vinyl', fr: 'PVC/Vinyle' },
            concrete: { en: 'Concrete', de: 'Beton', fr: 'Béton' },
            epoxy: { en: 'Epoxy', de: 'Epoxid', fr: 'Époxy' },
            basement: { en: 'Basement', de: 'Keller', fr: 'Sous-sol' },
            attic: { en: 'Attic', de: 'Dachboden', fr: 'Grenier' },
            storageRoom: { en: 'Storage Room', de: 'Abstellraum', fr: 'Débarras' },
            normal: { en: 'Normal', de: 'Normal', fr: 'Normal' },
            nicotine: { en: 'Nicotine Damage', de: 'Nikotinschäden', fr: 'Dégâts de nicotine' },
            construction: { en: 'Construction Dirt', de: 'Bauschmutz', fr: 'Saleté de construction' },
            inspection: { en: 'Inspection', de: 'Abnahme', fr: 'Inspection' },
            guarantee: { en: 'Guarantee', de: 'Garantie', fr: 'Garantie' },
            inPerson: { en: 'In Person', de: 'Persönlich', fr: 'En personne' },
            mailbox: { en: 'Mailbox', de: 'Briefkasten', fr: 'Boîte aux lettres' },
            management: { en: 'Management', de: 'Verwaltung', fr: 'Gérance' },
            keyBox: { en: 'Key Box', de: 'Schlüsselbox', fr: 'Boîte à clés' },
            standard: { en: 'Standard', de: 'Standard', fr: 'Standard' },
            floorToCeiling: { en: 'Floor to Ceiling', de: 'Bodentief', fr: 'Du sol au plafond' },
            roofWindows: { en: 'Roof Windows', de: 'Dachfenster', fr: 'Fenêtres de toit' },
            largeSurfaces: { en: 'Large Surfaces', de: 'Grossflächen', fr: 'Grandes surfaces' },
            hardToAccess: { en: 'Hard to Access', de: 'Schwer zugänglich', fr: 'Difficile d\'accès' },
            stairwell: { en: 'Stairwell', de: 'Treppenhaus', fr: 'Cage d\'escalier' },
            outdoorMaintenance: { en: 'Outdoor Maintenance', de: 'Aussenunterhalt', fr: 'Entretien extérieur' },
            landscaping: { en: 'Landscaping', de: 'Gartenpflege', fr: 'Aménagement paysager' },
            outdoorCleaning: { en: 'Outdoor Cleaning', de: 'Aussenreinigung', fr: 'Nettoyage extérieur' },
            parking: { en: 'Parking', de: 'Parkplatz', fr: 'Parking' },
            snowRemoval: { en: 'Snow Removal', de: 'Schneeräumung', fr: 'Déneigement' },
            grittingService: { en: 'Gritting Service', de: 'Streudienst', fr: 'Service de salage' },
            techInspections: { en: 'Tech Inspections', de: 'Technische Kontrollen', fr: 'Contrôles techniques' },
            routineChecks: { en: 'Routine Checks', de: 'Routinekontrollen', fr: 'Contrôles de routine' },
            minorRepairs: { en: 'Minor Repairs', de: 'Kleine Reparaturen', fr: 'Petites réparations' },
            lightingChecks: { en: 'Lighting Checks', de: 'Beleuchtungskontrollen', fr: "Contrôles d'éclairage" },
            wasteHandling: { en: 'Waste Handling', de: 'Abfallentsorgung', fr: 'Gestion des déchets' },
            containerCleaning: { en: 'Container Cleaning', de: 'Containerreinigung', fr: 'Nettoyage de conteneurs' },
            disposalRecycling: { en: 'Disposal/Recycling', de: 'Entsorgung/Recycling', fr: 'Élimination/Recyclage' },
            emergency: { en: 'Emergency Service', de: 'Notdienst', fr: "Service d'urgence" },
            availability24h: { en: '24h Availability', de: '24h Verfügbarkeit', fr: 'Disponibilité 24h' },
            reports: { en: 'Reports', de: 'Berichte', fr: 'Rapports' },
            photoDoc: { en: 'Photo Documentation', de: 'Fotodokumentation', fr: 'Documentation photo' },
            free: { en: 'Free Access', de: 'Freier Zugang', fr: 'Accès libre' },
            key: { en: 'Key', de: 'Schlüssel', fr: 'Clé' },
            code: { en: 'Access Code', de: 'Zugangscode', fr: "Code d'accès" },
            ongoing: { en: 'Ongoing', de: 'Laufend', fr: 'En continu' },
            trial: { en: 'Trial Period', de: 'Probezeit', fr: "Période d'essai" },
            oneTime: { en: 'One-Time', de: 'Einmalig', fr: 'Unique' },
            weekly: { en: 'Weekly', de: 'Wöchentlich', fr: 'Hebdomadaire' },
            biweekly: { en: 'Bi-weekly', de: 'Zweiwöchentlich', fr: 'Bimensuel' },
            monthly: { en: 'Monthly', de: 'Monatlich', fr: 'Mensuel' },
            custom: { en: 'Custom', de: 'Individuell', fr: 'Personnalisé' },
            daily: { en: 'Daily', de: 'Täglich', fr: 'Quotidien' },
            twoThreeTimes: { en: '2-3 Times/Week', de: '2-3 Mal/Woche', fr: '2-3 fois/semaine' },
            daytime: { en: 'Daytime', de: 'Tagsüber', fr: 'Journée' },
            earlyMorning: { en: 'Early Morning', de: 'Frühmorgens', fr: 'Tôt le matin' },
            morning: { en: 'Morning', de: 'Morgens', fr: 'Matin' },
            afternoon: { en: 'Afternoon', de: 'Nachmittags', fr: 'Après-midi' },
            evening: { en: 'Evening', de: 'Abends', fr: 'Soir' },
            night: { en: 'Night', de: 'Nachts', fr: 'Nuit' },
            flexible: { en: 'Flexible', de: 'Flexibel', fr: 'Flexible' },
            houseRules: { en: 'House Rules', de: 'Hausordnung', fr: "Règlement d'immeuble" },
            keyAvailable: { en: 'Key Available', de: 'Schlüssel vorhanden', fr: 'Clé disponible' },
            contactOnSite: { en: 'Contact on Site', de: 'Ansprechperson vor Ort', fr: 'Contact sur place' },
            serviceSpecs: { en: 'Service Specifications', de: 'Leistungsbeschrieb', fr: 'Cahier des charges' },
            disposal: { en: 'Disposal', de: 'Entsorgung', fr: 'Élimination' },
            eviction: { en: 'Eviction', de: 'Räumung', fr: 'Éviction' },
            'disposal-clearance': { en: 'Disposal & Clearance', de: 'Entsorgung & Räumung', fr: 'Élimination & Débarras' },
            directAccess: { en: 'Direct Access', de: 'Direkter Zugang', fr: 'Accès direct' },
            narrowStairs: { en: 'Narrow Stairs', de: 'Enge Treppen', fr: 'Escaliers étroits' },
            parkingAvailable: { en: 'Parking Available', de: 'Parkplatz vorhanden', fr: 'Parking disponible' },
            small: { en: 'Small', de: 'Klein', fr: 'Petit' },
            medium: { en: 'Medium', de: 'Mittel', fr: 'Moyen' },
            large: { en: 'Large', de: 'Gross', fr: 'Grand' },
            veryLarge: { en: 'Very Large', de: 'Sehr gross', fr: 'Très grand' },
            dontKnow: { en: "Don't Know", de: 'Weiss nicht', fr: 'Ne sait pas' },
            little: { en: 'Little', de: 'Wenig', fr: 'Peu' },
            lots: { en: 'A Lot', de: 'Viel', fr: 'Beaucoup' },
            furniture: { en: 'Furniture', de: 'Möbel', fr: 'Meubles' },
            electronic: { en: 'Electronics', de: 'Elektronik', fr: 'Électronique' },
            wood: { en: 'Wood', de: 'Holz', fr: 'Bois' },
            metal: { en: 'Metal', de: 'Metall', fr: 'Métal' },
            paper: { en: 'Paper', de: 'Papier', fr: 'Papier' },
            garden: { en: 'Garden Waste', de: 'Gartenabfall', fr: 'Déchets de jardin' },
            hazardous: { en: 'Hazardous', de: 'Gefahrenstoffe', fr: 'Matières dangereuses' },
            electrical: { en: 'Electrical', de: 'Elektrogeräte', fr: 'Appareils électriques' },
            cardboard: { en: 'Cardboard', de: 'Karton', fr: 'Carton' },
            textiles: { en: 'Textiles', de: 'Textilien', fr: 'Textiles' },
            piano: { en: 'Piano', de: 'Klavier', fr: 'Piano' },
            safe: { en: 'Safe', de: 'Tresor', fr: 'Coffre-fort' },
            fitness: { en: 'Fitness Equipment', de: 'Fitnessgeräte', fr: 'Équipement fitness' },
            none: { en: 'None', de: 'Keine', fr: 'Aucun' },
            demolition: { en: 'Demolition', de: 'Abbruch', fr: 'Démolition' },
            packing: { en: 'Packing', de: 'Verpackung', fr: 'Emballage' },
            cleaning: { en: 'Cleaning', de: 'Reinigung', fr: 'Nettoyage' },
            painting: { en: 'Painting', de: 'Malerarbeiten', fr: 'Peinture' },
            broomCleaning: { en: 'Broom Cleaning', de: 'Besenrein', fr: 'Nettoyage au balai' },
            immediate: { en: 'Immediately', de: 'Sofort', fr: 'Immédiatement' },
            thisWeek: { en: 'This Week', de: 'Diese Woche', fr: 'Cette semaine' },
            thisMonth: { en: 'This Month', de: 'Diesen Monat', fr: 'Ce mois-ci' },
            rough: { en: 'Rough Cleaning', de: 'Grobreinigung', fr: 'Nettoyage grossier' },
            intermediate: { en: 'Intermediate Cleaning', de: 'Zwischenreinigung', fr: 'Nettoyage intermédiaire' },
            fine: { en: 'Fine Cleaning', de: 'Feinreinigung', fr: 'Nettoyage fin' },
            handover: { en: 'Handover Cleaning', de: 'Übergabereinigung', fr: 'Nettoyage de remise' },
            paint: { en: 'Paint', de: 'Farbe', fr: 'Peinture' },
            cement: { en: 'Cement', de: 'Zement', fr: 'Ciment' },
            glue: { en: 'Glue', de: 'Kleber', fr: 'Colle' },
            dust: { en: 'Dust', de: 'Staub', fr: 'Poussière' },
            silicone: { en: 'Silicone', de: 'Silikon', fr: 'Silicone' },
            paintSpoils: { en: 'Paint Spoils', de: 'Farbspritzer', fr: 'Éclaboussures de peinture' },
            stickers: { en: 'Stickers', de: 'Aufkleber', fr: 'Autocollants' },
            wasteDisposal: { en: 'Waste Disposal', de: 'Abfallentsorgung', fr: 'Élimination des déchets' },
            container: { en: 'Container', de: 'Container', fr: 'Conteneur' },
            facade: { en: 'Facade Cleaning', de: 'Fassadenreinigung', fr: 'Nettoyage de façade' },
            highPressure: { en: 'High Pressure', de: 'Hochdruck', fr: 'Haute pression' },
            sealing: { en: 'Sealing', de: 'Versiegelung', fr: 'Scellement' },
            water: { en: 'Water Available', de: 'Wasser vorhanden', fr: 'Eau disponible' },
            electricity: { en: 'Electricity Available', de: 'Strom vorhanden', fr: 'Électricité disponible' },
            restaurant: { en: 'Restaurant', de: 'Restaurant', fr: 'Restaurant' },
            cafe: { en: 'Café', de: 'Café', fr: 'Café' },
            bar: { en: 'Bar', de: 'Bar', fr: 'Bar' },
            canteen: { en: 'Canteen', de: 'Kantine', fr: 'Cantine' },
            hotel: { en: 'Hotel', de: 'Hotel', fr: 'Hôtel' },
            takeaway: { en: 'Takeaway', de: 'Takeaway', fr: 'À emporter' },
            club: { en: 'Club', de: 'Club', fr: 'Club' },
            extractorHoods: { en: 'Extractor Hoods', de: 'Dunstabzugshauben', fr: 'Hottes aspirantes' },
            greaseTraps: { en: 'Grease Traps', de: 'Fettabscheider', fr: 'Bacs à graisse' },
            ovens: { en: 'Ovens', de: 'Öfen', fr: 'Fours' },
            deepFryers: { en: 'Deep Fryers', de: 'Fritteusen', fr: 'Friteuses' },
            coolingUnits: { en: 'Cooling Units', de: 'Kühlgeräte', fr: 'Unités de refroidissement' },
            drains: { en: 'Drains', de: 'Abflüsse', fr: 'Évacuations' },
            walls: { en: 'Walls', de: 'Wände', fr: 'Murs' },
            coldStorage: { en: 'Cold Storage', de: 'Kühlraum', fr: 'Chambre froide' },
            staffRooms: { en: 'Staff Rooms', de: 'Personalräume', fr: 'Locaux du personnel' },
            outdoor: { en: 'Outdoor Area', de: 'Aussenbereich', fr: 'Espace extérieur' },
            smoking: { en: 'Smoking Area', de: 'Raucherbereich', fr: 'Espace fumeurs' },
            pestControl: { en: 'Pest Control', de: 'Schädlingsbekämpfung', fr: 'Lutte antiparasitaire' },
            laundry: { en: 'Laundry', de: 'Wäsche', fr: 'Linge' },
            consumables: { en: 'Consumables', de: 'Verbrauchsmaterial', fr: 'Consommables' },
            haccp: { en: 'HACCP Documentation', de: 'HACCP-Dokumentation', fr: 'Documentation HACCP' },
            vacuuming: { en: 'Vacuuming', de: 'Staubsaugen', fr: 'Aspiration' },
            wetMopping: { en: 'Wet Mopping', de: 'Nassreinigung', fr: 'Nettoyage humide' },
            dusting: { en: 'Dusting', de: 'Staubwischen', fr: 'Dépoussiérage' },
            kitchen: { en: 'Kitchen', de: 'Küche', fr: 'Cuisine' },
            officesRooms: { en: 'Offices/Rooms', de: 'Büros/Räume', fr: 'Bureaux/Pièces' },
            windows: { en: 'Windows', de: 'Fenster', fr: 'Fenêtres' },
            waste: { en: 'Waste', de: 'Abfall', fr: 'Déchets' },
            hours12: { en: '1-2 Hours', de: '1-2 Stunden', fr: '1-2 heures' },
            hours23: { en: '2-3 Hours', de: '2-3 Stunden', fr: '2-3 heures' },
            hours35: { en: '3-5 Hours', de: '3-5 Stunden', fr: '3-5 heures' },
            halfDay: { en: 'Half Day', de: 'Halbtags', fr: 'Demi-journée' },
            children: { en: 'Children', de: 'Kinder', fr: 'Enfants' },
            alarmSystem: { en: 'Alarm System', de: 'Alarmsystem', fr: "Système d'alarme" },
            'private': { en: 'Private', de: 'Privat', fr: 'Privé' },
            commercial: { en: 'Commercial', de: 'Gewerblich', fr: 'Commercial' },
            highTraffic: { en: 'High Traffic', de: 'Hohe Frequenz', fr: 'Forte fréquentation' },
            industrial: { en: 'Industrial', de: 'Industrie', fr: 'Industriel' },
            'public': { en: 'Public', de: 'Öffentlich', fr: 'Public' },
            apartmentBuilding: { en: 'Apartment Building', de: 'Mehrfamilienhaus', fr: "Immeuble d'habitation" },
            commercialProperty: { en: 'Commercial Property', de: 'Gewerbeliegenschaft', fr: 'Propriété commerciale' },
            residentialComplex: { en: 'Residential Complex', de: 'Wohnkomplex', fr: 'Complexe résidentiel' },
            officeBuilding: { en: 'Office Building', de: 'Bürogebäude', fr: 'Immeuble de bureaux' },
            practice: { en: 'Practice', de: 'Praxis', fr: 'Cabinet' },
            retailStore: { en: 'Retail Store', de: 'Laden', fr: 'Magasin' },
            Unique: { en: 'One-Time', de: 'Einmalig', fr: 'Unique' },
            'Every other week': { en: 'Every other week', de: 'Alle zwei Wochen', fr: 'Toutes les deux semaines' },
            Weekly: { en: 'Weekly', de: 'Wöchentlich', fr: 'Hebdomadaire' },
            'Several times a week': { en: 'Several times/week', de: 'Mehrmals pro Woche', fr: 'Plusieurs fois/semaine' },
            Daily: { en: 'Daily', de: 'Täglich', fr: 'Quotidien' },
            severalTimes: { en: 'Several Times/Week', de: 'Mehrmals/Woche', fr: 'Plusieurs fois/semaine' },
            onDemand: { en: 'On Demand', de: 'Auf Abruf', fr: 'Sur demande' },
            deepCleaning: { en: 'Deep Cleaning', de: 'Grundreinigung', fr: 'Nettoyage en profondeur' },
        };

        const lang = language as string;
        const tKey = (key: string): string => keyLabels[key]?.[lang] || keyLabels[key]?.['en'] || key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
        const tVal = (val: string): string => {
            if (valLabels[val]?.[lang]) return valLabels[val][lang];
            // Try camelCase conversion for kebab-case values
            const camel = val.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            if (valLabels[camel]?.[lang]) return valLabels[camel][lang];
            return valLabels[val]?.['en'] || valLabels[camel]?.['en'] || val;
        };

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
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; border-bottom: 2px solid #555; padding-bottom: 15px; }
            .logo-section { display: flex; align-items: center; gap: 15px; }
            .company-info { text-align: right; font-size: 12px; color: #333; line-height: 1.6; }
            .company-info strong { font-size: 14px; color: #000; }
            
            .address-and-ref-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-top: 15mm;
                margin-bottom: 10mm;
            }
            .address-window {
                width: 90mm;
                font-family: Arial, sans-serif;
                margin-top: -25px;
                margin-left: 45px;
            }
            .address-window-sender { font-size: 8px; color: #666; margin-bottom: 15px; text-decoration: underline; }
            .address-recipient { font-size: 14px; line-height: 1.4; color: #000; }
            
            .ref-info-block {
                width: 55mm;
                font-size: 13px;
                line-height: 1.8;
                color: #333;
                text-align: left;
            }
            .ref-info-block table { border-collapse: collapse; }
            .ref-info-block td { padding: 2px 0; vertical-align: top; }
            .ref-info-block td:first-child { font-weight: normal; color: #555; padding-right: 15px; white-space: nowrap; }
            .ref-info-block td:last-child { font-weight: normal; color: #000; }
            
            .title { text-align: center; font-size: 20px; font-weight: bold; color: #333; margin: 20px 0; }
            .order-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .client-info { display: none; } /* Hidden because now in address window */
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
                /* Standard QR bill height: 105mm -> ~396px at 96dpi, width 210mm -> ~793px */
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
                width: 62mm; /* Exactly 62mm wide */
                position: relative;
            }
            .payment-slip-right { 
                width: 148mm; /* Exactly 148mm wide */
                padding-left: 5mm; /* Standard margin */
            }
            .scissors-line-vertical {
                position: absolute;
                right: -1px; /* border offset */
                top: -10px; /* start at the top scissors */
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
                width: 46mm; /* Exactly 46x46 QR Code */
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

        <div class="address-and-ref-row">
            <div class="address-window">
                <div class="address-window-sender">
                    SwissCleanMove - Orpundstrasse 31 - 2504 Biel/Bienne
                </div>
                <div class="address-recipient">
                    <strong>${clientName}</strong><br>
                    ${invoiceAddr ? invoiceAddr + '<br>' : ''}
                    ${invoiceZip} ${invoiceCity}
                </div>
            </div>
            <div class="ref-info-block">
                <table>
                    <tr>
                        <td>${t.invoiceRef}</td>
                        <td>${orderNumber}</td>
                    </tr>
                    <tr>
                        <td>${t.invoiceDate}</td>
                        <td>${currentDate}</td>
                    </tr>
                    <tr>
                        <td>${t.paymentDeadline}</td>
                        <td>${(() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toLocaleDateString(); })()}</td>
                    </tr>
                </table>
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
                            ${client.buildingType || 'N/A'} • ${client.squareMeters || 0}m²<br>
                            ${client.numberOfRooms ? `${client.numberOfRooms} ${t.room}<br>` : ''}
                            ${client.floor ? `${t.floorLabel}: ${translatedFloor}<br>` : ''}
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

        ${(formattedRemarks.length > 0) ? `
        <div class="remarks-section">
            <h4 style="margin-bottom: 5px; color: #333;">${t.remarks}</h4>
            ${formattedRemarks.map(r => `<p style="margin: 2px 0;">• ${r}</p>`).join('\n')}
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
