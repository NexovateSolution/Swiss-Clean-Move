import { QuoteResult } from './pricingEngine';
import fs from 'fs';
import path from 'path';

export function generateQuoteHtml(quote: QuoteResult, customer: any, documentType: 'quote' | 'contract' | 'receipt' | 'invoice' = 'quote'): string {
  const locale = (customer.locale || 'de') as 'de' | 'en' | 'fr' | 'it';

  const pdfDict = {
    de: {
      thankYou: 'Herzlichen Dank',
      thankYouDesc: documentType === 'quote' ? 'FÜR IHRE ANFRAGE UND DAS VERTRAUEN IN SWISSCLEANMOVE' : 'FÜR IHREN AUFTRAG UND DAS VERTRAUEN IN SWISSCLEANMOVE',
      offer: documentType === 'quote' ? 'OFFERTE' : 'AUFTRAGSBESTÄTIGUNG',
      transparent: 'TRANSPARENT, ZUVERLÄSSIG, PROFESSIONELL',
      quoteNo: documentType === 'quote' ? 'OFFERTE-NR:' : 'VERTRAGS-NR:',
      quoteDate: documentType === 'quote' ? 'OFFERTDATUM:' : 'VERTRAGSDATUM:',
      customer: 'KUNDEN',
      objectData: 'OBJEKTDATEN',
      date: 'Datum:',
      propertyType: 'Objektart:',
      area: 'Fläche:',
      rooms: 'Zimmer:',
      lift: 'Lift:',
      parking: 'Parkplatz:',
      cleaningType: 'Reinigungsart:',
      frequency: 'Turnus:',
      destinationAddress: 'Zieladresse:',
      destinationType: 'Ziel Objektart:',
      destinationArea: 'Ziel Fläche:',
      destinationLift: 'Ziel Lift:',
      destinationParking: 'Ziel Parkplatz:',
      scope: 'LEISTUNGSUMFANG',
      scopeDesc: 'Professionelle Erledigung gemäss Ihren Angaben:',
      quoteFixed: 'ANGEBOT – FESTPREIS',
      position: 'POSITION',
      price: 'PREIS (CHF)',
      subtotal: 'ZWISCHENSUMME',
      discount: 'RABATT 5 %',
      youSave: 'SIE SPAREN',
      totalFixed: 'GESAMTPREIS (Festpreis)',
      guaranteeTitle: '100 % ABNAHMEGARANTIE',
      guaranteeDesc: 'Wir reinigen professionell inkl. Schweizer Übergabegarantie.',
      validTitle: documentType === 'quote' ? 'DIESE OFFERTE IST GÜLTIG' : 'VERTRAGSDAUER',
      validDesc: documentType === 'quote' ? 'Diese Offerte ist während 30 Tagen gültig. Wir danken Ihnen für das Vertrauen und freuen uns auf die Zusammenarbeit.' : 'Dieser Vertrag ist verbindlich. Wir danken Ihnen für das Vertrauen und freuen uns auf die Zusammenarbeit.',
      confirmation: 'KUNDENBESTÄTIGUNG',
      signature: 'Unterschrift:',
      lookingForward: 'WIR FREUEN UNS AUF IHREN AUFTRAG',
      questions: 'Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.',
      regards: 'Freundliche Grüsse',
      team: 'Ihr SwissCleanMove Team',
      footerQuality: 'PREMIUM QUALITÄT',
      footerReliable: 'ZUVERLÄSSIG & PÜNKTLICH',
      footerSolution: 'IMMER LÖSUNGSORIENTIERT',
      footerCleanliness: 'SAUBERKEIT AUF DIE SIE SICH VERLASSEN KÖNNEN',
      onRequest: 'Auf Anfrage',
      receiptOffer: 'QUITTUNG',
      receiptThankYouDesc: documentType === 'invoice' ? 'Vielen Dank für Ihren Auftrag. Gerne stellen wir Ihnen Folgendes in Rechnung.' : 'Vielen Dank für Ihr Vertrauen und den erteilten Auftrag.',
      receiptDate: documentType === 'invoice' ? 'RECHNUNGSDATUM' : 'QUITTUNGSDATUM',
      receiptNo: documentType === 'invoice' ? 'RECHNUNGSNUMMER' : 'QUITTUNGSNUMMER',
      receiptPaymentMethod: 'ZAHLUNGSART',
      receiptPaymentMethodValue: documentType === 'invoice' ? 'Banküberweisung / Bar' : 'Barzahlung',
      receiptIssuedBy: 'AUSGESTELLT VON',
      receiptIssuedByValue: 'SwissCleanMove',
      receiptDesc: 'BESCHREIBUNG',
      receiptAmount: 'BETRAG (CHF)',
      receiptTotal: 'GESAMTBETRAG',
      receiptConfirm: 'Hiermit bestätigen wir den Erhalt des Gesamtbetrags von CHF {total}.<br><strong>Vielen Dank für Ihr Vertrauen!</strong>',
      receiptObjectAddress: 'Objektadresse',
      receiptArea: 'Fläche',
      receiptSpecialNotes: 'Besonderheit',
      receiptAppointment: 'Reinigungstermin',
      receiptPaymentTitle: 'ZAHLUNG',
      receiptPaymentDesc: documentType === 'invoice' ? 'Zahlbar innert 10 Tagen' : 'Barzahlung<br>nach Abschluss der Reinigung.',
      receiptFooterServices: 'Reinigung • Umzug • Facility Services',
      receiptFooterThanks: documentType === 'invoice' ? 'Wir danken für Ihren Auftrag!' : 'Für Ihre Unterlagen – Danke für Ihren Auftrag!',
      receiptFeature1: 'Zuverlässig. Wir sind für Sie da.',
      receiptFeature2: 'Schweizer Qualität. Professionell & effizient.',
      receiptFeature3: 'Schweizweit im Einsatz. Für Privat & Gewerbe.'
    },
    en: {
      thankYou: 'Thank You',
      thankYouDesc: documentType === 'quote' ? 'FOR YOUR INQUIRY AND TRUST IN SWISSCLEANMOVE' : 'FOR YOUR ORDER AND TRUST IN SWISSCLEANMOVE',
      offer: documentType === 'quote' ? 'QUOTE' : 'CONTRACT',
      transparent: 'TRANSPARENT, RELIABLE, PROFESSIONAL',
      quoteNo: documentType === 'quote' ? 'QUOTE NO:' : 'CONTRACT NO:',
      quoteDate: documentType === 'quote' ? 'QUOTE DATE:' : 'CONTRACT DATE:',
      customer: 'CUSTOMER',
      objectData: 'PROPERTY DATA',
      date: 'Date:',
      propertyType: 'Property Type:',
      area: 'Area:',
      rooms: 'Rooms:',
      lift: 'Lift:',
      parking: 'Parking:',
      cleaningType: 'Cleaning Type:',
      frequency: 'Frequency:',
      destinationAddress: 'Destination Address:',
      destinationType: 'Destination Type:',
      destinationArea: 'Destination Area:',
      destinationLift: 'Destination Lift:',
      destinationParking: 'Destination Parking:',
      scope: 'SCOPE OF SERVICES',
      scopeDesc: 'Professional execution according to your specifications:',
      quoteFixed: 'QUOTE - FIXED PRICE',
      position: 'POSITION',
      price: 'PRICE (CHF)',
      subtotal: 'SUBTOTAL',
      discount: 'DISCOUNT 5 %',
      youSave: 'YOU SAVE',
      totalFixed: 'TOTAL (Fixed Price)',
      guaranteeTitle: '100% ACCEPTANCE GUARANTEE',
      guaranteeDesc: 'We clean professionally incl. Swiss handover guarantee.',
      validTitle: documentType === 'quote' ? 'THIS QUOTE IS VALID' : 'CONTRACT VALIDITY',
      validDesc: documentType === 'quote' ? 'This quote is valid for 30 days. We thank you for your trust and look forward to working with you.' : 'This contract is binding. We thank you for your trust and look forward to working with you.',
      confirmation: 'CUSTOMER CONFIRMATION',
      signature: 'Signature:',
      lookingForward: 'WE LOOK FORWARD TO YOUR ORDER',
      questions: 'If you have any questions, please do not hesitate to contact us.',
      regards: 'Kind regards',
      team: 'Your SwissCleanMove Team',
      footerQuality: 'PREMIUM QUALITY',
      footerReliable: 'RELIABLE & PUNCTUAL',
      footerSolution: 'ALWAYS SOLUTION-ORIENTED',
      footerCleanliness: 'CLEANLINESS YOU CAN RELY ON',
      onRequest: 'On Request',
      receiptOffer: documentType === 'invoice' ? 'INVOICE' : 'RECEIPT',
      receiptThankYouDesc: documentType === 'invoice' ? 'Thank you for your order. We are pleased to invoice you for the following.' : 'Thank you for your trust and your order.',
      receiptDate: documentType === 'invoice' ? 'INVOICE DATE' : 'RECEIPT DATE',
      receiptNo: documentType === 'invoice' ? 'INVOICE NUMBER' : 'RECEIPT NUMBER',
      receiptPaymentMethod: 'PAYMENT METHOD',
      receiptPaymentMethodValue: documentType === 'invoice' ? 'Bank Transfer / Cash' : 'Cash',
      receiptIssuedBy: 'ISSUED BY',
      receiptIssuedByValue: 'SwissCleanMove',
      receiptDesc: 'DESCRIPTION',
      receiptAmount: 'AMOUNT (CHF)',
      receiptTotal: 'TOTAL AMOUNT',
      receiptConfirm: 'We hereby confirm receipt of the total amount of CHF {total}.<br><strong>Thank you for your trust!</strong>',
      receiptObjectAddress: 'Property Address',
      receiptArea: 'Area',
      receiptSpecialNotes: 'Special Notes',
      receiptAppointment: 'Cleaning Appointment',
      receiptPaymentTitle: 'PAYMENT',
      receiptPaymentDesc: documentType === 'invoice' ? 'Payable within 10 days' : 'Cash payment<br>upon completion of service.',
      receiptFooterServices: 'Cleaning • Moving • Facility Services',
      receiptFooterThanks: documentType === 'invoice' ? 'Thank you for your order!' : 'For your records – Thank you for your order!',
      receiptFeature1: 'Reliable. We are here for you.',
      receiptFeature2: 'Swiss Quality. Professional & efficient.',
      receiptFeature3: 'Operating nationwide. For private & business.'
    },
    fr: {
      thankYou: 'Merci Beaucoup',
      thankYouDesc: documentType === 'quote' ? 'POUR VOTRE DEMANDE ET VOTRE CONFIANCE EN SWISSCLEANMOVE' : 'POUR VOTRE COMMANDE ET VOTRE CONFIANCE EN SWISSCLEANMOVE',
      offer: documentType === 'quote' ? 'DEVIS' : 'CONTRAT',
      transparent: 'TRANSPARENT, FIABLE, PROFESSIONNEL',
      quoteNo: documentType === 'quote' ? 'DEVIS N°:' : 'CONTRAT N°:',
      quoteDate: documentType === 'quote' ? 'DATE DU DEVIS:' : 'DATE DU CONTRAT:',
      customer: 'CLIENT',
      objectData: 'DONNÉES DE LA PROPRIÉTÉ',
      date: 'Date:',
      propertyType: 'Type de Propriété:',
      area: 'Surface:',
      rooms: 'Pièces:',
      lift: 'Ascenseur:',
      parking: 'Parking:',
      cleaningType: 'Type de Nettoyage:',
      frequency: 'Fréquence:',
      destinationAddress: 'Adresse de Dest.:',
      destinationType: 'Type de Dest.:',
      destinationArea: 'Surface de Dest.:',
      destinationLift: 'Ascenseur Dest.:',
      destinationParking: 'Parking Dest.:',
      scope: 'ÉTENDUE DES SERVICES',
      scopeDesc: 'Exécution professionnelle selon vos spécifications:',
      quoteFixed: 'DEVIS - PRIX FIXE',
      position: 'POSITION',
      price: 'PRIX (CHF)',
      subtotal: 'SOUS-TOTAL',
      discount: 'REMISE 5 %',
      youSave: 'VOUS ÉCONOMISEZ',
      totalFixed: 'TOTAL (Prix Fixe)',
      guaranteeTitle: 'GARANTIE D\'ACCEPTATION À 100%',
      guaranteeDesc: 'Nous nettoyons professionnellement incl. garantie de remise suisse.',
      validTitle: documentType === 'quote' ? 'CE DEVIS EST VALABLE' : 'VALIDITÉ DU CONTRAT',
      validDesc: documentType === 'quote' ? 'Ce devis est valable pendant 30 jours. Nous vous remercions de votre confiance.' : 'Ce contrat est contraignant. Nous vous remercions de votre confiance.',
      confirmation: 'CONFIRMATION DU CLIENT',
      signature: 'Signature:',
      lookingForward: 'NOUS ATTENDONS VOTRE COMMANDE',
      questions: 'Si vous avez des questions, n\'hésitez pas à nous contacter.',
      regards: 'Meilleures salutations',
      team: 'Votre équipe SwissCleanMove',
      footerQuality: 'QUALITÉ PREMIUM',
      footerReliable: 'FIABLE & PONCTUEL',
      footerSolution: 'TOUJOURS ORIENTÉ SOLUTION',
      footerCleanliness: 'UNE PROPRETÉ SUR LAQUELLE VOUS POUVEZ COMPTER',
      onRequest: 'Sur Demande',
      receiptOffer: documentType === 'invoice' ? 'FACTURE' : 'REÇU',
      receiptThankYouDesc: documentType === 'invoice' ? 'Merci pour votre commande. Nous avons le plaisir de vous facturer ce qui suit.' : 'Nous vous remercions de votre confiance et de votre commande.',
      receiptDate: documentType === 'invoice' ? 'DATE DE FACTURE' : 'DATE DU REÇU',
      receiptNo: documentType === 'invoice' ? 'NUMÉRO DE FACTURE' : 'NUMÉRO DE REÇU',
      receiptPaymentMethod: 'MÉTHODE DE PAIEMENT',
      receiptPaymentMethodValue: documentType === 'invoice' ? 'Virement bancaire / Espèces' : 'Espèces',
      receiptIssuedBy: 'ÉMIS PAR',
      receiptIssuedByValue: 'SwissCleanMove',
      receiptDesc: 'DESCRIPTION',
      receiptAmount: 'MONTANT (CHF)',
      receiptTotal: 'MONTANT TOTAL',
      receiptConfirm: 'Nous confirmons par la présente la réception du montant total de CHF {total}.<br><strong>Merci pour votre confiance !</strong>',
      receiptObjectAddress: 'Adresse de l\'objet',
      receiptArea: 'Surface',
      receiptSpecialNotes: 'Particularités',
      receiptAppointment: 'Rendez-vous de nettoyage',
      receiptPaymentTitle: 'PAIEMENT',
      receiptPaymentDesc: documentType === 'invoice' ? 'Payable sous 10 jours' : 'Paiement en espèces<br>après achèvement du service.',
      receiptFooterServices: 'Nettoyage • Déménagement • Facility Services',
      receiptFooterThanks: documentType === 'invoice' ? 'Nous vous remercions pour votre commande!' : 'Pour vos archives – Merci pour votre commande !',
      receiptFeature1: 'Fiable. Nous sommes là pour vous.',
      receiptFeature2: 'Qualité suisse. Professionnel & efficace.',
      receiptFeature3: 'En service dans toute la Suisse. Privé & entreprise.'
    }, it: {
      thankYou: 'Grazie Mille',
      thankYouDesc: documentType === 'quote' ? 'PER LA VOSTRA RICHIESTA E LA FIDUCIA IN SWISSCLEANMOVE' : 'PER IL VOSTRO ORDINE E LA FIDUCIA IN SWISSCLEANMOVE',
      offer: documentType === 'quote' ? 'PREVENTIVO' : 'CONTRATTO',
      transparent: 'TRASPARENTE, AFFIDABILE, PROFESSIONALE',
      quoteNo: documentType === 'quote' ? 'PREVENTIVO N°:' : 'CONTRATTO N°:',
      quoteDate: documentType === 'quote' ? 'DATA PREVENTIVO:' : 'DATA CONTRATTO:',
      customer: 'CLIENTE',
      objectData: 'DATI DELL\'IMMOBILE',
      date: 'Data:',
      propertyType: 'Tipo di immobile:',
      area: 'Superficie:',
      rooms: 'Locali:',
      lift: 'Ascensore:',
      parking: 'Parcheggio:',
      cleaningType: 'Tipo di pulizia:',
      frequency: 'Frequenza:',
      destinationAddress: 'Indirizzo di destinazione:',
      destinationType: 'Tipo di destinazione:',
      destinationArea: 'Superficie di dest.:',
      destinationLift: 'Ascensore dest.:',
      destinationParking: 'Parcheggio dest.:',
      scope: 'AMBITO DEI SERVIZI',
      scopeDesc: 'Esecuzione professionale secondo le vostre specifiche:',
      quoteFixed: 'PREVENTIVO – PREZZO FISSO',
      position: 'POSIZIONE',
      price: 'PREZZO (CHF)',
      subtotal: 'SUBTOTALE',
      discount: 'SCONTO 5 %',
      youSave: 'RISPARMIATE',
      totalFixed: 'TOTALE (Prezzo fisso)',
      guaranteeTitle: 'GARANZIA DI ACCETTAZIONE AL 100%',
      guaranteeDesc: 'Puliamo professionalmente incl. garanzia di consegna svizzera.',
      validTitle: documentType === 'quote' ? 'QUESTO PREVENTIVO È VALIDO' : 'VALIDITÀ DEL CONTRATTO',
      validDesc: documentType === 'quote' ? 'Questo preventivo è valido per 30 giorni. Vi ringraziamo per la vostra fiducia e non vediamo l\'ora di collaborare con voi.' : 'Questo contratto è vincolante. Vi ringraziamo per la vostra fiducia e non vediamo l\'ora di collaborare con voi.',
      confirmation: 'CONFERMA DEL CLIENTE',
      signature: 'Firma:',
      lookingForward: 'ATTENDIAMO CON PIACERE IL VOSTRO ORDINE',
      questions: 'Per qualsiasi domanda, non esitate a contattarci.',
      regards: 'Cordiali saluti',
      team: 'Il vostro Team SwissCleanMove',
      footerQuality: 'QUALITÀ PREMIUM',
      footerReliable: 'AFFIDABILE & PUNTUALE',
      footerSolution: 'SEMPRE ORIENTATI ALLA SOLUZIONE',
      footerCleanliness: 'PULIZIA SU CUI POTETE CONTARE',
      onRequest: 'Su richiesta',
      receiptOffer: documentType === 'invoice' ? 'FATTURA' : 'RICEVUTA',
      receiptThankYouDesc: documentType === 'invoice' ? 'Grazie per il vostro ordine. Siamo lieti di fatturarvi quanto segue.' : 'Grazie per la vostra fiducia e il vostro ordine.',
      receiptDate: documentType === 'invoice' ? 'DATA FATTURA' : 'DATA RICEVUTA',
      receiptNo: documentType === 'invoice' ? 'NUMERO FATTURA' : 'NUMERO RICEVUTA',
      receiptPaymentMethod: 'METODO DI PAGAMENTO',
      receiptPaymentMethodValue: documentType === 'invoice' ? 'Bonifico bancario / Contanti' : 'Contanti',
      receiptIssuedBy: 'EMESSO DA',
      receiptIssuedByValue: 'SwissCleanMove',
      receiptDesc: 'DESCRIZIONE',
      receiptAmount: 'IMPORTO (CHF)',
      receiptTotal: 'IMPORTO TOTALE',
      receiptConfirm: 'Con la presente confermiamo la ricezione dell\'importo totale di CHF {total}.<br><strong>Grazie per la vostra fiducia!</strong>',
      receiptObjectAddress: 'Indirizzo dell\'immobile',
      receiptArea: 'Superficie',
      receiptSpecialNotes: 'Note particolari',
      receiptAppointment: 'Appuntamento pulizia',
      receiptPaymentTitle: 'PAGAMENTO',
      receiptPaymentDesc: documentType === 'invoice' ? 'Pagabile entro 10 giorni' : 'Pagamento in contanti<br>al completamento del servizio.',
      receiptFooterServices: 'Pulizia • Trasloco • Facility Services',
      receiptFooterThanks: documentType === 'invoice' ? 'Grazie per il vostro ordine!' : 'Per i vostri documenti – Grazie per il vostro ordine!',
      receiptFeature1: 'Affidabile. Siamo qui per voi.',
      receiptFeature2: 'Qualità svizzera. Professionale & efficiente.',
      receiptFeature3: 'Operativi in tutta la Svizzera. Per privati & aziende.'
    }
  };
  
  const locDict = pdfDict[locale] || pdfDict.de;
  let messages: any = {};
  try {
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
    messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  } catch(e) {
    console.warn("Could not load translations for PDF", e);
  }

  const formatKey = (key: string) => {
    const parts = key.split('.');
    const last = parts[parts.length - 1];
    const secondLast = parts.length > 1 ? parts[parts.length - 2] : '';
    let combined = secondLast && secondLast !== 'items' && secondLast !== 'quote' && secondLast !== 'serviceForm' && secondLast !== 'wizard'
       ? `${secondLast} - ${last}` 
       : last;
    
    return combined.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const t = (key: string) => {
    if (key === 'quote.items.discount') {
      if (locale === 'de') return 'Rabatt 5%';
      if (locale === 'fr') return 'Remise 5%';
      return 'Discount 5%';
    }

    const parts = key.split('.');
    let current = messages;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return formatKey(key); 
      }
    }
    return typeof current === 'string' ? current : formatKey(key);
  };

  // Convert Logo to Base64 to guarantee it renders in PDF
  let logoBase64 = '';
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  } catch(e) {
    console.warn('Could not load logo for PDF', e);
  }

  // Format Date and Quote Number
  const quoteDate = new Date().toLocaleDateString('de-CH');
  const quoteNumberPrefix = documentType === 'quote' ? 'OFF' : 'VER';
  const quoteNumber = `${quoteNumberPrefix}-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const isFallback = quote.isFallback;
  const totalPrice = quote.totalEstimatedPrice || 0;
  
  let discountRow = '';
  let discountBox = '';

  const regularItems = quote.lineItems.filter(item => !item.isDiscount);
  const discountItem = quote.lineItems.find(item => item.isDiscount);

  const lineItemsHtml = regularItems.map(item => {
    let label = t(item.id);
    if (label === formatKey(item.id) || label === item.id) {
       let attempt2 = t('serviceForm.' + item.id);
       if (attempt2 !== formatKey('serviceForm.' + item.id) && attempt2 !== 'serviceForm.' + item.id) {
         label = attempt2;
       }
    }
    const priceDisplay = item.price === 0 ? 'Inklusive' : `CHF ${item.price.toFixed(2)}`;
    return `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${label}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; color: #555; font-size: 13px;">${priceDisplay}</td>
    </tr>
    `;
  }).join('');

  if (discountItem) {
    discountRow = `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #001233; color: #cc0000; font-weight: bold; font-size: 13px;">${locDict.discount}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #001233; text-align: right; color: #cc0000; font-size: 13px;">- CHF ${Math.abs(discountItem.price).toFixed(2)}</td>
    </tr>
    `;
    discountBox = `
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 15px;">
      <div style="color: #cc0000; font-weight: bold; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">${locDict.discount}</div>
      <div style="color: #333; font-size: 12px;">${locDict.youSave}</div>
      <div style="color: #cc0000; font-weight: bold; font-size: 18px;">CHF ${Math.abs(discountItem.price).toFixed(2)}</div>
    </div>
    `;
  }

  const skipKeys = [
    // Personal info
    'firstName', 'lastName', 'name', 'email', 'emailAddress', 'phone', 'telephone', 'nameFirstName', 'acceptPrivacy',
    // Address fields (all variants)
    'street', 'streetAndNumber', 'city', 'postalCodeAndCity', 'address',
    'cleanStreet', 'cleanZipCity', 'cleanAddress',
    'movingStreet', 'movingZipCity', 'unloadingStreetAndNumber', 'unloadingPostalCodeAndCity',
    'moveFromStreet', 'moveFromZipCity', 'moveToStreet', 'moveToZipCity',
    'destinationStreet', 'destinationCity', 'destinationPropertyType', 'destinationArea', 'destinationElevator', 'destinationParking',
    // Meta / internal
    'locale', 'serviceName', 'formType', 'requestType', 'quoteResult', 'estimatedPrice', 'lineItems', 'quoteSent',
    'data', 'id', 'status', 'createdAt', 'updatedAt', 'pdfPath', 'submissionDate',
    // Wizard-specific property fields (already shown in OBJEKTDATEN)
    'sharedPropertyType', 'sharedRooms', 'sharedLivingArea', 'sharedFloor', 'sharedElevator', 'sharedParking', 'sharedParkingDistance',
    // Normalized property fields (already shown in OBJEKTDATEN)  
    'apartmentType', 'propertyType', 'typeOfProperty', 'objectType',
    'numberOfRooms', 'numberOfRoomsApartment', 'rooms',
    'livingSpaceInM2', 'areaInM2', 'area', 'squareMeters', 'cleaningAreaInM2', 'cleaningApartmentType',
    'elevatorSizes', 'elevator', 'hasElevator', 'noParking', 'parking', 'parkingDistance',
    'floor', 'floorsLevel',
    'cleaningTypes', 'frequency', 'cleaningAppointment', 'movingDate', 'preferredDate', 'preferredTime',
    // Unloading fields (shown in OBJEKTDATEN destination)
    'unloadingApartmentType', 'unloadingAreaInM2', 'unloadingElevatorSizes', 'unloadingParkingDistance',
    // Backend/Client model specific fields to skip in Scope
    'totalPrice', 'paidAmount', 'balance', 'clientId', 'fromDate', 'untilDate', 'location', 'postalCode', 'serviceType', 'buildingType'
  ];

  const translatedLabels: Record<string, any> = {
    isExpress: { de: 'Express Service', en: 'Express Service', fr: 'Service Express', it: `Servizio espresso` },
    isFlexible: { de: 'Flexibles Datum', en: 'Flexible Date', fr: 'Date Flexible', it: `Data flessibile` },
    moveVolume: { de: 'Umzugsvolumen', en: 'Move Volume', fr: 'Volume de Déménagement', it: `Sposta volume` },
    umzugsvolumen: { de: 'Umzugsvolumen', en: 'Move Volume', fr: 'Volume de Déménagement', it: `Sposta volume` },
    moveToAccess: { de: 'Zugang Zielort', en: 'Access Destination', fr: 'Accès Destination', it: `Accedi alla destinazione` },
    zugangZielort: { de: 'Zugang Zielort', en: 'Access Destination', fr: 'Accès Destination', it: `Accedi alla destinazione` },
    moveFromAccess: { de: 'Zugang Startort', en: 'Access Origin', fr: 'Accès Origine', it: `Accedi a Origine` },
    zugangStartort: { de: 'Zugang Startort', en: 'Access Origin', fr: 'Accès Origine', it: `Accedi a Origine` },
    contactMethods: { de: 'Kontaktmethode', en: 'Contact Method', fr: 'Méthode de Contact', it: `Metodo di contatto` },
    kontaktmethode: { de: 'Kontaktmethode', en: 'Contact Method', fr: 'Méthode de Contact', it: `Metodo di contatto` },
    moveBoxTypes: { de: 'Umzugskartons', en: 'Moving Boxes', fr: 'Cartons de Déménagement', it: `Scatole per il trasloco` },
    movePackingMaterials: { de: 'Verpackungsmaterial', en: 'Packing Materials', fr: "Matériel d'Emballage", it: `Materiali da imballaggio` },
    additionalMovingServices: { de: 'Zusatzleistungen', en: 'Additional Services', fr: 'Services Supplémentaires', it: `Servizi aggiuntivi` },
    moveFromConditions: { de: 'Bedingungen Startort', en: 'Conditions Origin', fr: 'Conditions Origine', it: `Condizioni Origine` },
    moveToConditions: { de: 'Bedingungen Zielort', en: 'Conditions Destination', fr: 'Conditions Destination', it: `Condizioni Destinazione` },
    moveFurniture: { de: 'Möbel', en: 'Furniture', fr: 'Meubles', it: `Mobilia` },
    moveSpecialItems: { de: 'Spezialgegenstände', en: 'Special Items', fr: 'Objets Spéciaux', it: `Articoli speciali` },
    moveServices: { de: 'Zusatzleistungen', en: 'Additional Services', fr: 'Services Supplémentaires', it: `Servizi aggiuntivi` },
    cleanWindowTypes: { de: 'Fensterarten', en: 'Window Types', fr: 'Types de Fenêtres', it: `Tipi di finestre` },
    cleanSpecialGlass: { de: 'Spezialglas', en: 'Special Glass', fr: 'Verre Spécial', it: `Vetro speciale` },
    cleanShuttersBlinds: { de: 'Storen / Rollläden', en: 'Shutters / Blinds', fr: 'Stores / Volets', it: `Persiane/persiane` },
    cleanCondition: { de: 'Zustand', en: 'Condition', fr: 'État', it: `Condizione` },
    cleanOutdoorArea: { de: 'Aussenbereich', en: 'Outdoor Area', fr: 'Espace Extérieur', it: `Area esterna` },
    facilityServiceType: { de: 'Facility Service Art', en: 'Facility Service Type', fr: 'Type de Facility Service', it: `Tipo di servizio della struttura` },
    flexibility: { de: 'Flexibilität', en: 'Flexibility', fr: 'Flexibilité', it: `Flessibilità` },
    accessType: { de: 'Zugangsart', en: 'Access Type', fr: 'Type d\'Accès', it: `Tipo di accesso` },
    parkingOptions: { de: 'Parkmöglichkeiten', en: 'Parking Options', fr: 'Options de Stationnement', it: `Opzioni di parcheggio` },
    cleaningFrequency: { de: 'Reinigungsintervall', en: 'Cleaning Frequency', fr: 'Fréquence de Nettoyage', it: `Frequenza di pulizia` },
    maintenanceCleaningItems: { de: 'Unterhaltsreinigung Elemente', en: 'Maintenance Cleaning Items', fr: 'Éléments d\'Entretien', it: `Articoli per la pulizia della manutenzione` },
    parkingAvailable: { de: 'Parkplatz Vorhanden', en: 'Parking Available', fr: 'Parking Disponible', it: `Parcheggio disponibile` },
    streetNo: { de: 'Strasse Nr', en: 'Street No', fr: 'Rue No', it: `Via n` },
    zipCity: { de: 'PLZ Ort', en: 'Zip City', fr: 'NPA Localité', it: `Città postale` },
    officeCleaningItems: { de: 'Büroreinigung Elemente', en: 'Office Cleaning Items', fr: 'Éléments de Nettoyage de Bureau', it: `Articoli per la pulizia dell'ufficio` },
    cleanBathrooms: { de: 'Badezimmer', en: 'Bathrooms', fr: 'Salles de Bain', it: `Bagni` },
    cleanKitchen: { de: 'Küche', en: 'Kitchen', fr: 'Cuisine', it: `Cucina` },
    cleanToilets: { de: 'Toiletten', en: 'Toilets', fr: 'Toilettes', it: `Servizi igienici` },
    cleanDrillHoles: { de: 'Dübellöcher', en: 'Dowel Holes', fr: 'Trous de cheville', it: `Fori per tasselli` },
    cleanDrillHolesCount: { de: 'Anzahl Dübellöcher', en: 'Number of Dowel Holes', fr: 'Nombre de trous de cheville', it: `Numero di fori per tasselli` },
    accessIndependent: { de: 'Zugang Unabhängig', en: 'Independent Access', fr: 'Accès Indépendant', it: `Accesso Indipendente` },
    accessOptions: { de: 'Zugangsoptionen', en: 'Access Options', fr: 'Options d\'Accès', it: `Opzioni di accesso` },
    accessKey: { de: 'Schlüsselzugang', en: 'Key Access', fr: 'Accès par clé', it: `Accesso chiave` },
    cleanWindowsCount: { de: 'Anzahl Fenster', en: 'Number of Windows', fr: 'Nombre de Fenêtres', it: `Numero di finestre` },
    cleanAreas: { de: 'Reinigungsbereiche', en: 'Cleaning Areas', fr: 'Zones de Nettoyage', it: `Aree di pulizia` },
    accessHandoverDate: { de: 'Übergabetermin', en: 'Handover Date', fr: 'Date de Remise', it: `Data di consegna` },
    accessHandoverTime: { de: 'Übergabezeit', en: 'Handover Time', fr: 'Heure de Remise', it: `Orario di consegna` },
    cleanShuttersBlindsClean: { de: 'Storen / Rollläden Reinigung', en: 'Shutters / Blinds Cleaning', fr: 'Nettoyage Stores / Volets', it: `Pulizia persiane/veneziane` },
    cleanShuttersBlindsQty: { de: 'Anzahl Storen / Rollläden', en: 'Shutters / Blinds Qty', fr: 'Nombre Stores / Volets', it: 'Quantità Persiane / Tapparelle' },
    cleanBalconyCount: { de: 'Anzahl Balkone', en: 'Balcony Count', fr: 'Nombre de Balcons', it: 'Numero di Balconi' },
    cleanPets: { de: 'Haustiere', en: 'Pets', fr: 'Animaux', it: 'Animali Domestici' },
    hasBalcony: { de: 'Balkon vorhanden', en: 'Has Balcony', fr: 'A un Balcon', it: 'Ha un Balcone' },
    cleanKitchenState: { de: 'Küchenzustand', en: 'Kitchen Condition', fr: 'État de la Cuisine', it: `Condizioni della cucina` },
    cleanPressureWashing: { de: 'Hochdruckreinigung', en: 'Pressure Washing', fr: 'Nettoyage Haute Pression', it: `Lavaggio a pressione` },
    cleanOutdoorCondition: { de: 'Zustand Aussenbereich', en: 'Outdoor Condition', fr: 'État Extérieur', it: `Condizioni esterne` },
    moveBoxQty_standard: { de: 'Anzahl Standardkartons', en: 'Box Qty (Standard)', fr: 'Qté cartons standard', it: `Quantità scatola (standard)` },
    moveBoxQty_book: { de: 'Anzahl Bücherkartons', en: 'Box Qty (Books)', fr: 'Qté cartons livres', it: `Quantità scatola (libri)` },
    moveBoxQty_wardrobe: { de: 'Anzahl Kleiderboxen', en: 'Box Qty (Wardrobe)', fr: 'Qté cartons penderie', it: `Quantità scatola (guardaroba)` },
    moveBoxQty_dishesGlass: { de: 'Anzahl Kartons Geschirr/Glas', en: 'Box Qty (Dishes/Glass)', fr: 'Qté cartons vaisselle/verre', it: `Quantità scatola (piatti/bicchiere)` },
    moveBoxQty_specialTvPaintings: { de: 'Anzahl Spezialkartons TV/Bilder', en: 'Box Qty (TV/Paintings)', fr: 'Qté cartons TV/tableaux', it: `Quantità scatola (TV/dipinti)` },
    moveFurnitureQty_sofa: { de: 'Anzahl Sofas', en: 'Qty Sofas', fr: 'Qté Canapés', it: `Quantità Divani` },
    moveFurnitureQty_bed: { de: 'Anzahl Betten', en: 'Qty Beds', fr: 'Qté Lits', it: `Quantità letti` },
    moveFurnitureQty_wardrobe: { de: 'Anzahl Schränke', en: 'Qty Wardrobes', fr: 'Qté Armoires', it: `Qtà armadi` },
    moveFurnitureQty_tableChairs: { de: 'Anzahl Tisch & Stühle', en: 'Qty Table/Chairs', fr: 'Qté Tables/Chaises', it: `Qtà tavolo/sedie` },
    moveFurnitureQty_tv: { de: 'Anzahl TVs', en: 'Qty TVs', fr: 'Qté TVs', it: `Quantità di televisori` },
    moveFurnitureQty_washingMachine: { de: 'Anzahl Waschmaschinen', en: 'Qty Washing Mach.', fr: 'Qté Machines à laver', it: `Qtà lavatrice` },
    moveFurnitureQty_refrigerator: { de: 'Anzahl Kühlschränke', en: 'Qty Refrigerators', fr: 'Qté Réfrigérateurs', it: `Quantità frigoriferi` },
    notes: { de: 'Bemerkungen', en: 'Notes', fr: 'Remarques', it: `Note` },
    startDate: { de: 'Startdatum', en: 'Start Date', fr: 'Date de Début', it: `Data di inizio` },
    desiredService: { de: 'Gewünschte Leistung', en: 'Desired Service', fr: 'Service Souhaité', it: `Servizio desiderato` },
    cleaningServices: { de: 'Reinigungsleistungen', en: 'Cleaning Services', fr: 'Services de Nettoyage', it: `Servizi di pulizia` },
    units: { de: 'Einheiten', en: 'Units', fr: 'Unités', it: `Unità` },
    workingHours: { de: 'Arbeitszeiten', en: 'Working Hours', fr: 'Heures de Travail', it: `Orario di lavoro` },
    cleaningLocation: { de: 'Reinigungsort', en: 'Cleaning Location', fr: 'Lieu de Nettoyage', it: `Posizione della pulizia` },
    timeSlot: { de: 'Zeitfenster', en: 'Time Slot', fr: 'Créneau Horaire', it: `Fascia oraria` }
  };

  const translatedValues: Record<string, any> = {
    small: { de: 'Klein', en: 'Small', fr: 'Petit', it: `Piccolo` },
    medium: { de: 'Mittel', en: 'Medium', fr: 'Moyen', it: `Medio` },
    large: { de: 'Gross', en: 'Large', fr: 'Grand', it: `Grande` },
    veryLarge: { de: 'Sehr Gross', en: 'Very Large', fr: 'Très Grand', it: `Molto grande` },
    direct: { de: 'Direkt', en: 'Direct', fr: 'Direct', it: `Diretto` },
    Direkt: { de: 'Direkt', en: 'Direct', fr: 'Direct', it: `Diretto` },
    d0_20: { de: '0 - 20m', en: '0 - 20m', fr: '0 - 20m', it: `0 - 20 metri` },
    d20_50: { de: '20 - 50m', en: '20 - 50m', fr: '20 - 50m', it: `20 - 50 metri` },
    d50plus: { de: '> 50m', en: '> 50m', fr: '> 50m', it: `> 50 metri` },
    email: { de: 'E-Mail', en: 'Email', fr: 'E-mail', it: `E-mail` },
    Telefon: { de: 'Telefon', en: 'Phone', fr: 'Téléphone', it: `Telefono` },
    phone: { de: 'Telefon', en: 'Phone', fr: 'Téléphone', it: `Telefono` },
    whatsapp: { de: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp', it: `Whatsapp` },
    maintenanceCleaning: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'Entretien', it: `Pulizia di manutenzione` },
    flexible: { de: 'Flexibel', en: 'Flexible', fr: 'Flexible', it: `Flessibile` },
    keyMailbox: { de: 'Schlüssel im Briefkasten', en: 'Key in Mailbox', fr: 'Clé dans la Boîte aux Lettres', it: `Digitare la casella di posta` },
    mustReserve: { de: 'Muss Reserviert Werden', en: 'Must be Reserved', fr: 'Doit être Réservé', it: `Deve essere prenotato` },
    daily: { de: 'Täglich', en: 'Daily', fr: 'Quotidiennement', it: `Quotidiano` },
    weekly: { de: 'Wöchentlich', en: 'Weekly', fr: 'Hebdomadaire', it: `Settimanale` },
    staircaseCleaning: { de: 'Treppenhausreinigung', en: 'Staircase Cleaning', fr: 'Nettoyage des Escaliers', it: `Pulizia delle scale` },
    narrowStairs: { de: 'Enge Treppen', en: 'Narrow Stairs', fr: 'Escaliers Étroits', it: `Scale strette` },
    noElevator: { de: 'Kein Aufzug', en: 'No Elevator', fr: 'Pas d\'Ascenseur', it: `Senza ascensore` },
    longDistances: { de: 'Lange Laufwege', en: 'Long Distances', fr: 'Longues Distances', it: `Lunghe distanze` },
    limitedAccess: { de: 'Eingeschränkter Zugang', en: 'Limited Access', fr: 'Accès Limité', it: `Accesso limitato` },
    standard: { de: 'Standardkartons', en: 'Standard Boxes', fr: 'Cartons Standards', it: `Scatole standard` },
    book: { de: 'Bücherkartons', en: 'Book Boxes', fr: 'Cartons Livres', it: `Scatole di libri` },
    wardrobe: { de: 'Kleiderboxen', en: 'Wardrobe Boxes', fr: 'Cartons Penderie', it: `Scatole per guardaroba` },
    dishesGlass: { de: 'Geschirr/Glas', en: 'Dishes/Glass', fr: 'Vaisselle/Verre', it: `Piatti/Bicchiere` },
    specialTvPaintings: { de: 'Spezial TV/Bilder', en: 'Special TV/Paintings', fr: 'Spécial TV/Tableaux', it: `Speciale TV/Dipinti` },
    provideBoxes: { de: 'Kartons bereitstellen', en: 'Provide Boxes', fr: 'Fournir Cartons', it: `Fornire scatole` },
    bubbleWrap: { de: 'Luftpolsterfolie', en: 'Bubble Wrap', fr: 'Papier Bulle', it: `Pluriball` },
    packingPaper: { de: 'Packpapier', en: 'Packing Paper', fr: 'Papier d\'Emballage', it: `Carta da imballaggio` },
    stretchFilm: { de: 'Stretchfolie', en: 'Stretch Film', fr: 'Film Étirable', it: `Pellicola estensibile` },
    movingBlankets: { de: 'Umzugsdecken', en: 'Moving Blankets', fr: 'Couvertures de Déménagement', it: `Coperte in movimento` },
    sofa: { de: 'Sofa', en: 'Sofa', fr: 'Canapé', it: `Divano` },
    bed: { de: 'Bett', en: 'Bed', fr: 'Lit', it: `Letto` },
    tableChairs: { de: 'Tisch & Stühle', en: 'Table & Chairs', fr: 'Table & Chaises', it: `Tavolo e sedie` },
    tv: { de: 'TV', en: 'TV', fr: 'TV', it: `TV` },
    washingMachine: { de: 'Waschmaschine', en: 'Washing Machine', fr: 'Machine à Laver', it: `Lavatrice` },
    refrigerator: { de: 'Kühlschrank', en: 'Refrigerator', fr: 'Réfrigérateur', it: `Frigorifero` },
    // Property types - capitalized
    House: { de: 'Haus', en: 'House', fr: 'Maison', it: `Casa` },
    Apartment: { de: 'Wohnung', en: 'Apartment', fr: 'Appartement', it: `Appartamento` },
    Office: { de: 'Büro', en: 'Office', fr: 'Bureau', it: `Ufficio` },
    Klein: { de: 'Klein', en: 'Small', fr: 'Petit', it: `Piccolo` },
    Mittel: { de: 'Mittel', en: 'Medium', fr: 'Moyen', it: `Medio` },
    Gross: { de: 'Gross', en: 'Large', fr: 'Grand', it: `Grande` },
    // Property types - lowercase (from form submission)
    apartment: { de: 'Wohnung', en: 'Apartment', fr: 'Appartement', it: `Appartamento` },
    house: { de: 'Haus', en: 'House', fr: 'Maison', it: `Casa` },
    studio: { de: 'Studio', en: 'Studio', fr: 'Studio', it: `Studio` },
    wgRoom: { de: 'WG-Zimmer', en: 'Shared Room', fr: 'Chambre Partagée', it: `Stanza condivisa` },
    commercial: { de: 'Büro / Gewerbe', en: 'Commercial', fr: 'Commercial', it: `Commerciale` },
    office: { de: 'Büro', en: 'Office', fr: 'Bureau', it: `Ufficio` },
    'storage-cellar': { de: 'Keller / Lager', en: 'Storage / Cellar', fr: 'Cave / Stockage', it: `Deposito/cantina` },
    // Boolean / general values
    yes: { de: 'Ja', en: 'Yes', fr: 'Oui', it: `SÌ` },
    no: { de: 'Nein', en: 'No', fr: 'Non', it: `NO` },
    Yes: { de: 'Ja', en: 'Yes', fr: 'Oui', it: `SÌ` },
    No: { de: 'Nein', en: 'No', fr: 'Non', it: `NO` },
    true: { de: 'Ja', en: 'Yes', fr: 'Oui', it: `SÌ` },
    false: { de: 'Nein', en: 'No', fr: 'Non', it: `NO` },
    // Contact & access
    personal: { de: 'Persönlich', en: 'Personal', fr: 'Personnel', it: `Personale` },
    inspection: { de: 'Besichtigung', en: 'Inspection', fr: 'Inspection', it: `Ispezione` },
    Besichtigung: { de: 'Besichtigung', en: 'Inspection', fr: 'Inspection', it: `Ispezione` },
    window: { de: 'Fenster', en: 'Window', fr: 'Fenêtre', it: `Finestra` },
    // Cleaning types
    movingCleaning: { de: 'Umzugsreinigung', en: 'Moving Cleaning', fr: 'Nettoyage de Déménagement', it: `Pulizia in movimento` },
    basicCleaning: { de: 'Grundreinigung', en: 'Basic Cleaning', fr: 'Nettoyage de Base', it: `Pulizia di base` },
    constructionCleaning: { de: 'Baureinigung', en: 'Construction Cleaning', fr: 'Nettoyage de Chantier', it: `Pulizia della costruzione` },
    // Outdoor area
    balcony: { de: 'Balkon', en: 'Balcony', fr: 'Balcon', it: `Balcone` },
    garden: { de: 'Garten', en: 'Garden', fr: 'Jardin', it: `Giardino` },
    both: { de: 'Beides', en: 'Both', fr: 'Les Deux', it: `Entrambi` },
    none: { de: 'Keines', en: 'None', fr: 'Aucun', it: `Nessuno` },
    // Cleaning areas
    basement: { de: 'Keller', en: 'Basement', fr: 'Sous-sol', it: `Seminterrato` },
    attic: { de: 'Dachboden', en: 'Attic', fr: 'Grenier', it: `Attico` },
    garage: { de: 'Garage', en: 'Garage', fr: 'Garage', it: `Garage` },
    // Window types
    floorToCeiling: { de: 'Bodentiefe Fenster', en: 'Floor to Ceiling', fr: 'Du Sol au Plafond', it: `Dal pavimento al soffitto` },
    skylight: { de: 'Dachfenster', en: 'Skylight', fr: 'Velux', it: `Lucernario` },
    // Moving additional services
    assembly: { de: 'Montage / Demontage', en: 'Assembly / Disassembly', fr: 'Montage / Démontage', it: `Montaggio/Smontaggio` },
    packingMaterials: { de: 'Verpackungsmaterial', en: 'Packing Materials', fr: "Matériel d'Emballage", it: `Materiali da imballaggio` },
    disposal: { de: 'Entsorgung', en: 'Disposal', fr: 'Élimination', it: `Disposizione` },
    cleaning: { de: 'Reinigung', en: 'Cleaning', fr: 'Nettoyage', it: `Pulizia` },
    // Condition values
    nicotine: { de: 'Nikotin', en: 'Nicotine', fr: 'Nicotine', it: `Nicotina` },
    normal: { de: 'Normal', en: 'Normal', fr: 'Normal', it: `Normale` },
    heavy: { de: 'Stark verschmutzt', en: 'Heavily Soiled', fr: 'Très Sale', it: `Molto sporco` },
    notSure: { de: 'Nicht sicher', en: 'Not Sure', fr: 'Pas Sûr', it: `Non è sicuro` },
    // Special items
    aquarium: { de: 'Aquarium', en: 'Aquarium', fr: 'Aquarium', it: `Acquario` },
    piano: { de: 'Klavier', en: 'Piano', fr: 'Piano', it: `Pianoforte` },
    safe: { de: 'Tresor', en: 'Safe', fr: 'Coffre-fort', it: `Sicuro` },
    // Special glass
    winterGarden: { de: 'Wintergarten', en: 'Winter Garden', fr: 'Jardin d\'Hiver', it: `Giardino d'inverno` },
    glassFront: { de: 'Glasfront', en: 'Glass Front', fr: 'Façade Vitrée', it: `Frontale in vetro` },
    sliding: { de: 'Schiebefenster', en: 'Sliding Windows', fr: 'Fenêtres Coulissantes', it: `Finestre scorrevoli` },
    // Shutters/blinds
    roller: { de: 'Rollläden', en: 'Roller Shutters', fr: 'Volets Roulants', it: `Tapparelle` },
    venetian: { de: 'Jalousien', en: 'Venetian Blinds', fr: 'Stores Vénitiens', it: `Tende alla veneziana` },
    // Pressure washing / outdoor
    asRecommended: { de: 'Wie empfohlen', en: 'As Recommended', fr: 'Selon Recommandation', it: `Come consigliato` },
    // Missing German string keys for reverse lookup
    'Bodentiefe Fenster': { de: 'Bodentiefe Fenster', en: 'Floor to Ceiling', fr: 'Du Sol au Plafond', it: `Dal pavimento al soffitto` },
    'Jalousien': { de: 'Jalousien', en: 'Venetian Blinds', fr: 'Stores Vénitiens', it: `Tende alla veneziana` },
    'Fenster': { de: 'Fenster', en: 'Windows', fr: 'Fenêtres', it: `Finestre` },
    'Balkon': { de: 'Balkon', en: 'Balcony', fr: 'Balcon', it: `Balcone` },
    'Normal': { de: 'Normal', en: 'Normal', fr: 'Normal', it: `Normale` },
    'Persönlich': { de: 'Persönlich', en: 'Personal', fr: 'Personnel', it: `Personale` },
    'E-Mail': { de: 'E-Mail', en: 'Email', fr: 'E-mail', it: `E-mail` },
    'WhatsApp': { de: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp', it: `Whatsapp` },
    'Ja': { de: 'Ja', en: 'Yes', fr: 'Oui', it: `Sì` },
    'Nein': { de: 'Nein', en: 'No', fr: 'Non', it: `No` },
    // End missing German keys
    
    'cleaning-only': { de: 'Nur Reinigung', en: 'Cleaning Only', fr: 'Nettoyage Uniquement', it: `Solo pulizia` },
    'moving-only': { de: 'Nur Umzug', en: 'Moving Only', fr: 'Déménagement Uniquement', it: `Solo spostamento` },
    'moving-and-cleaning': { de: 'Umzug & Reinigung', en: 'Moving & Cleaning', fr: 'Déménagement & Nettoyage', it: `Traslochi e pulizie` },
    windows: { de: 'Fenster', en: 'Windows', fr: 'Fenêtres', it: `Finestre` },
    afternoon: { de: 'Nachmittag', en: 'Afternoon', fr: 'Après-midi', it: `Pomeriggio` },
    morning: { de: 'Vormittag', en: 'Morning', fr: 'Matin', it: `Mattina` },
    evening: { de: 'Abend', en: 'Evening', fr: 'Soir', it: `Sera` },
    'full-day': { de: 'Ganzer Tag', en: 'Full Day', fr: 'Toute la Journée', it: `Giornata intera` },
    undecided: { de: 'Unentschieden', en: 'Undecided', fr: 'Indécis', it: 'Indeciso' },
    guarantee: { de: 'Abnahmegarantie', en: 'Handover Guarantee', fr: 'Garantie de Remise', it: 'Garanzia di Consegna' }
  };
  
  const additionalAttributesHtml = Object.entries(customer)
    .filter(([key, val]) => {
      if (skipKeys.includes(key)) return false;
      if (val === '' || val === null || val === undefined || val === false) return false;
      if (typeof val === 'object' && !Array.isArray(val)) return false; // skip raw json blocks
      return true;
    })
    .map(([key, val]) => {
       const lblObj = translatedLabels[key];
       const formattedKey = lblObj ? (lblObj[locale] || lblObj.en) : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/([A-Z]+)/g, str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
       
       let formattedVal = val;
       if (val === true) formattedVal = locale === 'de' ? 'Ja' : (locale === 'fr' ? 'Oui' : 'Yes');
       else if (typeof val === 'string') {
         const valObj = translatedValues[val];
         if (valObj) {
           formattedVal = valObj[locale] || valObj.en;
         } else if (val.includes(',')) {
           formattedVal = val.split(',').map(v => {
             const trimmed = v.trim();
             const vObj = translatedValues[trimmed];
             return vObj ? (vObj[locale] || vObj.en) : trimmed;
           }).join(', ');
         }
       } else if (Array.isArray(val)) {
         formattedVal = val.map(v => {
           const vObj = translatedValues[v];
           return vObj ? (vObj[locale] || vObj.en) : v;
         }).join(', ');
       }
       return `<div class="scope-item" style="display: flex; align-items: center; margin-bottom: 2px;"><svg style="width: 14px; height: 14px; fill: #003366; flex-shrink: 0; margin-right: 6px;" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span><strong>${formattedKey}:</strong> <span style="color: #333;">${formattedVal}</span></span></div>`;
    }).join('');

  const subtotal = regularItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalRow = `
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #001233; font-size: 13px;">${locDict.subtotal}</td>
      <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #001233; font-size: 13px;">CHF ${subtotal.toFixed(2)}</td>
    </tr>
  `;

  if (documentType === 'receipt' || documentType === 'invoice') {
    let receiptDate = quoteDate;
    if (customer.submissionDate) receiptDate = new Date(customer.submissionDate).toLocaleDateString(locale === 'de' ? 'de-CH' : locale === 'fr' ? 'fr-CH' : 'en-US');
    
    const serviceTitle = customer.serviceType === 'moving' ? (locale === 'de' ? 'Umzug' : locale === 'fr' ? 'Déménagement' : 'Moving') : (locale === 'de' ? 'Reinigung' : locale === 'fr' ? 'Nettoyage' : 'Cleaning');
    const area = customer.cleaningAreaInM2 || customer.areaInM2 || customer.livingSpaceInM2 || customer.squareMeters || 'N/A';
    const cleanDate = customer.cleaningAppointment || customer.movingDate || locDict.onRequest;
    const address = customer.streetAndNumber ? `${customer.streetAndNumber}, ${customer.postalCodeAndCity || customer.city || ''}` : '';
    
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @page { margin: 15mm 20mm; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; box-sizing: border-box; }
      @media screen {
        body { margin: 20px auto; padding: 40px; max-width: 800px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-radius: 8px; background: white; }
      }
      @media print {
        body { margin: 0; padding: 0; max-width: none; box-shadow: none; }
      }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
      .logo { max-width: 200px; }
      .contact-info { text-align: left; font-size: 11px; color: #555; line-height: 1.6; }
      .contact-info svg { width: 12px; height: 12px; margin-right: 5px; vertical-align: middle; fill: #cc0000; }
      .separator { height: 4px; background: linear-gradient(to right, #cc0000 20%, #001233 20%); margin-bottom: 30px; }
      .title { text-align: center; margin-bottom: 30px; }
      .title h1 { color: #001233; font-size: 36px; font-weight: 800; letter-spacing: 1px; margin: 0 0 10px 0; }
      .title p { margin: 0; font-size: 13px; color: #555; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
      
      .customer-box { padding-top: 10px; }
      .customer-header { display: flex; align-items: center; gap: 10px; font-weight: bold; color: #001233; margin-bottom: 15px; font-size: 14px; }
      .customer-header svg { width: 24px; height: 24px; fill: #001233; }
      .customer-content { font-size: 13px; line-height: 1.6; color: #333; }
      
      .meta-box { border: 1px solid #eee; border-radius: 8px; padding: 15px; background-color: #fafafa; }
      .meta-item { display: flex; gap: 15px; margin-bottom: 10px; align-items: flex-start; }
      .meta-item:last-child { margin-bottom: 0; }
      .meta-icon { margin-top: 2px; }
      .meta-icon svg { width: 20px; height: 20px; fill: #555; }
      .meta-text label { display: block; font-size: 10px; color: #777; font-weight: bold; text-transform: uppercase; margin-bottom: 2px; }
      .meta-text div { font-size: 12px; color: #333; }
      
      .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      .table th { background-color: #001233; color: white; padding: 12px 15px; text-align: left; font-size: 12px; }
      .table th:last-child { text-align: right; }
      .table td { border: 1px solid #eee; padding: 15px; vertical-align: top; font-size: 13px; line-height: 1.8; color: #333; }
      .table td:last-child { text-align: right; font-weight: bold; }
      
      .total-row { display: flex; justify-content: space-between; align-items: center; background-color: #f8f9fa; border: 1px solid #eee; border-radius: 8px; padding: 15px 20px; margin-bottom: 30px; }
      .total-label { font-weight: bold; color: #001233; font-size: 15px; }
      .total-val { font-weight: bold; color: #cc0000; font-size: 18px; }
      
      .confirm-text { margin-bottom: 40px; font-size: 13px; color: #333; line-height: 1.6; }
      
      .guarantee-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
      .guarantee-box { border: 1px solid #eee; border-radius: 8px; padding: 15px; display: flex; align-items: center; gap: 15px; }
      .guarantee-box svg { width: 36px; height: 36px; fill: #001233; }
      .g-title { font-weight: bold; color: #001233; font-size: 12px; margin-bottom: 4px; }
      .g-desc { font-size: 11px; color: #555; line-height: 1.4; }
      
      .footer-bottom { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; color: #777; line-height: 1.6; }
      .footer-logo { width: 120px; margin-bottom: 5px; }
      
      .features { display: flex; justify-content: space-between; background-color: #001233; color: white; padding: 15px; border-radius: 8px; margin-top: 30px; font-size: 10px; }
      .feature { display: flex; align-items: center; gap: 8px; }
      .feature svg { width: 16px; height: 16px; fill: white !important; }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="${logoBase64}" class="logo" />
      <div class="contact-info">
        <div style="font-weight: bold; font-size: 12px; color: #001233; margin-bottom: 5px;">SwissCleanMove</div>
        <table style="border-spacing: 0;">
          <tr>
            <td style="padding-right: 10px; padding-bottom: 5px;"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></td>
            <td style="padding-bottom: 5px;">Orpundstrasse 37<br>2504 Biel/Bienne, Schweiz</td>
          </tr>
          <tr>
            <td style="padding-right: 10px; padding-bottom: 5px;"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></td>
            <td style="padding-bottom: 5px;">+41 78 215 69 30<br>+41 79 483 83 80</td>
          </tr>
          <tr>
            <td style="padding-right: 10px; padding-bottom: 5px;"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></td>
            <td style="padding-bottom: 5px;">info@swisscleanmove.ch</td>
          </tr>
          <tr>
            <td style="padding-right: 10px;"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 013.9-3.56C8.37 5.55 7.91 6.75 7.59 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg></td>
            <td>www.swisscleanmove.ch</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="separator"></div>
    
    <div class="title">
      <h1>${locDict.receiptOffer}</h1>
      <p>${locDict.receiptThankYouDesc}</p>
    </div>
    
    <div class="info-grid">
      <div class="customer-box">
        <div class="customer-header">
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> ${locDict.customer}
        </div>
        <div class="customer-content">
          <strong>${customer.firstName || ''} ${customer.lastName || ''}</strong><br>
          ${customer.streetAndNumber ? customer.streetAndNumber + '<br>' : ''}
          ${customer.postalCodeAndCity || customer.city || ''}
        </div>
      </div>
      <div class="meta-box">
        <div class="meta-item">
          <div class="meta-icon"><svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg></div>
          <div class="meta-text"><label>${locDict.receiptDate}</label><div>${receiptDate}</div></div>
        </div>
        <div style="border-bottom: 1px solid #ddd; margin: 8px 0;"></div>
        <div class="meta-item">
          <div class="meta-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg></div>
          <div class="meta-text"><label>${locDict.receiptNo}</label><div>${quoteNumber}</div></div>
        </div>
        <div style="border-bottom: 1px solid #ddd; margin: 8px 0;"></div>
        <div class="meta-item">
          <div class="meta-icon"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
          <div class="meta-text"><label>${locDict.receiptIssuedBy}</label><div>${locDict.receiptIssuedByValue}</div></div>
        </div>
      </div>
    </div>
    
    <table class="table">
      <thead>
        <tr>
          <th>${locDict.receiptDesc}</th>
          <th>${locDict.receiptAmount}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${serviceTitle}</strong>
          </td>
          <td>
            CHF ${totalPrice.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="total-row">
      <div class="total-label">${locDict.receiptTotal}</div>
      <div class="total-val">CHF ${totalPrice.toFixed(2)}</div>
    </div>
    
    <div class="confirm-text" style="display: flex; align-items: center; gap: 15px; margin-bottom: 40px; font-size: 14px; color: #333; line-height: 1.6;">
      <div style="border: 1px solid #eee; border-radius: 8px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <svg style="width: 28px; height: 28px; fill: #4caf50;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div>
        ${locDict.receiptConfirm.replace('{total}', totalPrice.toFixed(2))}
      </div>
    </div>
    
    ${documentType === 'receipt' ? `
    <div class="guarantee-grid">
      <div class="guarantee-box">
        <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
        <div>
          <div class="g-title">${locDict.guaranteeTitle}</div>
          <div class="g-desc">${locDict.guaranteeDesc}</div>
        </div>
      </div>
      <div class="guarantee-box">
        <svg viewBox="0 0 24 24"><path d="M21 3H3C1.89 3 1 3.89 1 5v14c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 16H3V5h18v14zm-9-2c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z"/></svg>
        <div>
          <div class="g-title">${locDict.receiptPaymentTitle}</div>
          <div class="g-desc">${locDict.receiptPaymentDesc}</div>
        </div>
      </div>
    </div>
    ` : ''}
    
    <div class="footer-bottom">
      <div>
        <strong style="font-size: 14px; color: #001233; margin-bottom: 5px; display: inline-block;">SwissCleanMove</strong><br>
        ${locDict.receiptFooterServices}<br>
        UID: CHE-457.949.122
      </div>
      <div style="text-align: right;">
        ${locDict.receiptFooterThanks}
      </div>
    </div>
    
    <div class="features">
      <div class="feature"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> ${locDict.receiptFeature1}</div>
      <div class="feature"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg> ${locDict.receiptFeature2}</div>
      <div class="feature"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> ${locDict.receiptFeature3}</div>
    </div>
  </body>
  </html>
    `;
  }

  // HTML Template
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @page { margin: 15mm 20mm; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; box-sizing: border-box; }
      @media screen {
        body { margin: 20px auto; padding: 40px; max-width: 800px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-radius: 8px; background: white; }
      }
      @media print {
        body { margin: 0; padding: 0; max-width: none; box-shadow: none; }
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
      }
      .logo {
        max-width: 200px;
      }
      .contact-info {
        text-align: left;
        font-size: 11px;
        color: #555;
        line-height: 1.6;
      }
      .contact-info svg {
        width: 12px;
        height: 12px;
        margin-right: 5px;
        vertical-align: middle;
        fill: #cc0000;
      }
      .separator {
        height: 4px;
        background: linear-gradient(to right, #cc0000 20%, #001233 20%);
        margin-bottom: 30px;
      }
      .thank-you {
        text-align: center;
        margin-bottom: 30px;
      }
      .thank-you h2 {
        font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
        color: #cc0000;
        font-size: 32px;
        font-weight: normal;
        margin: 0 0 5px 0;
      }
      .thank-you p {
        margin: 0;
        font-size: 12px;
        color: #555;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .title-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 30px;
      }
      .title-left h1 {
        font-size: 26px;
        color: #001233;
        margin: 0 0 5px 0;
        font-weight: 800;
        letter-spacing: 1px;
      }
      .title-left p {
        margin: 0;
        color: #cc0000;
        font-weight: bold;
        font-size: 14px;
      }
      .quote-meta {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        min-width: 250px;
      }
      .quote-meta-icon {
        background: #001233;
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .quote-meta-icon svg { width: 20px; height: 20px; fill: currentColor; }
      .quote-meta-details { font-size: 11px; }
      .quote-meta-details strong { display: inline-block; width: 120px; }
      .quote-meta-details span { color: #cc0000; font-weight: bold; }
      
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
      }
      .info-box {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 20px;
      }
      .info-header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        color: #001233;
        margin-bottom: 15px;
        font-size: 14px;
      }
      .info-header svg { width: 24px; height: 24px; }
      .info-content {
        font-size: 12px;
        line-height: 1.8;
      }
      
      .scope-box {
        margin-bottom: 30px;
      }
      .scope-header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        color: #001233;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .scope-header svg { width: 24px; height: 24px; }
      .scope-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        font-size: 12px;
        color: #555;
      }
      .scope-item { display: flex; align-items: center; gap: 8px; }
      .scope-item svg { width: 14px; height: 14px; fill: #001233; }
      
      .pricing-grid {
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
      }
      .pricing-table-container {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
      }
      .pricing-header {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #f8f9fa;
        padding: 15px;
        font-weight: bold;
        color: #001233;
        border-bottom: 1px solid #eee;
        font-size: 14px;
      }
      .pricing-header svg { width: 24px; height: 24px; fill: #001233; }
      .pricing-table {
        width: 100%;
        border-collapse: collapse;
        padding: 0 15px;
        display: table;
      }
      .pricing-table th {
        text-align: left;
        padding: 10px 0;
        font-size: 11px;
        color: #777;
        font-weight: normal;
        border-bottom: 1px solid #eee;
      }
      .pricing-table th:last-child { text-align: right; }
      .total-row {
        background-color: #001233;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
      }
      .total-label {
        padding: 15px;
        font-weight: bold;
        flex-grow: 1;
        font-size: 14px;
      }
      .total-amount {
        background-color: #cc0000;
        padding: 15px 25px;
        font-weight: bold;
        font-size: 16px;
      }
      
      .guarantee-box {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        font-size: 11px;
      }
      .guarantee-box svg { width: 30px; height: 30px; fill: #001233; margin-bottom: 10px; }
      .guarantee-title { font-weight: bold; color: #001233; font-size: 13px; margin-bottom: 5px; }
      
      .footer-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 20px;
        font-size: 11px;
        margin-bottom: 20px;
      }
      .footer-col h4 {
        margin: 0 0 10px 0;
        font-size: 12px;
        color: #001233;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .footer-col h4 svg { width: 16px; height: 16px; fill: currentColor; }
      .signature-line {
        border-bottom: 1px solid #999;
        margin-top: 20px;
        width: 100%;
        display: inline-block;
      }
      
      .features {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        border-top: 1px solid #eee;
        font-size: 10px;
        color: #555;
      }
      .feature { display: flex; align-items: center; gap: 5px; }
      .feature svg { width: 16px; height: 16px; }
    </style>
  </head>
  <body>
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="${logoBase64}" style="width: 100%;" alt="SwissCleanMove" />
      </div>
      <div class="contact-info">
        <table style="border-spacing: 0;">
          <tr>
            <td style="padding-right: 10px;"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></td>
            <td>Orpundstrasse 37<br>2504 Biel/Bienne, Schweiz</td>
          </tr>
          <tr>
            <td><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></td>
            <td>+41 78 215 69 30<br>+41 79 483 83 80</td>
          </tr>
          <tr>
            <td><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></td>
            <td>info@swisscleanmove.ch</td>
          </tr>
          <tr>
            <td><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></td>
            <td>www.swisscleanmove.ch</td>
          </tr>
        </table>
      </div>
    </div>
    
    <div class="separator"></div>
    
    <div class="thank-you">
      <h2>${locDict.thankYou}</h2>
      <p>${locDict.thankYouDesc}</p>
    </div>
    
    <div class="title-section">
      <div class="title-left">
        <h1>${locDict.offer}</h1>
        <p>${locale === 'de' ? (customer.serviceName === 'moving' || customer.formType === 'moving' ? 'Umzug' : (customer.serviceName === 'house-cleaning' || customer.formType === 'cleaning' ? 'Hausreinigung' : 'Reinigung')) : (locale === 'fr' ? (customer.serviceName === 'moving' || customer.formType === 'moving' ? 'Déménagement' : 'Nettoyage') : (customer.serviceName || customer.formType || 'Service'))} – ${locDict.offer.charAt(0).toUpperCase() + locDict.offer.slice(1).toLowerCase()}</p>
        <span style="font-size: 10px; color: #777;">${locDict.transparent}</span>
      </div>
      <div class="quote-meta">
        <div class="quote-meta-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        </div>
        <div class="quote-meta-details">
          <div><strong>${locDict.quoteNo}</strong> <span>${quoteNumber}</span></div>
          <div style="margin-top: 5px;"><strong>${locDict.quoteDate}&nbsp;</strong>${quoteDate}</div>
        </div>
      </div>
    </div>
    
    <div class="info-grid">
      <div class="info-box">
        <div class="info-header">
          <svg style="fill: #cc0000;" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          ${locDict.customer}
        </div>
        <div class="info-content">
          <strong style="font-size: 14px; display: block; margin-bottom: 5px;">${customer.firstName} ${customer.lastName || customer.name}</strong>
          <table style="border-spacing: 0;">
            <tr>
              <td style="width: 20px;"><svg style="width:12px; height:12px; fill:#555;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></td>
              <td>${customer.streetAndNumber || ''}<br>${customer.postalCodeAndCity || ''}</td>
            </tr>
            <tr>
              <td><svg style="width:12px; height:12px; fill:#555;" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></td>
              <td>${customer.email || customer.emailAddress || 'N/A'}</td>
            </tr>
            <tr>
              <td><svg style="width:12px; height:12px; fill:#555;" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></td>
              <td>${customer.phone || customer.telephone || 'N/A'}</td>
            </tr>
          </table>
        </div>
      </div>
      
      <div class="info-box">
        <div class="info-header">
          <svg style="fill: #001233;" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.82L17.18 19H6.82L12 5.82zM11 10h2v4h-2v-4zm0 6h2v2h-2v-2z" transform="translate(0, 0) scale(1)"/><path d="M4 10v11h16V10L12 3 4 10zm7 9H9v-4h2v4zm4 0h-2v-4h2v4zm2-6H7V8h10v5z"/></svg>
          ${locDict.objectData}
        </div>
        <div class="info-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="grid-column: span 2;"><strong>${locDict.date}</strong> ${customer.cleaningAppointment || customer.movingDate || locDict.onRequest}</div>
          
          <div style="grid-column: span 2; margin-top: 5px; margin-bottom: 5px; border-bottom: 1px solid #eee;"></div>
          ${(customer.apartmentType || customer.propertyType || customer.typeOfProperty || customer.objectType) ? `<div><strong>${locDict.propertyType}</strong> ${(() => { const rawPt = customer.apartmentType || customer.propertyType || customer.typeOfProperty || customer.objectType; const ptObj = translatedValues[rawPt]; return ptObj ? (ptObj[locale] || ptObj.en) : rawPt; })()}</div>` : ''}
          ${customer.livingSpaceInM2 || customer.areaInM2 || customer.area || customer.squareMeters ? `<div><strong>${locDict.area}</strong> ca. ${customer.livingSpaceInM2 || customer.areaInM2 || customer.area || customer.squareMeters} m²</div>` : ''}
          ${customer.numberOfRooms || customer.numberOfRoomsApartment || customer.rooms ? `<div><strong>${locDict.rooms}</strong> ${customer.numberOfRooms || customer.numberOfRoomsApartment || customer.rooms} Zi.</div>` : ''}
          ${customer.elevatorSizes || customer.elevator ? `<div><strong>${locDict.lift}</strong> ${customer.elevatorSizes || customer.elevator}</div>` : ''}
          ${customer.parkingDistance ? `<div><strong>${locDict.parking}</strong> ${customer.parkingDistance}</div>` : ''}
          ${customer.cleaningTypes ? `<div><strong>${locDict.cleaningType}</strong> ${customer.cleaningTypes}</div>` : ''}
          ${customer.frequency ? `<div><strong>${locDict.frequency}</strong> ${customer.frequency}</div>` : ''}
          
          ${customer.unloadingStreetAndNumber || customer.movingStreet || customer.destinationStreet || customer.moveToStreet ? `
            <div style="grid-column: span 2; margin-top: 5px; margin-bottom: 5px; border-bottom: 1px solid #eee;"></div>
            <div style="grid-column: span 2;"><strong>${locDict.destinationAddress || 'Destination Address:'}</strong> ${customer.unloadingStreetAndNumber || customer.movingStreet || customer.destinationStreet || customer.moveToStreet || 'N/A'}, ${customer.unloadingPostalCodeAndCity || customer.movingZipCity || customer.destinationCity || customer.moveToZipCity || 'N/A'}</div>
            ${customer.unloadingApartmentType || customer.destinationPropertyType ? `<div><strong>${locDict.destinationType}</strong> ${(() => { const rawDt = customer.unloadingApartmentType || customer.destinationPropertyType; const dtObj = translatedValues[rawDt]; return dtObj ? (dtObj[locale] || dtObj.en) : rawDt; })()}</div>` : ''}
            ${customer.unloadingAreaInM2 || customer.destinationArea ? `<div><strong>${locDict.destinationArea}</strong> ca. ${customer.unloadingAreaInM2 || customer.destinationArea} m²</div>` : ''}
            ${customer.unloadingElevatorSizes || customer.destinationElevator ? `<div><strong>${locDict.destinationLift}</strong> ${customer.unloadingElevatorSizes || customer.destinationElevator}</div>` : ''}
            ${customer.unloadingParkingDistance || customer.destinationParking ? `<div><strong>${locDict.destinationParking}</strong> ${customer.unloadingParkingDistance || customer.destinationParking}</div>` : ''}
          ` : ''}
        </div>
      </div>
    </div>
    
    <div class="scope-box">
      <div class="scope-header">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        ${locDict.scope}
      </div>
      <p style="font-size: 11px; color: #777; margin-top: 0;">${locDict.scopeDesc}</p>
      <div class="scope-list">
        ${additionalAttributesHtml}
      </div>
    </div>
    
    <div class="pricing-grid">
      <div class="pricing-table-container">
        <div class="pricing-header">
          <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
          ${locDict.quoteFixed}
        </div>
        <div style="padding: 15px;">
          <table class="pricing-table">
            <thead>
              <tr>
                <th>${locDict.position}</th>
                <th>${locDict.price}</th>
              </tr>
            </thead>
            <tbody>
              ${lineItemsHtml}
              ${subtotalRow}
              ${discountRow}
            </tbody>
          </table>
        </div>
        <div class="total-row">
          <div class="total-label">${locDict.totalFixed}</div>
          <div class="total-amount">${isFallback ? locDict.onRequest : 'CHF ' + totalPrice.toFixed(2)}</div>
        </div>
      </div>
      
      <div>
        ${discountBox}
        <div class="guarantee-box">
          <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          <div class="guarantee-title">${locDict.guaranteeTitle.replace(' ', '<br>')}</div>
          <p style="margin: 0; color: #555;">${locDict.guaranteeDesc}</p>
        </div>
      </div>
    </div>
    
    <div class="footer-grid">
      <div class="footer-col">
        <h4><svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> ${locDict.validTitle}</h4>
        <p style="margin:0; color:#555;">${locDict.validDesc}</p>
      </div>
      <div class="footer-col">
        <h4>${locDict.confirmation}</h4>
        <div style="margin-top: 15px; display: flex; align-items: flex-end; gap: 10px;">
          <span>${locDict.date}</span> <div class="signature-line"></div>
        </div>
        <div style="margin-top: 15px; display: flex; align-items: flex-end; gap: 10px;">
          <span>${locDict.signature}</span> <div class="signature-line"></div>
        </div>
      </div>
      <div class="footer-col">
        <h4><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg> ${locDict.lookingForward}</h4>
        <p style="margin:0; color:#555;">${locDict.questions}<br><br>${locDict.regards}<br>${locDict.team}</p>
      </div>
    </div>
    
    <div class="features">
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> ${locDict.footerQuality}</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> ${locDict.footerReliable}</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg> ${locDict.footerSolution}</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> ${locDict.footerCleanliness}</div>
    </div>
  </body>
  </html>
  `;
  return htmlTemplate;
}

export async function generateQuotePdf(quote: QuoteResult, customer: any, documentType: 'quote' | 'contract' | 'receipt' | 'invoice' = 'quote'): Promise<Buffer> {
  const htmlTemplate = generateQuoteHtml(quote, customer, documentType);
  
  let browser;
  if (process.env.VERCEL_ENV || process.env.VERCEL_URL || process.env.VERCEL) {
    const puppeteerCore = require('puppeteer-core');
    const chromium = require('@sparticuz/chromium');
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
  }
  
  const page = await browser.newPage();
  
  // Set content and wait for network idle to ensure everything renders
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
  
  // Print to PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  });

  await browser.close();

  return pdfBuffer as Buffer;
}
