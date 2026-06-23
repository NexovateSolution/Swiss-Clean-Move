import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
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
            
            // Header
            doc.setFillColor(0, 75, 135);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('SwissCleanMove', 15, 25);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Umzug & Reinigung', 15, 32);
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Quotation Estimate', 15, 55);
            
            // Quote Details
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Quote No: ${quoteResult.quoteNumber}`, 15, 65);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 70);
            doc.text(`Customer: ${data.firstName} ${data.name}`, 15, 75);
            doc.text(`Service: ${data.serviceName}`, 15, 80);

            // Table Header
            let y = 95;
            doc.setFillColor(240, 240, 240);
            doc.rect(15, y - 5, 180, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Description', 20, y);
            doc.text('Price (CHF)', 170, y);
            
            // Line Items
            doc.setFont('helvetica', 'normal');
            y += 10;
            
            quoteResult.lineItems.forEach(item => {
                let desc = item.description;
                if (locale === 'de' && item.descriptionDe) desc = item.descriptionDe;
                if (locale === 'fr' && item.descriptionFr) desc = item.descriptionFr;
                
                doc.text(desc, 20, y);
                doc.text(item.price.toFixed(2), 170, y);
                y += 8;
            });
            
            y += 5;
            doc.line(15, y, 195, y);
            y += 8;
            
            // Totals
            doc.text('Subtotal:', 140, y);
            doc.text(quoteResult.totalPrice.toFixed(2), 170, y);
            y += 8;
            doc.text('VAT (8.1%):', 140, y);
            doc.text(quoteResult.vatAmount.toFixed(2), 170, y);
            y += 8;
            
            doc.setFont('helvetica', 'bold');
            doc.text('Total Estimate:', 140, y);
            doc.setTextColor(204, 0, 0);
            doc.text(quoteResult.totalWithVat.toFixed(2), 170, y);
            
            // Disclaimer Footer
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.text('* This quote is an automated estimate and is valid for 30 days.', 15, y + 20);
            doc.text('* Final price may vary upon physical inspection.', 15, y + 25);
            
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
