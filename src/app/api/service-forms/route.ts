import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { sendEmailNotification, formatServiceFormEmail } from '@/lib/email'

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

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Service Form Submission - ${data.serviceName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0066CC;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #0066CC;
            margin-bottom: 10px;
        }
        .service-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #f8f9fa;
            border-left: 4px solid #0066CC;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #0066CC;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .field {
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
        }
        .field-label {
            font-weight: bold;
            min-width: 180px;
            margin-right: 15px;
            color: #555;
        }
        .field-value {
            flex: 1;
            word-wrap: break-word;
        }
        .checkbox-list {
            margin-left: 180px;
        }
        .checkbox-item {
            margin-bottom: 5px;
        }
        .timestamp {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
        .remark-section {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SwissCleanMove</div>
        <div>Professional Cleaning & Moving Services</div>
        <div class="service-title">${data.serviceName} - ${data.formType.charAt(0).toUpperCase() + data.formType.slice(1)} Request</div>
    </div>

    <div class="section">
        <div class="section-title">Customer Information</div>
        <div class="field">
            <div class="field-label">Salutation:</div>
            <div class="field-value">${data.salutation}</div>
        </div>
        <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${data.name}</div>
        </div>
        <div class="field">
            <div class="field-label">First Name:</div>
            <div class="field-value">${data.firstName}</div>
        </div>
        <div class="field">
            <div class="field-label">Address:</div>
            <div class="field-value">${data.streetAndNumber}</div>
        </div>
        <div class="field">
            <div class="field-label">Postal Code & City:</div>
            <div class="field-value">${data.postalCodeAndCity}</div>
        </div>
        <div class="field">
            <div class="field-label">Telephone:</div>
            <div class="field-value">${data.telephone}</div>
        </div>
        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${data.emailAddress}</div>
        </div>
    </div>

    ${data.formType === 'relocation' ? `
    <div class="section">
        <div class="section-title">Relocation Details</div>
        <div class="field">
            <div class="field-label">Moving Date:</div>
            <div class="field-value">${data.movingDate || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Unloading Address:</div>
            <div class="field-value">${data.unloadingStreetAndNumber || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Unloading City:</div>
            <div class="field-value">${data.unloadingPostalCodeAndCity || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Floors:</div>
            <div class="field-value">${data.floors || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Number of Rooms:</div>
            <div class="field-value">${data.numberOfRooms || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Living Space:</div>
            <div class="field-value">${data.livingSpaceInM2 || 'Not specified'} m²</div>
        </div>
    </div>
    ` : ''}

    ${data.formType === 'cleaning' ? `
    <div class="section">
        <div class="section-title">Cleaning Details</div>
        <div class="field">
            <div class="field-label">Number of Rooms:</div>
            <div class="field-value">${data.numberOfRoomsApartment || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Apartment Type:</div>
            <div class="field-value">${data.apartmentType || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Area:</div>
            <div class="field-value">${data.areaInM2 || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Cleaning Date:</div>
            <div class="field-value">${data.cleaningAppointment || 'Not specified'}</div>
        </div>
        <div class="field">
            <div class="field-label">Submission Deadline:</div>
            <div class="field-value">${data.submissionDeadline || 'Not specified'}</div>
        </div>
        ${data.carpetShampooing || data.conservatory || data.outdoorSeating || data.parquet || data.stairpolish ? `
        <div class="field">
            <div class="field-label">Special Services:</div>
            <div class="field-value">
                <div class="checkbox-list">
                    ${data.carpetShampooing ? '<div class="checkbox-item">✓ Carpet Shampooing</div>' : ''}
                    ${data.conservatory ? '<div class="checkbox-item">✓ Conservatory</div>' : ''}
                    ${data.outdoorSeating ? '<div class="checkbox-item">✓ Outdoor Seating</div>' : ''}
                    ${data.parquet ? '<div class="checkbox-item">✓ Parquet</div>' : ''}
                    ${data.stairpolish ? '<div class="checkbox-item">✓ Stair Polish</div>' : ''}
                </div>
            </div>
        </div>
        ` : ''}
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">Contact Preferences</div>
        <div class="field">
            <div class="field-label">Preferred Contact:</div>
            <div class="field-value">${data.contactPreferredVia}</div>
        </div>
        <div class="field">
            <div class="field-label">Viewing Welcome:</div>
            <div class="field-value">${data.viewingIsWelcome === 'And' ? 'Yes' : 'No'}</div>
        </div>
    </div>

    ${data.remark ? `
    <div class="section">
        <div class="section-title">Additional Remarks</div>
        <div class="remark-section">
            ${data.remark.replace(/\n/g, '<br>')}
        </div>
    </div>
    ` : ''}

    <div class="timestamp">
        Form submitted on: ${currentDate}
    </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.serviceName || !data.name || !data.firstName || !data.emailAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create submissions directory if it doesn't exist
    const submissionsDir = join(process.cwd(), 'public', 'submissions')
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `${data.serviceName.replace(/\s+/g, '-')}-${data.name}-${timestamp}`
    
    // Generate PDF content (HTML)
    const pdfContent = generatePDFContent(data)
    const pdfPath = join(submissionsDir, `${filename}.html`)
    
    // Save PDF file
    await writeFile(pdfPath, pdfContent, 'utf8')

    // Save JSON data for admin panel
    const jsonData = {
      ...data,
      submissionDate: new Date().toISOString(),
      pdfPath: `/submissions/${filename}.html`,
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    const jsonPath = join(submissionsDir, `${filename}.json`)
    await writeFile(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8')

    // Send email notification to admin
    const emailHtml = formatServiceFormEmail(data);
    await sendEmailNotification({
      to: 'info@swisscleanmove.ch',
      subject: `New ${data.serviceName} ${data.formType} Request`,
      html: emailHtml,
      text: `New ${data.formType} request for ${data.serviceName} from ${data.firstName} ${data.name} (${data.emailAddress})`
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId: jsonData.id
    })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
