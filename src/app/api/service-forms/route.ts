import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { sendEmailNotification, formatServiceFormEmail } from '@/lib/email'
import { prisma } from '../../../../lib/db'

// Simple PDF generation function (you can replace with a proper PDF library like jsPDF or Puppeteer)
// Simple PDF generation function (you can replace with a proper PDF library like jsPDF or Puppeteer)
// Simple PDF generation function (you can replace with a proper PDF library like jsPDF or Puppeteer)
// Simple PDF generation function (you can replace with a proper PDF library like jsPDF or Puppeteer)
function generatePDFContent(data: any): string {
    const currentDate = new Date().toLocaleString('en-CH', {
        timeZone: 'Europe/Zurich',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    const SKIP_KEYS = new Set([
        'serviceName', 'formType', 'status', 'pdfPath', 'submissionDate',
        'createdAt', 'updatedAt', 'data', 'id'
    ])

    // Pretty-print camelCase or snake_case keys into readable labels
    function prettifyKey(key: string): string {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim().toUpperCase()
    }

    const allKeys = Object.keys(data).filter(
        k => !SKIP_KEYS.has(k) && data[k] !== null && data[k] !== undefined && data[k] !== ''
    )

    let dynamicRows = '';
    allKeys.forEach(key => {
        let val = data[key];
        let display = '';
        if (Array.isArray(val)) {
            if (val.length === 0) return;
            display = val.map(item => `<span class="badge badge-blue">✓ ${String(item)}</span>`).join(' ');
        } else if (typeof val === 'boolean') {
            display = val ? `<span class="badge badge-green">✓ Yes</span>` : `<span class="badge badge-gray">✗ No</span>`;
        } else if (val === 'And' || val === 'yes' || val === 'Yes' || val === true) {
            display = `<span class="badge badge-green">✓ Yes</span>`;
        } else if (val === 'no' || val === 'No' || val === false) {
            display = `<span class="badge badge-gray">✗ No</span>`;
        } else if (typeof val === 'object') {
            display = `<pre class="remark-box">${JSON.stringify(val, null, 2)}</pre>`;
        } else {
            display = String(val);
        }

        dynamicRows += `
            <div class="data-row">
                <div class="data-label">${prettifyKey(key)}</div>
                <div class="data-value">${display}</div>
            </div>`;
    });

    const LOGO_BASE64 = '${fullBase64}';

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
            <img src="data:image/png;base64,${LOGO_BASE64}" alt="SwissCleanMove" style="height:80px;width:auto;margin-bottom:15px;" onerror="this.style.display='none'">
            <h1 class="service-title">${data.serviceName}</h1>
            <div class="service-subtitle">${data.formType?.charAt(0).toUpperCase() + data.formType?.slice(1)} Request</div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <div class="section-icon">📄</div>
                <h2 class="section-title">All Submitted Form Data</h2>
            </div>
            <div class="data-list">
                ${dynamicRows || '<p style="color: #6b7280; font-style: italic;">No additional data submitted.</p>'}
            </div>
        </div>
        
        <div class="footer">
            Form submitted on ${currentDate} • SwissCleanMove GmbH
        </div>
    </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const dataStr = formData.get('data') as string
        if (!dataStr) {
            return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
        }

        const data = JSON.parse(dataStr)
        if (!data.serviceName || !data.name || !data.firstName || !data.emailAddress) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

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

        // Add image paths to the data blob for admin display
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
                streetAndNumber: data.streetAndNumber,
                postalCodeAndCity: data.postalCodeAndCity,
                contactPreferredVia: data.contactPreferredVia,
                viewingIsWelcome: data.viewingIsWelcome,
                remark: data.remark,
                data: data,
                status: 'NEW'
            }
        })

        // Send email notification FIRST (this is the critical path)
        let emailDebug = 'Not attempted';
        try {
            // Use the rich "PDF" HTML template for both the email body and as an attachment!
            const emailHtml = generatePDFContent(data);
            
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                emailDebug = `Missing credentials. USER: '${process.env.GMAIL_USER}', PASS: '${process.env.GMAIL_APP_PASSWORD}'`;
            } else {
                emailDebug = `Using credentials. USER: '${process.env.GMAIL_USER.trim()}', PASS length: ${process.env.GMAIL_APP_PASSWORD.trim().length}, PASS chars: ${Array.from(process.env.GMAIL_APP_PASSWORD.trim()).map(c=>c.charCodeAt(0)).join(',')}`;
                const emailSent = await sendEmailNotification({
                    to: 'mikiyasdesalegn9@gmail.com',
                    subject: `New ${data.serviceName} ${data.formType || 'service'} Request`,
                    html: emailHtml,
                    text: `New ${data.formType || 'service'} request for ${data.serviceName} from ${data.firstName} ${data.name} (${data.emailAddress})`
                })
                if (emailSent === true) {
                    console.log('✅ Email notification sent to mikiyasdesalegn9@gmail.com')
                    emailDebug += ' | Success';
                } else {
                    console.warn('⚠️ Email notification failed but form was saved')
                    emailDebug += ' | sendEmailNotification failed: ' + String(emailSent);
                }
            }
        } catch (emailError: any) {
            console.error('❌ Email notification error:', emailError)
            emailDebug = 'Exception thrown: ' + emailError.toString();
        }

        // Save files locally only (skip on Vercel — read-only filesystem)
        if (!process.env.VERCEL) {
            try {
                const submissionsDir = join(process.cwd(), 'public', 'submissions')
                if (!existsSync(submissionsDir)) await mkdir(submissionsDir, { recursive: true })
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
                const filename = `${data.serviceName.replace(/\s+/g, '-')}-${data.name}-${timestamp}`
                const pdfContent = generatePDFContent(data)
                const pdfPath = join(submissionsDir, `${filename}.html`)
                await writeFile(pdfPath, pdfContent, 'utf8')
                const jsonPath = join(submissionsDir, `${filename}.json`)
                await writeFile(jsonPath, JSON.stringify({ ...data, submissionDate: new Date().toISOString(), pdfPath: `/submissions/${filename}.html`, id: submission.id }, null, 2), 'utf8')
                await prisma.serviceFormSubmission.update({ where: { id: submission.id }, data: { pdfPath: `/submissions/${filename}.html` } })
            } catch (e) { 
                console.warn('File saving skipped:', e)
                emailDebug += ' | File saving skipped: ' + String(e);
            }
        }

        return NextResponse.json({ success: true, message: 'Form submitted successfully', emailDebug, submissionId: submission.id })
    } catch (error) {
        console.error('Error processing form submission:', error)
        return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
    }
}
