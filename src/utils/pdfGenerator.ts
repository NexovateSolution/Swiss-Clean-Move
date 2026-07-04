import { QuoteResult } from './pricingEngine';
import fs from 'fs';
import path from 'path';

export async function generateQuotePdf(quote: QuoteResult, customer: any): Promise<Buffer> {
  const locale = customer.locale || 'de';
  
  let messages: any = {};
  try {
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
    messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  } catch(e) {
    console.warn("Could not load translations for PDF", e);
  }

  const t = (key: string) => {
    // Hardcoded fallback for the discount key if missing from dictionary
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
        return key; 
      }
    }
    return typeof current === 'string' ? current : key;
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
  const quoteNumber = `SCM-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const isFallback = quote.isFallback;
  const totalPrice = quote.totalEstimatedPrice || 0;
  
  let discountRow = '';
  let discountBox = '';

  const regularItems = quote.lineItems.filter(item => !item.isDiscount);
  const discountItem = quote.lineItems.find(item => item.isDiscount);

  const lineItemsHtml = regularItems.map(item => {
    let label = t(item.id);
    if (label === item.id) {
       label = t('serviceForm.' + item.id);
    }
    return `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${label}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; color: #555; font-size: 13px;">Inklusive</td>
    </tr>
    `;
  }).join('');

  if (discountItem) {
    discountRow = `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #001233; color: #cc0000; font-weight: bold; font-size: 13px;">RABATT 5 %</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #001233; text-align: right; color: #cc0000; font-size: 13px;">- CHF ${Math.abs(discountItem.price).toFixed(2)}</td>
    </tr>
    `;
    discountBox = `
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 15px;">
      <div style="color: #cc0000; font-weight: bold; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">5 % RABATT</div>
      <div style="color: #333; font-size: 12px;">SIE SPAREN</div>
      <div style="color: #cc0000; font-weight: bold; font-size: 18px;">CHF ${Math.abs(discountItem.price).toFixed(2)}</div>
    </div>
    `;
  }

  const subtotal = regularItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalRow = `
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #001233; font-size: 13px;">ZWISCHENSUMME</td>
      <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #001233; font-size: 13px;">CHF ${subtotal.toFixed(2)}</td>
    </tr>
  `;

  // HTML Template
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 40px;
        box-sizing: border-box;
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
        font-size: 42px;
        color: #001233;
        margin: 0 0 5px 0;
        font-weight: 800;
        letter-spacing: 2px;
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
      .quote-meta-details strong { display: inline-block; width: 80px; }
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
      <h2>Herzlichen Dank</h2>
      <p>Für Ihre Anfrage und das Vertrauen in SwissCleanMove</p>
    </div>
    
    <div class="title-section">
      <div class="title-left">
        <h1>OFFERTE</h1>
        <p>Facility Services – Offerte</p>
        <span style="font-size: 10px; color: #777;">TRANSPARENT, ZUVERLÄSSIG, PROFESSIONELL</span>
      </div>
      <div class="quote-meta">
        <div class="quote-meta-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        </div>
        <div class="quote-meta-details">
          <div><strong>OFFERTE-NR:</strong> <span>${quoteNumber}</span></div>
          <div style="margin-top: 5px;"><strong>OFFERTDATUM:</strong> ${quoteDate}</div>
        </div>
      </div>
    </div>
    
    <div class="info-grid">
      <div class="info-box">
        <div class="info-header">
          <svg style="fill: #cc0000;" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          KUNDEN
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
          OBJEKTDATEN
        </div>
        <div class="info-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div><strong>Service:</strong> ${customer.serviceName || customer.formType || 'Reinigung / Umzug'}</div>
          <div><strong>Datum:</strong> ${customer.cleaningAppointment || customer.movingDate || 'Nach Absprache'}</div>
          ${customer.apartmentType ? `<div><strong>Objekt-Typ:</strong> ${customer.apartmentType}</div>` : ''}
          ${customer.numberOfRooms || customer.numberOfRoomsApartment ? `<div><strong>Zimmer:</strong> ${customer.numberOfRooms || customer.numberOfRoomsApartment} Zi.</div>` : ''}
          ${customer.livingSpaceInM2 || customer.areaInM2 ? `<div><strong>Fläche:</strong> ca. ${customer.livingSpaceInM2 || customer.areaInM2} m²</div>` : ''}
          ${customer.elevatorSizes ? `<div><strong>Lift:</strong> ${customer.elevatorSizes}</div>` : ''}
          ${customer.parkingDistance ? `<div><strong>Parkplatz:</strong> ${customer.parkingDistance}</div>` : ''}
          ${customer.unloadingPostalCodeAndCity ? `<div><strong>Abladeort:</strong> ${customer.unloadingPostalCodeAndCity}</div>` : ''}
          ${customer.cleaningTypes ? `<div><strong>Reinigungsart:</strong> ${customer.cleaningTypes}</div>` : ''}
          ${customer.frequency ? `<div><strong>Turnus:</strong> ${customer.frequency}</div>` : ''}
        </div>
      </div>
    </div>
    
    <div class="scope-box">
      <div class="scope-header">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        LEISTUNGSUMFANG
      </div>
      <p style="font-size: 11px; color: #777; margin-top: 0;">Professionelle Erledigung gemäss Ihren Angaben:</p>
      <div class="scope-list">
        <div class="scope-item"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Transparente Pauschalpreise</div>
        <div class="scope-item"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Keine versteckten Kosten</div>
        <div class="scope-item"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Material & Spesen inklusive</div>
        <div class="scope-item"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Abnahmegarantie (bei Reinigung)</div>
      </div>
    </div>
    
    <div class="pricing-grid">
      <div class="pricing-table-container">
        <div class="pricing-header">
          <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
          ANGEBOT – FESTPREIS
        </div>
        <div style="padding: 15px;">
          <table class="pricing-table">
            <thead>
              <tr>
                <th>POSITION</th>
                <th>PREIS (CHF)</th>
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
          <div class="total-label">GESAMTPREIS (Festpreis)</div>
          <div class="total-amount">${isFallback ? 'Auf Anfrage' : 'CHF ' + totalPrice.toFixed(2)}</div>
        </div>
      </div>
      
      <div>
        ${discountBox}
        <div class="guarantee-box">
          <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          <div class="guarantee-title">100 %<br>ABNAHMEGARANTIE</div>
          <p style="margin: 0; color: #555;">Wir reinigen professionell inkl. Schweizer Übergabegarantie.</p>
        </div>
      </div>
    </div>
    
    <div class="footer-grid">
      <div class="footer-col">
        <h4><svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> DIESE OFFERTE IST GÜLTIG</h4>
        <p style="margin:0; color:#555;">Diese Offerte ist während 30 Tagen gültig. Wir danken Ihnen für das Vertrauen und freuen uns auf die Zusammenarbeit.</p>
      </div>
      <div class="footer-col">
        <h4>KUNDENBESTÄTIGUNG</h4>
        <div style="margin-top: 15px; display: flex; align-items: flex-end; gap: 10px;">
          <span>Datum:</span> <div class="signature-line"></div>
        </div>
        <div style="margin-top: 15px; display: flex; align-items: flex-end; gap: 10px;">
          <span>Unterschrift:</span> <div class="signature-line"></div>
        </div>
      </div>
      <div class="footer-col">
        <h4><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg> WIR FREUEN UNS AUF IHREN AUFTRAG</h4>
        <p style="margin:0; color:#555;">Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.<br><br>Freundliche Grüsse<br>Ihr SwissCleanMove Team</p>
      </div>
    </div>
    
    <div class="features">
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> PREMIUM QUALITÄT</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> ZUVERLÄSSIG & PÜNKTLICH</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg> IMMER LÖSUNGSORIENTIERT</div>
      <div class="feature"><svg style="fill:#001233;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> SAUBERKEIT AUF DIE SIE SICH VERLASSEN KÖNNEN</div>
    </div>
  </body>
  </html>
  `;

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
    printBackground: true,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  await browser.close();

  return pdfBuffer as Buffer;
}
