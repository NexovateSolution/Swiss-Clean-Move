import { NextRequest, NextResponse } from 'next/server';
import { sendEmailNotification } from '@/lib/email';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    // Admin check (similar to other admin routes, we can just do a basic check if token exists)
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { email, pdfBase64, text } = await req.json();

    if (!email || !pdfBase64) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert base64 data URI to Buffer
    const base64Data = pdfBase64.split(';base64,').pop();
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear Client,</p>
        <p>${text.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br><strong>SwissCleanMove</strong></p>
      </div>
    `;

    const success = await sendEmailNotification({
      to: email,
      subject: 'Document from SwissCleanMove',
      html: htmlBody,
      text: text,
      attachments: [
        {
          filename: 'SwissCleanMove_Document.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    if (success === true) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in send-note API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
