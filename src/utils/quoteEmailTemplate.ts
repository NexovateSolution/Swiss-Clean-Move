import { QuoteResult } from './pricingEngine';

const getTranslator = (locale: string) => {
    const isEn = locale === 'en';
    const isFr = locale === 'fr';

    return {
        greeting: isEn ? 'Dear' : (isFr ? 'Bonjour' : 'Guten Tag'),
        intro: isEn 
            ? 'Thank you for your request. Here is your initial estimated quote.' 
            : (isFr ? 'Merci pour votre demande. Voici votre devis estimatif initial.' : 'Vielen Dank für Ihre Anfrage. Hier ist Ihr erster Kostenvoranschlag.'),
        validity: isEn 
            ? 'This quote is an estimate based on your provided information. It is valid for 30 days.' 
            : (isFr ? 'Ce devis est une estimation basée sur vos informations. Il est valable 30 jours.' : 'Dieser Kostenvoranschlag basiert auf Ihren Angaben. Er ist 30 Tage gültig.'),
        quoteNr: isEn ? 'Quote Nr.' : (isFr ? 'Devis No.' : 'Offerten-Nr.'),
        service: isEn ? 'Service' : (isFr ? 'Service' : 'Dienstleistung'),
        description: isEn ? 'Description' : (isFr ? 'Description' : 'Beschreibung'),
        price: isEn ? 'Price' : (isFr ? 'Prix' : 'Preis'),
        total: isEn ? 'Total Estimate' : (isFr ? 'Total Estimatif' : 'Geschätztes Total'),
        cta: isEn ? 'Confirm Request' : (isFr ? 'Confirmer la demande' : 'Anfrage bestätigen'),
        footer: isEn 
            ? 'If you have any questions, reply to this email or call us at +41 78 215 80 30.' 
            : (isFr ? 'Si vous avez des questions, répondez à cet e-mail ou appelez-nous au +41 78 215 80 30.' : 'Bei Fragen antworten Sie auf diese E-Mail oder rufen Sie uns an unter +41 78 215 80 30.')
    };
};

export function generateQuoteEmailHtml(quoteResult: QuoteResult, data: any, locale: string): string {
    const t = getTranslator(locale);
    const clientName = data.firstName && data.name ? `${data.firstName} ${data.name}` : (data.name || 'Customer');

    let lineItemsHtml = '';
    quoteResult.lineItems.forEach(item => {
        let desc = item.id; // Fallback to translation key
        if (locale === 'en' && item.descriptionEn) desc = item.descriptionEn;
        if (locale === 'de' && item.descriptionDe) desc = item.descriptionDe;
        if (locale === 'fr' && item.descriptionFr) desc = item.descriptionFr;

        lineItemsHtml += `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${desc}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">CHF ${item.price.toFixed(2)}</td>
            </tr>
        `;
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>SwissCleanMove Quote</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background-color: #004b87; color: #ffffff; padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">SwissCleanMove</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Umzug & Reinigung</p>
            </div>

            <!-- Body -->
            <div style="padding: 30px;">
                <p style="font-size: 16px;">${t.greeting} ${clientName},</p>
                <p style="font-size: 16px; line-height: 1.5;">${t.intro}</p>

                <div style="margin: 30px 0; background-color: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #cc0000;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold;">${t.quoteNr}: ${quoteResult.quoteNumber}</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px;">${t.service}: ${data.serviceName}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <thead>
                        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 12px; text-align: left; font-size: 14px; color: #64748b;">${t.description}</th>
                            <th style="padding: 12px; text-align: right; font-size: 14px; color: #64748b;">${t.price}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lineItemsHtml}
                    </tbody>
                    <tfoot>
                        <tr style="background-color: #f8fafc;">
                            <td style="padding: 15px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #004b87;">${t.total}:</td>
                            <td style="padding: 15px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #cc0000;">CHF ${quoteResult.totalPrice.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                <p style="font-size: 13px; color: #64748b; line-height: 1.5; font-style: italic;">
                    * ${t.validity}
                </p>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="https://swisscleanmove.ch" style="background-color: #cc0000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${t.cta}</a>
                </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
                <p style="margin: 0 0 10px 0;">${t.footer}</p>
                <p style="margin: 0;"><strong>SwissCleanMove</strong> | Orpundstrasse 31, 2504 Biel/Bienne</p>
                <p style="margin: 5px 0 0 0;">info@swisscleanmove.ch | www.swisscleanmove.ch</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
