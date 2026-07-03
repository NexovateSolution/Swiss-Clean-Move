import { NextResponse } from 'next/server';
import { generateQuotePdf } from '@/utils/pdfGenerator';
import { QuoteResult } from '@/utils/pricingEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quoteResult, customer } = body;

    if (!quoteResult || !customer) {
      return NextResponse.json({ success: false, error: 'Missing quoteResult or customer data' }, { status: 400 });
    }

    const pdfBuffer = await generateQuotePdf(quoteResult as QuoteResult, customer);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Contract_${customer.firstName || 'Client'}.pdf"`
      }
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
