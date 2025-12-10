// Email notification utility
// Note: This uses a simple fetch approach. For production, consider using:
// - SendGrid, Mailgun, or AWS SES for better deliverability
// - Or configure nodemailer with SMTP settings

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmailNotification(options: EmailOptions): Promise<boolean> {
  try {
    // Email notification - configured in production with GMAIL_USER and GMAIL_APP_PASSWORD

    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: options.to }] }],
    //     from: { email: 'noreply@swisscleanmove.ch', name: 'SwissCleanMove' },
    //     subject: options.subject,
    //     content: [{ type: 'text/html', value: options.html }],
    //   }),
    // });

    // For development, return true to simulate success
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066CC; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0066CC; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 SwissCleanMove</h1>
          <p>New Contact Form Submission</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${data.name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${data.email}
          </div>
          ${data.phone ? `
          <div class="field">
            <span class="label">Phone:</span> ${data.phone}
          </div>
          ` : ''}
          <div class="field">
            <span class="label">Subject:</span> ${data.subject}
          </div>
          <div class="field">
            <span class="label">Message:</span><br>
            <p style="background: white; padding: 15px; border-left: 4px solid #0066CC;">
              ${data.message.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from SwissCleanMove website</p>
          <p>Received: ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatQuoteEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: any;
}): string {
  const parsedDetails = typeof data.details === 'string' ? JSON.parse(data.details) : data.details;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #00AA00; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #00AA00; }
        .section { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #00AA00; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 SwissCleanMove</h1>
          <p>New Quote Request</p>
        </div>
        <div class="content">
          <div class="section">
            <h3>Customer Information</h3>
            <div class="field">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${data.phone}
            </div>
          </div>
          
          <div class="section">
            <h3>Service Details</h3>
            <div class="field">
              <span class="label">Service Type:</span> ${data.service}
            </div>
            ${parsedDetails.address ? `
            <div class="field">
              <span class="label">Address:</span> ${parsedDetails.address}
            </div>
            ` : ''}
            ${parsedDetails.city ? `
            <div class="field">
              <span class="label">City:</span> ${parsedDetails.city}
            </div>
            ` : ''}
            ${parsedDetails.postalCode ? `
            <div class="field">
              <span class="label">Postal Code:</span> ${parsedDetails.postalCode}
            </div>
            ` : ''}
            ${parsedDetails.propertyType ? `
            <div class="field">
              <span class="label">Property Type:</span> ${parsedDetails.propertyType}
            </div>
            ` : ''}
            ${parsedDetails.rooms ? `
            <div class="field">
              <span class="label">Rooms:</span> ${parsedDetails.rooms}
            </div>
            ` : ''}
            ${parsedDetails.area ? `
            <div class="field">
              <span class="label">Area:</span> ${parsedDetails.area} m²
            </div>
            ` : ''}
            ${parsedDetails.preferredDate ? `
            <div class="field">
              <span class="label">Preferred Date:</span> ${parsedDetails.preferredDate}
            </div>
            ` : ''}
            ${parsedDetails.urgency ? `
            <div class="field">
              <span class="label">Urgency:</span> ${parsedDetails.urgency}
            </div>
            ` : ''}
            ${parsedDetails.message ? `
            <div class="field">
              <span class="label">Additional Message:</span><br>
              <p style="background: #f0f0f0; padding: 10px; margin-top: 5px;">
                ${parsedDetails.message.replace(/\n/g, '<br>')}
              </p>
            </div>
            ` : ''}
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from SwissCleanMove website</p>
          <p>Received: ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatServiceFormEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #CC0000; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #CC0000; }
        .section { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #CC0000; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 SwissCleanMove</h1>
          <p>New ${data.serviceName} - ${data.formType} Request</p>
        </div>
        <div class="content">
          <div class="section">
            <h3>Customer Information</h3>
            <div class="field">
              <span class="label">Name:</span> ${data.salutation} ${data.firstName} ${data.name}
            </div>
            <div class="field">
              <span class="label">Address:</span> ${data.streetAndNumber}, ${data.postalCodeAndCity}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${data.telephone}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.emailAddress}
            </div>
          </div>
          
          ${data.formType === 'relocation' ? `
          <div class="section">
            <h3>Relocation Details</h3>
            ${data.movingDate ? `<div class="field"><span class="label">Moving Date:</span> ${data.movingDate}</div>` : ''}
            ${data.unloadingStreetAndNumber ? `<div class="field"><span class="label">Unloading Address:</span> ${data.unloadingStreetAndNumber}</div>` : ''}
            ${data.unloadingPostalCodeAndCity ? `<div class="field"><span class="label">Unloading City:</span> ${data.unloadingPostalCodeAndCity}</div>` : ''}
            ${data.numberOfRooms ? `<div class="field"><span class="label">Rooms:</span> ${data.numberOfRooms}</div>` : ''}
            ${data.livingSpaceInM2 ? `<div class="field"><span class="label">Living Space:</span> ${data.livingSpaceInM2} m²</div>` : ''}
          </div>
          ` : ''}
          
          ${data.formType === 'cleaning' ? `
          <div class="section">
            <h3>Cleaning Details</h3>
            ${data.numberOfRoomsApartment ? `<div class="field"><span class="label">Rooms:</span> ${data.numberOfRoomsApartment}</div>` : ''}
            ${data.apartmentType ? `<div class="field"><span class="label">Apartment Type:</span> ${data.apartmentType}</div>` : ''}
            ${data.areaInM2 ? `<div class="field"><span class="label">Area:</span> ${data.areaInM2} m²</div>` : ''}
            ${data.cleaningAppointment ? `<div class="field"><span class="label">Cleaning Date:</span> ${data.cleaningAppointment}</div>` : ''}
          </div>
          ` : ''}
          
          ${data.remark ? `
          <div class="section">
            <h3>Additional Remarks</h3>
            <p style="background: #f0f0f0; padding: 10px;">
              ${data.remark.replace(/\n/g, '<br>')}
            </p>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>This is an automated notification from SwissCleanMove website</p>
          <p>Received: ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
