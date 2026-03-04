import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

// Company information
const COMPANY_INFO = {
    name: 'SwissCleanMove',
    tagline: 'Umzug & Reinigung',
    address: 'Orpundstrasse 31',
    city: '2504 Biel/Bienne',
    phone: '+41 76 488 36 89',
    email: 'info@swisscleanmove.ch',
    website: 'swisscleanmove.ch',
    uid: 'CHE-123.456.789'
};

// Load logo as base64 for jsPDF
async function loadLogoBase64(): Promise<string | null> {
    try {
        const response = await fetch('/images/logo.jpg');
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch {
        return null;
    }
}

async function addProfessionalHeader(doc: jsPDF) {
    // Try to load and add the logo image
    const logoBase64 = await loadLogoBase64();
    if (logoBase64) {
        // Significantly larger logo
        doc.addImage(logoBase64, 'JPEG', 10, 5, 80, 30);
    } else {
        // Fallback: blue branded text if image fails
        doc.setFillColor(0, 102, 204);
        doc.roundedRect(10, 10, 60, 20, 3, 3, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('SwissCleanMove', 16, 22);
    }

    // Company details (right side)
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    const rightX = 200;
    let rightY = 12;

    doc.setFont('helvetica', 'normal');
    doc.text(COMPANY_INFO.address, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(COMPANY_INFO.city, rightX, rightY, { align: 'right' });
    rightY += 5;
    doc.text(COMPANY_INFO.email, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(`Tel: ${COMPANY_INFO.phone}`, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(`UID: ${COMPANY_INFO.uid}`, rightX, rightY, { align: 'right' });

    // Horizontal line separator (blue)
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.8);
    doc.line(10, 37, 200, 37);

    // Reset text color
    doc.setTextColor(0, 0, 0);

    return 44; // Return starting Y position for content
}

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

interface QuoteSubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    details: string;
    status: string;
    createdAt: string;
}

export async function exportContactToPDF(contact: ContactSubmission) {
    const doc = new jsPDF();

    // Add professional header
    let yPos = await addProfessionalHeader(doc);

    // Document title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('Contact Message', 14, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 12;

    // Helper function to add a section header
    const addSectionHeader = (title: string, icon: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFillColor(240, 248, 255);
        doc.roundedRect(12, yPos - 5, 186, 10, 2, 2, 'F');

        doc.setFillColor(0, 102, 204);
        doc.circle(17, yPos, 2.5, 'F');

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(icon, 17, yPos + 1, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text(title, 22, yPos + 2);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
    };

    const addField = (label: string, value: any, indent: number = 14) => {
        if (!value || value === '') return;

        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(label.toUpperCase(), indent, yPos);
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textLines = doc.splitTextToSize(String(value), 180);
        doc.text(textLines, indent, yPos);
        yPos += 5 * textLines.length + 3;
    };

    // Contact Information Section
    addSectionHeader('Contact Information', 'i');
    addField('Name', contact.name);
    addField('Email', contact.email);
    addField('Phone', contact.phone);
    addField('Submitted', new Date(contact.createdAt).toLocaleString());
    addField('Status', contact.status);
    yPos += 3;

    // Message Section
    addSectionHeader('Message Details', '@');
    addField('Subject', contact.subject);
    addField('Message', contact.message);

    doc.save(`contact-${contact.id}.pdf`);
}

export async function exportQuoteToPDF(quote: QuoteSubmission) {
    const doc = new jsPDF();

    // Add professional header
    let yPos = await addProfessionalHeader(doc);

    // Document title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('Quote Request', 14, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 12;

    // Helper function to add a section header
    const addSectionHeader = (title: string, icon: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFillColor(240, 248, 255);
        doc.roundedRect(12, yPos - 5, 186, 10, 2, 2, 'F');

        doc.setFillColor(0, 102, 204);
        doc.circle(17, yPos, 2.5, 'F');

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(icon, 17, yPos + 1, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text(title, 22, yPos + 2);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
    };

    const addField = (label: string, value: any, indent: number = 14) => {
        if (!value || value === '') return;

        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(label.toUpperCase(), indent, yPos);
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textLines = doc.splitTextToSize(String(value), 180);
        doc.text(textLines, indent, yPos);
        yPos += 5 * textLines.length + 3;
    };

    // Contact Information Section
    addSectionHeader('Contact Information', 'i');
    addField('Name', quote.name);
    addField('Email', quote.email);
    addField('Phone', quote.phone);
    addField('Submitted', new Date(quote.createdAt).toLocaleString());
    addField('Status', quote.status);
    yPos += 3;

    // Service Details Section
    addSectionHeader('Service Details', 'S');
    addField('Service Type', quote.service);

    // Parse and display details
    try {
        const details = JSON.parse(quote.details);

        addField('Address', details.address);
        addField('City', details.city);
        addField('Postal Code', details.postalCode);
        addField('Property Type', details.propertyType);
        addField('Number of Rooms', details.rooms);
        addField('Area (m²)', details.area);
        addField('Preferred Date', details.preferredDate);
        addField('Urgency', details.urgency);

        if (details.additionalServices && details.additionalServices.length > 0) {
            addField('Additional Services', details.additionalServices.join(', '));
        }

        if (details.message) {
            yPos += 3;
            addSectionHeader('Additional Notes', '!');
            addField('Message', details.message);
        }
    } catch (error) {
        console.error('Error parsing quote details:', error);
    }

    doc.save(`quote-${quote.id}.pdf`);
}

export async function exportServiceFormToPDF(rawSubmission: any) {
    const submission = rawSubmission.data || rawSubmission;

    const currentDate = new Date().toLocaleString('en-CH', {
        timeZone: 'Europe/Zurich',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const SKIP_KEYS = new Set([
        'id', 'serviceName', 'formType', 'status', 'pdfPath', 'submissionDate',
        'createdAt', 'updatedAt', 'data'
    ]);

    function prettifyKey(key: string): string {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim().toUpperCase();
    }

    const allKeys = Object.keys(submission).filter(
        k => !SKIP_KEYS.has(k) && submission[k] !== null && submission[k] !== undefined && submission[k] !== ''
    );

    let dynamicRows = '';
    allKeys.forEach(key => {
        let val = submission[key];
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

    const logoUrl = '/images/logo.jpg';
    let logoBase64 = '';
    try {
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        logoBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn('Failed to preload logo', e);
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Service Form - ${rawSubmission.serviceName || 'Submission'}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px; background-color: #ffffff; }
        .container { background-color: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; }
        .header { border-bottom: 2px solid #e5e7eb; padding: 30px; text-align: center; }
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
        .badge-blue { background-color: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
        .badge-green { background-color: #dcfce3; color: #166534; border: 1px solid #bbf7d0; }
        .badge-gray { background-color: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; }
        
        .remark-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; white-space: pre-wrap; margin: 0; }
        
        .footer { background-color: #f9fafb; padding: 20px 30px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
        
        @media print {
            body { padding: 0; background-color: white; }
            .container { border: none; box-shadow: none; }
            .badge { border: 1px solid #ccc; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${logoBase64}" alt="SwissCleanMove" style="height:130px;width:auto;margin-bottom:15px;">
            <h1 class="service-title">${rawSubmission.serviceName || 'Service Request'}</h1>
            <div class="service-subtitle">${(rawSubmission.formType || 'Submission').toUpperCase()}</div>
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
            Form processed on ${currentDate} • SwissCleanMove GmbH
        </div>
    </div>
</body>
</html>`;;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 300);
    }
}
