import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import { jsPDF } from 'jspdf'
import { sendEmailNotification } from '@/lib/email'
import { prisma } from '../../../../lib/db'
import { createTranslator } from '@/lib/translations'
import { generateQuote } from '@/utils/pricingEngine'
import { generateQuoteEmailHtml } from '@/utils/quoteEmailTemplate'

function generatePDFContent(data: any, translator: ReturnType<typeof createTranslator>, locale: string): string {
    const { tKey, tVal } = translator;
    const currentDate = new Date().toLocaleString(locale === 'de' ? 'de-CH' : locale === 'fr' ? 'fr-CH' : 'en-CH', {
        timeZone: 'Europe/Zurich',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    const SKIP_KEYS = new Set([
        'serviceName', 'formType', 'status', 'pdfPath', 'submissionDate',
        'createdAt', 'updatedAt', 'data', 'id', 'locale', 'quoteResult'
    ])

    function prettifyKey(key: string): string {
        return tKey(key).toUpperCase();
    }

    const allKeys = Object.keys(data).filter(
        k => !SKIP_KEYS.has(k) && data[k] !== null && data[k] !== undefined && data[k] !== ''
    )

    const labelYes = tVal('yes') || 'Yes';
    const labelNo = tVal('no') || 'No';

    let dynamicRows = '';
    allKeys.forEach(key => {
        let val = data[key];
        let display = '';
        if (Array.isArray(val)) {
            if (val.length === 0) return;
            display = val.map(item => `<span class="badge badge-blue">✓ ${tVal(String(item))}</span>`).join(' ');
        } else if (typeof val === 'boolean') {
            display = val ? `<span class="badge badge-green">✓ ${labelYes}</span>` : `<span class="badge badge-gray">✗ ${labelNo}</span>`;
        } else if (['yes', 'true'].includes(String(val).toLowerCase())) {
            display = `<span class="badge badge-green">✓ ${labelYes}</span>`;
        } else if (['no', 'false'].includes(String(val).toLowerCase())) {
            display = `<span class="badge badge-gray">✗ ${labelNo}</span>`;
        } else if (typeof val === 'object') {
            display = `<pre class="remark-box">${JSON.stringify(val, null, 2)}</pre>`;
        } else {
            display = isNaN(Number(val)) ? tVal(String(val)) : String(val);
        }

        dynamicRows += `
            <div class="data-row">
                <div class="data-label">${prettifyKey(key)}</div>
                <div class="data-value">${display}</div>
            </div>`;
    });

    const submitLabel = tVal('formSubmitted') === 'formSubmitted' ? 'Form submitted on' : tVal('formSubmitted');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Service Form Submission - ${data.serviceName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px; background-color: #f9fafb; }
        .container { background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background-color: #ffffff; border-bottom: 2px solid #e5e7eb; padding: 30px; text-align: center; }
        .service-title { font-size: 24px; font-weight: 700; color: #1f2937; margin: 0; }
        .service-subtitle { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 5px; }
        
        .section { padding: 0 30px 15px 30px; }
        .section-header { display: flex; align-items: center; margin: 30px 0 20px 0; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;}
        .section-icon { background-color: #e0e7ff; color: #4338ca; width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 12px; }
        .section-title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
        
        .data-list { width: 100%; border-collapse: collapse; }
        .data-row { border-bottom: 1px solid #f3f4f6; display: flex; padding: 16px 0; align-items: flex-start; }
        .data-row:last-child { border-bottom: none; }
        .data-label { width: 35%; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.02em; padding-right: 20px; }
        .data-value { width: 65%; font-size: 15px; color: #111827; word-break: break-word; }
        
        .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 500; margin-right: 6px; margin-bottom: 6px; }
        .badge-blue { background-color: #dbeafe; color: #1e40af; }
        .badge-green { background-color: #dcfce3; color: #166534; }
        .badge-gray { background-color: #f3f4f6; color: #4b5563; }
        
        .remark-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; white-space: pre-wrap; margin: 0; }
        
        .footer { background-color: #f9fafb; padding: 20px 30px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://swisscleanmove.ch/images/logo.png" alt="SwissCleanMove" style="height:80px;width:auto;margin-bottom:15px;" onerror="this.style.display='none'">
            <h1 class="service-title">${data.serviceName}</h1>
            <div class="service-subtitle">${tKey(data.formType || 'service')}</div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <div class="section-icon">📄</div>
                <h2 class="section-title">Submission Data</h2>
            </div>
            <div class="data-list">
                ${dynamicRows || '<p style="color: #6b7280; font-style: italic;">No additional data submitted.</p>'}
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon">💰</div>
                <h2 class="section-title">Automated Quotation Estimate</h2>
            </div>
            <div class="data-list">
                <p><strong>Quote Number:</strong> ${data.quoteResult?.quoteNumber}</p>
                <p><strong>Total Estimate:</strong> CHF ${data.quoteResult?.totalWithVat.toFixed(2)} (incl. VAT)</p>
            </div>
        </div>
        
        <div class="footer">
            ${submitLabel} ${currentDate} • SwissCleanMove
        </div>
    </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const dataStr = formData.get('data') as string
        const locale = formData.get('locale') as string || 'en'
        
        if (!dataStr) {
            return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
        }

        const data = JSON.parse(dataStr)
        if (!data.serviceName || !data.name || !data.firstName || !data.emailAddress) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }
        
        const translator = createTranslator(locale);
        
        // --- PRICING ENGINE ---
        // Calculate the quote estimate directly on the backend
        const quoteResult = generateQuote(data);
        data.quoteResult = quoteResult; // Inject into data payload for DB

        // Process images
        const images = formData.getAll('images') as File[]
        const imagePaths: string[] = []

        if (images.length > 0) {
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'service-forms-images')
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

            for (const image of images) {
                if (image instanceof Blob) {
                    const bytes = await image.arrayBuffer()
                    const buffer = Buffer.from(bytes)
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
                    const ext = image.name.split('.').pop() || 'png'
                    const filename = `${uniqueSuffix}.${ext}`
                    const filepath = join(uploadDir, filename)

                    await writeFile(filepath, buffer)
                    imagePaths.push(`/uploads/service-forms-images/${filename}`)
                }
            }
        }

        if (imagePaths.length > 0) {
            data.imagePaths = imagePaths
        }

        const submission = await prisma.serviceFormSubmission.create({
            data: {
                serviceName: data.serviceName,
                formType: data.formType || 'general',
                firstName: data.firstName,
                name: data.name,
                emailAddress: data.emailAddress,
                telephone: data.telephone,
                streetAndNumber: data.streetAndNumber || '',
                postalCodeAndCity: data.postalCodeAndCity || '',
                contactPreferredVia: data.contactPreferredVia || '',
                viewingIsWelcome: data.viewingIsWelcome || '',
                remark: data.remark || '',
                data: data,
                status: 'NEW'
            }
        })

        let emailDebug = 'Not attempted';
        let pdfBuffer: Buffer | null = null;
        
        try {
            // Generate a Professional Quote PDF using jsPDF
            const doc = new jsPDF();
            
            // --- HEADER ---
            try {
                const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
                if (existsSync(logoPath)) {
                    const logoBase64 = 'data:image/png;base64,' + readFileSync(logoPath, 'base64');
                    doc.addImage(logoBase64, 'PNG', 15, 10, 45, 15);
                } else {
                    doc.setTextColor(0, 32, 96);
                    doc.setFontSize(24);
                    doc.setFont('helvetica', 'bold');
                    doc.text('SCM', 15, 20);
                }
            } catch (e) {
                doc.setTextColor(0, 32, 96);
                doc.setFontSize(24);
                doc.setFont('helvetica', 'bold');
                doc.text('SCM', 15, 20);
            }
            
            // Company Info (Right)
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text('+41 78 215 80 30', 195, 15, { align: 'right' });
            doc.text('info@swisscleanmove.ch', 195, 20, { align: 'right' });
            doc.text('www.swisscleanmove.ch', 195, 25, { align: 'right' });
            doc.text('Orpundstrasse 31, 2504 Biel', 195, 30, { align: 'right' });
            doc.text('UID: CHE-457.949.122 MWST', 195, 35, { align: 'right' });

            // --- CUSTOMER & ORDER INFO ---
            let currentY = 50;
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.text(`${data.firstName} ${data.name}`, 15, currentY);
            doc.text(data.streetAndNumber || '', 15, currentY + 5);
            doc.text(data.postalCodeAndCity || '', 15, currentY + 10);

            // Quote Number Box (Right)
            doc.setDrawColor(0, 32, 96);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(135, currentY - 5, 60, 25, 2, 2, 'FD');
            doc.setFillColor(0, 32, 96);
            doc.rect(135, currentY - 5, 60, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('QUOTE NUMBER', 165, currentY, { align: 'center' });
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.text(quoteResult.quoteNumber || '', 165, currentY + 12, { align: 'center' });

            currentY += 35;

            // --- TITLE ---
            doc.setTextColor(0, 32, 96);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            const serviceNameUpper = (data.serviceName || '').toUpperCase();
            
            // Handle long titles that might span multiple lines
            const splitTitle = doc.splitTextToSize(serviceNameUpper, 180);
            doc.text(splitTitle, 15, currentY);
            
            currentY += (splitTitle.length * 6) + 2;
            doc.setFontSize(12);
            doc.text('QUOTATION ESTIMATE', 15, currentY);
            
            currentY += 10;
            
            // --- INFO CARDS ---
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(226, 232, 240);
            doc.roundedRect(15, currentY, 55, 30, 2, 2, 'FD');
            doc.roundedRect(75, currentY, 55, 30, 2, 2, 'FD');
            doc.roundedRect(135, currentY, 60, 30, 2, 2, 'FD');
            
            doc.setTextColor(0, 32, 96);
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.text('ORDER DATA', 18, currentY + 5);
            doc.text('PROPERTY', 78, currentY + 5);
            doc.text('CONTACT', 138, currentY + 5);
            
            doc.setTextColor(50, 50, 50);
            doc.setFont('helvetica', 'normal');
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 18, currentY + 12);
            doc.text(`Contact: ${data.firstName}`, 18, currentY + 18);
            
            doc.text(`${data.streetAndNumber || ''}`, 78, currentY + 12);
            doc.text(`${data.postalCodeAndCity || ''}`, 78, currentY + 18);
            
            doc.text(`Tel: ${data.telephone || ''}`, 138, currentY + 12);
            doc.text(`Email: ${data.emailAddress || ''}`, 138, currentY + 18);

            currentY += 40;

            // --- TABLE HEADER ---
            doc.setFillColor(0, 32, 96);
            doc.rect(15, currentY, 180, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('NR.', 18, currentY + 5);
            doc.text('DESCRIPTION', 35, currentY + 5);
            doc.text('PRICE (CHF)', 190, currentY + 5, { align: 'right' });
            
            currentY += 8;
            
            // --- LINE ITEMS ---
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            
            let itemNr = 1;
            quoteResult.lineItems.forEach((item: any) => {
                if (currentY > 250) {
                    doc.addPage();
                    currentY = 20;
                    
                    // Re-draw header on new page
                    doc.setFillColor(0, 32, 96);
                    doc.rect(15, currentY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('NR.', 18, currentY + 5);
                    doc.text('DESCRIPTION', 35, currentY + 5);
                    doc.text('PRICE (CHF)', 190, currentY + 5, { align: 'right' });
                    currentY += 8;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                }
                
                let desc = item.description;
                if (locale === 'de' && item.descriptionDe) desc = item.descriptionDe;
                if (locale === 'fr' && item.descriptionFr) desc = item.descriptionFr;
                
                doc.text(itemNr.toString(), 18, currentY + 6);
                
                const splitDesc = doc.splitTextToSize(desc, 120);
                doc.text(splitDesc, 35, currentY + 6);
                
                doc.text(Number(item.price).toFixed(2), 190, currentY + 6, { align: 'right' });
                
                const height = splitDesc.length * 5;
                currentY += height + 3;
                
                doc.setDrawColor(240, 240, 240);
                doc.line(15, currentY, 195, currentY);
                currentY += 2;
                itemNr++;
            });
            
            currentY += 5;
            
            // --- TOTALS ---
            if (currentY > 240) {
                doc.addPage();
                currentY = 20;
            }
            
            doc.setFontSize(10);
            doc.text('Subtotal:', 140, currentY);
            doc.text(Number(quoteResult.totalPrice).toFixed(2), 190, currentY, { align: 'right' });
            currentY += 8;
            doc.text('VAT (8.1%):', 140, currentY);
            doc.text(Number(quoteResult.vatAmount).toFixed(2), 190, currentY, { align: 'right' });
            currentY += 8;
            
            doc.setFont('helvetica', 'bold');
            doc.text('Total Estimate:', 140, currentY);
            doc.text(Number(quoteResult.totalWithVat).toFixed(2), 190, currentY, { align: 'right' });
            
            // Disclaimer Footer
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.text('* This quote is an automated estimate and is valid for 30 days.', 15, 280);
            doc.text('* Final price may vary upon physical inspection.', 15, 285);
            
            pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        } catch (pdfErr) {
            console.warn('Failed to generate jsPDF attachment:', pdfErr);
        }

        try {
            // HTML Email for Admin (Internal raw data)
            const adminEmailHtml = generatePDFContent(data, translator, locale);
            
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                emailDebug = `Missing credentials.`;
            } else {
                emailDebug = `Using credentials.`;
                
                const attachmentsConfig = pdfBuffer ? [{
                    filename: `Quote-${quoteResult.quoteNumber}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }] : [];

                // 1. Send Internal Notification to Admin
                await sendEmailNotification({
                    to: 'info@swisscleanmove.ch, Swisscleanmove.ch@gmail.com',
                    subject: `New Request + Quote [${quoteResult.quoteNumber}] - ${data.serviceName}`,
                    html: adminEmailHtml,
                    text: `New request for ${data.serviceName} from ${data.firstName} ${data.name}. Est. Total: CHF ${quoteResult.totalWithVat.toFixed(2)}`,
                    attachments: attachmentsConfig
                })
                
                // 2. Send Professional Quotation Email to Customer
                const clientEmailHtml = generateQuoteEmailHtml(quoteResult, data, locale);
                const clientSubject = locale === 'fr' ? 'Votre devis estimatif - SwissCleanMove' : (locale === 'en' ? 'Your quotation estimate - SwissCleanMove' : 'Ihr Kostenvoranschlag - SwissCleanMove');
                
                const emailSent = await sendEmailNotification({
                    to: data.emailAddress,
                    subject: clientSubject,
                    html: clientEmailHtml,
                    text: `Please view this email in an HTML compatible client.`,
                    attachments: attachmentsConfig
                });
                
                if (emailSent === true) {
                    console.log('✅ Email notifications sent successfully')
                    emailDebug += ' | Success';
                } else {
                    console.warn('⚠️ Email notification failed but form was saved')
                    emailDebug += ' | sendEmailNotification failed';
                }
            }
        } catch (emailError: any) {
            console.error('❌ Email notification error:', emailError)
            emailDebug = 'Exception thrown: ' + emailError.toString();
        }

        // Save files locally only
        if (!process.env.VERCEL) {
            try {
                const submissionsDir = join(process.cwd(), 'public', 'submissions')
                if (!existsSync(submissionsDir)) await mkdir(submissionsDir, { recursive: true })
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
                const filename = `${data.serviceName.replace(/\\s+/g, '-')}-${data.name}-${timestamp}`
                const pdfContent = generatePDFContent(data, translator, locale)
                const pdfPath = join(submissionsDir, `${filename}.html`)
                await writeFile(pdfPath, pdfContent, 'utf8')
                const jsonPath = join(submissionsDir, `${filename}.json`)
                await writeFile(jsonPath, JSON.stringify({ ...data, submissionDate: new Date().toISOString(), pdfPath: `/submissions/${filename}.html`, id: submission.id }, null, 2), 'utf8')
                await prisma.serviceFormSubmission.update({ where: { id: submission.id }, data: { pdfPath: `/submissions/${filename}.html` } })
            } catch (e) { 
                console.warn('File saving skipped:', e)
            }
        }

        return NextResponse.json({ success: true, message: 'Quote generated successfully', emailDebug, submissionId: submission.id })
    } catch (error) {
        console.error('Error processing form submission:', error)
        return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
    }
}
