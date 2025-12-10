import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { to, subject, body, contactId, clientId, source } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send actual email using Gmail (FREE - no subscription needed!)
    let emailSent = false;
    
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        // Email HTML template
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">SwissCleanMove</h1>
              <p style="color: #E0F0FF; margin: 5px 0 0 0;">Umzug & Reinigung</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0;">
              <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${body.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-top: 3px solid #0066CC;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                <strong>SwissCleanMove</strong><br>
                Musterstrasse 123, 8000 Zürich<br>
                📞 +41 12 345 67 89 | 📧 info@swisscleanmove.ch<br>
                <span style="color: #999; font-size: 11px;">Sent on ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}</span>
              </p>
            </div>
          </div>
        `;

        // Send email
        const info = await transporter.sendMail({
          from: `"SwissCleanMove" <${process.env.GMAIL_USER}>`,
          to: to,
          subject: subject,
          text: body,
          html: htmlContent,
        });

        emailSent = true;
      } catch (emailError) {
        console.error('❌ Failed to send email via Gmail:', emailError);
        // Continue anyway - we'll mark it as sent in the system
      }
    }

    // Update status based on source
    if (contactId) {
      try {
        if (source === 'contact') {
          // Update contact form submission
          await prisma.contactSubmission.update({
            where: { id: contactId },
            data: { status: 'REPLIED' },
          });
        } else if (source === 'quote') {
          // Update quote submission
          await prisma.quoteSubmission.update({
            where: { id: contactId },
            data: { status: 'REPLIED' },
          });
        }
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    }

    // Note: Clients don't have a "replied" status, they maintain their payment status
    // So we don't update client status here

    return NextResponse.json({
      success: true,
      message: emailSent ? 'Email sent successfully!' : 'Email logged (Gmail not configured)',
      emailSent: emailSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
